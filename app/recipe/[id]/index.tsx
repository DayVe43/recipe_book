import Button from "@/components/Button";
import RecipeFormModal from "@/components/RecipeFormModal";
import { showConfirm } from "@/components/confirm";
import { Tabs } from "@/components/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { Recipe } from "@/models/Recipe";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { id } = useLocalSearchParams();
  const { removeRecipe, getRecipe, updateRecipe } = useRecipes();

  const [item, setItem] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

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

  const deleteAlert = async () => {
    const confirmed = await showConfirm(
      "Delete Recipe",
      "This action can't be reversed.",
    );
    if (confirmed) {
      router.dismissTo("/");
      removeRecipe(item.id);
    }
  };

  const toggleSelected = async () => {
    const updatedRecipe: Recipe = {
      ...item,
      selected: !item.selected,
      ingredients: item.ingredients.map((ing) => ({ ...ing, checked: false })),
    };
    await updateRecipe(updatedRecipe);
    setItem(updatedRecipe);
  };

  const openEditModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <RecipeFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialTitle={item?.title ?? ""}
        initialIngredients={item?.ingredients ?? []}
        initialSteps={item?.steps ?? []}
        submitLabel="Save"
        onSubmit={async (title, ingredients, steps) => {
          const updatedRecipe: Recipe = {
            ...item!,
            title,
            ingredients,
            steps,
          };
          await updateRecipe(updatedRecipe);
          setItem(updatedRecipe);
          setModalVisible(false);
          Keyboard.dismiss();
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          margin: 16,
        }}
      >
        <StatusBar style="dark" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="close" size={32} color="black" />
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}
          >
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={() => toggleSelected()}
            >
              <Ionicons
                name={item.selected ? "star" : "star-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={() => openEditModal()}
            >
              <Ionicons name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={() => deleteAlert()}
            >
              <Ionicons name="trash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginBottom: 32,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
            {item.title}
          </Text>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: "semibold", fontSize: 18 }}>
              Ingredients:
            </Text>
            <FlatList
              data={item.ingredients}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item: ing }) => <Text>- {ing.name}</Text>}
            />
          </View>
          <View>
            <Text style={{ fontWeight: "semibold", fontSize: 18 }}>Steps:</Text>
            <FlatList
              data={item.steps}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item: step, index }) => (
                <Text>
                  {index + 1}. {step}
                </Text>
              )}
            />
          </View>
        </View>
        <Button
          style={{ marginTop: "auto" }}
          title="Start cooking!"
          onPress={() =>
            router.navigate({
              pathname: "/recipe/[id]/steps",
              params: { id: item.id },
            })
          }
        />
      </SafeAreaView>
      <Tabs />
    </>
  );
}
