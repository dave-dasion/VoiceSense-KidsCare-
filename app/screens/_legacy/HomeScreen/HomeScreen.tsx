import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#F0F4FF",
  bgAlt: "#E8F0FE",
  white: "#FFFFFF",

  teal: "#00C9A7",
  tealLight: "#D0F7F1",
  tealDark: "#007E69",

  violet: "#7C5CFC",
  violetLight: "#EDE8FF",
  violetDark: "#4B2FCB",

  coral: "#FF6B6B",
  coralLight: "#FFE8E8",
  coralDark: "#C13939",

  amber: "#FFA826",
  amberLight: "#FFF3D6",
  amberDark: "#B06A00",

  sky: "#3AACF7",
  skyLight: "#DDF2FF",
  skyDark: "#1073B4",

  pink: "#F760C4",
  pinkLight: "#FFE0F5",
  pinkDark: "#A3007E",

  green: "#22C55E",
  greenLight: "#DCFCE7",
  greenDark: "#166534",

  text1: "#1A1A2E",
  text2: "#4A4A72",
  text3: "#9090B8",
  border: "#D8DFF5",
};

// ─── Types ────────────────────────────────────────────────────────────────────
type MoodKey = "calm" | "excited" | "tired" | "withdrawn" | "focused";

interface MoodOption {
  key: MoodKey;
  label: string;
  icon: string;
  bg: string;
  color: string;
}

interface MicroAction {
  id: string;
  label: string;
  icon: string;
  iconSet: "Ionicons" | "MaterialCommunityIcons" | "Feather";
  bg: string;
  color: string;
  duration: string;
  desc: string;
}

interface DayActivity {
  day: string;
  minutes: number;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const MOODS: MoodOption[] = [
  { key: "calm", label: "Calm", icon: "leaf", bg: C.tealLight, color: C.tealDark },
  { key: "excited", label: "Excited", icon: "flash", bg: C.amberLight, color: C.amberDark },
  { key: "tired", label: "Tired", icon: "moon", bg: C.violetLight, color: C.violetDark },
  { key: "withdrawn", label: "Withdrawn", icon: "remove-circle", bg: C.coralLight, color: C.coralDark },
  { key: "focused", label: "Focused", icon: "eye", bg: C.skyLight, color: C.skyDark },
];

const MICRO_ACTIONS: MicroAction[] = [
  {
    id: "walk", label: "Walk", icon: "walk", iconSet: "MaterialCommunityIcons",
    bg: C.greenLight, color: C.green, duration: "10 min",
    desc: "A short walk boosts serotonin and reduces cortisol. Step outside, breathe naturally, and let your mind wander freely.",
  },
  {
    id: "music", label: "Music", icon: "musical-notes", iconSet: "Ionicons",
    bg: C.violetLight, color: C.violet, duration: "5 min",
    desc: "Listening to music activates reward pathways. Choose a playlist that gently shifts your mood toward calm or joy.",
  },
  {
    id: "breathe", label: "Breathe", icon: "wind", iconSet: "Feather",
    bg: C.skyLight, color: C.sky, duration: "3 min",
    desc: "Box breathing (4-4-4-4) activates your parasympathetic system. Inhale 4s, hold 4s, exhale 4s, hold — repeat 5 times.",
  },
  {
    id: "reflect", label: "Reflect", icon: "book-open", iconSet: "Feather",
    bg: C.amberLight, color: C.amber, duration: "7 min",
    desc: "Write 3 things you noticed today. This builds metacognitive awareness and deepens emotional clarity over time.",
  },
];

const ACTIVITY_DATA: DayActivity[] = [
  { day: "Mon", minutes: 18 },
  { day: "Tue", minutes: 32 },
  { day: "Wed", minutes: 12 },
  { day: "Thu", minutes: 45 },
  { day: "Fri", minutes: 28 },
  { day: "Sat", minutes: 55 },
  { day: "Sun", minutes: 22 },
];

const BAR_COLORS = [C.teal, C.violet, C.coral, C.amber, C.sky, C.pink, C.green];
const STABILITY_DATA = [62, 68, 74, 70, 78, 82, 79];
const TRAJECTORY_DATA = [55, 58, 60, 65, 63, 70, 74, 72, 78, 81, 79, 83];

// ─── Icon helper ──────────────────────────────────────────────────────────────
function DynIcon({
  set, name, size, color,
}: {
  set: MicroAction["iconSet"]; name: string; size: number; color: string;
}) {
  if (set === "MaterialCommunityIcons")
    return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
  if (set === "Feather") return <Feather name={name as any} size={size} color={color} />;
  return <Ionicons name={name as any} size={size} color={color} />;
}

// ─── Stability Sparkline ──────────────────────────────────────────────────────
function StabilityChart({ data }: { data: number[] }) {
  const H = 64, W = width - 96;
  const max = Math.max(...data), min = Math.min(...data) - 4, range = max - min;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / range) * H,
  }));
  return (
    <View style={{ height: H + 24, marginTop: 6 }}>
      {[0.3, 0.6, 0.9].map((g, i) => (
        <View key={i} style={{
          position: "absolute", left: 0, right: 0,
          top: H * g, height: 1, backgroundColor: C.border,
        }} />
      ))}
      {pts.slice(0, -1).map((p, i) => {
        const n = pts[i + 1];
        const dx = n.x - p.x, dy = n.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <View key={i} style={{
            position: "absolute", left: p.x, top: p.y,
            width: len, height: 3, backgroundColor: C.violet,
            borderRadius: 2,
            transform: [{ rotate: `${angle}deg` }],
            transformOrigin: "0 0",
          }} />
        );
      })}
      {pts.map((p, i) => (
        <View key={i} style={{
          position: "absolute", left: p.x - 5, top: p.y - 5,
          width: 10, height: 10, borderRadius: 5,
          backgroundColor: i === pts.length - 1 ? C.violet : C.white,
          borderWidth: 2, borderColor: C.violet,
        }} />
      ))}
      <View style={{ flexDirection: "row", justifyContent: "space-between", position: "absolute", bottom: 0, left: 0, right: 0 }}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <Text key={i} style={{ fontSize: 10, color: C.text3, fontWeight: "600" }}>{d}</Text>
        ))}
      </View>
    </View>
  );
}

// ─── Activity Bars ────────────────────────────────────────────────────────────
function ActivityBars({ data }: { data: DayActivity[] }) {
  const max = Math.max(...data.map(d => d.minutes));
  const BAR_H = 72;
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 7, height: BAR_H + 24 }}>
      {data.map((d, i) => (
        <View key={i} style={{ flex: 1, alignItems: "center" }}>
          <View style={{
            width: "100%", height: BAR_H * (d.minutes / max),
            borderRadius: 8, backgroundColor: BAR_COLORS[i], opacity: i === 5 ? 1 : 0.7,
          }} />
          <Text style={{ fontSize: 10, color: C.text3, marginTop: 5, fontWeight: "600" }}>{d.day}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Trajectory Curve ─────────────────────────────────────────────────────────
function TrajectoryCurve({ data }: { data: number[] }) {
  const H = 56, W = width - 96;
  const max = Math.max(...data), min = Math.min(...data) - 4, range = max - min;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / range) * H,
  }));
  const lineColors = [C.coral, C.amber, C.teal, C.sky, C.violet, C.pink, C.green,
  C.teal, C.violet, C.amber, C.pink];
  return (
    <View style={{ height: H + 24, marginTop: 6 }}>
      {pts.slice(0, -1).map((p, i) => {
        const n = pts[i + 1];
        const dx = n.x - p.x, dy = n.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <View key={i} style={{
            position: "absolute", left: p.x, top: p.y, width: len, height: 3,
            backgroundColor: lineColors[i % lineColors.length], borderRadius: 2,
            transform: [{ rotate: `${angle}deg` }], transformOrigin: "0 0",
          }} />
        );
      })}
      <View style={{
        position: "absolute",
        left: pts[pts.length - 1].x - 7, top: pts[pts.length - 1].y - 7,
        width: 14, height: 14, borderRadius: 7, backgroundColor: C.violet,
      }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", position: "absolute", bottom: 0, left: 0, right: 0 }}>
        {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
          <Text key={i} style={{ fontSize: 8, color: C.text3, fontWeight: "600" }}>{m}</Text>
        ))}
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function WellBeingDashboard() {
  const [activeMood, setActiveMood] = useState<MoodKey>("calm");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<MicroAction | null>(null);
  const aiRef = useRef<any>(null);
  const actionRef = useRef<any>(null);
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const checkAuth = async () => {
        const token = await AsyncStorage.getItem("REFRESH_TOKEN");
        console.log(token, 'aaaaa000999')
        setIsLoggedIn(!!token);

        const email = await AsyncStorage.getItem("emailId");
        if (email) {
          const name = email.split("@")[0];
          setUserName(name.charAt(0).toUpperCase() + name.slice(1));
        }
      };
      checkAuth();
    }, [isLoggedIn])
  );

  const openAction = (a: MicroAction) => {
    setActiveAction(a);
    setSelectedAction(a.id);
    setTimeout(() => actionRef.current?.open(), 40);
  };
  const mood = MOODS.find(m => m.key === activeMood)!;

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* ── Header ── */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <View style={s.dot} />
          <View>
            <Text style={s.greeting}>Good morning, {userName || "Alex"} 🌿</Text>
            <Text style={s.greetingSub}>Friday, Feb 27 · Well-Being Dashboard</Text>
          </View>
        </View>

        {isLoggedIn ? (
          <TouchableOpacity
            style={s.avatar}
            onPress={() => navigation.navigate("BottomTab")}
          >
            <Text style={{ fontSize: 20 }}>🧘</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={s.loginHeaderBtn}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Ionicons name="log-in-outline" size={20} color={C.violet} />
            <Text style={s.loginHeaderText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* ── KPI Strip ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {[
            { iconType: "mc", icon: "heart-pulse", label: "Stability", value: "79", bg: C.violetLight, color: C.violet },
            { iconType: "ion", icon: "battery-charging", label: "Energy", value: "72%", bg: C.amberLight, color: C.amber },
            { iconType: "fe", icon: "activity", label: "Sessions", value: "32", bg: C.tealLight, color: C.teal },
            { iconType: "ion", icon: "checkmark-done-circle", label: "Consistent", value: "85%", bg: C.skyLight, color: C.sky },
          ].map((k, i) => (
            <TouchableOpacity
              key={i}
              style={[s.kpiCard, { backgroundColor: k.bg, marginRight: 10 }]}
              onPress={() => navigation.navigate("BottomTab")}
            >
              {k.iconType === "mc" && <MaterialCommunityIcons name={k.icon as any} size={22} color={k.color} />}
              {k.iconType === "ion" && <Ionicons name={k.icon as any} size={22} color={k.color} />}
              {k.iconType === "fe" && <Feather name={k.icon as any} size={22} color={k.color} />}
              <Text style={[s.kpiValue, { color: k.color }]}>{k.value}</Text>
              <Text style={[s.kpiLabel, { color: k.color }]}>{k.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Daily Mood Card ── */}
        <View style={s.card}>
          <View style={s.row}>
            <View style={[s.chip, { backgroundColor: C.amberLight }]}>
              <Ionicons name="happy-outline" size={16} color={C.amber} />
            </View>
            <Text style={s.cardTitle}>Daily Mood</Text>
          </View>
          <View style={s.moodRow}>
            {MOODS.map(m => (
              <TouchableOpacity
                key={m.key}
                style={[
                  s.moodBtn,
                  { backgroundColor: activeMood === m.key ? m.bg : C.bg },
                  activeMood === m.key && { borderColor: m.color },
                ]}
                onPress={() => setActiveMood(m.key)}
              >
                <Ionicons name={m.icon as any} size={20} color={activeMood === m.key ? m.color : C.text3} />
                <Text style={[s.moodLabel, activeMood === m.key && { color: m.color, fontWeight: "700" }]}>
                  {m.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[s.moodChip, { backgroundColor: mood.bg }]}>
            <Ionicons name={mood.icon as any} size={14} color={mood.color} />
            <Text style={[s.moodChipText, { color: mood.color }]}>
              Feeling <Text style={{ fontWeight: "700" }}>{mood.label.toLowerCase()}</Text> · logged 9:14 AM
            </Text>
          </View>
        </View>

        {/* ── Emotional Stability Index ── */}
        <View style={s.card}>
          <View style={s.row}>
            <View style={[s.chip, { backgroundColor: C.violetLight }]}>
              <MaterialCommunityIcons name="brain" size={16} color={C.violet} />
            </View>
            <Text style={s.cardTitle}>Emotional Stability Index</Text>
            <View style={[s.pill, { backgroundColor: C.violetLight }]}>
              <Text style={[s.pillTxt, { color: C.violet }]}>7-Day</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 18, marginBottom: 4 }}>
            <Text style={[s.bigNum, { color: C.violet }]}>79</Text>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Ionicons name="trending-up" size={14} color={C.green} />
                <Text style={{ color: C.green, fontWeight: "700", fontSize: 13 }}>+5 vs last week</Text>
              </View>
              <Text style={{ color: C.text3, fontSize: 12, marginTop: 3 }}>Above average range</Text>
            </View>
          </View>
          <StabilityChart data={STABILITY_DATA} />
        </View>

        {/* ── Voice Activity Timeline ── */}
        <View style={s.card}>
          <View style={s.row}>
            <View style={[s.chip, { backgroundColor: C.tealLight }]}>
              <Ionicons name="mic" size={16} color={C.teal} />
            </View>
            <Text style={s.cardTitle}>Voice Activity Timeline</Text>
            <View style={[s.pill, { backgroundColor: C.tealLight }]}>
              <Text style={[s.pillTxt, { color: C.teal }]}>Last 7 Days</Text>
            </View>
          </View>
          <ActivityBars data={ACTIVITY_DATA} />
          <View style={s.metaRow}>
            {[
              { v: "3.5h", l: "Total Time" },
              { v: "32", l: "Sessions" },
              { v: "8:40 AM", l: "Peak Hour" },
            ].map((m, i) => (
              <React.Fragment key={i}>
                {i > 0 && <View style={{ width: 1, backgroundColor: C.border }} />}
                <View style={{ alignItems: "center" }}>
                  <Text style={s.metaV}>{m.v}</Text>
                  <Text style={s.metaL}>{m.l}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* ── Trajectory Curve ── */}
        <View style={s.card}>
          <View style={s.row}>
            <View style={[s.chip, { backgroundColor: C.amberLight }]}>
              <Feather name="trending-up" size={16} color={C.amber} />
            </View>
            <Text style={s.cardTitle}>Well-Being Trajectory</Text>
            <View style={[s.pill, { backgroundColor: C.amberLight }]}>
              <Text style={[s.pillTxt, { color: C.amber }]}>Long-term</Text>
            </View>
          </View>
          <TrajectoryCurve data={TRAJECTORY_DATA} />
          <View style={[s.moodChip, { backgroundColor: C.greenLight, marginTop: 10 }]}>
            <Ionicons name="trending-up" size={13} color={C.green} />
            <Text style={[s.moodChipText, { color: C.greenDark }]}>
              Consistent upward trend · Peak at <Text style={{ fontWeight: "700" }}>83</Text> in October
            </Text>
          </View>
        </View>

        {/* ── AI Companion Insight ── */}
        <TouchableOpacity style={s.aiCard} onPress={() => aiRef.current?.open()} activeOpacity={0.88}>
          <View style={s.aiBlob1} />
          <View style={s.aiBlob2} />
          <View style={s.row}>
            <View style={[s.chip, { backgroundColor: C.violetLight }]}>
              <MaterialCommunityIcons name="robot-outline" size={16} color={C.violet} />
            </View>
            <Text style={[s.cardTitle, { color: C.violet }]}>AI Companion Insight</Text>
            <View style={{ marginLeft: "auto" }}>
              <Feather name="chevron-right" size={18} color={C.violet} />
            </View>
          </View>
          <Text style={s.aiQuote}>
            "Your emotional stability improved by 18% this month. Morning voice sessions consistently lead to your best-performing afternoons."
          </Text>
          <View style={{ flexDirection: "row", gap: 7, flexWrap: "wrap" }}>
            {["🎯 Pattern Found", "📊 Data-Backed", "✨ Personalized"].map(t => (
              <View key={t} style={[s.aiTag, { backgroundColor: C.violetLight }]}>
                <Text style={[s.aiTagTxt, { color: C.violetDark }]}>{t}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        {/* ── Micro Actions ── */}
        <View style={s.card}>
          <View style={s.row}>
            <View style={[s.chip, { backgroundColor: C.coralLight }]}>
              <Ionicons name="flash" size={16} color={C.coral} />
            </View>
            <Text style={s.cardTitle}>Suggested Micro-Actions</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {MICRO_ACTIONS.map(a => (
              <TouchableOpacity
                key={a.id}
                style={[
                  s.actionCard, { backgroundColor: a.bg },
                  selectedAction === a.id && { borderColor: a.color, borderWidth: 2 },
                ]}
                onPress={() => openAction(a)}
                activeOpacity={0.8}
              >
                <View style={[s.actionIcon, { backgroundColor: C.white }]}>
                  <DynIcon set={a.iconSet} name={a.icon} size={22} color={a.color} />
                </View>
                <Text style={[s.actionLabel, { color: a.color }]}>{a.label}</Text>
                <View style={[s.durChip, { backgroundColor: a.color + "22" }]}>
                  <Text style={[s.durTxt, { color: a.color }]}>{a.duration}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 36 }} />
      </ScrollView>

      {/* ── RBSheet: AI Insight Detail ── */}
      <RBSheet
        ref={aiRef}
        height={460}
        openDuration={300}
        draggable={true}
        closeOnPressMask
        customStyles={{
          wrapper: { backgroundColor: "rgba(60,40,120,0.28)" },
          draggableIcon: { backgroundColor: C.border },
          container: { backgroundColor: C.white, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
        }}
      >
        <View style={s.sheet}>
          <View style={[s.row, { marginBottom: 2 }]}>
            <View style={[s.chip, { backgroundColor: C.violetLight }]}>
              <MaterialCommunityIcons name="robot-outline" size={18} color={C.violet} />
            </View>
            <Text style={[s.sheetTitle, { color: C.violet }]}>AI Companion Full Insight</Text>
          </View>
          <Text style={s.sheetSub}>Based on your last 30 days of voice data</Text>
          <View style={s.divider} />
          {[
            {
              icon: "trending-up", title: "Stability Trend",
              value: "+18% this month", bg: C.greenLight, color: C.green,
              desc: "Your emotional balance has improved since you began morning voice check-ins. Keep the streak going!",
            },
            {
              icon: "clock", title: "Peak Performance Window",
              value: "9–11 AM", bg: C.amberLight, color: C.amber,
              desc: "Data shows your focus and engagement peaks during mid-morning. Schedule important tasks in this window.",
            },
            {
              icon: "alert-circle", title: "Lifestyle Signal",
              value: "Low energy Wednesdays", bg: C.coralLight, color: C.coral,
              desc: "Recurring energy dip on Wednesdays. A short breathing session midday may help significantly.",
            },
          ].map((item, i) => (
            <View key={i} style={[s.insightRow, { backgroundColor: item.bg }]}>
              <View style={[s.chip, { backgroundColor: C.white }]}>
                <Feather name={item.icon as any} size={16} color={item.color} />
              </View>
              <View style={{ flex: 1, gap: 3 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={s.insightTitle}>{item.title}</Text>
                  <Text style={[s.insightVal, { color: item.color }]}>{item.value}</Text>
                </View>
                <Text style={s.insightDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </RBSheet>

      {/* ── RBSheet: Action Detail ── */}
      <RBSheet
        ref={actionRef}
        height={340}
        openDuration={260}
        draggable={true}
        closeOnPressMask
        customStyles={{
          wrapper: { backgroundColor: "rgba(60,40,120,0.25)" },
          draggableIcon: { backgroundColor: C.border },
          container: { backgroundColor: C.white, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
        }}
      >
        {activeAction && (
          <View style={s.sheet}>
            <View style={[s.row, { marginBottom: 2 }]}>
              <View style={[s.actionIcon, { backgroundColor: activeAction.bg, width: 44, height: 44 }]}>
                <DynIcon set={activeAction.iconSet} name={activeAction.icon} size={22} color={activeAction.color} />
              </View>
              <View>
                <Text style={[s.sheetTitle, { color: activeAction.color }]}>{activeAction.label}</Text>
                <Text style={s.sheetSub}>Recommended for your current state</Text>
              </View>
              <View style={[s.pill, { backgroundColor: activeAction.bg, marginLeft: "auto" }]}>
                <Text style={[s.pillTxt, { color: activeAction.color }]}>{activeAction.duration}</Text>
              </View>
            </View>
            <View style={s.divider} />
            <View style={[s.descBox, { backgroundColor: activeAction.bg }]}>
              <Text style={s.descTxt}>{activeAction.desc}</Text>
            </View>
            <TouchableOpacity
              style={[s.startBtn, { backgroundColor: activeAction.color }]}
              onPress={() => {
                actionRef.current?.close();
                navigation.navigate("BottomTab");
              }}
            >
              <Ionicons name="play-circle" size={20} color={C.white} />
              <Text style={s.startTxt}>Start Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingTop: 4 },

  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, paddingTop: 14, paddingBottom: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  dot: {
    width: 10, height: 10, borderRadius: 5, backgroundColor: C.teal,
    shadowColor: C.teal, shadowOpacity: 0.7, shadowRadius: 6, elevation: 4,
  },
  greeting: { fontSize: 18, fontWeight: "800", color: C.text1, letterSpacing: 0.2 },
  greetingSub: { fontSize: 11, color: C.text3, marginTop: 1, fontWeight: "500" },
  avatar: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: C.violetLight,
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: C.violet + "44",
  },

  kpiCard: {
    borderRadius: 18, padding: 14, alignItems: "center", gap: 5, width: 86,
    shadowColor: C.violet + "44", shadowOpacity: 0.8, shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  kpiValue: { fontSize: 20, fontWeight: "800" },
  kpiLabel: { fontSize: 9, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.4, opacity: 0.7 },

  card: {
    backgroundColor: C.white, borderRadius: 20, padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: C.border,
    shadowColor: "#8080C0", shadowOpacity: 0.08, shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: "700", color: C.text1 },
  chip: {
    width: 32, height: 32, borderRadius: 10, alignItems: "center", justifyContent: "center",
  },
  pill: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginLeft: "auto" },
  pillTxt: { fontSize: 10, fontWeight: "700" },
  bigNum: { fontSize: 52, fontWeight: "900", lineHeight: 56 },

  moodRow: { flexDirection: "row", gap: 6, marginBottom: 10 },
  moodBtn: {
    flex: 1, alignItems: "center", paddingVertical: 9, borderRadius: 14,
    borderWidth: 1.5, borderColor: C.border, gap: 4,
  },
  moodLabel: { fontSize: 9, color: C.text3, fontWeight: "600" },
  moodChip: {
    flexDirection: "row", alignItems: "center", gap: 6,
    borderRadius: 10, padding: 9,
  },
  moodChipText: { fontSize: 12, fontWeight: "500" },

  metaRow: {
    flexDirection: "row", justifyContent: "space-around",
    marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border,
  },
  metaV: { fontSize: 16, fontWeight: "800", color: C.text1 },
  metaL: { fontSize: 10, color: C.text3, marginTop: 2, fontWeight: "500" },

  aiCard: {
    backgroundColor: C.white, borderRadius: 20, padding: 16, marginBottom: 14,
    borderWidth: 2, borderColor: C.violetLight, overflow: "hidden",
    shadowColor: C.violet, shadowOpacity: 0.14, shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 }, elevation: 5,
  },
  aiBlob1: {
    position: "absolute", top: -24, right: -24, width: 80, height: 80,
    borderRadius: 40, backgroundColor: C.violetLight, opacity: 0.7,
  },
  aiBlob2: {
    position: "absolute", bottom: -18, left: -18, width: 60, height: 60,
    borderRadius: 30, backgroundColor: C.tealLight, opacity: 0.6,
  },
  aiQuote: {
    fontSize: 13, color: C.text2, lineHeight: 21, fontStyle: "italic", marginBottom: 12, marginTop: 2,
  },
  aiTag: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  aiTagTxt: { fontSize: 11, fontWeight: "600" },

  actionCard: {
    flex: 1, borderRadius: 16, padding: 12, alignItems: "center", gap: 7,
    borderWidth: 1.5, borderColor: "transparent",
    shadowColor: "#8080C0", shadowOpacity: 0.1, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  actionIcon: {
    width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 4,
  },
  actionLabel: { fontSize: 12, fontWeight: "700" },
  durChip: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  durTxt: { fontSize: 10, fontWeight: "700" },

  sheet: { flex: 1, padding: 20 },
  sheetTitle: { fontSize: 17, fontWeight: "800", color: C.text1 },
  sheetSub: { fontSize: 12, color: C.text3, marginBottom: 14 },
  divider: { height: 1, backgroundColor: C.border, marginBottom: 14 },

  insightRow: {
    flexDirection: "row", gap: 12, marginBottom: 10, borderRadius: 14, padding: 12,
  },
  insightTitle: { fontSize: 13, fontWeight: "700", color: C.text1 },
  insightVal: { fontSize: 12, fontWeight: "800" },
  insightDesc: { fontSize: 12, color: C.text2, lineHeight: 17 },

  descBox: { borderRadius: 14, padding: 14, marginBottom: 20 },
  descTxt: { fontSize: 14, lineHeight: 22, color: C.text1, fontWeight: "500" },

  startBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, borderRadius: 16, paddingVertical: 15,
    shadowColor: C.violet, shadowOpacity: 0.25, shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }, elevation: 4,
  },
  startTxt: { fontSize: 16, fontWeight: "800", color: C.white, letterSpacing: 0.3 },

  loginHeaderBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.violetLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: C.violet + "33",
  },
  loginHeaderText: {
    fontSize: 13,
    fontWeight: "700",
    color: C.violet,
  },
});