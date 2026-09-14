// src/exercises/Bai15_PullToRefresh.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface Book {
  id: number;
  title: string;
}

export default function Bai15_PullToRefresh() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=10");
      const json = await response.json();
      setBooks(json.products as Book[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bài 15: Kéo để tải lại trang</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    padding: 15,
    marginVertical: 6,
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
  },
});
