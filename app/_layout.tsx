import "../global.css";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Header } from "../components/layout/Header";

const JADE = "#00A86B";
const JADE_DARK = "#007A4D";
const GRAY = "#9CA3AF";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#F0FDF6" }}>
        <Header />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: JADE,
            tabBarInactiveTintColor: GRAY,
            tabBarStyle: {
              backgroundColor: "#ffffff",
              borderTopColor: "#D1FAE5",
              borderTopWidth: 1,
              height: 70,
              paddingBottom: 10,
              paddingTop: 6,
            },
            tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="studio"
            options={{
              title: "Studio",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="radio" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="editor"
            options={{
              title: "Editor",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cut" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="music"
            options={{
              title: "Music",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="musical-notes" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="social"
            options={{
              title: "Social",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="share-social" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="skins"
            options={{
              title: "Skins",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="color-palette" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="account"
            options={{
              title: "Account",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </GestureHandlerRootView>
  );
}
