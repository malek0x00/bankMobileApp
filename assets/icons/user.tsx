import * as React from "react";
import Svg, { Path } from "react-native-svg";

function UserIcon() {
  return (
    <Svg width={32} height={32} viewBox="0 0 60 60" fill="none">
      <Path
        d="M30 27.5a10 10 0 100-20 10 10 0 000 20zm0-15a5 5 0 110 10 5 5 0 010-10zM30 32.5A17.5 17.5 0 0012.5 50a2.5 2.5 0 005 0 12.5 12.5 0 0125 0 2.5 2.5 0 005 0A17.5 17.5 0 0030 32.5z"
        fill="#fff"
      />
    </Svg>
  );
}

export default UserIcon;
