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

export default function Bai7_BookDetail() {
  const book = books[1];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: book.image }} style={styles.image} />

        <Text style={styles.title}>{book.title}</Text>

        <Text style={styles.author}>Tác giả: {book.author}</Text>

        <Text style={styles.price}>{book.price}</Text>

        <Text style={styles.heading}>Mô tả</Text>

        <Text style={styles.description}>
          Đây là màn hình chi tiết sách của BookStore. Nội dung mô tả được đặt
          trong ScrollView để người dùng có thể cuộn khi phần nội dung dài. Cuốn
          sách cung cấp nhiều nội dung hữu ích, phù hợp với người đọc và có thể
          được sử dụng làm ví dụ cho bài thực hành Flexbox trong React Native.
        </Text>

        <Text style={styles.heading}>Thông tin thêm</Text>

        <Text style={styles.description}>
          Sách được trình bày với ảnh lớn ở phía trên, thông tin sản phẩm ở giữa
          và thanh thêm vào giỏ hàng được cố định ở cuối màn hình.
        </Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.total}>{book.price}</Text>

        <View style={styles.addButton}>
          <Text style={styles.addText}>Thêm vào giỏ</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  image: {
    width: "70%",
    aspectRatio: 3 / 4,
    alignSelf: "center",
    borderRadius: 12,
    marginBottom: 18,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
  },

  author: {
    marginTop: 8,
    color: "#666",
    fontSize: 16,
  },

  price: {
    marginTop: 10,
    color: "#d32f2f",
    fontSize: 21,
    fontWeight: "bold",
  },

  heading: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 19,
    fontWeight: "bold",
  },

  description: {
    color: "#555",
    lineHeight: 24,
    fontSize: 16,
  },

  bottomBar: {
    height: 70,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },

  total: {
    color: "#d32f2f",
    fontSize: 18,
    fontWeight: "bold",
  },

  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: "#3949ab",
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
