import {
  Ionicons,
  Fontisto,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { TouchableOpacity, View } from "react-native";

import UserIcon from "../assets/icons/user";
import AboutScreen from "../screens/About";
import HomeScreen from "../screens/home";
import ProfileScreen from "../screens/profileScreen";
import TransactionsListPage from "../screens/transactionsList";
import TransferMoneyScreen from "../screens/transferMoney";
function TabNavigatorRoutes() {
  NavigationBar.setBackgroundColorAsync("#2E343B");
  const Tabs = createBottomTabNavigator();
  const navigate = useNavigation<any>();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerStyle: { backgroundColor: "#22272C", shadowColor: "#22272C" },
        tabBarShowLabel: false,
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={{
                marginLeft: 20,
              }}
              onPress={() => {
                navigate.navigate("about");
              }}
            >
              <MaterialCommunityIcons name="bank" size={28} color="white" />
            </TouchableOpacity>
          );
        },
        headerRight: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigate.navigate("profile");
              }}
              style={{ marginRight: 15 }}
            >
              <UserIcon />
            </TouchableOpacity>
          );
        },
        tabBarStyle: {
          backgroundColor: "#2e343b",
          height: 60,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarButton focused={focused}>
                <Ionicons
                  name="home"
                  size={24}
                  color={focused ? "#2E343B" : "#fff"}
                />
              </TabBarButton>
            );
          },
        }}
        name="home"
        component={HomeScreen}
      />
      <Tabs.Screen
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarButton focused={focused}>
                <Fontisto
                  name="history"
                  size={24}
                  color={focused ? "#2E343B" : "#fff"}
                />
              </TabBarButton>
            );
          },
        }}
        name="history"
        component={TransactionsListPage}
      />
      <Tabs.Screen
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarButton focused={focused}>
                <FontAwesome5
                  name="exchange-alt"
                  size={24}
                  color={focused ? "#2E343B" : "#fff"}
                />
              </TabBarButton>
            );
          },
        }}
        name="send"
        component={TransferMoneyScreen}
      />
      <Tabs.Screen
        options={{
          unmountOnBlur: true,
          tabBarButton: () => {
            return null;
          },
        }}
        name="profile"
        component={ProfileScreen}
      />
      <Tabs.Screen
        options={{
          tabBarButton: () => {
            return null;
          },
        }}
        name="about"
        component={AboutScreen}
      />
    </Tabs.Navigator>
  );
}

function TabBarButton({
  focused,
  children,
}: {
  focused: boolean;
  children: any;
}) {
  return (
    <View
      style={{
        backgroundColor: focused ? "#fff" : "#ffffff00",
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius: 30,
        marginTop: 5,
      }}
    >
      {children}
    </View>
  );
}

export default TabNavigatorRoutes;
