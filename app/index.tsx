import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../store/useStore";
import { TIER_LIMITS, TIER_PRICES } from "../types";
import { AppLogo } from "../components/Logo";

const { width } = Dimensions.get("window");

const QUICK_ACTIONS = [
  { icon: "radio",         label: "Go Live",       route: "/studio",  color: "#EF4444" },
  { icon: "videocam",      label: "Record",         route: "/studio",  color: "#00A86B" },
  { icon: "cut",           label: "Edit Video",     route: "/editor",  color: "#8B5CF6" },
  { icon: "musical-notes", label: "AI Music",       route: "/music",   color: "#F59E0B" },
  { icon: "share-social",  label: "Post & Schedule",route: "/social",  color: "#0EA5E9" },
  { icon: "color-palette", label: "Skins",          route: "/skins",   color: "#EC4899" },
] as const;

export default function HomeScreen() {
  const { user, projects, scheduledPosts } = useStore();
  const limit = TIER_LIMITS[user.tier];
  const recordedToday = user.recordingSecondsUsedToday;
  const dailyMax = limit.dailyRecordingSeconds === Infinity ? null : limit.dailyRecordingSeconds;
  const progress = dailyMax ? Math.min(1, recordedToday / dailyMax) : 0;

  return (
    <ScrollView className="flex-1 bg-jade-50" showsVerticalScrollIndicator={false}>
      {/* Hero banner */}
      <View className="bg-jade-600 px-5 pb-8 pt-4 items-center">
        <AppLogo size={90} showText={true} />
        <Text className="text-jade-100 mt-3 text-center text-sm">
          Stream · Edit · Create · Share
        </Text>
      </View>

      {/* Usage card */}
      <View className="mx-4 -mt-5 bg-white rounded-2xl shadow-md p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-bold text-gray-800">Today's Recording</Text>
          <View className="bg-jade-100 px-2 py-0.5 rounded-full">
            <Text className="text-jade-700 text-xs font-semibold capitalize">{user.tier} Plan</Text>
          </View>
        </View>
        {dailyMax ? (
          <>
            <View className="bg-gray-100 rounded-full h-3 overflow-hidden">
              <View
                className="bg-jade-500 h-3 rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </View>
            <Text className="text-gray-500 text-xs mt-1">
              {Math.floor(recordedToday / 60)}:{(recordedToday % 60).toString().padStart(2,"0")} / {Math.floor(dailyMax / 60)} min used
            </Text>
          </>
        ) : (
          <View className="flex-row items-center">
            <Ionicons name="infinite" size={18} color="#00A86B" />
            <Text className="text-jade-600 font-semibold ml-2">Unlimited recording</Text>
          </View>
        )}
        {user.tier === "free" && (
          <TouchableOpacity
            className="mt-3 bg-jade-500 rounded-xl py-2 items-center"
            onPress={() => router.push("/account")}
          >
            <Text className="text-white font-bold text-sm">Upgrade for More Time</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Quick Actions */}
      <View className="px-4 mt-5">
        <Text className="font-bold text-gray-800 text-base mb-3">Quick Actions</Text>
        <View className="flex-row flex-wrap gap-3 justify-between">
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.label}
              className="bg-white rounded-2xl shadow-sm items-center py-4"
              style={{ width: (width - 48) / 3 - 4 }}
              onPress={() => router.push(action.route as any)}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: action.color + "20" }}
              >
                <Ionicons name={action.icon as any} size={24} color={action.color} />
              </View>
              <Text className="text-gray-700 text-xs font-semibold text-center">{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI Features banner */}
      <View className="mx-4 mt-5 bg-gradient-to-r from-jade-600 to-jade-400 rounded-2xl p-4 overflow-hidden">
        <View className="flex-row items-center mb-2">
          <Ionicons name="sparkles" size={20} color="#FCD34D" />
          <Text className="text-white font-bold text-base ml-2">AI-Powered Studio</Text>
        </View>
        <Text className="text-jade-100 text-sm mb-3">
          Enhance audio, perfect video, create music with your voice, and get smart editing recommendations.
        </Text>
        {!limit.aiFeatures ? (
          <TouchableOpacity
            className="bg-white rounded-xl py-2 px-4 self-start"
            onPress={() => router.push("/account")}
          >
            <Text className="text-jade-600 font-bold text-sm">Unlock AI — $4.99/mo</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={16} color="#86EFAC" />
            <Text className="text-jade-100 text-sm ml-1">AI features active</Text>
          </View>
        )}
      </View>

      {/* Recent Projects */}
      <View className="px-4 mt-5">
        <Text className="font-bold text-gray-800 text-base mb-3">Recent Projects</Text>
        {projects.length === 0 ? (
          <View className="bg-white rounded-2xl p-6 items-center shadow-sm">
            <Ionicons name="film-outline" size={40} color="#D1FAE5" />
            <Text className="text-gray-400 mt-2 text-center">No projects yet. Start recording or editing!</Text>
            <TouchableOpacity
              className="mt-3 bg-jade-500 px-5 py-2 rounded-xl"
              onPress={() => router.push("/studio")}
            >
              <Text className="text-white font-semibold">Start Creating</Text>
            </TouchableOpacity>
          </View>
        ) : (
          projects.slice(0, 3).map((p) => (
            <View key={p.id} className="bg-white rounded-xl p-4 mb-2 flex-row items-center shadow-sm">
              <View className="w-14 h-10 bg-jade-100 rounded-lg items-center justify-center mr-3">
                <Ionicons name="film" size={20} color="#00A86B" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-gray-800">{p.name}</Text>
                <Text className="text-gray-400 text-xs">{p.clips.length} clips • {Math.floor(p.duration / 60)}:{(p.duration % 60).toString().padStart(2,"0")}</Text>
              </View>
              <TouchableOpacity onPress={() => router.push("/editor")}>
                <Ionicons name="pencil" size={18} color="#00A86B" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* Scheduled posts */}
      <View className="px-4 mt-4 mb-6">
        <Text className="font-bold text-gray-800 text-base mb-3">Scheduled Posts</Text>
        {scheduledPosts.length === 0 ? (
          <View className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm">
            <Ionicons name="calendar-outline" size={28} color="#D1FAE5" />
            <Text className="text-gray-400 ml-3">No scheduled posts yet.</Text>
          </View>
        ) : (
          scheduledPosts.slice(0, 2).map((post) => (
            <View key={post.id} className="bg-white rounded-xl p-3 mb-2 flex-row items-center shadow-sm">
              <Ionicons name="calendar" size={22} color="#00A86B" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-700 text-sm font-semibold">{post.caption.slice(0, 40)}...</Text>
                <Text className="text-gray-400 text-xs">{post.platforms.join(", ")} • {new Date(post.scheduledAt).toLocaleDateString()}</Text>
              </View>
              <View className={`px-2 py-0.5 rounded-full ${post.status === "pending" ? "bg-yellow-100" : "bg-jade-100"}`}>
                <Text className={`text-xs font-semibold ${post.status === "pending" ? "text-yellow-600" : "text-jade-600"}`}>
                  {post.status}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
