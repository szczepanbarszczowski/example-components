import React, {PureComponent} from 'react';
import {
  PanGestureHandler,
  State,
  PinchGestureHandler,
  TapGestureHandler,
  FlingGestureHandler,
  Directions,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {bouncy, bouncyPinch, dragDiff, friction} from './helpers';
import s from './imageViewer.styles';

const {
  set,
  cond,
  eq,
  or,
  add,
  sub,
  max,
  multiply,
  divide,
  lessThan,
  Value,
  event,
  call,
  block,
  not,
} = Animated;

class Viewer extends PureComponent {
  pinchRef = React.createRef();
  panRef = React.createRef();
  doubleTapRef = React.createRef();

  scale = new Value(1);
  pinchScale = new Value(1);
  _focalDisplacementX = new Value(0);
  _focalDisplacementY = new Value(0);

  _scale;
  _panTransX;
  _panTransY;
  _onPanEvent;
  _onPinchEvent;

  constructor(props) {
    super(props);

    // DECLARE TRANSX
    const panTransX = new Value(0);
    const panTransY = new Value(0);

    // PINCH
    const pinchFocalX = new Value(0);
    const pinchFocalY = new Value(0);
    const pinchState = new Value(-1);

    this._onPinchEvent = event([
      {
        nativeEvent: {
          state: pinchState,
          scale: this.pinchScale,
          focalX: pinchFocalX,
          focalY: pinchFocalY,
        },
      },
    ]);

    // SCALE
    const pinchActive = eq(pinchState, State.ACTIVE);
    const relativeFocalX = sub(
      pinchFocalX,
      add(panTransX, this._focalDisplacementX),
    );
    const relativeFocalY = sub(
      pinchFocalY,
      add(panTransY, this._focalDisplacementY),
    );
    this._scale = set(
      this.scale,
      bouncyPinch(
        this.scale,
        this.pinchScale,
        pinchActive,
        relativeFocalX,
        this._focalDisplacementX,
        relativeFocalY,
        this._focalDisplacementY,
      ),
    );

    // PAN
    const dragX = new Value(0);
    const dragY = new Value(0);
    const panState = new Value(-1);
    this._onPanEvent = event([
      {
        nativeEvent: {
          translationX: dragX,
          translationY: dragY,
          state: panState,
        },
      },
    ]);

    const panActive = eq(panState, State.ACTIVE);
    const panFriction = value => friction(value);

    // X
    const panUpX = cond(
      lessThan(this._scale, 1),
      0,
      multiply(-1, this._focalDisplacementX),
    );
    const panLowX = add(
      panUpX,
      multiply(-this.props.width, add(max(1, this._scale), -1)),
    );
    this._panTransX = set(
      panTransX,
      bouncy(
        panTransX,
        dragDiff(dragX, panActive, this._scale),
        or(panActive, pinchActive),
        panLowX,
        panUpX,
        panFriction,
      ),
    );

    // Y
    const panUpY = cond(
      lessThan(this._scale, 1),
      0,
      multiply(-1, this._focalDisplacementY),
    );
    const panLowY = add(
      panUpY,
      multiply(-this.props.height, add(max(1, this._scale), -1)),
    );
    this._panTransY = set(
      panTransY,
      bouncy(
        panTransY,
        dragDiff(dragY, panActive, this._scale),
        or(panActive, pinchActive),
        panLowY,
        panUpY,
        panFriction,
      ),
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.pinchEnabled !== this.props.pinchEnabled &&
      !this.props.pinchEnabled
    ) {
      // reset zoom
      this.scale.setValue(1);
      this.pinchScale.setValue(1);
      this._focalDisplacementX.setValue(0);
      this._focalDisplacementY.setValue(0);
    }
  }

  toggleZoom = () => {
    // TODO: Implement zoom on double tap
  };

  _onSingleTap = event => {
    const {panEnabled, pinchEnabled, onPress} = this.props;
    if (
      event.nativeEvent.state === State.ACTIVE &&
      !panEnabled &&
      !pinchEnabled &&
      onPress
    ) {
      onPress();
    }
  };
  _onDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE && this.props.pinchEnabled) {
      this.toggleZoom();
    }
  };

  _onFling = event => {
    const {onPress} = this.props;
    if (event.nativeEvent.state === State.ACTIVE && onPress) {
      onPress();
    }
  };

  handlePinch = pinchScale => {
    const {enableImageViewer} = this.props;
    if (enableImageViewer) {
      pinchScale > 1 && enableImageViewer();
    }
  };

  render() {
    const {
      width,
      height,
      panEnabled,
      image,
      onZoomCallback,
      pinchEnabled,
    } = this.props;
    // The below two animated values makes it so that scale appears to be done
    // from the top left corner of the image view instead of its center. This
    // is required for the "scale focal point" math to work correctly
    const scaleTopLeftFixX = divide(multiply(width, add(this._scale, -1)), 2);
    const scaleTopLeftFixY = divide(multiply(height, add(this._scale, -1)), 2);

    return (
      <TapGestureHandler
        onHandlerStateChange={this._onSingleTap}
        waitFor={this.doubleTapRef}>
        <TapGestureHandler
          ref={this.doubleTapRef}
          numberOfTaps={2}
          onHandlerStateChange={this._onDoubleTap}>
          <Animated.View style={s.wrapper}>
            <PinchGestureHandler
              ref={this.pinchRef}
              simultaneousHandlers={this.panRef}
              onGestureEvent={this._onPinchEvent}
              onHandlerStateChange={this._onPinchEvent}
              enabled={pinchEnabled}>
              <Animated.View>
                <FlingGestureHandler
                  onHandlerStateChange={this._onFling}
                  direction={Directions.UP}
                  enabled={pinchEnabled && !panEnabled}>
                  <Animated.View>
                    <PanGestureHandler
                      ref={this.panRef}
                      avgTouches
                      simultaneousHandlers={this.pinchRef}
                      onGestureEvent={this._onPanEvent}
                      onHandlerStateChange={this._onPanEvent}
                      enabled={panEnabled}
                      minDist={10}>
                      {!!image && (
                        <Animated.Image
                          style={[
                            s.image,
                            {
                              transform: [
                                {translateY: this._panTransY},
                                {translateX: this._panTransX},
                                {translateY: this._focalDisplacementY},
                                {translateX: this._focalDisplacementX},
                                {translateX: scaleTopLeftFixX},
                                {translateY: scaleTopLeftFixY},
                                {scale: this._scale},
                              ],
                            },
                          ]}
                          resizeMode="cover"
                          source={
                            typeof image === 'string' ? {uri: image} : image
                          }
                        />
                      )}
                    </PanGestureHandler>
                  </Animated.View>
                </FlingGestureHandler>
              </Animated.View>
            </PinchGestureHandler>
            {onZoomCallback && (
              <Animated.Code exec={call([this._scale], onZoomCallback)} />
            )}
            <Animated.Code exec={call([this.pinchScale], this.handlePinch)} />
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    );
  }
}

export default Viewer;
