import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./routes/stackRoutes";
import useFontsLoader from "./utils/fontsLoader";

export default function App() {
  const fontsLoaded = useFontsLoader();
  if (!fontsLoaded) return null; //implement loading screen
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}
