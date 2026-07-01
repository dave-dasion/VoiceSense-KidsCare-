import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { DetailedLesson } from './mockData';

export default function DocumentLessonScreen({ route, navigation }: any) {
  const { lesson, onComplete }: { lesson: DetailedLesson; onComplete: () => void } = route.params;

  // Reading settings
  const [fontSize, setFontSize] = useState(14);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);

  const documentContent = lesson.components?.documentText || `
# Study Notes: Primary Care Protocols

Elderly care requires strict attention to physical support protocols, cognitive engagement, and emotional empathy. When transferring patients, assess for slip hazards and secure stabilizers.

## Core Directives
1. Secure base of support.
2. Confirm patient has steady grip.
3. Stabilize wheels on mobility frames.
4. Align vertical posture.

Take frequent breaks and confirm details with senior instructors if in doubt.
`;

  // Basic search check
  const occurrencesCount = searchText.trim()
    ? (documentContent.toLowerCase().split(searchText.toLowerCase()).length - 1)
    : 0;

  const handleZoomIn = () => {
    setFontSize((prev) => Math.min(prev + 2, 24));
  };

  const handleZoomOut = () => {
    setFontSize((prev) => Math.max(prev - 2, 10));
  };

  const handleResetZoom = () => {
    setFontSize(14);
  };

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const scrollHeight = contentSize.height - layoutMeasurement.height;
    if (scrollHeight > 0) {
      const progress = (contentOffset.y / scrollHeight) * 100;
      setReadingProgress(Math.min(Math.max(progress, 0), 100));
    }
  };

  const handleMarkAsRead = () => {
    if (onComplete) onComplete();
    Alert.alert('Study Manual Completed!', 'You have reviewed the core documentation guidelines.', [
      { text: 'Back to Workspace', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? COLORS.white : COLORS.secondary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.headerTitleDark]} numberOfLines={1}>
          Study Manual
        </Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Reader Toolbox */}
      <View style={[styles.toolbox, isDarkMode && styles.toolboxDark]}>
        {/* Font Zoom */}
        <View style={styles.toolGroup}>
          <TouchableOpacity onPress={handleZoomOut} style={styles.toolBtn}>
            <Text style={[styles.toolBtnText, isDarkMode && styles.textWhite]}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleResetZoom} style={styles.toolBtn}>
            <Ionicons name="refresh-outline" size={14} color={isDarkMode ? COLORS.white : COLORS.textDark} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleZoomIn} style={styles.toolBtn}>
            <Text style={[styles.toolBtnText, isDarkMode && styles.textWhite]}>A+</Text>
          </TouchableOpacity>
        </View>

        {/* Vertical divider */}
        <View style={styles.divider} />

        {/* Theme Switch */}
        <TouchableOpacity 
          onPress={() => setIsDarkMode(!isDarkMode)} 
          style={[styles.themeToggleBtn, isDarkMode && styles.themeToggleBtnDark]}
        >
          <Ionicons 
            name={isDarkMode ? "sunny" : "moon"} 
            size={18} 
            color={isDarkMode ? '#F6E05E' : COLORS.textDark} 
          />
          <Text style={[styles.themeToggleText, isDarkMode && styles.textWhite]}>
            {isDarkMode ? 'Light Reader' : 'Dark Reader'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reading Progress Line */}
      <View style={styles.progressLineBg}>
        <View style={[styles.progressLineFill, { width: `${readingProgress}%` }]} />
      </View>

      {/* Document Search Panel */}
      <View style={[styles.searchBar, isDarkMode && styles.searchBarDark]}>
        <Ionicons name="search" size={16} color={COLORS.textLight} style={{ marginRight: 8 }} />
        <TextInput
          style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
          placeholder="Search keywords inside manual..."
          placeholderTextColor={COLORS.textLight}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <View style={styles.matchesBadge}>
            <Text style={styles.matchesText}>{occurrencesCount} found</Text>
            <TouchableOpacity onPress={() => setSearchText('')} style={{ marginLeft: 6 }}>
              <Ionicons name="close-circle" size={14} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Scrollable Reader Area */}
      <ScrollView 
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.readerContainer, isDarkMode && styles.readerContainerDark]}
      >
        <Text style={[
          styles.documentText, 
          { fontSize }, 
          isDarkMode ? styles.documentTextDark : styles.documentTextLight
        ]}>
          {documentContent}
        </Text>
      </ScrollView>

      {/* Bottom Sticky Action */}
      <View style={[styles.footer, isDarkMode && styles.footerDark]}>
        <View style={styles.scrollInfoRow}>
          <Ionicons name="eye-outline" size={14} color={COLORS.textLight} />
          <Text style={styles.scrollInfoText}>
            Read progress: {Math.round(readingProgress)}%
          </Text>
        </View>
        <TouchableOpacity style={styles.markReadBtn} onPress={handleMarkAsRead}>
          <Text style={styles.markReadBtnText}>Mark as Read & Finish</Text>
          <Ionicons name="checkbox-outline" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerDark: {
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  headerDark: {
    backgroundColor: '#1E293B',
    borderBottomColor: '#334155',
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    flex: 1,
    textAlign: 'center',
  },
  headerTitleDark: {
    color: COLORS.white,
  },
  toolbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  toolboxDark: {
    backgroundColor: '#1E293B',
    borderBottomColor: '#334155',
  },
  toolGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toolBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  textWhite: {
    color: COLORS.white,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },
  themeToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  themeToggleBtnDark: {
    backgroundColor: '#334155',
    borderColor: '#475569',
  },
  themeToggleText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
    color: COLORS.textDark,
  },
  progressLineBg: {
    height: 3,
    backgroundColor: '#E2E8F0',
  },
  progressLineFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    height: 38,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBarDark: {
    backgroundColor: '#1E293B',
    borderBottomColor: '#334155',
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textDark,
  },
  searchInputDark: {
    color: COLORS.white,
  },
  matchesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warningLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  matchesText: {
    fontSize: 10,
    color: COLORS.warning,
    fontWeight: '700',
  },
  readerContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  readerContainerDark: {
    backgroundColor: '#0F172A',
  },
  documentText: {
    lineHeight: 24,
    fontFamily: FONTS.regular,
  },
  documentTextLight: {
    color: COLORS.textDark,
  },
  documentTextDark: {
    color: '#E2E8F0',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerDark: {
    backgroundColor: '#1E293B',
    borderTopColor: '#334155',
  },
  scrollInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  scrollInfoText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginLeft: 6,
    fontWeight: '600',
  },
  markReadBtn: {
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.success,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  markReadBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
