// src/exercises/Bai14_Pagination.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ApiResponse } from "../types/api.types";

interface BookProduct {
  id: number;
  title: string;
}

export default function Bai14_Pagination() {
  const [paginatedData, setPaginatedData] =
    useState<ApiResponse<BookProduct> | null>(null);

  useEffect(() => {
    const fetchPaginatedBooks = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=10");
        const json = await response.json();

        const structuredResponse: ApiResponse<BookProduct> = {
          data: json.products.map((p: any) => ({ id: p.id, title: p.title })),
          total: json.total,
          page: 1,
        };

        setPaginatedData(structuredResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaginatedBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bài 14: Phân trang dữ liệu</Text>
      <Text>
        Trang hiện tại: {paginatedData?.page} | Tổng số item:{" "}
        {paginatedData?.total}
      </Text>

      <FlatList
        data={paginatedData?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  row: { padding: 12, borderBottomWidth: 1, borderColor: "#ddd" },
});
