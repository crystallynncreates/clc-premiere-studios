import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, Dimensions, Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const JADE = "#00A86B";

const FILTERS = [
  { id: "none",     label: "None",     color: "#6B7280" },
  { id: "vivid",    label: "Vivid",    color: "#EF4444" },
  { id: "dreamy",   label: "Dreamy",   color: "#8B5CF6" },
  { id: "vintage",  label: "Vintage",  color: "#D97706" },
  { id: "chrome",   label: "Chrome",   color: "#94A3B8" },
  { id: "jade",     label: "Jade",     color: "#00A86B" },
  { id: "neon",     label: "Neon",     color: "#F472B6" },
  { id: "noir",     label: "Noir",     color: "#1F2937" },
];

const TEXT_STYLES = ["Bold", "Neon", "Shadow", "Outline", "Gradient", "Handwrite"];
const TRANSITIONS = ["Cut", "Fade", "Slide", "Zoom", "Spin", "Glitch", "Wipe"];
const EFFECTS = ["Green Screen", "Background Remove", "Face Smooth", "Eye Enhance", "Teeth Whiten", "Denoise"];
const SPEED = ["0.25x", "0.5x", "0.75x", "1x", "1.25x", "1.5x", "2x", "3x"];

export default function EditorScreen() {
  const { user, aiProcessing, setAiProcessing, addProject } = useStore();
  const [activeTab, setActiveTab] = useState<"clips"|"audio"|"text"|"effects"|"transitions"|"ai">("clips");
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [selectedSpeed, setSelectedSpeed] = useState("1x");
  const [clips, setClips] = useState<{ id: string; label: string; duration: number; color: string }[]>([]);
  const [volume, setVolume] = useState(80);
  const limit = TIER_LIMITS[user.tier];

  const addClip = () => {
    const newClip = {
      id: `clip-${Date.now()}`,
      label: `Clip ${clips.length + 1}`,
      duration: Math.floor(Math.random() * 15) + 5,
      color: ["#00A86B","#8B5CF6","#EF4444","#F59E0B","#0EA5E9"][clips.length % 5],
    };
    setClips([...clips, newClip]);
  };

  const runAIEnhance = () => {
    if (!limit.aiFeatures) {
      Alert.alert("AI Features", "Upgrade to Basic or Pro to use AI-powered enhancements.", [
        { text: "Upgrade", onPress: () => router.push("/account") },
        { text: "Cancel", style: "cancel" },
      ]);
      return;
    }
    setAiProcessing(true);
    setTimeout(() => {
      setAiProcessing(false);
      Alert.alert("AI Enhancement Complete", "Audio cleaned, stabilization applied, color graded, and cuts optimized.");
    }, 2500);
  };

  const exportProject = () => {
    if (clips.length === 0) { Alert.alert("No Clips", "Add some clips to your timeline first."); return; }
    addProject({
      id: `proj-${Date.now()}`,
      name: `Project ${new Date().toLocaleDateString()}`,
      clips: clips.map((c) => ({
        id: c.id,
        uri: "",
        startTime: 0,
        endTime: c.duration,
        trimStart: 0,
        trimEnd: c.duration,
        volume: volume / 100,
        speed: parseFloat(selectedSpeed),
        filters: [selectedFilter],
        aiEnhanced: limit.aiFeatures,
      })),
      duration: clips.reduce((a, c) => a + c.duration, 0),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    Alert.alert("Project Saved!", "Your video has been saved. Go to Social to schedule posting.", [
      { text: "Schedule Post", onPress: () => router.push("/social") },
      { text: "Done" },
    ]);
  };

  const TABS = [
    { id: "clips",       label: "Clips",       icon: "film" },
    { id: "audio",       label: "Audio",        icon: "musical-notes" },
    { id: "text",        label: "Text",         icon: "text" },
    { id: "effects",     label: "Effects",      icon: "color-wand" },
    { id: "transitions", label: "Transitions",  icon: "git-merge" },
    { id: "ai",          label: "AI Tools",     icon: "sparkles" },
  ] as const;

  return (
    <View className="flex-1 bg-gray-900">
      {/* Preview area */}
      <View style={{ height: 200, backgroundColor: "#111", justifyContent: "center", alignItems: "center" }}>
        {clips.length === 0 ? (
          <View className="items-center">
            <Ionicons name="film-outline" size={40} color="#374151" />
            <Text className="text-gray-500 mt-2">Add clips to start editing</Text>
            <TouchableOpacity className="mt-3 bg-jade-600 px-4 py-2 rounded-lg" onPress={addClip}>
              <Text className="text-white font-semibold">+ Add Clip</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="w-full h-full items-center justify-center" style={{ backgroundColor: clips[0]?.color + "30" }}>
            <Ionicons name="play-circle" size={50} color={clips[0]?.color} />
            <Text className="text-white mt-2 font-bold">{clips.length} clip{clips.length > 1 ? "s" : ""} • {clips.reduce((a, c) => a + c.duration, 0)}s</Text>
          </View>
        )}
        {/* Filter overlay preview */}
        {selectedFilter !== "none" && (
          <View className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-lg">
            <Text className="text-white text-xs">{selectedFilter}</Text>
          </View>
        )}
        {/* AI Processing indicator */}
        {aiProcessing && (
          <View className="absolute inset-0 bg-black/70 items-center justify-center">
            <Ionicons name="sparkles" size={30} color="#FCD34D" />
            <Text className="text-white mt-2 font-bold">AI Processing...</Text>
          </View>
        )}
      </View>

      {/* Timeline */}
      <View style={{ height: 80, backgroundColor: "#1F2937" }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-3 py-2">
          {clips.map((clip, i) => (
            <TouchableOpacity key={clip.id} className="mr-1 rounded-lg overflow-hidden" style={{ width: clip.duration * 6, backgroundColor: clip.color + "80", height: 56 }}>
              <View className="flex-1 px-2 justify-center">
                <Text className="text-white text-xs font-bold">{clip.label}</Text>
                <Text className="text-white/70 text-xs">{clip.duration}s</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className="w-14 h-14 border-2 border-dashed border-jade-600 rounded-lg items-center justify-center"
            onPress={addClip}
          >
            <Ionicons name="add" size={22} color={JADE} />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Tool tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-gray-800 border-b border-gray-700 max-h-12" contentContainerStyle={{ paddingHorizontal: 8 }}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            className={`flex-row items-center px-4 py-3 mr-1 border-b-2 ${activeTab === tab.id ? "border-jade-400" : "border-transparent"}`}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Ionicons name={tab.icon as any} size={14} color={activeTab === tab.id ? JADE : "#9CA3AF"} />
            <Text className={`ml-1.5 text-xs font-semibold ${activeTab === tab.id ? "text-jade-400" : "text-gray-400"}`}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tab content */}
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {activeTab === "clips" && (
          <View className="gap-3">
            <Text className="text-gray-300 font-bold">Filters</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {FILTERS.map((f) => (
                <TouchableOpacity key={f.id} className={`mr-3 items-center`} onPress={() => setSelectedFilter(f.id)}>
                  <View className={`w-14 h-14 rounded-xl border-2 ${selectedFilter === f.id ? "border-jade-400" : "border-gray-700"}`}
                    style={{ backgroundColor: f.color + "40" }} />
                  <Text className="text-gray-400 text-xs mt-1">{f.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text className="text-gray-300 font-bold mt-2">Speed</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {SPEED.map((s) => (
                <TouchableOpacity key={s} onPress={() => setSelectedSpeed(s)}
                  className={`mr-2 px-4 py-2 rounded-lg ${selectedSpeed === s ? "bg-jade-500" : "bg-gray-700"}`}>
                  <Text className={`font-semibold text-sm ${selectedSpeed === s ? "text-white" : "text-gray-300"}`}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text className="text-gray-300 font-bold mt-2">Volume: {volume}%</Text>
            <View className="flex-row items-center gap-3">
              <Ionicons name="volume-low" size={18} color="#9CA3AF" />
              <View className="flex-1 bg-gray-700 rounded-full h-2">
                <View className="bg-jade-500 h-2 rounded-full" style={{ width: `${volume}%` }} />
              </View>
              <Ionicons name="volume-high" size={18} color="#9CA3AF" />
            </View>
          </View>
        )}

        {activeTab === "audio" && (
          <View className="gap-3">
            <Text className="text-gray-300 font-bold">Audio Tools</Text>
            {["Noise Reduction", "Bass Boost", "Treble Enhance", "Echo Removal", "Volume Normalize", "Fade In/Out"].map((tool) => (
              <TouchableOpacity key={tool} className="bg-gray-800 rounded-xl p-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="musical-note" size={18} color={JADE} />
                  <Text className="text-white ml-3">{tool}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#4B5563" />
              </TouchableOpacity>
            ))}
            <TouchableOpacity className="bg-jade-700/40 rounded-xl p-3 flex-row items-center" onPress={() => router.push("/music")}>
              <Ionicons name="musical-notes" size={18} color={JADE} />
              <Text className="text-jade-300 ml-3 font-semibold">Add Background Music →</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "text" && (
          <View className="gap-3">
            <Text className="text-gray-300 font-bold">Text Styles</Text>
            <View className="flex-row flex-wrap gap-2">
              {TEXT_STYLES.map((style) => (
                <TouchableOpacity key={style} className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-600">
                  <Text className="text-white font-semibold">{style}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text className="text-gray-300 font-bold mt-2">Captions</Text>
            <TouchableOpacity className={`bg-gray-800 rounded-xl p-3 flex-row items-center justify-between ${!limit.aiFeatures ? "opacity-50" : ""}`}
              onPress={() => !limit.aiFeatures ? router.push("/account") : null}>
              <View className="flex-row items-center">
                <Ionicons name="sparkles" size={18} color="#FCD34D" />
                <Text className="text-white ml-3">Auto-Caption (AI)</Text>
              </View>
              {!limit.aiFeatures && <Ionicons name="lock-closed" size={14} color="#4B5563" />}
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "effects" && (
          <View className="gap-3">
            <Text className="text-gray-300 font-bold">Visual Effects</Text>
            <View className="flex-row flex-wrap gap-2">
              {EFFECTS.map((effect) => (
                <TouchableOpacity key={effect}
                  className={`px-4 py-3 rounded-xl border ${effect.includes("AI") || effect === "Green Screen" || effect === "Background Remove" ? "border-jade-600 bg-jade-900/30" : "border-gray-600 bg-gray-800"}`}>
                  <Text className="text-white font-medium text-sm">{effect}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === "transitions" && (
          <View className="gap-3">
            <Text className="text-gray-300 font-bold">Transitions</Text>
            <View className="flex-row flex-wrap gap-2">
              {TRANSITIONS.map((t) => (
                <TouchableOpacity key={t} className="w-24 h-20 bg-gray-800 rounded-xl items-center justify-center border border-gray-700">
                  <Ionicons name="git-merge" size={24} color={JADE} />
                  <Text className="text-gray-300 text-xs mt-1">{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === "ai" && (
          <View className="gap-3">
            <View className={`rounded-2xl p-4 ${!limit.aiFeatures ? "bg-gray-800/50" : "bg-jade-900/40 border border-jade-700"}`}>
              <View className="flex-row items-center mb-2">
                <Ionicons name="sparkles" size={20} color="#FCD34D" />
                <Text className="text-white font-bold text-base ml-2">AI Smart Edit</Text>
                {!limit.aiFeatures && <View className="ml-auto bg-gray-700 px-2 py-0.5 rounded-full"><Text className="text-gray-400 text-xs">Upgrade</Text></View>}
              </View>
              <Text className="text-gray-300 text-sm mb-3">One-tap AI enhancement: audio cleaning, color grading, stabilization, smart cuts, and recommendations.</Text>
              <TouchableOpacity
                className={`py-3 rounded-xl items-center ${!limit.aiFeatures ? "bg-gray-700" : "bg-jade-500"}`}
                onPress={runAIEnhance}
              >
                <Text className="text-white font-bold">{aiProcessing ? "Processing..." : limit.aiFeatures ? "Run AI Enhance" : "Unlock AI — Upgrade"}</Text>
              </TouchableOpacity>
            </View>

            {[
              { label: "AI Audio Perfect", desc: "Remove noise, normalize levels, enhance clarity", icon: "mic" },
              { label: "AI Video Upscale", desc: "Enhance resolution and sharpness", icon: "expand" },
              { label: "AI Smart Crop", desc: "Auto-frame for Instagram, TikTok, YouTube", icon: "crop" },
              { label: "AI Caption Generator", desc: "Auto-transcribe and add styled captions", icon: "text" },
              { label: "AI Music Match", desc: "Find the perfect track for your video mood", icon: "musical-notes" },
              { label: "AI Thumbnail Creator", desc: "Generate eye-catching thumbnails", icon: "image" },
            ].map((item) => (
              <TouchableOpacity key={item.label}
                className={`bg-gray-800 rounded-xl p-3 flex-row items-center ${!limit.aiFeatures ? "opacity-50" : ""}`}
                onPress={() => !limit.aiFeatures ? router.push("/account") : null}
              >
                <View className="w-10 h-10 bg-jade-900/60 rounded-full items-center justify-center mr-3">
                  <Ionicons name={item.icon as any} size={18} color={JADE} />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold">{item.label}</Text>
                  <Text className="text-gray-400 text-xs">{item.desc}</Text>
                </View>
                {!limit.aiFeatures ? <Ionicons name="lock-closed" size={14} color="#4B5563" /> : <Ionicons name="chevron-forward" size={14} color="#4B5563" />}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Export bar */}
      <View className="bg-gray-800 px-4 py-3 flex-row gap-3 border-t border-gray-700">
        <TouchableOpacity className="flex-1 bg-gray-700 py-3 rounded-xl items-center">
          <Text className="text-gray-300 font-semibold">Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-jade-500 py-3 rounded-xl items-center" onPress={exportProject}>
          <Text className="text-white font-bold">Export & Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
