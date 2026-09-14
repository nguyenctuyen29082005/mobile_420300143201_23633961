import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";

interface CustomError {
  message: string;
}

export default function Bai12_ErrorHandling() {
  const triggerErrorApi = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/productss/search?q=pone&limit=",
      );
      if (!response.ok) {
        throw new Error(
          `Mã lỗi: ${response.status} - Không tìm thấy trang yêu cầu.`,
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customErr: CustomError = { message: error.message };
        Alert.alert("Thông Báo Lỗi API", customErr.message);
      } else {
        Alert.alert("Lỗi Hệ Thống", "Đã xảy ra lỗi không xác định.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bài 12: Xử lý lỗi API</Text>
      <Text style={styles.description}>
        Nhấn vào nút bên dưới để gửi một yêu cầu API sai URL cố định và kiểm tra
        thông báo Alert.
      </Text>

      <Button
        title="Kích Hoạt Lỗi API"
        color="#d9534f"
        onPress={triggerErrorApi}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
