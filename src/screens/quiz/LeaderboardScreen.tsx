import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { getLeaderboard, LeaderboardUser } from './mockData';
import { getInitials, getAvatarStyle } from '../../utils/avatar';

export default function LeaderboardScreen({ navigation }: any) {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    setLeaderboard(getLeaderboard(timeframe));
  }, [timeframe]);

  // Split top 3 for the podium
  const topThree = leaderboard.slice(0, 3);
  // Rest of the list
  const listData = leaderboard.slice(3);

  // Find current user rank
  const currentUser = leaderboard.find((u) => u.isCurrentUser);

  // Get podium items in order [2nd, 1st, 3rd] for visual layout
  const firstPlace = topThree.find((u) => u.rank === 1);
  const secondPlace = topThree.find((u) => u.rank === 2);
  const thirdPlace = topThree.find((u) => u.rank === 3);

  const renderPodiumUser = (user: LeaderboardUser | undefined, position: 1 | 2 | 3) => {
    if (!user) return <View style={[styles.podiumCol, styles.emptyPodiumCol]} />;

    const avatarStyle = getAvatarStyle(user.name);
    let podiumHeight = 80;
    let cardBg = COLORS.white;
    let rankColor = COLORS.textLight;
    let iconName = 'ribbon-outline';

    if (position === 1) {
      podiumHeight = 110;
      rankColor = '#D69E2E'; // Gold
      iconName = 'star';
    } else if (position === 2) {
      podiumHeight = 90;
      rankColor = '#718096'; // Silver
      iconName = 'medal';
    } else if (position === 3) {
      podiumHeight = 75;
      rankColor = '#A0522D'; // Bronze
      iconName = 'ribbon';
    }

    return (
      <View style={styles.podiumColContainer}>
        {/* Avatar */}
        <View style={[
          styles.podiumAvatarContainer,
          position === 1 && styles.firstPlaceAvatarContainer,
          user.isCurrentUser && styles.currentUserAvatarBorder
        ]}>
          <View style={[styles.podiumAvatar, { backgroundColor: avatarStyle.bg }]}>
            <Text style={[styles.podiumAvatarText, { color: avatarStyle.text }]}>
              {getInitials(user.name)}
            </Text>
          </View>
          {position === 1 && (
            <View style={styles.crownContainer}>
              <Ionicons name="sparkles" size={12} color="#D69E2E" />
            </View>
          )}
        </View>

        {/* Name */}
        <Text style={styles.podiumName} numberOfLines={1}>
          {user.isCurrentUser ? 'You' : user.name.split(' ')[0]}
        </Text>
        
        {/* XP */}
        <Text style={styles.podiumXp}>{user.xp} XP</Text>

        {/* Podium Block */}
        <View style={[
          styles.podiumCol,
          { height: podiumHeight },
          user.isCurrentUser && styles.currentUserPodiumCol
        ]}>
          <Ionicons name={iconName as any} size={20} color={rankColor} style={{ marginBottom: 4 }} />
          <Text style={[styles.podiumRankText, { color: rankColor }]}>#{position}</Text>
        </View>
      </View>
    );
  };

  const renderLeaderboardItem = ({ item }: { item: LeaderboardUser }) => {
    const avatarStyle = getAvatarStyle(item.name);
    const isSelf = item.isCurrentUser;

    return (
      <View style={[
        styles.leaderboardRow,
        isSelf && styles.currentUserRow
      ]}>
        <Text style={[styles.rankNumberText, isSelf && styles.currentUserText]}>
          {item.rank}
        </Text>
        
        <View style={[styles.rowAvatar, { backgroundColor: avatarStyle.bg }]}>
          <Text style={[styles.rowAvatarText, { color: avatarStyle.text }]}>
            {getInitials(item.name)}
          </Text>
        </View>

        <View style={styles.rowDetails}>
          <Text style={[styles.rowName, isSelf && styles.currentRowName]} numberOfLines={1}>
            {item.name} {isSelf && '(You)'}
          </Text>
        </View>

        <Text style={[styles.rowXp, isSelf && styles.currentRowXp]}>
          {item.xp} <Text style={styles.rowXpLabel}>XP</Text>
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <Text style={styles.headerSubtitle}>Trainee Standings</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      {/* Timeframe Selector Toggles */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleBtn, timeframe === 'weekly' && styles.toggleBtnActive]}
          onPress={() => setTimeframe('weekly')}
        >
          <Text style={[styles.toggleBtnText, timeframe === 'weekly' && styles.toggleBtnTextActive]}>
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, timeframe === 'monthly' && styles.toggleBtnActive]}
          onPress={() => setTimeframe('monthly')}
        >
          <Text style={[styles.toggleBtnText, timeframe === 'monthly' && styles.toggleBtnTextActive]}>
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, timeframe === 'allTime' && styles.toggleBtnActive]}
          onPress={() => setTimeframe('allTime')}
        >
          <Text style={[styles.toggleBtnText, timeframe === 'allTime' && styles.toggleBtnTextActive]}>
            All-Time
          </Text>
        </TouchableOpacity>
      </View>

      {/* Podium Top 3 */}
      <View style={styles.podiumContainer}>
        {renderPodiumUser(secondPlace, 2)}
        {renderPodiumUser(firstPlace, 1)}
        {renderPodiumUser(thirdPlace, 3)}
      </View>

      {/* Scrollable list of other ranks */}
      <FlatList
        data={listData}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Sticky Bottom User Roster Row */}
      {currentUser && (
        <View style={styles.stickyBottomRow}>
          <Text style={styles.stickyRank}>#{currentUser.rank}</Text>
          <View style={[styles.rowAvatar, styles.stickyAvatar, { backgroundColor: '#FFFFFF' }]}>
            <Text style={[styles.rowAvatarText, { color: COLORS.primary }]}>
              {getInitials(currentUser.name)}
            </Text>
          </View>
          <View style={styles.rowDetails}>
            <Text style={styles.stickyName}>You ({currentUser.name})</Text>
            <Text style={styles.stickyRankLabel}>Keep answering quizzes to rank up!</Text>
          </View>
          <Text style={styles.stickyXp}>{currentUser.xp} XP</Text>
        </View>
      )}
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
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  toggleBtnText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  toggleBtnTextActive: {
    color: COLORS.white,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.light,
  },
  podiumColContainer: {
    alignItems: 'center',
    width: '30%',
  },
  podiumAvatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  firstPlaceAvatarContainer: {
    transform: [{ scale: 1.15 }],
    marginBottom: 12,
  },
  podiumAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentUserAvatarBorder: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 25,
    padding: 2,
  },
  podiumAvatarText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  crownContainer: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#FEFCBF',
    borderWidth: 1,
    borderColor: '#D69E2E',
    borderRadius: 8,
    padding: 2,
  },
  podiumName: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 2,
    fontFamily: FONTS.bold,
  },
  podiumXp: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    marginBottom: 10,
  },
  podiumCol: {
    width: '90%',
    backgroundColor: '#EDF2F7',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  currentUserPodiumCol: {
    backgroundColor: COLORS.infoLight,
    borderColor: COLORS.info,
  },
  emptyPodiumCol: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  podiumRankText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  listContent: {
    padding: 16,
    paddingBottom: 90, // room for sticky footer
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  currentUserRow: {
    backgroundColor: COLORS.infoLight,
    borderColor: COLORS.secondary,
    borderWidth: 1.5,
  },
  rankNumberText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textLight,
    width: 26,
    textAlign: 'center',
  },
  currentUserText: {
    color: COLORS.secondary,
  },
  rowAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  rowAvatarText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  rowDetails: {
    flex: 1,
  },
  rowName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  currentRowName: {
    color: COLORS.secondary,
    fontWeight: '800',
  },
  rowXp: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  rowXpLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  currentRowXp: {
    color: COLORS.secondary,
  },
  stickyBottomRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    ...SHADOWS.dark,
  },
  stickyRank: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
    width: 28,
  },
  stickyAvatar: {
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  stickyName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
  stickyRankLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 1,
  },
  stickyXp: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
});
