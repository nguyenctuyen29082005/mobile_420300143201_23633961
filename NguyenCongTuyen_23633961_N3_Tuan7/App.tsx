import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, ScrollView, Image, Button, ActivityIndicator, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import db from "./data/db.json";
import AuthScreen, { getUsers } from "./components/AuthScreen";
import BookDetailScreen from "./components/BookDetailScreen";

export default function App() {
  const [screen, setScreen] = useState("Home");
  const [user, setUser] = useState<any>(null);
  const [bookId, setBookId] = useState("1");
  const [cart, setCart] = useState<any[]>([]);
  const [redirect, setRedirect] = useState("Home");
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);

  // Tự động đăng nhập
  useEffect(() => {
    const restore = async () => {
      try {
        const saved = await AsyncStorage.getItem("bookstore_user");
        const token = await AsyncStorage.getItem("bookstore_token");

        if (saved && token) {
          const account = JSON.parse(saved);
          const users = await getUsers();

          const found = users.find(u =>
            u.id === account.id &&
            u.email === account.email &&
            token.startsWith(`demo-${u.id}-`)
          );

          if (found) setUser({
            id: found.id,
            name: found.name,
            email: found.email
          });
        }
      } catch (e) {
        console.log("Lỗi auto-login:", e);
      } finally {
        setReady(true);
      }
    };
    restore();
  }, []);

  const login = async (account: any) => {
    await AsyncStorage.multiSet([
      ["bookstore_user", JSON.stringify(account)],
      ["bookstore_token", `demo-${account.id}-${Date.now()}`]
    ]);
    setUser(account);
    setScreen(redirect);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["bookstore_user", "bookstore_token"]);
    setUser(null);
    setScreen("Account");
  };

  const goLogin = (next = "Home") => {
    setRedirect(next);
    setScreen("Auth");
  };

  const addCart = (book: any) => {
    setCart(old => [...old, book]);
  };

  const checkout = () => {
    if (!user) goLogin("Checkout");
    else setScreen("Checkout");
  };

  if (!ready) return (
    <SafeAreaProvider>
      <View style={s.center}>
        <ActivityIndicator size="large" />
        <Text>Đang khởi động...</Text>
      </View>
    </SafeAreaProvider>
  );

  const books = db.books.filter(b =>
    (b.title + b.author + b.genre)
      .toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* MENU */}
        <View style={s.menu}>
          {["Home", "Cart", "Account"].map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => setScreen(item)}
            >
              <Text style={s.menuText}>
                {item === "Home" ? "🏠 Home" :
                 item === "Cart" ? `🛒 Giỏ (${cart.length})` : "👤 Tài khoản"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {screen === "Home" && (
          <View style={s.container}>
            <Text style={s.title}>📚 BookStore Online</Text>

            <TextInputSearch search={search} setSearch={setSearch} />

            <ScrollView>
              <View style={s.grid}>
                {books.map(book => (
                  <TouchableOpacity
                    key={book.id}
                    style={s.book}
                    onPress={() => {
                      setBookId(book.id);
                      setScreen("Detail");
                    }}
                  >
                    <Image source={{ uri: book.cover }} style={s.cover} />
                    <Text style={{ fontWeight: "bold" }}>{book.title}</Text>
                    <Text>{book.author}</Text>
                    <Text>{book.genre}</Text>
                    <Text>{book.pages} trang</Text>
                    <Text style={{ color: book.available ? "green" : "red" }}>
                      {book.available ? "Còn sách" : "Hết sách"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* ĐĂNG NHẬP */}
        {screen === "Auth" && (
          <AuthScreen onLogin={login} />
        )}

        {screen === "Detail" && (
          <View style={{ flex: 1 }}>
            <Button title="← Quay lại" onPress={() => setScreen("Home")} />
            <BookDetailScreen
              bookId={bookId}
              user={user}
              goLogin={() => goLogin("Detail")}
              openDetail={(id: string) => setBookId(id)}
              addCart={addCart}
            />
          </View>
        )}

        {screen === "Cart" && (
          <ScrollView style={s.container}>
            <Text style={s.title}>🛒 Giỏ hàng</Text>

            {cart.length === 0 && <Text>Giỏ hàng trống</Text>}

            {cart.map((book, i) => (
              <View key={i} style={s.item}>
                <Text style={{ fontWeight: "bold" }}>{book.title}</Text>
                <Button
                  title="Xóa"
                  onPress={() => setCart(cart.filter((_, index) => index !== i))}
                />
              </View>
            ))}

            <Text style={{ marginVertical: 15 }}>
              Tổng số sách: {cart.length}
            </Text>

            <Button
              title="Thanh toán"
              disabled={cart.length === 0}
              onPress={checkout}
            />
          </ScrollView>
        )}
        {screen === "Account" && (
          <View style={s.container}>
            <Text style={s.title}>👤 Tài khoản</Text>

            {user ? (
              <>
                <Text>Họ tên: {user.name}</Text>
                <Text>Email: {user.email}</Text>
                <View style={{ marginTop: 20 }}>
                  <Button title="Đăng xuất" color="red" onPress={logout} />
                </View>
              </>
            ) : (
              <Button
                title="Đăng nhập / Đăng ký"
                onPress={() => goLogin("Home")}
              />
            )}
          </View>
        )}
        {screen === "Checkout" && (
          <View style={s.container}>
            {user ? (
              <>
                <Text style={s.title}>✅ Thanh toán</Text>
                <Text>Khách hàng: {user.name}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Số sách: {cart.length}</Text>
                <Text style={{ marginTop: 15 }}>
                  Bạn đã đăng nhập và được phép thanh toán.
                </Text>
              </>
            ) : (
              <Button
                title="Đăng nhập để thanh toán"
                onPress={() => goLogin("Checkout")}
              />
            )}
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Ô tìm kiếm
import { TextInput } from "react-native";

function TextInputSearch({ search, setSearch }: any) {
  return (
    <TextInput
      placeholder="Tìm sách..."
      value={search}
      onChangeText={setSearch}
      style={s.input}
    />
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  menu: {
    flexDirection: "row", justifyContent: "space-around",
    padding: 15, backgroundColor: "#3949AB"
  },
  menuText: { color: "white", fontWeight: "bold" },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 15 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  book: {
    width: "48%", backgroundColor: "#eee",
    padding: 10, borderRadius: 10, marginBottom: 12
  },
  cover: { width: "100%", height: 170, marginBottom: 8 },
  item: { backgroundColor: "#eee", padding: 12, marginBottom: 10 }
});