import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../store/useStore";
import { TIER_LIMITS, TIER_PRICES, type SubscriptionTier } from "../types";
import { AppLogo } from "../components/Logo";

const JADE = "#00A86B";

const PLANS: Array<{
  tier: SubscriptionTier;
  color: string;
  highlight: boolean;
  features: string[];
}> = [
  {
    tier: "free",
    color: "#6B7280",
    highlight: false,
    features: [
      "3 minutes of recording per day",
      "Basic video editing tools",
      "2 starter skins included",
      "Music library access (royalty-free)",
      "Local video export",
    ],
  },
  {
    tier: "basic",
    color: JADE,
    highlight: true,
    features: [
      "50 minutes of recording per day",
      "Full video editing suite",
      "AI-powered editing & recommendations",
      "AI audio perfection",
      "AI music creation with your voice",
      "1 new cartoon skin per month",
      "1 scheduled social media post per month",
      "Post to YouTube, Instagram, X, Snapchat",
      "Live streaming",
    ],
  },
  {
    tier: "pro",
    color: "#7C3AED",
    highlight: false,
    features: [
      "UNLIMITED recording time",
      "Full video editing suite — all features",
      "All AI tools — editing, audio, music, captions",
      "AI thumbnail creator",
      "AI auto-caption generator",
      "1 new cartoon skin per month",
      "UNLIMITED scheduled social media posts",
      "Post to all platforms simultaneously",
      "Live streaming with AI enhancement",
      "Priority processing",
    ],
  },
];

export default function AccountScreen() {
  const { user, setTier } = useStore();
  const [processing, setProcessing] = useState(false);
  const limit = TIER_LIMITS[user.tier];

  const handleUpgrade = (tier: SubscriptionTier) => {
    if (tier === user.tier) return;
    if (tier === "free") {
      Alert.alert("Downgrade to Free?", "You'll lose access to premium features at the end of your billing period.", [
        { text: "Downgrade", style: "destructive", onPress: () => setTier("free") },
        { text: "Keep Plan", style: "cancel" },
      ]);
      return;
    }

    // In production: open Stripe/RevenueCat payment sheet
    Alert.alert(
      `Upgrade to ${tier === "basic" ? "Basic" : "Pro"}`,
      `${TIER_PRICES[tier]}/month\n\nThis will open the payment screen. In production, this connects to Stripe or Apple/Google Pay.`,
      [
        {
          text: "Subscribe",
          onPress: () => {
            setProcessing(true);
            setTimeout(() => {
              setTier(tier);
              setProcessing(false);
              Alert.alert("Welcome to " + tier.charAt(0).toUpperCase() + tier.slice(1) + "!", "Your plan has been upgraded. Enjoy all the new features!");
            }, 1500);
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-jade-50" showsVerticalScrollIndicator={false}>
      {/* Profile header */}
      <View className="bg-jade-600 px-5 py-8 items-center">
        <View className="w-20 h-20 rounded-full bg-jade-400 items-center justify-center mb-3 border-4 border-white">
          <Text className="text-white text-3xl font-bold">{user.name.charAt(0)}</Text>
        </View>
        <Text className="text-white text-xl font-bold">{user.name}</Text>
        <Text className="text-jade-100 text-sm">{user.email}</Text>
        <View className="mt-2 bg-white/20 px-4 py-1 rounded-full">
          <Text className="text-white font-semibold capitalize">{user.tier} Plan — {TIER_PRICES[user.tier]}</Text>
        </View>
      </View>

      {/* Current usage */}
      <View className="mx-4 -mt-5 bg-white rounded-2xl shadow-md p-4 mb-5">
        <Text className="font-bold text-gray-800 mb-3">Today's Usage</Text>
        <View className="flex-row justify-between mb-2">
          <View className="flex-1 bg-jade-50 rounded-xl p-3 mr-2 items-center">
            <Text className="text-jade-600 text-2xl font-bold">
              {Math.floor(user.recordingSecondsUsedToday / 60)}:{(user.recordingSecondsUsedToday % 60).toString().padStart(2, "0")}
            </Text>
            <Text className="text-gray-500 text-xs">Recorded Today</Text>
          </View>
          <View className="flex-1 bg-jade-50 rounded-xl p-3 items-center">
            <Text className="text-jade-600 text-2xl font-bold">
              {limit.dailyRecordingSeconds === Infinity ? "∞" : Math.floor(Math.max(0, limit.dailyRecordingSeconds - user.recordingSecondsUsedToday) / 60)}
              {limit.dailyRecordingSeconds !== Infinity && <Text className="text-base">m</Text>}
            </Text>
            <Text className="text-gray-500 text-xs">Remaining Today</Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-1 bg-jade-50 rounded-xl p-3 mr-2 items-center">
            <Text className="text-jade-600 text-2xl font-bold">{user.connectedAccounts.filter((a) => a.connected).length}</Text>
            <Text className="text-gray-500 text-xs">Accounts Connected</Text>
          </View>
          <View className="flex-1 bg-jade-50 rounded-xl p-3 items-center">
            <Text className="text-jade-600 text-2xl font-bold">{user.unlockedSkins.length}</Text>
            <Text className="text-gray-500 text-xs">Skins Unlocked</Text>
          </View>
        </View>
      </View>

      {/* Pricing plans */}
      <View className="px-4">
        <Text className="font-bold text-gray-800 text-xl mb-1 text-center">Choose Your Plan</Text>
        <Text className="text-gray-500 text-sm text-center mb-4">Cancel anytime · Secure payment via Stripe</Text>

        {PLANS.map((plan) => {
          const isCurrent = user.tier === plan.tier;
          return (
            <View
              key={plan.tier}
              className={`rounded-2xl mb-4 overflow-hidden shadow-md ${plan.highlight ? "border-2 border-jade-500" : "border border-gray-200"}`}
            >
              {plan.highlight && (
                <View className="bg-jade-500 py-1.5 items-center">
                  <Text className="text-white font-bold text-xs tracking-wider">MOST POPULAR</Text>
                </View>
              )}

              <View className="bg-white p-5">
                {/* Plan header */}
                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text className="text-gray-800 font-bold text-xl capitalize">{plan.tier}</Text>
                    <Text className="font-bold text-2xl" style={{ color: plan.color }}>
                      {TIER_PRICES[plan.tier]}
                    </Text>
                  </View>
                  {isCurrent && (
                    <View className="bg-jade-100 px-3 py-1.5 rounded-full flex-row items-center">
                      <Ionicons name="checkmark-circle" size={14} color={JADE} />
                      <Text className="text-jade-600 font-bold text-xs ml-1">Current Plan</Text>
                    </View>
                  )}
                </View>

                {/* Features list */}
                {plan.features.map((feature, i) => (
                  <View key={i} className="flex-row items-start mb-2">
                    <Ionicons name="checkmark-circle" size={16} color={plan.color} style={{ marginTop: 2 }} />
                    <Text className="text-gray-700 text-sm ml-2 flex-1">{feature}</Text>
                  </View>
                ))}

                {/* CTA button */}
                <TouchableOpacity
                  className={`mt-4 py-3.5 rounded-xl items-center ${isCurrent ? "bg-gray-100" : ""}`}
                  style={isCurrent ? {} : { backgroundColor: plan.color }}
                  onPress={() => handleUpgrade(plan.tier)}
                  disabled={isCurrent || processing}
                >
                  <Text
                    className={`font-bold text-base ${isCurrent ? "text-gray-400" : "text-white"}`}
                  >
                    {isCurrent ? "Current Plan" : plan.tier === "free" ? "Downgrade to Free" : `Upgrade — ${TIER_PRICES[plan.tier]}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      {/* Legal / billing info */}
      <View className="px-4 mb-4">
        <View className="bg-white rounded-2xl p-4 border border-gray-100">
          <Text className="font-bold text-gray-800 mb-2">Billing & Cancellation</Text>
          {[
            "Billed monthly · Cancel anytime in Account Settings",
            "Payment processed securely via Stripe",
            "Apple Pay & Google Pay supported",
            "Unused recording time does not roll over",
            "1 new skin per month is selected from the monthly drop",
          ].map((item, i) => (
            <View key={i} className="flex-row items-start mb-1.5">
              <Ionicons name="information-circle" size={14} color="#9CA3AF" style={{ marginTop: 2 }} />
              <Text className="text-gray-500 text-xs ml-2 flex-1">{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Logo at bottom */}
      <View className="items-center py-6">
        <AppLogo size={50} showText={true} />
        <Text className="text-gray-400 text-xs mt-2">© 2025 Crystal Lynn Creates · CLC Premiere Studios</Text>
      </View>
    </ScrollView>
  );
}
