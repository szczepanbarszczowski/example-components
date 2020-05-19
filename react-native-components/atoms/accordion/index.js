import React, {useState, useCallback} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {bInterpolate, bin, useTransition} from 'react-native-redash';

import Text from 'components/atoms/text';
import Chevron from './chevron';
import {fontNames} from 'theme/fonts';
import s from './accordion.styles';
import {runTiming} from 'services/helpers';

const {
  not,
  Value,
  useCode,
  Clock,
  set,
  cond,
  clockRunning,
  dest,
  startClock,
  divide,
  diff,
} = Animated;

const Accordion = ({title, onExpand, Content}) => {
  const [open, setOpen] = useState(false);
  const [heightIsSetUp, setUpHeightFlag] = useState(false);
  const [heightInterpolation, setHeightInterpolation] = useState();
  const transition = useTransition(
    open,
    not(bin(open)),
    bin(open),
    400,
    Easing.inOut(Easing.ease),
  );
  // const opacity = new Value(0);
  // const clock = new Clock();

  const onLayout = useCallback(
    event => {
      const {height} = event.nativeEvent.layout;

      if (!heightIsSetUp) {
        setOpen(false);
        setUpHeightFlag(true);
        setHeightInterpolation(bInterpolate(transition, 0, height));
      }
    },
    [heightIsSetUp],
  );

  // useCode(
  //   () =>
  //     open ? [runTiming(clock, opacity, 1)] : [runTiming(clock, opacity, 0)],
  //   [open],
  // );

  const onPress = useCallback(() => {
    setOpen(openState => {
      !openState && onExpand && onExpand();

      return !openState;
    });
  }, []);

  return (
    <View style={s.headerWrapper}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={s.headerContainer}>
          <Text type={fontNames.header3}>{title}</Text>
          <Chevron transition={transition} />
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          s.headerItemsWrapper,
          heightIsSetUp && {
            height: heightInterpolation,
            // opacity,
          },
        ]}
        onLayout={onLayout}>
        <Animated.View style={[s.contentWrapper]}>{Content}</Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
