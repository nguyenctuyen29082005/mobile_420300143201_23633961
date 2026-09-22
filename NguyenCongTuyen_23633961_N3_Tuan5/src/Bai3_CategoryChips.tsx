import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { categories } from "./data";

export default function Bai3_CategoryChips() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Danh mục sách</Text>

      <View style={styles.chips}>
        {categories.map((category) => (
          <View key={category} style={styles.chip}>
            <Text style={styles.chipText}>{category}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignContent: "flex-start",
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#3949ab",
    backgroundColor: "#fff",
  },

  chipText: {
    color: "#3949ab",
    fontWeight: "600",
  },
});
