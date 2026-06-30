import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
  PermissionsAndroid,
} from "react-native";
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import Icon from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";

import navigationOptions from "./CareScreen.navigationOptions";

const AICompanionScreen = () => {
  // --- States ---
  const [isListening, setIsListening] = useState(false);
  const [pitch, setPitch] = useState(0); // Simulated for UI feedback
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("Hi! I noticed your vocal rhythm shifted. How are you feeling?");
  const [vocalTension, setVocalTension] = useState(12); // Mocked data from VoiceSense EMR logic

  // --- Animation Refs ---
  const rbSheet = useRef<any>();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Initialize Voice Listeners
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechError = (e: SpeechErrorEvent) => console.log("Speech Error:", e);
    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value) setTranscript(e.value[0]);
    };
    // Visualizer simulation while listening
    Voice.onSpeechVolumeChanged = (e: any) => setPitch(e.value);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // --- Actions ---
  const startListening = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }
      setTranscript("");
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      // Simulate "Memory Logic" intervention after speech
      if (vocalTension > 10) {
        rbSheet.current.open();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Header: Emotional Context */}
    

      <ScrollView contentContainerStyle={styles.mainContent}>
        {/* 2. VoiceSense Logic Alert */}
        <View style={styles.insightCard}>
          <View style={styles.insightIconWrap}>
            <Icon name="pulse" size={20} color="#6C5CE7" />
          </View>
          <View>
            <Text style={styles.insightTitle}>Vocal Tension: {vocalTension}% High</Text>
            <Text style={styles.insightSub}>Detected during your last 3 sentences.</Text>
          </View>
        </View>

        {/* 3. Conversation Thread */}
        <View style={styles.messageRow}>
          <View style={styles.aiAvatar}>
            <Icon name="sparkles" size={18} color="#FFF" />
          </View>
          <View style={styles.aiBubble}>
            <Text style={styles.aiText}>{aiResponse}</Text>
          </View>
        </View>

        {isListening && (
          <View style={styles.userBubble}>
            <Text style={styles.userText}>{transcript || "..."}</Text>
          </View>
        )}
      </ScrollView>

      {/* 4. The Interaction Core */}
      <View style={styles.interactionZone}>
        <View style={styles.visualizerRow}>
            {/* Visual feedback bars */}
            {[1, 2, 3, 4, 5].map((i) => (
              <View 
                key={i} 
                style={[styles.waveBar, { height: isListening ? 10 + (pitch * (i * 2)) : 4 }]} 
              />
            ))}
        </View>

        <TouchableOpacity 
          activeOpacity={0.8}
          onPressIn={startListening}
          onPressOut={stopListening}
          style={[styles.micButton, isListening && styles.micButtonActive]}
        >
          <Icon name={isListening ? "mic" : "mic-outline"} size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.hintText}>Hold to talk, release to analyze</Text>
      </View>

      {/* 5. Well-Being RBSheet (Contextual Intervention) */}
      <RBSheet
        ref={rbSheet}
        height={320}
        customStyles={{ container: styles.sheet }}
      >
        <View style={styles.sheetInner}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Emotional Pivot Detected</Text>
          <Text style={styles.sheetDesc}>
            Your voice frequency suggests fatigue. Based on your "Work Transition" memory, shall we pause?
          </Text>

          <TouchableOpacity style={styles.actionBtn}>
            <Icon name="leaf" size={20} color="#FFF" style={{ marginRight: 10 }} />
            <Text style={styles.actionBtnText}>Start 2-Min Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]} onPress={() => rbSheet.current.close()}>
            <Text style={styles.actionBtnTextSec}>I'm okay, just keep listening</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backBtn: { padding: 8, backgroundColor: "#F1F2F6", borderRadius: 12 },
  badgeContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#F1F2F6", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusText: { fontSize: 12, fontWeight: "700", color: "#2F3542" },

  mainContent: { paddingHorizontal: 24, paddingTop: 10 },
  insightCard: {
    flexDirection: "row",
    backgroundColor: "#F8F7FF",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 30,
    marginTop:60,
    borderWidth: 1,
    borderColor: "#EBE9FF",
  },
  insightIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", marginRight: 15, elevation: 2 },
  insightTitle: { fontSize: 15, fontWeight: "700", color: "#2D3436" },
  insightSub: { fontSize: 12, color: "#636E72" },

  messageRow: { flexDirection: "row", marginBottom: 20 },
  aiAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#6C5CE7", justifyContent: "center", alignItems: "center", marginRight: 12 },
  aiBubble: { backgroundColor: "#F1F2F6", padding: 16, borderRadius: 20, borderTopLeftRadius: 4, flexShrink: 1 },
  aiText: { fontSize: 16, color: "#2D3436", lineHeight: 22 },

  userBubble: { alignSelf: "flex-end", backgroundColor: "#6C5CE7", padding: 16, borderRadius: 20, borderBottomRightRadius: 4, maxWidth: "80%", marginTop: 10 },
  userText: { color: "#FFF", fontSize: 16 },

  interactionZone: { paddingBottom: 50, alignItems: "center" },
  visualizerRow: { flexDirection: "row", height: 40, alignItems: "center", marginBottom: 20 },
  waveBar: { width: 4, backgroundColor: "#6C5CE7", borderRadius: 2, marginHorizontal: 2 },
  micButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#1E272E", justifyContent: "center", alignItems: "center", elevation: 8 },
  micButtonActive: { backgroundColor: "#FF4757", transform: [{ scale: 1.1 }] },
  hintText: { marginTop: 15, fontSize: 12, color: "#A4B0BE", fontWeight: "600" },

  sheet: { borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 24 },
  sheetInner: { alignItems: "center", width: "100%" },
  sheetHandle: { width: 40, height: 4, backgroundColor: "#E0E0E0", borderRadius: 2, marginTop: 10, marginBottom: 20 },
  sheetTitle: { fontSize: 20, fontWeight: "800", color: "#1E272E" },
  sheetDesc: { textAlign: "center", color: "#57606F", marginVertical: 15, lineHeight: 20 },
  actionBtn: { width: "100%", height: 55, backgroundColor: "#6C5CE7", borderRadius: 16, flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 },
  actionBtnText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  actionBtnSecondary: { backgroundColor: "transparent", marginTop: 5 },
  actionBtnTextSec: { color: "#A4B0BE", fontWeight: "600" },
});
AICompanionScreen.navigationOptions = navigationOptions;


export default AICompanionScreen;