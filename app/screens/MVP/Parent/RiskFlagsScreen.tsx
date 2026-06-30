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
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../../../components';

const { width } = Dimensions.get('window');

// ── Data ──────────────────────────────────────────────────────────
const riskFlags = [
    {
        id: '1',
        level: 'High',
        label: 'Stress score elevated 3 days in a row',
        date: 'March 1–3',
        color: '#ef4444',
        bg: '#fef2f2',
        icon: 'alert-circle' as const,
        detail:
            'Stress indicators exceeded the baseline threshold on three consecutive days. This pattern may reflect external pressure, sleep disruption, or emotional overload.',
        recommendations: [
            'Introduce calming activities before sessions',
            'Review sleep and routine schedule',
            'Consider speaking with a child psychologist',
        ],
        sessions: 3,
        severity: 92,
    },
    {
        id: '2',
        level: 'Medium',
        label: 'Mood flatness detected during session',
        date: 'Feb 28',
        color: '#f59e0b',
        bg: '#fffbeb',
        icon: 'warning' as const,
        detail:
            'Emotional engagement was noticeably lower than average. The child responded with minimal affect across play and language tasks during this session.',
        recommendations: [
            'Offer preferred activities to re-engage',
            'Check for illness or fatigue',
            'Monitor for recurrence over the next week',
        ],
        sessions: 1,
        severity: 61,
    },
    {
        id: '3',
        level: 'Medium',
        label: 'Withdrawal from play activity',
        date: 'Feb 26',
        color: '#f59e0b',
        bg: '#fffbeb',
        icon: 'sad-outline' as const,
        detail:
            'The child avoided group and interactive play, preferring solitary tasks. This is a notable shift from typical engagement patterns observed over the past month.',
        recommendations: [
            'Introduce low-pressure cooperative games',
            'Observe peer interaction dynamics',
            'Avoid forcing group participation',
        ],
        sessions: 1,
        severity: 58,
    },
    {
        id: '4',
        level: 'Low',
        label: 'Increased speech hesitancy noted',
        date: 'Feb 24',
        color: '#6366f1',
        bg: '#eef2ff',
        icon: 'mic-off-outline' as const,
        detail:
            'More frequent pauses and filler words were detected during verbal response tasks. This may be situational or related to topic difficulty rather than a developmental concern.',
        recommendations: [
            'Use open-ended, low-stakes prompts',
            'Provide extra response time',
            'Track frequency over the next 2 weeks',
        ],
        sessions: 1,
        severity: 34,
    },
];

type Flag = (typeof riskFlags)[0];

// ── Sheet Content ─────────────────────────────────────────────────
const SheetContent = ({ flag, onClose }: { flag: Flag; onClose: () => void }) => (
    <ScrollView
        contentContainerStyle={sheet.container}
        showsVerticalScrollIndicator={false}
    >
        {/* Handle */}
        <View style={sheet.handle} />

        {/* Header */}
        <View style={[sheet.headerBox, { backgroundColor: flag.bg }]}>
            <View style={[sheet.iconCircle, { backgroundColor: flag.color }]}>
                <Ionicons name={flag.icon} size={26} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={sheet.badgeRow}>
                    <View style={[sheet.levelBadge, { backgroundColor: flag.color }]}>
                        <Text style={sheet.levelText}>{flag.level} Risk</Text>
                    </View>
                    <Text style={sheet.dateChip}>{flag.date}</Text>
                </View>
                <Text style={sheet.flagTitle}>{flag.label}</Text>
            </View>
        </View>

        {/* Severity Bar */}
        <View style={sheet.severityRow}>
            <Text style={sheet.sectionLabel}>SEVERITY INDEX</Text>
            <Text style={[sheet.severityNum, { color: flag.color }]}>{flag.severity}/100</Text>
        </View>
        <View style={sheet.severityTrack}>
            <View
                style={[
                    sheet.severityFill,
                    { width: `${flag.severity}%`, backgroundColor: flag.color },
                ]}
            />
        </View>

        <View style={sheet.divider} />

        {/* Detail */}
        <Text style={sheet.sectionLabel}>WHAT WAS DETECTED</Text>
        <Text style={sheet.detailText}>{flag.detail}</Text>

        <View style={sheet.divider} />

        {/* Recommendations */}
        <Text style={sheet.sectionLabel}>RECOMMENDATIONS</Text>
        <View style={sheet.recList}>
            {flag.recommendations.map((rec, i) => (
                <View key={i} style={[sheet.recRow, { borderLeftColor: flag.color }]}>
                    <View style={[sheet.recDot, { backgroundColor: flag.color }]} />
                    <Text style={sheet.recText}>{rec}</Text>
                </View>
            ))}
        </View>

        <View style={sheet.divider} />

        {/* Disclaimer */}
        <View style={sheet.disclaimer}>
            <Ionicons name="information-circle" size={16} color="#6366f1" />
            <Text style={sheet.disclaimerText}>
                These signals are informational only and not a clinical diagnosis.
            </Text>
        </View>

        {/* Actions */}
        <View style={sheet.actionRow}>
            <TouchableOpacity
                style={[sheet.ctaOutline, { borderColor: flag.color }]}
                activeOpacity={0.8}
                onPress={onClose}
            >
                <Ionicons name="download-outline" size={16} color={flag.color} />
                <Text style={[sheet.ctaOutlineText, { color: flag.color }]}>Export</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[sheet.ctaSolid, { backgroundColor: flag.color, flex: 2 }]}
                activeOpacity={0.85}
                onPress={onClose}
            >
                <Text style={sheet.ctaSolidText}>Share with Professional</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
        </View>
    </ScrollView>
);

const sheet = StyleSheet.create({
    container: { paddingHorizontal: 20, paddingBottom: 28 },
    handle: {
        width: 40, height: 4, borderRadius: 2,
        backgroundColor: '#cbd5e1',
        alignSelf: 'center',
        marginTop: 12, marginBottom: 20,
    },
    headerBox: {
        flexDirection: 'row', alignItems: 'flex-start',
        borderRadius: 20, padding: 16, marginBottom: 20,
    },
    iconCircle: {
        width: 52, height: 52, borderRadius: 16,
        alignItems: 'center', justifyContent: 'center',
    },
    badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
    levelBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
    levelText: { color: '#fff', fontSize: 11, fontWeight: '800' },
    dateChip: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
    flagTitle: { fontSize: 15, fontWeight: '700', color: '#1e293b', lineHeight: 22 },
    severityRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 8,
    },
    sectionLabel: {
        fontSize: 10, fontWeight: '700',
        color: '#94a3b8', letterSpacing: 1.3,
    },
    severityNum: { fontSize: 13, fontWeight: '800' },
    severityTrack: {
        height: 8, backgroundColor: '#f1f5f9',
        borderRadius: 4, overflow: 'hidden', marginBottom: 4,
    },
    severityFill: { height: '100%', borderRadius: 4 },
    divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 18 },
    detailText: { fontSize: 14, color: '#475569', lineHeight: 22, marginTop: 10 },
    recList: { gap: 10, marginTop: 10 },
    recRow: {
        flexDirection: 'row', alignItems: 'flex-start',
        gap: 10, borderLeftWidth: 3,
        paddingLeft: 12, paddingVertical: 4,
    },
    recDot: { width: 7, height: 7, borderRadius: 4, marginTop: 6 },
    recText: { flex: 1, fontSize: 13, color: '#334155', lineHeight: 20 },
    disclaimer: {
        flexDirection: 'row', gap: 8, alignItems: 'flex-start',
        backgroundColor: '#eff6ff', borderRadius: 12,
        padding: 12, marginBottom: 18,
    },
    disclaimerText: { flex: 1, fontSize: 12, color: '#1e40af', lineHeight: 18 },
    actionRow: { flexDirection: 'row', gap: 10 },
    ctaOutline: {
        flex: 1, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', gap: 6,
        paddingVertical: 14, borderRadius: 14,
        borderWidth: 2,
    },
    ctaOutlineText: { fontSize: 14, fontWeight: '700' },
    ctaSolid: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', gap: 8,
        paddingVertical: 14, borderRadius: 14,
    },
    ctaSolidText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});

// ── Main Screen ───────────────────────────────────────────────────
const RiskFlagsScreen = () => {
    const navigation = useNavigation<any>();
    const rbSheetRef = useRef<any>(null);
    const [selected, setSelected] = useState<Flag | null>(null);

    const openSheet = (flag: Flag) => {
        setSelected(flag);
        rbSheetRef.current?.open();
    };

    const highCount = riskFlags.filter(f => f.level === 'High').length;
    const medCount = riskFlags.filter(f => f.level === 'Medium').length;
    const lowCount = riskFlags.filter(f => f.level === 'Low').length;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.eyebrow}>CHILD SAFETY</Text>
                        <Text style={styles.title}>Risk Flags</Text>
                        <Text style={styles.subtitle}>Review flagged signals from recent sessions</Text>
                    </View>
                    <Avatar size={50} emoji="🦁" />
                </View>

                {/* Summary Row */}
                <View style={styles.summaryRow}>
                    {[
                        { count: highCount, label: 'High', color: '#ef4444', bg: '#fef2f2', icon: 'alert-circle' as const },
                        { count: medCount, label: 'Medium', color: '#f59e0b', bg: '#fffbeb', icon: 'warning' as const },
                        { count: lowCount, label: 'Low', color: '#6366f1', bg: '#eef2ff', icon: 'checkmark-circle' as const },
                    ].map(s => (
                        <View key={s.label} style={[styles.summaryCard, { backgroundColor: s.bg }]}>
                            <Ionicons name={s.icon} size={20} color={s.color} style={{ marginBottom: 6 }} />
                            <Text style={[styles.summaryNumber, { color: s.color }]}>{s.count}</Text>
                            <Text style={[styles.summaryLabel, { color: s.color }]}>{s.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Info Banner */}
                <View style={styles.infoBox}>
                    <Ionicons name="information-circle" size={20} color={Colors.primary} />
                    <Text style={styles.infoText}>
                        These signals are informational only and not a clinical diagnosis. Consider discussing with a professional if concerns persist.
                    </Text>
                </View>

                {/* Flag Cards */}
                <View style={styles.flagList}>
                    {riskFlags.map((flag) => (
                        <TouchableOpacity
                            key={flag.id}
                            style={[styles.flagCard, { backgroundColor: flag.bg }]}
                            onPress={() => openSheet(flag)}
                            activeOpacity={0.75}
                        >
                            <View style={[styles.flagIcon, { backgroundColor: flag.color }]}>
                                <Ionicons name={flag.icon} size={22} color="#fff" />
                            </View>
                            <View style={styles.flagContent}>
                                <View style={styles.flagHeader}>
                                    <View style={[styles.levelBadge, { backgroundColor: flag.color }]}>
                                        <Text style={styles.levelBadgeText}>{flag.level}</Text>
                                    </View>
                                    <Text style={styles.flagDate}>{flag.date}</Text>
                                </View>
                                <Text style={styles.flagLabel}>{flag.label}</Text>
                                {/* Severity mini bar */}
                                <View style={styles.miniBarTrack}>
                                    <View
                                        style={[
                                            styles.miniBarFill,
                                            { width: `${flag.severity}%`, backgroundColor: flag.color },
                                        ]}
                                    />
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#cbd5e1" style={{ marginLeft: 6 }} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Export Button */}
                <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
                    <Ionicons name="download-outline" size={20} color={Colors.primary} />
                    <Text style={styles.actionBtnText}>Export Risk Report</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Sheet */}
            <RBSheet
                ref={rbSheetRef}
                height={580}
                openDuration={300}
                closeDuration={260}
                draggable
                customStyles={{
                    wrapper: { backgroundColor: 'rgba(15,23,42,0.5)' },
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
                        flag={selected}
                        onClose={() => rbSheetRef.current?.close()}
                    />
                )}
            </RBSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scroll: { padding: Spacing.xl, paddingBottom: 48 },

    // Header
    eyebrow: {
        fontSize: 11, fontWeight: '700',
        letterSpacing: 2, color: '#ef4444', marginBottom: 6,
    },
    title: { ...Typography.header, fontSize: 32, fontWeight: '800', marginBottom: 4 },
    subtitle: { ...Typography.caption, fontSize: 14, marginBottom: Spacing.xl },

    // Summary
    summaryRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xl },
    summaryCard: {
        flex: 1, paddingVertical: 16, paddingHorizontal: 8,
        borderRadius: 18, alignItems: 'center', ...Shadows.light,
    },
    summaryNumber: { fontSize: 28, fontWeight: '900', lineHeight: 32 },
    summaryLabel: { fontSize: 12, fontWeight: '700', marginTop: 2 },

    // Info
    infoBox: {
        flexDirection: 'row', alignItems: 'flex-start', gap: 10,
        backgroundColor: '#eff6ff', padding: 14,
        borderRadius: 14, marginBottom: Spacing.xl,
        borderLeftWidth: 4, borderLeftColor: Colors.primary,
    },
    infoText: { flex: 1, fontSize: 13, color: '#1e40af', lineHeight: 20 },

    // Flag cards
    flagList: { gap: Spacing.md, marginBottom: Spacing.xl },
    flagCard: {
        flexDirection: 'row', alignItems: 'center',
        borderRadius: 20, padding: Spacing.lg, gap: 14,
    },
    flagIcon: {
        width: 48, height: 48, borderRadius: 15,
        justifyContent: 'center', alignItems: 'center',
        flexShrink: 0,
    },
    flagContent: { flex: 1 },
    flagHeader: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 5,
    },
    levelBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
    levelBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
    flagDate: { ...Typography.caption, fontSize: 11 },
    flagLabel: { ...Typography.body, fontWeight: '600', lineHeight: 20, marginBottom: 8 },
    miniBarTrack: { height: 4, backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 2, overflow: 'hidden' },
    miniBarFill: { height: '100%', borderRadius: 2, opacity: 0.7 },

    // Export
    actionBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 8, paddingVertical: 15, borderRadius: 16,
        borderWidth: 2, borderColor: Colors.primary,
        backgroundColor: Colors.white,
    },
    actionBtnText: { color: Colors.primary, fontWeight: '800', fontSize: 15 },
});

export default RiskFlagsScreen;