import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
    Animated, Dimensions, Vibration,
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from '../../../components';

const { width } = Dimensions.get('window');

// ─── Game 1: Focus Quest ───────────────────────────────────────────
const TARGET_COLOR = Colors.primary;
const DISTRACT_COLOR = Colors.accent;

const FocusQuest = ({ onComplete }: { onComplete: (score: number) => void }) => {
    const [targets, setTargets] = useState<{ id: number; isTarget: boolean; pressed: boolean }[]>([]);
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const timerRef = useRef<any>(null);

    const generateTargets = () =>
        Array(6).fill(0).map((_, i) => ({ id: i, isTarget: Math.random() > 0.4, pressed: false }));

    useEffect(() => {
        setTargets(generateTargets());
        timerRef.current = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) { clearInterval(timerRef.current); onComplete(score); return 0; }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && timeLeft % 8 === 0) setTargets(generateTargets());
    }, [timeLeft]);

    const handlePress = (id: number, isTarget: boolean) => {
        setTargets((prev) => prev.map((t) => t.id === id ? { ...t, pressed: true } : t));
        if (isTarget) { setScore((s) => s + 10); }
        else { setErrors((e) => e + 1); Vibration.vibrate(100); }
    };

    const progress = timeLeft / 60;

    return (
        <View style={fq.container}>
            <Text style={fq.gameTitle}>🎯 Focus Quest</Text>
            <Text style={fq.instruction}>Tap only the <Text style={{ color: TARGET_COLOR, fontWeight: 'bold' }}>BLUE ⭐</Text> stars!</Text>

            <View style={fq.timerRow}>
                <View style={fq.timerBar}><View style={[fq.timerFill, { width: `${progress * 100}%` }]} /></View>
                <Text style={fq.timerText}>{timeLeft}s</Text>
            </View>

            <View style={fq.scoreRow}>
                <Text style={fq.scoreText}>Score: {score}</Text>
                <Text style={fq.errorText}>Errors: {errors}</Text>
            </View>

            <View style={fq.grid}>
                {targets.map((t) => (
                    <TouchableOpacity
                        key={t.id} disabled={t.pressed}
                        style={[fq.target,
                        { backgroundColor: t.isTarget ? TARGET_COLOR : DISTRACT_COLOR },
                        t.pressed && fq.targetPressed,
                        ]}
                        onPress={() => handlePress(t.id, t.isTarget)}
                    >
                        <Ionicons name={t.pressed ? 'checkmark' : 'star'} size={36} color={Colors.white} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const fq = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', paddingVertical: Spacing.xl },
    gameTitle: { fontSize: 28, fontWeight: 'bold', color: Colors.text, marginBottom: 4 },
    instruction: { fontSize: 16, color: Colors.textLight, marginBottom: Spacing.lg },
    timerRow: { flexDirection: 'row', alignItems: 'center', width: '90%', gap: 12, marginBottom: Spacing.md },
    timerBar: { flex: 1, height: 14, backgroundColor: '#e2e8f0', borderRadius: 7, overflow: 'hidden' },
    timerFill: { height: '100%', backgroundColor: Colors.success, borderRadius: 7 },
    timerText: { fontWeight: 'bold', color: Colors.text, fontSize: 16, width: 36 },
    scoreRow: { flexDirection: 'row', gap: 32, marginBottom: Spacing.xl },
    scoreText: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },
    errorText: { fontSize: 18, fontWeight: 'bold', color: Colors.accent },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center', width: '90%' },
    target: { width: 100, height: 100, borderRadius: 22, justifyContent: 'center', alignItems: 'center', ...Shadows.medium },
    targetPressed: { opacity: 0.4 },
});

// ─── Game 2: Emotion Detective ─────────────────────────────────────
const emotionRounds = [
    { face: '😊', voice: 'cheerful voice', answer: 'happy', options: ['😊 Happy', '😢 Sad', '😡 Angry', '😨 Scared'] },
    { face: '😢', voice: 'quiet, slow voice', answer: 'sad', options: ['😊 Happy', '😢 Sad', '😮 Surprised', '😶 Neutral'] },
    { face: '😡', voice: 'loud, sharp voice', answer: 'angry', options: ['😡 Angry', '😊 Happy', '😢 Sad', '😎 Cool'] },
    { face: '😨', voice: 'shaky voice', answer: 'scared', options: ['😊 Happy', '😢 Sad', '😡 Angry', '😨 Scared'] },
    { face: '😮', voice: 'high, fast voice', answer: 'surprised', options: ['😮 Surprised', '😢 Sad', '😊 Happy', '😡 Angry'] },
    { face: '😶', voice: 'flat, quiet voice', answer: 'neutral', options: ['😶 Neutral', '😡 Angry', '😊 Happy', '😢 Sad'] },
];

const EmotionDetective = ({ onComplete }: { onComplete: (score: number) => void }) => {
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<{ correct: boolean; msg: string } | null>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const current = emotionRounds[round];

    const handleAnswer = (option: string) => {
        const isCorrect = option.toLowerCase().includes(current.answer);
        const newScore = isCorrect ? score + 15 : score;
        setScore(newScore);
        setFeedback({ correct: isCorrect, msg: isCorrect ? '✅ Correct!' : `❌ It was ${current.answer}` });
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.1, duration: 150, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();
        setTimeout(() => {
            setFeedback(null);
            if (round + 1 >= emotionRounds.length) { onComplete(newScore); }
            else { setRound((r) => r + 1); }
        }, 1200);
    };

    return (
        <View style={ed.container}>
            <Text style={ed.gameTitle}>🕵️ Emotion Detective</Text>
            <Text style={ed.progress}>Round {round + 1} of {emotionRounds.length}</Text>

            <View style={ed.progressBar}>
                <View style={[ed.progressFill, { width: `${((round) / emotionRounds.length) * 100}%` }]} />
            </View>

            <Animated.View style={[ed.faceCard, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={ed.faceEmoji}>{current.face}</Text>
                <View style={ed.voiceBox}>
                    <Ionicons name="volume-medium" size={18} color={Colors.primary} />
                    <Text style={ed.voiceText}>"{current.voice}"</Text>
                </View>
                <Text style={ed.question}>Which emotion matches this voice?</Text>
            </Animated.View>

            {feedback && (
                <View style={[ed.feedbackBox, { backgroundColor: feedback.correct ? '#dcfce7' : '#fee2e2' }]}>
                    <Text style={ed.feedbackText}>{feedback.msg}</Text>
                </View>
            )}

            {!feedback && (
                <View style={ed.options}>
                    {current.options.map((o, i) => (
                        <TouchableOpacity key={i} style={ed.optionBtn} onPress={() => handleAnswer(o)}>
                            <Text style={ed.optionText}>{o}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Text style={ed.scoreLabel}>Score: {score}</Text>
        </View>
    );
};

const ed = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', paddingVertical: Spacing.xl },
    gameTitle: { fontSize: 26, fontWeight: 'bold', color: Colors.text, marginBottom: 4 },
    progress: { color: Colors.textLight, marginBottom: 8 },
    progressBar: { width: '90%', height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden', marginBottom: Spacing.xl },
    progressFill: { height: '100%', backgroundColor: Colors.secondary, borderRadius: 4 },
    faceCard: {
        backgroundColor: Colors.white, borderRadius: 28, width: '90%',
        padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.xl, ...Shadows.medium,
    },
    faceEmoji: { fontSize: 80, marginBottom: Spacing.md },
    voiceBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#eff6ff', padding: 10, borderRadius: 12 },
    voiceText: { color: Colors.primary, fontStyle: 'italic', fontWeight: '600' },
    question: { ...Typography.body, marginTop: 12, textAlign: 'center', color: Colors.textLight },
    feedbackBox: { padding: Spacing.md, borderRadius: 14, width: '90%', alignItems: 'center', marginBottom: Spacing.md },
    feedbackText: { fontSize: 18, fontWeight: 'bold' },
    options: { width: '90%', gap: 10 },
    optionBtn: {
        backgroundColor: Colors.surface, borderRadius: 16, padding: Spacing.md + 2,
        borderWidth: 1.5, borderColor: '#e2e8f0', alignItems: 'center',
    },
    optionText: { fontSize: 18, fontWeight: '600', color: Colors.text },
    scoreLabel: { ...Typography.body, color: Colors.primary, fontWeight: 'bold', marginTop: Spacing.lg },
});

// ─── Game 3: Pattern Playground ────────────────────────────────────
const levels = [
    { shapes: ['🔴', '🔵', '🔴', '🔵', '?'], answer: '🔵', options: ['🔵', '🔻', '🟡', '🔴'], hint: 'Red, Blue pattern' },
    { shapes: ['🟡', '🟡', '🔴', '🟡', '🟡', '?'], answer: '🔴', options: ['🟡', '🔴', '🔵', '🟢'], hint: 'Two yellow, one red pattern' },
    { shapes: ['🔺', '🔵', '🔺', '🔺', '🔵', '?'], answer: '🔺', options: ['🔵', '🔺', '🟡', '🔴'], hint: 'Triangle pattern' },
];

const PatternPlayground = ({ onComplete }: { onComplete: (score: number) => void }) => {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [askedHarder, setAskedHarder] = useState(false);

    const current = levels[Math.min(level, levels.length - 1)];

    const handleAnswer = (option: string) => {
        const correct = option === current.answer;
        setFeedback(correct ? '🎉 Perfect!' : `Try again! Hint: ${current.hint}`);
        if (correct) {
            const newScore = score + 20;
            setScore(newScore);
            if (level + 1 >= levels.length) {
                setTimeout(() => onComplete(newScore), 1000);
            } else {
                setTimeout(() => { setFeedback(null); setLevel((l) => l + 1); }, 1200);
            }
        } else {
            setTimeout(() => setFeedback(null), 1800);
        }
    };

    return (
        <View style={pp.container}>
            <Text style={pp.gameTitle}>🧩 Pattern Playground</Text>
            <Text style={pp.levelText}>Level {level + 1} of {levels.length}</Text>

            <View style={pp.patternCard}>
                <Text style={pp.hint}>{current.hint}</Text>
                <View style={pp.shapesRow}>
                    {current.shapes.map((s, i) => (
                        <View key={i} style={[pp.shapeBox, s === '?' && pp.shapeBoxQuestion]}>
                            <Text style={pp.shapeEmoji}>{s === '?' ? '?' : s}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {feedback && (
                <View style={[pp.feedbackBox, { backgroundColor: feedback.includes('🎉') ? '#dcfce7' : '#fef9c3' }]}>
                    <Text style={pp.feedbackText}>{feedback}</Text>
                </View>
            )}

            {!feedback && (
                <View style={pp.optionsGrid}>
                    {current.options.map((o, i) => (
                        <TouchableOpacity key={i} style={pp.optionBtn} onPress={() => handleAnswer(o)}>
                            <Text style={pp.optionEmoji}>{o}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {level + 1 >= levels.length && !askedHarder && (
                <TouchableOpacity style={pp.harderBtn} onPress={() => { setAskedHarder(true); setLevel(0); setScore((s) => s + 10); }}>
                    <Text style={pp.harderBtnText}>Try Harder Mode! 🚀</Text>
                </TouchableOpacity>
            )}

            <Text style={pp.scoreLabel}>Score: {score}</Text>
        </View>
    );
};

const pp = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', paddingVertical: Spacing.xl },
    gameTitle: { fontSize: 26, fontWeight: 'bold', color: Colors.text, marginBottom: 4 },
    levelText: { color: Colors.textLight, marginBottom: Spacing.xl },
    patternCard: {
        backgroundColor: Colors.white, borderRadius: 28, width: '90%',
        padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.xl, ...Shadows.medium,
    },
    hint: { ...Typography.caption, fontSize: 14, marginBottom: Spacing.md, color: Colors.textLight },
    shapesRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
    shapeBox: {
        width: 52, height: 52, borderRadius: 14,
        backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0',
        justifyContent: 'center', alignItems: 'center',
    },
    shapeBoxQuestion: { backgroundColor: '#eff6ff', borderColor: Colors.primary, borderWidth: 2 },
    shapeEmoji: { fontSize: 26 },
    feedbackBox: { padding: Spacing.md, borderRadius: 14, width: '90%', alignItems: 'center', marginBottom: Spacing.md },
    feedbackText: { fontSize: 18, fontWeight: 'bold' },
    optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center', width: '90%' },
    optionBtn: {
        width: 80, height: 80, borderRadius: 20,
        backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center',
        borderWidth: 2, borderColor: '#e2e8f0', ...Shadows.light,
    },
    optionEmoji: { fontSize: 32 },
    harderBtn: {
        backgroundColor: Colors.secondary, paddingHorizontal: 28, paddingVertical: 12,
        borderRadius: 20, marginTop: Spacing.md,
    },
    harderBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
    scoreLabel: { ...Typography.body, color: Colors.primary, fontWeight: 'bold', marginTop: Spacing.lg },
});

// ─── Game Engine Shell ──────────────────────────────────────────────
const GAMES = ['FocusQuest', 'EmotionDetective', 'PatternPlayground'] as const;
type GameKey = typeof GAMES[number];

const gameLabels: Record<GameKey, string> = {
    FocusQuest: '🎯 Focus Quest',
    EmotionDetective: '🕵️ Emotion Detective',
    PatternPlayground: '🧩 Pattern Playground',
};

const GameEngine = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const gameIndex = route.params?.gameIndex ?? 0;
    const currentGame: GameKey = GAMES[Math.min(gameIndex, GAMES.length - 1)];

    const [phase, setPhase] = useState<'intro' | 'playing' | 'done'>('intro');
    const [finalScore, setFinalScore] = useState(0);

    const handleComplete = (score: number) => {
        setFinalScore(score);
        setPhase('done');
    };

    const handleNext = () => {
        // After any game go to MicroCheck
        navigation.replace('MicroCheck');
    };

    if (phase === 'intro') {
        return (
            <SafeAreaView style={gs.container}>
                <View style={gs.introBox}>
                    <Avatar
                        size={120}
                        emoji={currentGame === 'FocusQuest' ? '🎯' : currentGame === 'EmotionDetective' ? '🕵️' : '🧩'}
                        style={{ marginBottom: Spacing.xl, backgroundColor: '#fff', elevation: 5 }}
                    />
                    <Text style={gs.introTitle}>{gameLabels[currentGame]}</Text>
                    <Text style={gs.introDesc}>
                        {currentGame === 'FocusQuest' && 'Tap only the blue stars as fast as you can! Stay focused.'}
                        {currentGame === 'EmotionDetective' && 'Listen to the voice and find the matching emotion.'}
                        {currentGame === 'PatternPlayground' && 'Find the missing shape that completes the pattern!'}
                    </Text>
                    <TouchableOpacity style={gs.startBtn} onPress={() => setPhase('playing')}>
                        <Text style={gs.startBtnText}>Start Game!</Text>
                        <Ionicons name="play" size={20} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    if (phase === 'done') {
        return (
            <SafeAreaView style={gs.container}>
                <View style={gs.doneBox}>
                    <Avatar
                        size={140}
                        emoji="🏆"
                        style={{ marginBottom: Spacing.xl, backgroundColor: '#fff', elevation: 8 }}
                    />
                    <Text style={gs.doneTitle}>Amazing!</Text>
                    <Text style={gs.doneScore}>Score: {finalScore}</Text>
                    <TouchableOpacity style={gs.nextBtn} onPress={handleNext}>
                        <Text style={gs.nextBtnText}>Continue</Text>
                        <Ionicons name="arrow-forward" size={20} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={gs.container}>
            {currentGame === 'FocusQuest' && <FocusQuest onComplete={handleComplete} />}
            {currentGame === 'EmotionDetective' && <EmotionDetective onComplete={handleComplete} />}
            {currentGame === 'PatternPlayground' && <PatternPlayground onComplete={handleComplete} />}
        </SafeAreaView>
    );
};

const gs = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f9ff' },
    introBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xxl },
    introEmoji: { fontSize: 80, marginBottom: Spacing.lg },
    introTitle: { ...Typography.header, fontSize: 32, marginBottom: Spacing.md },
    introDesc: { ...Typography.body, textAlign: 'center', color: Colors.textLight, lineHeight: 26, marginBottom: Spacing.xxl },
    startBtn: {
        backgroundColor: Colors.primary, flexDirection: 'row', gap: 10,
        paddingHorizontal: 44, paddingVertical: 18, borderRadius: 20, ...Shadows.medium,
    },
    startBtnText: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
    doneBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xxl },
    doneEmoji: { fontSize: 100 },
    doneTitle: { ...Typography.header, fontSize: 40, marginVertical: Spacing.md },
    doneScore: { fontSize: 24, color: Colors.primary, fontWeight: 'bold', marginBottom: Spacing.xxl },
    nextBtn: {
        backgroundColor: Colors.primary, flexDirection: 'row', gap: 10,
        paddingHorizontal: 44, paddingVertical: 18, borderRadius: 20, ...Shadows.medium,
    },
    nextBtnText: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
});

export default GameEngine;
