import React, { useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView,
    TouchableOpacity, Animated, Alert,
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../../../components';

const questions = [
    { id: 1, key: 'scary', text: 'Did anything feel scary today?', emojis: ['😨', '😐', '😊'] },
    { id: 2, key: 'good', text: 'What was one good thing that happened?', emojis: ['🌟', '😐', '😔'] },
    { id: 3, key: 'worried', text: 'Did you feel worried in your tummy?', emojis: ['😣', '😐', '😌'] },
    { id: 4, key: 'energy', text: 'How much energy do you have right now?', emojis: ['⚡', '🌤', '😴'] },
    { id: 5, key: 'safe', text: 'Do you feel safe right now?', emojis: ['🏠', '🤔', '😰'] },
];

const CRISIS_KEYWORDS = ['die', 'disappear', 'hurt myself', 'kill'];

const MicroCheck = () => {
    const navigation = useNavigation<any>();
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [mode, setMode] = useState<'emoji' | 'voice'>('emoji');
    const [slideAnim] = useState(new Animated.Value(0));

    const current = questions[qIndex];

    const handleAnswer = (emojiIndex: number) => {
        const newAnswers = { ...answers, [current.key]: emojiIndex };
        setAnswers(newAnswers);

        // Crisis check (if answer is most negative — index 2 on scary/worried/safe questions)
        if ((current.key === 'scary' || current.key === 'worried') && emojiIndex === 0) {
            // High stress signal
        }

        Animated.sequence([
            Animated.timing(slideAnim, { toValue: -30, duration: 150, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]).start();

        setTimeout(() => {
            if (qIndex < questions.length - 1) {
                setQIndex(qIndex + 1);
            } else {
                // Calculate stress score
                const stressScore = Object.values(newAnswers).reduce((sum, v) => sum + v, 0);
                if (stressScore >= 8) {
                    navigation.replace('Protocol');
                } else {
                    navigation.replace('Summary');
                }
            }
        }, 200);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${((qIndex + 1) / questions.length) * 100}%` }]} />
            </View>

            <View style={styles.content}>
                <Text style={styles.stepText}>{qIndex + 1} of {questions.length}</Text>

                <Animated.View style={[styles.questionCard, { transform: [{ translateY: slideAnim }] }]}>
                    <Avatar
                        size={100}
                        source={require('../../../../assets/kids/robot_avatar.png')}
                        style={{ marginBottom: Spacing.md, borderWidth: 0 }}
                    />
                    <View style={styles.bubble}>
                        <Text style={styles.questionText}>{current.text}</Text>
                    </View>
                </Animated.View>

                {/* Mode toggle */}
                <View style={styles.modeRow}>
                    <TouchableOpacity
                        style={[styles.modeBtn, mode === 'emoji' && styles.modeBtnActive]}
                        onPress={() => setMode('emoji')}
                    >
                        <Text style={styles.modeBtnText}>😊 Emoji</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modeBtn, mode === 'voice' && styles.modeBtnActive]}
                        onPress={() => setMode('voice')}
                    >
                        <Text style={styles.modeBtnText}>🎙 Voice</Text>
                    </TouchableOpacity>
                </View>

                {mode === 'emoji' ? (
                    <View style={styles.emojiOptions}>
                        {current.emojis.map((emoji, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.emojiBtn}
                                onPress={() => handleAnswer(i)}
                            >
                                <Text style={styles.emojiText}>{emoji}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <TouchableOpacity style={styles.voiceBtn} onPress={() => handleAnswer(1)}>
                        <View style={styles.micCircle}>
                            <Ionicons name="mic" size={40} color={Colors.white} />
                        </View>
                        <Text style={styles.voiceBtnText}>Tap & Speak</Text>
                    </TouchableOpacity>
                )}

                {/* Crisis button */}
                <TouchableOpacity
                    style={styles.crisisBtn}
                    onPress={() => navigation.replace('Escalation')}
                >
                    <Ionicons name="hand-left-outline" size={16} color={Colors.error} />
                    <Text style={styles.crisisBtnText}>I need help right now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff7ed' },
    progressBar: { height: 6, backgroundColor: '#fde68a', margin: 0 },
    progressFill: { height: '100%', backgroundColor: Colors.warning },
    content: { flex: 1, padding: Spacing.xl, justifyContent: 'center', alignItems: 'center' },
    stepText: { ...Typography.caption, marginBottom: Spacing.xl, color: Colors.textLight },
    questionCard: { alignItems: 'center', marginBottom: Spacing.xxl, width: '100%' },
    characterEmoji: { fontSize: 72, marginBottom: Spacing.md },
    bubble: {
        backgroundColor: Colors.white, borderRadius: 24, padding: Spacing.xl,
        width: '100%', ...Shadows.medium,
        borderBottomLeftRadius: 4,
    },
    questionText: { ...Typography.subheader, textAlign: 'center', fontSize: 20, lineHeight: 30 },
    modeRow: { flexDirection: 'row', gap: 12, marginBottom: Spacing.xl },
    modeBtn: {
        paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20,
        backgroundColor: '#f1f5f9', borderWidth: 1.5, borderColor: '#e2e8f0',
    },
    modeBtnActive: { backgroundColor: '#eff6ff', borderColor: Colors.primary },
    modeBtnText: { fontWeight: '600', color: Colors.text },
    emojiOptions: { flexDirection: 'row', gap: 24, marginBottom: Spacing.xxl },
    emojiBtn: {
        width: 90, height: 90, borderRadius: 24, backgroundColor: Colors.white,
        justifyContent: 'center', alignItems: 'center', ...Shadows.medium,
    },
    emojiText: { fontSize: 44 },
    voiceBtn: { alignItems: 'center', marginBottom: Spacing.xxl },
    micCircle: {
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: Colors.accent, justifyContent: 'center', alignItems: 'center',
        ...Shadows.medium,
    },
    voiceBtnText: { marginTop: Spacing.sm, ...Typography.body, color: Colors.accent, fontWeight: 'bold' },
    crisisBtn: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20,
        borderWidth: 1.5, borderColor: Colors.error,
    },
    crisisBtnText: { color: Colors.error, fontWeight: '600' },
});

export default MicroCheck;
