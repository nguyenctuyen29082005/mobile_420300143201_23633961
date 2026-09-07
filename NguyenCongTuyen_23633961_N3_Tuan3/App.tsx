// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// export default function CounterScreen() {
//   const [count, setCount] = useState(0);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Số lượng: {count}</Text>

//       <Button
//         title="Tăng"
//         onPress={() => setCount(previousCount => previousCount + 1)}
//       />

//       <Button
//         title="Giảm"
//         onPress={() =>
//           setCount(previousCount => Math.max(0, previousCount - 1))
//         }
//       />

//       <Button title="Đặt lại" onPress={() => setCount(0)} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     gap: 12,
//     justifyContent: 'center',
//     padding: 24,
//   },
//   title: {
//     fontSize: 24,
//     textAlign: 'center',
//   },
// });

// Bài 1

// import { useState } from 'react';
// import {
//   Pressable,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';

// export default function App() {

//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const trimmedName = name.trim();
//   const ageNumber = Number(age);

//   const isUnder18 =
//     age.trim() !== '' &&
//     !isNaN(ageNumber) &&
//     ageNumber < 18;

//   const clearAll = () => {
//     setName('');
//     setAge('');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>
//           Bài 1 - useState
//         </Text>

//         <Text style={styles.label}>
//           Họ và tên
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Nhập họ tên..."
//           value={name}
//           onChangeText={setName}
//         />
//         <Text style={styles.label}>
//           Tuổi
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Nhập tuổi..."
//           value={age}
//           onChangeText={setAge}
//           keyboardType="numeric"
//         />

//         {trimmedName ? (
//           <Text style={styles.greeting}>
//             Xin chào, {trimmedName}!
//           </Text>
//         ) : (
//           <Text style={styles.hint}>
//             Vui lòng nhập họ tên
//           </Text>
//         )}

//         {isUnder18 && (
//           <Text style={styles.warning}>
//             Bạn chưa đủ 18 tuổi.
//           </Text>
//         )}

//         <Pressable
//           style={styles.clearButton}
//           onPress={clearAll}
//         >
//           <Text style={styles.clearButtonText}>
//             Xóa toàn bộ dữ liệu
//           </Text>
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FA',
//   },

//   card: {
//     margin: 20,
//     padding: 20,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 20,
//   },

//   label: {
//     fontSize: 15,
//     fontWeight: '600',
//     marginBottom: 8,
//     marginTop: 12,
//   },

//   input: {
//     height: 48,
//     borderWidth: 1,
//     borderColor: '#D5D9E0',
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     backgroundColor: '#FFFFFF',
//   },

//   greeting: {
//     marginTop: 18,
//     fontSize: 18,
//     fontWeight: '700',
//   },

//   hint: {
//     marginTop: 18,
//     color: '#777777',
//   },

//   warning: {
//     marginTop: 12,
//     fontSize: 16,
//     fontWeight: '600',
//   },

//   clearButton: {
//     marginTop: 20,
//     alignSelf: 'flex-start',
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     borderRadius: 10,
//     backgroundColor: '#333333',
//   },

//   clearButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
// });

// Bài 2

// import { useEffect, useState } from 'react';
// import {
//   Pressable,
//   SafeAreaView,
//   StyleSheet,
//   Switch,
//   Text,
//   View,
// } from 'react-native';

// export default function App() {
//   const [isConnected, setIsConnected] = useState(false);

//   const [message, setMessage] = useState('Chưa kết nối');

//   const [lastConnectedTime, setLastConnectedTime] = useState('');

//   useEffect(() => {
//     if (isConnected) {
//       setMessage('Thiết bị đã kết nối');

//       const now = new Date();

//       const time = now.toLocaleTimeString('vi-VN');

//       setLastConnectedTime(time);
//     } else {
//       setMessage('Thiết bị đã ngắt kết nối');
//     }
//   }, [isConnected]);

//   const resetConnection = () => {
//     setIsConnected(false);
//     setMessage('Chưa kết nối');
//     setLastConnectedTime('');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>
//           Bài 2 - useEffect
//         </Text>

//         <Text style={styles.subtitle}>
//           Theo dõi trạng thái kết nối giả lập
//         </Text>

//         <View style={styles.switchRow}>
//           <Text style={styles.switchLabel}>
//             Kết nối thiết bị
//           </Text>

//           <Switch
//             value={isConnected}
//             onValueChange={setIsConnected}
//           />
//         </View>

//         <View
//           style={[
//             styles.statusBox,
//             isConnected
//               ? styles.connectedBox
//               : styles.disconnectedBox,
//           ]}
//         >
//           <Text
//             style={[
//               styles.message,
//               isConnected
//                 ? styles.connectedText
//                 : styles.disconnectedText,
//             ]}
//           >
//             {message}
//           </Text>
//         </View>

//         {lastConnectedTime ? (
//           <Text style={styles.timeText}>
//             Kết nối gần nhất: {lastConnectedTime}
//           </Text>
//         ) : (
//           <Text style={styles.timeHint}>
//             Chưa có thời điểm kết nối
//           </Text>
//         )}

//         <Pressable
//           style={styles.resetButton}
//           onPress={resetConnection}
//         >
//           <Text style={styles.resetButtonText}>
//             Đặt lại
//           </Text>
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FA',
//   },

//   card: {
//     margin: 20,
//     padding: 20,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 8,
//   },

//   subtitle: {
//     fontSize: 15,
//     color: '#666666',
//     marginBottom: 24,
//   },

//   switchRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//   },

//   switchLabel: {
//     fontSize: 17,
//     fontWeight: '600',
//   },

//   statusBox: {
//     marginTop: 20,
//     padding: 18,
//     borderRadius: 12,
//     alignItems: 'center',
//   },

//   connectedBox: {
//     backgroundColor: '#E8F5E9',
//   },

//   disconnectedBox: {
//     backgroundColor: '#FFEBEE',
//   },

//   message: {
//     fontSize: 18,
//     fontWeight: '700',
//   },

//   connectedText: {
//     color: '#2E7D32',
//   },

//   disconnectedText: {
//     color: '#C62828',
//   },

//   timeText: {
//     marginTop: 18,
//     fontSize: 15,
//     fontWeight: '600',
//   },

//   timeHint: {
//     marginTop: 18,
//     fontSize: 15,
//     color: '#777777',
//   },

//   resetButton: {
//     marginTop: 22,
//     alignSelf: 'flex-start',
//     paddingHorizontal: 20,
//     paddingVertical: 11,
//     borderRadius: 10,
//     backgroundColor: '#333333',
//   },

//   resetButtonText: {
//     color: '#FFFFFF',
//     fontSize: 15,
//     fontWeight: '600',
//   },
// });

// Bài 3

// import React from 'react';
// import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import { UserProvider } from './src/context/UserContext';
// import ProfileScreen from './src/screens/ProfileScreen';

// export default function App() {
//   return (
//     <UserProvider>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.card}>
//           <Text style={styles.title}>Bài 3 - useContext Mở Rộng</Text>
//           <Text style={styles.subtitle}>Chia sẻ thông tin, ảnh và đăng xuất</Text>

//           <ProfileScreen />
//         </View>
//       </SafeAreaView>
//     </UserProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FA',
//   },
//   card: {
//     margin: 20,
//     padding: 20,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 15,
//     color: '#666666',
//     marginBottom: 20,
//   },
// });

// Bài 4

// import React, { useReducer } from 'react';
// import {
//   ActivityIndicator,
//   Pressable,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';

// type FormState = {
//   email: string;
//   password: string;
//   error: string;
//   isSubmitting: boolean;
// };

// type FormAction =
//   | { type: 'SET_EMAIL'; payload: string }
//   | { type: 'SET_PASSWORD'; payload: string }
//   | { type: 'SET_ERROR'; payload: string }
//   | { type: 'SET_SUBMITTING'; payload: boolean }
//   | { type: 'RESET' };

// const initialState: FormState = {
//   email: '',
//   password: '',
//   error: '',
//   isSubmitting: false,
// };

// function formReducer(state: FormState, action: FormAction): FormState {
//   switch (action.type) {
//     case 'SET_EMAIL':
//       return { ...state, email: action.payload, error: '' };

//     case 'SET_PASSWORD':
//       return { ...state, password: action.payload, error: '' };

//     case 'SET_ERROR':
//       return { ...state, error: action.payload };

//     case 'SET_SUBMITTING':
//       return { ...state, isSubmitting: action.payload };

//     case 'RESET':
//       return initialState;

//     default:
//       return state;
//   }
// }

// export default function LoginScreen() {
//   const [state, dispatch] = useReducer(formReducer, initialState);

//   const handleLogin = () => {
//     if (!state.email.trim() || !state.password.trim()) {
//       dispatch({
//         type: 'SET_ERROR',
//         payload: 'Vui lòng nhập đầy đủ thông tin.',
//       });
//       return;
//     }

//     if (!state.email.includes('@')) {
//       dispatch({
//         type: 'SET_ERROR',
//         payload: 'Email không hợp lệ (Phải chứa ký tự @).',
//       });
//       return;
//     }

//     if (state.password.length < 6) {
//       dispatch({
//         type: 'SET_ERROR',
//         payload: 'Mật khẩu phải có ít nhất 6 ký tự.',
//       });
//       return;
//     }

//     dispatch({ type: 'SET_ERROR', payload: '' });

//     dispatch({ type: 'SET_SUBMITTING', payload: true });

//     setTimeout(() => {
//       dispatch({ type: 'SET_SUBMITTING', payload: false });
//       alert('Đăng nhập thành công!');
//     }, 2000);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Đăng Nhập</Text>
//         <Text style={styles.subtitle}>Quản lý form với useReducer</Text>

//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={[styles.input, state.isSubmitting && styles.disabledInput]}
//           value={state.email}
//           onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
//           placeholder="example@gmail.com"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           editable={!state.isSubmitting}
//         />

//         <Text style={styles.label}>Mật khẩu</Text>
//         <TextInput
//           style={[styles.input, state.isSubmitting && styles.disabledInput]}
//           value={state.password}
//           onChangeText={(text) => dispatch({ type: 'SET_PASSWORD', payload: text })}
//           placeholder="Nhập ít nhất 6 ký tự"
//           secureTextEntry
//           editable={!state.isSubmitting}
//         />

//         {state.error ? <Text style={styles.errorText}>{state.error}</Text> : null}

//         <Pressable
//           style={[styles.primaryButton, state.isSubmitting && styles.disabledButton]}
//           onPress={handleLogin}
//           disabled={state.isSubmitting}
//         >
//           {state.isSubmitting ? (
//             <ActivityIndicator color="#FFFFFF" size="small" />
//           ) : (
//             <Text style={styles.buttonText}>Đăng nhập</Text>
//           )}
//         </Pressable>

//         <Pressable
//           style={[styles.secondaryButton, state.isSubmitting && styles.disabledButton]}
//           onPress={() => dispatch({ type: 'RESET' })}
//           disabled={state.isSubmitting}
//         >
//           <Text style={styles.secondaryButtonText}>Đặt lại</Text>
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FA',
//     justifyContent: 'center',
//   },
//   card: {
//     margin: 20,
//     padding: 24,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 24,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333333',
//     marginBottom: 6,
//   },
//   input: {
//     height: 48,
//     borderWidth: 1,
//     borderColor: '#E1E4E8',
//     borderRadius: 10,
//     paddingHorizontal: 16,
//     fontSize: 15,
//     backgroundColor: '#F8F9FA',
//     marginBottom: 16,
//   },
//   disabledInput: {
//     backgroundColor: '#EAECEF',
//     borderColor: '#E1E4E8',
//     color: '#999999',
//   },
//   errorText: {
//     color: '#FF3B30',
//     fontSize: 14,
//     fontWeight: '500',
//     marginBottom: 16,
//   },
//   primaryButton: {
//     height: 48,
//     borderRadius: 10,
//     backgroundColor: '#333333',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   disabledButton: {
//     opacity: 0.5,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   secondaryButton: {
//     height: 48,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#333333',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   secondaryButtonText: {
//     color: '#333333',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// Bài 5

// import React, { useState, useMemo, useCallback } from 'react';
// import {
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Pressable,
// } from 'react-native';
// import ProductItem from './src/components/ProductItem';

// type Product = {
//   id: string;
//   name: string;
//   price: number;
// };

// const PRODUCTS: Product[] = [
//   { id: '1', name: 'Áo thun', price: 200000 },
//   { id: '2', name: 'Quần jean', price: 450000 },
//   { id: '3', name: 'Giày thể thao', price: 800000 },
//   { id: '4', name: 'Áo khoác gió', price: 600000 },
//   { id: '5', name: 'Mũ lưỡi trai', price: 150000 },
// ];

// export default function App() {
//   console.log('[Render] App Component');

//   const [keyword, setKeyword] = useState('');

//   const [maxPrice, setMaxPrice] = useState('');

//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

//   const filteredProducts = useMemo(() => {
//     let result = PRODUCTS.filter((product) =>
//       product.name.toLowerCase().includes(keyword.toLowerCase())
//     );

//     const parsedMaxPrice = parseFloat(maxPrice);
//     if (!isNaN(parsedMaxPrice)) {
//       result = result.filter((product) => product.price <= parsedMaxPrice);
//     }

//     if (sortOrder === 'asc') {
//       result = [...result].sort((a, b) => a.price - b.price);
//     } else if (sortOrder === 'desc') {
//       result = [...result].sort((a, b) => b.price - a.price);
//     }

//     return result;
//   }, [keyword, maxPrice, sortOrder]);

//   const totalPrice = useMemo(() => {
//     return filteredProducts.reduce((total, product) => total + product.price, 0);
//   }, [filteredProducts]);

//   const handleSelect = useCallback((product: Product) => {
//     console.log('Đã chọn:', product.name);
//     alert(`Bạn đã chọn: ${product.name}`);
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Tìm Kiếm & Tính Tổng</Text>
//         <Text style={styles.subtitle}>Tối ưu hóa bộ lọc với useMemo & React.memo</Text>

//         <TextInput
//           style={styles.input}
//           value={keyword}
//           onChangeText={setKeyword}
//           placeholder="Tìm sản phẩm theo tên..."
//         />

//         <TextInput
//           style={styles.input}
//           value={maxPrice}
//           onChangeText={setMaxPrice}
//           placeholder="Nhập mức giá tối đa cần tìm..."
//           keyboardType="numeric"
//         />

//         <View style={styles.sortContainer}>
//           <Pressable
//             style={[styles.sortButton, sortOrder === 'asc' && styles.activeSortButton]}
//             onPress={() => setSortOrder('asc')}
//           >
//             <Text style={[styles.sortButtonText, sortOrder === 'asc' && styles.activeSortText]}>
//               Giá tăng dần
//             </Text>
//           </Pressable>

//           <Pressable
//             style={[styles.sortButton, sortOrder === 'desc' && styles.activeSortButton]}
//             onPress={() => setSortOrder('desc')}
//           >
//             <Text style={[styles.sortButtonText, sortOrder === 'desc' && styles.activeSortText]}>
//               Giá giảm dần
//             </Text>
//           </Pressable>

//           <Pressable
//             style={[styles.sortButton, sortOrder === 'none' && styles.activeSortButton]}
//             onPress={() => setSortOrder('none')}
//           >
//             <Text style={[styles.sortButtonText, sortOrder === 'none' && styles.activeSortText]}>
//               Mặc định
//             </Text>
//           </Pressable>
//         </View>

//         <FlatList
//           data={filteredProducts}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => <ProductItem item={item} onSelect={handleSelect} />}
//           ListEmptyComponent={
//             <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào tương thích.</Text>
//           }
//           style={styles.list}
//         />

//         <View style={styles.totalBox}>
//           <Text style={styles.totalLabel}>Tổng giá sản phẩm hiển thị:</Text>
//           <Text style={styles.totalValue}>{totalPrice.toLocaleString('vi-VN')}đ</Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FA',
//   },
//   card: {
//     flex: 1,
//     margin: 20,
//     padding: 20,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#1A1A1A',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 16,
//   },
//   input: {
//     height: 44,
//     borderWidth: 1,
//     borderColor: '#E1E4E8',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     fontSize: 15,
//     backgroundColor: '#F8F9FA',
//     marginBottom: 10,
//   },
//   sortContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   sortButton: {
//     flex: 1,
//     paddingVertical: 8,
//     marginHorizontal: 4,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: '#333333',
//     alignItems: 'center',
//   },
//   activeSortButton: {
//     backgroundColor: '#333333',
//   },
//   sortButtonText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#333333',
//   },
//   activeSortText: {
//     color: '#FFFFFF',
//   },
//   list: {
//     flex: 1,
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#999999',
//     marginTop: 20,
//     fontSize: 15,
//   },
//   totalBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#E1E4E8',
//     marginTop: 10,
//   },
//   totalLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666666',
//   },
//   totalValue: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#28A745',
//   },
// });

// Bài 6
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

/* =========================================================
   BƯỚC 1: CẤU TRÚC DỮ LIỆU TODO
========================================================= */

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

/* =========================================================
   BƯỚC 2: REDUCER
========================================================= */

type TodoAction =
  | {
      type: "ADD_TODO";
      payload: string;
    }
  | {
      type: "TOGGLE_TODO";
      payload: string;
    }
  | {
      type: "DELETE_TODO";
      payload: string;
    };

const initialTodos: Todo[] = [];

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now().toString(),
          title: action.payload,
          completed: false,
        },
      ];

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
}

/* =========================================================
   BƯỚC 4: CONTEXT CHO LIGHT / DARK MODE
========================================================= */

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme phải được sử dụng bên trong ThemeProvider");
  }

  return context;
}

/* =========================================================
   COMPONENT HIỂN THỊ TỪNG TODO
========================================================= */

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem = React.memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const { isDark } = useTheme();

  return (
    <View
      style={[
        styles.todoItem,
        {
          backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
        },
      ]}
    >
      <Pressable style={styles.todoContent} onPress={() => onToggle(todo.id)}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: todo.completed ? "#4caf50" : "transparent",
              borderColor: todo.completed
                ? "#4caf50"
                : isDark
                  ? "#aaa"
                  : "#777",
            },
          ]}
        >
          {todo.completed && <Text style={styles.checkText}>✓</Text>}
        </View>

        <Text
          style={[
            styles.todoTitle,
            {
              color: isDark ? "#fff" : "#222",
              textDecorationLine: todo.completed ? "line-through" : "none",
            },
          ]}
        >
          {todo.title}
        </Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={() => onDelete(todo.id)}>
        <Text style={styles.deleteText}>Xóa</Text>
      </Pressable>
    </View>
  );
});

/* =========================================================
   COMPONENT CHÍNH
========================================================= */

function TodoApp() {
  const { isDark, toggleTheme } = useTheme();

  /* =======================================================
     BƯỚC 2: useReducer quản lý danh sách
  ======================================================= */

  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  /* =======================================================
     BƯỚC 3: useState quản lý ô nhập và từ khóa
  ======================================================= */

  const [newTodo, setNewTodo] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  /* =======================================================
     THÊM CÔNG VIỆC
  ======================================================= */

  const addTodo = () => {
    const title = newTodo.trim();

    if (title === "") {
      return;
    }

    dispatch({
      type: "ADD_TODO",
      payload: title,
    });

    setNewTodo("");
  };

  /* =======================================================
     BƯỚC 6: useCallback
     Hàm đánh dấu hoàn thành
  ======================================================= */

  const toggleTodo = useCallback((id: string) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  }, []);

  /* =======================================================
     BƯỚC 6: useCallback
     Hàm xóa công việc
  ======================================================= */

  const deleteTodo = useCallback((id: string) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  }, []);

  /* =======================================================
     BƯỚC 5: useMemo
     Lọc danh sách theo từ khóa
  ======================================================= */

  const filteredTodos = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    if (keyword === "") {
      return todos;
    }

    return todos.filter((todo) => todo.title.toLowerCase().includes(keyword));
  }, [todos, searchKeyword]);

  /* =======================================================
     BƯỚC 5: useMemo
     Đếm số công việc chưa hoàn thành
  ======================================================= */

  const remainingCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  /* =======================================================
     BƯỚC 7: useEffect
     Theo dõi số lượng công việc
  ======================================================= */

  useEffect(() => {
    console.log(`Danh sách hiện có ${todos.length} công việc`);
  }, [todos.length]);

  /* =======================================================
     GIAO DIỆN
  ======================================================= */

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#121212" : "#ffffff",
        },
      ]}
    >
      <View style={styles.content}>
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.title,
                {
                  color: isDark ? "#ffffff" : "#222222",
                },
              ]}
            >
              Quản lý công việc
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: isDark ? "#bbbbbb" : "#666666",
                },
              ]}
            >
              {remainingCount} công việc chưa hoàn thành
            </Text>
          </View>

          <View style={styles.themeContainer}>
            <Text
              style={[
                styles.themeText,
                {
                  color: isDark ? "#ffffff" : "#222222",
                },
              ]}
            >
              {isDark ? "🌙" : "☀️"}
            </Text>

            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>

        {/* Ô NHẬP CÔNG VIỆC */}

        <View style={styles.addContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: isDark ? "#ffffff" : "#222222",
                backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
                borderColor: isDark ? "#555555" : "#dddddd",
              },
            ]}
            placeholder="Nhập công việc..."
            placeholderTextColor={isDark ? "#999999" : "#888888"}
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={addTodo}
          />

          <Pressable style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>Thêm</Text>
          </Pressable>
        </View>

        {/* Ô TÌM KIẾM */}

        <TextInput
          style={[
            styles.searchInput,
            {
              color: isDark ? "#ffffff" : "#222222",
              backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
              borderColor: isDark ? "#555555" : "#dddddd",
            },
          ]}
          placeholder="Tìm kiếm công việc..."
          placeholderTextColor={isDark ? "#999999" : "#888888"}
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />

        {/* DANH SÁCH TODO */}

        <View style={styles.listContainer}>
          {filteredTodos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text
                style={[
                  styles.emptyText,
                  {
                    color: isDark ? "#aaaaaa" : "#777777",
                  },
                ]}
              >
                {todos.length === 0
                  ? "Chưa có công việc nào."
                  : "Không tìm thấy công việc phù hợp."}
              </Text>
            </View>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =========================================================
   APP + THEME PROVIDER
========================================================= */

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((previous) => !previous);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      <TodoApp />
    </ThemeContext.Provider>
  );
}

/* =========================================================
   STYLE
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 15,
    marginTop: 5,
  },

  themeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  themeText: {
    fontSize: 22,
  },

  addContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },

  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
  },

  addButton: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  searchInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  listContainer: {
    flex: 1,
  },

  todoItem: {
    minHeight: 60,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  checkText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  todoTitle: {
    flex: 1,
    fontSize: 16,
  },

  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#e53935",
    marginLeft: 10,
  },

  deleteText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },

  emptyText: {
    fontSize: 16,
  },
});
