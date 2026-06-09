import React from "react";
import { View, Text, Image } from "react-native";
import Svg, { G, Path, Ellipse, Line, Circle, Defs, RadialGradient, Stop } from "react-native-svg";

interface LogoProps {
  size?: number;
  showText?: boolean;
}

// SVG recreation of the Crystal Lynn Creates logo
export function CLCLogo({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id="bg" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#ffffff" />
          <Stop offset="100%" stopColor="#f8fdf9" />
        </RadialGradient>
      </Defs>

      {/* Outer diamond frame */}
      <Path d="M100 8 L192 100 L100 192 L8 100 Z" fill="none" stroke="#c8d8c0" strokeWidth="1" />
      {/* Inner diamond frame */}
      <Path d="M100 18 L182 100 L100 182 L18 100 Z" fill="url(#bg)" stroke="#b5c8ab" strokeWidth="0.5" />

      {/* Jade accent ribbon/banner across middle */}
      <Path d="M30 95 Q100 88 170 95 Q100 112 30 105 Z" fill="#00A86B" opacity="0.85" />
      <Text x="100" y="107" textAnchor="middle" fontSize="9" fill="white" fontFamily="Georgia,serif" letterSpacing="2">Crystal Lynn</Text>

      {/* Large C letter */}
      <Text x="72" y="108" textAnchor="middle" fontSize="62" fill="#2d3d2d" fontFamily="Georgia,serif" fontStyle="italic" opacity="0.9">C</Text>
      {/* Large L letter */}
      <Text x="122" y="108" textAnchor="middle" fontSize="62" fill="#2d3d2d" fontFamily="Georgia,serif" fontStyle="italic" opacity="0.9">L</Text>

      {/* "creates" text below ribbon */}
      <Text x="100" y="130" textAnchor="middle" fontSize="8" fill="#4a5a4a" fontFamily="Georgia,serif" letterSpacing="3">creates</Text>

      {/* Cherry blossom flowers – top */}
      {[0,72,144,216,288].map((deg, i) => {
        const r = 22;
        const cx = 100 + r * Math.cos((deg * Math.PI) / 180);
        const cy = 25 + r * Math.sin((deg * Math.PI) / 180) * 0.6;
        return <Ellipse key={`tf-${i}`} cx={cx} cy={cy} rx="4" ry="2.5" fill="#FFC2D1" opacity="0.8" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <Circle cx="100" cy="25" r="3" fill="#FFD6E0" />

      {/* Cherry blossom flowers – bottom */}
      {[0,72,144,216,288].map((deg, i) => {
        const r = 22;
        const cx = 100 + r * Math.cos((deg * Math.PI) / 180);
        const cy = 175 + r * Math.sin((deg * Math.PI) / 180) * 0.6;
        return <Ellipse key={`bf-${i}`} cx={cx} cy={cy} rx="4" ry="2.5" fill="#FFC2D1" opacity="0.8" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <Circle cx="100" cy="175" r="3" fill="#FFD6E0" />

      {/* Side leaf accents */}
      <Path d="M14 96 Q24 88 18 80 Q8 90 14 96Z" fill="#86EFAC" opacity="0.7" />
      <Path d="M14 104 Q24 112 18 120 Q8 110 14 104Z" fill="#86EFAC" opacity="0.7" />
      <Path d="M186 96 Q176 88 182 80 Q192 90 186 96Z" fill="#86EFAC" opacity="0.7" />
      <Path d="M186 104 Q176 112 182 120 Q192 110 186 104Z" fill="#86EFAC" opacity="0.7" />
    </Svg>
  );
}

export function AppLogo({ size = 80, showText = true }: LogoProps) {
  return (
    <View className="items-center">
      <CLCLogo size={size} />
      {showText && (
        <View className="items-center mt-1">
          <Text className="text-jade-600 font-bold text-base tracking-widest">CLC</Text>
          <Text className="text-jade-500 text-xs tracking-wider">PREMIERE STUDIOS</Text>
        </View>
      )}
    </View>
  );
}
