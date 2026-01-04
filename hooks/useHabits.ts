import { Habit } from "@/models/Habit";
import { getHabitById, loadHabits, saveHabits } from "@/persistence/habitStorage";
import { randomUUID } from 'expo-crypto';
import { useEffect, useState } from "react";

export function useHabits() {
  const [habits, setHabits] = useState<Array<Habit>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const load = async () => {
      const loadedHabits = await loadHabits();
      setHabits(loadedHabits);
      setIsLoading(false);
    };
    load();
  }, []);

  const reloadHabits = async () => {
    setIsLoading(true);
    const loadedHabits = await loadHabits();
    setHabits(loadedHabits);
    setIsLoading(false);
  };

  const addHabit = async (title: string, description: string, frequency: string) => {
    const habit: Habit = {
      id: randomUUID(),
      title,
      description,
      frequency,
      streak: 0,
    };
    const newHabits = [...habits, habit];
    setHabits(newHabits);
    await saveHabits(newHabits);
  };

  const removeHabit = async (id: string) => {
    const newHabits = habits.filter(habit => habit.id !== id);
    setHabits(newHabits);
    await saveHabits(newHabits);
  }

  const getHabit = async (id: string): Promise<Habit | null> => {
    return await getHabitById(id);
  }

  return { habits, isLoading, addHabit, removeHabit, getHabit, reloadHabits };
}