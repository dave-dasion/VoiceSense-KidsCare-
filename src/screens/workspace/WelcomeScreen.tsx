import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }: any) {
  const steps = [
    {
      title: 'Build your first workflow',
      desc: 'Link a trigger block to an automated webhook action.',
      icon: 'git-network-outline',
      action: () => navigation.navigate('WorkflowHome'),
    },
    {
      title: 'Browse integrations library',
      desc: 'Authenticate apps like Slack, Notion, and Gmail.',
      icon: 'apps-outline',
      action: () => Alert.alert('Integrations', 'Integrations library coming soon in Module 4!'),
    },
    {
      title: 'Configure account security',
      desc: 'Activate 2FA and manage active trusted devices.',
      icon: 'shield-checkmark-outline',
      action: () => navigation.navigate('AuthSettings'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header Card */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="sparkles" size={32} color={COLORS.white} />
            </View>
            <Text style={styles.heroTitle}>Workspace ready!</Text>
            <Text style={styles.heroDesc}>
              Welcome to your new automation hub. You are now equipped with full low-code workflow engine power.
            </Text>
          </LinearGradient>
        </View>

        {/* Getting Started Checklist */}
        <Text style={styles.sectionTitle}>Quick Start Guide</Text>
        
        {steps.map((item, index) => (
          <TouchableOpacity key={index} style={styles.stepCard} onPress={item.action}>
            <View style={styles.stepIconWrapper}>
              <Ionicons name={item.icon as any} size={22} color={COLORS.secondary} />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>{item.title}</Text>
              <Text style={styles.stepDesc}>{item.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}

        {/* Go to Dashboard Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate('WorkflowHome')}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.submitBtnText}>Enter Workspace Dashboard</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
          </LinearGradient>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
    ...SHADOWS.medium,
  },
  heroGradient: {
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    fontFamily: FONTS.black,
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  stepIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepInfo: {
    flex: 1,
    marginRight: 8,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
  },
  submitBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    ...SHADOWS.medium,
  },
  gradientButton: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
