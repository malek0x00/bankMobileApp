import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function StarterScreen({ navigation }: { navigation: any }) {
  NavigationBar.setBackgroundColorAsync("#22272C");
  const handleGetStarted = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        style={styles.image}
        source={require("../../assets/starterbg.png")}
      />
      <Text style={styles.bankName}>Esm el banka</Text>
      <Text style={styles.description}>
        chwaya 7achou w felle5r “An online banking experience like never before”
      </Text>
      <TouchableOpacity
        onPress={() => {
          handleGetStarted();
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22272C",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "contain",
  },
  bankName: {
    color: "#fff",
    fontSize: 34,
    fontFamily: "poppins700",
  },
  description: {
    color: "#8F9192",
    fontSize: 16,
    fontFamily: "poppins400",
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 200,
    height: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins600",
  },
});

export default StarterScreen;
