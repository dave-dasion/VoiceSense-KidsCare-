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
import { COACHING_TIPS } from './mockSalesPracticeData';

export default function AICoachingSummaryScreen({ navigation }: any) {
  
  const handleClaimPoints = (points: number, title: string) => {
    Alert.alert(
      'Points Claimed! 🌟',
      `You claimed +${points} XP for reviewing: "${title}"`,
      [{ text: 'Awesome' }]
    );
  };

  const handleReturnToDashboard = () => {
    navigation.navigate('DashboardHome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Coach Summary</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Congratulations Card */}
        <View style={styles.congratsCard}>
          <Text style={styles.congratsTitle}>Session Completed!</Text>
          <Text style={styles.congratsBody}>
            Review these key coaching points computed by Avita to claim additional learning points and solidify your sales methodology.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Key Takeaways</Text>

        {COACHING_TIPS.map((tip) => (
          <View key={tip.id} style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.iconBg}>
                <Ionicons name="ribbon-outline" size={20} color="#B7791F" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.xpText}>+{tip.xpValue} XP Available</Text>
              </View>
              
              <TouchableOpacity
                style={styles.claimBtn}
                onPress={() => handleClaimPoints(tip.xpValue, tip.title)}
              >
                <Text style={styles.claimBtnText}>Claim</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />
            <Text style={styles.tipDesc}>{tip.tipText}</Text>
          </View>
        ))}

        {/* Dashboard Return Button */}
        <TouchableOpacity style={styles.homeBtn} onPress={handleReturnToDashboard}>
          <Text style={styles.homeBtnText}>Return to Dashboard</Text>
          <Ionicons name="home-outline" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
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
  congratsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  congratsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  congratsBody: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    fontFamily: FONTS.bold,
  },
  tipCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    ...SHADOWS.light,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FEFCBF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  xpText: {
    fontSize: 10,
    color: '#B7791F',
    fontWeight: '700',
    marginTop: 2,
  },
  claimBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  claimBtnText: {
    color: COLORS.white,
    fontSize: 10.5,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2F7',
    marginVertical: 12,
  },
  tipDesc: {
    fontSize: 11.5,
    color: COLORS.textDark,
    lineHeight: 17,
    fontWeight: '500',
  },
  homeBtn: {
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    ...SHADOWS.medium,
  },
  homeBtnText: {
    color: COLORS.white,
    fontSize: 13.5,
    fontWeight: '700',
  },
});
