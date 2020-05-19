import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={75} height={32} viewBox="0 0 75 32" fill="none" {...props}>
      <Path
        d="M0 5.333h10l10 10.72v10.72H0V5.334z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M25.429 5.333H30v21.44H25.43V14.309L20 23.424l-5.428-9.116v12.466H10V5.334h4.572L20 14.847l5.429-9.515zM39.192 20.327l2.704-9.366H46.5l-4.75 14.6C40.14 30.427 37.246 32 33.25 32v-4.288c2.014 0 3.093-.284 3.726-2.151l-5.726-14.6h4.748l3.194 9.366zM53.279 22.287l5.434-8.217v-3.109H47.788v4.353h5.146L47.5 23.53v3.109H59v-4.353H53.28z"
        fill="#000"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.83 20.561H64.76c.54 1.584 1.844 2.132 3.404 2.132 1.163 0 2.156-.487 2.723-1.158l3.404 2.102c-1.39 2.07-3.489 3.137-6.184 3.137-4.85 0-7.857-3.503-7.857-8.04 0-4.538 3.064-8.04 7.545-8.04 4.142 0 7.205 3.44 7.205 8.04a9.48 9.48 0 01-.17 1.827zm-7.063-5.817c-1.617 0-2.695.853-3.092 2.406h6.099c-.454-1.766-1.73-2.406-3.007-2.406z"
        fill="#000"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={0}
          y1={5.333}
          x2={21.505}
          y2={25.119}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#014AF9" />
          <Stop offset={1} stopColor="#C6CAFE" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
