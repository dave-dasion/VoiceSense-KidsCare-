import React, { useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView,
    TouchableOpacity, Alert,
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../../components';

const weekData = [
    { day: 'Mon', mood: 0.8, attention: 0.7 },
    { day: 'Tue', mood: 0.9, attention: 0.85 },
    { day: 'Wed', mood: 0.6, attention: 0.5 },
    { day: 'Thu', mood: 0.75, attention: 0.8 },
    { day: 'Fri', mood: 0.85, attention: 0.9 },
    { day: 'Sat', mood: 0.7, attention: 0.65 },
    { day: 'Sun', mood: 0.95, attention: 0.88 },
];

const BAR_HEIGHT = 120;

const ReportScreen = () => {
    const [activeTab, setActiveTab] = useState<'week' | 'month'>('week');

    const handleExport = (type: 'PDF' | 'JSON') => {
        Alert.alert(`Export ${type}`, `Your report has been exported as ${type}.`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View>
                        <Text style={styles.title}>📊 Weekly Report</Text>
                        <Text style={styles.subtitle}>March 1 – March 7, 2026</Text>
                    </View>
                    <Avatar size={50} emoji="🦊" />
                </View>

                {/* Tab toggle */}
                <View style={styles.tabRow}>
                    {(['week', 'month'] as const).map((t) => (
                        <TouchableOpacity key={t} style={[styles.tab, activeTab === t && styles.tabActive]}
                            onPress={() => setActiveTab(t)}>
                            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
                                {t === 'week' ? 'This Week' : 'This Month'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Stats row */}
                <View style={styles.statsRow}>
                    {[
                        { icon: 'calendar-sharp', label: 'Sessions', value: '6', color: '#6366f1' },
                        { icon: 'happy-outline', label: 'Avg Mood', value: '78%', color: '#10b981' },
                        { icon: 'flash-outline', label: 'Attention', value: '75%', color: '#f59e0b' },
                    ].map((s, i) => (
                        <View key={i} style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: s.color + '20' }]}>
                                <Ionicons name={s.icon as any} size={22} color={s.color} />
                            </View>
                            <Text style={styles.statValue}>{s.value}</Text>
                            <Text style={styles.statLabel}>{s.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Mood & Attention Bar Chart */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Mood & Attention Trends</Text>
                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
                            <Text style={styles.legendText}>Mood</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: Colors.success }]} />
                            <Text style={styles.legendText}>Attention</Text>
                        </View>
                    </View>
                    <View style={styles.chartArea}>
                        {weekData.map((d, i) => (
                            <View key={i} style={styles.barGroup}>
                                <View style={styles.bars}>
                                    <View style={[styles.bar, { height: BAR_HEIGHT * d.mood, backgroundColor: Colors.primary + 'cc' }]} />
                                    <View style={[styles.bar, { height: BAR_HEIGHT * d.attention, backgroundColor: Colors.success + 'cc' }]} />
                                </View>
                                <Text style={styles.barLabel}>{d.day}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Interest Snapshot */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🌟 Interests This Week</Text>
                    {[
                        { name: 'Logic & Math', conf: 82, color: Colors.primary },
                        { name: 'Creativity', conf: 67, color: '#ec4899' },
                        { name: 'Persistence', conf: 91, color: Colors.success },
                    ].map((item, i) => (
                        <View key={i} style={styles.interestRow}>
                            <Text style={styles.interestName}>{item.name}</Text>
                            <View style={styles.interestBarBg}>
                                <View style={[styles.interestBarFill, { width: `${item.conf}%`, backgroundColor: item.color }]} />
                            </View>
                            <Text style={[styles.interestConf, { color: item.color }]}>{item.conf}%</Text>
                        </View>
                    ))}
                </View>

                {/* Risk Summary */}
                <View style={[styles.card, { backgroundColor: '#fffbeb', borderLeftWidth: 4, borderLeftColor: '#f59e0b' }]}>
                    <Text style={styles.cardTitle}>⚠️ Risk Summary</Text>
                    <Text style={styles.riskText}>
                        Increased worry signals observed 3 times this week. Stress score was elevated on Tuesday and Wednesday. No critical escalations reported.
                    </Text>
                    <View style={styles.riskNote}>
                        <Ionicons name="heart-outline" size={16} color='#92400e' />
                        <Text style={styles.riskNoteText}>Language is supportive — not diagnostic.</Text>
                    </View>
                </View>

                {/* Export Buttons */}
                <Text style={styles.exportTitle}>Export Report</Text>
                <View style={styles.exportRow}>
                    <TouchableOpacity style={[styles.exportBtn, { backgroundColor: Colors.primary }]} onPress={() => handleExport('PDF')}>
                        <Ionicons name="document-text-outline" size={22} color={Colors.white} />
                        <Text style={styles.exportBtnText}>Export PDF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.exportBtn, { backgroundColor: '#0f172a' }]} onPress={() => handleExport('JSON')}>
                        <Ionicons name="code-slash-outline" size={22} color={Colors.white} />
                        <Text style={styles.exportBtnText}>Export JSON</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scroll: { padding: Spacing.xl },
    title: { ...Typography.header },
    subtitle: { ...Typography.caption, fontSize: 16, marginBottom: Spacing.xl },
    tabRow: {
        flexDirection: 'row', backgroundColor: '#f1f5f9',
        borderRadius: 16, padding: 4, marginBottom: Spacing.xl,
    },
    tab: { flex: 1, padding: Spacing.sm + 2, borderRadius: 13, alignItems: 'center' },
    tabActive: { backgroundColor: Colors.white, ...Shadows.light },
    tabText: { fontWeight: '600', color: Colors.textLight },
    tabTextActive: { color: Colors.primary },
    statsRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xl },
    statCard: {
        flex: 1, backgroundColor: Colors.white, borderRadius: 18,
        padding: Spacing.md, alignItems: 'center', ...Shadows.light,
    },
    statIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
    statValue: { fontSize: 22, fontWeight: 'bold', color: Colors.text },
    statLabel: { ...Typography.caption, fontSize: 12, marginTop: 2 },
    card: {
        backgroundColor: Colors.white, borderRadius: 22, padding: Spacing.xl,
        marginBottom: Spacing.xl, ...Shadows.medium,
    },
    cardTitle: { ...Typography.subheader, marginBottom: Spacing.lg },
    legend: { flexDirection: 'row', gap: Spacing.lg, marginBottom: Spacing.md },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 10, height: 10, borderRadius: 5 },
    legendText: { ...Typography.caption },
    chartArea: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'flex-end', height: BAR_HEIGHT + 30, paddingBottom: 20,
        borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
    },
    barGroup: { alignItems: 'center', flex: 1 },
    bars: { flexDirection: 'row', gap: 3, alignItems: 'flex-end' },
    bar: { width: 10, borderRadius: 5 },
    barLabel: { fontSize: 10, color: Colors.textLight, marginTop: 6 },
    interestRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
    interestName: { ...Typography.body, fontWeight: '600', width: 110 },
    interestBarBg: { flex: 1, height: 10, backgroundColor: '#f1f5f9', borderRadius: 5, overflow: 'hidden' },
    interestBarFill: { height: '100%', borderRadius: 5 },
    interestConf: { width: 40, fontWeight: 'bold', textAlign: 'right' },
    riskText: { ...Typography.body, lineHeight: 24, color: '#78350f', marginBottom: Spacing.md },
    riskNote: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    riskNoteText: { color: '#92400e', fontSize: 13, fontStyle: 'italic' },
    exportTitle: { ...Typography.subheader, marginBottom: Spacing.md },
    exportRow: { flexDirection: 'row', gap: Spacing.md },
    exportBtn: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 8, padding: Spacing.md + 4, borderRadius: 14,
    },
    exportBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 15 },
});

export default ReportScreen;
