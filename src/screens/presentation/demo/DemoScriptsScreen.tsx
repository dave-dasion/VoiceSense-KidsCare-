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

export default function DemoScriptsScreen({ navigation }: any) {
  const [selectedScript, setSelectedScript] = useState<'intro' | 'value' | 'tech'>('intro');

  const getScriptData = () => {
    switch (selectedScript) {
      case 'intro':
        return {
          title: "Introduction & Context Setting",
          script: "\"Thank you for joining. Today, we will focus directly on the bottleneck we uncovered during discovery: the 200 weekly staff hours spent manually indexing patient charts. I'm going to demonstrate how our platform parses a patient registration sheet in under 2 seconds, with zero regex layout configuration.\"",
        };
      case 'value':
        return {
          title: "Value Highlight Transition",
          script: "\"Notice what happened here when I dragged in your target billing template. The system didn't just read the characters; it mapped the fields directly to your custom relational database schema. The dispatcher did not have to review or re-type a single line. This alone cuts processing overhead by 80%.\"",
        };
      case 'tech':
        return {
          title: "IT Infrastructure Alignment",
          script: "\"For security, we understand that medical data is highly restricted. This demo server is running in an isolated tenant environment. For your production pilot, we will package this engine into a Docker container, running directly on your internal VPC GPU hardware. No patient data is sent to external clouds.\"",
        };
    }
  };

  const active = getScriptData();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Demo Dialogue Scripts</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Demo Narrative Guidelines</Text>
          <Text style={styles.cardBody}>
            Demos should never feel like feature tours. Pitch narrative should focus on addressing the client's discovery gaps. Select a roleplay phase:
          </Text>
        </View>

        {/* Tab Row */}
        <View style={styles.tabRow}>
          {['intro', 'value', 'tech'].map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.tabBtn, selectedScript === s && styles.tabBtnActive]}
              onPress={() => setSelectedScript(s as any)}
            >
              <Text style={[styles.tabBtnText, selectedScript === s && styles.tabBtnTextActive]}>
                {s === 'intro' ? 'Intros' : s === 'value' ? 'Value Pivot' : 'IT Alignment'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Script Display */}
        <View style={styles.scriptCard}>
          <Text style={styles.scriptHeader}>{active.title}</Text>
          <Text style={styles.scriptText}>{active.script}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('DemoBestPractices')}
        >
          <Text style={styles.nextButtonText}>Proceed to Best Practices</Text>
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
  tabRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabBtn: {
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
  tabBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '10',
  },
  tabBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  tabBtnTextActive: {
    color: COLORS.secondary,
  },
  scriptCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  scriptHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 10,
  },
  scriptText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 18,
    fontStyle: 'italic',
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
