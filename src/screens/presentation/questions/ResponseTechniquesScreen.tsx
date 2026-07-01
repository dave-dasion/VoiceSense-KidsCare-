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

export default function ResponseTechniquesScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'L' | 'A' | 'E' | 'R'>('L');

  const getFrameworkDetails = () => {
    switch (activeTab) {
      case 'L':
        return {
          title: "1. Listen (Do not interrupt)",
          desc: "Allow the technical or procurement buyer to fully voice their concern. Do not cut in with defensive product features immediately.",
        };
      case 'A':
        return {
          title: "2. Acknowledge (Validate concern)",
          desc: "Confirm their concern makes sense. Example: 'Data privacy and transit safety are absolutely crucial in healthcare.'",
        };
      case 'E':
        return {
          title: "3. Explore (Deep dive discovery)",
          desc: "Ask clarifying questions to uncover details: 'Are you operating under strict local cloud firewall rules, or can you integrate with private APIs?'",
        };
      case 'R':
        return {
          title: "4. Respond (Value alignment)",
          desc: "Formulate your targeted answer based on their infrastructure setup: 'Since you run local servers, we will deploy our private Docker core.'",
        };
    }
  };

  const current = getFrameworkDetails();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. LAER Objection Method</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>LAER Response Framework</Text>
          <Text style={styles.cardBody}>
            Objections are buying signals. Use the LAER method to validate buyer questions and pivot to technical value:
          </Text>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabBar}>
          {(['L', 'A', 'E', 'R'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>
                {tab === 'L' ? 'Listen' : tab === 'A' ? 'Acknowledge' : tab === 'E' ? 'Explore' : 'Respond'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Framework card detail */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsHeader}>{current.title}</Text>
          <Text style={styles.detailsBody}>{current.desc}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('QuestionPractice')}
        >
          <Text style={styles.nextButtonText}>Proceed to Practice Evaluation</Text>
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
  tabBar: {
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
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  tabBtnTextActive: {
    color: COLORS.secondary,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  detailsHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  detailsBody: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 18,
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
