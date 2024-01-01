import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function TransCell({
  name,
  date,
  ammount,
  isSender,
}: {
  name: string;
  date: string;
  ammount: number;
  isSender: boolean;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome
          name={isSender ? "long-arrow-down" : "long-arrow-up"}
          size={28}
          color="white"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.moneyContainer}>
        <Text style={styles.ammount}>{ammount}DT</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 100,
    backgroundColor: "#ffffff00",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#999",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flexGrow: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  moneyContainer: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  name: {
    fontFamily: "poppins500",
    fontSize: 16,
    color: "#fff",
  },
  date: {
    fontFamily: "poppins400",
    fontSize: 14,
    color: "#999",
  },
  ammount: {
    fontFamily: "poppins700",
    fontSize: 16,
    color: "#fff",
  },
});

export default TransCell;
