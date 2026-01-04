import { useHabits } from "@/hooks/useHabits";
import { Habit } from "@/models/Habit";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const { id } = useLocalSearchParams();
  const { removeHabit, getHabit } = useHabits();
  const [item, setItem] = useState<Habit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHabit = async () => {
      const habit = await getHabit(id as string);
      setItem(habit);
      setIsLoading(false);
    };
    fetchHabit();
  }, [id, getHabit]);

  if (isLoading) {
    return (<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
          </SafeAreaView>
    )
  }

  if (item === null) {
    return (<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Habit not found</Text>
          </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 16,
      }}
    >
      <StatusBar style="dark" />
        <View style={{marginBottom: 32, backgroundColor: '#fff', padding: 16, borderRadius: 8}}>
          <Text>{item.id}</Text>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{item.frequency}</Text>
          <Text>{item.streak}</Text>
        </View>
        <TouchableOpacity onPress={() => {router.dismissTo('/'); removeHabit(item.id);}}>
          <Text>Delete Habit</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
