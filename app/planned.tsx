import { Tabs } from "@/components/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { recipes, isLoading, reloadRecipes } = useRecipes();

  useFocusEffect(
    useCallback(() => {
      reloadRecipes();
    }, [reloadRecipes])
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
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/recipe/[id]",
                  params: { id: item.id },
                })
              }
            >
              <View
                style={{
                  marginBottom: 32,
                  backgroundColor: "#fff",
                  padding: 16,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
      <Tabs />
    </>
  );
}
