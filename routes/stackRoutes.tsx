import { createStackNavigator } from "@react-navigation/stack";

import TabNavigatorRoutes from "./tabNavigatorRoutes";
import LoginScreen from "../screens/login";
import StarterScreen from "../screens/starterScreen";

const Stack = createStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="starter" component={StarterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={TabNavigatorRoutes} />
    </Stack.Navigator>
  );
}

export default StackRoutes;
