import Button from "@/components/Button";
import { Tabs } from "@/components/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { Ingredient } from "@/models/Recipe";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [modalVisible, setModalVisible] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredientText, setNewIngredientText] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [newStepText, setNewStepText] = useState("");
  const stepInputRef = useRef<TextInput>(null);
  const ingredientInputRef = useRef<TextInput>(null);

  const { recipes, isLoading, addRecipe, reloadRecipes } = useRecipes();

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
        <Modal animationType="slide" visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ margin: 16 }}>
                <TouchableOpacity onPress={() => { setModalVisible(false); setTitleText(""); setIngredients([]); setSteps([]); setNewIngredientText("") }}>
                  <Ionicons name="close" size={32} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16, marginTop: 8 }}>New Recipe</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}>
                <TextInput style={{ borderColor: 'black', borderWidth: 1, borderRadius: 8, marginBottom: 32 }} placeholder="Title" value={titleText} onChangeText={(text) => setTitleText(text)} />
                <Text style={{ fontSize: 18, fontWeight: "semibold", marginBottom: 8 }}>Ingredients</Text>
                {ingredients.map((item, index) => (
                  <TextInput key={index} value={item.name} onChangeText={(text) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index] = { ...item, name: text };
                    setIngredients(newIngredients);
                  }} />
                ))}
                <TextInput style={{ borderColor: 'black', borderWidth: 1, borderRadius: 8 }} placeholder="Add Ingredient"
                  ref={ingredientInputRef}
                  value={newIngredientText}
                  onEndEditing={() => {
                    if (newIngredientText.trim() === "") return;
                    const newIngredients = [...ingredients];
                    newIngredients.push({ name: newIngredientText, quantity: '', checked: false });
                    setIngredients(newIngredients);
                    setNewIngredientText("");
                    ingredientInputRef.current?.focus();
                  }}
                  onChangeText={(text) => setNewIngredientText(text)} />

                <Text style={{ fontSize: 18, fontWeight: "semibold", marginBottom: 8, marginTop: 32 }}>Steps</Text>
                {steps.map((item, index) => (
                  <TextInput key={index} value={item} onChangeText={(text) => {
                    const newSteps = [...steps];
                    newSteps[index] = text;
                    setSteps(newSteps);
                  }} />
                ))}
                <TextInput style={{ borderColor: 'black', borderWidth: 1, borderRadius: 8, marginBottom: 32 }} placeholder="Add Step"
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
                  onChangeText={(text) => setNewStepText(text)} />
              </ScrollView>
              <View style={{ margin: 16, marginTop: 16 }}>
                <Button title="Add Recipe" onPress={() => { addRecipe(titleText, ingredients, steps); setModalVisible(false); setTitleText(""); setIngredients([]); setSteps([]); setNewIngredientText(""); Keyboard.dismiss(); }} />
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </Modal>
        <FlatList data={recipes} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.navigate({
            pathname: '/recipe/[id]',
            params: { id: item.id }
          })
          }>
            <View style={{ marginBottom: 32, backgroundColor: '#fff', padding: 16, borderRadius: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )} />
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ position: 'absolute', bottom: 16, right: 16 }}>
          <Ionicons name="add-circle" size={64} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
      <Tabs />
    </>
  );
}
