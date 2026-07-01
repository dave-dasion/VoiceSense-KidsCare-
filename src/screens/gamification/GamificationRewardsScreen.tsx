import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Badge {
  id: string;
  name: string;
  desc: string;
  icon: string;
  unlocked: boolean;
  xpValue: number;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  isMe?: boolean;
}

interface RewardItem {
  id: string;
  title: string;
  cost: number;
  desc: string;
  icon: string;
  redeemed: boolean;
}

export default function GamificationRewardsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard' | 'shop'>('badges');
  const [userXp, setUserXp] = useState(2450);
  const [streakDays, setStreakDays] = useState(5);

  const [badges, setBadges] = useState<Badge[]>([
    { id: 'b1', name: 'First Steps', desc: 'Complete your first care lesson', icon: 'flag-outline', unlocked: true, xpValue: 100 },
    { id: 'b2', name: 'Knowledge Seeker', desc: 'Read 5 articles in the Knowledge Hub', icon: 'book-outline', unlocked: true, xpValue: 250 },
    { id: 'b3', name: 'Lifesaver', desc: 'Pass the Emergency Response assessment', icon: 'heart-half-outline', unlocked: true, xpValue: 500 },
    { id: 'b4', name: 'Perfect Week', desc: 'Maintain a 7-day study streak', icon: 'flame-outline', unlocked: false, xpValue: 750 },
    { id: 'b5', name: 'Elite Caregiver', desc: 'Score above 95% on 3 consecutive quizzes', icon: 'ribbon-outline', unlocked: false, xpValue: 1000 },
  ]);

  const leaderboard: LeaderboardUser[] = [
    { rank: 1, name: 'Alice Jenkins', xp: 3200 },
    { rank: 2, name: 'Michael Chang', xp: 2950 },
    { rank: 3, name: 'Robert Vance', xp: 2600 },
    { rank: 4, name: 'You', xp: userXp, isMe: true },
    { rank: 5, name: 'Sarah Connor', xp: 2200 },
    { rank: 6, name: 'Ellen Davis', xp: 1950 },
  ];

  const [rewards, setRewards] = useState<RewardItem[]>([
    { id: 'r1', title: 'Premium Profile Theme', cost: 300, desc: 'Unlock custom gradient accents for your dashboard layout.', icon: 'color-palette-outline', redeemed: false },
    { id: 'r2', title: 'Dementia Care Handbook (PDF)', cost: 800, desc: 'Comprehensive PDF handbook packed with real-world case studies.', icon: 'document-text-outline', redeemed: false },
    { id: 'r3', title: '1-on-1 Trainer Mentorship Call', cost: 1500, desc: 'Schedule a private 15-minute video feedback call with Dr. Sarah Jenkins.', icon: 'people-outline', redeemed: false },
    { id: 'r4', title: 'LinkedIn Certificate Badge Upgrade', cost: 2000, desc: 'Generate a verified, shareable smart badge for your LinkedIn profile certifications.', icon: 'share-social-outline', redeemed: false },
  ]);

  const handleRedeem = (rewardId: string, cost: number) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (reward.redeemed) {
      Alert.alert('Already Redeemed', 'You have already claimed this reward.');
      return;
    }

    if (userXp < cost) {
      Alert.alert('Insufficient XP', 'You need more XP to redeem this reward. Keep studying to earn more points!');
      return;
    }

    Alert.alert(
      'Confirm Redemption',
      `Redeem "${reward.title}" for ${cost} XP?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Redeem', 
          onPress: () => {
            setUserXp(prev => prev - cost);
            setRewards(prev =>
              prev.map(r => {
                if (r.id === rewardId) {
                  return { ...r, redeemed: true };
                }
                return r;
              })
            );
            Alert.alert('Redeemed Successfully!', `You have unlocked "${reward.title}". Check your profile settings or registered email for activation.`);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.backButton}>
          <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rewards & Leaderboard</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* XP Status & Level Card */}
        <LinearGradient
          colors={['#E5C07B', '#D19A66', COLORS.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.xpCard}
        >
          <View style={styles.xpHeaderRow}>
            <View>
              <Text style={styles.levelLabel}>CURRENT LEVEL</Text>
              <Text style={styles.levelName}>Level 4 Care Specialist</Text>
            </View>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={16} color={COLORS.white} style={{ marginRight: 4 }} />
              <Text style={styles.streakText}>{streakDays} Day Streak</Text>
            </View>
          </View>

          <View style={styles.xpProgressRow}>
            <Text style={styles.xpProgressText}>{userXp} / 3000 XP</Text>
            <Text style={styles.xpNextLevelText}>550 XP to Level 5</Text>
          </View>
          
          <View style={styles.xpProgressBarBg}>
            <View style={[styles.xpProgressBarFill, { width: `${(userXp / 3000) * 100}%` }]} />
          </View>
        </LinearGradient>

        {/* Tab Selection */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            onPress={() => setActiveTab('badges')}
            style={[styles.tabBtn, activeTab === 'badges' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'badges' && styles.tabTextActive]}>Badges</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('leaderboard')}
            style={[styles.tabBtn, activeTab === 'leaderboard' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.tabTextActive]}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('shop')}
            style={[styles.tabBtn, activeTab === 'shop' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'shop' && styles.tabTextActive]}>XP Shop</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Contents */}
        <View style={styles.tabContentContainer}>
          {activeTab === 'badges' ? (
            <View>
              <Text style={styles.sectionTitle}>Earned & Locked Badges</Text>
              {badges.map(badge => (
                <View 
                  key={badge.id} 
                  style={[styles.badgeCard, !badge.unlocked && styles.badgeCardLocked]}
                >
                  <View style={[styles.badgeIconBg, badge.unlocked ? styles.badgeIconBgUnlocked : styles.badgeIconBgLocked]}>
                    <Ionicons 
                      name={badge.icon as any} 
                      size={26} 
                      color={badge.unlocked ? COLORS.white : '#94A3B8'} 
                    />
                  </View>
                  <View style={styles.badgeInfo}>
                    <Text style={[styles.badgeName, !badge.unlocked && styles.textLocked]}>{badge.name}</Text>
                    <Text style={styles.badgeDesc}>{badge.desc}</Text>
                  </View>
                  <View style={[styles.xpWorthBadge, badge.unlocked ? styles.xpUnlocked : styles.xpLocked]}>
                    <Text style={[styles.xpWorthText, badge.unlocked ? { color: COLORS.success } : { color: '#64748B' }]}>
                      +{badge.xpValue} XP
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : activeTab === 'leaderboard' ? (
            <View style={styles.leaderboardContainer}>
              <Text style={styles.sectionTitle}>Weekly Leaderboard</Text>
              {leaderboard.map(user => (
                <View 
                  key={user.rank} 
                  style={[
                    styles.leaderboardRow,
                    user.isMe && styles.leaderboardRowMe
                  ]}
                >
                  <View style={styles.rankCol}>
                    {user.rank <= 3 ? (
                      <Ionicons 
                        name="trophy" 
                        size={20} 
                        color={user.rank === 1 ? '#D69E2E' : user.rank === 2 ? '#A0AEC0' : '#ED8936'} 
                      />
                    ) : (
                      <Text style={styles.rankNumberText}>{user.rank}</Text>
                    )}
                  </View>
                  <View style={styles.leaderboardUserInfo}>
                    <Text style={[styles.leaderboardUserName, user.isMe && styles.leaderboardUserMeText]}>
                      {user.name} {user.isMe && '(You)'}
                    </Text>
                  </View>
                  <Text style={[styles.leaderboardUserXp, user.isMe && styles.leaderboardUserMeText]}>
                    {user.xp} XP
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View>
              <View style={styles.shopTitleRow}>
                <Text style={styles.sectionTitle}>XP Reward Redemption</Text>
                <View style={styles.walletBadge}>
                  <Ionicons name="wallet-outline" size={14} color={COLORS.primary} style={{ marginRight: 4 }} />
                  <Text style={styles.walletText}>{userXp} XP</Text>
                </View>
              </View>

              {rewards.map(item => (
                <View key={item.id} style={styles.rewardCard}>
                  <View style={styles.rewardHeader}>
                    <View style={styles.rewardIconBg}>
                      <Ionicons name={item.icon as any} size={24} color={COLORS.primary} />
                    </View>
                    <View style={styles.rewardInfo}>
                      <Text style={styles.rewardTitle}>{item.title}</Text>
                      <Text style={styles.rewardCostText}>{item.cost} XP Points</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.rewardDesc}>{item.desc}</Text>
                  
                  <TouchableOpacity
                    onPress={() => handleRedeem(item.id, item.cost)}
                    style={[
                      styles.redeemBtn,
                      item.redeemed ? styles.redeemBtnActive : styles.redeemBtnInactive
                    ]}
                  >
                    <Text style={[
                      styles.redeemBtnText,
                      item.redeemed ? styles.redeemTextActive : styles.redeemTextInactive
                    ]}>
                      {item.redeemed ? 'Redeemed' : 'Claim Reward'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
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
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  xpCard: {
    margin: 16,
    borderRadius: 20,
    padding: 20,
    ...SHADOWS.medium,
  },
  xpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  levelName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  streakText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  xpProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpProgressText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  xpNextLevelText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    fontWeight: '600',
  },
  xpProgressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
  },
  xpProgressBarFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.textDark,
  },
  tabContentContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  badgeCardLocked: {
    opacity: 0.65,
  },
  badgeIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  badgeIconBgUnlocked: {
    backgroundColor: COLORS.primary,
  },
  badgeIconBgLocked: {
    backgroundColor: '#E2E8F0',
  },
  badgeInfo: {
    flex: 1,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  textLocked: {
    color: '#64748B',
  },
  badgeDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
    lineHeight: 16,
  },
  xpWorthBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  xpUnlocked: {
    backgroundColor: COLORS.success + '15',
  },
  xpLocked: {
    backgroundColor: '#E2E8F0',
  },
  xpWorthText: {
    fontSize: 11,
    fontWeight: '700',
  },
  leaderboardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  leaderboardRowMe: {
    backgroundColor: COLORS.primary + '10',
    borderRadius: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 0,
  },
  rankCol: {
    width: 32,
    alignItems: 'center',
  },
  rankNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  leaderboardUserInfo: {
    flex: 1,
    marginLeft: 12,
  },
  leaderboardUserName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  leaderboardUserMeText: {
    fontWeight: '800',
    color: COLORS.primary,
  },
  leaderboardUserXp: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  shopTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  walletText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  rewardCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  rewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardIconBg: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  rewardCostText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '700',
    marginTop: 2,
  },
  rewardDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 16,
  },
  redeemBtn: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redeemBtnInactive: {
    backgroundColor: COLORS.primary,
  },
  redeemBtnActive: {
    backgroundColor: COLORS.success + '20',
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  redeemBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  redeemTextInactive: {
    color: COLORS.white,
  },
  redeemTextActive: {
    color: COLORS.success,
  },
});
