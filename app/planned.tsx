import RecipeCard from "@/components/RecipeCard";
import { Tabs } from "@/components/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { recipes, isLoading, reloadRecipes } = useRecipes();

  useFocusEffect(
    useCallback(() => {
      reloadRecipes();
    }, [reloadRecipes]),
  );

  const data = recipes.filter((recipe) => recipe.selected);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (data.length === 0) {
    return (
      <>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Recipes planned.</Text>
        </SafeAreaView>
        <Tabs />
      </>
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
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() =>
                router.navigate({
                  pathname: "/recipe/[id]",
                  params: { id: item.id },
                })
              }
            />
          )}
        />
      </SafeAreaView>
      <Tabs />
    </>
  );
}
