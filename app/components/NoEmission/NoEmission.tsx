import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Modal,
  Dimensions,
  Platform,
  PanResponder,
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#F7F9FC",
  white: "#FFFFFF",
  surface: "#F0F3FA",
  border: "#E4EAF5",
  text: "#1C2340",
  muted: "#8A96B0",
  subtle: "#B8C0D4",
  green: "#18B87A",
  greenBg: "#EDFAF4",
  greenBorder: "#B6EDD5",
  red: "#F0485A",
  redBg: "#FEF0F2",
  redBorder: "#FBBCC3",
  accent: "#5B7FED",
  accentBg: "#EEF2FD",
  yellow: "#F59E0B",
};

// ─── Data ────────────────────────────────────────────────────────────────────
const AGE_GROUPS = [
  { id: "12m", label: "12 mo", range: "By 12 Months" },
  { id: "18m", label: "18 mo", range: "By 18 Months" },
  { id: "24m", label: "24 mo", range: "By 24 Months" },
  { id: "36m", label: "3 yrs", range: "By 36 Months" },
];

type CheckItem = {
  id: string;
  text: string;
  type: "green" | "red";
  detail: string;
  tip: string;
};

const CHECKLIST: Record<string, CheckItem[]> = {
  "12m": [
    {
      id: "g1", text: "Smiles spontaneously at people", type: "green",
      detail: "Social smiling is one of the earliest signs of social engagement and bonding with caregivers.",
      tip: "Engage with lots of face-to-face time — mirror their expressions and smile back warmly.",
    },
    {
      id: "g2", text: "Coos and makes babbling sounds", type: "green",
      detail: "Babbling shows the child is developing the pre-language vocal skills needed for speech.",
      tip: "Talk to your child constantly and narrate your daily activities out loud.",
    },
    {
      id: "g3", text: "Responds to their own name", type: "green",
      detail: "Name recognition indicates auditory processing and early social awareness are developing.",
      tip: "Use their name clearly and consistently — make eye contact when calling them.",
    },
    {
      id: "g4", text: "Shows interest in faces", type: "green",
      detail: "Preferring faces over objects is a key marker of typical social development in infants.",
      tip: "Hold your face close during feeding and play — let them study your expressions.",
    },
    {
      id: "r1", text: "No eye contact during feeding or play", type: "red",
      detail: "Absence of eye contact by 12 months can be an early indicator worth monitoring closely.",
      tip: "Try gently guiding attention with voice and gentle touch during close interactions.",
    },
    {
      id: "r2", text: "No back-and-forth cooing or sounds", type: "red",
      detail: "Lack of vocal exchange may suggest delays in early communication development.",
      tip: "Consult a speech-language therapist for an early evaluation and guidance.",
    },
  ],
  "18m": [
    {
      id: "g5", text: "Points to show interest in things", type: "green",
      detail: "Declarative pointing shows the child wants to share attention — a crucial social milestone.",
      tip: "Point at things together and name them clearly to build joint attention skills.",
    },
    {
      id: "g6", text: "Uses at least 5-10 single words", type: "green",
      detail: "Single-word use by 18 months indicates expressive language is developing on track.",
      tip: "Read picture books daily and name objects slowly and clearly and repeatedly.",
    },
    {
      id: "g7", text: "Waves bye-bye when prompted", type: "green",
      detail: "Imitative gestures show the child is observing and learning social cues from others.",
      tip: "Practice greetings and farewells consistently as part of daily routines.",
    },
    {
      id: "r3", text: "No pointing or waving gestures", type: "red",
      detail: "Absence of gestures at 18 months is one of the strongest early indicators to evaluate.",
      tip: "Request a developmental screening from your pediatrician without delay.",
    },
    {
      id: "r4", text: "Does not follow simple instructions", type: "red",
      detail: "Following simple 1-step directions demonstrates comprehension and attention skills.",
      tip: "Use clear, short commands paired with visual cues and gentle demonstrations.",
    },
    {
      id: "r5", text: "Loss of previously acquired skills", type: "red",
      detail: "Skill regression is a red flag that requires urgent professional evaluation.",
      tip: "Document specific skills lost with dates and timing; consult a specialist immediately.",
    },
  ],
  "24m": [
    {
      id: "g8", text: "Uses 2-word phrases spontaneously", type: "green",
      detail: "Two-word combinations mark a significant leap in expressive language development.",
      tip: "Expand on what they say — if they say 'more juice', model 'more apple juice please'.",
    },
    {
      id: "g9", text: "Engages in simple pretend play", type: "green",
      detail: "Pretend play shows symbolic thinking and imagination are developing well.",
      tip: "Play tea party, doctor, or house together to encourage imaginative scenarios.",
    },
    {
      id: "g10", text: "Shows interest in other children", type: "green",
      detail: "Peer interest, even without direct interaction, is an important 24-month milestone.",
      tip: "Arrange parallel play dates in calm, low-stimulation environments first.",
    },
    {
      id: "r6", text: "No two-word meaningful phrases", type: "red",
      detail: "Absence of multi-word combinations by 24 months warrants prompt speech evaluation.",
      tip: "Seek a speech-language pathology evaluation without delay.",
    },
    {
      id: "r7", text: "Does not imitate actions or words", type: "red",
      detail: "Imitation is foundational for both language acquisition and social learning.",
      tip: "Practice simple imitation games like clapping, waving, and peekaboo daily.",
    },
    {
      id: "r8", text: "No interest in other children", type: "red",
      detail: "Complete absence of peer interest at this age may indicate social development concerns.",
      tip: "Discuss with your pediatrician; consider early social skills intervention programs.",
    },
  ],
  "36m": [
    {
      id: "g11", text: "Uses 3+ word sentences regularly", type: "green",
      detail: "Multi-word sentences show growing complexity and confidence in expressive language.",
      tip: "Ask open-ended questions like 'what happened next?' to encourage longer responses.",
    },
    {
      id: "g12", text: "Plays cooperatively with other children", type: "green",
      detail: "Cooperative play demonstrates an understanding of social rules and turn-taking.",
      tip: "Use structured group activities with clear, simple, and predictable rules.",
    },
    {
      id: "g13", text: "Understands same vs different concepts", type: "green",
      detail: "Abstract concept understanding signals strong cognitive and language development.",
      tip: "Sort objects by color, shape, and size during everyday play and routines.",
    },
    {
      id: "r9", text: "Rarely uses language for communication", type: "red",
      detail: "Limited functional communication by age 3 is a significant developmental concern.",
      tip: "A comprehensive speech and developmental autism evaluation is recommended.",
    },
    {
      id: "r10", text: "Strong insistence on sameness or routines", type: "red",
      detail: "Rigid routines that cause distress when disrupted can be a behavioral indicator.",
      tip: "Introduce gentle, gradual changes to help build flexibility over time.",
    },
    {
      id: "r11", text: "Repetitive movements like rocking or hand-flapping", type: "red",
      detail: "Repetitive motor behaviors can be associated with sensory or developmental differences.",
      tip: "Consult an occupational therapist for a sensory integration assessment.",
    },
  ],
};

// ─── Detail Bottom Sheet ──────────────────────────────────────────────────────
const DetailSheet = ({
  item,
  visible,
  onClose,
}: {
  item: CheckItem | null;
  visible: boolean;
  onClose: () => void;
}) => {
  const translateY = useRef(new Animated.Value(700)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const isTablet = Math.min(width, Dimensions.get("window").height) >= 600;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, damping: 22, stiffness: 220 }),
        Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 700, duration: 220, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 160, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 8,
      onPanResponderMove: (_, g) => { if (g.dy > 0) translateY.setValue(g.dy); },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 90) onClose();
        else Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
      },
    })
  ).current;

  if (!visible || !item) return null;
  const isGreen = item.type === "green";
  const color = isGreen ? C.green : C.red;
  const bgColor = isGreen ? C.greenBg : C.redBg;
  const sheetW = isTablet ? Math.min(500, width * 0.6) : "100%";

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <Animated.View style={[sh.overlay, { opacity }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />
        <Animated.View
          style={[
            sh.sheet,
            { transform: [{ translateY }], width: sheetW, alignSelf: isTablet ? "center" : "stretch" },
          ]}
        >
          <View {...pan.panHandlers}>
            <View style={sh.handle} />
          </View>

          <View style={[sh.banner, { backgroundColor: bgColor, borderBottomColor: isGreen ? C.greenBorder : C.redBorder }]}>
            <Text style={{ fontSize: 32 }}>{isGreen ? "✅" : "🚩"}</Text>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={[sh.bannerLabel, { color }]}>
                {isGreen ? "Typical Milestone" : "Warning Sign"}
              </Text>
              <Text style={sh.bannerText} numberOfLines={2}>{item.text}</Text>
            </View>
          </View>

          <View style={sh.section}>
            <View style={sh.sectionIconRow}>
              <View style={[sh.sectionIconBox, { backgroundColor: C.accentBg }]}>
                <Text style={{ fontSize: 16 }}>📖</Text>
              </View>
              <Text style={sh.sectionTitle}>What this means</Text>
            </View>
            <Text style={sh.sectionBody}>{item.detail}</Text>
          </View>

          <View style={[sh.tipCard, { backgroundColor: "#FFFBEB", borderColor: "#FDE68A" }]}>
            <View style={sh.sectionIconRow}>
              <View style={[sh.sectionIconBox, { backgroundColor: "#FEF3C7" }]}>
                <Text style={{ fontSize: 16 }}>💡</Text>
              </View>
              <Text style={[sh.sectionTitle, { color: "#92400E" }]}>Practical Tip</Text>
            </View>
            <Text style={[sh.sectionBody, { color: "#78350F" }]}>{item.tip}</Text>
          </View>

          <TouchableOpacity
            style={[sh.closeBtn, { backgroundColor: color }]}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Text style={sh.closeBtnText}>Got it</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

// ─── Summary Bottom Sheet ─────────────────────────────────────────────────────
const SummarySheet = ({
  visible,
  onClose,
  checked,
  ageId,
}: {
  visible: boolean;
  onClose: () => void;
  checked: Record<string, boolean>;
  ageId: string;
}) => {
  const translateY = useRef(new Animated.Value(700)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { height, width } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;

  const items = CHECKLIST[ageId] ?? [];
  const greenItems = items.filter((i) => i.type === "green");
  const redItems = items.filter((i) => i.type === "red");
  const greenDone = greenItems.filter((i) => checked[i.id]).length;
  const redFlagged = redItems.filter((i) => checked[i.id]).length;

  const getRisk = () => {
    if (redFlagged >= 3)
      return { label: "High Concern", color: C.red, emoji: "🔴", sub: "Multiple warning signs observed. Professional evaluation recommended." };
    if (redFlagged >= 1 || greenDone < greenItems.length / 2)
      return { label: "Monitor Closely", color: C.yellow, emoji: "🟡", sub: "Some concerns present. Schedule a check-up with your pediatrician." };
    return { label: "Developing Well", color: C.green, emoji: "🟢", sub: "Great progress! Continue routine developmental monitoring." };
  };
  const risk = getRisk();

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, damping: 20, stiffness: 200 }),
        Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 700, duration: 220, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 160, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 8,
      onPanResponderMove: (_, g) => { if (g.dy > 0) translateY.setValue(g.dy); },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 90) onClose();
        else Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
      },
    })
  ).current;

  if (!visible) return null;
  const sheetW = isTablet ? Math.min(520, width * 0.62) : "100%";
  const ageGroup = AGE_GROUPS.find((a) => a.id === ageId);

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <Animated.View style={[sh.overlay, { opacity }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />
        <Animated.View
          style={[
            sh.sheet,
            { maxHeight: height * (isTablet ? 0.8 : 0.88) },
            { transform: [{ translateY }], width: sheetW, alignSelf: isTablet ? "center" : "stretch" },
          ]}
        >
          <View {...pan.panHandlers}>
            <View style={sh.handle} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={sm.title}>{ageGroup?.range} — Summary</Text>

            <View style={[sm.riskCard, { backgroundColor: risk.color + "12", borderColor: risk.color + "40" }]}>
              <Text style={{ fontSize: 44 }}>{risk.emoji}</Text>
              <Text style={[sm.riskLabel, { color: risk.color }]}>{risk.label}</Text>
              <Text style={sm.riskSub}>{risk.sub}</Text>
            </View>

            <View style={sm.statRow}>
              <View style={[sm.statBox, { backgroundColor: C.greenBg, borderColor: C.greenBorder }]}>
                <Text style={[sm.statNum, { color: C.green }]}>{greenDone}/{greenItems.length}</Text>
                <Text style={sm.statLabel}>Milestones{"\n"}Observed</Text>
              </View>
              <View style={[sm.statBox, { backgroundColor: C.redBg, borderColor: C.redBorder }]}>
                <Text style={[sm.statNum, { color: C.red }]}>{redFlagged}/{redItems.length}</Text>
                <Text style={sm.statLabel}>Warning{"\n"}Signs Noted</Text>
              </View>
            </View>

            <Text style={sm.breakTitle}>Milestones</Text>
            {greenItems.map((item) => (
              <View
                key={item.id}
                style={[sm.breakRow, checked[item.id] && { backgroundColor: C.greenBg, borderColor: C.greenBorder }]}
              >
                <Text style={{ fontSize: 18 }}>{checked[item.id] ? "✅" : "⬜"}</Text>
                <Text style={[sm.breakText, !checked[item.id] && { color: C.muted }]}>{item.text}</Text>
              </View>
            ))}

            <Text style={[sm.breakTitle, { marginTop: 18 }]}>Warning Signs</Text>
            {redItems.map((item) => (
              <View
                key={item.id}
                style={[sm.breakRow, checked[item.id] && { backgroundColor: C.redBg, borderColor: C.redBorder }]}
              >
                <Text style={{ fontSize: 18 }}>{checked[item.id] ? "🚩" : "⬜"}</Text>
                <Text style={[sm.breakText, !checked[item.id] && { color: C.muted }]}>{item.text}</Text>
              </View>
            ))}

            {redFlagged > 0 && (
              <View style={sm.warningBox}>
                <Text style={sm.warningText}>
                  ⚠️ {redFlagged} warning {redFlagged === 1 ? "sign" : "signs"} noted. Discuss with your pediatrician or a developmental specialist soon.
                </Text>
              </View>
            )}

            <Text style={sm.disclaimer}>
              This checklist is for informational purposes only and does not constitute a medical diagnosis.
            </Text>

            <TouchableOpacity
              style={[sm.doneBtn, { backgroundColor: risk.color }]}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text style={sm.doneBtnText}>Close Summary</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────
const TAB_ITEMS = [
  { id: "assessment", label: "Assessment", icon: "📋" },
  { id: "screening", label: "Screening", icon: "🧠" },
  { id: "therapy", label: "Therapy", icon: "🤲" },
  { id: "careplan", label: "Care Plan", icon: "❤️" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const BottomTabBar = ({
  activeTab,
  onTabPress,
}: {
  activeTab: string;
  onTabPress: (id: string) => void;
}) => (
  <View style={tb.container}>
    {TAB_ITEMS.map((tab) => {
      const isActive = tab.id === activeTab;
      return (
        <TouchableOpacity
          key={tab.id}
          style={tb.tab}
          onPress={() => onTabPress(tab.id)}
          activeOpacity={0.7}
        >
          <Text style={[tb.icon, isActive && tb.iconActive]}>{tab.icon}</Text>
          <Text style={[tb.label, isActive && tb.labelActive]}>{tab.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const EarlySignsChecklist = () => {
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;

  const [activeAge, setActiveAge] = useState("12m");
  const [activeTab, setActiveTab] = useState("screening");
  const [checked, setChecked] = useState<Record<string, Record<string, boolean>>>({});
  const [detailItem, setDetailItem] = useState<CheckItem | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);

  const toggle = (ageId: string, itemId: string) => {
    setChecked((prev) => ({
      ...prev,
      [ageId]: { ...(prev[ageId] ?? {}), [itemId]: !(prev[ageId]?.[itemId]) },
    }));
  };

  const currentItems = CHECKLIST[activeAge] ?? [];
  const currentChecked = checked[activeAge] ?? {};
  const greenItems = currentItems.filter((i) => i.type === "green");
  const redItems = currentItems.filter((i) => i.type === "red");
  const greenDone = greenItems.filter((i) => currentChecked[i.id]).length;
  const redFlagged = redItems.filter((i) => currentChecked[i.id]).length;
  const totalDone = Object.values(currentChecked).filter(Boolean).length;

  // ── Item card ──────────────────────────────────────────────────────────────
  const renderItem = (item: CheckItem) => {
    const isChecked = !!currentChecked[item.id];
    const isGreen = item.type === "green";
    const color = isGreen ? C.green : C.red;
    const activeBg = isGreen ? C.greenBg : C.redBg;
    const activeBorder = isGreen ? C.greenBorder : C.redBorder;
    const stripColor = isChecked ? color : isGreen ? C.greenBorder : C.redBorder;

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.78}
        onPress={() => toggle(activeAge, item.id)}
        onLongPress={() => { setDetailItem(item); setDetailVisible(true); }}
        style={[
          s.card,
          isTablet && s.cardTablet,
          isChecked && { backgroundColor: activeBg, borderColor: activeBorder },
        ]}
      >
        {/* Left accent strip — uses borderLeft instead of a child View to avoid layout issues */}
        <View style={[s.strip, { backgroundColor: stripColor }]} />

        {/* Body — flex:1 + minWidth:0 ensures it fills remaining space and wraps correctly */}
        <View style={s.cardBody}>

          {/* Row 1 : pill  +  info button */}
          <View style={s.row1}>
            <View style={[
              s.pill,
              {
                backgroundColor: isChecked ? color + "18" : C.surface,
                borderColor: isChecked ? color + "50" : C.border,
              },
            ]}>
              <Text style={[s.pillText, { color: isChecked ? color : C.muted }]}>
                {isGreen ? "Milestone" : "Warning"}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => { setDetailItem(item); setDetailVisible(true); }}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={[s.infoBtn, { borderColor: isChecked ? color + "40" : C.border }]}
            >
              <Text style={[s.infoBtnTxt, { color: isChecked ? color : C.muted }]}>i</Text>
            </TouchableOpacity>
          </View>

          {/* Row 2 : label text  +  checkbox */}
          <View style={s.row2}>
            <Text
              style={[s.cardText, isChecked && { color: C.text, fontWeight: "700" }]}
              numberOfLines={3}
            >
              {item.text}
            </Text>

            <View style={[s.checkbox, isChecked && { backgroundColor: color, borderColor: color }]}>
              {isChecked && <Text style={s.checkmark}>✓</Text>}
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* ── Navigation bar ── */}


      {/* ── Scroll body ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[s.body, isTablet && s.bodyTablet]}>

          {/* ══ Header card ══ */}
          <View style={s.headerCard}>
            <View style={s.headerTopRow}>

              <View style={s.headerLeft}>
                <View style={s.eyebrowRow}>
                  <View style={s.eyebrowDot} />
                  <Text style={s.eyebrow}>DEVELOPMENTAL SCREENING</Text>
                </View>
                <Text style={s.headerTitle}>Early Signs{"\n"}Checklist</Text>
                <Text style={s.headerSub}>Tap to mark · Long-press for guidance</Text>
              </View>

              <View style={s.counters}>
                <View style={[s.counter, { backgroundColor: C.greenBg, borderColor: C.greenBorder }]}>
                  <Text style={[s.counterNum, { color: C.green }]}>{greenDone}</Text>
                  <Text style={[s.counterLbl, { color: C.green }]}>OK</Text>
                </View>
                <View style={[s.counter, { backgroundColor: C.redBg, borderColor: C.redBorder }]}>
                  <Text style={[s.counterNum, { color: C.red }]}>{redFlagged}</Text>
                  <Text style={[s.counterLbl, { color: C.red }]}>FLAG</Text>
                </View>
              </View>
            </View>

            {/* Progress */}
            <View style={s.progressBlock}>
              <View style={s.progressTitleRow}>
                <Text style={s.progressTxt}>{totalDone} of {currentItems.length} checked</Text>
                <Text style={[s.progressTxt, { color: C.accent }]}>
                  {Math.round((totalDone / Math.max(currentItems.length, 1)) * 100)}%
                </Text>
              </View>

              {/* Two independent tracks — fixes the broken single-track layout */}
              <View style={s.dualTrackRow}>
                <View style={s.trackWrap}>
                  <View style={s.track}>
                    <View style={[s.fill, {
                      backgroundColor: C.green,
                      width: `${(greenDone / Math.max(greenItems.length, 1)) * 100}%`,
                    }]} />
                  </View>
                </View>
                <View style={s.trackWrap}>
                  <View style={s.track}>
                    <View style={[s.fill, {
                      backgroundColor: C.red,
                      width: `${(redFlagged / Math.max(redItems.length, 1)) * 100}%`,
                    }]} />
                  </View>
                </View>
              </View>

              <View style={s.legend}>
                <View style={s.legendItem}>
                  <View style={[s.legendDot, { backgroundColor: C.green }]} />
                  <Text style={s.legendTxt}>Milestones met</Text>
                </View>
                <View style={s.legendItem}>
                  <View style={[s.legendDot, { backgroundColor: C.red }]} />
                  <Text style={s.legendTxt}>Warning flags</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ══ Age tabs ══ */}
          <View style={s.tabRow}>
            {AGE_GROUPS.map((ag) => {
              const isActive = ag.id === activeAge;
              const ageDone = Object.values(checked[ag.id] ?? {}).filter(Boolean).length;
              return (
                <TouchableOpacity
                  key={ag.id}
                  style={[s.tab, isActive && s.tabActive]}
                  onPress={() => setActiveAge(ag.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[s.tabTxt, isActive && s.tabTxtActive]}>{ag.label}</Text>
                  {ageDone > 0 && (
                    <View style={[s.tabBadge, isActive && { backgroundColor: "#fff" }]}>
                      <Text style={[s.tabBadgeTxt, isActive && { color: C.accent }]}>{ageDone}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Age label ── */}
          <View style={s.ageLabelRow}>
            <Text style={s.ageLbl}>{AGE_GROUPS.find((a) => a.id === activeAge)?.range}</Text>
            <View style={s.agePill}>
              <Text style={s.agePillTxt}>{currentItems.length} items</Text>
            </View>
          </View>

          {/* ══ Green section ══ */}
          <View style={s.sectionHead}>
            <View style={[s.sectionBar, { backgroundColor: C.green }]} />
            <Text style={[s.sectionLbl, { color: C.green }]}>Typical Milestones</Text>
            <View style={[s.sectionBadge, { backgroundColor: C.greenBg, borderColor: C.greenBorder }]}>
              <Text style={[s.sectionBadgeTxt, { color: C.green }]}>{greenDone}/{greenItems.length}</Text>
            </View>
          </View>
          <View style={isTablet ? s.gridTwo : s.gridOne}>{greenItems.map(renderItem)}</View>

          {/* ══ Red section ══ */}
          <View style={[s.sectionHead, { marginTop: 24 }]}>
            <View style={[s.sectionBar, { backgroundColor: C.red }]} />
            <Text style={[s.sectionLbl, { color: C.red }]}>Warning Signs</Text>
            <View style={[s.sectionBadge, { backgroundColor: C.redBg, borderColor: C.redBorder }]}>
              <Text style={[s.sectionBadgeTxt, { color: C.red }]}>{redFlagged}/{redItems.length}</Text>
            </View>
          </View>
          <View style={isTablet ? s.gridTwo : s.gridOne}>{redItems.map(renderItem)}</View>

          {/* ══ Summary CTA ══ */}
          <TouchableOpacity
            style={s.summaryBtn}
            onPress={() => setSummaryVisible(true)}
            activeOpacity={0.85}
          >
            <Text style={s.summaryBtnTxt}>View Full Summary  →</Text>
          </TouchableOpacity>

          <Text style={s.hint}>Long-press any item for detailed explanation and tips</Text>
        </View>
      </ScrollView>

      {/* ── Bottom tab bar ── */}
      {/* <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} /> */}

      {/* ── Modals ── */}
      <DetailSheet item={detailItem} visible={detailVisible} onClose={() => setDetailVisible(false)} />
      <SummarySheet visible={summaryVisible} onClose={() => setSummaryVisible(false)} checked={currentChecked} ageId={activeAge} />
    </SafeAreaView>
  );
};

export default EarlySignsChecklist;

// ─── Main Styles ──────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 },
  body: { width: "100%" },
  bodyTablet: { maxWidth: 780, alignSelf: "center" },

  // Nav bar
  navBar: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.border,
    paddingHorizontal: 16, paddingVertical: 13,
  },
  navSide: { width: 44 },
  navTitle: { flex: 1, textAlign: "center", fontSize: 17, fontWeight: "700", color: C.text },
  navIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: C.accentBg, justifyContent: "center", alignItems: "center",
  },

  // Header card
  headerCard: {
    backgroundColor: C.white, borderRadius: 20, borderWidth: 1,
    borderColor: C.border, padding: 18, marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: "#A0B0D8", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12 },
      android: { elevation: 4 },
    }),
  },
  headerTopRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 18 },
  headerLeft: { flex: 1, marginRight: 12 },
  eyebrowRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  eyebrowDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.accent, marginRight: 6 },
  eyebrow: { fontSize: 10, fontWeight: "800", color: C.accent, letterSpacing: 1.2 },
  headerTitle: { fontSize: 26, fontWeight: "900", color: C.text, letterSpacing: -0.8, lineHeight: 32, marginBottom: 6 },
  headerSub: { fontSize: 12, color: C.muted },

  counters: { gap: 8 },
  counter: { width: 60, paddingVertical: 10, borderRadius: 14, borderWidth: 1.5, alignItems: "center" },
  counterNum: { fontSize: 20, fontWeight: "900" },
  counterLbl: { fontSize: 10, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.4 },

  // Progress
  progressBlock: { gap: 6 },
  progressTitleRow: { flexDirection: "row", justifyContent: "space-between" },
  progressTxt: { fontSize: 12, fontWeight: "700", color: C.muted },
  dualTrackRow: { flexDirection: "row", gap: 6 },
  trackWrap: { flex: 1 },
  track: { height: 8, backgroundColor: C.surface, borderRadius: 4, overflow: "hidden" },
  fill: { height: 8, borderRadius: 4 },
  legend: { flexDirection: "row", gap: 14 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendTxt: { fontSize: 11, color: C.muted, fontWeight: "600" },

  // Tabs
  tabRow: {
    flexDirection: "row", backgroundColor: C.white, borderRadius: 16,
    padding: 4, gap: 4, marginBottom: 14,
    borderWidth: 1, borderColor: C.border,
    ...Platform.select({
      ios: { shadowColor: "#A0B0D8", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 5 },
  tabActive: { backgroundColor: C.accent },
  tabTxt: { fontSize: 13, fontWeight: "700", color: C.muted },
  tabTxtActive: { color: "#fff" },
  tabBadge: { width: 18, height: 18, borderRadius: 9, backgroundColor: C.accent + "22", justifyContent: "center", alignItems: "center" },
  tabBadgeTxt: { fontSize: 10, fontWeight: "800", color: C.accent },

  ageLabelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  ageLbl: { fontSize: 14, fontWeight: "800", color: C.text },
  agePill: { backgroundColor: C.accentBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  agePillTxt: { fontSize: 11, fontWeight: "700", color: C.accent },

  sectionHead: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sectionBar: { width: 4, height: 18, borderRadius: 2 },
  sectionLbl: { flex: 1, fontSize: 12, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.7 },
  sectionBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, borderWidth: 1 },
  sectionBadgeTxt: { fontSize: 12, fontWeight: "800" },

  gridOne: { gap: 10 },
  gridTwo: { flexDirection: "row", flexWrap: "wrap", gap: 10 },

  // ── Card — all right-side fixes are here ──────────────────────────────────
  card: {
    flexDirection: "row",
    backgroundColor: C.white,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.border,
    // REMOVED overflow:"hidden" — it was clipping the checkbox on the right
    ...Platform.select({
      ios: { shadowColor: "#A0B0D8", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  // On tablet: two-column grid — each card is ~48.5% to leave room for the gap
  cardTablet: { width: "48.5%" },

  strip: {
    width: 5,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    flexShrink: 0,          // never compress the strip
  },

  cardBody: {
    flex: 1,
    padding: 12,
    minWidth: 0,            // KEY: allows flex children to shrink & wrap properly
  },

  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  pill: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 6, borderWidth: 1,
    flexShrink: 1,          // pill shrinks so it never pushes the info btn off screen
  },
  pillText: { fontSize: 10, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.4 },

  infoBtn: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 1, backgroundColor: C.surface,
    justifyContent: "center", alignItems: "center",
    flexShrink: 0,          // info button never shrinks
    marginLeft: 8,
  },
  infoBtnTxt: { fontSize: 12, fontWeight: "900" },

  row2: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  cardText: {
    flex: 1,
    fontSize: 13, color: C.muted, fontWeight: "600", lineHeight: 19,
    minWidth: 0,            // KEY: prevents text node from overflowing its flex container
  },

  checkbox: {
    width: 24, height: 24, borderRadius: 7,
    borderWidth: 2, borderColor: C.border, backgroundColor: C.surface,
    justifyContent: "center", alignItems: "center",
    flexShrink: 0,          // checkbox NEVER shrinks — always fully visible
  },
  checkmark: { fontSize: 11, color: "#fff", fontWeight: "800" },

  // Summary
  summaryBtn: {
    marginTop: 28, backgroundColor: C.accent,
    paddingVertical: 18, paddingHorizontal: 24, borderRadius: 18, alignItems: "center",
    ...Platform.select({
      ios: { shadowColor: C.accent, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.28, shadowRadius: 12 },
      android: { elevation: 6 },
    }),
  },
  summaryBtnTxt: { color: "#fff", fontWeight: "800", fontSize: 16 },
  hint: { textAlign: "center", fontSize: 11, color: C.subtle, marginTop: 14, marginBottom: 4 },
});

// ─── Sheet Styles ─────────────────────────────────────────────────────────────
const sh = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(10,14,40,0.45)", justifyContent: "flex-end" },
  sheet: {
    backgroundColor: C.white, borderTopLeftRadius: 28, borderTopRightRadius: 28,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 18 },
      android: { elevation: 24 },
    }),
  },
  handle: { width: 40, height: 4, backgroundColor: C.border, borderRadius: 2, alignSelf: "center", marginTop: 14, marginBottom: 8 },
  banner: { flexDirection: "row", alignItems: "center", padding: 20, borderBottomWidth: 1, marginBottom: 6 },
  bannerLabel: { fontSize: 11, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 },
  bannerText: { fontSize: 16, fontWeight: "800", color: C.text, lineHeight: 22 },
  section: { marginHorizontal: 20, marginVertical: 12 },
  sectionIconRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  sectionIconBox: { width: 34, height: 34, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  sectionTitle: { fontSize: 13, fontWeight: "800", color: C.text, textTransform: "uppercase", letterSpacing: 0.6 },
  sectionBody: { fontSize: 14, color: C.muted, lineHeight: 22 },
  tipCard: { marginHorizontal: 20, marginBottom: 24, padding: 16, borderRadius: 14, borderWidth: 1 },
  closeBtn: { marginHorizontal: 20, marginBottom: 40, padding: 16, borderRadius: 16, alignItems: "center" },
  closeBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});

// ─── Summary Sheet Styles ─────────────────────────────────────────────────────
const sm = StyleSheet.create({
  title: { fontSize: 17, fontWeight: "800", color: C.text, marginHorizontal: 20, marginBottom: 16 },
  riskCard: { alignItems: "center", marginHorizontal: 20, marginBottom: 20, paddingVertical: 26, borderRadius: 20, borderWidth: 2, gap: 8 },
  riskLabel: { fontSize: 22, fontWeight: "900" },
  riskSub: { fontSize: 13, color: C.muted, textAlign: "center", paddingHorizontal: 20, lineHeight: 20 },
  statRow: { flexDirection: "row", gap: 12, marginHorizontal: 20, marginBottom: 24 },
  statBox: { flex: 1, alignItems: "center", paddingVertical: 18, borderRadius: 18, borderWidth: 1.5 },
  statNum: { fontSize: 30, fontWeight: "900" },
  statLabel: { fontSize: 11, color: C.muted, textAlign: "center", marginTop: 4, lineHeight: 16 },
  breakTitle: { fontSize: 11, fontWeight: "800", color: C.muted, textTransform: "uppercase", letterSpacing: 0.8, marginHorizontal: 20, marginBottom: 10 },
  breakRow: { flexDirection: "row", alignItems: "center", gap: 12, marginHorizontal: 20, marginBottom: 8, backgroundColor: C.surface, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: C.border },
  breakText: { flex: 1, fontSize: 13, color: C.text, fontWeight: "600", lineHeight: 18 },
  warningBox: { marginHorizontal: 20, marginTop: 18, backgroundColor: "#FEF9EC", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#FDE68A" },
  warningText: { fontSize: 13, color: "#92400E", lineHeight: 20 },
  disclaimer: { textAlign: "center", fontSize: 11, color: C.subtle, marginHorizontal: 24, marginTop: 16, marginBottom: 4, lineHeight: 16 },
  doneBtn: { marginHorizontal: 20, marginTop: 16, padding: 16, borderRadius: 16, alignItems: "center" },
  doneBtnTxt: { color: "#fff", fontWeight: "800", fontSize: 15 },
});

// ─── Bottom Tab Bar Styles ────────────────────────────────────────────────────
const tb = StyleSheet.create({
  container: {
    flexDirection: "row", backgroundColor: C.white,
    borderTopWidth: 1, borderTopColor: C.border,
    paddingTop: 10, paddingBottom: Platform.OS === "ios" ? 24 : 10,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 12 },
    }),
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3 },
  icon: { fontSize: 20, opacity: 0.35 },
  iconActive: { opacity: 1 },
  label: { fontSize: 10, fontWeight: "600", color: C.muted },
  labelActive: { color: C.accent, fontWeight: "800" },
});