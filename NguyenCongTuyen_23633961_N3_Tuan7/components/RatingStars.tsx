import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function RatingStars({ value, onChange }: any) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map(i => (
        <TouchableOpacity
          key={i}
          disabled={!onChange}
          onPress={() => onChange(i)}
        >
          <Text style={{
            fontSize: 28,
            color: i <= Math.round(value) ? "orange" : "#ccc"
          }}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}