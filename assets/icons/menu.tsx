import * as React from "react";
import Svg, { Circle } from "react-native-svg";

function MenuIcon() {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 35 35"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx={5} cy={5} r={5} fill="#fff" />
      <Circle cx={30} cy={5} r={5} fill="#fff" />
      <Circle cx={5} cy={30} r={5} fill="#fff" />
      <Circle cx={30} cy={30} r={5} fill="#fff" />
    </Svg>
  );
}

export default MenuIcon;
