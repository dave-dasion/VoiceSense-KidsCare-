import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_NOTIFICATIONS } from './mockNotificationData';

export default function AnnouncementsScreen({ navigation }: any) {
  const [showArchived, setShowArchived] = useState(false);

  const announcements = MOCK_NOTIFICATIONS.filter((n) => n.type === 'announcement');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Announcements</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* News Feed Banner */}
        <View style={styles.newsCard}>
          <View style={styles.iconBg}>
            <Ionicons name="megaphone" size={26} color={COLORS.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.newsTitle}>Platform Bulletins</Text>
            <Text style={styles.newsBody}>
              Get the latest news regarding organization-wide policy updates, safety directives, and scheduler upgrades.
            </Text>
          </View>
        </View>

        {/* Filter Toggle Row */}
        <View style={styles.filterRow}>
          <Text style={styles.sectionTitle}>Active Feeds</Text>
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => setShowArchived((prev) => !prev)}
          >
            <Ionicons
              name={showArchived ? 'checkbox' : 'square-outline'}
              size={16}
              color={COLORS.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.toggleText}>Include Archived</Text>
          </TouchableOpacity>
        </View>

        {announcements.map((post) => (
          <View key={post.id} style={styles.feedCard}>
            <View style={styles.feedHeader}>
              <View style={styles.authorBadge}>
                <Text style={styles.authorText}>AVITA HQ</Text>
              </View>
              <Text style={styles.feedTime}>{post.time}</Text>
            </View>

            <Text style={styles.feedTitle}>{post.title}</Text>
            <Text style={styles.feedBodyText}>{post.body}</Text>
          </View>
        ))}

        {showArchived && (
          <View style={[styles.feedCard, styles.archivedCard]}>
            <View style={styles.feedHeader}>
              <View style={[styles.authorBadge, { backgroundColor: '#E2E8F0' }]}>
                <Text style={[styles.authorText, { color: COLORS.textLight }]}>ARCHIVED</Text>
              </View>
              <Text style={styles.feedTime}>1 week ago</Text>
            </View>
            <Text style={[styles.feedTitle, { color: COLORS.textLight }]}>Dementia Guidelines V2 Release</Text>
            <Text style={styles.feedBodyText}>The dementia guide handbook has been fully updated for spring shifts compliance standards.</Text>
          </View>
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
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  newsTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.white,
  },
  newsBody: {
    fontSize: 11.5,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 17,
    marginTop: 4,
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  feedCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    ...SHADOWS.light,
  },
  archivedCard: {
    opacity: 0.6,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorBadge: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  authorText: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  feedTime: {
    fontSize: 9.5,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  feedTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  feedBodyText: {
    fontSize: 11.5,
    color: COLORS.textLight,
    lineHeight: 17,
    marginTop: 6,
    fontWeight: '500',
  },
});
