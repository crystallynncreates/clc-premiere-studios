import { useState } from "react";
import { Check } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS, TIER_PRICES, TIER_PRICES_ANNUAL, type SubscriptionTier } from "../types";
import CLCLogo from "../components/Logo";

const PLANS = [
  {
    tier: "free" as SubscriptionTier,
    color: "#6B7280",
    glow: "transparent",
    highlight: false,
    features: [
      "3 min recording/day",
      "Basic video editing",
      "Upload & export video (free)",
      "2 starter skins",
      "Royalty-free music library",
      "Local video export",
    ],
  },
  {
    tier: "basic" as SubscriptionTier,
    color: "#00D485",
    glow: "rgba(0,212,133,0.12)",
    highlight: true,
    features: [
      "50 min recording/day",
      "Full video editor",
      "Go Live on all platforms",
      "Add clips via YouTube/social URL",
      "5 scheduled social posts/month",
      "YouTube, Instagram, X, Snapchat posting",
      "1 new cartoon skin/month",
      "Premium stickers & overlays",
    ],
  },
  {
    tier: "pro" as SubscriptionTier,
    color: "#7C5CF6",
    glow: "rgba(124,92,246,0.12)",
    highlight: false,
    features: [
      "UNLIMITED recording",
      "Full editor — all features",
      "🤖 AI-Powered Studio (Pro exclusive)",
      "AI voice blend with top artists",
      "AI music creator with your voice",
      "AI thumbnail & caption creator",
      "UNLIMITED scheduled posts",
      "Per-platform scheduling (different times)",
      "Go Live with AI enhancement",
      "1 new cartoon skin/month",
      "Priority processing",
    ],
  },
];

const CARD = {
  background: "#13131E",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "1rem",
};

export default function AccountPage() {
  const { user, setTier } = useStore();
  const [processing, setProcessing] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const limit = TIER_LIMITS[user.tier];
  const used  = user.recordingSecondsUsedToday;

  const getDisplayPrice = (tier: SubscriptionTier) => {
    if (tier === "free") return "Free";
    return billing === "annual" ? TIER_PRICES_ANNUAL[tier] : TIER_PRICES[tier];
  };

  const upgrade = (tier: SubscriptionTier) => {
    if (tier === user.tier) return;
    if (tier === "free") {
      if (confirm("Downgrade to Free? You'll lose premium features.")) setTier("free");
      return;
    }
    const price = getDisplayPrice(tier);
    const billingNote = billing === "annual" ? " (billed annually)" : " billed monthly";
    if (confirm(`Upgrade to ${tier} — ${price}${billingNote}?\n\n(In production this opens a Stripe payment sheet)`)) {
      setProcessing(true);
      setTimeout(() => {
        setTier(tier);
        setProcessing(false);
        alert(`Welcome to ${tier.charAt(0).toUpperCase() + tier.slice(1)}! Enjoy your new features.`);
      }, 1200);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pb-8 space-y-5">
      {/* Profile Hero */}
      <div
        className="rounded-2xl p-6 flex flex-col items-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #13131E 0%, #1C1C2C 100%)",
          border: "1px solid rgba(0,212,133,0.18)",
          boxShadow: "0 0 40px rgba(0,212,133,0.06)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,133,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold border-2 mb-3 relative"
          style={{
            background: "linear-gradient(135deg, #00D485, #00A86B)",
            boxShadow: "0 0 24px rgba(0,212,133,0.4)",
            borderColor: "rgba(0,212,133,0.4)",
          }}
        >
          {user.name.charAt(0)}
        </div>
        <p className="text-white text-xl font-bold">{user.name}</p>
        <p className="text-white/40 text-sm">{user.email}</p>
        <span
          className="mt-3 font-semibold px-4 py-1.5 rounded-full text-sm capitalize"
          style={{
            background: user.tier === "pro" ? "rgba(124,92,246,0.2)" : user.tier === "basic" ? "rgba(0,212,133,0.15)" : "rgba(107,114,128,0.15)",
            color: user.tier === "pro" ? "#7C5CF6" : user.tier === "basic" ? "#00D485" : "#9CA3AF",
            border: `1px solid ${user.tier === "pro" ? "#7C5CF620" : user.tier === "basic" ? "#00D48520" : "#6B728020"}`,
          }}
        >
          {user.tier} Plan — {TIER_PRICES[user.tier]}
        </span>
      </div>

      {/* Usage Stats */}
      <div style={CARD} className="p-5">
        <p className="text-white/70 font-bold text-sm mb-3">Today's Usage</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Recorded Today",       value: `${Math.floor(used/60)}:${String(used%60).padStart(2,"0")}` },
            { label: "Remaining",            value: limit.dailyRecordingSeconds===Infinity ? "∞" : `${Math.floor(Math.max(0,limit.dailyRecordingSeconds-used)/60)}m` },
            { label: "Accounts Connected",   value: user.connectedAccounts.filter((a)=>a.connected).length },
            { label: "Skins Unlocked",       value: user.unlockedSkins.length },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3 rounded-xl text-center"
              style={{ background: "rgba(0,212,133,0.06)", border: "1px solid rgba(0,212,133,0.1)" }}
            >
              <p className="text-2xl font-bold" style={{ color: "#00D485" }}>{stat.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div>
        <p className="text-white font-bold text-xl text-center mb-1">Choose Your Plan</p>
        <p className="text-white/40 text-sm text-center mb-4">Cancel anytime · Secure payment via Stripe</p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-1 mb-5">
          {(["monthly", "annual"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className="px-5 py-2 rounded-xl font-bold text-sm transition-all"
              style={billing === b
                ? { background: "linear-gradient(135deg, #7C5CF6, #9D6FF7)", color: "white" }
                : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }
              }
            >
              {b === "monthly" ? "Monthly" : "Annual"}
              {b === "annual" && (
                <span className="ml-1.5 text-xs opacity-70">(Pro: $120/yr)</span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {PLANS.map((plan) => {
            const isCurrent = user.tier === plan.tier;
            const displayPrice = getDisplayPrice(plan.tier);
            return (
              <div
                key={plan.tier}
                className="rounded-2xl overflow-hidden transition-all"
                style={{
                  background: "#13131E",
                  border: plan.highlight
                    ? `1px solid ${plan.color}40`
                    : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: plan.highlight ? `0 0 30px ${plan.glow}` : "none",
                }}
              >
                {plan.highlight && (
                  <div
                    className="py-1.5 text-center text-xs font-bold tracking-widest"
                    style={{ background: `linear-gradient(90deg, ${plan.color}, ${plan.color}CC)`, color: "white" }}
                  >
                    ★ MOST POPULAR
                  </div>
                )}
                {plan.tier === "pro" && (
                  <div
                    className="py-1.5 text-center text-xs font-bold tracking-widest"
                    style={{ background: "linear-gradient(90deg, #7C5CF6, #9D6FF7)", color: "white" }}
                  >
                    🤖 AI STUDIO INCLUDED
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-white font-bold text-xl capitalize">{plan.tier}</p>
                      <p className="text-2xl font-bold mt-0.5" style={{ color: plan.color }}>
                        {displayPrice}
                      </p>
                      {plan.tier !== "free" && billing === "annual" && (
                        <p className="text-white/30 text-xs mt-0.5">billed annually</p>
                      )}
                      {plan.tier !== "free" && billing === "monthly" && (
                        <p className="text-white/30 text-xs mt-0.5">billed monthly</p>
                      )}
                    </div>
                    {isCurrent && (
                      <span
                        className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"
                        style={{ background: plan.color + "18", color: plan.color }}
                      >
                        <Check size={12} /> Current
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check size={14} style={{ color: plan.color, marginTop: 2, flexShrink: 0 }} />
                        <span className="text-white/65 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => upgrade(plan.tier)}
                    disabled={isCurrent || processing}
                    className="w-full py-3.5 rounded-xl font-bold text-base transition-all hover:opacity-90"
                    style={isCurrent
                      ? { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)" }
                      : { background: `linear-gradient(135deg, ${plan.color}, ${plan.color}CC)`, color: "white" }
                    }
                  >
                    {isCurrent
                      ? "Current Plan"
                      : plan.tier === "free"
                      ? "Downgrade to Free"
                      : `Upgrade — ${displayPrice}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing Info */}
      <div style={CARD} className="p-4">
        <p className="text-white/70 font-bold text-sm mb-3">Billing Info</p>
        {[
          "Monthly or annual billing · Cancel anytime",
          "Secure payments via Stripe",
          "Apple Pay & Google Pay supported",
          "Pro annual: $120/yr · Basic annual: $47.99/yr",
          "Unused recording time does not roll over",
          "1 new skin per month from the monthly drop",
          "At least one social account must be connected to post",
        ].map((item, i) => (
          <p key={i} className="text-white/35 text-xs mb-1.5 flex gap-2">
            <span style={{ color: "#00D485" }}>·</span>
            {item}
          </p>
        ))}
      </div>

      {/* Footer logo */}
      <div className="flex flex-col items-center pt-2">
        <CLCLogo size={50} showText={true} />
        <p className="text-white/20 text-xs mt-3">© 2025 Crystal Lynn Creates · CLC Premier Studios</p>
      </div>
    </div>
  );
}
