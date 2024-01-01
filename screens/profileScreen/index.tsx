import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import convertDate from "../../utils/dateTimeString";

function ProfileScreen() {
  const [accountInfo, setAccountInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [income, setIncome] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("accountInfo")
      .then((res) => {
        setAccountInfo(JSON.parse(res || "{}"));

        //alert(JSON.stringify(accountInfo));
      })
      .then(() => {
        AsyncStorage.getItem("income").then((res) => {
          setIncome(res || "");
          setIsLoading(false);
        });
      });
  }, []);
  function handleChangeIncome() {
    //AsyncStorage.setItem("income", "2000");
    setPopupVisible(true);
  }
  if (isLoading) return <View style={styles.container} />;
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "poppins500",
          fontSize: 16,
          color: "white",
          marginBottom: 20,
        }}
      >
        My QR Code
      </Text>
      <Image
        width={250}
        height={250}
        source={{
          uri: `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${accountInfo.accountNumber}&color=fff&bgcolor=22272C`,
        }}
      />
      <View style={styles.infoListContainer}>
        <SingleInfoLine title="Full Name" data={accountInfo.accountName} />
        <SingleInfoLine
          title="Account Number"
          data={accountInfo.accountNumber}
        />
        <SingleInfoLine
          title="Creation date"
          data={convertDate(accountInfo.createdAt)}
        />
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <SingleInfoLine title="Monthly Income" data={income + "DT"} />
          <Pressable
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              handleChangeIncome();
            }}
          >
            <AntDesign name="edit" size={18} color="white" />
          </Pressable>
        </View>
      </View>
      <Modal visible={popupVisible} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000055",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              height: 200,
              backgroundColor: "#2e343b",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                height: "70%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: 10,
              }}
            >
              <Text style={{ fontFamily: "poppins500", color: "white" }}>
                Set new Income Value
              </Text>
              <TextInput
                style={styles.input}
                value={income}
                onChangeText={(e) => {
                  setIncome(e);
                }}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (income !== "") AsyncStorage.setItem("income", income);
                setPopupVisible(false);
              }}
              style={{
                flex: 1,
                backgroundColor: "#596573",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "poppins600", color: "#fff" }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function SingleInfoLine({ title, data }: { title: string; data: string }) {
  return (
    <View style={styles.singleCellContainer}>
      <Text style={styles.singleCellTitle}>{title}:</Text>
      <Text style={styles.singleCellData}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22272C",
    alignItems: "center",
  },
  infoListContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    marginTop: 30,
  },
  singleCellContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: 40,
    alignItems: "center",
  },
  singleCellTitle: {
    color: "#fff",
    fontFamily: "poppins300",
    fontSize: 14,
  },
  singleCellData: {
    color: "#fff",
    fontFamily: "poppins600",
    fontSize: 16,
  },
  loading: {},
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
});

export default ProfileScreen;
