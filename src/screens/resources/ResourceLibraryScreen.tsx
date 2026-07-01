import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Resource {
  id: string;
  title: string;
  category: string;
  format: 'pdf' | 'doc' | 'xls' | 'video';
  size: string;
  desc: string;
  isSaved: boolean;
  downloaded?: boolean;
}

export default function ResourceLibraryScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Clinical Protocols', 'Checklists', 'Legal Templates', 'Educational Guides'];

  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'r1',
      title: 'Advanced Dementia De-escalation Protocol',
      category: 'Clinical Protocols',
      format: 'pdf',
      size: '2.4 MB',
      desc: 'Step-by-step checklist and phrase manual to handle behavioral expressions and refuse of care safely.',
      isSaved: false,
    },
    {
      id: 'r2',
      title: 'Daily Patient Health & Vital Logger Checklist',
      category: 'Checklists',
      format: 'xls',
      size: '520 KB',
      desc: 'Spreadsheet template to track blood pressure, heart rate, oxygen levels, and daily hydration logs.',
      isSaved: true,
    },
    {
      id: 'r3',
      title: '2026 HIPAA Regulatory Guidelines Summary',
      category: 'Legal Templates',
      format: 'pdf',
      size: '1.8 MB',
      desc: 'A comprehensive summary outlining recent changes in patient privacy guidelines, data logging, and audits.',
      isSaved: false,
    },
    {
      id: 'r4',
      title: 'Manual Slide Board Transfer Demonstration',
      category: 'Educational Guides',
      format: 'video',
      size: '28.4 MB',
      desc: 'High-definition video walkthrough showcasing proper caregiver stance, posture, and patient safety grips.',
      isSaved: false,
    },
    {
      id: 'r5',
      title: 'Emergency Response First-Aid Quick Guide',
      category: 'Clinical Protocols',
      format: 'pdf',
      size: '950 KB',
      desc: 'An emergency pocketbook featuring direct instructions for cardiac arrest, severe choking, and diabetic shock.',
      isSaved: true,
    },
  ]);

  const handleSaveToggle = (id: string) => {
    setResources(prev =>
      prev.map(res => {
        if (res.id === id) {
          const nextSaved = !res.isSaved;
          return { ...res, isSaved: nextSaved };
        }
        return res;
      })
    );
  };

  const handleDownload = (id: string) => {
    setResources(prev =>
      prev.map(res => {
        if (res.id === id) {
          Alert.alert(
            'Downloading File',
            `Started downloading "${res.title}" (${res.size}).`,
            [
              {
                text: 'OK',
                onPress: () => {
                  setTimeout(() => {
                    Alert.alert('Download Complete', `"${res.title}" has been saved to your downloads list.`);
                  }, 1200);
                }
              }
            ]
          );
          return { ...res, downloaded: true };
        }
        return res;
      })
    );
  };

  const getFormatIcon = (format: Resource['format']) => {
    switch (format) {
      case 'pdf':
        return { name: 'document-text', color: '#EF4444' };
      case 'doc':
        return { name: 'document', color: '#3B82F6' };
      case 'xls':
        return { name: 'grid', color: '#10B981' };
      case 'video':
        return { name: 'play-circle', color: '#F59E0B' };
    }
  };

  const filteredResources = resources.filter(res => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.backButton}>
          <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resource Library</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner with search */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <Text style={styles.bannerTitle}>Reference Center</Text>
          <Text style={styles.bannerDesc}>Access printable templates, medical checklists, guidelines, and toolkits on demand.</Text>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={COLORS.textLight} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search guides, protocols, templates..."
              placeholderTextColor={COLORS.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </LinearGradient>

        {/* Category Scroll */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryScrollContainer}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[styles.categoryBtn, isSelected && styles.categoryBtnActive]}
              >
                <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Resources list */}
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Document Downloads</Text>
          {filteredResources.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="folder-open-outline" size={48} color={COLORS.textLight} />
              <Text style={styles.emptyText}>No references found in this category.</Text>
            </View>
          ) : (
            filteredResources.map((res) => {
              const iconDetail = getFormatIcon(res.format);
              return (
                <View key={res.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.formatIconBg, { backgroundColor: iconDetail.color + '15' }]}>
                      <Ionicons name={iconDetail.name as any} size={24} color={iconDetail.color} />
                    </View>
                    <View style={styles.cardHeaderDetails}>
                      <Text style={styles.categoryLabel}>{res.category}</Text>
                      <Text style={styles.fileMeta}>{res.format.toUpperCase()} • {res.size}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleSaveToggle(res.id)} style={styles.saveBtn}>
                      <Ionicons 
                        name={res.isSaved ? "bookmark" : "bookmark-outline"} 
                        size={20} 
                        color={res.isSaved ? COLORS.primary : COLORS.textLight} 
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.cardTitle}>{res.title}</Text>
                  <Text style={styles.cardDesc}>{res.desc}</Text>

                  <TouchableOpacity 
                    style={[styles.downloadBtn, res.downloaded && styles.downloadBtnActive]} 
                    onPress={() => handleDownload(res.id)}
                  >
                    <Ionicons 
                      name={res.downloaded ? "checkmark-circle-outline" : "download-outline"} 
                      size={18} 
                      color={res.downloaded ? COLORS.success : COLORS.white} 
                      style={{ marginRight: 6 }}
                    />
                    <Text style={[styles.downloadBtnText, res.downloaded && { color: COLORS.success }]}>
                      {res.downloaded ? 'Saved Offline' : 'Download Attachment'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
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
  banner: {
    margin: 16,
    borderRadius: 20,
    padding: 24,
    ...SHADOWS.medium,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  bannerDesc: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 20,
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
  categoryScroll: {
    marginBottom: 12,
  },
  categoryScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.light,
  },
  categoryBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  formatIconBg: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardHeaderDetails: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  fileMeta: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
    fontWeight: '600',
  },
  saveBtn: {
    padding: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 20,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 16,
  },
  downloadBtn: {
    height: 38,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadBtnInactive: {
    backgroundColor: COLORS.primary,
  },
  downloadBtnActive: {
    backgroundColor: COLORS.success + '15',
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  downloadBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: COLORS.textLight,
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
  },
});
