import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import Bai09_NewsFeed from "./src/exercises/Bai09_NewsFeed";
import Bai10_UserProfile from "./src/exercises/Bai10_UserProfile";
import Bai11_ProductSearch from "./src/exercises/Bai11_ProductSearch";
import Bai12_ErrorHandling from "./src/exercises/Bai12_ErrorHandling";
import Bai13_FilteredList from "./src/exercises/Bai13_FilteredList";
import Bai14_Pagination from "./src/exercises/Bai14_Pagination";
import Bai15_PullToRefresh from "./src/exercises/Bai15_PullToRefresh";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Bai09_NewsFeed />
      {/* <Bai10_UserProfile /> */}
      {/* <Bai11_ProductSearch /> */}
      {/* <Bai12_ErrorHandling /> */}
      {/* <Bai13_FilteredList /> */}
      {/* <Bai14_Pagination /> */}
      {/* <Bai15_PullToRefresh /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
