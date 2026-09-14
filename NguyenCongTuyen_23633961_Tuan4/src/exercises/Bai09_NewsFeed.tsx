import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Bai09_NewsFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        setPosts(data as Post[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bài 9: News Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16,backgroundColor: "white"},
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  title: { fontSize: 16, fontWeight: '600' }
});
