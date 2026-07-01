import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { ASSISTANT_TOPICS, AssistantTopic } from './mockAvitaData';

export default function AILearningAssistantScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const toggleTopic = (id: string) => {
    if (expandedTopic === id) {
      setExpandedTopic(null);
    } else {
      setExpandedTopic(id);
    }
  };

  const filteredTopics = ASSISTANT_TOPICS.filter((topic) => {
    const query = searchQuery.toLowerCase();
    return (
      topic.title.toLowerCase().includes(query) ||
      topic.category.toLowerCase().includes(query) ||
      topic.content.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Assistant</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search care procedures, steps..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={COLORS.textLight} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionSubtitle}>
          Instant AI-verified step-by-step procedures for nursing check-offs.
        </Text>

        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => {
            const isExpanded = expandedTopic === topic.id;

            return (
              <View key={topic.id} style={styles.topicCardContainer}>
                <TouchableOpacity
                  style={[
                    styles.topicHeaderBtn,
                    isExpanded && styles.topicHeaderBtnExpanded
                  ]}
                  onPress={() => toggleTopic(topic.id)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.categoryText}>{topic.category}</Text>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                  </View>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={COLORS.secondary}
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.topicBody}>
                    <Text style={styles.bodyDescription}>{topic.content}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.checklistLabel}>Verified Action Steps:</Text>
                    
                    {topic.steps.map((step, idx) => (
                      <View key={idx} style={styles.stepRow}>
                        <View style={styles.stepNumberCircle}>
                          <Text style={styles.stepNumberText}>{idx + 1}</Text>
                        </View>
                        <Text style={styles.stepBodyText}>{step}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={40} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Topics Found</Text>
            <Text style={styles.emptySubtitle}>Try searching for "validation", "safety", or "hygiene".</Text>
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
  searchContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textDark,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: COLORS.textLight,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  topicCardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  topicHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
  },
  topicHeaderBtnExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  categoryText: {
    fontSize: 8.5,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  topicTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 2,
  },
  topicBody: {
    padding: 16,
    backgroundColor: '#FAFDFE',
  },
  bodyDescription: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 18,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2F7',
    marginVertical: 14,
  },
  checklistLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  stepNumberCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  stepBodyText: {
    flex: 1,
    fontSize: 11.5,
    color: COLORS.textDark,
    lineHeight: 17,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 11.5,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
});
