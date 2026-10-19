import React, { useState } from "react";
import {View, Text, TextInput, Button, TouchableOpacity, StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../data/db.json";

export async function getUsers() {
  const saved = await AsyncStorage.getItem("users");
  return [...db.users, ...(saved ? JSON.parse(saved) : [])];
}

export default function AuthScreen({ onLogin }: any) {
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState(false);

  const emailError = !email.trim()
    ? "Vui lòng nhập email"
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ? "Email không hợp lệ" : "";

  const passwordError = password.length < 6
    ? "Mật khẩu phải có ít nhất 6 ký tự" : "";

  const login = async () => {
    setSubmitError(true);
    setError("");

    if ((register && !name.trim()) || emailError || passwordError)
      return;

    try {
      const users = await getUsers();
      let user: any;

      if (register) {
        if (users.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
          setError("Email đã tồn tại");
          return;
        }

        user = {
          id: String(Math.max(0, ...users.map(u => Number(u.id) || 0)) + 1),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password
        };

        const saved = await AsyncStorage.getItem("users");
        const newUsers = saved ? JSON.parse(saved) : [];
        await AsyncStorage.setItem("users", JSON.stringify([...newUsers, user]));
      } else {
        user = users.find(u =>
          u.email.toLowerCase() === email.trim().toLowerCase()
          && u.password === password
        );

        if (!user) {
          setError("Sai email hoặc mật khẩu");
          return;
        }
      }

      await onLogin({
        id: user.id,
        name: user.name,
        email: user.email
      });
    } catch {
      setError("Không thể lưu hoặc đọc dữ liệu");
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>
        {register ? "Đăng ký" : "Đăng nhập"}
      </Text>

      {register && (
        <>
          <TextInput
            style={s.input}
            placeholder="Họ tên"
            value={name}
            onChangeText={setName}
          />
          {submitError && !name.trim() &&
            <Text style={s.error}>Vui lòng nhập họ tên</Text>}
        </>
      )}

      <TextInput
        style={s.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {submitError && !!emailError &&
        <Text style={s.error}>{emailError}</Text>}

      <TextInput
        style={s.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {submitError && !!passwordError &&
        <Text style={s.error}>{passwordError}</Text>}

      {!!error && <Text style={s.error}>{error}</Text>}

      <Button
        title={register ? "Đăng ký" : "Đăng nhập"}
        onPress={login}
      />

      <TouchableOpacity onPress={() => {
        setRegister(!register);
        setError("");
        setSubmitError(false);
      }}>
        <Text style={s.link}>
          {register ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: "center" },
  title: { fontSize: 25, fontWeight: "bold", marginBottom: 25, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginTop: 12 },
  error: { color: "red", fontSize: 12, marginBottom: 8 },
  link: { textAlign: "center", marginTop: 20, color: "blue" }
});