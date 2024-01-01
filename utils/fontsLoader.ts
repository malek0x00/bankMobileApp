import { useFonts } from "expo-font";

export default function useFontsLoader() {
  const [fontsLoaded] = useFonts({
    poppins900: require("../assets/fonts/poppins/Poppins-Black.ttf"),
    poppins800: require("../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
    poppins700: require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    poppins600: require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
    poppins500: require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    poppins400: require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    poppins300: require("../assets/fonts/poppins/Poppins-Light.ttf"),
    poppins200: require("../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
    poppins100: require("../assets/fonts/poppins/Poppins-Thin.ttf"),
  });

  return fontsLoaded;
}
