import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function CollaborationFeaturesScreen({ navigation }: any) {
  const [comments, setComments] = useState<string[]>([
    'Ensure formatting uses standard 12pt fonts.',
    'Confirm if date requires update.',
  ]);
  const [commentInput, setCommentInput] = useState('');

  const addComment = () => {
    if (commentInput.trim().length === 0) return;
    setComments([...comments, commentInput.trim()]);
    setCommentInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>5. Collaboration</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Co-Authoring & Track Changes</Text>
          <Text style={styles.cardBody}>
            Modern document processors support real-time collaboration. Reviewers can suggest text changes, add comments, and track the exact revision history of a document file.
          </Text>
          <Text style={styles.cardBody}>
            Turning on <Text style={{ fontWeight: '800', color: COLORS.secondary }}>Track Changes</Text> highlights inserted, deleted, or formatting modifications in red markup tags.
          </Text>
        </View>

        {/* Live Comments Simulator */}
        <Text style={styles.sectionTitle}>Review Comments Simulator</Text>
        <Text style={styles.sectionSubtitle}>Type and post a review note to the document review sidebar below:</Text>

        <View style={styles.collabPanel}>
          {/* Document Content */}
          <View style={styles.documentBody}>
            <Text style={styles.docHeading}>1.1 Operations Scope</Text>
            <Text style={styles.docText}>
              All administrative operations must run under verified supervisors. Training lessons will be logged weekly.
            </Text>
          </View>

          {/* Comments Sidebar mockup */}
          <View style={styles.sidebar}>
            <Text style={styles.sidebarTitle}>Review Notes ({comments.length})</Text>
            {comments.map((comment, index) => (
              <View key={index} style={styles.commentBubble}>
                <View style={styles.commentHeader}>
                  <Ionicons name="person-circle-outline" size={16} color={COLORS.secondary} style={{ marginRight: 4 }} />
                  <Text style={styles.commentUser}>Reviewer #{index + 1}</Text>
                </View>
                <Text style={styles.commentText}>{comment}</Text>
              </View>
            ))}
          </View>

          {/* Input field */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.commentInput}
              value={commentInput}
              onChangeText={setCommentInput}
              placeholder="Add your review comment..."
              placeholderTextColor={COLORS.textLight}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={addComment}>
              <Ionicons name="send" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('WordExercises')}
        >
          <Text style={styles.nextButtonText}>Proceed to Exercises</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
    fontFamily: FONTS.bold,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 16,
  },
  collabPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  documentBody: {
    backgroundColor: '#FAFDFB',
    padding: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#C6F6D5',
    marginBottom: 16,
  },
  docHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  docText: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 16,
  },
  sidebar: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 14,
    marginBottom: 16,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  commentBubble: {
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUser: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  commentText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    height: 38,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    fontSize: 12,
    color: COLORS.textDark,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: COLORS.secondary,
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
