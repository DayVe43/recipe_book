import { Recipe } from "@/models/Recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveRecipes = async (recipes: Recipe[]) => {
  try {
    await AsyncStorage.setItem("recipes", JSON.stringify(recipes));
  } catch (error) {
    console.error("Error saving recipes:", error);
  }
};

export const loadRecipes = async (): Promise<Recipe[]> => {
  try {
    const recipesJson = await AsyncStorage.getItem("recipes");
    return recipesJson ? JSON.parse(recipesJson) : [];
  } catch (error) {
    console.error("Error loading recipes:", error);
    return [];
  }
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    const recipes = await loadRecipes();
    return recipes.find(recipe => recipe.id === id) || null;
  } catch (error) {
    console.error("Error getting recipe by ID:", error);
    return null;
  }
};