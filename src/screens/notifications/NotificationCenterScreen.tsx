import React, { useState } from 'react';
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
import { MOCK_NOTIFICATIONS, AppNotification } from './mockNotificationData';

export default function NotificationCenterScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'reminder' | 'certification' | 'announcement'>('all');

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((not) => (not.id === id ? { ...not, read: true } : not))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((not) => ({ ...not, read: true })));
    Alert.alert('Success', 'All notifications marked as read.');
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleNotificationPress = (not: AppNotification) => {
    handleMarkAsRead(not.id);
    if (not.type === 'reminder') {
      navigation.navigate('TrainingReminders');
    } else if (not.type === 'certification') {
      navigation.navigate('CertificationAlerts');
    } else {
      navigation.navigate('Announcements');
    }
  };

  const filteredNotifications = notifications.filter((not) => {
    if (activeTab === 'all') return true;
    return not.type === activeTab;
  });

  const getIconConfig = (type: AppNotification['type']) => {
    switch (type) {
      case 'certification':
        return { name: 'trophy', color: '#B7791F', bg: '#FEFCBF' };
      case 'reminder':
        return { name: 'alarm', color: '#2B6CB0', bg: '#EBF8FF' };
      default:
        return { name: 'megaphone', color: '#2C7A7B', bg: '#E6FFFA' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Center</Text>
        <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Control Actions Row */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleMarkAllRead}>
          <Ionicons name="checkmark-done" size={16} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.actionText}>Mark all read</Text>
        </TouchableOpacity>

        <View style={styles.badgeRow}>
          <Text style={styles.unreadCount}>
            {notifications.filter((n) => !n.read).length} Unread
          </Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabBar}>
        {(['all', 'reminder', 'certification', 'announcement'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="mail-open-outline" size={60} color={COLORS.border} />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySubtitle}>No notifications to show in this category.</Text>
          </View>
        ) : (
          filteredNotifications.map((not) => {
            const icon = getIconConfig(not.type);
            return (
              <TouchableOpacity
                key={not.id}
                style={[styles.notificationCard, !not.read && styles.unreadCard]}
                onPress={() => handleNotificationPress(not)}
              >
                <View style={[styles.iconCircle, { backgroundColor: icon.bg }]}>
                  <Ionicons name={icon.name as any} size={20} color={icon.color} />
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={styles.cardHeader}>
                    <Text style={[styles.cardTitle, !not.read && styles.unreadTitle]}>{not.title}</Text>
                    {!not.read && <View style={styles.dotIndicator} />}
                  </View>
                  <Text style={styles.cardBody} numberOfLines={2}>
                    {not.body}
                  </Text>
                  <Text style={styles.cardTime}>{not.time}</Text>
                </View>
              </TouchableOpacity>
            );
          })
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
  clearBtn: {
    padding: 6,
  },
  clearText: {
    fontSize: 12.5,
    color: COLORS.danger,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 11.5,
    color: COLORS.primary,
    fontWeight: '700',
  },
  badgeRow: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  unreadCount: {
    fontSize: 10,
    color: COLORS.textDark,
    fontWeight: '800',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: COLORS.primary,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  unreadCard: {
    borderColor: COLORS.secondary,
    borderLeftWidth: 4,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  unreadTitle: {
    color: COLORS.textDark,
    fontWeight: '800',
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  },
  cardBody: {
    fontSize: 11.5,
    color: COLORS.textLight,
    lineHeight: 16,
    marginTop: 4,
    fontWeight: '500',
  },
  cardTime: {
    fontSize: 9.5,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 11.5,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
    maxWidth: '80%',
    fontWeight: '500',
  },
});
