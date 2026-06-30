import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  StatusBar,
  SafeAreaView,
  TextInput,
  Dimensions,
  FlatList,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons, Feather } from "@expo/vector-icons";

import navigationOptions from "./DoctorAssessment.navigationOptions";

const { width } = Dimensions.get("window");

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg: "#F5F0FF",
  white: "#FFFFFF",
  card: "#FFFFFF",
  border: "#EDE8FF",
  text: "#1A1035",
  muted: "#8B82A7",
  subtle: "#EDE8FF",
  violet: "#7C3AED",
  violetLight: "#EDE9FE",
  pink: "#EC4899",
  pinkLight: "#FCE7F3",
  red: "#F43F5E",
  green: "#10B981",
  greenLight: "#D1FAE5",
};

const EMOTIONS = {
  Calm: { color: "#0EA5E9", bg: "#E0F2FE", icon: "leaf-outline" },
  Reflective: { color: "#7C3AED", bg: "#EDE9FE", icon: "moon-outline" },
  Energized: { color: "#10B981", bg: "#D1FAE5", icon: "flash-outline" },
  Overwhelmed: { color: "#F97316", bg: "#FFF0E6", icon: "water-outline" },
  Excited: { color: "#EC4899", bg: "#FCE7F3", icon: "star-outline" },
};

const MOCK_LOGS = [
  {
    id: "1",
    emotion: "Reflective",
    preview: "Today I realized that the way I approach problems has changed significantly over the last few months...",
    duration: "1:42",
    timestamp: "Today, 9:14 AM",
  },
  {
    id: "2",
    emotion: "Energized",
    preview: "Just finished my morning run and feeling absolutely unstoppable. The endorphins are real!",
    duration: "0:58",
    timestamp: "Today, 7:30 AM",
  },
  {
    id: "3",
    emotion: "Calm",
    preview: "The evening was quiet. I sat by the window watching the rain fall slowly onto the pavement...",
    duration: "2:15",
    timestamp: "Yesterday, 8:55 PM",
  },
  {
    id: "4",
    emotion: "Overwhelmed",
    preview: "There are too many things competing for my attention and I need to sort through them one by one...",
    duration: "1:20",
    timestamp: "Yesterday, 3:10 PM",
  },
  {
    id: "5",
    emotion: "Excited",
    preview: "Got the call I was waiting for! Everything is finally coming together in the most beautiful way.",
    duration: "0:45",
    timestamp: "2 days ago, 5:22 PM",
  },
];

// ─── WAVEFORM ─────────────────────────────────────────────────────────────────
const Waveform = ({ isRecording }) => {
  const bars = 22;
  const anims = useRef(Array.from({ length: bars }, () => new Animated.Value(0.15))).current;

  useEffect(() => {
    if (isRecording) {
      const animations = anims.map((anim, i) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(i * 50),
            Animated.timing(anim, {
              toValue: 0.2 + Math.random() * 0.8,
              duration: 280 + Math.random() * 280,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.15,
              duration: 280 + Math.random() * 280,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        )
      );
      Animated.parallel(animations).start();
    } else {
      anims.forEach(anim => anim.setValue(0.15));
    }
    return () => anims.forEach(a => a.stopAnimation());
  }, [isRecording]);

  const barColors = [
    "#7C3AED", "#8B47F0", "#9A54F3", "#A861F6", "#B66EF9",
    "#C47BFC", "#D088FF", "#EC4899", "#F472B6", "#F97316",
    "#FB923C", "#FBBF24", "#10B981", "#34D399", "#0EA5E9",
    "#38BDF8", "#7C3AED", "#EC4899", "#10B981", "#F97316",
    "#7C3AED", "#EC4899",
  ];

  return (
    <View style={styles.waveform}>
      {anims.map((anim, i) => (
        <Animated.View
          key={i}
          style={[
            styles.waveBar,
            {
              transform: [{ scaleY: anim }],
              backgroundColor: isRecording ? barColors[i % barColors.length] : C.border,
              opacity: isRecording ? 1 : 0.7,
            },
          ]}
        />
      ))}
    </View>
  );
};

// ─── MIC BUTTON ──────────────────────────────────────────────────────────────
const MicButton = ({ isRecording, onPress }) => {
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;
  const recScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isRecording) {
      recScale.setValue(1);
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse1, { toValue: 1.28, duration: 1200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulse1, { toValue: 1, duration: 1200, useNativeDriver: true }),
        ])
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.delay(600),
          Animated.timing(pulse2, { toValue: 1.5, duration: 1200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulse2, { toValue: 1, duration: 1200, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulse1.setValue(1);
      pulse2.setValue(1);
      Animated.loop(
        Animated.sequence([
          Animated.timing(recScale, { toValue: 1.07, duration: 400, useNativeDriver: true }),
          Animated.timing(recScale, { toValue: 1, duration: 400, useNativeDriver: true }),
        ])
      ).start();
    }
    return () => {
      pulse1.stopAnimation();
      pulse2.stopAnimation();
      recScale.stopAnimation();
    };
  }, [isRecording]);

  return (
    <View style={styles.micOuter}>
      {!isRecording ? (
        <>
          <Animated.View style={[styles.pulseRing, { width: 150, height: 150, borderRadius: 75, backgroundColor: "#EC489922", transform: [{ scale: pulse2 }] }]} />
          <Animated.View style={[styles.pulseRing, { width: 126, height: 126, borderRadius: 63, backgroundColor: "#7C3AED33", transform: [{ scale: pulse1 }] }]} />
        </>
      ) : (
        <Animated.View style={[styles.pulseRing, { width: 130, height: 130, borderRadius: 65, backgroundColor: "#F43F5E22", transform: [{ scale: recScale }] }]} />
      )}

      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <Animated.View style={[
          styles.micButton,
          isRecording && { backgroundColor: C.red },
          { transform: [{ scale: isRecording ? recScale : 1 }] },
        ]}>
          <Ionicons name={isRecording ? "stop" : "mic"} size={40} color="#fff" />
        </Animated.View>
      </TouchableOpacity>

      <Text style={[styles.micHint, isRecording && { color: C.red }]}>
        {isRecording ? "● Recording..." : "Tap to speak"}
      </Text>
    </View>
  );
};

// ─── EMOTION BADGE ────────────────────────────────────────────────────────────
const EmotionBadge = ({ emotion, size = "sm" }) => {
  const e = EMOTIONS[emotion] || EMOTIONS.Calm;
  return (
    <View style={[styles.badge, { backgroundColor: e.bg }]}>
      <Ionicons name={e.icon} size={size === "lg" ? 14 : 11} color={e.color} />
      <Text style={[styles.badgeText, { color: e.color, fontSize: size === "lg" ? 13 : 11 }]}>
        {emotion}
      </Text>
    </View>
  );
};

// ─── LOG ITEM ─────────────────────────────────────────────────────────────────
const LogItem = ({ item, onPlay }) => {
  const e = EMOTIONS[item.emotion] || EMOTIONS.Calm;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start()}
        onPress={() => onPlay(item)}
        activeOpacity={1}
      >
        <View style={[styles.logCard, { borderLeftWidth: 4, borderLeftColor: e.color }]}>
          <View style={[styles.logIcon, { backgroundColor: e.bg }]}>
            <Ionicons name={e.icon} size={22} color={e.color} />
          </View>
          <View style={styles.logContent}>
            <View style={styles.logHeader}>
              <EmotionBadge emotion={item.emotion} />
              <View style={styles.logDurRow}>
                <Ionicons name="time-outline" size={11} color={C.muted} />
                <Text style={styles.logDur}>{item.duration}</Text>
              </View>
            </View>
            <Text style={styles.logPreview} numberOfLines={2}>{item.preview}</Text>
            <View style={styles.logFooter}>
              <Text style={styles.logTimestamp}>{item.timestamp}</Text>
              <TouchableOpacity style={[styles.playPill, { backgroundColor: e.bg }]} onPress={() => onPlay(item)}>
                <Ionicons name="play" size={11} color={e.color} />
                <Text style={[styles.playPillText, { color: e.color }]}>Play</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── EMOTION SELECTOR ─────────────────────────────────────────────────────────
const EmotionSelector = ({ selected, onSelect }) => (
  <View style={styles.emotionRow}>
    {Object.keys(EMOTIONS).map(key => {
      const e = EMOTIONS[key];
      const active = selected === key;
      return (
        <TouchableOpacity
          key={key}
          onPress={() => onSelect(key)}
          style={[
            styles.emotionChip,
            active
              ? { backgroundColor: e.color, borderColor: e.color }
              : { backgroundColor: e.bg, borderColor: e.bg },
          ]}
        >
          <Ionicons name={e.icon} size={13} color={active ? "#fff" : e.color} />
          <Text style={[styles.emotionChipText, { color: active ? "#fff" : e.color }]}>{key}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

// ─── STATS ────────────────────────────────────────────────────────────────────
const StatsRow = ({ count }) => (
  <View style={styles.statsRow}>
    {[
      { num: count, label: "Entries", color: C.violet, bg: C.violetLight },
      { num: "7", label: "Day Streak 🔥", color: C.pink, bg: C.pinkLight },
      { num: "12m", label: "Avg Length", color: C.green, bg: C.greenLight },
    ].map(s => (
      <View key={s.label} style={[styles.statCard, { backgroundColor: s.bg }]}>
        <Text style={[styles.statNum, { color: s.color }]}>{s.num}</Text>
        <Text style={[styles.statLabel, { color: s.color }]}>{s.label}</Text>
      </View>
    ))}
  </View>
);

// ─── MAIN SCREEN ──────────────────────────────────────────────────────────────
const VoiceJournalScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [logs, setLogs] = useState(MOCK_LOGS);
  const [selectedEmotion, setSelectedEmotion] = useState("Reflective");
  const [transcription, setTranscription] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);
  const recordSheet = useRef(null);
  const detailsSheet = useRef(null);
  const headerOp = useRef(new Animated.Value(0)).current;
  const headerY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOp, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(headerY, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.2)), useNativeDriver: true }),
    ]).start();
  }, []);

  const handleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscription("");
    } else {
      setIsRecording(false);
      setTranscription("Today I'm feeling a sense of clarity I haven't had in a while. The morning brought unexpected peace and I wanted to capture this moment before it slips away into the busy day ahead.");
      setTimeout(() => recordSheet.current?.open(), 200);
    }
  };

  const handleSave = () => {
    setLogs([{
      id: Date.now().toString(),
      emotion: selectedEmotion,
      preview: transcription,
      duration: "0:" + Math.floor(Math.random() * 59).toString().padStart(2, "0"),
      timestamp: "Just now",
    }, ...logs]);
    setTranscription("");
    recordSheet.current?.close();
  };

  const handlePlay = (log) => {
    setSelectedLog(log);
    detailsSheet.current?.open();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* Decorative blobs */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />
      <View style={styles.blob3} />

      <View style={styles.container}>

        {/* HEADER */}
        <Animated.View style={[styles.header, { opacity: headerOp, transform: [{ translateY: headerY }] }]}>
          <View>
            <Text style={styles.title}>Voice Journal</Text>
            <Text style={styles.subtitle}>Speak freely. Reflect deeply. ✨</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>YO</Text>
          </View>
        </Animated.View>

        {/* STATS */}
        <StatsRow count={logs.length} />

        {/* MIC CARD */}
        <View style={styles.micCard}>
          <Waveform isRecording={isRecording} />
          <MicButton isRecording={isRecording} onPress={handleMic} />
        </View>

        {/* MOOD */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Current Mood</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <EmotionSelector selected={selectedEmotion} onSelect={setSelectedEmotion} />
          </ScrollView>
        </View>

        {/* LOGS */}
        <View style={styles.logsSection}>
          <View style={styles.logsTitleRow}>
            <Text style={styles.sectionLabel}>Recent Entries</Text>
            <View style={styles.countPill}>
              <Text style={styles.countText}>{logs.length} entries</Text>
            </View>
          </View>
          <FlatList
            data={logs}
            keyExtractor={i => i.id}
            renderItem={({ item }) => <LogItem item={item} onPlay={handlePlay} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </View>

      {/* ════ SAVE SHEET ════ */}
      <RBSheet
        ref={recordSheet}
        height={530}
        openDuration={300}
        customStyles={{ container: styles.sheet, draggableIcon: styles.dragIcon }}
        draggable
      >
        <View style={[styles.sheetTopStrip, { backgroundColor: C.violet }]} />
        <View style={styles.sheetInner}>
          <Text style={styles.sheetTitle}>New Entry 🎙</Text>
          <Text style={styles.sheetSub}>Your voice has been captured!</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.sheetLabel}>AI Detected Mood</Text>
            <EmotionBadge emotion={selectedEmotion} size="lg" />
          </View>

          <View style={styles.transcriptBox}>
            <TextInput
              style={styles.transcriptInput}
              multiline
              value={transcription}
              onChangeText={setTranscription}
              placeholderTextColor={C.muted}
              placeholder="Your transcription appears here..."
              selectionColor={C.violet}
            />
          </View>

          <Text style={[styles.sheetLabel, { marginBottom: 10 }]}>Change Mood</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 22 }}>
            <EmotionSelector selected={selectedEmotion} onSelect={setSelectedEmotion} />
          </ScrollView>

          <View style={styles.sheetActions}>
            <TouchableOpacity style={styles.discardBtn} onPress={() => recordSheet.current?.close()}>
              <Feather name="trash-2" size={16} color={C.muted} />
              <Text style={styles.discardText}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Ionicons name="bookmark" size={16} color="#fff" />
              <Text style={styles.saveText}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      {/* ════ PLAYBACK SHEET ════ */}
      <RBSheet
        ref={detailsSheet}
        height={410}
        openDuration={300}
        customStyles={{ container: styles.sheet, draggableIcon: styles.dragIcon }}
        draggable
      >
        {selectedLog && (() => {
          const e = EMOTIONS[selectedLog.emotion] || EMOTIONS.Calm;
          return (
            <>
              <View style={[styles.sheetTopStrip, { backgroundColor: e.color }]} />
              <View style={styles.sheetInner}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.sheetTitle}>Playback 🎧</Text>
                    <Text style={styles.sheetSub}>{selectedLog.timestamp}</Text>
                  </View>
                  <EmotionBadge emotion={selectedLog.emotion} size="lg" />
                </View>

                {/* Player */}
                <View style={[styles.playerCard, { backgroundColor: e.bg }]}>
                  <TouchableOpacity style={[styles.bigPlayCircle, { backgroundColor: e.color }]}>
                    <Ionicons name="play" size={26} color="#fff" />
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <View style={[styles.progBar, { backgroundColor: e.color + "33" }]}>
                      <View style={[styles.progFill, { backgroundColor: e.color, width: "38%" }]} />
                      <View style={[styles.progDot, { backgroundColor: e.color, left: "36%" }]} />
                    </View>
                    <View style={styles.progTimes}>
                      <Text style={[styles.timeText, { color: e.color }]}>0:38</Text>
                      <Text style={[styles.timeText, { color: e.color }]}>{selectedLog.duration}</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.transcriptBox, { marginTop: 14 }]}>
                  <Text style={styles.transcriptRead}>{selectedLog.preview}</Text>
                </View>

                <View style={styles.sheetActions}>
                  <TouchableOpacity style={styles.discardBtn} onPress={() => detailsSheet.current?.close()}>
                    <Text style={styles.discardText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.saveBtn, { backgroundColor: e.color }]}>
                    <Feather name="share-2" size={14} color="#fff" />
                    <Text style={styles.saveText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        })()}
      </RBSheet>
    </SafeAreaView>
  );
}

VoiceJournalScreen.navigationOptions = navigationOptions;


export default VoiceJournalScreen;

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  container: { flex: 1, paddingHorizontal: 20 },

  blob1: { position: "absolute", width: 240, height: 240, borderRadius: 120, backgroundColor: "#C4B5FD44", top: -80, right: -80 },
  blob2: { position: "absolute", width: 180, height: 180, borderRadius: 90, backgroundColor: "#FBCFE855", top: 100, left: -80 },
  blob3: { position: "absolute", width: 140, height: 140, borderRadius: 70, backgroundColor: "#A7F3D044", bottom: 180, right: -40 },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 16, paddingBottom: 16 },
  title: { fontSize: 30, fontWeight: "800", color: C.text, letterSpacing: -0.8 },
  subtitle: { fontSize: 13, color: C.muted, marginTop: 3, fontWeight: "500" },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: C.violet, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontWeight: "800", fontSize: 14 },

  statsRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  statCard: { flex: 1, borderRadius: 16, paddingVertical: 12, alignItems: "center", justifyContent: "center" },
  statNum: { fontSize: 22, fontWeight: "800" },
  statLabel: { fontSize: 11, fontWeight: "600", marginTop: 2, textAlign: "center" },

  micCard: {
    alignItems: "center",
    backgroundColor: C.white,
    borderRadius: 28,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 5,
  },
  waveform: { flexDirection: "row", alignItems: "center", height: 56, gap: 3, marginBottom: 22 },
  waveBar: { width: 3.5, height: 44, borderRadius: 2 },

  micOuter: { alignItems: "center", marginBottom: 4 },
  pulseRing: { position: "absolute" },
  micButton: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: C.violet,
    alignItems: "center", justifyContent: "center",
    shadowColor: C.violet,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 12,
  },
  micHint: { marginTop: 14, fontSize: 13, color: C.muted, fontWeight: "600" },

  section: { marginBottom: 14 },
  sectionLabel: { fontSize: 13, fontWeight: "700", color: C.text, letterSpacing: 0.4, marginBottom: 10 },

  emotionRow: { flexDirection: "row", gap: 8, paddingBottom: 4, paddingRight: 20 },
  emotionChip: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 24, borderWidth: 1.5 },
  emotionChipText: { fontSize: 12, fontWeight: "700" },

  badge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  badgeText: { fontWeight: "700" },

  logsSection: { flex: 1 },
  logsTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  countPill: { backgroundColor: C.violetLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  countText: { fontSize: 12, fontWeight: "600", color: C.violet },

  logCard: { flexDirection: "row", backgroundColor: C.white, borderRadius: 20, padding: 14, gap: 12, shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 12, elevation: 3 },
  logIcon: { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  logContent: { flex: 1 },
  logHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  logDurRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  logDur: { fontSize: 11, color: C.muted, fontWeight: "500" },
  logPreview: { fontSize: 13, color: C.text, lineHeight: 19, opacity: 0.75 },
  logFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  logTimestamp: { fontSize: 11, color: C.muted },
  playPill: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  playPillText: { fontSize: 11, fontWeight: "700" },

  sheet: { backgroundColor: C.white, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  dragIcon: { backgroundColor: "#E5E7EB", width: 36 },
  sheetTopStrip: { height: 5, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  sheetInner: { paddingHorizontal: 24, paddingTop: 18, paddingBottom: 16, flex: 1 },
  sheetTitle: { fontSize: 22, fontWeight: "800", color: C.text, marginBottom: 2 },
  sheetSub: { fontSize: 13, color: C.muted, marginBottom: 18, fontWeight: "500" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sheetLabel: { fontSize: 12, color: C.muted, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.8 },

  transcriptBox: { backgroundColor: C.bg, borderRadius: 16, padding: 14, marginBottom: 14, minHeight: 80, borderWidth: 1.5, borderColor: C.border },
  transcriptInput: { color: C.text, fontSize: 14, lineHeight: 22 },
  transcriptRead: { color: C.text, fontSize: 14, lineHeight: 22, opacity: 0.85 },

  sheetActions: { flexDirection: "row", gap: 12, marginTop: 4 },
  discardBtn: { flex: 1, height: 52, borderRadius: 16, backgroundColor: C.bg, borderWidth: 1.5, borderColor: C.border, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  discardText: { color: C.muted, fontWeight: "700", fontSize: 14 },
  saveBtn: { flex: 2, height: 52, borderRadius: 16, backgroundColor: C.violet, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, shadowColor: C.violet, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 14, elevation: 6 },
  saveText: { color: "#fff", fontWeight: "800", fontSize: 15 },

  playerCard: { borderRadius: 20, padding: 16, flexDirection: "row", alignItems: "center", gap: 16, marginTop: 4 },
  bigPlayCircle: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.15, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 4 },
  progBar: { height: 6, borderRadius: 3, marginBottom: 6, position: "relative" },
  progFill: { height: "100%", borderRadius: 3 },
  progDot: { position: "absolute", top: -5, width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: "#fff" },
  progTimes: { flexDirection: "row", justifyContent: "space-between" },
  timeText: { fontSize: 11, fontWeight: "600" },
});