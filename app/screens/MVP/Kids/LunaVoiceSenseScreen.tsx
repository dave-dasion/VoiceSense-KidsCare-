import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
    ScrollView, Animated, Dimensions, StatusBar, Image, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// ─── Voice Prompts ─────────────────────────────────────────────────
const VOICE_PROMPTS = [
    { q: "Tell me what makes you really happy today! 🌟", wellness: 'mood' },
    { q: "Did anything feel scary or hard this week? 💙", wellness: 'stress' },
    { q: "Who do you love spending time with? 👫", wellness: 'social' },
    { q: "What do you love to do just for fun? 🎉", wellness: 'interests' },
    { q: "How is your tummy feeling today — big or small butterflies? 🦋", wellness: 'anxiety' },
];

const DEMO_RESPONSES = [
    "I am so happy because I got to play with my friends and we laughed so much today",
    "Sometimes school feels a little scary but mostly I feel okay and safe",
    "I love spending time with my mum and my best friend Lily we play together every day",
    "I love dancing and singing and drawing pictures of unicorns and magical animals",
    "My tummy feels fine today I am not worried about anything I feel safe and calm",
];

// ─── Interest Categories ───────────────────────────────────────────
const INTERESTS = [
    { key: 'music', emoji: '🎵', label: 'Music & Dance', color: '#f472b6', keywords: ['sing', 'song', 'music', 'dance', 'rhythm', 'instrument', 'beat', 'melody'] },
    { key: 'art', emoji: '🎨', label: 'Art & Drawing', color: '#fb7185', keywords: ['draw', 'paint', 'color', 'picture', 'craft', 'art', 'sketch', 'create', 'brush'] },
    { key: 'animals', emoji: '🦄', label: 'Animals & Nature', color: '#a78bfa', keywords: ['dog', 'cat', 'animal', 'pet', 'bird', 'horse', 'rabbit', 'unicorn', 'flower', 'nature'] },
    { key: 'space', emoji: '🚀', label: 'Space & Stars', color: '#60a5fa', keywords: ['space', 'star', 'planet', 'rocket', 'moon', 'sun', 'galaxy', 'astronaut'] },
    { key: 'sports', emoji: '⚽', label: 'Sports & Play', color: '#fb923c', keywords: ['ball', 'sport', 'run', 'swim', 'jump', 'game', 'football', 'race'] },
    { key: 'stories', emoji: '📚', label: 'Stories & Books', color: '#facc15', keywords: ['story', 'book', 'read', 'fairy', 'tale', 'princess', 'magic', 'adventure', 'dragon'] },
];

// ─── Wellness Signal Keywords ──────────────────────────────────────
const WELLNESS_KEYS = {
    happy: ['happy', 'great', 'love', 'amazing', 'fun', 'laugh', 'excited', 'wonderful', 'fantastic', 'joy', 'smile', 'good'],
    sad: ['sad', 'cry', 'upset', 'miss', 'lonely', 'bad', 'hurt', 'unhappy', 'down'],
    calm: ['calm', 'fine', 'okay', 'safe', 'good', 'peaceful', 'relaxed', 'comfortable'],
    anxious: ['scared', 'worry', 'nervous', 'butterfly', 'scary', 'afraid', 'anxious', 'fear'],
    social: ['friend', 'play', 'together', 'family', 'mum', 'dad', 'sister', 'brother', 'love', 'hug', 'share'],
    energetic: ['run', 'jump', 'play', 'dance', 'active', 'sport', 'swim', 'excited', 'fun'],
};

// ─── Waveform ──────────────────────────────────────────────────────
const Waveform = ({ isActive, color = '#f0abfc' }: { isActive: boolean; color?: string }) => {
    const anims = useRef(Array(16).fill(0).map(() => new Animated.Value(0.2))).current;
    const loopRefs = useRef<Animated.CompositeAnimation[]>([]);

    useEffect(() => {
        loopRefs.current.forEach(l => l.stop());
        loopRefs.current = [];
        if (isActive) {
            anims.forEach((anim, i) => {
                const loop = Animated.loop(
                    Animated.sequence([
                        Animated.delay(i * 50),
                        Animated.timing(anim, { toValue: 0.4 + Math.random() * 0.6, duration: 300 + Math.random() * 250, useNativeDriver: true }),
                        Animated.timing(anim, { toValue: 0.15, duration: 300 + Math.random() * 250, useNativeDriver: true }),
                    ])
                );
                loop.start();
                loopRefs.current.push(loop);
            });
        } else {
            anims.forEach(a => Animated.timing(a, { toValue: 0.2, duration: 300, useNativeDriver: true }).start());
        }
        return () => loopRefs.current.forEach(l => l.stop());
    }, [isActive]);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 56, paddingHorizontal: 8 }}>
            {anims.map((anim, i) => (
                <Animated.View key={i} style={{
                    width: 5, height: 40, borderRadius: 3,
                    backgroundColor: isActive ? color : '#e2e8f0',
                    transform: [{ scaleY: anim }],
                }} />
            ))}
        </View>
    );
};

// ─── Animated Gauge ────────────────────────────────────────────────
const WellnessGauge = ({ value, color, delay }: { value: number; color: string; delay: number }) => {
    const widthAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        setTimeout(() => {
            Animated.spring(widthAnim, { toValue: value / 100, tension: 35, friction: 8, useNativeDriver: false }).start();
        }, delay);
    }, [value]);
    return (
        <View style={{ height: 12, backgroundColor: '#f1f5f9', borderRadius: 6, overflow: 'hidden', flex: 1 }}>
            <Animated.View style={{
                height: '100%', borderRadius: 6, backgroundColor: color,
                width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            }} />
        </View>
    );
};

// ─── Circular Wellness Ring ────────────────────────────────────────
const WellnessScore = ({ score, label, emoji, color }: { score: number; label: string; emoji: string; color: string }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 6, useNativeDriver: true }).start();
    }, []);
    const grade = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Care';
    return (
        <Animated.View style={[ws.card, { transform: [{ scale: scaleAnim }] }]}>
            <View style={[ws.ring, { borderColor: color }]}>
                <Text style={ws.scoreNum}>{score}</Text>
                <Text style={ws.scoreSlash}>/100</Text>
            </View>
            <Text style={{ fontSize: 24, marginTop: 8 }}>{emoji}</Text>
            <Text style={ws.label}>{label}</Text>
            <View style={[ws.gradeBadge, { backgroundColor: color + '22' }]}>
                <Text style={[ws.gradeText, { color }]}>{grade}</Text>
            </View>
        </Animated.View>
    );
};
const ws = StyleSheet.create({
    card: { alignItems: 'center', flex: 1, minWidth: (width - 64) / 2, backgroundColor: 'white', borderRadius: 24, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
    ring: { width: 80, height: 80, borderRadius: 40, borderWidth: 5, justifyContent: 'center', alignItems: 'center' },
    scoreNum: { fontSize: 24, fontWeight: '900', color: '#1e293b' },
    scoreSlash: { fontSize: 10, color: '#94a3b8', fontWeight: '600' },
    label: { fontSize: 12, fontWeight: '700', color: '#475569', textAlign: 'center', marginTop: 2, marginBottom: 6 },
    gradeBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
    gradeText: { fontSize: 11, fontWeight: '800' },
});

// ─── Main VoiceSense Screen ────────────────────────────────────────
type Phase = 'welcome' | 'listening' | 'transcribing' | 'results';

interface WellnessReport {
    overallScore: number;
    mood: number; moodLabel: string;
    stress: number; stressLabel: string;
    social: number; socialLabel: string;
    energy: number; energyLabel: string;
    anxiety: number; anxietyLabel: string;
    topEmotion: string; topEmotionEmoji: string;
    voiceSignals: { label: string; icon: string; value: string; color: string }[];
    interests: { key: string; confidence: number }[];
    wellnessTip: string;
    parentNote: string;
}

const LunaVoiceSenseScreen = () => {
    const navigation = useNavigation<any>();
    const [phase, setPhase] = useState<Phase>('welcome');
    const [promptIdx, setPromptIdx] = useState(0);
    const [transcribedText, setTranscribedText] = useState('');
    const [sessionTexts, setSessionTexts] = useState<string[]>([]);
    const [countdown, setCountdown] = useState(12);
    const [report, setReport] = useState<WellnessReport | null>(null);
    const [activeTab, setActiveTab] = useState<'wellness' | 'interests' | 'report'>('wellness');

    const pulseAnim = useRef(new Animated.Value(1)).current;
    const floatAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const timerRef = useRef<any>(null);
    const loopRef = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        loopRef.current = Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: -10, duration: 1500, useNativeDriver: true }),
                Animated.timing(floatAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
            ])
        );
        loopRef.current.start();
        return () => loopRef.current?.stop();
    }, []);

    useEffect(() => {
        if (phase === 'listening') {
            const loop = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.18, duration: 650, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 650, useNativeDriver: true }),
                ])
            );
            loop.start();
            return () => loop.stop();
        } else {
            pulseAnim.setValue(1);
        }
    }, [phase]);

    // ── Voice analysis engine ──────────────────────────────────────
    const buildReport = (texts: string[]): WellnessReport => {
        const all = texts.join(' ').toLowerCase();
        const count = (words: string[]) => words.reduce((n, w) => n + (all.includes(w) ? 1 : 0), 0);

        const happyHits = count(WELLNESS_KEYS.happy);
        const sadHits = count(WELLNESS_KEYS.sad);
        const calmHits = count(WELLNESS_KEYS.calm);
        const anxiousHits = count(WELLNESS_KEYS.anxious);
        const socialHits = count(WELLNESS_KEYS.social);
        const energyHits = count(WELLNESS_KEYS.energetic);

        const mood = Math.min(95, Math.max(30, Math.round(((happyHits * 14) - (sadHits * 10) + 55) + Math.random() * 10)));
        const stress = Math.min(90, Math.max(10, Math.round(100 - (anxiousHits * 12) - (sadHits * 8) + (calmHits * 6) + Math.random() * 10)));
        const social = Math.min(95, Math.max(25, Math.round((socialHits * 12) + 40 + Math.random() * 12)));
        const energy = Math.min(92, Math.max(30, Math.round((energyHits * 10) + 45 + Math.random() * 10)));
        const anxiety = Math.min(90, Math.max(10, Math.round(100 - (anxiousHits * 15) + (calmHits * 8) + Math.random() * 10)));

        const overallScore = Math.round((mood + stress + social + energy + anxiety) / 5);

        const moodLabel = mood >= 80 ? 'Very Happy' : mood >= 60 ? 'Happy' : mood >= 40 ? 'Neutral' : 'Low Mood';
        const stressLabel = stress >= 80 ? 'Very Low' : stress >= 60 ? 'Low' : stress >= 40 ? 'Moderate' : 'High';
        const socialLabel = social >= 80 ? 'Very Connected' : social >= 60 ? 'Connected' : 'Needs Support';
        const energyLabel = energy >= 75 ? 'High Energy' : energy >= 50 ? 'Moderate' : 'Low Energy';
        const anxietyLabel = anxiety >= 75 ? 'Very Calm' : anxiety >= 55 ? 'Calm' : 'Some Worry';

        const topEmotion = mood >= 70 ? 'Happy & Bright' : stress < 50 ? 'A Little Stressed' : 'Calm & Settled';
        const topEmotionEmoji = mood >= 70 ? '😊' : stress < 50 ? '😟' : '😌';

        const interests = INTERESTS.map(cat => {
            const hits = count(cat.keywords);
            const confidence = Math.min(95, Math.round((hits / cat.keywords.length) * 100 * 5 + Math.random() * 18));
            return { key: cat.key, confidence };
        }).sort((a, b) => b.confidence - a.confidence).slice(0, 4);

        const wellnessTip = mood >= 70
            ? `Luna seems to be in a wonderful emotional space! Her voice reflects happiness and positivity. Keep nurturing her joy through play and connection.`
            : `Luna's voice signals show she may benefit from some extra comfort and attention. Try fun activities, gentle conversation, and reassurance.`;

        const parentNote = `Overall VoiceSense score: ${overallScore}/100. Luna's voice suggests ${moodLabel.toLowerCase()} mood, ${stressLabel.toLowerCase()} stress, and ${socialLabel.toLowerCase()} social wellbeing. This is a voice-pattern screening, NOT a clinical assessment.`;

        const voiceSignals = [
            { label: 'Tone Quality', icon: '🎙️', value: mood >= 65 ? 'Bright & Warm' : 'Quiet & Soft', color: '#a78bfa' },
            { label: 'Speech Pace', icon: '⚡', value: energy >= 65 ? 'Energetic' : 'Calm & Slow', color: '#60a5fa' },
            { label: 'Word Choice', icon: '💬', value: happyHits >= 3 ? 'Positive & Happy' : 'Mixed Emotions', color: '#34d399' },
            { label: 'Story Length', icon: '📝', value: all.split(' ').length > 40 ? 'Expressive & Open' : 'Brief & Reserved', color: '#fb923c' },
            { label: 'Emotion Words', icon: '❤️', value: (happyHits + sadHits + calmHits) >= 4 ? 'Emotionally Aware' : 'Emerging Vocab', color: '#f472b6' },
        ];

        return { overallScore, mood, moodLabel, stress, stressLabel, social, socialLabel, energy, energyLabel, anxiety, anxietyLabel, topEmotion, topEmotionEmoji, voiceSignals, interests, wellnessTip, parentNote };
    };

    // ── Recording flow ─────────────────────────────────────────────
    const startRecording = () => {
        setPhase('listening');
        setCountdown(12);
        timerRef.current = setInterval(() => {
            setCountdown(t => {
                if (t <= 1) { clearInterval(timerRef.current); simulateTranscription(); return 0; }
                return t - 1;
            });
        }, 1000);
    };

    const simulateTranscription = () => {
        setPhase('transcribing');
        const text = DEMO_RESPONSES[promptIdx % DEMO_RESPONSES.length];
        const words = text.split(' ');
        let acc = '';
        words.forEach((w, i) => setTimeout(() => {
            acc += (i === 0 ? '' : ' ') + w;
            setTranscribedText(acc);
        }, i * 100));

        setTimeout(() => {
            const newTexts = [...sessionTexts, text];
            setSessionTexts(newTexts);
            setTranscribedText('');
            const nextPrompt = promptIdx + 1;
            if (nextPrompt >= 3) {
                const r = buildReport(newTexts);
                setReport(r);
                Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
                setPhase('results');
            } else {
                setPromptIdx(nextPrompt);
                setPhase('listening');
                setTimeout(startRecording, 400);
            }
        }, words.length * 100 + 900);
    };

    const stopEarly = () => { clearInterval(timerRef.current); simulateTranscription(); };

    const reset = () => {
        setPhase('welcome'); setPromptIdx(0); setTranscribedText('');
        setSessionTexts([]); setReport(null); fadeAnim.setValue(0); setActiveTab('wellness');
    };

    const overallColor = (report?.overallScore ?? 0) >= 80 ? '#22c55e' : (report?.overallScore ?? 0) >= 60 ? '#a855f7' : (report?.overallScore ?? 0) >= 40 ? '#f59e0b' : '#ef4444';

    return (
        <SafeAreaView style={s.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

                {/* ── Header ──────────────────────────────────── */}
                <LinearGradient colors={['#5b21b6', '#7c3aed', '#a855f7', '#ec4899']} style={s.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>

                    <Animated.Image
                        source={require('../../../../assets/kids/luna_avatar.png')}
                        style={[s.heroAvatar, { transform: [{ translateY: floatAnim }] }]}
                    />

                    <Text style={s.appName}>VoiceSense ✨</Text>
                    <Text style={s.appTagline}>for Children's Wellbeing</Text>
                    <Text style={s.appSub}>Luna's voice reveals her inner world 🌙</Text>

                    {/* Progress indicators */}
                    <View style={s.progressRow}>
                        {[0, 1, 2].map(i => (
                            <View key={i} style={[
                                s.dot,
                                i < promptIdx && s.dotDone,
                                i === promptIdx && phase !== 'results' && s.dotActive,
                            ]} />
                        ))}
                    </View>
                </LinearGradient>

                {/* ── WELCOME ───────────────────────────────────── */}
                {phase === 'welcome' && (
                    <View style={s.phase}>
                        {/* How it works */}
                        <View style={s.card}>
                            <Text style={s.cardTitle}>🌟 How VoiceSense Works</Text>
                            {[
                                { i: '🎤', t: 'Luna answers 3 fun voice questions' },
                                { i: '🧠', t: 'AI analyses voice tone, pace & words' },
                                { i: '💜', t: 'We map emotional wellness in real time' },
                                { i: '🌈', t: 'Interests detected naturally from speech' },
                                { i: '📊', t: 'Parents get a full wellbeing report' },
                            ].map((s2, i) => (
                                <View key={i} style={s.step}>
                                    <Text style={{ fontSize: 22 }}>{s2.i}</Text>
                                    <Text style={s.stepTxt}>{s2.t}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Wellness dimensions */}
                        <Text style={s.sectionLbl}>💜 Wellness we detect</Text>
                        <View style={s.miniCards}>
                            {[
                                { emoji: '😊', label: 'Mood', color: '#a855f7' },
                                { emoji: '🧘', label: 'Calm', color: '#22c55e' },
                                { emoji: '👥', label: 'Social', color: '#60a5fa' },
                                { emoji: '⚡', label: 'Energy', color: '#fb923c' },
                                { emoji: '💪', label: 'Strength', color: '#ec4899' },
                                { emoji: '🌈', label: 'Interests', color: '#facc15' },
                            ].map((item, i) => (
                                <View key={i} style={[s.miniCard, { borderColor: item.color + '44' }]}>
                                    <Text style={{ fontSize: 26 }}>{item.emoji}</Text>
                                    <Text style={[s.miniCardLbl, { color: item.color }]}>{item.label}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity onPress={startRecording} activeOpacity={0.88} style={s.startBtnWrap}>
                            <LinearGradient colors={['#5b21b6', '#a855f7', '#ec4899']} style={s.startBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <Ionicons name="mic" size={28} color="white" />
                                <View>
                                    <Text style={s.startBtnTop}>Start Luna's Session</Text>
                                    <Text style={s.startBtnSub}>3 quick voice questions</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={s.privacyRow}>
                            <Ionicons name="shield-checkmark" size={14} color="#10b981" />
                            <Text style={s.privacyTxt}>Voice is NOT stored. This is a wellness screening, not a diagnosis.</Text>
                        </View>
                    </View>
                )}

                {/* ── LISTENING / TRANSCRIBING ───────────────────── */}
                {(phase === 'listening' || phase === 'transcribing') && (
                    <View style={s.phase}>
                        {/* Question card */}
                        <LinearGradient colors={['#f5f3ff', '#ede9fe']} style={s.promptCard}>
                            <View style={s.promptTopRow}>
                                <View style={s.promptBadge}>
                                    <Text style={s.promptBadgeTxt}>Q {promptIdx + 1} of 3</Text>
                                </View>
                                <Text style={s.promptWellness}>
                                    {['😊 Mood', '🧘 Stress', '👥 Social'][promptIdx] ?? '🌈 Wellbeing'}
                                </Text>
                            </View>
                            <Text style={s.promptQ}>{VOICE_PROMPTS[promptIdx].q}</Text>
                        </LinearGradient>

                        {/* Mic + countdown */}
                        <View style={s.micArea}>
                            <Animated.View style={[s.micRipple, { transform: [{ scale: pulseAnim }] }]}>
                                <LinearGradient
                                    colors={phase === 'listening' ? ['#7c3aed', '#ec4899'] : ['#94a3b8', '#cbd5e1']}
                                    style={s.micCircle}
                                >
                                    <Ionicons name={phase === 'listening' ? 'mic' : 'hourglass-outline'} size={48} color="white" />
                                </LinearGradient>
                            </Animated.View>
                            {phase === 'listening' && <Text style={s.countdown}>{countdown}s</Text>}
                        </View>

                        {/* Waveform */}
                        <View style={{ alignItems: 'center', marginBottom: 8 }}>
                            <Waveform isActive={phase === 'listening'} color="#c084fc" />
                        </View>

                        {/* Status text */}
                        {phase === 'listening' && (
                            <View style={s.statusRow}>
                                <View style={s.liveIndicator} />
                                <Text style={s.statusTxt}>VoiceSense is listening to Luna…</Text>
                            </View>
                        )}

                        {/* Live transcript */}
                        {phase === 'transcribing' && transcribedText !== '' && (
                            <View style={s.transcriptLive}>
                                <Text style={s.transcriptTag}>📝 Luna said:</Text>
                                <Text style={s.transcriptWords}>"{transcribedText}"</Text>
                            </View>
                        )}
                        {phase === 'transcribing' && transcribedText === '' && (
                            <Text style={s.analysing}>⚡ Analysing voice wellness signals…</Text>
                        )}

                        {/* Stop early */}
                        {phase === 'listening' && (
                            <TouchableOpacity style={s.stopBtn} onPress={stopEarly}>
                                <Ionicons name="stop-circle-outline" size={20} color="#ef4444" />
                                <Text style={s.stopTxt}>Done Speaking</Text>
                            </TouchableOpacity>
                        )}

                        {/* Tech tags */}
                        <View style={s.techRow}>
                            {['Voice Tone Analysis', 'NLP', 'Wellness AI', 'Privacy Safe', 'COPPA Compliant'].map((t, i) => (
                                <View key={i} style={s.techTag}><Text style={s.techTagTxt}>{t}</Text></View>
                            ))}
                        </View>
                    </View>
                )}

                {/* ── RESULTS ───────────────────────────────────── */}
                {phase === 'results' && report && (
                    <Animated.View style={[s.phase, { opacity: fadeAnim }]}>

                        {/* Overall wellness score */}
                        <LinearGradient
                            colors={[overallColor + '22', overallColor + '08']}
                            style={s.overallCard}
                        >
                            <Text style={s.overallLabel}>Luna's Wellness Score</Text>
                            <View style={s.overallScoreRow}>
                                <Text style={[s.overallScore, { color: overallColor }]}>{report.overallScore}</Text>
                                <Text style={s.overallMax}>/100</Text>
                            </View>
                            <Text style={s.overallEmotion}>{report.topEmotionEmoji}  {report.topEmotion}</Text>
                            <View style={[s.overallBadge, { backgroundColor: overallColor }]}>
                                <Text style={s.overallBadgeTxt}>
                                    {report.overallScore >= 80 ? '🌟 Flourishing' : report.overallScore >= 60 ? '💜 Doing Well' : report.overallScore >= 40 ? '🌤 Needs Attention' : '🫶 Needs Extra Care'}
                                </Text>
                            </View>
                        </LinearGradient>

                        {/* Tab switcher */}
                        <View style={s.tabRow}>
                            {(['wellness', 'interests', 'report'] as const).map(tab => (
                                <TouchableOpacity
                                    key={tab}
                                    style={[s.tab, activeTab === tab && s.tabActive]}
                                    onPress={() => setActiveTab(tab)}
                                >
                                    <Text style={[s.tabTxt, activeTab === tab && s.tabTxtActive]}>
                                        {tab === 'wellness' ? '💜 Wellness' : tab === 'interests' ? '🌈 Interests' : '📋 Report'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* ── Wellness Tab ─────────────────────── */}
                        {activeTab === 'wellness' && (
                            <View>
                                {/* 4 dimension scores grid */}
                                <View style={s.scoreGrid}>
                                    <WellnessScore score={report.mood} label="Mood" emoji="😊" color="#a855f7" />
                                    <WellnessScore score={report.stress} label="Low Stress" emoji="🧘" color="#22c55e" />
                                    <WellnessScore score={report.social} label="Social Bond" emoji="👥" color="#60a5fa" />
                                    <WellnessScore score={report.energy} label="Energy" emoji="⚡" color="#fb923c" />
                                </View>

                                {/* Anxiety / calm gauge */}
                                <View style={s.card}>
                                    <Text style={s.cardTitle}>🦋 Anxiety & Calm Level</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 }}>
                                        <Text style={{ fontSize: 13, color: '#94a3b8', fontWeight: '600', width: 52 }}>Worried</Text>
                                        <WellnessGauge value={report.anxiety} color={report.anxiety >= 70 ? '#22c55e' : report.anxiety >= 50 ? '#f59e0b' : '#ef4444'} delay={200} />
                                        <Text style={{ fontSize: 13, color: '#94a3b8', fontWeight: '600', width: 42 }}>Calm</Text>
                                    </View>
                                    <Text style={s.gaugeLabel}>{report.anxietyLabel}  •  Score: {report.anxiety}/100</Text>
                                </View>

                                {/* Voice signals */}
                                <View style={s.card}>
                                    <Text style={s.cardTitle}>🎙️ Voice Signal Patterns</Text>
                                    {report.voiceSignals.map((sig, i) => (
                                        <View key={i} style={s.signalRow}>
                                            <Text style={{ fontSize: 18, width: 28 }}>{sig.icon}</Text>
                                            <View style={{ flex: 1 }}>
                                                <Text style={s.signalLabel}>{sig.label}</Text>
                                                <Text style={[s.signalValue, { color: sig.color }]}>{sig.value}</Text>
                                            </View>
                                            <View style={[s.signalDot, { backgroundColor: sig.color + '33', borderColor: sig.color }]}>
                                                <Ionicons name="checkmark" size={12} color={sig.color} />
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                {/* Wellness tip */}
                                <LinearGradient colors={['#f5f3ff', '#ede9fe']} style={[s.card, { borderLeftWidth: 4, borderLeftColor: '#a855f7' }]}>
                                    <Text style={s.cardTitle}>💡 Wellness Insight for Luna</Text>
                                    <Text style={s.insightTxt}>{report.wellnessTip}</Text>
                                </LinearGradient>
                            </View>
                        )}

                        {/* ── Interests Tab ─────────────────────── */}
                        {activeTab === 'interests' && (
                            <View>
                                {/* Top interest hero */}
                                {report.interests[0] && (() => {
                                    const cat = INTERESTS.find(c => c.key === report.interests[0].key)!;
                                    return (
                                        <LinearGradient colors={[cat.color + '33', cat.color + '11']} style={s.topInterestCard}>
                                            <Text style={{ fontSize: 52 }}>{cat.emoji}</Text>
                                            <Text style={s.topInterestSub}>Luna's #1 Passion</Text>
                                            <Text style={[s.topInterestName, { color: cat.color }]}>{cat.label}</Text>
                                            <Text style={s.topInterestConf}>{report.interests[0].confidence}% voice confidence</Text>
                                        </LinearGradient>
                                    );
                                })()}

                                <View style={s.card}>
                                    <Text style={s.cardTitle}>🌈 Interest Breakdown</Text>
                                    {report.interests.map((item, i) => {
                                        const cat = INTERESTS.find(c => c.key === item.key)!;
                                        return (
                                            <View key={item.key} style={s.interestRow}>
                                                <Text style={{ fontSize: 22, width: 32 }}>{cat.emoji}</Text>
                                                <View style={{ flex: 1 }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                                        <Text style={s.interestLabel}>{cat.label}</Text>
                                                        <Text style={[s.interestPct, { color: cat.color }]}>{item.confidence}%</Text>
                                                    </View>
                                                    <WellnessGauge value={item.confidence} color={cat.color} delay={i * 120} />
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>

                                {/* Interest-based wellbeing link */}
                                {report.interests[0] && (() => {
                                    const cat = INTERESTS.find(c => c.key === report.interests[0].key)!;
                                    const tips: Record<string, string> = {
                                        music: 'Encourage singing, dancing, or playing a simple instrument. Music is proven to boost emotional regulation and wellbeing.',
                                        art: 'Provide drawing materials and creative time. Art expression is a powerful tool for processing emotions in children.',
                                        animals: 'Visit a petting zoo, read animal books, or consider a small pet. Connection with animals supports empathy and calmness.',
                                        space: 'Explore star-gazing apps, books about planets, or STEM kits. Curiosity about space fosters imagination and resilience.',
                                        sports: 'Enrol in team sports or active classes. Physical activity and teamwork significantly boost mood and social bonds.',
                                        stories: 'Regular story time and library visits. Narrative play builds emotional intelligence and vocabulary.',
                                    };
                                    return (
                                        <View style={[s.card, { borderLeftWidth: 4, borderLeftColor: cat.color }]}>
                                            <Text style={s.cardTitle}>🌱 Wellbeing Boost Tip</Text>
                                            <Text style={s.insightTxt}>{tips[cat.key] ?? 'Nurture this interest through play, books, and creative activities.'}</Text>
                                        </View>
                                    );
                                })()}
                            </View>
                        )}

                        {/* ── Report Tab ─────────────────────────── */}
                        {activeTab === 'report' && (
                            <View>
                                {/* What Luna said */}
                                <View style={s.card}>
                                    <Text style={s.cardTitle}>💬 What Luna Said</Text>
                                    {sessionTexts.map((txt, i) => (
                                        <View key={i} style={s.transcriptItem}>
                                            <View style={s.transcriptQRow}>
                                                <Text style={s.transcriptQBadge}>Q{i + 1}</Text>
                                                <Text style={s.transcriptQTxt}>{VOICE_PROMPTS[i].q}</Text>
                                            </View>
                                            <Text style={s.transcriptATxt}>"{txt}"</Text>
                                        </View>
                                    ))}
                                </View>

                                {/* Full wellness summary */}
                                <View style={s.card}>
                                    <Text style={s.cardTitle}>📋 Full Wellness Summary</Text>
                                    {[
                                        { label: 'Overall Score', value: `${report.overallScore}/100`, color: overallColor },
                                        { label: 'Mood', value: `${report.mood}/100 — ${report.moodLabel}`, color: '#a855f7' },
                                        { label: 'Stress Level', value: `${report.stress}/100 — ${report.stressLabel}`, color: '#22c55e' },
                                        { label: 'Social Bond', value: `${report.social}/100 — ${report.socialLabel}`, color: '#60a5fa' },
                                        { label: 'Energy', value: `${report.energy}/100 — ${report.energyLabel}`, color: '#fb923c' },
                                        { label: 'Anxiety', value: `${report.anxiety}/100 — ${report.anxietyLabel}`, color: '#ec4899' },
                                    ].map((row, i) => (
                                        <View key={i} style={s.summaryRow}>
                                            <Text style={s.summaryLabel}>{row.label}</Text>
                                            <Text style={[s.summaryValue, { color: row.color }]}>{row.value}</Text>
                                        </View>
                                    ))}
                                </View>

                                {/* Parent note */}
                                <View style={[s.card, { backgroundColor: '#fefce8', borderLeftWidth: 4, borderLeftColor: '#facc15' }]}>
                                    <Text style={s.cardTitle}>👩‍👧 Note for Parents</Text>
                                    <Text style={s.insightTxt}>{report.parentNote}</Text>
                                </View>

                                {/* Privacy */}
                                <View style={s.privacyCard}>
                                    <Ionicons name="shield-checkmark" size={18} color="#10b981" />
                                    <Text style={s.privacyCardTxt}>Voice data is analysed on-device and never stored or shared. VoiceSense for Children's Wellbeing is a supportive screening tool — NOT a clinical diagnosis.</Text>
                                </View>
                            </View>
                        )}

                        {/* Actions */}
                        <View style={s.actionRow}>
                            <TouchableOpacity style={s.retryBtn} onPress={reset}>
                                <Ionicons name="refresh" size={18} color="#7c3aed" />
                                <Text style={s.retryTxt}>New Session</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={s.shareWrap}
                                onPress={() => Alert.alert('✅ Report Sent', "Luna's wellness report has been shared with the parent dashboard!")}
                            >
                                <LinearGradient colors={['#5b21b6', '#a855f7', '#ec4899']} style={s.shareBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                    <Ionicons name="share-social" size={18} color="white" />
                                    <Text style={s.shareTxt}>Share with Parent</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: 48 }} />
                    </Animated.View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
};

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },

    // Header
    header: { paddingTop: 24, paddingBottom: 32, paddingHorizontal: 24, alignItems: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
    backBtn: { position: 'absolute', top: 28, left: 20, backgroundColor: 'rgba(255,255,255,0.2)', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    heroAvatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 12, borderWidth: 3, borderColor: 'rgba(255,255,255,0.7)' },
    appName: { color: 'white', fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
    appTagline: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: '700', marginTop: 2, letterSpacing: 0.5 },
    appSub: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 3 },
    progressRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
    dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.25)' },
    dotDone: { backgroundColor: '#fde68a' },
    dotActive: { backgroundColor: 'white', width: 26, borderRadius: 5 },

    // Phase wrapper
    phase: { padding: 18 },

    // Card
    card: { backgroundColor: 'white', borderRadius: 22, padding: 18, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.055, shadowRadius: 10, elevation: 3 },
    cardTitle: { fontSize: 16, fontWeight: '800', color: '#1e293b', marginBottom: 14 },

    // Welcome
    step: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
    stepTxt: { fontSize: 15, color: '#475569', fontWeight: '500', flex: 1, lineHeight: 21 },
    sectionLbl: { fontSize: 15, fontWeight: '700', color: '#374151', marginBottom: 10, marginTop: 4 },
    miniCards: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
    miniCard: { alignItems: 'center', backgroundColor: 'white', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1.5, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
    miniCardLbl: { fontSize: 12, fontWeight: '700', marginTop: 4 },
    startBtnWrap: { borderRadius: 22, overflow: 'hidden', shadowColor: '#7c3aed', shadowOpacity: 0.45, shadowRadius: 14, elevation: 8, marginBottom: 16 },
    startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, paddingVertical: 18, paddingHorizontal: 28 },
    startBtnTop: { color: 'white', fontSize: 18, fontWeight: '800' },
    startBtnSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
    privacyRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, padding: 12, backgroundColor: '#f0fdf4', borderRadius: 14 },
    privacyTxt: { fontSize: 12, color: '#166534', flex: 1, lineHeight: 17 },

    // Listening
    promptCard: { borderRadius: 24, padding: 20, marginBottom: 20 },
    promptTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    promptBadge: { backgroundColor: '#7c3aed', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
    promptBadgeTxt: { color: 'white', fontSize: 12, fontWeight: '800' },
    promptWellness: { fontSize: 13, fontWeight: '700', color: '#7c3aed' },
    promptQ: { fontSize: 20, fontWeight: '700', color: '#1e293b', lineHeight: 30 },
    micArea: { alignItems: 'center', marginBottom: 16 },
    micRipple: { width: 136, height: 136, borderRadius: 68, backgroundColor: 'rgba(168,85,247,0.12)', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    micCircle: { width: 104, height: 104, borderRadius: 52, justifyContent: 'center', alignItems: 'center' },
    countdown: { fontSize: 30, fontWeight: '900', color: '#7c3aed' },
    statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 14 },
    liveIndicator: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ec4899' },
    statusTxt: { fontSize: 15, color: '#7c3aed', fontWeight: '600' },
    transcriptLive: { backgroundColor: '#f5f3ff', borderRadius: 18, padding: 16, marginBottom: 14 },
    transcriptTag: { fontSize: 12, fontWeight: '700', color: '#7c3aed', marginBottom: 6 },
    transcriptWords: { fontSize: 16, color: '#1e293b', fontStyle: 'italic', lineHeight: 24 },
    analysing: { fontSize: 15, color: '#94a3b8', fontWeight: '600', textAlign: 'center', marginBottom: 14 },
    stopBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'center', marginBottom: 20, padding: 12, paddingHorizontal: 20, backgroundColor: '#fff1f2', borderRadius: 16, borderWidth: 1.5, borderColor: '#fecdd3' },
    stopTxt: { color: '#ef4444', fontWeight: '700' },
    techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 10 },
    techTag: { backgroundColor: '#f1f5f9', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
    techTagTxt: { fontSize: 11, fontWeight: '700', color: '#64748b' },

    // Results – overall
    overallCard: { borderRadius: 28, padding: 28, alignItems: 'center', marginBottom: 16 },
    overallLabel: { fontSize: 13, fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 },
    overallScoreRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginVertical: 6 },
    overallScore: { fontSize: 72, fontWeight: '900', lineHeight: 80 },
    overallMax: { fontSize: 22, color: '#94a3b8', fontWeight: '600', marginBottom: 10 },
    overallEmotion: { fontSize: 20, fontWeight: '700', color: '#1e293b', marginBottom: 12 },
    overallBadge: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
    overallBadgeTxt: { color: 'white', fontWeight: '800', fontSize: 15 },

    // Tabs
    tabRow: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 18, padding: 4, marginBottom: 16 },
    tab: { flex: 1, paddingVertical: 10, borderRadius: 14, alignItems: 'center' },
    tabActive: { backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
    tabTxt: { fontSize: 13, fontWeight: '600', color: '#94a3b8' },
    tabTxtActive: { color: '#7c3aed', fontWeight: '800' },

    // Wellness tab
    scoreGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
    gaugeLabel: { fontSize: 12, color: '#94a3b8', fontWeight: '600', marginTop: 8, textAlign: 'center' },
    signalRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f8fafc' },
    signalLabel: { fontSize: 13, color: '#64748b', fontWeight: '500' },
    signalValue: { fontSize: 15, fontWeight: '700' },
    signalDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
    insightTxt: { fontSize: 15, color: '#475569', lineHeight: 24 },

    // Interests tab
    topInterestCard: { borderRadius: 26, padding: 26, alignItems: 'center', marginBottom: 14 },
    topInterestSub: { fontSize: 12, fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 },
    topInterestName: { fontSize: 26, fontWeight: '900', marginVertical: 4 },
    topInterestConf: { fontSize: 14, color: '#64748b', fontWeight: '600' },
    interestRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
    interestLabel: { fontSize: 14, fontWeight: '600', color: '#374151' },
    interestPct: { fontSize: 14, fontWeight: '800' },

    // Report tab
    transcriptItem: { marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    transcriptQRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
    transcriptQBadge: { backgroundColor: '#7c3aed', color: 'white', fontSize: 10, fontWeight: '800', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 8, overflow: 'hidden' },
    transcriptQTxt: { fontSize: 13, color: '#64748b', fontWeight: '600', flex: 1 },
    transcriptATxt: { fontSize: 15, color: '#1e293b', fontStyle: 'italic', lineHeight: 22, paddingLeft: 4 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f8fafc' },
    summaryLabel: { fontSize: 14, color: '#475569', fontWeight: '600' },
    summaryValue: { fontSize: 14, fontWeight: '800', textAlign: 'right', flex: 1, marginLeft: 8 },
    privacyCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: '#f0fdf4', borderRadius: 16, padding: 14, marginBottom: 14 },
    privacyCardTxt: { fontSize: 12, color: '#166534', flex: 1, lineHeight: 18 },

    // Actions
    actionRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
    retryBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, backgroundColor: 'white', borderRadius: 18, borderWidth: 2, borderColor: '#7c3aed' },
    retryTxt: { color: '#7c3aed', fontWeight: '700', fontSize: 15 },
    shareWrap: { flex: 2, borderRadius: 18, overflow: 'hidden', shadowColor: '#7c3aed', shadowOpacity: 0.4, shadowRadius: 10, elevation: 6 },
    shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16 },
    shareTxt: { color: 'white', fontWeight: '800', fontSize: 15 },
});

export default LunaVoiceSenseScreen;
