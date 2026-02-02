import FloatingAddButton from "@/components/FloatingAddButton";
import RecipeCard from "@/components/RecipeCard";
import RecipeFormModal from "@/components/RecipeFormModal";
import { Tabs } from "@/components/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { FlatList, Keyboard, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);

  const { recipes, isLoading, addRecipe, reloadRecipes } = useRecipes();

  useFocusEffect(
    useCallback(() => {
      reloadRecipes();
    }, [reloadRecipes]),
  );

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
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
        <RecipeFormModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={(title, ingredients, steps) => {
            addRecipe(title, ingredients, steps);
            setModalVisible(false);
            Keyboard.dismiss();
          }}
        />
        <FlatList
          data={recipes}
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
        <FloatingAddButton onPress={() => setModalVisible(true)} />
      </SafeAreaView>
      <Tabs />
    </>
  );
}
