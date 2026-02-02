import { Recipe } from "@/models/Recipe";
import React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

type RecipeCardProps = {
  recipe: Recipe;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function RecipeCard({
  recipe,
  onPress,
  style,
}: RecipeCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {
            marginBottom: 32,
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 8,
          },
          style,
        ]}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{recipe.title}</Text>
      </View>
    </TouchableOpacity>
  );
}
