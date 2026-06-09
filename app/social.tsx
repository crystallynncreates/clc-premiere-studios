import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../store/useStore";
import { TIER_LIMITS } from "../types";
import { router } from "expo-router";

const JADE = "#00A86B";

const PLATFORMS = [
  { id: "youtube",   label: "YouTube",   icon: "logo-youtube",   color: "#FF0000", authUrl: "https://accounts.google.com/o/oauth2/v2/auth" },
  { id: "instagram", label: "Instagram", icon: "logo-instagram", color: "#E1306C", authUrl: "https://api.instagram.com/oauth/authorize" },
  { id: "twitter",   label: "X (Twitter)", icon: "logo-twitter", color: "#000000", authUrl: "https://twitter.com/i/oauth2/authorize" },
  { id: "snapchat",  label: "Snapchat",  icon: "logo-snapchat",  color: "#FFFC00", authUrl: "https://accounts.snapchat.com/accounts/oauth2/auth" },
] as const;

export default function SocialScreen() {
  const { user, connectSocial, disconnectSocial, addScheduledPost, scheduledPosts } = useStore();
  const [activeTab, setActiveTab] = useState<"accounts" | "schedule">("accounts");
  const [caption, setCaption] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const limit = TIER_LIMITS[user.tier];

  const connectedPlatforms = user.connectedAccounts.filter((a) => a.connected);

  const handleConnect = (platformId: typeof PLATFORMS[number]["id"]) => {
    // In production: open OAuth flow in a WebView or Linking.openURL
    Alert.alert(
      "Connect Account",
      `This will open ${PLATFORMS.find((p) => p.id === platformId)?.label} login to grant CLC Premiere Studios permission to post on your behalf.\n\nYou can revoke access at any time from your social media account settings.`,
      [
        {
          text: "Connect",
          onPress: () => {
            // Simulate OAuth success
            const username = `@crystallynncreates`;
            connectSocial(platformId as any, username);
            Alert.alert("Connected!", `Your ${PLATFORMS.find((p) => p.id === platformId)?.label} account has been linked.`);
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const handleDisconnect = (platformId: typeof PLATFORMS[number]["id"]) => {
    Alert.alert("Disconnect", `Remove your ${PLATFORMS.find((p) => p.id === platformId)?.label} account?`, [
      { text: "Disconnect", style: "destructive", onPress: () => disconnectSocial(platformId as any) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const schedulePost = () => {
    if (limit.scheduledPosts === 0) {
      Alert.alert("Upgrade Required", "Scheduled posting is available on Basic ($4.99) and Pro ($10) plans.", [
        { text: "Upgrade", onPress: () => router.push("/account") },
        { text: "Cancel", style: "cancel" },
      ]);
      return;
    }
    if (limit.scheduledPosts !== Infinity && scheduledPosts.filter((p) => p.status === "pending").length >= limit.scheduledPosts) {
      Alert.alert("Post Limit", "You've used your scheduled post for this month. Upgrade to Pro for unlimited scheduling.", [
        { text: "Upgrade", onPress: () => router.push("/account") },
        { text: "Cancel", style: "cancel" },
      ]);
      return;
    }
    if (!caption.trim()) { Alert.alert("Add a Caption", "Write a caption for your post."); return; }
    if (selectedPlatforms.length === 0) { Alert.alert("Select Platforms", "Choose at least one platform to post to."); return; }
    if (!scheduleDate || !scheduleTime) { Alert.alert("Set Date & Time", "Choose when to publish your post."); return; }

    addScheduledPost({
      id: `post-${Date.now()}`,
      videoUri: "",
      thumbnail: "",
      caption,
      platforms: selectedPlatforms as any[],
      scheduledAt: new Date(`${scheduleDate}T${scheduleTime}`),
      status: "pending",
    });

    Alert.alert("Post Scheduled!", `Your video will be posted to ${selectedPlatforms.join(", ")} on ${scheduleDate} at ${scheduleTime}.`);
    setCaption("");
    setSelectedPlatforms([]);
    setScheduleDate("");
    setScheduleTime("");
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Tabs */}
      <View className="flex-row bg-gray-800 p-1 m-4 rounded-2xl">
        {(["accounts", "schedule"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-2.5 rounded-xl items-center ${activeTab === tab ? "bg-jade-500" : ""}`}
            onPress={() => setActiveTab(tab)}
          >
            <Text className={`font-bold text-sm ${activeTab === tab ? "text-white" : "text-gray-400"}`}>
              {tab === "accounts" ? "Connected Accounts" : "Schedule Posts"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "accounts" ? (
        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
          <Text className="text-gray-400 text-sm mb-4 leading-5">
            Connect your social accounts to post and schedule videos directly from CLC Premiere Studios. You can revoke access at any time from each platform's settings.
          </Text>

          {PLATFORMS.map((platform) => {
            const account = user.connectedAccounts.find((a) => a.platform === platform.id);
            const isConnected = account?.connected;
            return (
              <View key={platform.id} className="bg-gray-800 rounded-2xl p-4 mb-3 flex-row items-center">
                <View className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: platform.color + "25" }}>
                  <Ionicons name={platform.icon as any} size={24} color={platform.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold">{platform.label}</Text>
                  {isConnected ? (
                    <Text className="text-jade-400 text-xs">{account.username} · Connected</Text>
                  ) : (
                    <Text className="text-gray-500 text-xs">Not connected</Text>
                  )}
                </View>
                <TouchableOpacity
                  className={`px-4 py-2 rounded-xl ${isConnected ? "bg-gray-700" : "border border-jade-500"}`}
                  onPress={() => isConnected ? handleDisconnect(platform.id) : handleConnect(platform.id)}
                >
                  <Text className={`font-semibold text-sm ${isConnected ? "text-gray-300" : "text-jade-400"}`}>
                    {isConnected ? "Disconnect" : "Connect"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          {/* Permissions info */}
          <View className="bg-gray-800 rounded-2xl p-4 mb-6">
            <View className="flex-row items-center mb-2">
              <Ionicons name="shield-checkmark" size={18} color={JADE} />
              <Text className="text-white font-bold ml-2">What We Access</Text>
            </View>
            {[
              "Post videos and photos on your behalf",
              "Read your profile name and username",
              "Schedule future posts",
              "We NEVER access DMs, followers, or passwords",
            ].map((item, i) => (
              <View key={i} className="flex-row items-start mb-1.5">
                <Ionicons name={i === 3 ? "close-circle" : "checkmark-circle"} size={14} color={i === 3 ? "#EF4444" : JADE} style={{ marginTop: 2 }} />
                <Text className="text-gray-400 text-xs ml-2 flex-1">{item}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
          {/* Plan restriction notice */}
          {limit.scheduledPosts === 0 && (
            <TouchableOpacity className="bg-jade-900/40 border border-jade-600 rounded-2xl p-4 mb-4 flex-row items-center" onPress={() => router.push("/account")}>
              <Ionicons name="lock-closed" size={20} color={JADE} />
              <View className="ml-3 flex-1">
                <Text className="text-jade-300 font-bold">Upgrade to Schedule Posts</Text>
                <Text className="text-gray-400 text-xs mt-0.5">Basic $4.99: 1 post/month · Pro $10: Unlimited</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#4B5563" />
            </TouchableOpacity>
          )}

          {/* Select video */}
          <Text className="text-gray-300 font-bold mb-2">Select Video</Text>
          <TouchableOpacity className="bg-gray-800 rounded-xl p-4 mb-4 flex-row items-center border border-dashed border-gray-600">
            <Ionicons name="film" size={22} color="#6B7280" />
            <Text className="text-gray-500 ml-3">Choose from your projects or library</Text>
          </TouchableOpacity>

          {/* Caption */}
          <Text className="text-gray-300 font-bold mb-2">Caption</Text>
          <TextInput
            className="bg-gray-800 rounded-xl p-3 text-white text-sm mb-4"
            placeholder="Write your caption, hashtags..."
            placeholderTextColor="#6B7280"
            multiline
            numberOfLines={4}
            value={caption}
            onChangeText={setCaption}
            editable={limit.scheduledPosts > 0}
          />

          {/* Platform selection */}
          <Text className="text-gray-300 font-bold mb-2">Post To</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {PLATFORMS.map((p) => {
              const account = user.connectedAccounts.find((a) => a.platform === p.id);
              const isConnected = account?.connected;
              const isSelected = selectedPlatforms.includes(p.id);
              return (
                <TouchableOpacity
                  key={p.id}
                  className={`flex-row items-center px-3 py-2 rounded-xl border ${isSelected ? "border-jade-500 bg-jade-900/40" : "border-gray-600 bg-gray-800"} ${!isConnected ? "opacity-40" : ""}`}
                  onPress={() => {
                    if (!isConnected) { Alert.alert("Not Connected", `Connect your ${p.label} account first.`); return; }
                    if (limit.scheduledPosts === 0) { router.push("/account"); return; }
                    togglePlatform(p.id);
                  }}
                >
                  <Ionicons name={p.icon as any} size={16} color={isSelected ? JADE : "#9CA3AF"} />
                  <Text className={`ml-2 text-sm font-semibold ${isSelected ? "text-jade-400" : "text-gray-400"}`}>{p.label}</Text>
                  {!isConnected && <Ionicons name="lock-closed" size={12} color="#6B7280" style={{ marginLeft: 4 }} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Date & Time */}
          <Text className="text-gray-300 font-bold mb-2">Schedule Date</Text>
          <TextInput
            className="bg-gray-800 rounded-xl p-3 text-white mb-3"
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#6B7280"
            value={scheduleDate}
            onChangeText={setScheduleDate}
            editable={limit.scheduledPosts > 0}
          />
          <Text className="text-gray-300 font-bold mb-2">Schedule Time</Text>
          <TextInput
            className="bg-gray-800 rounded-xl p-3 text-white mb-6"
            placeholder="HH:MM (24hr)"
            placeholderTextColor="#6B7280"
            value={scheduleTime}
            onChangeText={setScheduleTime}
            editable={limit.scheduledPosts > 0}
          />

          {/* Schedule button */}
          <TouchableOpacity
            className={`py-4 rounded-xl items-center mb-4 ${limit.scheduledPosts === 0 ? "bg-gray-700" : "bg-jade-500"}`}
            onPress={schedulePost}
          >
            <View className="flex-row items-center">
              <Ionicons name="calendar" size={18} color="white" />
              <Text className="text-white font-bold ml-2 text-base">
                {limit.scheduledPosts === 0 ? "Upgrade to Schedule" : "Schedule Post"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Existing scheduled posts */}
          {scheduledPosts.length > 0 && (
            <>
              <Text className="text-gray-300 font-bold mb-3">Scheduled Posts</Text>
              {scheduledPosts.map((post) => (
                <View key={post.id} className="bg-gray-800 rounded-xl p-3 mb-2 flex-row items-center">
                  <Ionicons name="calendar" size={20} color={JADE} />
                  <View className="ml-3 flex-1">
                    <Text className="text-white text-sm font-semibold" numberOfLines={1}>{post.caption || "No caption"}</Text>
                    <Text className="text-gray-400 text-xs">{post.platforms.join(", ")} · {new Date(post.scheduledAt).toLocaleString()}</Text>
                  </View>
                  <View className={`px-2 py-0.5 rounded-full ${post.status === "pending" ? "bg-yellow-900/60" : "bg-jade-900/60"}`}>
                    <Text className={`text-xs font-semibold ${post.status === "pending" ? "text-yellow-400" : "text-jade-400"}`}>{post.status}</Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}
