import React, { useState } from "react";
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StyleSheet,
} from "react-native";

import db from "../data/db.json";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  rating: number;
  cover: string;
  available: boolean;
};

type Props = {
  onSelect: (id: string) => void;
};

export default function HomeScreen({ onSelect }: Props) {
  const [search, setSearch] = useState("");

  const books: Book[] = db.books;

  const filteredBooks = books.filter((book) => {
    const keyword = search.trim().toLowerCase();

    return (
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword) ||
      book.genre.toLowerCase().includes(keyword)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 BookStore Online</Text>

      <TextInput
        style={styles.input}
        placeholder="Tìm theo tên, tác giả, thể loại..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.count}>
        Có {filteredBooks.length} cuốn sách
      </Text>

      <FlatList
        data={filteredBooks}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 25 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Không tìm thấy sách phù hợp.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onSelect(item.id)}
          >
            <Image
              source={{ uri: item.cover }}
              style={styles.cover}
            />

            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            <Text style={styles.author} numberOfLines={1}>
              {item.author}
            </Text>

            <Text style={styles.genre}>{item.genre}</Text>

            <Text style={styles.pages}>
              {item.pages} trang
            </Text>

            <Text
              style={{
                color: item.available ? "green" : "red",
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              {item.available ? "Còn sách" : "Hết sách"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 14,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3949AB",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  count: {
    color: "#666",
    marginBottom: 12,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 10,
    marginBottom: 12,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },
  cover: {
    width: "100%",
    height: 175,
    borderRadius: 8,
    backgroundColor: "#EEE",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    minHeight: 38,
  },
  author: {
    fontSize: 13,
    color: "#666",
    marginTop: 5,
  },
  genre: {
    fontSize: 13,
    color: "#3949AB",
    marginTop: 5,
  },
  pages: {
    fontSize: 13,
    marginTop: 5,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
  },
});