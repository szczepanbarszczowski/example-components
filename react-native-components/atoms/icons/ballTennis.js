import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.307 14.33a8.968 8.968 0 01.718-6.5A8.961 8.961 0 019.67 3.307a9 9 0 11-6.364 11.022zm15.325 1.172a7.473 7.473 0 00.613-5.443 7.473 7.473 0 00-3.252-4.408 7.473 7.473 0 00-.612 5.443 7.473 7.473 0 003.252 4.408zm-.829 1.25a7.466 7.466 0 01-3.862 2.492 7.465 7.465 0 01-4.59-.227 8.968 8.968 0 00.717-6.5 8.968 8.968 0 00-3.87-5.27 7.466 7.466 0 013.861-2.491 7.466 7.466 0 014.59.227 8.968 8.968 0 00-.717 6.5 8.968 8.968 0 003.871 5.27zM8.62 12.906a7.474 7.474 0 00-3.251-4.408 7.473 7.473 0 00-.612 5.443 7.473 7.473 0 003.251 4.408 7.474 7.474 0 00.612-5.443z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;