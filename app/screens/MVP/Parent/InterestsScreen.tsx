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
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Avatar } from '../../../components';

const { width } = Dimensions.get('window');

// ── Data ──────────────────────────────────────────────────────────
const interests = [
    {
        name: 'Logic & Math',
        score: 85,
        icon: 'calculator' as const,
        color: '#6366f1',
        level: 'Advanced',
        weeklyGrowth: '+4%',
        sessions: [70, 74, 78, 81, 85],
        description:
            'Shows strong problem-solving instincts. Excels in number patterns, sequencing, and deductive reasoning tasks.',
        activities: ['Number Puzzles', 'Pattern Blocks', 'Strategy Games'],
        tip: 'Introduce Sudoku Jr. or chess to deepen logical thinking.',
    },
    {
        name: 'Creativity',
        score: 72,
        icon: 'brush' as const,
        color: '#ec4899',
        level: 'Intermediate',
        weeklyGrowth: '+7%',
        sessions: [55, 60, 65, 68, 72],
        description:
            'Demonstrates imaginative thinking during free-play and storytelling activities. Strong visual expression skills.',
        activities: ['Drawing Games', 'Story Builder', 'Color Mix'],
        tip: 'Try open-ended art prompts to spark creative exploration.',
    },
    {
        name: 'Language',
        score: 68,
        icon: 'language' as const,
        color: '#10b981',
        level: 'Developing',
        weeklyGrowth: '+2%',
        sessions: [58, 61, 63, 66, 68],
        description:
            'Growing vocabulary and sentence formation observed. Engages well with rhyming and word-association games.',
        activities: ['Word Match', 'Story Completion', 'Rhyme Games'],
        tip: 'Read aloud daily and ask open-ended questions about the story.',
    },
    {
        name: 'Persistence',
        score: 92,
        icon: 'infinite' as const,
        color: '#f59e0b',
        level: 'Expert',
        weeklyGrowth: '+1%',
        sessions: [88, 89, 90, 91, 92],
        description:
            'Exceptional follow-through on difficult tasks. Rarely gives up and often returns to incomplete challenges independently.',
        activities: ['Long-form Puzzles', 'Build Challenges', 'Multi-step Tasks'],
        tip: 'Channel this strength into collaborative team tasks.',
    },
];

type Interest = (typeof interests)[0];

// ── Session Sparkline ─────────────────────────────────────────────
const SessionLine = ({ data, color }: { data: number[]; color: string }) => {
    const W = width - 48 - 44;
    const H = 44;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const pts = data.map((v, i) => ({
        x: (i / (data.length - 1)) * W,
        y: H - ((v - min) / (max - min + 1)) * (H - 8) - 4,
    }));
    return (
        <View style={{ height: H + 20 }}>
            {pts.slice(0, -1).map((p, i) => {
                const n = pts[i + 1];
                const dx = n.x - p.x;
                const dy = n.y - p.y;
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
                            opacity: 0.8,
                            transform: [{ rotate: `${angle}deg` }],
                            // @ts-ignore
                            transformOrigin: '0 50%',
                        }}
                    />
                );
            })}
            {pts.map((p, i) => (
                <View
                    key={i}
                    style={{
                        position: 'absolute',
                        left: p.x - 5,
                        top: p.y - 5,
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: color,
                        borderWidth: 2,
                        borderColor: '#fff',
                    }}
                />
            ))}
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                {['S1', 'S2', 'S3', 'S4', 'S5'].map(s => (
                    <Text key={s} style={{ fontSize: 9, color: Colors.textLight }}>
                        {s}
                    </Text>
                ))}
            </View>
        </View>
    );
};

// ── Sheet Content ─────────────────────────────────────────────────
const SheetContent = ({ item, onClose }: { item: Interest; onClose: () => void }) => (
    <ScrollView
        contentContainerStyle={sheet.container}
        showsVerticalScrollIndicator={false}
    >
        {/* Handle */}
        <View style={sheet.handle} />

        {/* Header */}
        <View style={sheet.header}>
            <View style={[sheet.iconBox, { backgroundColor: item.color + '18' }]}>
                <Ionicons name={item.icon} size={28} color={item.color} />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={sheet.title}>{item.name}</Text>
                <View style={sheet.growthRow}>
                    <View style={[sheet.dot, { backgroundColor: item.color }]} />
                    <Text style={[sheet.growth, { color: item.color }]}>
                        {item.weeklyGrowth} this week
                    </Text>
                </View>
            </View>
            <View style={[sheet.levelBadge, { backgroundColor: item.color + '18' }]}>
                <Text style={[sheet.levelText, { color: item.color }]}>{item.level}</Text>
            </View>
        </View>

        {/* Score Ring Row */}
        <View style={sheet.scoreRow}>
            <View style={[sheet.scoreBox, { borderColor: item.color + '30' }]}>
                <Text style={[sheet.scoreNum, { color: item.color }]}>{item.score}%</Text>
                <Text style={sheet.scoreSub}>Confidence</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={sheet.sectionLabel}>OVERALL PROGRESS</Text>
                <View style={sheet.bigBar}>
                    <View
                        style={[
                            sheet.bigBarFill,
                            { width: `${item.score}%`, backgroundColor: item.color },
                        ]}
                    />
                </View>
                <Text style={[sheet.description, { marginTop: 10 }]}>{item.description}</Text>
            </View>
        </View>

        <View style={sheet.divider} />

        {/* Session Trend */}
        <Text style={sheet.sectionLabel}>5-SESSION TREND</Text>
        <View style={[sheet.sessionCard, { borderColor: item.color + '20' }]}>
            <SessionLine data={item.sessions} color={item.color} />
        </View>

        <View style={sheet.divider} />

        {/* Top Activities */}
        <Text style={sheet.sectionLabel}>TOP ACTIVITIES</Text>
        <View style={sheet.activitiesRow}>
            {item.activities.map(act => (
                <View key={act} style={[sheet.activityTag, { backgroundColor: item.color + '12', borderColor: item.color + '25' }]}>
                    <Text style={[sheet.activityText, { color: item.color }]}>{act}</Text>
                </View>
            ))}
        </View>

        <View style={sheet.divider} />

        {/* Tip */}
        <View style={sheet.tipBox}>
            <Ionicons name="bulb" size={18} color="#f59e0b" />
            <Text style={sheet.tipText}>{item.tip}</Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
            style={[sheet.cta, { backgroundColor: item.color }]}
            activeOpacity={0.85}
            onPress={onClose}
        >
            <Text style={sheet.ctaText}>View Full Report</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
    </ScrollView>
);

const sheet = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        paddingBottom: 24,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#cbd5e1',
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 22,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconBox: {
        width: 54,
        height: 54,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1e293b',
    },
    growthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 3,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    growth: {
        fontSize: 12,
        fontWeight: '600',
    },
    levelBadge: {
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    levelText: {
        fontSize: 12,
        fontWeight: '700',
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    scoreBox: {
        width: 76,
        height: 76,
        borderRadius: 20,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreNum: {
        fontSize: 20,
        fontWeight: '900',
    },
    scoreSub: {
        fontSize: 9,
        color: '#94a3b8',
        fontWeight: '600',
        marginTop: 1,
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94a3b8',
        letterSpacing: 1.3,
        marginBottom: 10,
    },
    bigBar: {
        height: 7,
        backgroundColor: '#f1f5f9',
        borderRadius: 4,
        overflow: 'hidden',
    },
    bigBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    description: {
        fontSize: 13,
        color: '#475569',
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginVertical: 18,
    },
    sessionCard: {
        backgroundColor: '#f8fafc',
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
    },
    activitiesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    activityTag: {
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 7,
    },
    activityText: {
        fontSize: 12,
        fontWeight: '700',
    },
    tipBox: {
        flexDirection: 'row',
        backgroundColor: '#fffbeb',
        borderRadius: 16,
        padding: 14,
        gap: 10,
        alignItems: 'flex-start',
        marginBottom: 18,
    },
    tipText: {
        flex: 1,
        fontSize: 13,
        color: '#92400e',
        lineHeight: 20,
    },
    cta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 15,
        borderRadius: 16,
    },
    ctaText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
});

// ── Main Screen ───────────────────────────────────────────────────
const InterestsScreen = () => {
    const rbSheetRef = useRef<any>(null);
    const [selected, setSelected] = useState<Interest | null>(null);

    const openSheet = (item: Interest) => {
        setSelected(item);
        rbSheetRef.current?.open();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.eyebrow}>CHILD PROFILE</Text>
                        <Text style={styles.title}>Interest{'\n'}Discovery</Text>
                        <Text style={styles.subtitle}>Based on play patterns and engagement</Text>
                    </View>
                    <Avatar size={50} emoji="🦄" />
                </View>

                {/* Interest Cards */}
                <View style={styles.list}>
                    {interests.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.interestCard}
                            onPress={() => openSheet(item)}
                            activeOpacity={0.75}
                        >
                            <View style={[styles.iconBox, { backgroundColor: item.color + '18' }]}>
                                <Ionicons name={item.icon} size={24} color={item.color} />
                            </View>
                            <View style={styles.info}>
                                <View style={styles.row}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <View style={[styles.levelPill, { backgroundColor: item.color + '14' }]}>
                                        <Text style={[styles.levelPillText, { color: item.color }]}>
                                            {item.level}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.scoreRow}>
                                    <Text style={[styles.scoreText, { color: item.color }]}>
                                        {item.score}% Confidence
                                    </Text>
                                    <Text style={styles.growthChip}>{item.weeklyGrowth}</Text>
                                </View>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${item.score}%`, backgroundColor: item.color },
                                        ]}
                                    />
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#cbd5e1" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tip Card */}
                <View style={styles.tipCard}>
                    <View style={styles.tipIconWrap}>
                        <Ionicons name="bulb" size={20} color="#f59e0b" />
                    </View>
                    <Text style={styles.tipText}>
                        Try introducing more puzzle games this week to further explore Logic interests.
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Sheet */}
            <RBSheet
                ref={rbSheetRef}
                height={560}
                openDuration={300}
                closeDuration={260}
                draggable
                customStyles={{
                    wrapper: { backgroundColor: 'rgba(15,23,42,0.45)' },
                    container: {
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        backgroundColor: '#ffffff',
                    },
                    draggableIcon: { display: 'none' },
                }}
            >
                {selected && (
                    <SheetContent
                        item={selected}
                        onClose={() => rbSheetRef.current?.close()}
                    />
                )}
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
        padding: Spacing.xl,
        paddingBottom: 48,
    },

    // Header
    eyebrow: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 2,
        color: '#6366f1',
        marginBottom: 6,
    },
    title: {
        ...Typography.header,
        fontSize: 32,
        fontWeight: '800',
        lineHeight: 38,
        marginBottom: 6,
    },
    subtitle: {
        ...Typography.caption,
        marginBottom: Spacing.xl,
    },

    // Cards
    list: {
        gap: Spacing.lg,
        marginBottom: Spacing.xl,
    },
    interestCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: Spacing.lg,
        borderRadius: 22,
        ...Shadows.light,
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.lg,
    },
    info: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    name: {
        ...Typography.body,
        fontWeight: '700',
        fontSize: 15,
        color: '#1e293b',
    },
    levelPill: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    levelPillText: {
        fontSize: 10,
        fontWeight: '700',
    },
    scoreText: {
        fontSize: 12,
        fontWeight: '600',
    },
    growthChip: {
        fontSize: 11,
        fontWeight: '700',
        color: '#22c55e',
        backgroundColor: '#dcfce7',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    progressBar: {
        height: 7,
        backgroundColor: '#f1f5f9',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },

    // Tip
    tipCard: {
        flexDirection: 'row',
        backgroundColor: '#fffbeb',
        padding: Spacing.xl,
        borderRadius: 20,
        alignItems: 'flex-start',
        gap: Spacing.md,
        borderWidth: 1,
        borderColor: '#fef3c7',
    },
    tipIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#fef9c3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipText: {
        flex: 1,
        ...Typography.body,
        fontSize: 14,
        color: '#92400e',
        lineHeight: 22,
    },
});

export default InterestsScreen;