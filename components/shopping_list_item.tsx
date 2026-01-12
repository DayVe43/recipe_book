import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ingredient } from "@/models/Recipe";

export function ShoppingListItem({ ingredient, onToggle }: { ingredient: Ingredient; onToggle: (checked: boolean) => void }) {
  const [checked, setChecked] = useState(ingredient.checked || false);

  useEffect(() => {
    setChecked(ingredient.checked || false);
  }, [ingredient.checked]);

  const handlePress = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle(newChecked);
  };

  return (
    <>
      <Pressable style={{flexDirection: 'row', gap: 8, marginBottom: 16}} onPress={handlePress}>
        <View style={{borderWidth: 2, borderColor: 'black', width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 4}} >
          {checked && <Ionicons name="checkmark" size={16} color="black" />}
        </View>
        <Text style={{textDecorationLine: checked ? 'line-through' : 'none'}}>{ingredient.name}</Text>
      </Pressable>
    </>
  );
}