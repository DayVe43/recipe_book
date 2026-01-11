import { Ionicons } from "@expo/vector-icons";
import { Link, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";


export function Tabs() {
  const pathname = usePathname();
  return (
    <View style={{ height: 64, alignItems: 'center', justifyContent: "space-evenly", marginBottom: 32, flexDirection: 'row' }}>
        <Link href="/" asChild style={{ alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 8 }}>
          <Pressable>
            <Ionicons name={pathname === ("/") || pathname.includes("/recipe") ? "book" : "book-outline"} size={24} color="black" />
            <Text>Recipes</Text>
          </Pressable>
        </Link>
        <Link href="/planned" asChild style={{ alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 8 }}>
          <Pressable>
            <Ionicons name={pathname.includes("/planned") ? "calendar" : "calendar-outline"} size={24} color="black" />
            <Text>Planned</Text>
          </Pressable>
        </Link>
        <Link href="/shopping_list" asChild style={{ alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 8 }}>
          <Pressable>
            <Ionicons name={pathname.includes("/shopping_list") ? "cart" : "cart-outline"} size={24} color="black" />
            <Text>Shopping List</Text>
          </Pressable>
        </Link>
      </View>
  );
}