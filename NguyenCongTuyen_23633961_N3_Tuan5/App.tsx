import React from "react";
import { StyleSheet, View } from "react-native";

// Bài 1
import Bai1_Header from "./src/Bai1_Header";

// Bài 2
import Bai2_BookCard from "./src/Bai2_BookCard";

// Bài 3
import Bai3_CategoryChips from "./src/Bai3_CategoryChips";

// Bài 4
import Bai4_BookGrid from "./src/Bai4_BookGrid";

// Bài 5
import Bai5_BadgeFloatingCart from "./src/Bai5_BadgeFloatingCart";

// Bài 6
import Bai6_HomeBookStore from "./src/Bai6_HomeBookStore";

// Bài 7
import Bai7_BookDetail from "./src/Bai7_BookDetail";

// Bài 8
import Bai8_BottomTab from "./src/Bai8_BottomTab";

// Bài 9
import Bai9_CartScreen from "./src/Bai9_CartScreen";

// Bài 10
import Bai10_LayoutTongHop from "./src/Bai10_LayoutTongHop";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Bai1_Header /> */}

      {/* <Bai2_BookCard /> */}

      {/* <Bai3_CategoryChips /> */}

      {/* <Bai4_BookGrid /> */}

      {/* <Bai5_BadgeFloatingCart /> */}

      <Bai6_HomeBookStore />

      {/* <Bai7_BookDetail /> */}

      {/* <Bai8_BottomTab /> */}

      {/* <Bai9_CartScreen /> */}
      {/* 
      <Bai10_LayoutTongHop /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
