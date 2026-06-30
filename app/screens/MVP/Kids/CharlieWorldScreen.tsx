import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
    ScrollView, Animated, Dimensions, StatusBar, Image, Modal,
    Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '../../../components';

const { width, height } = Dimensions.get('window');

// ─── Color Match Game ─────────────────────────────────────────────
const COLORS = [
    { name: 'Red', hex: '#ef4444', emoji: '🔴' },
    { name: 'Blue', hex: '#3b82f6', emoji: '🔵' },
    { name: 'Green', hex: '#22c55e', emoji: '🟢' },
    { name: 'Yellow', hex: '#eab308', emoji: '🟡' },
    { name: 'Purple', hex: '#a855f7', emoji: '🟣' },
    { name: 'Orange', hex: '#f97316', emoji: '🟠' },
];

const ColorMatchGame = ({ onScore, onExit }: { onScore: (s: number) => void; onExit: () => void }) => {
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<{ msg: string; correct: boolean } | null>(null);
    const [options, setOptions] = useState<typeof COLORS>([]);
    const [target, setTarget] = useState(COLORS[0]);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const generateRound = () => {
        const t = COLORS[Math.floor(Math.random() * COLORS.length)];
        const others = COLORS.filter(c => c.name !== t.name).sort(() => Math.random() - 0.5).slice(0, 3);
        const opts = [...others, t].sort(() => Math.random() - 0.5);
        setTarget(t);
        setOptions(opts);
        setFeedback(null);
    };

    useEffect(() => { generateRound(); }, []);

    const handlePress = (color: typeof COLORS[0]) => {
        const correct = color.name === target.name;
        const newScore = correct ? score + 15 : score;
        setScore(newScore);
        setFeedback({ msg: correct ? '🎉 Awesome!' : '💙 Try Again!', correct });
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.15, duration: 120, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
        ]).start();
        if (!correct) Vibration.vibrate(80);
        setTimeout(() => {
            if (round + 1 >= 10) { onScore(newScore); return; }
            setRound(r => r + 1);
            generateRound();
        }, 900);
    };

    return (
        <LinearGradient colors={['#fef3c7', '#fde68a', '#fbbf24']} style={gm.container}>
            <TouchableOpacity style={gm.exitBtn} onPress={onExit}>
                <Ionicons name="close-circle" size={32} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
            <Text style={gm.gameTitle}>🎨 Color Match!</Text>
            <Text style={gm.progress}>Round {round + 1} / 10  •  ⭐ {score}</Text>

            <Animated.View style={[gm.targetCard, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={gm.targetLabel}>Match this color!</Text>
                <View style={[gm.colorCircle, { backgroundColor: target.hex }]} />
                <Text style={gm.targetName}>{target.name}</Text>
            </Animated.View>

            {feedback && (
                <View style={[gm.feedbackBox, { backgroundColor: feedback.correct ? '#dcfce7' : '#fee2e2' }]}>
                    <Text style={gm.feedbackText}>{feedback.msg}</Text>
                </View>
            )}

            {!feedback && (
                <View style={gm.optionsGrid}>
                    {options.map((c, i) => (
                        <TouchableOpacity key={i} style={[gm.optBtn, { backgroundColor: c.hex }]} onPress={() => handlePress(c)}>
                            <Text style={gm.optEmoji}>{c.emoji}</Text>
                            <Text style={gm.optName}>{c.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </LinearGradient>
    );
};

// ─── Animal Memory Game ────────────────────────────────────────────
const ANIMALS = ['🦁', '🐘', '🦒', '🐬', '🦊', '🐧', '🦄', '🐸'];

const AnimalMemoryGame = ({ onScore, onExit }: { onScore: (s: number) => void; onExit: () => void }) => {
    const pairs = [...ANIMALS, ...ANIMALS].sort(() => Math.random() - 0.5).map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }));
    const [cards, setCards] = useState(pairs);
    const [selected, setSelected] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);

    const handleFlip = (id: number) => {
        if (selected.length === 2) return;
        const card = cards.find(c => c.id === id);
        if (!card || card.flipped || card.matched) return;

        const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
        setCards(newCards);
        const newSelected = [...selected, id];
        setSelected(newSelected);
        setMoves(m => m + 1);

        if (newSelected.length === 2) {
            const [a, b] = newSelected.map(sid => newCards.find(c => c.id === sid)!);
            if (a.emoji === b.emoji) {
                const matched = newCards.map(c => newSelected.includes(c.id) ? { ...c, matched: true } : c);
                setCards(matched);
                setScore(s => s + 20);
                setSelected([]);
                const allMatched = matched.every(c => c.matched);
                if (allMatched) setTimeout(() => onScore(score + 20), 800);
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map(c => newSelected.includes(c.id) ? { ...c, flipped: false } : c));
                    setSelected([]);
                }, 1000);
            }
        }
    };

    return (
        <LinearGradient colors={['#ede9fe', '#ddd6fe', '#c4b5fd']} style={gm.container}>
            <TouchableOpacity style={gm.exitBtn} onPress={onExit}>
                <Ionicons name="close-circle" size={32} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
            <Text style={gm.gameTitle}>🧠 Animal Memory</Text>
            <Text style={gm.progress}>Moves: {moves}  •  ⭐ {score}</Text>

            <View style={am.grid}>
                {cards.map((card) => (
                    <TouchableOpacity key={card.id} style={[am.card, card.matched && am.cardMatched]} onPress={() => handleFlip(card.id)}>
                        {(card.flipped || card.matched) ? (
                            <Text style={am.emoji}>{card.emoji}</Text>
                        ) : (
                            <Text style={am.back}>❓</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </LinearGradient>
    );
};

const am = StyleSheet.create({
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, width: '90%', marginTop: 20 },
    card: {
        width: (width * 0.9 - 50) / 4, height: (width * 0.9 - 50) / 4,
        borderRadius: 16, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
        shadowColor: '#a855f7', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
    },
    cardMatched: { backgroundColor: '#dcfce7', borderWidth: 2, borderColor: '#22c55e' },
    emoji: { fontSize: 28 },
    back: { fontSize: 28 },
});

// ─── Star Catch Reaction Game ──────────────────────────────────────
const StarCatchGame = ({ onScore, onExit }: { onScore: (s: number) => void; onExit: () => void }) => {
    const [stars, setStars] = useState<{ id: number; x: number; y: number; type: '⭐' | '💣'; caught: boolean }[]>([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const nextId = useRef(0);
    const timerRef = useRef<any>(null);
    const spawnRef = useRef<any>(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) { clearInterval(timerRef.current); clearInterval(spawnRef.current); return 0; }
                return t - 1;
            });
        }, 1000);

        spawnRef.current = setInterval(() => {
            const isBomb = Math.random() < 0.25;
            setStars(prev => [...prev.slice(-8), {
                id: nextId.current++,
                x: Math.random() * (width - 80),
                y: Math.random() * (height * 0.45 - 60) + 60,
                type: isBomb ? '💣' : '⭐',
                caught: false,
            }]);
        }, 700);

        return () => { clearInterval(timerRef.current); clearInterval(spawnRef.current); };
    }, []);

    useEffect(() => { if (timeLeft === 0) onScore(score); }, [timeLeft]);

    const catchStar = (id: number, type: '⭐' | '💣') => {
        setStars(prev => prev.map(s => s.id === id ? { ...s, caught: true } : s));
        if (type === '⭐') { setScore(s => s + 10); }
        else { setScore(s => Math.max(0, s - 5)); Vibration.vibrate(150); }
    };

    return (
        <LinearGradient colors={['#0f172a', '#1e3a5f', '#1e40af']} style={[gm.container, { justifyContent: 'flex-start' }]}>
            <TouchableOpacity style={gm.exitBtn} onPress={onExit}>
                <Ionicons name="close-circle" size={32} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
            <Text style={[gm.gameTitle, { color: '#fde68a' }]}>⭐ Star Catch!</Text>
            <Text style={[gm.progress, { color: '#93c5fd' }]}>Time: {timeLeft}s  •  ⭐ {score}</Text>

            <View style={{ flex: 1, width: '100%', position: 'relative' }}>
                {stars.filter(s => !s.caught).map(star => (
                    <TouchableOpacity
                        key={star.id}
                        style={[sc.star, { left: star.x, top: star.y }]}
                        onPress={() => catchStar(star.id, star.type)}
                    >
                        <Text style={sc.starEmoji}>{star.type}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 16 }}>
                Tap ⭐ stars! Avoid 💣 bombs!
            </Text>
        </LinearGradient>
    );
};

const sc = StyleSheet.create({
    star: { position: 'absolute', width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
    starEmoji: { fontSize: 40 },
});

// ─── Shape Builder Puzzle ──────────────────────────────────────────
const SHAPES = [
    { shape: '🔴', name: 'Circle', type: 'round' },
    { shape: '🟦', name: 'Square', type: 'box' },
    { shape: '🔺', name: 'Triangle', type: 'tri' },
    { shape: '🟣', name: 'Oval', type: 'round' },
    { shape: '🔷', name: 'Diamond', type: 'dia' },
];

const rounds = [
    { prompt: 'Which shapes are round?', correct: ['🔴', '🟣'], options: ['🔴', '🟦', '🔺', '🟣', '🔷'] },
    { prompt: 'Which shape has corners?', correct: ['🟦', '🔺', '🔷'], options: ['🔴', '🟦', '🔺', '🟣', '🔷'] },
    { prompt: 'Pick the triangle!', correct: ['🔺'], options: ['🔴', '🟦', '🔺', '🟣', '🔷'] },
    { prompt: 'Pick all that are NOT round!', correct: ['🟦', '🔺', '🔷'], options: ['🔴', '🟦', '🔺', '🟣', '🔷'] },
];

const ShapeBuilderGame = ({ onScore, onExit }: { onScore: (s: number) => void; onExit: () => void }) => {
    const [rIdx, setRIdx] = useState(0);
    const [selected, setSelected] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const current = rounds[rIdx];

    const toggle = (s: string) => {
        setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    };

    const check = () => {
        const correct = current.correct.every(c => selected.includes(c)) && selected.length === current.correct.length;
        const ns = correct ? score + 25 : score;
        setScore(ns);
        setFeedback(correct ? '🎉 Perfect!' : `💡 Answer: ${current.correct.join(' ')}`);
        setTimeout(() => {
            if (rIdx + 1 >= rounds.length) { onScore(ns); }
            else { setRIdx(r => r + 1); setSelected([]); setFeedback(null); }
        }, 1400);
    };

    return (
        <LinearGradient colors={['#ecfdf5', '#d1fae5', '#6ee7b7']} style={gm.container}>
            <TouchableOpacity style={gm.exitBtn} onPress={onExit}>
                <Ionicons name="close-circle" size={32} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
            <Text style={gm.gameTitle}>🧩 Shapes!</Text>
            <Text style={gm.progress}>Q {rIdx + 1}/{rounds.length}  •  ⭐ {score}</Text>

            <View style={sb.promptCard}>
                <Text style={sb.prompt}>{current.prompt}</Text>
            </View>

            <View style={sb.optGrid}>
                {current.options.map((s, i) => (
                    <TouchableOpacity
                        key={i} style={[sb.shapeBtn, selected.includes(s) && sb.shapeBtnSelected]}
                        onPress={() => toggle(s)}
                    >
                        <Text style={sb.shapeEmoji}>{s}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {feedback && (
                <View style={[gm.feedbackBox, { backgroundColor: feedback.includes('🎉') ? '#dcfce7' : '#fef9c3' }]}>
                    <Text style={gm.feedbackText}>{feedback}</Text>
                </View>
            )}

            {!feedback && selected.length > 0 && (
                <TouchableOpacity style={sb.checkBtn} onPress={check}>
                    <Text style={sb.checkBtnText}>Check My Answer ✓</Text>
                </TouchableOpacity>
            )}
        </LinearGradient>
    );
};

const sb = StyleSheet.create({
    promptCard: { backgroundColor: 'white', borderRadius: 24, padding: 24, width: '88%', alignItems: 'center', marginBottom: 28, shadowColor: '#10b981', shadowOpacity: 0.15, shadowRadius: 12, elevation: 4 },
    prompt: { fontSize: 22, fontWeight: '800', color: '#064e3b', textAlign: 'center', lineHeight: 30 },
    optGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 24 },
    shapeBtn: { width: 80, height: 80, borderRadius: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
    shapeBtnSelected: { backgroundColor: '#bbf7d0', borderWidth: 3, borderColor: '#16a34a', transform: [{ scale: 1.08 }] },
    shapeEmoji: { fontSize: 36 },
    checkBtn: { backgroundColor: '#16a34a', paddingHorizontal: 36, paddingVertical: 14, borderRadius: 20, shadowColor: '#16a34a', shadowOpacity: 0.4, shadowRadius: 10, elevation: 6 },
    checkBtnText: { color: 'white', fontWeight: '800', fontSize: 18 },
});

// ─── Shared Game Modal Styles ──────────────────────────────────────
const gm = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 16 },
    exitBtn: { position: 'absolute', top: 52, right: 20, zIndex: 10 },
    gameTitle: { fontSize: 30, fontWeight: '900', color: '#1e293b', marginBottom: 4 },
    progress: { fontSize: 16, fontWeight: '600', color: '#475569', marginBottom: 24 },
    targetCard: { backgroundColor: 'white', borderRadius: 28, padding: 28, alignItems: 'center', width: '88%', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 16, elevation: 6 },
    targetLabel: { fontSize: 16, color: '#64748b', marginBottom: 16, fontWeight: '600' },
    colorCircle: { width: 100, height: 100, borderRadius: 50, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
    targetName: { fontSize: 24, fontWeight: '800', color: '#1e293b' },
    feedbackBox: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 20, marginBottom: 12 },
    feedbackText: { fontSize: 22, fontWeight: '800' },
    optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center' },
    optBtn: { width: (width - 80) / 2, height: 70, borderRadius: 20, justifyContent: 'center', alignItems: 'center', gap: 4, flexDirection: 'row', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 },
    optEmoji: { fontSize: 28 },
    optName: { color: 'white', fontWeight: '800', fontSize: 16 },
});

// ─── Charlie World Hub ─────────────────────────────────────────────
type GameType = 'ColorMatch' | 'AnimalMemory' | 'StarCatch' | 'ShapeBuilder' | null;

const GAME_CARDS = [
    { key: 'ColorMatch' as GameType, emoji: '🎨', title: 'Color Match', desc: 'Match the right color!', gradient: ['#fbbf24', '#f59e0b'] as any, bg: '#fef9c3' },
    { key: 'AnimalMemory' as GameType, emoji: '🧠', title: 'Animal Memory', desc: 'Find the matching pairs!', gradient: ['#a855f7', '#7c3aed'] as any, bg: '#ede9fe' },
    { key: 'StarCatch' as GameType, emoji: '⭐', title: 'Star Catch', desc: 'Catch stars, dodge bombs!', gradient: ['#3b82f6', '#1d4ed8'] as any, bg: '#dbeafe' },
    { key: 'ShapeBuilder' as GameType, emoji: '🧩', title: 'Shape Builder', desc: 'Sort shapes together!', gradient: ['#22c55e', '#16a34a'] as any, bg: '#dcfce7' },
];

const CharlieWorldScreen = () => {
    const navigation = useNavigation<any>();
    const [activeGame, setActiveGame] = useState<GameType>(null);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [showCelebration, setShowCelebration] = useState(false);
    const [lastScore, setLastScore] = useState(0);
    const bounceAnim = useRef(new Animated.Value(0)).current;
    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: -10, duration: 1200, useNativeDriver: true }),
                Animated.timing(floatAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const handleGameComplete = (game: string, score: number) => {
        setScores(prev => ({ ...prev, [game]: Math.max(prev[game] ?? 0, score) }));
        setLastScore(score);
        setActiveGame(null);
        setShowCelebration(true);
        Animated.spring(bounceAnim, { toValue: 1, tension: 60, friction: 5, useNativeDriver: true }).start();
        setTimeout(() => {
            setShowCelebration(false);
            bounceAnim.setValue(0);
        }, 3000);
    };

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <LinearGradient colors={['#6366f1', '#8b5cf6', '#a855f7']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color="white" />
                </TouchableOpacity>

                <Animated.View style={{ transform: [{ translateY: floatAnim }], alignItems: 'center' }}>
                    <Image
                        source={require('../../../../assets/kids/charlie_avatar.png')}
                        style={styles.heroAvatar}
                    />
                    <Text style={styles.heroName}>Charlie's Game World 🎮</Text>
                    <Text style={styles.heroScore}>Total Stars ⭐ {totalScore}</Text>
                </Animated.View>

                {/* Stars */}
                <View style={styles.badgeRow}>
                    {GAME_CARDS.map((g) => (
                        <View key={g.key as string} style={[styles.badge, scores[g.key as string] ? styles.badgeEarned : {}]}>
                            <Text style={{ fontSize: 16 }}>{g.emoji}</Text>
                        </View>
                    ))}
                </View>
            </LinearGradient>

            {/* Cards */}
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>🕹️ Pick a Game!</Text>

                {GAME_CARDS.map((game) => (
                    <TouchableOpacity
                        key={game.key as string}
                        style={[styles.gameCard, { backgroundColor: game.bg }]}
                        activeOpacity={0.85}
                        onPress={() => setActiveGame(game.key)}
                    >
                        <LinearGradient colors={game.gradient} style={styles.gameIconBg}>
                            <Text style={{ fontSize: 36 }}>{game.emoji}</Text>
                        </LinearGradient>

                        <View style={{ flex: 1, marginLeft: 16 }}>
                            <Text style={styles.gameTitle}>{game.title}</Text>
                            <Text style={styles.gameDesc}>{game.desc}</Text>
                            {scores[game.key as string] ? (
                                <Text style={styles.bestScore}>⭐ Best: {scores[game.key as string]}</Text>
                            ) : (
                                <Text style={styles.newBadge}>NEW!</Text>
                            )}
                        </View>

                        <LinearGradient colors={game.gradient} style={styles.playBtn}>
                            <Ionicons name="play" size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                ))}

                {/* Back to kid hub */}
                <TouchableOpacity style={styles.switchBtn} onPress={() => navigation.navigate('KidLogin')}>
                    <Ionicons name="swap-horizontal" size={18} color="#64748b" />
                    <Text style={styles.switchBtnText}>Switch to Luna's World 🦄</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Game Modal */}
            <Modal visible={!!activeGame} animationType="slide" statusBarTranslucent>
                {activeGame === 'ColorMatch' && (
                    <ColorMatchGame
                        onScore={(s) => handleGameComplete('ColorMatch', s)}
                        onExit={() => setActiveGame(null)}
                    />
                )}
                {activeGame === 'AnimalMemory' && (
                    <AnimalMemoryGame
                        onScore={(s) => handleGameComplete('AnimalMemory', s)}
                        onExit={() => setActiveGame(null)}
                    />
                )}
                {activeGame === 'StarCatch' && (
                    <StarCatchGame
                        onScore={(s) => handleGameComplete('StarCatch', s)}
                        onExit={() => setActiveGame(null)}
                    />
                )}
                {activeGame === 'ShapeBuilder' && (
                    <ShapeBuilderGame
                        onScore={(s) => handleGameComplete('ShapeBuilder', s)}
                        onExit={() => setActiveGame(null)}
                    />
                )}
            </Modal>

            {/* Celebration Overlay */}
            {showCelebration && (
                <Animated.View style={[styles.celebOverlay, { transform: [{ scale: bounceAnim }] }]}>
                    <Text style={styles.celebEmoji}>🎉</Text>
                    <Text style={styles.celebTitle}>Amazing Charlie!</Text>
                    <Text style={styles.celebScore}>You scored ⭐ {lastScore}</Text>
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    header: {
        paddingTop: 20, paddingBottom: 28, paddingHorizontal: 24,
        alignItems: 'center',
        borderBottomLeftRadius: 36, borderBottomRightRadius: 36,
    },
    backBtn: {
        position: 'absolute', top: 24, left: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: 40, height: 40, borderRadius: 20,
        justifyContent: 'center', alignItems: 'center',
    },
    heroAvatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10, borderWidth: 3, borderColor: 'rgba(255,255,255,0.6)' },
    heroName: { color: 'white', fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
    heroScore: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600', marginTop: 4 },
    badgeRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
    badge: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
    badgeEarned: { backgroundColor: '#fde68a', shadowColor: '#f59e0b', shadowOpacity: 0.8, shadowRadius: 8, elevation: 6 },
    scroll: { padding: 20 },
    sectionTitle: { fontSize: 22, fontWeight: '900', color: '#1e293b', marginBottom: 16, marginTop: 8 },
    gameCard: {
        flexDirection: 'row', alignItems: 'center',
        borderRadius: 24, padding: 18, marginBottom: 16,
        shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 12, elevation: 4,
    },
    gameIconBg: { width: 70, height: 70, borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    gameTitle: { fontSize: 20, fontWeight: '800', color: '#1e293b', marginBottom: 2 },
    gameDesc: { fontSize: 14, color: '#64748b', fontWeight: '500', marginBottom: 4 },
    bestScore: { fontSize: 13, fontWeight: '700', color: '#f59e0b' },
    newBadge: { fontSize: 11, fontWeight: '900', color: '#6366f1', backgroundColor: '#eef2ff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, alignSelf: 'flex-start' },
    playBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginLeft: 12, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
    switchBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8, padding: 14, backgroundColor: 'white', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
    switchBtnText: { fontSize: 16, color: '#64748b', fontWeight: '600' },
    celebOverlay: {
        position: 'absolute', top: height * 0.3, left: width * 0.1,
        width: width * 0.8, backgroundColor: 'white',
        borderRadius: 32, padding: 32, alignItems: 'center',
        shadowColor: '#6366f1', shadowOpacity: 0.4, shadowRadius: 24, elevation: 20,
    },
    celebEmoji: { fontSize: 72, marginBottom: 8 },
    celebTitle: { fontSize: 28, fontWeight: '900', color: '#1e293b' },
    celebScore: { fontSize: 20, color: '#6366f1', fontWeight: '700', marginTop: 4 },
});

export default CharlieWorldScreen;
