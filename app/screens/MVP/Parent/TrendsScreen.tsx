import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../../components';

const { width } = Dimensions.get('window');

// ── Theme ────────────────────────────────────────────────────────
const Colors = {
    background: '#f0f4ff',
    white: '#ffffff',
    surface: '#e8edf8',
    primary: '#6C63FF',
    success: '#22c55e',
    accent: '#f472b6',
    amber: '#f59e0b',
    text: '#1e293b',
    textLight: '#64748b',
    cardBorder: 'rgba(108,99,255,0.10)',
};

// ── Data ─────────────────────────────────────────────────────────
const moodData = [72, 58, 81, 65, 88, 76, 91];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const metrics = [
    {
        id: 'attention',
        label: 'Attention',
        value: 'Steady',
        score: 82,
        icon: 'checkmark-circle' as const,
        color: Colors.success,
        trend: '+5% vs last week',
        detail:
            'Attention span remained consistent across all 5 sessions this week. Best performance recorded on Thursday morning.',
        sessions: [78, 80, 82, 85, 83],
    },
    {
        id: 'speech',
        label: 'Speech Rate',
        value: 'Normal',
        score: 74,
        icon: 'mic' as const,
        color: Colors.primary,
        trend: 'Stable',
        detail:
            'Speech rate averaged 148 words per minute, well within the optimal 130–160 WPM range for this age group.',
        sessions: [70, 74, 72, 76, 74],
    },
    {
        id: 'focus',
        label: 'Focus Time',
        value: 'High',
        score: 91,
        icon: 'radio-button-on' as const,
        color: Colors.accent,
        trend: '+12% vs last week',
        detail:
            'Uninterrupted focus blocks averaged 22 minutes. A new personal best of 38 minutes was set on Friday.',
        sessions: [80, 88, 90, 91, 95],
    },
    {
        id: 'logic',
        label: 'Logic Games',
        value: 'Expert',
        score: 95,
        icon: 'apps' as const,
        color: Colors.amber,
        trend: 'Top 10% of peers',
        detail:
            'Completed 14 logic puzzles with 93% accuracy. Particularly strong in spatial reasoning and pattern recognition.',
        sessions: [88, 90, 92, 94, 95],
    },
];

type Metric = (typeof metrics)[0];

// ── Mood Bar Chart ────────────────────────────────────────────────
const MoodChart = () => {
    const maxVal = Math.max(...moodData);
    const barMaxHeight = 80;
    return (
        <View style={chart.row}>
            {moodData.map((v, i) => (
                <View key={i} style={chart.col}>
                    <View
                        style={[
                            chart.bar,
                            {
                                height: (v / maxVal) * barMaxHeight,
                                backgroundColor:
                                    v === maxVal ? Colors.accent : Colors.primary,
                                opacity: v === maxVal ? 1 : 0.45,
                            },
                        ]}
                    />
                    <Text style={chart.label}>{days[i]}</Text>
                </View>
            ))}
        </View>
    );
};

const chart = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 100,
        gap: 6,
    },
    col: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4,
    },
    bar: {
        width: '100%',
        borderRadius: 6,
    },
    label: {
        fontSize: 9,
        color: Colors.textLight,
        fontWeight: '600',
    },
});

// ── Session Mini Line Chart ───────────────────────────────────────
const SessionLine = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const W = (width - 48 - 36) * 0.9;
    const H = 36;
    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * W;
        const y = H - ((v - min) / (max - min + 1)) * (H - 6) - 3;
        return { x, y };
    });
    return (
        <View style={{ height: H + 8 }}>
            {/* Line segments */}
            {points.slice(0, -1).map((p, i) => {
                const next = points[i + 1];
                const dx = next.x - p.x;
                const dy = next.y - p.y;
                const len = Math.sqrt(dx * dx + dy * dy);
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                return (
                    <View
                        key={i}
                        style={{
                            position: 'absolute',
                            left: p.x,
                            top: p.y,
                            width: len,
                            height: 2.5,
                            backgroundColor: color,
                            borderRadius: 2,
                            opacity: 0.85,
                            transform: [{ rotate: `${angle}deg` }],
                            transformOrigin: '0 50%',
                        }}
                    />
                );
            })}
            {/* Dots */}
            {points.map((p, i) => (
                <View
                    key={i}
                    style={{
                        position: 'absolute',
                        left: p.x - 4,
                        top: p.y - 4,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: color,
                        opacity: 0.9,
                    }}
                />
            ))}
            {/* X labels */}
            <View style={{ position: 'absolute', bottom: -14, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                {['S1', 'S2', 'S3', 'S4', 'S5'].map(s => (
                    <Text key={s} style={{ fontSize: 9, color: Colors.textLight }}>{s}</Text>
                ))}
            </View>
        </View>
    );
};

// ── Progress Bar ──────────────────────────────────────────────────
const ProgressBar = ({ score, color }: { score: number; color: string }) => (
    <View style={{ height: 4, backgroundColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden', flex: 1 }}>
        <View style={{ height: '100%', width: `${score}%`, backgroundColor: color, borderRadius: 4 }} />
    </View>
);

// ── Bottom Sheet Content ──────────────────────────────────────────
const SheetContent = ({ metric }: { metric: Metric }) => (
    <View style={sheet.container}>
        {/* Handle */}
        <View style={sheet.handle} />

        {/* Header */}
        <View style={sheet.header}>
            <View style={[sheet.iconBox, { backgroundColor: metric.color + '18' }]}>
                <Ionicons name={metric.icon} size={26} color={metric.color} />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={sheet.metricLabel}>{metric.label}</Text>
                <Text style={[sheet.trendText, { color: metric.color }]}>{metric.trend}</Text>
            </View>
            <View style={[sheet.scoreBadge, { backgroundColor: metric.color + '18' }]}>
                <Text style={[sheet.scoreNum, { color: metric.color }]}>{metric.score}</Text>
                <Text style={[sheet.scoreSub, { color: metric.color }]}>/100</Text>
            </View>
        </View>

        <View style={sheet.divider} />

        {/* Status Badge */}
        <View style={[sheet.statusBadge, { backgroundColor: metric.color + '14' }]}>
            <View style={[sheet.statusDot, { backgroundColor: metric.color }]} />
            <Text style={[sheet.statusText, { color: metric.color }]}>{metric.value}</Text>
        </View>

        {/* Detail text */}
        <Text style={sheet.detailText}>{metric.detail}</Text>

        {/* Session Trend */}
        <View style={sheet.sessionCard}>
            <Text style={sheet.sessionTitle}>5-SESSION TREND</Text>
            <SessionLine data={metric.sessions} color={metric.color} />
        </View>

        {/* CTA */}
        <TouchableOpacity
            style={[sheet.ctaButton, { backgroundColor: metric.color }]}
            activeOpacity={0.85}
        >
            <Text style={sheet.ctaText}>View Full Report</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
    </View>
);

const sheet = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        paddingBottom: 12,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#cbd5e1',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    metricLabel: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
    },
    trendText: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
    },
    scoreBadge: {
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 8,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
    },
    scoreNum: {
        fontSize: 22,
        fontWeight: '900',
    },
    scoreSub: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginBottom: 16,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        gap: 6,
        marginBottom: 14,
    },
    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '700',
    },
    detailText: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 22,
        marginBottom: 20,
    },
    sessionCard: {
        backgroundColor: Colors.surface,
        borderRadius: 18,
        padding: 16,
        marginBottom: 20,
    },
    sessionTitle: {
        fontSize: 10,
        fontWeight: '700',
        color: Colors.textLight,
        letterSpacing: 1.2,
        marginBottom: 12,
    },
    ctaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 15,
        borderRadius: 16,
        marginBottom: 8,
    },
    ctaText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
});

// ── Main Screen ───────────────────────────────────────────────────
const TrendsScreen = () => {
    const rbSheetRef = useRef<any>(null);
    const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);

    const openSheet = (metric: Metric) => {
        setSelectedMetric(metric);
        rbSheetRef.current?.open();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.headerBlock}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.eyebrow}>THIS WEEK</Text>
                            <Text style={styles.title}>Insights &{'\n'}Trends</Text>
                        </View>
                        <Avatar size={50} emoji="🦊" />
                    </View>
                </View>

                {/* Mood Chart Card */}
                <View style={styles.card}>
                    <View style={styles.cardRow}>
                        <View>
                            <Text style={styles.cardTitle}>Mood Trend</Text>
                            <Text style={styles.cardSub}>Last 7 days</Text>
                        </View>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>↑ 15% this week</Text>
                        </View>
                    </View>
                    <MoodChart />
                </View>

                {/* Metric Cards Grid */}
                <View style={styles.grid}>
                    {metrics.map((m) => (
                        <TouchableOpacity
                            key={m.id}
                            style={styles.metricCard}
                            onPress={() => openSheet(m)}
                            activeOpacity={0.75}
                        >
                            <Ionicons name={m.icon} size={26} color={m.color} style={{ marginBottom: 10 }} />
                            <Text style={styles.metricCardLabel}>{m.label}</Text>
                            <Text style={styles.metricCardValue}>{m.value}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 }}>
                                <ProgressBar score={m.score} color={m.color} />
                                <Text style={[styles.metricScore, { color: m.color }]}>{m.score}</Text>
                            </View>
                            <Text style={styles.tapHint}>Tap for details →</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Weekly Summary */}
                <View style={styles.summaryCard}>
                    <View style={styles.cardRow}>
                        <Ionicons name="document-text" size={20} color={Colors.primary} />
                        <Text style={[styles.cardTitle, { marginLeft: 8 }]}>Weekly Summary</Text>
                    </View>
                    <Text style={styles.summaryText}>
                        <Text style={{ fontWeight: '700' }}>[Child Name]</Text> showed high persistence in logic games this week.
                        Attention variability was low, indicating good focus during sessions.
                        Speech rate remained in the optimal zone throughout all recorded activities.
                    </Text>
                    <View style={styles.tagRow}>
                        {['🎯 Focus', '🧩 Logic', '🎙️ Speech'].map(tag => (
                            <View key={tag} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Sheet */}
            <RBSheet
                ref={rbSheetRef}
                height={480}
                openDuration={300}
                closeDuration={260}
                customStyles={{
                    wrapper: { backgroundColor: 'rgba(15,23,42,0.45)' },
                    container: {
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        backgroundColor: Colors.white,
                    },
                    draggableIcon: { display: 'none' }, // we render our own handle
                }}
                draggable
            >
                {selectedMetric && <SheetContent metric={selectedMetric} />}
            </RBSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    // Header
    headerBlock: {
        marginBottom: 24,
    },
    eyebrow: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 2,
        color: Colors.primary,
        marginBottom: 6,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.text,
        lineHeight: 38,
    },

    // Card base
    card: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
    },
    cardSub: {
        fontSize: 12,
        color: Colors.textLight,
        marginTop: 2,
    },
    badge: {
        backgroundColor: '#dcfce7',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.success,
    },

    // Metric grid
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16,
    },
    metricCard: {
        width: (width - 52) / 2,
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 16,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
    },
    metricCardLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: Colors.textLight,
        marginBottom: 2,
    },
    metricCardValue: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
    },
    metricScore: {
        fontSize: 11,
        fontWeight: '700',
    },
    tapHint: {
        fontSize: 10,
        color: Colors.textLight,
        marginTop: 8,
    },

    // Summary
    summaryCard: {
        backgroundColor: '#eff6ff',
        borderRadius: 22,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(99,102,241,0.12)',
    },
    summaryText: {
        fontSize: 14,
        color: '#334155',
        lineHeight: 22,
        marginBottom: 14,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 8,
    },
    tag: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'rgba(108,99,255,0.15)',
    },
    tagText: {
        fontSize: 11,
        fontWeight: '600',
        color: Colors.primary,
    },
});

export default TrendsScreen;