import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.793 8a.5.5 0 00.353-.146l4-4a.5.5 0 01.854.353v15.586a.5.5 0 01-.854.354l-4-4A.5.5 0 007.793 16H4.5a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h3.293zm0 6.5H5.5v-5h2.293a2 2 0 001.414-.586L11.5 6.621V17.38l-2.293-2.293a2 2 0 00-1.414-.586z"
        fill="#000"
      />
      <Path
        d="M14 18.424a6.502 6.502 0 000-12.848V4.062a8.001 8.001 0 010 15.876v-1.514z"
        fill="#000"
      />
      <Path
        d="M14 16.9v-1.545a3.502 3.502 0 000-6.71V7.1a5.002 5.002 0 010 9.8z"
        fill="#000"
      />
      <Path d="M15 12a2 2 0 01-1 1.732v-3.464A2 2 0 0115 12z" fill="#000" />
    </Svg>
  );
}

export default SvgComponent;
