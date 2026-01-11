import { useRecipes } from "@/hooks/useRecipes";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Keyboard, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [modalVisible, setModalVisible] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredientText, setNewIngredientText] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
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
    <SafeAreaView
      style={{
        flex: 1,
        margin: 16,
      }}
    >
      <StatusBar style="dark" />
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
        <SafeAreaView style={{margin: 16}}>
          <View>
            <TouchableOpacity onPress={() => {setModalVisible(false); setTitleText(""); setIngredients([]); setSteps([]); setNewIngredientText("")}}>
              <Ionicons name="close" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <Text>New Recipe</Text>
          <TextInput placeholder="Title" value={titleText} onChangeText={(text) => setTitleText(text)}/>
          <Text>Ingredients</Text>
          <FlatList data={ingredients} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => (
            <TextInput value={item} onChangeText={(text) => {
              const newIngredients = [...ingredients];
              const index = newIngredients.indexOf(item);
              newIngredients[index] = text;
              setIngredients(newIngredients);
            }}/>
          )}/>
          <TextInput ref={ingredientInputRef}
          value={newIngredientText}
          onEndEditing={() => {
            if (newIngredientText.trim() === "") return;
              const newIngredients = [...ingredients];
              newIngredients.push(newIngredientText);
              setIngredients(newIngredients);
              setNewIngredientText("");
              ingredientInputRef.current?.focus();
            }} 
            onChangeText={(text) => setNewIngredientText(text)}/>
          <TouchableOpacity onPress={() => { addRecipe(titleText, ingredients, steps); setModalVisible(false); setTitleText(""); setIngredients([]); setSteps([]); setNewIngredientText(""); Keyboard.dismiss(); }}>
            <Text>Add Recipe</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <FlatList data={recipes} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => (
        <TouchableOpacity onPress={() => router.navigate({
            pathname: '/habit/[id]',
            params: { id: item.id }
          })
        }>
        <View style={{marginBottom: 32, backgroundColor: '#fff', padding: 16, borderRadius: 8}}>
          <Text>{item.title}</Text>
        </View>
        </TouchableOpacity>
      )}/>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={64} color="blue" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
