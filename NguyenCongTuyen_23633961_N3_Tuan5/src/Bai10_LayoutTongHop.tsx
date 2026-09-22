import React from "react";

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { books, categories } from "./data";

export default function Bai10_LayoutTongHop() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>BookStore</Text>

        <Text style={styles.icon}>🛒</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh mục</Text>

        <View style={styles.chips}>
          {categories.map((category) => (
            <View key={category} style={styles.chip}>
              <Text style={styles.chipText}>{category}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Sách trong giỏ hàng</Text>

        {books.slice(0, 4).map((book) => (
          <View key={book.id} style={styles.product}>
            <Image source={{ uri: book.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {book.title}
              </Text>

              <Text style={styles.author}>{book.author}</Text>

              <Text style={styles.price}>{book.price}</Text>
            </View>

            <Text style={styles.quantity}>x1</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.totalBar}>
        <View>
          <Text style={styles.totalLabel}>Tổng tiền</Text>

          <Text style={styles.total}>332.000đ</Text>
        </View>

        <View style={styles.payButton}>
          <Text style={styles.payText}>Thanh toán</Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        <View style={styles.tab}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.active}>Trang chủ</Text>
        </View>

        <View style={styles.tab}>
          <Text style={styles.tabIcon}>📚</Text>
          <Text>Danh mục</Text>
        </View>

        <View style={styles.tab}>
          <Text style={styles.tabIcon}>🛒</Text>
          <Text>Giỏ hàng</Text>
        </View>

        <View style={styles.tab}>
          <Text style={styles.tabIcon}>👤</Text>
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

  icon: {
    fontSize: 24,
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 20,
  },

  sectionTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "bold",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },

  chip: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3949ab",
    backgroundColor: "#fff",
  },

  chipText: {
    color: "#3949ab",
  },

  product: {
    marginBottom: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  image: {
    width: 58,
    height: 78,
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
    marginTop: 4,
    color: "#777",
    fontSize: 12,
  },

  price: {
    marginTop: 5,
    color: "#d32f2f",
    fontWeight: "bold",
  },

  quantity: {
    width: 35,
    textAlign: "center",
    color: "#555",
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
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  tabIcon: {
    fontSize: 20,
  },

  active: {
    color: "#3949ab",
    fontWeight: "bold",
  },
});
