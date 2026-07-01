import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ProductFeaturesScreen({ navigation }: any) {
  const [modelSize, setModelSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [method, setMethod] = useState<'Prompting' | 'LoRA'>('Prompting');

  const getSystemMetrics = () => {
    let latency = '250ms';
    let accuracy = '80%';
    let hardware = '1x A10G GPU ($200/mo)';

    if (modelSize === 'Small') {
      latency = method === 'Prompting' ? '50ms' : '90ms';
      accuracy = method === 'Prompting' ? '60%' : '75%';
      hardware = 'Shared Cloud CPU ($20/mo)';
    } else if (modelSize === 'Medium') {
      latency = method === 'Prompting' ? '200ms' : '310ms';
      accuracy = method === 'Prompting' ? '80%' : '91%';
      hardware = '1x A10G GPU ($200/mo)';
    } else if (modelSize === 'Large') {
      latency = method === 'Prompting' ? '980ms' : '1400ms';
      accuracy = method === 'Prompting' ? '93%' : '99%';
      hardware = '4x A100 GPU ($1,800/mo)';
    }

    return { latency, accuracy, hardware };
  };

  const metrics = getSystemMetrics();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Latency Configurator</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Capacity vs Performance Constraints</Text>
          <Text style={styles.cardBody}>
            Larger neural network parameter sizes increase accuracy but incur higher latency and expensive host hardware requirements. Tune configurations below to see stats:
          </Text>
        </View>

        {/* Model size selector */}
        <Text style={styles.sectionTitle}>1. Model Parameter Size</Text>
        <View style={styles.selectorRow}>
          {['Small', 'Medium', 'Large'].map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.selectBtn, modelSize === size && styles.selectBtnActive]}
              onPress={() => setModelSize(size as any)}
            >
              <Text style={[styles.selectBtnText, modelSize === size && styles.selectBtnTextActive]}>
                {size === 'Small' ? '1.5B (Small)' : size === 'Medium' ? '7B (Medium)' : '70B (Large)'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tuning method */}
        <Text style={styles.sectionTitle}>2. Deployment Calibration</Text>
        <View style={styles.selectorRow}>
          {['Prompting', 'LoRA'].map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.selectBtn, method === m && styles.selectBtnActive]}
              onPress={() => setMethod(m as any)}
            >
              <Text style={[styles.selectBtnText, method === m && styles.selectBtnTextActive]}>
                {m === 'Prompting' ? 'Prompt Engineering' : 'LoRA Adapters'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Scorecard Output */}
        <Text style={styles.sectionTitle}>Estimated System Scorecard</Text>
        <View style={styles.scorecard}>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Avg Ingestion Latency:</Text>
            <Text style={styles.metricValue}>{metrics.latency}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Extraction Accuracy:</Text>
            <Text style={styles.metricValue}>{metrics.accuracy}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Hardware hosting:</Text>
            <Text style={styles.metricValue}>{metrics.hardware}</Text>
          </View>
        </View>

        {/* Instruction note */}
        <View style={styles.noteBox}>
          <Ionicons name="information-circle" size={16} color={COLORS.primary} style={{ marginRight: 8 }} />
          <Text style={styles.noteText}>
            For customer support chatbots, keep latency below 400ms. For automated medical diagnosis reviews, prioritize 99% accuracy over raw speed.
          </Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ProductBenefits')}
        >
          <Text style={styles.nextButtonText}>Proceed to Benefits & ROI Calculator</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 10,
    fontFamily: FONTS.bold,
  },
  selectorRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectBtn: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    ...SHADOWS.light,
  },
  selectBtnActive: {
    backgroundColor: COLORS.secondary + '10',
    borderColor: COLORS.secondary,
    borderWidth: 1.5,
  },
  selectBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  selectBtnTextActive: {
    color: COLORS.secondary,
  },
  scorecard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.light,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary + '05',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  noteText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
