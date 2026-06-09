import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Ellipse, Path, Rect, Text as SvgText, G } from "react-native-svg";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import { RETRO_SKINS, ANIME_SKINS } from "../data/skins";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_SIZE = (width - 48) / 3 - 4;
const JADE = "#00A86B";

// SVG avatar renderer — generates a unique face for each skin style
function SkinAvatar({ colors, era, size = 60 }: { colors: string[]; era: "retro" | "anime"; size?: number }) {
  const [c1, c2, c3] = colors;
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.38;

  if (era === "retro") {
    return (
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Background circle */}
        <Circle cx={cx} cy={cy} r={r + 4} fill={c2 || "#FDE68A"} />
        {/* Face */}
        <Circle cx={cx} cy={cy} r={r} fill={c1} />
        {/* Eyes */}
        <Circle cx={cx - r * 0.3} cy={cy - r * 0.15} r={r * 0.14} fill="white" />
        <Circle cx={cx + r * 0.3} cy={cy - r * 0.15} r={r * 0.14} fill="white" />
        <Circle cx={cx - r * 0.28} cy={cy - r * 0.13} r={r * 0.07} fill="#1F2937" />
        <Circle cx={cx + r * 0.28} cy={cy - r * 0.13} r={r * 0.07} fill="#1F2937" />
        {/* Smile */}
        <Path d={`M ${cx - r * 0.3} ${cy + r * 0.2} Q ${cx} ${cy + r * 0.4} ${cx + r * 0.3} ${cy + r * 0.2}`} stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Hair */}
        <Path d={`M ${cx - r} ${cy - r * 0.2} Q ${cx} ${cy - r * 1.4} ${cx + r} ${cy - r * 0.2}`} fill={c3 || "#92400E"} />
        {/* Rosy cheeks */}
        <Circle cx={cx - r * 0.55} cy={cy + r * 0.1} r={r * 0.12} fill="#FCA5A5" opacity="0.6" />
        <Circle cx={cx + r * 0.55} cy={cy + r * 0.1} r={r * 0.12} fill="#FCA5A5" opacity="0.6" />
      </Svg>
    );
  }

  // Anime style
  return (
    <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {/* Background */}
      <Circle cx={cx} cy={cy} r={r + 6} fill={c2 || "#C4B5FD"} opacity="0.3" />
      {/* Face — slightly oval */}
      <Ellipse cx={cx} cy={cy + r * 0.05} rx={r * 0.85} ry={r} fill={c1} />
      {/* Large anime eyes */}
      <Ellipse cx={cx - r * 0.28} cy={cy - r * 0.1} rx={r * 0.2} ry={r * 0.25} fill="white" />
      <Ellipse cx={cx + r * 0.28} cy={cy - r * 0.1} rx={r * 0.2} ry={r * 0.25} fill="white" />
      <Ellipse cx={cx - r * 0.27} cy={cy - r * 0.08} rx={r * 0.12} ry={r * 0.17} fill={c3 || "#7C3AED"} />
      <Ellipse cx={cx + r * 0.27} cy={cy - r * 0.08} rx={r * 0.12} ry={r * 0.17} fill={c3 || "#7C3AED"} />
      <Circle cx={cx - r * 0.24} cy={cy - r * 0.11} r={r * 0.05} fill="white" />
      <Circle cx={cx + r * 0.24} cy={cy - r * 0.11} r={r * 0.05} fill="white" />
      {/* Small mouth */}
      <Path d={`M ${cx - r * 0.12} ${cy + r * 0.28} Q ${cx} ${cy + r * 0.38} ${cx + r * 0.12} ${cy + r * 0.28}`} stroke="#DB2777" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Anime hair spikes */}
      <Path d={`M ${cx - r * 0.9} ${cy - r * 0.3} Q ${cx - r * 0.7} ${cy - r * 1.3} ${cx - r * 0.2} ${cy - r * 0.85}`} fill={c3 || "#7C3AED"} />
      <Path d={`M ${cx} ${cy - r * 1.0} Q ${cx} ${cy - r * 1.5} ${cx + r * 0.1} ${cy - r * 0.9}`} fill={c3 || "#7C3AED"} />
      <Path d={`M ${cx + r * 0.9} ${cy - r * 0.3} Q ${cx + r * 0.7} ${cy - r * 1.3} ${cx + r * 0.2} ${cy - r * 0.85}`} fill={c3 || "#7C3AED"} />
    </Svg>
  );
}

export default function SkinsScreen() {
  const { user, selectedSkinId, setSelectedSkin, unlockSkin } = useStore();
  const [activeTab, setActiveTab] = useState<"retro" | "anime">("retro");
  const limit = TIER_LIMITS[user.tier];
  const skins = activeTab === "retro" ? RETRO_SKINS : ANIME_SKINS;

  const handleSelectSkin = (skin: typeof RETRO_SKINS[0]) => {
    if (skin.isPremium && !user.unlockedSkins.includes(skin.id)) {
      if (!skin.unlocksAt) return;
      Alert.alert(
        "Premium Skin",
        `"${skin.name}" unlocks on the ${skin.unlocksAt === "basic" ? "Basic ($4.99)" : "Pro ($10)"} plan as a monthly new skin.`,
        [
          { text: "Upgrade", onPress: () => router.push("/account") },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }
    setSelectedSkin(selectedSkinId === skin.id ? null : skin.id);
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Tab selector */}
      <View className="flex-row bg-gray-800 p-1 m-4 rounded-2xl">
        {(["retro", "anime"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-2.5 rounded-xl items-center ${activeTab === tab ? "bg-jade-500" : ""}`}
            onPress={() => setActiveTab(tab)}
          >
            <Text className={`font-bold text-sm ${activeTab === tab ? "text-white" : "text-gray-400"}`}>
              {tab === "retro" ? "80s / 90s Retro (30)" : "Anime (30)"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="px-4 text-gray-500 text-xs mb-3">
        Tap a skin to use as your stream background. Locked skins unlock with paid plans (1 new skin/month).
      </Text>

      {/* Currently active */}
      {selectedSkinId && (
        <View className="mx-4 mb-3 bg-jade-900/40 border border-jade-600 rounded-xl p-3 flex-row items-center">
          <Ionicons name="checkmark-circle" size={18} color={JADE} />
          <Text className="text-jade-300 ml-2 font-semibold">
            Active: {[...RETRO_SKINS, ...ANIME_SKINS].find((s) => s.id === selectedSkinId)?.name}
          </Text>
          <TouchableOpacity className="ml-auto" onPress={() => setSelectedSkin(null)}>
            <Text className="text-gray-500 text-xs">Remove</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap gap-3 pb-6">
          {skins.map((skin) => {
            const isUnlocked = !skin.isPremium || user.unlockedSkins.includes(skin.id);
            const isActive = selectedSkinId === skin.id;
            return (
              <TouchableOpacity
                key={skin.id}
                style={{ width: CARD_SIZE }}
                className={`rounded-2xl overflow-hidden border-2 ${isActive ? "border-jade-400" : "border-gray-700"} bg-gray-800`}
                onPress={() => handleSelectSkin(skin)}
              >
                {/* Avatar */}
                <View className="items-center py-3" style={{ backgroundColor: skin.colors[1] + "30" }}>
                  <SkinAvatar colors={skin.colors} era={skin.era} size={CARD_SIZE - 20} />
                </View>

                {/* Info */}
                <View className="p-2">
                  <Text className="text-white text-xs font-bold text-center" numberOfLines={1}>{skin.name}</Text>
                  <Text className="text-gray-500 text-xs text-center" numberOfLines={1}>{skin.category}</Text>
                </View>

                {/* Lock overlay */}
                {!isUnlocked && (
                  <View className="absolute inset-0 bg-black/60 items-center justify-center rounded-2xl">
                    <Ionicons name="lock-closed" size={20} color={JADE} />
                    <Text className="text-jade-400 text-xs mt-1 font-semibold capitalize">{skin.unlocksAt}</Text>
                  </View>
                )}

                {/* Active badge */}
                {isActive && (
                  <View className="absolute top-1.5 right-1.5 bg-jade-500 rounded-full w-5 h-5 items-center justify-center">
                    <Ionicons name="checkmark" size={12} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Upgrade CTA */}
      {user.tier === "free" && (
        <View className="mx-4 mb-4 bg-jade-900/40 border border-jade-700 rounded-2xl p-4">
          <Text className="text-jade-300 font-bold text-center">Unlock New Skins Monthly</Text>
          <Text className="text-gray-400 text-xs text-center mt-1">Basic $4.99 or Pro $10 — 1 new cartoon skin per month</Text>
          <TouchableOpacity className="mt-3 bg-jade-500 py-2.5 rounded-xl items-center" onPress={() => router.push("/account")}>
            <Text className="text-white font-bold">Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
