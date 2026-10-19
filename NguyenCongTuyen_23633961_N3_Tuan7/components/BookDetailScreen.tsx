import React, { useEffect, useState } from "react";
import {View, Text, Image, ScrollView, FlatList, TextInput, Button, TouchableOpacity, Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../data/db.json";
import RatingStars from "./RatingStars";

export default function BookDetailScreen({
  bookId, user, goLogin, openDetail, addCart
}: any) {
  const book = db.books.find(b => b.id === bookId);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const loadReviews = async () => {
    const saved = await AsyncStorage.getItem("reviews");
    const all = [...db.reviews, ...(saved ? JSON.parse(saved) : [])];
    setReviews(all.filter(r => r.bookId === bookId));
  };

  useEffect(() => {
    loadReviews();
    setComment("");
    setRating(5);
  }, [bookId]);

  if (!book) return <Text>Không tìm thấy sách</Text>;

  const related = db.books.filter(
    b => b.genre === book.genre && b.id !== book.id
  );

  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
    : 0;

  const sendReview = async () => {
    if (!user) return goLogin();
    if (!comment.trim()) return Alert.alert("Lỗi", "Nhập bình luận");

    try {
      const saved = await AsyncStorage.getItem("reviews");
      const old = saved ? JSON.parse(saved) : [];
      const all = [...db.reviews, ...old];

      const review = {
        id: String(Math.max(0, ...all.map(r => Number(r.id) || 0)) + 1),
        bookId,
        userId: user.id,
        userName: user.name,
        rating,
        comment: comment.trim()
      };

      await AsyncStorage.setItem("reviews", JSON.stringify([...old, review]));
      setReviews([review, ...reviews]);
      setComment("");
      setRating(5);
      Alert.alert("Thành công", "Đã gửi đánh giá");
    } catch {
      Alert.alert("Lỗi", "Không lưu được đánh giá");
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 15 }}>
      <Image
        source={{ uri: book.cover }}
        style={{ width: 180, height: 240, alignSelf: "center" }}
      />

      <Text style={title}>{book.title}</Text>
      <Text>Tác giả: {book.author}</Text>
      <Text>Thể loại: {book.genre}</Text>
      <Text>Số trang: {book.pages}</Text>
      <Text>{book.available ? "Còn sách" : "Hết sách"}</Text>

      <RatingStars value={average} />
      <Text>{average.toFixed(1)}/5 ({reviews.length} đánh giá)</Text>

      <Button
        title="Thêm vào giỏ hàng"
        disabled={!book.available}
        onPress={() => {
          addCart(book);
          Alert.alert("Thành công", "Đã thêm sách");
        }}
      />

      <Text style={title}>Đánh giá khách hàng</Text>

      {reviews.length === 0 && <Text>Chưa có đánh giá</Text>}

      {reviews.map(r => (
        <View key={r.id} style={card}>
          <Text style={{ fontWeight: "bold" }}>{r.userName}</Text>
          <RatingStars value={r.rating} />
          <Text>{r.comment}</Text>
        </View>
      ))}

      <Text style={title}>Viết đánh giá</Text>

      {user ? (
        <>
          <RatingStars value={rating} onChange={setRating} />
          <TextInput
            placeholder="Nhập bình luận..."
            value={comment}
            onChangeText={setComment}
            multiline
            style={{ borderWidth: 1, padding: 10, height: 80, marginVertical: 10 }}
          />
          <Button title="Gửi đánh giá" onPress={sendReview} />
        </>
      ) : (
        <Button title="Đăng nhập để đánh giá" onPress={goLogin} />
      )}

      <Text style={title}>📚 Sách liên quan</Text>

      <FlatList
        horizontal
        nestedScrollEnabled
        data={related}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>Không có sách liên quan</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[card, { width: 150, marginRight: 10 }]}
            onPress={() => openDetail(item.id)}
          >
            <Image
              source={{ uri: item.cover }}
              style={{ width: "100%", height: 150 }}
            />
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.genre}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const title = {
  fontSize: 20,
  fontWeight: "bold",
  marginTop: 25,
  marginBottom: 12
} as const;

const card = {
  backgroundColor: "#eee",
  padding: 12,
  borderRadius: 8,
  marginBottom: 10
} as const;