import { useRecipes } from "@/hooks/useRecipes";
import { Recipe } from "@/models/Recipe";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const { id } = useLocalSearchParams();
  const { removeRecipe, getRecipe } = useRecipes();
  const [item, setItem] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await getRecipe(id as string);
      setItem(recipe);
      setIsLoading(false);
    };
    fetchRecipe();
  }, [id, getRecipe]);

  if (isLoading) {
    return (<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
          </SafeAreaView>
    )
  }

  if (item === null) {
    return (<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Recipe not found</Text>
          </SafeAreaView>
    )
  }

  const deleteAlert = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => { router.dismissTo('/'); removeRecipe(item.id); }
        }
      ]
    );
  };

  console.log("Rendering recipe:", item);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 16,
      }}
    >
      <StatusBar style="dark" />
        <View style={{marginBottom: 32, backgroundColor: '#fff', padding: 16, borderRadius: 8}}>
          <Text>{item.id}</Text>
          <Text>{item.title}</Text>
          <Text>Ingredients:</Text>
          <FlatList data={item.ingredients} keyExtractor={(item, index) => index.toString()} renderItem={({item: ing}) => (
            <Text>- {ing}</Text>
          )}/>
        </View>
        <TouchableOpacity onPress={() => deleteAlert()}>
          <Text>Delete Recipe</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
