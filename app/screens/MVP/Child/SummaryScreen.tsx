import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView,
    TouchableOpacity, Animated, Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../../../components';

const { width } = Dimensions.get('window');

const SummaryScreen = () => {
    const navigation = useNavigation<any>();
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, { toValue: 1, tension: 10, friction: 3, useNativeDriver: true }),
            Animated.timing(opacityAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]).start();
    }, []);

    const metrics = [
        { label: 'Focus Score', value: '87%', icon: 'flash', color: Colors.primary },
        { label: 'Emotion Accuracy', value: '90%', icon: 'happy', color: '#10b981' },
        { label: 'Pattern Logic', value: '80%', icon: 'grid', color: '#f59e0b' },
        { label: 'Voice Clarity', value: 'Great', icon: 'mic', color: Colors.accent },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Celebration */}
                <Animated.View style={[styles.celebration, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
                    <Text style={styles.emoji}>🎉</Text>
                    <Text style={styles.title}>Session Complete!</Text>
                    <Text style={styles.subtitle}>You did amazing today!</Text>
                </Animated.View>

                {/* Stars */}
                <View style={styles.starsRow}>
                    {[1, 2, 3].map((i) => (
                        <Animated.Text key={i} style={[styles.star, { opacity: opacityAnim }]}>⭐</Animated.Text>
                    ))}
                </View>

                {/* Metrics */}
                <View style={styles.metricsGrid}>
                    {metrics.map((m, i) => (
                        <View key={i} style={styles.metricCard}>
                            <View style={[styles.metricIcon, { backgroundColor: m.color + '20' }]}>
                                <Ionicons name={m.icon as any} size={24} color={m.color} />
                            </View>
                            <Text style={styles.metricValue}>{m.value}</Text>
                            <Text style={styles.metricLabel}>{m.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Message for child */}
                <View style={styles.messageBox}>
                    <Avatar
                        size={80}
                        source={require('../../../../assets/kids/space_avatar.png')}
                        style={{ marginRight: 8, borderWidth: 0 }}
                    />
                    <View style={styles.messageBubble}>
                        <Text style={styles.messageText}>
                            "Wow, great job today! You were so focused and smart. See you next time!"
                        </Text>
                    </View>
                </View>

                {/* Today's highlight */}
                <View style={styles.highlightCard}>
                    <Text style={styles.highlightTitle}>🌟 Today's Highlight</Text>
                    <Text style={styles.highlightText}>
                        Strong logic skills shown in Pattern Playground. Emotional awareness excelled in Emotion Detective.
                    </Text>
                </View>

                {/* CTA */}
                <TouchableOpacity
                    style={styles.doneBtn}
                    onPress={() => navigation.navigate('ParentMain')}
                >
                    <Text style={styles.doneBtnText}>Back to Dashboard</Text>
                    <Ionicons name="home" size={20} color={Colors.white} />
                </TouchableOpacity>

                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0fdf4' },
    scroll: { padding: Spacing.xl, alignItems: 'center' },
    celebration: { alignItems: 'center', marginBottom: Spacing.lg },
    emoji: { fontSize: 90 },
    title: { fontSize: 36, fontWeight: 'bold', color: '#166534', marginTop: Spacing.md },
    subtitle: { ...Typography.body, color: '#15803d', marginTop: 4, fontSize: 18 },
    starsRow: { flexDirection: 'row', gap: 12, marginBottom: Spacing.xxl },
    star: { fontSize: 40 },
    metricsGrid: {
        flexDirection: 'row', flexWrap: 'wrap', gap: 12,
        justifyContent: 'center', marginBottom: Spacing.xl, width: '100%',
    },
    metricCard: {
        width: (width - Spacing.xl * 2 - 12) / 2 - 1,
        backgroundColor: Colors.white, borderRadius: 20, padding: Spacing.lg,
        alignItems: 'center', ...Shadows.light,
    },
    metricIcon: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    metricValue: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
    metricLabel: { ...Typography.caption, marginTop: 2, textAlign: 'center' },
    messageBox: { flexDirection: 'row', alignItems: 'flex-end', width: '100%', marginBottom: Spacing.xl },
    messageFox: { fontSize: 50, marginRight: 8 },
    messageBubble: {
        flex: 1, backgroundColor: Colors.white, borderRadius: 20,
        borderBottomLeftRadius: 4, padding: Spacing.lg, ...Shadows.light,
    },
    messageText: { ...Typography.body, lineHeight: 24, color: Colors.text, fontStyle: 'italic' },
    highlightCard: {
        backgroundColor: '#fff7ed', borderRadius: 20,
        padding: Spacing.xl, width: '100%', marginBottom: Spacing.xl,
        borderLeftWidth: 4, borderLeftColor: Colors.warning,
    },
    highlightTitle: { ...Typography.subheader, marginBottom: Spacing.sm },
    highlightText: { ...Typography.body, lineHeight: 24, color: '#92400e' },
    doneBtn: {
        backgroundColor: Colors.primary, flexDirection: 'row', gap: 10,
        paddingHorizontal: 44, paddingVertical: 18, borderRadius: 20,
        alignItems: 'center', ...Shadows.medium, width: '100%', justifyContent: 'center',
    },
    doneBtnText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
});

export default SummaryScreen;
