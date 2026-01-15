import Button from "@/components/Button";
import { Tabs } from "@/components/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { Ingredient, Recipe } from "@/models/Recipe";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { id } = useLocalSearchParams();
  const { removeRecipe, getRecipe, updateRecipe } = useRecipes();

  const [item, setItem] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredientText, setNewIngredientText] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [newStepText, setNewStepText] = useState("");

  const stepInputRef = useRef<TextInput>(null);
  const ingredientInputRef = useRef<TextInput>(null);

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

  const deleteAlert = () => {
    Alert.alert("Delete Recipe", "This action can't be reversed.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          router.dismissTo("/");
          removeRecipe(item.id);
        },
      },
    ]);
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
    setTitleText(item.title);
    setIngredients([...item.ingredients]);
    setSteps([...item.steps]);
    setNewIngredientText("");
    setNewStepText("");
    setModalVisible(true);
  };

  const saveRecipe = async () => {
    const updatedRecipe: Recipe = {
      ...item,
      title: titleText,
      ingredients: ingredients,
      steps: steps,
    };
    await updateRecipe(updatedRecipe);
    setItem(updatedRecipe);
    setModalVisible(false);
    Keyboard.dismiss();
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 16 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Ionicons name="close" size={32} color="black" />
              </TouchableOpacity>
              <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16, marginTop: 8 }}>Edit Recipe</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}>
              <TextInput
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  marginBottom: 32,
                }}
                placeholder="Title"
                value={titleText}
                onChangeText={(text) => setTitleText(text)}
              />
              <Text style={{ fontSize: 18, fontWeight: "semibold", marginBottom: 8 }}>Ingredients</Text>
              {ingredients.map((item, index) => (
                <TextInput
                  key={index}
                  value={item.name}
                  onChangeText={(text) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index] = { ...item, name: text };
                    setIngredients(newIngredients);
                  }}
                />
              ))}
              <TextInput
                style={{ borderColor: "black", borderWidth: 1, borderRadius: 8 }}
                placeholder="Add Ingredient"
                ref={ingredientInputRef}
                value={newIngredientText}
                onEndEditing={() => {
                  if (newIngredientText.trim() === "") return;
                  const newIngredients = [...ingredients];
                  newIngredients.push({
                    name: newIngredientText,
                    quantity: "",
                    checked: false,
                  });
                  setIngredients(newIngredients);
                  setNewIngredientText("");
                  ingredientInputRef.current?.focus();
                }}
                onChangeText={(text) => setNewIngredientText(text)}
              />

              <Text style={{ fontSize: 18, fontWeight: "semibold", marginBottom: 8, marginTop: 32 }}>Steps</Text>
              {steps.map((item, index) => (
                <TextInput
                  key={index}
                  value={item}
                  onChangeText={(text) => {
                    const newSteps = [...steps];
                    newSteps[index] = text;
                    setSteps(newSteps);
                  }}
                />
              ))}
              <TextInput
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  marginBottom: 32,
                }}
                placeholder="Add Step"
                ref={stepInputRef}
                value={newStepText}
                onEndEditing={() => {
                  if (newStepText.trim() === "") return;
                  const newSteps = [...steps];
                  newSteps.push(newStepText);
                  setSteps(newSteps);
                  setNewStepText("");
                  stepInputRef.current?.focus();
                }}
                onChangeText={(text) => setNewStepText(text)}
              />
            </ScrollView>
            <View style={{ margin: 16, marginTop: 0 }}>
              <Button title="Save Recipe" onPress={saveRecipe} />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
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
          <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}>
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
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>{item.title}</Text>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: "semibold", fontSize: 18 }}>Ingredients:</Text>
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
        <Button style={{ marginTop: "auto" }}
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
