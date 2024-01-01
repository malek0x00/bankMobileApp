import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";

function LoginScreen({ navigation }: { navigation: any }) {
  const [accNumber, setAccNumber] = useState("bougadouha.malek@gmail.com");
  const [passwordValue, setPasswordValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ref = useBlurOnFulfill({ value: passwordValue, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: passwordValue,
    setValue: setPasswordValue,
  });

  function handleLogin() {
    if (passwordValue === "" || accNumber === "") {
      Toast.show({
        type: "info",
        text1: "Warning",
        text2: "Please Fill In The Form",
        visibilityTime: 4000,
        position: "bottom",
      });
    } else {
      setIsLoading(true);
      axios
        .post("http://192.168.227.77:8080/api/user/login", {
          email: accNumber,
          password: passwordValue,
        })
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          AsyncStorage.setItem(
            "accountInfo",
            JSON.stringify(res.data.accountInfo),
          ).then(() => {
            navigation.navigate("Home");
          });
        })
        .catch(() => {
          setIsLoading(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Please verify your credentials",
            visibilityTime: 4000,
            position: "bottom",
          });
          setPasswordValue("");
        });
    }
    /* alert("acc number:" + accNumber + "\npassword:" + passwordValue);
    navigation.navigate("Home"); */
  }

  //2023998191 psw:3913
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Login To Your Account</Text>
        <Text style={styles.inputLabel}>Account Number</Text>
        <TextInput
          style={styles.input}
          value={accNumber}
          onChangeText={(e) => {
            setAccNumber(e);
          }}
        />
        <Text style={styles.inputLabel}>PIN Code</Text>
        <View style={{ display: "flex", width: "100%" }}>
          <CodeField
            ref={ref}
            value={passwordValue}
            onChangeText={setPasswordValue}
            cellCount={4}
            keyboardType="number-pad"
            textContentType="password"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol ? "•" : isFocused ? <Cursor /> : null}
              </Text>
            )}
          />
        </View>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => {
            handleLogin();
          }}
          style={styles.button}
        >
          {isLoading && <ActivityIndicator color="#fff" />}
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <Toast />
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
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    //backgroundColor: "#fff",
    width: "90%",
  },
  titleText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "poppins700",
  },
  inputLabel: {
    fontFamily: "poppins500",
    color: "#fff",
    fontSize: 14,
    marginTop: 40,
  },
  input: {
    backgroundColor: "#596573",
    width: "100%",
    height: 50,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    fontFamily: "poppins400",
    paddingTop: 5,
    color: "#fff",
  },
  button: {
    backgroundColor: "#2E343B",
    height: 50,
    paddingHorizontal: 40,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    alignSelf: "center",
    flexDirection: "row",
    gap: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins700",
    paddingTop: 5,
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    backgroundColor: "#596573",
    borderRadius: 10,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    paddingTop: 8,
    fontFamily: "poppins400",
    borderColor: "#00000030",
    textAlign: "center",
    color: "#fff",
  },
  focusCell: {
    borderColor: "#ffffff00",
  },
});

export default LoginScreen;
