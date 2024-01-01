import { ScrollView, StyleSheet, Text } from "react-native";

import TransCell from "./transCell";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TransactionsListPage() {
  const [transactions, setTransactions] = useState<any>([]);
  useEffect(() => {
    AsyncStorage.getItem("accountInfo").then((res) => {
      axios
        .get(
          "http://192.168.227.77:8080/api/bankStatement/getAllTransactions?account=" +
            JSON.parse(res || "{}").accountNumber,
        )
        .then((res) => {
          console.log(res.data);
          setTransactions(res.data);
        });
    });
  }, []);
  if (!transactions || transactions.length === 0)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>transactions</Text>
        <Text style={{ color: "white", fontFamily: "poppins400" }}>
          No transactions yet
        </Text>
      </ScrollView>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>transactions</Text>
      {transactions.reverse().map((trn: any, key: number) => {
        return (
          <TransCell
            name={trn.accountNumber}
            date={trn.createdAt}
            ammount={trn.amount}
            isSender={trn.transactionType === "CREDIT"}
            key={key}
          />
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: 10,
    backgroundColor: "#22272C",
    alignItems: "center",
  },
  title: {
    fontFamily: "poppins600",
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
});

export default TransactionsListPage;
