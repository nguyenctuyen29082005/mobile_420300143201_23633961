import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { books } from "./data";

export default function Bai2_BookCard() {
  const book = books[0];

  return (
    <View style={styles.card}>
      <Image source={{ uri: book.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>

        <Text style={styles.author}>{book.author}</Text>

        <Text style={styles.price}>{book.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
  },

  image: {
    width: 80,
    height: 110,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    height: 110,
    marginLeft: 12,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
  },

  author: {
    color: "#666",
  },

  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#d32f2f",
  },
});
