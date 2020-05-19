import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9 10a1 1 0 100-2 1 1 0 000 2zM16 9a1 1 0 11-2 0 1 1 0 012 0zM12 15.5A2.5 2.5 0 019.5 13 .75.75 0 008 13a4 4 0 008 .002v-.03.016a.75.75 0 00-1.5.012 2.5 2.5 0 01-2.5 2.5z"
        fill="#000"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-1.5 0a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;
