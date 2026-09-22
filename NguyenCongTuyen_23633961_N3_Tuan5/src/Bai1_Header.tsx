import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Bai1_Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>BookStore</Text>

      <View style={styles.actions}>
        <Text style={styles.icon}>🔍</Text>
        <Text style={styles.icon}>🛒</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#283593",
  },

  logo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  icon: {
    fontSize: 22,
  },
});
