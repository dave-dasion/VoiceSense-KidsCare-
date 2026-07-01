import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PERFORMANCE_INSIGHTS, PerformanceInsight } from './mockProgressData';

export default function PerformanceInsightsScreen({ navigation }: any) {
  
  const handleActionPress = (insight: PerformanceInsight) => {
    if (insight.type === 'recommendation') {
      Alert.alert(
        'AI Action Triggered',
        `Launching module path for: "${insight.title}". Do you want to study now?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Go to study', 
            onPress: () => {
              // Navigating to ContinueLearning
              navigation.navigate('ContinueLearning');
            } 
          }
        ]
      );
    }
  };

  const strengths = PERFORMANCE_INSIGHTS.filter((ins) => ins.type === 'strength');
  const weaknesses = PERFORMANCE_INSIGHTS.filter((ins) => ins.type === 'weakness');
  const recommendations = PERFORMANCE_INSIGHTS.filter((ins) => ins.type === 'recommendation');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Coach Insights</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Coach Summary Greeting Card */}
        <View style={styles.coachSummaryCard}>
          <LinearGradient
            colors={['#7F9CF5', '#667EEA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.coachGradient}
          >
            <View style={styles.coachHeaderRow}>
              <View style={styles.coachAvatarCircle}>
                <Text style={styles.coachAvatarText}>🤖</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.coachTitle}>Trainify AI Advisor</Text>
                <Text style={styles.coachSub}>Active Feedback Feed</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingVal}>88</Text>
                <Text style={styles.ratingLabel}>Tier Score</Text>
              </View>
            </View>
            <Text style={styles.coachBodyText}>
              "Hi Emily, your practical clinical safety scores are top-tier. To unlock your Dementia Specialist certificate, prioritize finishing the agitation roleplay simulation this week!"
            </Text>
          </LinearGradient>
        </View>

        {/* 1. Recommendations / Action Items Section */}
        <Text style={styles.sectionTitle}>Priority Action Items</Text>
        {recommendations.map((insight) => (
          <TouchableOpacity
            key={insight.id}
            style={[styles.insightCard, { borderLeftColor: insight.color, borderLeftWidth: 4 }]}
            onPress={() => handleActionPress(insight)}
          >
            <View style={styles.insightHeaderRow}>
              <View style={[styles.insightIconBg, { backgroundColor: `${insight.color}15` }]}>
                <Ionicons name={insight.icon as any} size={20} color={insight.color} />
              </View>
              <Text style={styles.insightTitleText}>{insight.title}</Text>
              <Text style={[styles.impactBadgeText, { color: insight.color, backgroundColor: `${insight.color}10` }]}>
                +{insight.impactScore} XP
              </Text>
            </View>
            <Text style={styles.insightDescText}>{insight.description}</Text>
            <View style={styles.actionPromptRow}>
              <Text style={[styles.actionPromptText, { color: insight.color }]}>Launch Simulation</Text>
              <Ionicons name="arrow-forward" size={12} color={insight.color} style={{ marginLeft: 4 }} />
            </View>
          </TouchableOpacity>
        ))}

        {/* 2. Strengths Section */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Key Strengths</Text>
        {strengths.map((insight) => (
          <View
            key={insight.id}
            style={[styles.insightCard, { borderLeftColor: insight.color, borderLeftWidth: 4 }]}
          >
            <View style={styles.insightHeaderRow}>
              <View style={[styles.insightIconBg, { backgroundColor: `${insight.color}15` }]}>
                <Ionicons name={insight.icon as any} size={20} color={insight.color} />
              </View>
              <Text style={styles.insightTitleText}>{insight.title}</Text>
              <Text style={[styles.impactBadgeText, { color: insight.color, backgroundColor: `${insight.color}10` }]}>
                {insight.impactScore}% Tier
              </Text>
            </View>
            <Text style={styles.insightDescText}>{insight.description}</Text>
          </View>
        ))}

        {/* 3. Areas for Improvement / Warnings */}
        {weaknesses.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Targeted Areas of Attention</Text>
            {weaknesses.map((insight) => (
              <View
                key={insight.id}
                style={[styles.insightCard, { borderLeftColor: insight.color, borderLeftWidth: 4 }]}
              >
                <View style={styles.insightHeaderRow}>
                  <View style={[styles.insightIconBg, { backgroundColor: `${insight.color}15` }]}>
                    <Ionicons name={insight.icon as any} size={20} color={insight.color} />
                  </View>
                  <Text style={styles.insightTitleText}>{insight.title}</Text>
                  <Text style={[styles.impactBadgeText, { color: insight.color, backgroundColor: `${insight.color}10` }]}>
                    Priority
                  </Text>
                </View>
                <Text style={styles.insightDescText}>{insight.description}</Text>
              </View>
            ))}
          </>
        )}

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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  coachSummaryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  coachGradient: {
    padding: 20,
  },
  coachHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  coachAvatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  coachAvatarText: {
    fontSize: 20,
  },
  coachTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  coachSub: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    marginTop: 1,
  },
  ratingBadge: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
    ...SHADOWS.light,
  },
  ratingVal: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  ratingLabel: {
    fontSize: 7.5,
    color: COLORS.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  coachBodyText: {
    fontSize: 12.5,
    color: COLORS.white,
    lineHeight: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  insightCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  insightHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  insightIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightTitleText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  impactBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  insightDescText: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
    fontWeight: '500',
  },
  actionPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  actionPromptText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
});
