import React from "react";

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { books } from "./data";

export default function Bai9_CartScreen() {
  const cartBooks = books.slice(0, 4);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>Giỏ hàng</Text>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
      >
        {cartBooks.map((book, index) => (
          <View key={book.id} style={styles.row}>
            <Image source={{ uri: book.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {book.title}
              </Text>

              <Text style={styles.author}>{book.author}</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.quantity}>x{index + 1}</Text>

              <Text style={styles.price}>{book.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.totalBar}>
        <View>
          <Text style={styles.totalLabel}>Tổng tiền</Text>

          <Text style={styles.total}>347.000đ</Text>
        </View>

        <View style={styles.payButton}>
          <Text style={styles.payText}>Thanh toán</Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        <View style={styles.tab}>
          <Text>🏠</Text>
          <Text>Trang chủ</Text>
        </View>

        <View style={styles.tab}>
          <Text>📚</Text>
          <Text>Danh mục</Text>
        </View>

        <View style={styles.tab}>
          <Text>🛒</Text>
          <Text style={styles.active}>Giỏ hàng</Text>
        </View>

        <View style={styles.tab}>
          <Text>👤</Text>
          <Text>Tài khoản</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  heading: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 23,
    fontWeight: "bold",
  },

  list: {
    flex: 1,
  },

  listContent: {
    padding: 16,
    paddingBottom: 10,
  },

  row: {
    marginBottom: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  image: {
    width: 55,
    height: 75,
    borderRadius: 7,
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  title: {
    fontWeight: "bold",
  },

  author: {
    marginTop: 5,
    color: "#777",
    fontSize: 12,
  },

  right: {
    width: 85,
    alignItems: "flex-end",
  },

  quantity: {
    color: "#666",
    marginBottom: 8,
  },

  price: {
    color: "#d32f2f",
    fontWeight: "bold",
    fontSize: 13,
  },

  totalBar: {
    height: 72,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  totalLabel: {
    color: "#666",
  },

  total: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "bold",
    color: "#d32f2f",
  },

  payButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#3949ab",
  },

  payText: {
    color: "#fff",
    fontWeight: "bold",
  },

  tabBar: {
    height: 65,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },

  active: {
    color: "#3949ab",
    fontWeight: "bold",
  },
});
