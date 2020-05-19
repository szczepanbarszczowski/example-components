import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Favourite = props => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.92962 8.47025C8.85351 8.6221 8.70917 8.72846 8.5413 8.75637L3.445 9.60373C3.01824 9.67469 2.8504 10.1972 3.15633 10.5024L7.02213 14.359C7.14194 14.4785 7.1975 14.6479 7.17174 14.8149L6.31238 20.3875C6.24541 20.8217 6.70619 21.1444 7.09283 20.934L11.7453 18.4024C11.9041 18.316 12.0959 18.316 12.2547 18.4024L16.9072 20.934C17.2938 21.1444 17.7546 20.8217 17.6876 20.3875L16.8283 14.8149C16.8025 14.6479 16.8581 14.4785 16.9779 14.359L20.8437 10.5024C21.1496 10.1972 20.9818 9.67469 20.555 9.60373L15.4587 8.75637C15.2908 8.72846 15.1465 8.6221 15.0704 8.47025L12.4758 3.29334C12.2797 2.90222 11.7203 2.90222 11.5242 3.29334L8.92962 8.47025ZM18.4749 10.7642L15.2138 10.222C14.576 10.1159 14.0275 9.71178 13.7382 9.13474L12 5.66651L10.2618 9.13474C9.97255 9.71178 9.42404 10.1159 8.78616 10.222L5.52506 10.7642L8.07527 13.3084C8.53056 13.7626 8.7417 14.406 8.64379 15.0409L8.07873 18.705L11.0321 17.0979C11.6354 16.7696 12.3646 16.7696 12.9679 17.0979L15.9213 18.705L15.3562 15.0409C15.2583 14.406 15.4694 13.7626 15.9247 13.3084L18.4749 10.7642Z"
      fill={props.fill || '#000'}
    />
  </Svg>
);

export default Favourite;