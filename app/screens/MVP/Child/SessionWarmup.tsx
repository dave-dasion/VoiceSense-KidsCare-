import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
    Animated, Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../../../components';

const { width } = Dimensions.get('window');

const stages = [
    { key: 'greeting', emoji: '🦊', text: 'Hi there! Ready to play some games today?' },
    { key: 'instruction', emoji: '🦊', text: "First, let's warm up! Say this with me:\n\"Today is a bright and sunny day!\"" },
    { key: 'recording', emoji: '🎙', text: 'Great! Now say it out loud while I listen...' },
];

const SessionWarmup = () => {
    const navigation = useNavigation<any>();
    const [stage, setStage] = useState(0);
    const [recording, setRecording] = useState(false);
    const [countdown, setCountdown] = useState(20);
    const bounceAnim = useRef(new Animated.Value(0)).current;
    const micAnim = useRef(new Animated.Value(1)).current;
    const countRef = useRef<any>(null);

    // Bounce character
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, { toValue: -18, duration: 700, useNativeDriver: true }),
                Animated.timing(bounceAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    // Mic pulse when recording
    useEffect(() => {
        if (recording) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(micAnim, { toValue: 1.3, duration: 600, useNativeDriver: true }),
                    Animated.timing(micAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
                ])
            ).start();
            countRef.current = setInterval(() => {
                setCountdown((c) => {
                    if (c <= 1) {
                        clearInterval(countRef.current);
                        setRecording(false);
                        setTimeout(() => navigation.replace('GameEngine', { gameIndex: 0 }), 800);
                        return 0;
                    }
                    return c - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countRef.current);
    }, [recording]);

    const handleNext = () => {
        if (stage < stages.length - 1) {
            setStage((s) => s + 1);
        } else {
            setRecording(true);
        }
    };

    const current = stages[stage];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inner}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="close" size={26} color={Colors.textLight} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Warm Up</Text>
                    <View style={{ width: 26 }} />
                </View>

                {/* Animated character */}
                <Animated.View style={[styles.character, { transform: [{ translateY: bounceAnim }] }]}>
                    <Avatar
                        size={160}
                        source={recording ? undefined : require('../../../../assets/kids/robot_avatar.png')}
                        emoji={recording ? '🎙' : undefined}
                        style={{ borderWidth: 0, elevation: 0, shadowOpacity: 0 }}
                    />
                </Animated.View>

                {/* Speech bubble */}
                <View style={styles.bubble}>
                    <Text style={styles.bubbleText}>{current.text}</Text>
                </View>

                {/* Recording UI */}
                {recording ? (
                    <View style={styles.recordingContainer}>
                        <Animated.View style={[styles.micRing, { transform: [{ scale: micAnim }] }]}>
                            <View style={styles.micCircle}>
                                <Ionicons name="mic" size={44} color={Colors.white} />
                            </View>
                        </Animated.View>
                        <Text style={styles.recordingLabel}>Listening... {countdown}s</Text>

                        <View style={styles.metricsRow}>
                            {['Pitch', 'Rate', 'Energy'].map((m) => (
                                <View key={m} style={styles.metricTag}>
                                    <Ionicons name="radio-button-on" size={10} color={Colors.success} />
                                    <Text style={styles.metricText}>{m}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                        <Text style={styles.nextBtnText}>
                            {stage < stages.length - 1 ? "Let's go!" : "Start Recording!"}
                        </Text>
                        <Ionicons name={stage < stages.length - 1 ? 'chevron-forward' : 'mic'} size={22} color={Colors.white} />
                    </TouchableOpacity>
                )}

                {/* Step dots */}
                <View style={styles.dots}>
                    {stages.map((_, i) => (
                        <View key={i} style={[styles.dot, i <= stage && styles.dotActive]} />
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#eff6ff' },
    inner: { flex: 1, padding: Spacing.xl, alignItems: 'center' },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', marginBottom: Spacing.xl,
    },
    headerTitle: { ...Typography.subheader },
    character: { marginBottom: Spacing.xl },
    characterEmoji: { fontSize: 110 },
    bubble: {
        backgroundColor: Colors.white, borderRadius: 28, padding: Spacing.xl,
        width: '100%', marginBottom: Spacing.xxl, ...Shadows.medium,
        borderBottomLeftRadius: 6,
    },
    bubbleText: { ...Typography.subheader, textAlign: 'center', lineHeight: 30, fontSize: 20 },
    nextBtn: {
        backgroundColor: Colors.primary, flexDirection: 'row', gap: 8,
        paddingHorizontal: 40, paddingVertical: 18, borderRadius: 20, ...Shadows.medium,
        marginBottom: Spacing.xl,
    },
    nextBtnText: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
    recordingContainer: { alignItems: 'center', marginBottom: Spacing.xl },
    micRing: {
        width: 130, height: 130, borderRadius: 65,
        backgroundColor: 'rgba(244, 63, 94, 0.2)',
        justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.md,
    },
    micCircle: {
        width: 96, height: 96, borderRadius: 48,
        backgroundColor: Colors.accent, justifyContent: 'center', alignItems: 'center',
    },
    recordingLabel: { ...Typography.subheader, color: Colors.accent, marginBottom: Spacing.lg },
    metricsRow: { flexDirection: 'row', gap: Spacing.md },
    metricTag: {
        flexDirection: 'row', alignItems: 'center', gap: 4,
        backgroundColor: '#dcfce7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    },
    metricText: { fontSize: 13, fontWeight: '600', color: Colors.success },
    dots: { flexDirection: 'row', gap: 8 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#c7d2fe' },
    dotActive: { backgroundColor: Colors.primary, width: 20 },
});

export default SessionWarmup;
