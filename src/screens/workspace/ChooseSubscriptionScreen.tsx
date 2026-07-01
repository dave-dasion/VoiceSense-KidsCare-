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

interface PricingPlan {
  name: string;
  priceMonthly: string;
  priceYearly: string;
  features: string[];
  recommended?: boolean;
}

export default function ChooseSubscriptionScreen({ navigation }: any) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlan, setSelectedPlan] = useState('Professional');

  const plans: PricingPlan[] = [
    {
      name: 'Free',
      priceMonthly: '$0',
      priceYearly: '$0',
      features: ['5 Active Workflows', '1,000 tasks/month', '15-min sync intervals', 'Standard triggers'],
    },
    {
      name: 'Starter',
      priceMonthly: '$19',
      priceYearly: '$15',
      features: ['20 Active Workflows', '10,000 tasks/month', '5-min sync intervals', 'Standard webhook actions', 'Priority Support'],
    },
    {
      name: 'Professional',
      priceMonthly: '$49',
      priceYearly: '$39',
      recommended: true,
      features: ['Unlimited Workflows', '100,000 tasks/month', '1-min sync intervals', 'AI Copilot actions', 'Advanced logic nodes', 'OAuth credential auto-refresh', '24/7 Slack support'],
    },
    {
      name: 'Enterprise',
      priceMonthly: 'Custom',
      priceYearly: 'Custom',
      features: ['Self-hosted options', 'Unlimited tasks & executions', 'Real-time engine speed', 'Custom node builders', 'SAML SSO integration', 'Dedicated systems architect'],
    },
  ];

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handleConfirmPlan = () => {
    Alert.alert(
      'Plan Selected',
      `You selected the ${selectedPlan} (${billingCycle}) plan. Your workspace will launch with this subscription package.`,
      [{ text: 'Launch Workspace', onPress: () => navigation.navigate('Welcome') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Subscription</Text>
          <Text style={styles.subtitle}>Select a scalability tier to unlock advanced nodes, execution limits, and team seats.</Text>
        </View>

        {/* Billing cycle selector */}
        <View style={styles.billingToggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, billingCycle === 'monthly' && styles.toggleActive]}
            onPress={() => setBillingCycle('monthly')}
          >
            <Text style={[styles.toggleBtnText, billingCycle === 'monthly' && styles.toggleActiveText]}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, billingCycle === 'yearly' && styles.toggleActive]}
            onPress={() => setBillingCycle('yearly')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.toggleBtnText, billingCycle === 'yearly' && styles.toggleActiveText]}>Yearly</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>SAVE 20%</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Horizontal Plans List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plansContainer}>
          {plans.map((item) => {
            const isSelected = selectedPlan === item.name;
            const price = billingCycle === 'monthly' ? item.priceMonthly : item.priceYearly;
            
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.planCard,
                  isSelected && styles.planCardSelected,
                  item.recommended && styles.planCardRecommended,
                ]}
                onPress={() => handleSelectPlan(item.name)}
              >
                {item.recommended && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedBadgeText}>RECOMMENDED</Text>
                  </View>
                )}
                
                <Text style={styles.planName}>{item.name}</Text>
                
                <View style={styles.priceRow}>
                  <Text style={styles.planPrice}>{price}</Text>
                  {price !== 'Custom' && (
                    <Text style={styles.planPriceSub}>/{billingCycle === 'monthly' ? 'mo' : 'mo billed yearly'}</Text>
                  )}
                </View>

                {/* Features Divider */}
                <View style={styles.divider} />

                {/* Features Checklist */}
                <View style={styles.featuresList}>
                  {item.features.map((feature, i) => (
                    <View key={i} style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={16} color={COLORS.secondary} style={styles.checkIcon} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* CTA Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleConfirmPlan}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.submitBtnText}>Confirm {selectedPlan} Plan</Text>
            <Ionicons name="rocket-outline" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Skip links */}
        <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.skipText}>Start with Free trial</Text>
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
    paddingTop: 32,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
    fontFamily: FONTS.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  billingToggleRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 4,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toggleBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toggleActive: {
    backgroundColor: COLORS.secondary,
    ...SHADOWS.light,
  },
  toggleBtnText: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '700',
  },
  toggleActiveText: {
    color: COLORS.white,
  },
  discountBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  discountBadgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: '900',
  },
  plansContainer: {
    paddingBottom: 32,
  },
  planCard: {
    width: width * 0.72,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginRight: 16,
    position: 'relative',
    ...SHADOWS.light,
  },
  planCardSelected: {
    borderColor: COLORS.secondary,
    borderWidth: 2,
  },
  planCardRecommended: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    ...SHADOWS.glow,
  },
  recommendedBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  planName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
    marginTop: 8,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
  },
  planPriceSub: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 16,
  },
  featuresList: {
    flex: 1,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  checkIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  featureText: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    flex: 1,
  },
  submitBtn: {
    borderRadius: 12,
    overflow: 'hidden',
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
  skipBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  skipText: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
