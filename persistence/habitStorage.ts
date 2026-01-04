import { Habit } from "@/models/Habit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveHabits = async (habits: Habit[]) => {
  try {
    await AsyncStorage.setItem("habits", JSON.stringify(habits));
  } catch (error) {
    console.error("Error saving habits:", error);
  }
};

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const habitsJson = await AsyncStorage.getItem("habits");
    return habitsJson ? JSON.parse(habitsJson) : [];
  } catch (error) {
    console.error("Error loading habits:", error);
    return [];
  }
};

export const getHabitById = async (id: string): Promise<Habit | null> => {
  try {
    const habits = await loadHabits();
    return habits.find(habit => habit.id === id) || null;
  } catch (error) {
    console.error("Error getting habit by ID:", error);
    return null;
  }
};