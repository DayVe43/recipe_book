import { ShoppingListItem } from "@/components/shopping_list_item";
import { Tabs } from "@/components/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const { recipes, isLoading, reloadRecipes, updateRecipe } = useRecipes();

  useFocusEffect(
  useCallback(() => {
    reloadRecipes();
  }, [reloadRecipes])
);

  const handleToggleIngredient = async (recipeId: string, ingredientIndex: number, checked: boolean) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      const updatedIngredients = recipe.ingredients.map((ing, idx) =>
        idx === ingredientIndex ? { ...ing, checked } : ing
      );
      const updatedRecipe = { ...recipe, ingredients: updatedIngredients };
      await updateRecipe(updatedRecipe);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
    <SafeAreaView
      style={{
        flex: 1,
        margin: 16,
      }}
    >
      <StatusBar style="dark" />
      <FlatList data={recipes.filter(recipe => recipe.selected)} keyExtractor={(item) => item.id.toString()} renderItem={({item: recipe}) => (
        <>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 16}}>{recipe.title}</Text>
        <FlatList data={recipe.ingredients} keyExtractor={(ing, index) => index.toString()} renderItem={({item: ing, index}) => (
          <ShoppingListItem ingredient={ing} onToggle={(checked) => handleToggleIngredient(recipe.id, index, checked)} />
        )}/>
        </>
      )} />
      </SafeAreaView>
    <Tabs />
    </>
  );
}
