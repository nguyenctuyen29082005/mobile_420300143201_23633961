import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Bai8_BottomTab() {
  const tabs = [
    {
      icon: "🏠",
      name: "Trang chủ",
    },
    {
      icon: "📚",
      name: "Danh mục",
    },
    {
      icon: "🛒",
      name: "Giỏ hàng",
    },
    {
      icon: "👤",
      name: "Tài khoản",
    },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.fakeContent}>
        <Text style={styles.title}>BookStore</Text>

        <Text>Đây là nội dung phía trên Bottom Tab Bar.</Text>
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <View key={tab.name} style={styles.tab}>
            <Text style={[styles.icon, index === 0 && styles.activeText]}>
              {tab.icon}
            </Text>

            <Text style={[styles.name, index === 0 && styles.activeText]}>
              {tab.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  fakeContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
  },

  tabBar: {
    height: 70,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },

  tab: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 22,
    marginBottom: 3,
  },

  name: {
    fontSize: 12,
    color: "#666",
  },

  activeText: {
    color: "#3949ab",
    fontWeight: "bold",
  },
});
