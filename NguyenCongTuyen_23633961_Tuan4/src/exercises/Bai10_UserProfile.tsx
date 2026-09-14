import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function Bai10_UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        setUser(data as User);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bài 10: User Profile</Text>
      

      <View style={styles.profileBox}>
        <Text>Tên: {user?.name}</Text>
        <Text>Email: {user?.email}</Text>
        <Text>Điện thoại: {user?.phone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileBox: { padding: 20, backgroundColor: '#f0f0f0', borderRadius: 8 }
});
