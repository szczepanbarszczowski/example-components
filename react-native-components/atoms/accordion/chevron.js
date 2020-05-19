import React from 'react';
import Animated from 'react-native-reanimated';
import {bInterpolate} from 'react-native-redash';
import ChevronUp from 'components/atoms/icons/chevronArrowUp';

const Chevron = ({transition}) => {
  const rotateZ = bInterpolate(transition, Math.PI, 0);

  return (
    <Animated.View style={{transform: [{rotateZ}]}}>
      <ChevronUp width={32} height={32} />
    </Animated.View>
  );
};

export default Chevron;
