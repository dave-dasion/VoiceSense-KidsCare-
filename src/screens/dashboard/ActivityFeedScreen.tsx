import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  TextInput,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  icon: string;
  color: string;
}

export default function ActivityFeedScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUser, setFilterUser] = useState('All');

  const activities: ActivityItem[] = [
    {
      id: 'act-1',
      user: 'David (You)',
      action: 'published workflow',
      target: 'Slack Notify on Stripe Charge',
      time: '10m ago',
      icon: 'cloud-upload-outline',
      color: COLORS.success,
    },
    {
      id: 'act-2',
      user: 'Emily Watson',
      action: 'connected Slack OAuth integration',
      target: 'Workspace: Acme Ops',
      time: '1 hour ago',
      icon: 'link-outline',
      color: COLORS.secondary,
    },
    {
      id: 'act-3',
      user: 'David (You)',
      action: 'resolved critical error via AI Copilot',
      target: 'Shopify Stock Sync Webhook',
      time: '3 hours ago',
      icon: 'sparkles-outline',
      color: '#D69E2E',
    },
    {
      id: 'act-4',
      user: 'Jane Smith',
      action: 'updated trigger node settings',
      target: 'Google Sheets CRM Sync',
      time: 'Yesterday',
      icon: 'options-outline',
      color: COLORS.accent,
    },
    {
      id: 'act-5',
      user: 'David (You)',
      action: 'invited workspace member',
      target: 'Sarah Connor (Pending)',
      time: '2 days ago',
      icon: 'person-add-outline',
      color: COLORS.white,
    },
  ];

  const usersList = ['All', 'David (You)', 'Emily Watson', 'Jane Smith'];

  const filteredActivities = activities
    .filter(
      (act) =>
        act.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.action.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((act) => filterUser === 'All' || act.user === filterUser);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activity Feed</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Main container */}
      <View style={styles.content}>
        {/* Search Input */}
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search activities or targets..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* User filter pills */}
        <View style={styles.filterRow}>
          {usersList.map((usr) => (
            <TouchableOpacity
              key={usr}
              style={[styles.filterBadge, filterUser === usr && styles.filterBadgeActive]}
              onPress={() => setFilterUser(usr)}
            >
              <Text style={[styles.filterText, filterUser === usr && styles.filterTextActive]}>
                {usr.replace(' (You)', '')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chronological Timeline */}
        <FlatList
          data={filteredActivities}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.timelineRow}>
              {/* Left timeline indicator line */}
              <View style={styles.indicatorCol}>
                <View style={[styles.iconCircle, { borderColor: item.color }]}>
                  <Ionicons name={item.icon as any} size={14} color={item.color} />
                </View>
                <View style={styles.verticalLine} />
              </View>

              {/* Right content details */}
              <View style={styles.timelineContentCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.userText}>{item.user}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <Text style={styles.actionDescText}>
                  {item.action} <Text style={styles.targetText}>{item.target}</Text>
                </Text>
              </View>
            </View>
          )}
        />
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterBadgeActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  filterText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  indicatorCol: {
    alignItems: 'center',
    marginRight: 12,
    width: 32,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  timelineContentCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.white,
  },
  timeText: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  actionDescText: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
  },
  targetText: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
});
