import React, { useState, useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, ScrollView, Alert, Platform,
} from "react-native";
import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import { ALL_SKINS } from "../data/skins";
import { router } from "expo-router";

const JADE = "#00A86B";

export default function StudioScreen() {
  const { user, isRecording, isStreaming, setIsRecording, setIsStreaming, addRecordingSeconds, selectedSkinId, setSelectedSkin } = useStore();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [facing, setFacing] = useState<"front" | "back">("front");
  const [timer, setTimer] = useState(0);
  const [faceCamEnabled, setFaceCamEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [aiEnhanceEnabled, setAiEnhanceEnabled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const limit = TIER_LIMITS[user.tier];
  const remaining = limit.dailyRecordingSeconds === Infinity
    ? Infinity
    : Math.max(0, limit.dailyRecordingSeconds - user.recordingSecondsUsedToday);

  const currentSkin = ALL_SKINS.find((s) => s.id === selectedSkinId);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startRecording = async () => {
    if (!cameraPermission?.granted) { await requestCameraPermission(); return; }
    if (!micPermission?.granted) { await requestMicPermission(); return; }
    if (remaining === 0) {
      Alert.alert("Time Limit Reached", `Upgrade your plan for more recording time.\n\nFree: 3 min/day\nBasic ($4.99): 50 min/day\nPro ($10): Unlimited`, [
        { text: "Upgrade", onPress: () => router.push("/account") },
        { text: "Cancel", style: "cancel" },
      ]);
      return;
    }
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        addRecordingSeconds(1);
        if (remaining !== Infinity && t + 1 >= remaining) {
          stopRecording();
          Alert.alert("Time Limit Reached", "You've used all your recording time for today.");
        }
        return t + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(0);
  };

  const startStream = () => {
    if (!limit.aiFeatures && isStreaming === false) {
      Alert.alert("Upgrade Required", "Live streaming is available on Basic and Pro plans.", [
        { text: "Upgrade", onPress: () => router.push("/account") },
        { text: "Cancel", style: "cancel" },
      ]);
      return;
    }
    setIsStreaming(!isStreaming);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const permissionsGranted = cameraPermission?.granted && micPermission?.granted;

  return (
    <ScrollView className="flex-1 bg-gray-900" showsVerticalScrollIndicator={false}>
      {/* Camera preview area */}
      <View style={{ height: 320, backgroundColor: "#000", position: "relative" }}>
        {Platform.OS !== "web" && permissionsGranted ? (
          <CameraView
            style={{ flex: 1 }}
            facing={facing}
          >
            {/* Skin overlay */}
            {currentSkin && (
              <View
                className="absolute top-3 right-3 w-16 h-16 rounded-full border-2 border-white items-center justify-center"
                style={{ backgroundColor: currentSkin.colors[0] + "CC" }}
              >
                <Text className="text-white text-xs font-bold text-center" numberOfLines={2}>
                  {currentSkin.name}
                </Text>
              </View>
            )}

            {/* Recording indicator */}
            {isRecording && (
              <View className="absolute top-3 left-3 flex-row items-center bg-red-600 px-3 py-1 rounded-full">
                <View className="w-2 h-2 bg-white rounded-full mr-2" />
                <Text className="text-white text-sm font-bold">REC {formatTime(timer)}</Text>
              </View>
            )}

            {/* LIVE indicator */}
            {isStreaming && (
              <View className="absolute top-3 left-3 flex-row items-center bg-red-600 px-3 py-1 rounded-full">
                <View className="w-2 h-2 bg-white rounded-full mr-2" />
                <Text className="text-white text-sm font-bold">LIVE</Text>
              </View>
            )}

            {/* AI Enhance badge */}
            {aiEnhanceEnabled && limit.aiFeatures && (
              <View className="absolute bottom-3 left-3 flex-row items-center bg-jade-600 px-2 py-1 rounded-full">
                <Ionicons name="sparkles" size={12} color="#FCD34D" />
                <Text className="text-white text-xs ml-1">AI Enhanced</Text>
              </View>
            )}

            {/* Privacy shield indicator */}
            <View className="absolute bottom-3 right-3 flex-row items-center bg-black/60 px-2 py-1 rounded-full">
              <Ionicons name="shield-checkmark" size={12} color="#86EFAC" />
              <Text className="text-white text-xs ml-1">Protected</Text>
            </View>
          </CameraView>
        ) : (
          <View className="flex-1 items-center justify-center bg-gray-800">
            <Ionicons name="videocam" size={60} color="#4B5563" />
            <Text className="text-gray-400 mt-3 text-center px-6">
              {Platform.OS === "web"
                ? "Camera preview available on mobile app.\nWeb streaming uses browser permissions."
                : "Tap below to grant camera & mic access"}
            </Text>
            {Platform.OS !== "web" && !permissionsGranted && (
              <TouchableOpacity
                className="mt-4 bg-jade-500 px-5 py-2 rounded-xl"
                onPress={async () => {
                  await requestCameraPermission();
                  await requestMicPermission();
                }}
              >
                <Text className="text-white font-bold">Grant Permissions</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Controls row */}
      <View className="bg-gray-800 px-4 py-4">
        <View className="flex-row justify-around items-center">
          {/* Flip camera */}
          <TouchableOpacity
            className="items-center"
            onPress={() => setFacing(facing === "front" ? "back" : "front")}
          >
            <View className="w-12 h-12 rounded-full bg-gray-700 items-center justify-center">
              <Ionicons name="camera-reverse" size={22} color="white" />
            </View>
            <Text className="text-gray-400 text-xs mt-1">Flip</Text>
          </TouchableOpacity>

          {/* Record button */}
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <View className={`w-20 h-20 rounded-full border-4 ${isRecording ? "border-red-500" : "border-jade-400"} items-center justify-center`}>
              <View className={`${isRecording ? "w-8 h-8 rounded-sm bg-red-500" : "w-14 h-14 rounded-full bg-jade-500"}`} />
            </View>
          </TouchableOpacity>

          {/* Go Live */}
          <TouchableOpacity className="items-center" onPress={startStream}>
            <View className={`w-12 h-12 rounded-full items-center justify-center ${isStreaming ? "bg-red-600" : "bg-gray-700"}`}>
              <Ionicons name="radio" size={22} color="white" />
            </View>
            <Text className="text-gray-400 text-xs mt-1">{isStreaming ? "Stop" : "Live"}</Text>
          </TouchableOpacity>
        </View>

        {/* Time remaining bar */}
        {remaining !== Infinity && (
          <View className="mt-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-400 text-xs">Daily Recording Time</Text>
              <Text className="text-jade-400 text-xs">
                {Math.floor(remaining / 60)}:{(remaining % 60).toString().padStart(2, "0")} remaining
              </Text>
            </View>
            <View className="bg-gray-700 rounded-full h-2">
              <View
                className="bg-jade-500 h-2 rounded-full"
                style={{ width: `${Math.max(0, (1 - user.recordingSecondsUsedToday / limit.dailyRecordingSeconds) * 100)}%` }}
              />
            </View>
          </View>
        )}
      </View>

      {/* Feature toggles */}
      <View className="px-4 py-4 bg-gray-900">
        <Text className="text-gray-300 font-bold mb-3">Studio Options</Text>
        <View className="gap-3">
          {[
            { label: "Face Cam", sublabel: "Front camera overlay", icon: "person", state: faceCamEnabled, toggle: setFaceCamEnabled, locked: false },
            { label: "Screen Share", sublabel: "Record your screen", icon: "phone-portrait", state: screenShareEnabled, toggle: setScreenShareEnabled, locked: false },
            { label: "AI Audio Enhancement", sublabel: "Auto-fix audio levels & clarity", icon: "sparkles", state: aiEnhanceEnabled, toggle: setAiEnhanceEnabled, locked: !limit.aiFeatures },
          ].map((item) => (
            <View key={item.label} className="bg-gray-800 rounded-xl p-3 flex-row items-center">
              <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center mr-3">
                <Ionicons name={item.icon as any} size={18} color={JADE} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold">{item.label}</Text>
                <Text className="text-gray-400 text-xs">{item.sublabel}</Text>
              </View>
              {item.locked ? (
                <TouchableOpacity onPress={() => router.push("/account")} className="flex-row items-center bg-jade-900/60 px-2 py-1 rounded-lg">
                  <Ionicons name="lock-closed" size={12} color="#86EFAC" />
                  <Text className="text-jade-400 text-xs ml-1">Upgrade</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => item.toggle(!item.state)}
                  className={`w-12 h-6 rounded-full ${item.state ? "bg-jade-500" : "bg-gray-600"} items-center justify-center`}
                >
                  <View className={`w-5 h-5 rounded-full bg-white absolute ${item.state ? "right-0.5" : "left-0.5"}`} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Skin picker */}
        <Text className="text-gray-300 font-bold mt-5 mb-3">Active Skin Background</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3">
          <TouchableOpacity
            className={`mr-3 w-16 h-16 rounded-xl border-2 items-center justify-center bg-gray-700 ${!selectedSkinId ? "border-jade-400" : "border-gray-600"}`}
            onPress={() => setSelectedSkin(null)}
          >
            <Ionicons name="close" size={22} color="#9CA3AF" />
            <Text className="text-gray-400 text-xs">None</Text>
          </TouchableOpacity>
          {ALL_SKINS.filter((s) => user.unlockedSkins.includes(s.id)).map((skin) => (
            <TouchableOpacity
              key={skin.id}
              className={`mr-3 w-16 h-16 rounded-xl border-2 items-center justify-center ${selectedSkinId === skin.id ? "border-jade-400" : "border-gray-600"}`}
              style={{ backgroundColor: skin.colors[0] + "CC" }}
              onPress={() => setSelectedSkin(skin.id)}
            >
              <Text className="text-white text-xs font-bold text-center" numberOfLines={2}>{skin.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className="mr-3 w-16 h-16 rounded-xl border-2 border-dashed border-jade-700 items-center justify-center"
            onPress={() => router.push("/skins")}
          >
            <Ionicons name="add" size={22} color="#00A86B" />
            <Text className="text-jade-400 text-xs">More</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Security notice */}
        <View className="mt-5 bg-gray-800 rounded-xl p-4 flex-row items-start">
          <Ionicons name="shield-checkmark" size={20} color="#86EFAC" />
          <View className="ml-3 flex-1">
            <Text className="text-white font-semibold text-sm">Privacy & Security</Text>
            <Text className="text-gray-400 text-xs mt-1 leading-4">
              • Camera & mic indicators always visible during recording{"\n"}
              • Screen recordings stay on your device{"\n"}
              • No background recording without your knowledge{"\n"}
              • All streams encrypted end-to-end
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
