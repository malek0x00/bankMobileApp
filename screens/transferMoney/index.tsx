import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BarcodeMask from "react-native-barcode-mask";
import Toast from "react-native-toast-message";
import CircularSlider from "rn-circular-slider";
function TransferMoneyScreen() {
  //const [permission, requestPermission] = Camera.useCameraPermissions();
  const [ammountToSend, setAmmountToSend] = useState(0);
  const [recieverAccNum, setRecieverAccNum] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [accountInfo, setAccountInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("accountInfo")
      .then((res) => {
        setAccountInfo(JSON.parse(res || "{}"));
        //alert(JSON.stringify(accountInfo));
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSend = () => {
    setButtonLoading(true);
    axios
      .post("http://192.168.227.77:8080/api/user/transfer", {
        sourceAccountNumber: accountInfo.accountNumber,
        destinationAccountNumber: recieverAccNum,
        amount: ammountToSend,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.responseCode === "006") {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Insufficient funds",
            visibilityTime: 4000,
            position: "bottom",
          });
          setButtonLoading(false);
        } else if (res.data.responseCode === "003") {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Invalid destination account",
            visibilityTime: 4000,
            position: "bottom",
          });
          setButtonLoading(false);
        } else {
          setButtonLoading(false);
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Transaction successful",
            visibilityTime: 4000,
            position: "bottom",
          });
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setButtonLoading(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "an error occured",
          visibilityTime: 4000,
          position: "bottom",
        });
      });
    //alert("sending " + ammountToSend + " to " + recieverAccNum);
  };
  if (isLoading) return <View style={styles.container} />;
  return (
    <View style={styles.container}>
      <View>
        <CircularSlider
          step={10}
          min={0}
          max={accountInfo.accountBalance}
          value={ammountToSend}
          onChange={(value: any) => {
            setAmmountToSend(value);
          }}
          strokeWidth={20}
          contentContainerStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          buttonBorderColor="#47515c"
          buttonFillColor="#596573"
          buttonStrokeWidth={10}
          openingRadian={Math.PI / 4}
          buttonRadius={10}
          linearGradient={[
            { stop: "0%", color: "#596573" },
            { stop: "100%", color: "#596573" },
          ]}
        >
          <Text
            style={{ fontFamily: "poppins600", fontSize: 24, color: "white" }}
          >
            {ammountToSend} DT
          </Text>
        </CircularSlider>
      </View>

      <View style={styles.recieverContainer}>
        <TextInput
          placeholderTextColor="#ccc"
          placeholder="Account Number..."
          style={styles.input}
          value={recieverAccNum}
          onChangeText={(e) => {
            setRecieverAccNum(e);
          }}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.qrButton}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleSend();
        }}
        style={styles.sendButton}
        disabled={buttonLoading}
      >
        {buttonLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <FontAwesome name="send" size={20} color="white" />
        )}
        <Text
          style={{
            fontFamily: "poppins500",
            color: "white",
            paddingTop: 5,
            fontSize: 18,
          }}
        >
          SEND
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <Camera
            ratio="16:9"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={({ type, data }) => {
              setRecieverAccNum(data);
              setModalVisible(false);
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "#22272C",
                alignSelf: "flex-end",
                marginBottom: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 9999,
              }}
            >
              <Entypo name="cross" size={28} color="white" />
            </TouchableOpacity>
            <BarcodeMask
              width={250}
              height={250}
              lineAnimationDuration={1000}
            />
          </Camera>
        </View>
      </Modal>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22272C",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    gap: 50,
  },
  input: {
    backgroundColor: "#596573",
    flexGrow: 1,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontFamily: "poppins400",
    paddingTop: 5,
    color: "#fff",
  },
  recieverContainer: {
    display: "flex",
    flexDirection: "row",
  },
  qrButton: {
    height: 50,
    backgroundColor: "#596573",
    width: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButton: {
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: "#596573",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
});
export default TransferMoneyScreen;
