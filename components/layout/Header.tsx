import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../../store/useStore";
import { TIER_LIMITS } from "../../types";
import { CLCLogo } from "../Logo";

export function Header() {
  const { user, isRecording, isStreaming } = useStore();
  const limit = TIER_LIMITS[user.tier];
  const remaining = Math.max(0, limit.dailyRecordingSeconds - user.recordingSecondsUsedToday);
  const remainingMin = Math.floor(remaining / 60);
  const remainingSec = remaining % 60;

  const tierColors: Record<string, string> = {
    free: "#6B7280",
    basic: "#00A86B",
    pro: "#7C3AED",
  };

  return (
    <View className="bg-jade-600 px-4 pt-12 pb-3 flex-row items-center justify-between shadow-lg">
      <CLCLogo size={44} showText={false} />

      <View className="flex-1 ml-3">
        <Text className="text-white font-bold text-base">CLC Premiere Studios</Text>
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center">
            <View
              className="w-2 h-2 rounded-full mr-1"
              style={{ backgroundColor: tierColors[user.tier] }}
            />
            <Text className="text-jade-100 text-xs capitalize">{user.tier} plan</Text>
          </View>
          {limit.dailyRecordingSeconds !== Infinity && (
            <Text className="text-jade-200 text-xs">
              • {remainingMin}:{remainingSec.toString().padStart(2, "0")} left today
            </Text>
          )}
          {limit.dailyRecordingSeconds === Infinity && (
            <Text className="text-jade-200 text-xs">• Unlimited</Text>
          )}
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        {(isRecording || isStreaming) && (
          <View className="flex-row items-center bg-red-500 px-2 py-1 rounded-full">
            <View className="w-2 h-2 bg-white rounded-full mr-1" />
            <Text className="text-white text-xs font-bold">
              {isStreaming ? "LIVE" : "REC"}
            </Text>
          </View>
        )}
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="w-8 h-8 bg-jade-400 rounded-full items-center justify-center">
            <Text className="text-white font-bold text-sm">
              {user.name.charAt(0)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
