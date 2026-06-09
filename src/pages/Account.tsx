import { useState } from "react";
import { Check, Infinity } from "lucide-react";
import { useStore } from "../store/useStore";
import { TIER_LIMITS, TIER_PRICES, type SubscriptionTier } from "../types";
import CLCLogo from "../components/Logo";

const PLANS = [
  { tier:"free"  as SubscriptionTier, color:"#6B7280", highlight:false, features:["3 min recording/day","Basic video editing","2 starter skins","Royalty-free music library","Local video export"] },
  { tier:"basic" as SubscriptionTier, color:"#00A86B", highlight:true,  features:["50 min recording/day","Full video editor","AI-powered editing & recommendations","AI audio perfection","AI music creator with your voice","1 new cartoon skin/month","1 scheduled social post/month","YouTube, Instagram, X, Snapchat posting","Live streaming"] },
  { tier:"pro"   as SubscriptionTier, color:"#7C3AED", highlight:false, features:["UNLIMITED recording","Full editor — all features","All AI tools","AI thumbnail & caption creator","1 new cartoon skin/month","UNLIMITED scheduled posts","Post to all platforms","Live streaming with AI enhancement","Priority processing"] },
];

export default function AccountPage() {
  const { user, setTier } = useStore();
  const [processing, setProcessing] = useState(false);
  const limit = TIER_LIMITS[user.tier];
  const used = user.recordingSecondsUsedToday;

  const upgrade = (tier: SubscriptionTier) => {
    if (tier===user.tier) return;
    if (tier==="free") { if (confirm("Downgrade to Free? You'll lose premium features.")) setTier("free"); return; }
    if (confirm(`Upgrade to ${tier} — ${TIER_PRICES[tier]}/month?\n\n(In production this opens a Stripe payment sheet)`)) {
      setProcessing(true);
      setTimeout(()=>{ setTier(tier); setProcessing(false); alert(`Welcome to ${tier.charAt(0).toUpperCase()+tier.slice(1)}! Enjoy your new features.`); },1200);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pb-8">
      {/* Profile */}
      <div className="bg-jade-600 rounded-2xl p-6 flex flex-col items-center mb-6 shadow-lg">
        <div className="w-20 h-20 rounded-full bg-jade-400 flex items-center justify-center text-white text-3xl font-bold border-4 border-white mb-3">{user.name.charAt(0)}</div>
        <p className="text-white text-xl font-bold">{user.name}</p>
        <p className="text-jade-100 text-sm">{user.email}</p>
        <span className="mt-2 bg-white/20 text-white font-semibold px-4 py-1 rounded-full capitalize">{user.tier} Plan — {TIER_PRICES[user.tier]}</span>
      </div>

      {/* Usage stats */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <p className="font-bold text-gray-800 mb-3">Today's Usage</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label:"Recorded Today", value:`${Math.floor(used/60)}:${String(used%60).padStart(2,"0")}` },
            { label:"Remaining", value: limit.dailyRecordingSeconds===Infinity ? "∞" : `${Math.floor(Math.max(0,limit.dailyRecordingSeconds-used)/60)}m` },
            { label:"Accounts Connected", value: user.connectedAccounts.filter((a)=>a.connected).length },
            { label:"Skins Unlocked", value: user.unlockedSkins.length },
          ].map((stat)=>(
            <div key={stat.label} className="bg-jade-50 rounded-xl p-3 text-center">
              <p className="text-jade-600 text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-500 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <p className="font-bold text-gray-800 text-xl text-center mb-1">Choose Your Plan</p>
      <p className="text-gray-500 text-sm text-center mb-4">Cancel anytime · Secure payment via Stripe</p>

      <div className="space-y-4">
        {PLANS.map((plan)=>{
          const isCurrent = user.tier===plan.tier;
          return (
            <div key={plan.tier} className={`bg-white rounded-2xl shadow overflow-hidden ${plan.highlight?"border-2 border-jade-500":""}`}>
              {plan.highlight&&<div className="bg-jade-500 py-1.5 text-center text-white text-xs font-bold tracking-wider">MOST POPULAR</div>}
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-gray-800 text-xl capitalize">{plan.tier}</p>
                    <p className="font-bold text-2xl" style={{color:plan.color}}>{TIER_PRICES[plan.tier]}</p>
                  </div>
                  {isCurrent&&<span className="bg-jade-100 text-jade-600 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"><Check size={12}/>Current</span>}
                </div>
                {plan.features.map((f,i)=>(
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <Check size={15} style={{color:plan.color, marginTop:2, flexShrink:0}}/>
                    <span className="text-gray-700 text-sm">{f}</span>
                  </div>
                ))}
                <button onClick={()=>upgrade(plan.tier)} disabled={isCurrent||processing}
                  className={`w-full mt-4 py-3.5 rounded-xl font-bold text-base transition-colors ${isCurrent?"bg-gray-100 text-gray-400 cursor-default":""}`}
                  style={isCurrent?{}:{backgroundColor:plan.color, color:"white"}}>
                  {isCurrent?"Current Plan":plan.tier==="free"?"Downgrade to Free":`Upgrade — ${TIER_PRICES[plan.tier]}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legal */}
      <div className="bg-white rounded-2xl p-4 mt-4 shadow">
        <p className="font-bold text-gray-800 mb-2">Billing Info</p>
        {["Billed monthly · Cancel anytime","Secure payments via Stripe","Apple Pay & Google Pay supported","Unused recording time does not roll over","1 new skin per month from the monthly drop"].map((item,i)=>(
          <p key={i} className="text-gray-500 text-xs mb-1.5 flex gap-2"><span className="text-jade-400">•</span>{item}</p>
        ))}
      </div>

      <div className="flex flex-col items-center mt-6">
        <CLCLogo size={50} showText={true}/>
        <p className="text-gray-400 text-xs mt-2">© 2025 Crystal Lynn Creates · CLC Premiere Studios</p>
      </div>
    </div>
  );
}
