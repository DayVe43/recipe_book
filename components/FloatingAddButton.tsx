import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

type FloatingAddButtonProps = {
  onPress: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
};

export default function FloatingAddButton({
  onPress,
  size = 64,
  color = "black",
  style,
}: FloatingAddButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ position: "absolute", bottom: 16, right: 16 }, style]}
    >
      <Ionicons name="add-circle" size={size} color={color} />
    </TouchableOpacity>
  );
}
