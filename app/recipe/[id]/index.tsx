import { Tabs } from "@/components/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { Ingredient, Recipe } from "@/models/Recipe";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Keyboard,
  Modal,
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
        <SafeAreaView style={{ margin: 16 }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Ionicons name="close" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <Text>Edit Recipe</Text>
          <TextInput
            style={{
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 16,
            }}
            placeholder="Title"
            value={titleText}
            onChangeText={(text) => setTitleText(text)}
          />
          <Text>Ingredients</Text>
          <FlatList
            data={ingredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TextInput
                value={item.name}
                onChangeText={(text) => {
                  const newIngredients = [...ingredients];
                  const index = newIngredients.indexOf(item);
                  newIngredients[index] = { ...item, name: text };
                  setIngredients(newIngredients);
                }}
              />
            )}
          />
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

          <Text style={{ marginTop: 16 }}>Steps</Text>
          <FlatList
            data={steps}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TextInput
                value={item}
                onChangeText={(text) => {
                  const newSteps = [...steps];
                  const index = newSteps.indexOf(item);
                  newSteps[index] = text;
                  setSteps(newSteps);
                }}
              />
            )}
          />
          <TextInput
            style={{
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 16,
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
          <Button title="Save Recipe" onPress={saveRecipe} />
        </SafeAreaView>
      </Modal>
      <SafeAreaView
        style={{
          flex: 1,
          margin: 16,
        }}
      >
        <StatusBar style="dark" />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="close" size={32} color="black" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => toggleSelected()}
            >
              <Ionicons
                name={item.selected ? "star" : "star-outline"}
                size={16}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => openEditModal()}
            >
              <Ionicons name="pencil" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => deleteAlert()}
            >
              <Ionicons name="trash" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginBottom: 32,
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Text>{item.id}</Text>
          <Text>{item.title}</Text>
          <Text>Ingredients:</Text>
          <FlatList
            data={item.ingredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: ing }) => <Text>- {ing.name}</Text>}
          />
          <Text>Steps:</Text>
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
        <Button
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
