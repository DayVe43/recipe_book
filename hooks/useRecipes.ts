import { Ingredient, Recipe } from "@/models/Recipe";
import { getRecipeById, loadRecipes, saveRecipes } from "@/persistence/recipeStorage";
import { randomUUID } from 'expo-crypto';
import { useEffect, useState } from "react";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const loadedRecipes = await loadRecipes();
      setRecipes(loadedRecipes);
      setIsLoading(false);
    };
    load();
  }, []);

  const reloadRecipes = async () => {
    setIsLoading(true);
    const loadedRecipes = await loadRecipes();
    setRecipes(loadedRecipes);
    setIsLoading(false);
  };

  const addRecipe = async (title: string, ingredients: Ingredient[], steps: string[]) => {
    const recipe: Recipe = {
      id: randomUUID(),
      title,
      selected: false,
      ingredients,
      steps,
    };
    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);
    await saveRecipes(newRecipes);
  };

  const removeRecipe = async (id: string) => {
    const newRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(newRecipes);
    await saveRecipes(newRecipes);
  }

  const getRecipe = async (id: string): Promise<Recipe | null> => {
    return await getRecipeById(id);
  }

  const updateRecipe = async (updatedRecipe: Recipe) => {
    const newRecipes = recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe);
    setRecipes(newRecipes);
    await saveRecipes(newRecipes);
  };

  return { recipes, isLoading, addRecipe, removeRecipe, getRecipe, reloadRecipes, updateRecipe };
}