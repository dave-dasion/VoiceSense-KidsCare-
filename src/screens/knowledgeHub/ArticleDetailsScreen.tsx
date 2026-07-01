import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ArticleDetailsScreen({ route, navigation }: any) {
  const { articleId, title, readTime, category } = route.params || {};

  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Article</Text>
        <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)} style={styles.bookmarkButton}>
          <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#e0eafc', '#cfdef3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.imagePlaceholder}
        >
          <Ionicons name="document-text-outline" size={60} color={COLORS.primary} />
        </LinearGradient>

        <View style={styles.contentContainer}>
          <View style={styles.metaRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{category || 'General'}</Text>
            </View>
            <Text style={styles.readTime}>
              <Ionicons name="time-outline" size={14} color={COLORS.textLight} /> {readTime || '5 min'} read
            </Text>
          </View>

          <Text style={styles.title}>{title || 'Understanding Best Practices in Senior Care'}</Text>
          
          <View style={styles.authorRow}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorInitials}>dr</Text>
            </View>
            <View>
              <Text style={styles.authorName}>Dr. Sarah Jenkins</Text>
              <Text style={styles.authorTitle}>Senior Care Specialist</Text>
            </View>
            <Text style={styles.publishDate}>Oct 12, 2026</Text>
          </View>

          <Text style={styles.bodyText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            {'\n\n'}
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            {'\n\n'}
            • Always verify patient information before administration.{'\n'}
            • Ensure clear communication with family members.{'\n'}
            • Maintain accurate and up-to-date documentation.
            {'\n\n'}
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </Text>

          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.completeButtonText}>Mark as Read</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  bookmarkButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imagePlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  contentContainer: {
    padding: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  readTime: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 32,
    marginBottom: 20,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorInitials: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  authorTitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  publishDate: {
    marginLeft: 'auto',
    fontSize: 12,
    color: COLORS.textLight,
  },
  bodyText: {
    fontSize: 16,
    color: COLORS.textDark,
    lineHeight: 26,
    marginBottom: 32,
  },
  completeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  completeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
