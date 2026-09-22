import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { books } from "./data";

export default function Bai4_BookGrid() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Sách bán chạy</Text>

      <View style={styles.grid}>
        {books.map((book) => (
          <View key={book.id} style={styles.item}>
            <Image source={{ uri: book.image }} style={styles.image} />

            <Text style={styles.title} numberOfLines={2}>
              {book.title}
            </Text>

            <Text style={styles.price}>{book.price}</Text>
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

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  item: {
    width: "48%",
    marginBottom: 18,
  },

  image: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 10,
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    marginTop: 5,
    color: "#d32f2f",
    fontWeight: "bold",
  },
});
