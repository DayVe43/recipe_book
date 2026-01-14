import Button from "@/components/Button";
import { Tabs } from "@/components/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { Recipe } from "@/models/Recipe";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (item === null) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Recipe not found</Text>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="close" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 32,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>{item.title}</Text>
          <Text style={{ fontSize: 18, fontWeight: "semibold" }}>Step {index + 1}:</Text>
          <Text>{item.steps[index]}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 16, marginTop: 'auto' }}>
          <Button style={{ flex: 1 }}
            title="Previous Step"
            disabled={index === 0}
            onPress={() => setIndex(index - 1)}
          />
          <Button style={{ flex: 1 }}
            title="Next Step"
            disabled={
              index === item.steps.length - 1 || item.steps.length === 0
            }
            onPress={() => setIndex(index + 1)}
          />
        </View>
      </SafeAreaView>
      <Tabs />
    </>
  );
}
