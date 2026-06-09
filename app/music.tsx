import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import { MUSIC_LIBRARY, GENRE_LABELS, formatDuration } from "../data/music";
import { router } from "expo-router";

const JADE = "#00A86B";
const GENRES = ["all", "pop", "country", "rap", "rnb"] as const;

export default function MusicScreen() {
  const { user, aiProcessing, setAiProcessing } = useStore();
  const [activeTab, setActiveTab] = useState<"library" | "ai">("library");
  const [selectedGenre, setSelectedGenre] = useState<typeof GENRES[number]>("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiStyle, setAiStyle] = useState<string>("pop");
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [generatedTrack, setGeneratedTrack] = useState<string | null>(null);
  const limit = TIER_LIMITS[user.tier];

  const filtered = selectedGenre === "all" ? MUSIC_LIBRARY : MUSIC_LIBRARY.filter((t) => t.genre === selectedGenre);

  const togglePlay = (id: string) => setPlayingId(playingId === id ? null : id);

  const generateAIMusic = () => {
    if (!limit.aiFeatures) {
      Alert.alert("AI Music Creation", "Upgrade to Basic or Pro to create AI-generated music.", [
        { text: "Upgrade", onPress: () => router.push("/account") },
        { text: "Cancel", style: "cancel" },
      ]);
      return;
    }
    if (!aiPrompt.trim() && !voiceRecorded) {
      Alert.alert("Add a Prompt", "Describe the song you want or record your voice first.");
      return;
    }
    setAiProcessing(true);
    setTimeout(() => {
      setAiProcessing(false);
      setGeneratedTrack(`AI Track: "${aiPrompt || "Voice Creation"}" — ${aiStyle} style`);
      Alert.alert("Song Created!", "Your AI-generated song is ready. Add it to your video or save it.");
    }, 3000);
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Tab selector */}
      <View className="flex-row bg-gray-800 p-1 m-4 rounded-2xl">
        {(["library", "ai"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-2.5 rounded-xl items-center ${activeTab === tab ? "bg-jade-500" : ""}`}
            onPress={() => setActiveTab(tab)}
          >
            <Text className={`font-bold text-sm ${activeTab === tab ? "text-white" : "text-gray-400"}`}>
              {tab === "library" ? "Music Library" : "AI Music Creator"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "library" ? (
        <View className="flex-1">
          {/* Genre filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-3 max-h-10" contentContainerStyle={{ gap: 8 }}>
            {GENRES.map((g) => (
              <TouchableOpacity
                key={g}
                className={`px-4 py-1.5 rounded-full border ${selectedGenre === g ? "bg-jade-500 border-jade-500" : "border-gray-600"}`}
                onPress={() => setSelectedGenre(g)}
              >
                <Text className={`text-sm font-semibold ${selectedGenre === g ? "text-white" : "text-gray-400"}`}>
                  {g === "all" ? "All" : GENRE_LABELS[g]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text className="px-4 text-gray-500 text-xs mb-3">
            Royalty-free tracks. Current chart songs require a music license agreement.
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} className="px-4">
            {filtered.map((track) => {
              const isPlaying = playingId === track.id;
              return (
                <TouchableOpacity
                  key={track.id}
                  className={`mb-3 rounded-2xl p-4 ${isPlaying ? "bg-jade-900/60 border border-jade-600" : "bg-gray-800"}`}
                  onPress={() => togglePlay(track.id)}
                >
                  <View className="flex-row items-center">
                    <View className={`w-12 h-12 rounded-full items-center justify-center mr-3 ${isPlaying ? "bg-jade-500" : "bg-gray-700"}`}>
                      <Ionicons name={isPlaying ? "pause" : "play"} size={20} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold">{track.title}</Text>
                      <Text className="text-gray-400 text-xs">{track.artist}</Text>
                      <View className="flex-row items-center mt-1 gap-3">
                        <View className="bg-jade-900/60 px-2 py-0.5 rounded-full">
                          <Text className="text-jade-400 text-xs">{GENRE_LABELS[track.genre]}</Text>
                        </View>
                        <Text className="text-gray-500 text-xs">{track.bpm} BPM</Text>
                        <Text className="text-gray-500 text-xs">{formatDuration(track.duration)}</Text>
                      </View>
                    </View>
                    <TouchableOpacity className="p-2">
                      <Ionicons name="add-circle" size={22} color={JADE} />
                    </TouchableOpacity>
                  </View>

                  {/* Waveform visualization */}
                  {isPlaying && track.waveform && (
                    <View className="flex-row items-center gap-0.5 mt-3 h-8">
                      {track.waveform.map((h, i) => (
                        <View
                          key={i}
                          className="flex-1 rounded-full bg-jade-400"
                          style={{ height: `${h * 100}%` }}
                        />
                      ))}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          {/* AI Music Creator */}
          <View className={`rounded-2xl p-4 mb-4 ${!limit.aiFeatures ? "bg-gray-800/50 border border-gray-700" : "bg-jade-900/40 border border-jade-700"}`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name="sparkles" size={22} color="#FCD34D" />
              <Text className="text-white font-bold text-lg ml-2">AI Music Creator</Text>
              {!limit.aiFeatures && (
                <TouchableOpacity className="ml-auto bg-jade-600 px-3 py-1 rounded-full" onPress={() => router.push("/account")}>
                  <Text className="text-white text-xs font-bold">Upgrade</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text className="text-gray-300 text-sm mb-4">
              Describe your song, record your voice, and AI creates a custom track using your voice and AI instruments.
            </Text>

            {/* Song description input */}
            <Text className="text-gray-300 font-semibold mb-2">Describe Your Song</Text>
            <TextInput
              className="bg-gray-800 rounded-xl p-3 text-white text-sm mb-4"
              placeholder="e.g., Upbeat summer pop song about confidence and glowing up..."
              placeholderTextColor="#6B7280"
              multiline
              numberOfLines={3}
              value={aiPrompt}
              onChangeText={setAiPrompt}
              editable={limit.aiFeatures}
            />

            {/* Genre selector */}
            <Text className="text-gray-300 font-semibold mb-2">Music Style</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              {["pop", "country", "rap", "rnb", "electronic", "jazz", "gospel", "cinematic"].map((s) => (
                <TouchableOpacity
                  key={s}
                  className={`mr-2 px-4 py-2 rounded-full ${aiStyle === s ? "bg-jade-500" : "bg-gray-700"}`}
                  onPress={() => limit.aiFeatures && setAiStyle(s)}
                >
                  <Text className={`capitalize text-sm font-semibold ${aiStyle === s ? "text-white" : "text-gray-400"}`}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Voice recording */}
            <Text className="text-gray-300 font-semibold mb-2">Record Your Voice (Optional)</Text>
            <TouchableOpacity
              className={`rounded-xl p-4 items-center mb-4 border-2 border-dashed ${voiceRecorded ? "border-jade-500 bg-jade-900/30" : "border-gray-600 bg-gray-800"}`}
              onPress={() => {
                if (!limit.aiFeatures) { router.push("/account"); return; }
                setVoiceRecorded(!voiceRecorded);
              }}
            >
              <Ionicons name={voiceRecorded ? "checkmark-circle" : "mic"} size={28} color={voiceRecorded ? JADE : "#9CA3AF"} />
              <Text className={`mt-2 font-semibold ${voiceRecorded ? "text-jade-400" : "text-gray-400"}`}>
                {voiceRecorded ? "Voice recorded — AI will use your voice!" : "Tap to record your voice or melody"}
              </Text>
              {voiceRecorded && <Text className="text-gray-500 text-xs mt-1">AI will blend your voice with backing music</Text>}
            </TouchableOpacity>

            {/* Generate button */}
            <TouchableOpacity
              className={`py-4 rounded-xl items-center ${aiProcessing ? "bg-gray-600" : limit.aiFeatures ? "bg-jade-500" : "bg-gray-700"}`}
              onPress={generateAIMusic}
              disabled={aiProcessing}
            >
              <View className="flex-row items-center">
                <Ionicons name="sparkles" size={18} color={aiProcessing ? "#9CA3AF" : "white"} />
                <Text className={`ml-2 font-bold text-base ${aiProcessing ? "text-gray-400" : "text-white"}`}>
                  {aiProcessing ? "Creating Your Song..." : limit.aiFeatures ? "Create AI Song" : "Upgrade to Create AI Music"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Generated track result */}
          {generatedTrack && (
            <View className="bg-jade-900/40 border border-jade-600 rounded-2xl p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Ionicons name="musical-notes" size={20} color={JADE} />
                <Text className="text-jade-300 font-bold ml-2">Your AI Track is Ready!</Text>
              </View>
              <Text className="text-white mb-3">{generatedTrack}</Text>
              {/* Fake waveform */}
              <View className="flex-row items-center gap-0.5 h-10 mb-3">
                {Array.from({ length: 20 }, (_, i) => Math.random() * 0.7 + 0.2).map((h, i) => (
                  <View key={i} className="flex-1 rounded-full bg-jade-400" style={{ height: `${h * 100}%` }} />
                ))}
              </View>
              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 bg-jade-500 py-3 rounded-xl items-center">
                  <Text className="text-white font-bold">Add to Video</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-gray-700 py-3 rounded-xl items-center">
                  <Text className="text-gray-200 font-bold">Save Track</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* How it works */}
          <View className="bg-gray-800 rounded-2xl p-4 mb-6">
            <Text className="text-gray-300 font-bold mb-3">How AI Music Creation Works</Text>
            {[
              { step: "1", label: "Describe your song", desc: "Tell AI the mood, genre, and story" },
              { step: "2", label: "Record your voice", desc: "Sing, hum, or speak — AI learns your vocal style" },
              { step: "3", label: "AI composes", desc: "AI creates a full backing track with your voice blended in" },
              { step: "4", label: "Add to your video", desc: "One tap to sync the song to your edit" },
            ].map((item) => (
              <View key={item.step} className="flex-row items-start mb-3">
                <View className="w-7 h-7 rounded-full bg-jade-600 items-center justify-center mr-3 mt-0.5">
                  <Text className="text-white text-xs font-bold">{item.step}</Text>
                </View>
                <View>
                  <Text className="text-white font-semibold">{item.label}</Text>
                  <Text className="text-gray-400 text-xs">{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
