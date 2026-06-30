import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  TextInput,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import navigationOptions from "./SpeechSummary.navigationOptions";

const { width } = Dimensions.get("window");

// ─── Vibrant Colour Palette ──────────────────────────────────────────────────
const C = {
  bg:       "#0D0A1E",
  surface:  "#13102A",
  card:     "#181430",
  purple:   "#8B5CF6", purpleD: "rgba(139,92,246,0.20)",
  pink:     "#EC4899", pinkD:   "rgba(236,72,153,0.20)",
  cyan:     "#06B6D4", cyanD:   "rgba(6,182,212,0.20)",
  orange:   "#F97316", orangeD: "rgba(249,115,22,0.20)",
  lime:     "#84CC16", limeD:   "rgba(132,204,22,0.20)",
  yellow:   "#EAB308", yellowD: "rgba(234,179,8,0.20)",
  rose:     "#F43F5E", roseD:   "rgba(244,63,94,0.20)",
  teal:     "#14B8A6", tealD:   "rgba(20,184,166,0.20)",
  indigo:   "#6366F1", indigoD: "rgba(99,102,241,0.20)",
  emerald:  "#10B981", emeraldD:"rgba(16,185,129,0.20)",
  text:     "#FFFFFF",
  textSoft: "#E2D9FF",
  muted:    "#8B82B0",
  dim:      "#2E2952",
  border:   "#271E50",
  line:     "#1E1840",
};

// ─── Data ────────────────────────────────────────────────────────────────────
const sleepData = [
  { day: "M", hours: 7.2, quality: "Good"  },
  { day: "T", hours: 5.8, quality: "Poor"  },
  { day: "W", hours: 8.1, quality: "Great" },
  { day: "T", hours: 6.4, quality: "Fair"  },
  { day: "F", hours: 7.8, quality: "Good"  },
  { day: "S", hours: 9.0, quality: "Great" },
  { day: "S", hours: 6.9, quality: "Good"  },
];

const activityWeek = [
  { day: "M", pct: 82, done: true  },
  { day: "T", pct: 45, done: false },
  { day: "W", pct: 91, done: true  },
  { day: "T", pct: 60, done: true  },
  { day: "F", pct: 30, done: false },
  { day: "S", pct: 75, done: true  },
  { day: "S", pct: 20, done: false },
];

const manualLogs = [
  { id: 1, category: "Diet",       icon: "food-apple", color: C.lime,   entry: "Salad + Protein bowl",     time: "12:34 PM", cal: "480 kcal"  },
  { id: 2, category: "Supplement", icon: "pill",        color: C.cyan,   entry: "Vitamin D · Omega 3",      time: "8:00 AM",  cal: ""          },
  { id: 3, category: "Exercise",   icon: "dumbbell",    color: C.orange, entry: "20 min yoga + stretching", time: "7:15 AM",  cal: "−120 kcal" },
];

const balancePillars = [
  { label: "Sleep",     icon: "moon-outline", iconLib: "ion", value: 74, color: C.purple,  bg: C.purpleD  },
  { label: "Movement",  icon: "run",           iconLib: "mci", value: 38, color: C.rose,    bg: C.roseD    },
  { label: "Nutrition", icon: "nutrition",     iconLib: "ion", value: 66, color: C.lime,    bg: C.limeD    },
  { label: "Hydration", icon: "water-outline", iconLib: "ion", value: 50, color: C.cyan,    bg: C.cyanD    },
  { label: "Recovery",  icon: "heart-pulse",   iconLib: "mci", value: 81, color: C.teal,    bg: C.tealD    },
];

const avgFn = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
const sleepAvg        = avgFn(sleepData.map(d => d.hours)).toFixed(1);
const consistencyScore= Math.round(avgFn(activityWeek.map(d => d.pct)));
const balanceScore    = Math.round(avgFn(balancePillars.map(p => p.value)));

// ─── Gradient Strip (two-colour overlay trick – no extra lib) ────────────────
const GradientStrip = ({ colors, style, children }: {
  colors: [string, string]; style?: any; children?: React.ReactNode;
}) => (
  <View style={[{ overflow: "hidden" }, style]}>
    <View style={[StyleSheet.absoluteFill, { backgroundColor: colors[0] }]} />
    <View style={[StyleSheet.absoluteFill, { backgroundColor: colors[1], opacity: 0.55 }]} />
    {children}
  </View>
);

// ─── Dot-segment Score Ring ───────────────────────────────────────────────────
const ScoreRing = ({ value, color, bgColor, size = 68, label }: {
  value: number; color: string; bgColor: string; size?: number; label: string;
}) => {
  const segments = 20;
  const filled   = Math.round((value / 100) * segments);
  const r        = (size - 10) / 2;
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor, position: "relative", alignItems: "center", justifyContent: "center" }}>
        {Array.from({ length: segments }).map((_, i) => {
          const rad = ((i / segments) * 360 - 90) * (Math.PI / 180);
          const cx  = size / 2 + r * Math.cos(rad);
          const cy  = size / 2 + r * Math.sin(rad);
          return (
            <View key={i} style={{
              position: "absolute", left: cx - 2.5, top: cy - 2.5,
              width: 5, height: 5, borderRadius: 3,
              backgroundColor: i < filled ? color : "rgba(255,255,255,0.08)",
            }} />
          );
        })}
        <Text style={{ color: "#fff", fontSize: 14, fontWeight: "900" }}>{value}</Text>
      </View>
      <Text style={{ color: C.muted, fontSize: 9, marginTop: 5, textAlign: "center" }}>{label}</Text>
    </View>
  );
};

// ─── Sleep Bars ───────────────────────────────────────────────────────────────
const SleepBars = ({ onPress }: { onPress: (d: typeof sleepData[0]) => void }) => {
  const qualityColor: Record<string, string> = { Great: C.teal, Good: C.cyan, Fair: C.yellow, Poor: C.rose };
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6, marginTop: 10 }}>
      {sleepData.map((d, i) => {
        const h      = (d.hours / 10) * 80;
        const color  = qualityColor[d.quality];
        const isLast = i === sleepData.length - 1;
        return (
          <TouchableOpacity key={i} onPress={() => onPress(d)} style={{ alignItems: "center", gap: 4, flex: 1 }}>
            <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 8 }}>{d.hours}h</Text>
            <View style={{
              width: "100%", height: h, borderRadius: 8,
              backgroundColor: color, opacity: isLast ? 1 : 0.6,
              borderWidth: isLast ? 2 : 0, borderColor: "#fff",
            }}>
              {isLast && <View style={{ position: "absolute", top: -4, alignSelf: "center", width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff" }} />}
            </View>
            <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>{d.day}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ─── Activity Dots ────────────────────────────────────────────────────────────
const ActivityDots = () => (
  <View style={{ flexDirection: "row", gap: 6, marginTop: 10 }}>
    {activityWeek.map((d, i) => {
      const color = d.pct >= 80 ? C.lime : d.pct >= 55 ? C.yellow : C.rose;
      return (
        <View key={i} style={{ alignItems: "center", gap: 5, flex: 1 }}>
          <View style={{
            width: 36, height: 36, borderRadius: 10,
            backgroundColor: d.done ? color + "30" : "rgba(255,255,255,0.05)",
            borderWidth: 2, borderColor: d.done ? color : "rgba(255,255,255,0.1)",
            alignItems: "center", justifyContent: "center",
          }}>
            <Icon name={d.done ? "check-bold" : "close"} size={14} color={d.done ? color : "rgba(255,255,255,0.2)"} />
          </View>
          <Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 9 }}>{d.day}</Text>
        </View>
      );
    })}
  </View>
);

// ─── Balance Pillar Row ───────────────────────────────────────────────────────
const PillarRow = ({ item, onPress }: { item: typeof balancePillars[0]; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 11, borderRadius: 12, backgroundColor: item.bg, borderWidth: 1, borderColor: item.color + "55", marginBottom: 8 }}
  >
    <View style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: item.color + "30", alignItems: "center", justifyContent: "center" }}>
      {item.iconLib === "ion"
        ? <Ionicons name={item.icon} size={16} color={item.color} />
        : <Icon     name={item.icon} size={16} color={item.color} />}
    </View>
    <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700", width: 70 }}>{item.label}</Text>
    <View style={{ flex: 1, height: 7, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
      <View style={{ width: `${item.value}%`, height: 7, borderRadius: 4, backgroundColor: item.color }} />
    </View>
    <Text style={{ color: item.color, fontSize: 12, fontWeight: "900", width: 34, textAlign: "right" }}>{item.value}%</Text>
    <Icon name="chevron-right" size={14} color={item.color + "AA"} />
  </TouchableOpacity>
);

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────
const LifestyleActivityTracker =()=> {
  const aiSheetRef     = useRef<any>(null);
  const sleepSheetRef  = useRef<any>(null);
  const logSheetRef    = useRef<any>(null);
  const pillarSheetRef = useRef<any>(null);
  const stepsSheetRef  = useRef<any>(null);

  const [selectedSleep,  setSelectedSleep]  = useState(sleepData[6]);
  const [selectedPillar, setSelectedPillar] = useState(balancePillars[0]);
  const [logTab, setLogTab] = useState<"diet"|"supplement"|"exercise">("diet");
  const [logInput, setLogInput] = useState("");

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* ── HEADER ── */}
      {/* <View style={s.header}>
        <TouchableOpacity style={s.headerBtn}>
          <Ionicons name="chevron-back" size={22} color={C.text} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={s.headerTitle}>Lifestyle & Activity</Text>
          <Text style={s.headerSub}>Monday · March 3, 2026</Text>
        </View>
        <TouchableOpacity
          style={[s.headerBtn, { backgroundColor: C.purpleD, borderColor: C.purple + "66" }]}
          onPress={() => logSheetRef.current?.open()}
        >
          <Feather name="plus" size={18} color={C.purple} />
        </TouchableOpacity>
        <TouchableOpacity style={[s.headerBtn, { marginLeft: 8 }]}>
          <Feather name="bell" size={17} color={C.muted} />
        </TouchableOpacity>
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130,paddingTop:60 }}>

        {/* ── AI BANNER ── */}
        <TouchableOpacity onPress={() => aiSheetRef.current?.open()} activeOpacity={0.88} style={{ marginHorizontal: 18, marginTop: 16, marginBottom: 14 }}>
          <GradientStrip colors={["#F43F5E", "#F97316"]} style={{ borderRadius: 18 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 16 }}>
              <View style={{ width: 44, height: 44, borderRadius: 13, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
                <Icon name="robot-outline" size={22} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 9, fontWeight: "800", letterSpacing: 1.8, marginBottom: 4 }}>🤖  AI SUGGESTION</Text>
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600", lineHeight: 19 }}>
                  You walked only <Text style={{ fontWeight: "900", fontSize: 16 }}>37 steps</Text> today. Consider a short walk!
                </Text>
              </View>
              <View style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: "rgba(255,255,255,0.22)", alignItems: "center", justifyContent: "center" }}>
                <Feather name="chevron-right" size={16} color="#fff" />
              </View>
            </View>
          </GradientStrip>
        </TouchableOpacity>

        {/* ── SCORE RINGS ROW ── */}
        <View style={s.scoreRow}>
          <ScoreRing value={consistencyScore} color={C.lime}   bgColor={C.limeD}   label={"Consis-\ntency"} />
          <View style={s.scoreDivider} />
          <ScoreRing value={balanceScore}     color={C.teal}   bgColor={C.tealD}   label={"Balance"} />
          <View style={s.scoreDivider} />
          <ScoreRing value={74}               color={C.purple} bgColor={C.purpleD} label={"Sleep\nScore"} />
          <View style={s.scoreDivider} />
          <ScoreRing value={38}               color={C.orange} bgColor={C.orangeD} label={"Activity"} />
        </View>

        {/* ── STEPS CARD (orange → pink gradient) ── */}
        <TouchableOpacity onPress={() => stepsSheetRef.current?.open()} activeOpacity={0.88} style={{ marginHorizontal: 18, marginBottom: 14 }}>
          <GradientStrip colors={["#F97316", "#EC4899"]} style={{ borderRadius: 20 }}>
            <View style={{ padding: 20 }}>
              {/* Header row */}
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: "rgba(255,255,255,0.22)", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="shoe-print" size={22} color="#fff" />
                </View>
                <View>
                  <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: "800", letterSpacing: 0.5 }}>STEPS TODAY</Text>
                  <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Goal: 10,000</Text>
                </View>
                <View style={{ marginLeft: "auto", flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.22)", borderRadius: 9, paddingHorizontal: 10, paddingVertical: 5 }}>
                  <Icon name="alert-circle" size={12} color="#fff" />
                  <Text style={{ color: "#fff", fontSize: 11, fontWeight: "800" }}>Very Low</Text>
                </View>
              </View>
              {/* Big number */}
              <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8 }}>
                <Text style={{ color: "#fff", fontSize: 60, fontWeight: "900", lineHeight: 62 }}>37</Text>
                <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 20, marginBottom: 8 }}>steps</Text>
              </View>
              {/* Bar */}
              <View style={{ height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.2)", marginTop: 14, overflow: "hidden" }}>
                <View style={{ width: "0.4%", height: 8, borderRadius: 4, backgroundColor: "#fff" }} />
              </View>
              <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, marginTop: 6 }}>0.4% of daily goal  ·  9,963 steps remaining</Text>
            </View>
          </GradientStrip>
        </TouchableOpacity>

        {/* ── SLEEP CARD (purple → cyan) ── */}
        <View style={s.colorCard}>
          <GradientStrip colors={["#8B5CF6", "#06B6D4"]} style={{ borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 16 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="moon" size={20} color="#fff" />
              </View>
              <View>
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800" }}>Sleep Tracker</Text>
                <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>7-day overview · tap a bar for details</Text>
              </View>
              <View style={{ marginLeft: "auto", backgroundColor: "rgba(255,255,255,0.22)", borderRadius: 9, paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={{ color: "#fff", fontSize: 13, fontWeight: "900" }}>{sleepAvg}h avg</Text>
              </View>
            </View>
          </GradientStrip>
          <View style={{ padding: 16 }}>
            <SleepBars onPress={d => { setSelectedSleep(d); sleepSheetRef.current?.open(); }} />
            <View style={{ flexDirection: "row", gap: 14, marginTop: 14, flexWrap: "wrap" }}>
              {[{l:"Great",c:C.teal},{l:"Good",c:C.cyan},{l:"Fair",c:C.yellow},{l:"Poor",c:C.rose}].map(x=>(
                <View key={x.l} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: x.c }} />
                  <Text style={{ color: C.muted, fontSize: 11 }}>{x.l}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── ACTIVITY CONSISTENCY CARD (emerald → lime) ── */}
        <View style={s.colorCard}>
          <GradientStrip colors={["#10B981", "#84CC16"]} style={{ borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 16 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
                <Icon name="run-fast" size={20} color="#fff" />
              </View>
              <View>
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800" }}>Activity Consistency</Text>
                <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>This week's progress</Text>
              </View>
              <View style={{ marginLeft: "auto", backgroundColor: "rgba(255,255,255,0.22)", borderRadius: 9, paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={{ color: "#fff", fontSize: 13, fontWeight: "900" }}>{consistencyScore}%</Text>
              </View>
            </View>
          </GradientStrip>
          <View style={{ padding: 16 }}>
            <ActivityDots />
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 14, gap: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: C.yellowD, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: C.yellow + "55" }}>
                <Icon name="fire" size={15} color={C.yellow} />
                <Text style={{ color: C.yellow, fontSize: 13, fontWeight: "700" }}>3-day streak 🔥</Text>
              </View>
              <Text style={{ color: C.muted, fontSize: 12 }}>Best: 9 days</Text>
            </View>
          </View>
        </View>

        {/* ── BALANCE METER CARD (cyan → indigo) ── */}
        <View style={s.colorCard}>
          <GradientStrip colors={["#06B6D4", "#6366F1"]} style={{ borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 16 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
                <Icon name="scale-balance" size={20} color="#fff" />
              </View>
              <View>
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800" }}>Lifestyle Balance Meter</Text>
                <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>5 pillars of well-being</Text>
              </View>
              <View style={{ marginLeft: "auto", backgroundColor: "rgba(255,255,255,0.22)", borderRadius: 9, paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={{ color: "#fff", fontSize: 13, fontWeight: "900" }}>{balanceScore}/100</Text>
              </View>
            </View>
          </GradientStrip>
          <View style={{ padding: 16 }}>
            {balancePillars.map((p, i) => (
              <PillarRow key={i} item={p} onPress={() => { setSelectedPillar(p); pillarSheetRef.current?.open(); }} />
            ))}
          </View>
        </View>

        {/* ── MANUAL LOGS CARD (pink → purple) ── */}
        <View style={s.colorCard}>
          <GradientStrip colors={["#EC4899", "#8B5CF6"]} style={{ borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 16 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
                <Icon name="clipboard-list-outline" size={20} color="#fff" />
              </View>
              <View>
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800" }}>Manual Logs</Text>
                <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>Diet · Supplements · Exercise</Text>
              </View>
              <TouchableOpacity
                onPress={() => logSheetRef.current?.open()}
                style={{ marginLeft: "auto", flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 9, paddingHorizontal: 12, paddingVertical: 6 }}
              >
                <Feather name="plus" size={13} color="#fff" />
                <Text style={{ color: "#fff", fontSize: 12, fontWeight: "800" }}>Add</Text>
              </TouchableOpacity>
            </View>
          </GradientStrip>
          <View style={{ padding: 16, gap: 4 }}>
            {manualLogs.map(log => (
              <View key={log.id} style={{
                flexDirection: "row", alignItems: "center", gap: 12,
                padding: 13, borderRadius: 13,
                backgroundColor: log.color + "16",
                borderWidth: 1.5, borderColor: log.color + "50",
                marginBottom: 8,
              }}>
                <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: log.color + "28", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={log.icon} size={20} color={log.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 4 }}>
                    <Text style={{ color: log.color, fontSize: 10, fontWeight: "900", letterSpacing: 1 }}>{log.category.toUpperCase()}</Text>
                    <View style={{ backgroundColor: log.color + "28", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 }}>
                      <Text style={{ color: log.color, fontSize: 9, fontWeight: "700" }}>{log.time}</Text>
                    </View>
                  </View>
                  <Text style={{ color: C.textSoft, fontSize: 12, fontWeight: "500" }}>{log.entry}</Text>
                </View>
                {log.cal ? (
                  <Text style={{ color: log.cal.startsWith("−") ? C.lime : C.muted, fontSize: 12, fontWeight: "900" }}>
                    {log.cal}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* ═══════════════════ BOTTOM SHEETS ═══════════════════ */}

      {/* AI Suggestion Sheet */}
      <RBSheet ref={aiSheetRef} height={430} openDuration={280}
        customStyles={{ container: s.sheet, draggableIcon: s.sheetHandle }} draggable>
        <View style={s.sheetInner}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <GradientStrip colors={["#F43F5E","#F97316"]} style={{ width: 48, height: 48, borderRadius: 14 }}>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Icon name="robot-outline" size={24} color="#fff" />
              </View>
            </GradientStrip>
            <View>
              <Text style={s.sheetTitle}>AI Wellness Suggestion</Text>
              <Text style={s.sheetSub}>Based on voice + activity data</Text>
            </View>
          </View>
          <View style={{ backgroundColor: C.roseD, borderRadius: 14, padding: 14, marginBottom: 18, borderWidth: 1, borderColor: C.rose + "55" }}>
            <Text style={{ color: C.textSoft, fontSize: 13, lineHeight: 21 }}>
              You've walked only <Text style={{ color: C.rose, fontWeight: "900" }}>37 steps</Text> today — far below your usual 6,400-step baseline.{"\n\n"}
              Voice biomarkers show low physical energy. A brisk 10-min walk can boost serotonin by up to <Text style={{ color: C.lime, fontWeight: "800" }}>34%</Text> and reduce stress signals in your voice.
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
            {[{label:"10 min walk 🚶",color:C.orange},{label:"Stretch 🧘",color:C.purple},{label:"Hydrate 💧",color:C.cyan}].map(chip=>(
              <TouchableOpacity key={chip.label} style={{ flex: 1, paddingVertical: 9, borderRadius: 20, backgroundColor: chip.color + "22", borderWidth: 1.5, borderColor: chip.color + "66", alignItems: "center" }}>
                <Text style={{ color: chip.color, fontSize: 11, fontWeight: "700" }}>{chip.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity activeOpacity={0.88}>
            <GradientStrip colors={["#F43F5E","#F97316"]} style={{ borderRadius: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 15 }}>
                <Icon name="walk" size={18} color="#fff" />
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800" }}>Start Walk Reminder</Text>
              </View>
            </GradientStrip>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {/* Steps Sheet */}
      <RBSheet ref={stepsSheetRef} height={370} openDuration={280}
        customStyles={{ container: s.sheet, draggableIcon: s.sheetHandle }} draggable>
        <View style={s.sheetInner}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <GradientStrip colors={["#F97316","#EC4899"]} style={{ width: 48, height: 48, borderRadius: 14 }}>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Icon name="shoe-print" size={22} color="#fff" />
              </View>
            </GradientStrip>
            <View>
              <Text style={s.sheetTitle}>Steps Detail</Text>
              <Text style={s.sheetSub}>Today vs weekly average</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
            {[
              { label:"Today",    val:"37",    color:C.rose   },
              { label:"7-Day Avg",val:"4,280", color:C.orange },
              { label:"Best Day", val:"8,920", color:C.lime   },
              { label:"Goal",     val:"10,000",color:C.cyan   },
            ].map(m=>(
              <View key={m.label} style={{ width:(width-88)/2, backgroundColor:m.color+"18", borderRadius:14, padding:14, alignItems:"center", borderWidth:1.5, borderColor:m.color+"55" }}>
                <Text style={{ color:m.color, fontSize:24, fontWeight:"900" }}>{m.val}</Text>
                <Text style={{ color:C.muted, fontSize:11, marginTop:3 }}>{m.label}</Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection:"row", alignItems:"center", gap:8, marginBottom:18 }}>
            <Icon name="google-fit" size={14} color={C.teal} />
            <Text style={{ color:C.muted, fontSize:12 }}>Synced from Google Fit · 2 min ago</Text>
          </View>
          <TouchableOpacity activeOpacity={0.88}>
            <GradientStrip colors={["#F97316","#EC4899"]} style={{ borderRadius:15 }}>
              <View style={{ paddingVertical:14, alignItems:"center" }}>
                <Text style={{ color:"#fff", fontSize:14, fontWeight:"800" }}>Connect Health App</Text>
              </View>
            </GradientStrip>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {/* Sleep Sheet */}
      <RBSheet ref={sleepSheetRef} height={360} openDuration={280}
        customStyles={{ container: s.sheet, draggableIcon: s.sheetHandle }} draggable>
        <View style={s.sheetInner}>
          <View style={{ flexDirection:"row", alignItems:"center", gap:12, marginBottom:18 }}>
            <GradientStrip colors={["#8B5CF6","#06B6D4"]} style={{ width:48, height:48, borderRadius:14 }}>
              <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
                <Ionicons name="moon" size={22} color="#fff" />
              </View>
            </GradientStrip>
            <View>
              <Text style={s.sheetTitle}>{selectedSleep.day} · Sleep Report</Text>
              <Text style={s.sheetSub}>Night analysis breakdown</Text>
            </View>
          </View>
          <View style={{ flexDirection:"row", flexWrap:"wrap", gap:10, marginBottom:18 }}>
            {[
              { label:"Duration",   val:selectedSleep.hours+"h", color:C.purple },
              { label:"Quality",    val:selectedSleep.quality,   color:C.cyan   },
              { label:"Deep Sleep", val:"2.4h",                  color:C.teal   },
              { label:"REM",        val:"1.8h",                  color:C.yellow },
            ].map(m=>(
              <View key={m.label} style={{ width:(width-88)/2, backgroundColor:m.color+"18", borderRadius:14, padding:14, alignItems:"center", borderWidth:1.5, borderColor:m.color+"55" }}>
                <Text style={{ color:m.color, fontSize:22, fontWeight:"900" }}>{m.val}</Text>
                <Text style={{ color:C.muted, fontSize:11, marginTop:3 }}>{m.label}</Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection:"row", alignItems:"center", gap:10 }}>
            <Text style={{ color:C.muted, fontSize:12, width:110 }}>Sleep Efficiency</Text>
            <View style={{ flex:1, height:8, borderRadius:4, backgroundColor:C.dim, overflow:"hidden" }}>
              <View style={{ width:"78%", height:8, borderRadius:4, backgroundColor:C.purple }} />
            </View>
            <Text style={{ color:C.purple, fontSize:13, fontWeight:"900" }}>78%</Text>
          </View>
        </View>
      </RBSheet>

      {/* Pillar Sheet */}
      <RBSheet ref={pillarSheetRef} height={380} openDuration={280}
        customStyles={{ container: s.sheet, draggableIcon: s.sheetHandle }} draggable>
        <View style={s.sheetInner}>
          <View style={{ flexDirection:"row", alignItems:"center", gap:12, marginBottom:18 }}>
            <View style={{ width:48, height:48, borderRadius:14, backgroundColor:selectedPillar.bg, borderWidth:1.5, borderColor:selectedPillar.color+"55", alignItems:"center", justifyContent:"center" }}>
              {selectedPillar.iconLib==="ion"
                ? <Ionicons name={selectedPillar.icon} size={24} color={selectedPillar.color} />
                : <Icon     name={selectedPillar.icon} size={24} color={selectedPillar.color} />}
            </View>
            <View>
              <Text style={s.sheetTitle}>{selectedPillar.label} Pillar</Text>
              <Text style={s.sheetSub}>Score & personalised advice</Text>
            </View>
          </View>
          <View style={{ alignItems:"center", marginBottom:16 }}>
            <Text style={{ color:selectedPillar.color, fontSize:72, fontWeight:"900", lineHeight:76 }}>{selectedPillar.value}</Text>
            <Text style={{ color:C.muted, fontSize:14 }}>out of 100</Text>
          </View>
          <View style={{ height:10, borderRadius:5, backgroundColor:C.dim, overflow:"hidden", marginBottom:18 }}>
            <View style={{ width:`${selectedPillar.value}%`, height:10, borderRadius:5, backgroundColor:selectedPillar.color }} />
          </View>
          <Text style={{ color:C.muted, fontSize:13, lineHeight:20, textAlign:"center", marginBottom:20 }}>
            {selectedPillar.value < 50
              ? `Your ${selectedPillar.label.toLowerCase()} score needs attention. Build consistent habits over 7 days.`
              : `Your ${selectedPillar.label.toLowerCase()} score is on track! Keep your current routine going.`}
          </Text>
          <TouchableOpacity activeOpacity={0.88} style={{ backgroundColor:selectedPillar.bg, borderRadius:14, paddingVertical:13, alignItems:"center", borderWidth:1.5, borderColor:selectedPillar.color+"66" }}>
            <Text style={{ color:selectedPillar.color, fontSize:14, fontWeight:"800" }}>View {selectedPillar.label} Tips</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {/* Log Sheet */}
      <RBSheet ref={logSheetRef} height={470} openDuration={280}
        customStyles={{ container: s.sheet, draggableIcon: s.sheetHandle }} draggable>
        <View style={s.sheetInner}>
          <View style={{ flexDirection:"row", alignItems:"center", gap:12, marginBottom:18 }}>
            <GradientStrip colors={["#EC4899","#8B5CF6"]} style={{ width:48, height:48, borderRadius:14 }}>
              <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
                <Icon name="plus-circle-outline" size={22} color="#fff" />
              </View>
            </GradientStrip>
            <View>
              <Text style={s.sheetTitle}>Add Manual Log</Text>
              <Text style={s.sheetSub}>Track diet, supplements & exercise</Text>
            </View>
          </View>
          {/* Tabs */}
          <View style={{ flexDirection:"row", gap:8, marginBottom:14 }}>
            {([
              { key:"diet",       label:"Diet",       icon:"food-apple", color:C.lime   },
              { key:"supplement", label:"Supplement", icon:"pill",        color:C.cyan   },
              { key:"exercise",   label:"Exercise",   icon:"dumbbell",    color:C.orange },
            ] as const).map(tab=>(
              <TouchableOpacity
                key={tab.key} onPress={()=>setLogTab(tab.key)}
                style={{ flex:1, flexDirection:"row", alignItems:"center", justifyContent:"center", gap:5, paddingVertical:10, borderRadius:12, backgroundColor:logTab===tab.key ? tab.color+"22" : C.dim+"55", borderWidth:1.5, borderColor:logTab===tab.key ? tab.color+"88" : "transparent" }}
              >
                <Icon name={tab.icon} size={13} color={logTab===tab.key ? tab.color : C.muted} />
                <Text style={{ color:logTab===tab.key ? tab.color : C.muted, fontSize:12, fontWeight:"700" }}>{tab.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={{ backgroundColor:C.dim+"55", borderRadius:13, borderWidth:1, borderColor:C.border, color:C.text, fontSize:13, paddingHorizontal:14, paddingVertical:12, marginBottom:12, minHeight:72, textAlignVertical:"top" }}
            placeholder={logTab==="diet" ? "e.g. Oats + banana smoothie, 320 kcal..." : logTab==="supplement" ? "e.g. Magnesium 400mg, Vitamin C..." : "e.g. 30 min run, 5km, outdoor..."}
            placeholderTextColor={C.muted}
            value={logInput}
            onChangeText={setLogInput}
            multiline
          />
          <View style={{ flexDirection:"row", gap:8, flexWrap:"wrap", marginBottom:20 }}>
            {(logTab==="diet" ? ["🍳 Breakfast","🥗 Lunch","🍽️ Dinner","🍎 Snack"]
              : logTab==="supplement" ? ["☀️ Morning","🌙 Evening","🍽️ Post-meal"]
              : ["🌅 Morning","🌆 Afternoon","💪 HIIT","🧘 Yoga"]
            ).map(tag=>(
              <TouchableOpacity key={tag} style={{ backgroundColor:C.dim+"55", borderRadius:9, borderWidth:1, borderColor:C.border, paddingHorizontal:12, paddingVertical:6 }}>
                <Text style={{ color:C.muted, fontSize:12 }}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity activeOpacity={0.88}>
            <GradientStrip colors={["#EC4899","#8B5CF6"]} style={{ borderRadius:15 }}>
              <View style={{ flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10, paddingVertical:15 }}>
                <Feather name="check" size={16} color="#fff" />
                <Text style={{ color:"#fff", fontSize:15, fontWeight:"800" }}>Save Log</Text>
              </View>
            </GradientStrip>
          </TouchableOpacity>
        </View>
      </RBSheet>

    </View>
  );
}


LifestyleActivityTracker.navigationOptions = navigationOptions;

export default LifestyleActivityTracker
// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  header: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: Platform.OS === "ios" ? 56 : 28,
    paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: C.line,
  },
  headerBtn: {
    width: 38, height: 38, borderRadius: 11,
    backgroundColor: C.surface, borderWidth: 1, borderColor: C.border,
    alignItems: "center", justifyContent: "center",
  },
  headerTitle: { color: C.text, fontSize: 18, fontWeight: "800" },
  headerSub:   { color: C.muted, fontSize: 11, marginTop: 1 },

  scoreRow: {
    flexDirection: "row", justifyContent: "space-around", alignItems: "center",
    marginHorizontal: 18, marginBottom: 16,
    paddingHorizontal: 10, paddingVertical: 16,
    backgroundColor: C.surface,
    borderRadius: 20, borderWidth: 1, borderColor: C.border,
  },
  scoreDivider: { width: 1, height: 46, backgroundColor: C.dim },

  colorCard: {
    marginHorizontal: 18, marginBottom: 14,
    borderRadius: 20, overflow: "hidden",
    backgroundColor: C.card,
    borderWidth: 1, borderColor: C.border,
  },

  sheet:       { backgroundColor: "#100D26", borderTopLeftRadius: 28, borderTopRightRadius: 28, borderTopWidth: 1, borderTopColor: C.border },
  sheetHandle: { backgroundColor: C.dim, width: 46, height: 4 },
  sheetInner:  { padding: 22, paddingTop: 12 },
  sheetTitle:  { color: C.text, fontSize: 17, fontWeight: "800" },
  sheetSub:    { color: C.muted, fontSize: 11, marginTop: 2 },
});