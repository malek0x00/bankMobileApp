import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

function HomeScreen() {
  const [accountInfo, setAccountInfo] = useState<any>({});
  const [income, setIncome] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("accountInfo").then((res) => {
      setAccountInfo(JSON.parse(res || "{}"));
      axios
        .post("http://192.168.227.77:8080/api/user/balanceEnquiry", {
          accountNumber: JSON.parse(res || "{}").accountNumber,
        })
        .then((result: any) => {
          console.log(result.data);
          AsyncStorage.setItem(
            "accountInfo",
            JSON.stringify(result.data.accountInfo),
          );
          setAccountInfo(result.data.accountInfo);
        });
      //alert(JSON.stringify(accountInfo));
    });
    AsyncStorage.getItem("income").then((res) => {
      setIncome(res || "2000");
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.valuesContainer}>
        <View style={styles.primaryValueContainer}>
          <Text style={styles.PrimaryValueDigit}>
            {accountInfo.accountBalance} DT
          </Text>
          <Text style={styles.PrimaryValueLabel}>Current Balance</Text>
        </View>

        <View style={styles.primaryValueContainer}>
          <Text style={styles.PrimaryValueDigit}>{income} DT</Text>
          <Text style={styles.PrimaryValueLabel}>Monthly Income</Text>
        </View>
      </View>
      {accountInfo.accountBalance && income && (
        <CircularProgress
          value={(accountInfo.accountBalance / parseInt(income, 10)) * 100}
          radius={120}
          valueSuffix="%"
          duration={2000}
          progressValueColor="#ecf0f1"
          maxValue={100}
          title="Money Spent"
          titleColor="#8F9192"
          inActiveStrokeColor="#8F9192"
          activeStrokeWidth={20}
          inActiveStrokeWidth={20}
          activeStrokeColor="#fff"
          titleStyle={{ fontFamily: "poppins300", fontSize: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22272C",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  valuesContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 200,
    justifyContent: "space-around",
  },
  primaryValueContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  PrimaryValueDigit: {
    fontSize: 24,
    fontFamily: "poppins800",
    color: "#fff",
  },
  PrimaryValueLabel: {
    fontSize: 14,
    fontFamily: "poppins400",
    color: "#8F9192",
  },
});

export default HomeScreen;
