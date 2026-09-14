import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";

interface Product {
  id: number;
  title: string;
  price: number;
}

export default function Bai11_ProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [keyword, setKeyword] = useState("phone");

  const fetchProducts = async (
    keyword: string,
    limit: number,
  ): Promise<void> => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`,
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products as Product[]);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts("phone", 5);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bài 11: Tìm kiếm sản phẩm</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa sản phẩm..."
          value={keyword}
          onChangeText={setKeyword}
        />
        <Button title="Tìm" onPress={() => fetchProducts(keyword, 5)} />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              {item.title} - ${item.price}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
  },
  item: { padding: 10, borderBottomWidth: 1, borderColor: "#eee" },
});
