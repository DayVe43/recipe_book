import { Tabs } from "@/components/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const { recipes, isLoading, reloadRecipes } = useRecipes();

  useFocusEffect(
  useCallback(() => {
    reloadRecipes();
  }, [reloadRecipes])
);

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
      <FlatList data={recipes.filter(recipe => recipe.selected)} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => (
        <>
        <Text>{item.title}</Text>
        <FlatList data={item.ingredients} keyExtractor={(ing, index) => index.toString()} renderItem={({item: ing}) => (
          <Text>- {ing}</Text>
        )}/>
        </>
      )} />
      </SafeAreaView>
    <Tabs />
    </>
  );
}
