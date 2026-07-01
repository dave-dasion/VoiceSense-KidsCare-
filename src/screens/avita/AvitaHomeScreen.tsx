import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AvitaHomeScreen({ navigation }: any) {
  const showBackButton = navigation.canGoBack();

  const handleMenuPress = () => {
    if (showBackButton) {
      navigation.goBack();
    } else {
      if (navigation.openDrawer) {
        navigation.openDrawer();
      } else {
        navigation.getParent()?.openDrawer();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuBtn}>
          <Ionicons name={showBackButton ? 'arrow-back' : 'menu'} size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avita AI Coach</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Coach Greeting Hero Banner */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={[COLORS.primary, '#667EEA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroRow}>
              <View style={styles.coachAvatarOuter}>
                <LinearGradient
                  colors={['#FEFCBF', '#FEEBC8']}
                  style={styles.avatarInner}
                >
                  <Text style={styles.avatarEmoji}>🤖</Text>
                </LinearGradient>
              </View>

              <View style={styles.heroInfo}>
                <Text style={styles.welcomeTag}>ACTIVE COACHING TIER</Text>
                <Text style={styles.coachName}>Avita Advisor</Text>
                <Text style={styles.coachStatus}>
                  ● Online • Emily Watson's Advisor
                </Text>
              </View>
            </View>

            <View style={styles.heroDivider} />

            <Text style={styles.coachingPrompt}>
              "Hi Emily, I'm ready to assist. You have 2 daily training tasks pending, and an AI speech review available."
            </Text>
          </LinearGradient>
        </View>

        {/* Feature Grid / Sections */}
        <Text style={styles.sectionTitle}>Avita Coaching Hub</Text>
        
        <View style={styles.featureGrid}>
          {/* 1. Chat with Avita */}
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('AIChat')}
          >
            <LinearGradient
              colors={['#EBF8FF', '#BEE3F8']}
              style={styles.featureIconBg}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={24} color={COLORS.secondary} />
            </LinearGradient>
            <Text style={styles.featureTitle}>AI Tutor Chat</Text>
            <Text style={styles.featureDesc}>Real-time Q&A feedback on study questions</Text>
          </TouchableOpacity>

          {/* 2. Learning Assistant */}
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('AILearningAssistant')}
          >
            <LinearGradient
              colors={['#FAF5FF', '#E9D8FD']}
              style={styles.featureIconBg}
            >
              <Ionicons name="school-outline" size={24} color={COLORS.accent} />
            </LinearGradient>
            <Text style={styles.featureTitle}>Learning Helper</Text>
            <Text style={styles.featureDesc}>Drill down on care check-off procedures</Text>
          </TouchableOpacity>

          {/* 3. Recommendations */}
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('PersonalizedRecommendations')}
          >
            <LinearGradient
              colors={['#FFF5F5', '#FED7D7']}
              style={styles.featureIconBg}
            >
              <Ionicons name="bulb-outline" size={24} color={COLORS.danger} />
            </LinearGradient>
            <Text style={styles.featureTitle}>Recommendations</Text>
            <Text style={styles.featureDesc}>Suggested study materials based on quizzes</Text>
          </TouchableOpacity>

          {/* 4. Daily Tasks */}
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('DailyLearningTasks')}
          >
            <LinearGradient
              colors={['#FEFCBF', '#FEEBC8']}
              style={styles.featureIconBg}
            >
              <Ionicons name="calendar-outline" size={24} color="#DD6B20" />
            </LinearGradient>
            <Text style={styles.featureTitle}>Daily Tasks</Text>
            <Text style={styles.featureDesc}>Checklists, milestone targets & XP rewards</Text>
          </TouchableOpacity>
        </View>

        {/* 5. AI Feedback Screen Card (Large Card at Bottom) */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Speech & Performance Audit</Text>
        
        <TouchableOpacity
          style={styles.feedbackBannerCard}
          onPress={() => navigation.navigate('AIFeedback')}
        >
          <View style={styles.feedbackBannerRow}>
            <View style={[styles.feedbackBannerIconBg, { backgroundColor: '#E6FFFA' }]}>
              <Ionicons name="mic-outline" size={26} color={COLORS.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.feedbackBannerTitle}>AI Vocal Evaluation</Text>
              <Text style={styles.feedbackBannerDesc}>
                Open-ended mock caller feedback. Speech pacing, empathy check, and accuracy logs.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
          </View>
          <View style={styles.feedbackStatsStrip}>
            <Text style={styles.feedbackStatItem}>Safety Accuracy: 95%</Text>
            <Text style={styles.feedbackStatItem}>•</Text>
            <Text style={styles.feedbackStatItem}>Communication: 84%</Text>
          </View>
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuBtn: {
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
  heroCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  heroGradient: {
    padding: 20,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coachAvatarOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  heroInfo: {
    flex: 1,
  },
  welcomeTag: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#FEFCBF',
    letterSpacing: 0.5,
  },
  coachName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  coachStatus: {
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '700',
    marginTop: 2,
  },
  heroDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 14,
  },
  coachingPrompt: {
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
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: (width - 44) / 2,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  featureIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  featureDesc: {
    fontSize: 10.5,
    color: COLORS.textLight,
    marginTop: 4,
    lineHeight: 14,
  },
  feedbackBannerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 12,
  },
  feedbackBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackBannerIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  feedbackBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  feedbackBannerDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
    lineHeight: 15,
  },
  feedbackStatsStrip: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 14,
    paddingTop: 10,
    justifyContent: 'center',
  },
  feedbackStatItem: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.textLight,
    marginHorizontal: 8,
  },
});
