import { useRecipes } from "@/hooks/useRecipes";
import { Recipe } from "@/models/Recipe";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { id } = useLocalSearchParams();
  const { getRecipe } = useRecipes();
  const [item, setItem] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

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

  console.log(item.steps);

  return (
    <>
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
          <Text>Step {index  + 1}:</Text>
          <Text>{item.steps[index]}</Text>
          <Button title="Previous Step" disabled={index === 0} onPress={() => setIndex(index - 1)} />
          <Button title="Next Step" disabled={index === item.steps.length - 1 || item.steps.length === 0} onPress={() => setIndex(index + 1)} />
        </View>
    </SafeAreaView>
      </>
  );
}
