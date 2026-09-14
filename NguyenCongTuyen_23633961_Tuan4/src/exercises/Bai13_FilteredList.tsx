import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Bai13_FilteredList() {
  function filterByName<T extends { name: string }>(
    items: T[],
    keyword: string,
  ): T[] {
    return items.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  const categories = [
    { id: 1, name: "Sách Kinh Tế" },
    { id: 2, name: "Sách Văn Học" },
  ];
  const filteredCategories = filterByName(categories, "Kinh Tế");

  const authors = [
    { id: 1, name: "Nguyễn Nhật Ánh", age: 60 },
    { id: 2, name: "Nam Cao", age: 36 },
  ];
  const filteredAuthors = filterByName(authors, "Nam Cao");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bài 13: Filtered List Generic</Text>

      <Text style={styles.subHeader}>Kết quả lọc Thể Loại:</Text>
      {filteredCategories.map((c) => (
        <Text key={c.id}>- {c.name}</Text>
      ))}

      <Text style={styles.subHeader2}>Kết quả lọc Tác Giả:</Text>
      {filteredAuthors.map((a) => (
        <Text key={a.id}>
          - {a.name} ({a.age} tuổi)
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 18, fontWeight: "bold" },
  subHeader: { fontSize: 16, fontWeight: "bold", marginTop: 15, color: "blue" },
  subHeader2: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    color: "green",
  },
});
