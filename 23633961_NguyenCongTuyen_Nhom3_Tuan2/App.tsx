import axios from "axios";
import { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Index() {
  const [data, setData] = useState<Post[]>([]);

  // 3. Đưa useEffect lên phía trên
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          postId: 5,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Sửa thành setData cho đồng bộ với tên state
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Request completed");
      });
  }, []);

  // 4. Sửa kiểu dữ liệu tham số item khớp với cấu trúc Post
  const handlePress = (item: Post) => {
    console.log("Đã bấm vào:", item.title);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={
          Platform.OS !== "android"
            ? ({ highlighted }) => (
                <View
                  style={[
                    styles.separator,
                    highlighted && {
                      marginLeft: 0,
                      backgroundColor: "#007AFF",
                    },
                  ]}
                />
              )
            : undefined
        }
        data={data}
        // Ép kiểu ép buộc item về string vì keyExtractor cần trả về chuỗi kí tự
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            onPress={() => handlePress(item)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.text}>
                {item.title} (Index: {index})
              </Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginLeft: 16,
  },
});
