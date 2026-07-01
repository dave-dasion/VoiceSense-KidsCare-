import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function SearchAndKnowledgeHubScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const refRBSheet = useRef<any>(null);

  const categories = [
    { id: 1, title: 'Clinical Care', icon: 'medical-outline', color: COLORS.primary },
    { id: 2, title: 'Compliance', icon: 'shield-checkmark-outline', color: COLORS.success },
    { id: 3, title: 'Communication', icon: 'chatbubbles-outline', color: COLORS.warning },
    { id: 4, title: 'Leadership', icon: 'star-outline', color: COLORS.secondary },
  ];

  const recentArticles = [
    { id: 101, category: 'Clinical Care', title: 'Best Practices for Patient Handoffs', readTime: '5 min' },
    { id: 102, category: 'Compliance', title: 'Understanding HIPAA Updates 2026', readTime: '8 min' },
    { id: 103, category: 'Communication', title: 'Effective Communication with Family Members', readTime: '6 min' },
    { id: 104, category: 'Leadership', title: 'Delegation and Team Coordination', readTime: '7 min' },
  ];

  const filteredArticles = recentArticles.filter(article => {
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    const matchesSearch = searchQuery ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.backButton}>
          <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Knowledge Hub</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.searchBanner}
        >
          <Text style={styles.searchTitle}>What would you like to learn today?</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={COLORS.textLight} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses, articles, or topics..."
              placeholderTextColor={COLORS.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </LinearGradient>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.title;
              return (
                <TouchableOpacity 
                  key={cat.id} 
                  style={[
                    styles.categoryCard, 
                    isSelected && { borderColor: cat.color, borderWidth: 2 }
                  ]}
                  onPress={() => setSelectedCategory(isSelected ? null : cat.title)}
                >
                  <View style={[styles.iconContainer, { backgroundColor: cat.color + '20' }]}>
                    <Ionicons name={cat.icon as any} size={24} color={cat.color} />
                  </View>
                  <Text style={styles.categoryTitle}>{cat.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recommended Articles</Text>
          {filteredArticles.length === 0 ? (
            <Text style={{ color: COLORS.textLight, textAlign: 'center', marginTop: 10 }}>No articles found.</Text>
          ) : (
            filteredArticles.map((article) => (
              <TouchableOpacity 
                key={article.id} 
                style={styles.articleCard}
                onPress={() => {
                  setSelectedArticle(article);
                  refRBSheet.current?.open();
                }}
              >
                <View style={styles.articleInfo}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text style={styles.articleMeta}>{article.readTime} read</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        draggable={true}
        closeOnPressMask={true}
        height={480}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#CBD5E1',
            width: 60,
          },
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 20,
            backgroundColor: COLORS.white,
          },
        }}
      >
        {selectedArticle && (
          <View style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <View style={styles.sheetTag}>
                <Text style={styles.sheetTagText}>{selectedArticle.category}</Text>
              </View>
              <Text style={styles.sheetReadTime}>
                <Ionicons name="time-outline" size={14} color={COLORS.textLight} /> {selectedArticle.readTime} read
              </Text>
            </View>

            <Text style={styles.sheetArticleTitle}>{selectedArticle.title}</Text>
            
            <View style={styles.sheetAuthorRow}>
              <View style={styles.sheetAuthorAvatar}>
                <Text style={styles.sheetAuthorInitials}>DJ</Text>
              </View>
              <View>
                <Text style={styles.sheetAuthorName}>Dr. Jane Doe</Text>
                <Text style={styles.sheetAuthorTitle}>Senior Medical Consultant</Text>
              </View>
              <Text style={styles.sheetPublishDate}>Oct 26, 2026</Text>
            </View>

            <ScrollView style={styles.sheetBodyScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.sheetBodyText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                {'\n\n'}
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                {'\n\n'}
                • Always verify patient information before administration.{'\n'}
                • Ensure clear communication with family members.{'\n'}
                • Maintain accurate and up-to-date documentation.
              </Text>
            </ScrollView>

            <TouchableOpacity 
              style={styles.sheetCtaButton}
              onPress={() => {
                refRBSheet.current?.close();
                navigation.navigate('ArticleDetails', { 
                  articleId: selectedArticle.id, 
                  title: selectedArticle.title, 
                  readTime: selectedArticle.readTime,
                  category: selectedArticle.category
                });
              }}
            >
              <Text style={styles.sheetCtaButtonText}>Read Full Article</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>
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
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  searchBanner: {
    margin: 16,
    borderRadius: 20,
    padding: 24,
    ...SHADOWS.medium,
  },
  searchTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    ...SHADOWS.light,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  articleMeta: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  sheetContent: {
    flex: 1,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sheetTag: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sheetTagText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  sheetReadTime: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  sheetArticleTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 24,
    marginBottom: 12,
  },
  sheetAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  sheetAuthorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sheetAuthorInitials: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 12,
  },
  sheetAuthorName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  sheetAuthorTitle: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 1,
  },
  sheetPublishDate: {
    marginLeft: 'auto',
    fontSize: 11,
    color: COLORS.textLight,
  },
  sheetBodyScroll: {
    flex: 1,
    marginBottom: 16,
  },
  sheetBodyText: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
  },
  sheetCtaButton: {
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  sheetCtaButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
