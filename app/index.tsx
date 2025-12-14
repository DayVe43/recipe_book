import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, Keyboard, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [modalVisible, setModalVisible] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [frequencyText, setFrequencyText] = useState("");
  const [habits, setHabits] = useState<Array<{id:number, title:string, description:string, frequency:string, streak:number}>>([]);

  var habitData = habits;

  const addHabit = (title:string, description:string, frequency:string) => {
      const newHabit = {
        id: habitData.length + 1,
        title: title,
        description: description,
        frequency: frequency,
        streak: 0,
      };
      habitData.push(newHabit);
      setHabits(habitData);
  };

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
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="close" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <Text>New Habit</Text>
          <TextInput placeholder="Title" value={titleText} onChangeText={(text) => setTitleText(text)}/>
          <TextInput placeholder="Description" value={descriptionText} onChangeText={(text) => setDescriptionText(text)} />
          <TextInput placeholder="Frequency" value={frequencyText} onChangeText={(text) => setFrequencyText(text)}/>
          <TouchableOpacity onPress={() => { addHabit(titleText, descriptionText, frequencyText); setModalVisible(false); setTitleText(""); setDescriptionText(""); setFrequencyText(""); Keyboard.dismiss(); }}>
            <Text>Add Habit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <FlatList data={habits} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => (
        <View style={{marginBottom: 32, backgroundColor: '#fff', padding: 16, borderRadius: 8}}>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{item.frequency}</Text>
          <Text>{item.streak}</Text>
        </View>
      )}/>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={64} color="blue" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
