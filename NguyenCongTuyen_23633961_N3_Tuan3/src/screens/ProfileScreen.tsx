import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useUser } from '../context/UserContext';

export default function ProfileScreen() {
  const { user, updateUser, logout } = useUser();

  if (!user) {
    return (
      <View style={styles.profileCard}>
        <Text style={styles.logoutText}>Bạn đã đăng xuất khỏi hệ thống.</Text>
      </View>
    );
  }

  return (
    <View style={styles.profileCard}>
      <Text style={styles.profileTitle}>ProfileScreen</Text>

      <Image source={{ uri: user.avatar }} style={styles.avatar} />

      <View style={styles.infoBox}>
        <Text style={styles.label}>Họ và tên</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() =>
          updateUser(
            'Nguyễn Văn B',
            'nguyenvanb@example.com',
            'https://unsplash.com' 
          )
        }
      >
        <Text style={styles.buttonText}>Đổi thông tin người dùng</Text>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    alignItems: 'center', 
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    backgroundColor: '#E1E4E8',
  },
  infoBox: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginTop: 8,
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 4,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#333333',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF3B30', 
  },
  logoutButtonText: {
    color: '#FF3B30',
    textAlign: 'center',
    fontWeight: '600',
  },
  logoutText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    paddingVertical: 20,
  },
});
