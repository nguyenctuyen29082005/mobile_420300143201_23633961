import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { books } from "./data";

export default function Bai5_BadgeFloatingCart() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Sách giảm giá</Text>

        <View style={styles.grid}>
          {books.map((book) => (
            <View key={book.id} style={styles.item}>
              <View style={styles.imageBox}>
                <Image source={{ uri: book.image }} style={styles.image} />

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{book.discount}</Text>
                </View>
              </View>

              <Text style={styles.title} numberOfLines={2}>
                {book.title}
              </Text>

              <Text style={styles.price}>{book.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.cartButton}>
        <Text style={styles.cartIcon}>🛒</Text>

        <View style={styles.quantity}>
          <Text style={styles.quantityText}>3</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#f5f5f5",
  },

  content: {
    padding: 16,
    paddingBottom: 110,
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

  imageBox: {
    position: "relative",
  },

  image: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 10,
  },

  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#e53935",
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  title: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
  },

  price: {
    marginTop: 5,
    color: "#d32f2f",
    fontWeight: "bold",
  },

  cartButton: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3949ab",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  cartIcon: {
    fontSize: 27,
  },

  quantity: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#e53935",
    justifyContent: "center",
    alignItems: "center",
  },

  quantityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
