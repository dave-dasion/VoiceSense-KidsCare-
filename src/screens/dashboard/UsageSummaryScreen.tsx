import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ChartBar {
  day: string;
  count: number;
  heightPercentage: number;
}

export default function UsageSummaryScreen({ navigation }: any) {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  const stats = [
    { title: 'Total runs', count: '1,420', limit: '10,000 /mo', icon: 'server-outline', color: COLORS.secondary },
    { title: 'AI Tokens', count: '14,024', limit: '50,000 /mo', icon: 'sparkles-outline', color: '#D69E2E' },
    { title: 'Sync tasks', count: '4,890', limit: '100,000 /mo', icon: 'sync-outline', color: COLORS.success },
    { title: 'Storage quota', count: '124 MB', limit: '512 MB limit', icon: 'cloud-done-outline', color: COLORS.accent },
  ];

  const chartData: ChartBar[] = [
    { day: 'Mon', count: 120, heightPercentage: 40 },
    { day: 'Tue', count: 240, heightPercentage: 70 },
    { day: 'Wed', count: 310, heightPercentage: 90 },
    { day: 'Thu', count: 180, heightPercentage: 55 },
    { day: 'Fri', count: 290, heightPercentage: 80 },
    { day: 'Sat', count: 80, heightPercentage: 25 },
    { day: 'Sun', count: 95, heightPercentage: 30 },
  ];

  const handleExport = (format: 'PDF' | 'CSV') => {
    Alert.alert(
      'Export Report',
      `Generate workspace usage audit report in ${format} format?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => Alert.alert('Report Dispatched', `Audit report has been compiled and saved.`) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Usage Analytics</Text>
        <TouchableOpacity style={styles.shareBtn} onPress={() => handleExport('PDF')}>
          <Ionicons name="share-social-outline" size={20} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Billing period switcher */}
        <View style={styles.periodRow}>
          <TouchableOpacity
            style={[styles.periodBtn, period === 'weekly' && styles.periodBtnActive]}
            onPress={() => setPeriod('weekly')}
          >
            <Text style={[styles.periodText, period === 'weekly' && styles.periodTextActive]}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodBtn, period === 'monthly' && styles.periodBtnActive]}
            onPress={() => setPeriod('monthly')}
          >
            <Text style={[styles.periodText, period === 'monthly' && styles.periodTextActive]}>Monthly</Text>
          </TouchableOpacity>
        </View>

        {/* Custom pure component Bar Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Execution Volume Daily Trend</Text>
          <View style={styles.chartWrapper}>
            {chartData.map((bar, i) => (
              <View key={i} style={styles.barColumn}>
                <View style={styles.barTrack}>
                  <LinearGradient
                    colors={[COLORS.secondary, COLORS.accent]}
                    style={[styles.barActive, { height: `${bar.heightPercentage}%` }]}
                  />
                </View>
                <Text style={styles.barLabel}>{bar.day}</Text>
                <Text style={styles.barValue}>{bar.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* KPI limits list */}
        <Text style={styles.sectionTitle}>Quota Limits & Consumption</Text>
        
        {stats.map((stat, index) => (
          <View key={index} style={styles.quotaItem}>
            <View style={styles.quotaHeader}>
              <View style={styles.quotaTitleGroup}>
                <Ionicons name={stat.icon as any} size={18} color={stat.color} style={{ marginRight: 8 }} />
                <Text style={styles.quotaTitle}>{stat.title}</Text>
              </View>
              <Text style={styles.quotaCount}>{stat.count}</Text>
            </View>

            {/* Quota Progress slider */}
            <View style={styles.progressBg}>
              <View style={[styles.progressActive, { backgroundColor: stat.color, width: '45%' }]} />
            </View>
            <Text style={styles.limitLabel}>{stat.limit}</Text>
          </View>
        ))}

        {/* Export Buttons */}
        <View style={styles.exportRow}>
          <TouchableOpacity style={styles.exportBtn} onPress={() => handleExport('PDF')}>
            <Ionicons name="document-text-outline" size={16} color={COLORS.white} />
            <Text style={styles.exportBtnText}>Download PDF Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.exportBtn, { marginLeft: 12 }]} onPress={() => handleExport('CSV')}>
            <Ionicons name="download-outline" size={16} color={COLORS.white} />
            <Text style={styles.exportBtnText}>CSV Audit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  shareBtn: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  periodRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 4,
    marginBottom: 24,
  },
  periodBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  periodBtnActive: {
    backgroundColor: COLORS.secondary,
    ...SHADOWS.light,
  },
  periodText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  periodTextActive: {
    color: COLORS.white,
  },
  chartCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 28,
    ...SHADOWS.light,
  },
  chartTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 16,
  },
  chartWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingBottom: 8,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    width: 12,
    height: 100,
    backgroundColor: '#0F172A',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barActive: {
    width: '100%',
    borderRadius: 6,
  },
  barLabel: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 6,
    fontWeight: '600',
  },
  barValue: {
    fontSize: 9,
    color: COLORS.white,
    marginTop: 2,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  quotaItem: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  quotaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  quotaTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quotaTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  quotaCount: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#0F172A',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressActive: {
    height: '100%',
    borderRadius: 3,
  },
  limitLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    alignSelf: 'flex-end',
  },
  exportRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  exportBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
  },
  exportBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
});
