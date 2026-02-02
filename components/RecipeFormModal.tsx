import Button from "@/components/Button";
import { Ingredient } from "@/models/Recipe";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
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

type RecipeFormModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, ingredients: Ingredient[], steps: string[]) => void;
  initialTitle?: string;
  initialIngredients?: Ingredient[];
  initialSteps?: string[];
  submitLabel?: string;
};

export default function RecipeFormModal({
  visible,
  onClose,
  onSubmit,
  initialTitle = "",
  initialIngredients = [],
  initialSteps = [],
  submitLabel = "Save",
}: RecipeFormModalProps) {
  const [titleText, setTitleText] = useState(initialTitle);
  const [ingredients, setIngredients] =
    useState<Ingredient[]>(initialIngredients);
  const [newIngredientText, setNewIngredientText] = useState("");
  const [steps, setSteps] = useState<string[]>(initialSteps);
  const [newStepText, setNewStepText] = useState("");

  const stepInputRef = useRef<TextInput>(null);
  const ingredientInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // reset to initial values when opened
    if (visible) {
      setTitleText(initialTitle);
      setIngredients([...initialIngredients]);
      setSteps([...initialSteps]);
      setNewIngredientText("");
      setNewStepText("");
    }
  }, [visible, initialTitle, initialIngredients, initialSteps]);

  const handleAddIngredient = () => {
    if (newIngredientText.trim() === "") return;
    setIngredients((prev) => [
      ...prev,
      { name: newIngredientText, quantity: "", checked: false },
    ]);
    setNewIngredientText("");
    ingredientInputRef.current?.focus();
  };

  const handleAddStep = () => {
    if (newStepText.trim() === "") return;
    setSteps((prev) => [...prev, newStepText]);
    setNewStepText("");
    stepInputRef.current?.focus();
  };

  const handleSubmit = () => {
    onSubmit(titleText, ingredients, steps);
    onClose();
    Keyboard.dismiss();
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ margin: 16 }}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={32} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 16,
                marginTop: 8,
              }}
            >
              {submitLabel === "Save"
                ? initialTitle
                  ? "Edit Recipe"
                  : "New Recipe"
                : submitLabel}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
          >
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

            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
              Ingredients
            </Text>
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
              onEndEditing={handleAddIngredient}
              onChangeText={(text) => setNewIngredientText(text)}
            />

            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 8,
                marginTop: 32,
              }}
            >
              Steps
            </Text>
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
              onEndEditing={handleAddStep}
              onChangeText={(text) => setNewStepText(text)}
            />
          </ScrollView>
          <View style={{ margin: 16 }}>
            <Button
              title={
                submitLabel === "Save" && initialTitle
                  ? "Save Recipe"
                  : "Add Recipe"
              }
              onPress={handleSubmit}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
