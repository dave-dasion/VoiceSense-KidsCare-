import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { SKILL_ITEMS, SkillItem } from './mockProgressData';

export default function SkillProgressScreen({ navigation }: any) {
  const [filter, setFilter] = useState<'All' | 'Clinical Care' | 'Communication' | 'Safety'>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const filteredSkills = SKILL_ITEMS.filter((skill) => {
    if (filter === 'All') return true;
    return skill.category === filter;
  });

  const getStatusStyle = (status: SkillItem['status']) => {
    switch (status) {
      case 'Mastered':
        return {
          bg: '#E6FFFA',
          border: COLORS.success,
          text: COLORS.success,
          icon: 'checkmark-circle',
        };
      case 'Practiced':
        return {
          bg: '#EBF8FF',
          border: COLORS.secondary,
          text: COLORS.secondary,
          icon: 'timer-outline',
        };
      default:
        return {
          bg: '#F8FAFC',
          border: COLORS.border,
          text: COLORS.textLight,
          icon: 'ellipse-outline',
        };
    }
  };

  const getSkillCategoryIcon = (category: SkillItem['category']) => {
    switch (category) {
      case 'Clinical Care':
        return 'medkit-outline';
      case 'Communication':
        return 'chatbubbles-outline';
      case 'Safety':
        return 'shield-checkmark-outline';
      default:
        return 'ribbon-outline';
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
        <Text style={styles.headerTitle}>Skill Matrix</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Filter Horizontal Scroll */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {(['All', 'Clinical Care', 'Communication', 'Safety'] as const).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterBtn, filter === cat && styles.filterBtnActive]}
              onPress={() => setFilter(cat)}
            >
              <Text style={[styles.filterBtnText, filter === cat && styles.filterBtnTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionSubtitle}>
          Tap on any care skill card to view detailed verification rubrics.
        </Text>

        {filteredSkills.map((skill) => {
          const statusStyle = getStatusStyle(skill.status);
          const catIcon = getSkillCategoryIcon(skill.category);

          return (
            <TouchableOpacity
              key={skill.id}
              style={styles.skillCard}
              onPress={() => setSelectedSkill(skill)}
            >
              <View style={[styles.skillIconOuter, { backgroundColor: `${statusStyle.bg}` }]}>
                <Ionicons name={catIcon} size={22} color={statusStyle.text} />
              </View>

              <View style={styles.skillDetails}>
                <Text style={styles.skillCategory}>{skill.category}</Text>
                <Text style={styles.skillName}>{skill.name}</Text>
                <View style={styles.rewardRow}>
                  <Ionicons name="sparkles" size={10} color="#D69E2E" style={{ marginRight: 4 }} />
                  <Text style={styles.rewardText}>+{skill.xpAwarded} XP Reward</Text>
                </View>
              </View>

              <View style={[
                styles.statusBadge,
                { borderColor: statusStyle.border, backgroundColor: statusStyle.bg }
              ]}>
                <Ionicons name={statusStyle.icon as any} size={11} color={statusStyle.text} style={{ marginRight: 4 }} />
                <Text style={[styles.statusText, { color: statusStyle.text }]}>
                  {skill.status}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Detailed Skill Rubric Modal */}
      <Modal
        visible={selectedSkill !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedSkill(null)}
      >
        <View style={styles.modalOverlay}>
          {selectedSkill && (
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setSelectedSkill(null)}
              >
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </TouchableOpacity>

              <View style={[
                styles.modalHeaderIconBg,
                { backgroundColor: `${getStatusStyle(selectedSkill.status).bg}` }
              ]}>
                <Ionicons
                  name={getSkillCategoryIcon(selectedSkill.category)}
                  size={36}
                  color={getStatusStyle(selectedSkill.status).text}
                />
              </View>

              <Text style={styles.modalTitle}>{selectedSkill.name}</Text>
              <Text style={styles.modalSub}>{selectedSkill.category} Competency</Text>

              {/* Status Pill */}
              <View style={[
                styles.modalStatusPill,
                { backgroundColor: getStatusStyle(selectedSkill.status).bg }
              ]}>
                <Text style={[styles.modalStatusText, { color: getStatusStyle(selectedSkill.status).text }]}>
                  STATUS: {selectedSkill.status.toUpperCase()}
                </Text>
              </View>

              {/* Rubric Details */}
              <Text style={styles.modalLabel}>Verification Rubrics</Text>
              <View style={styles.rubricBox}>
                <Text style={styles.rubricItem}>• Complete associated interactive training drills.</Text>
                <Text style={styles.rubricItem}>• Pass module assessment with a score above 85%.</Text>
                <Text style={styles.rubricItem}>• Complete physical practical skill sign-off checklist.</Text>
              </View>

              {/* Verification Signature details */}
              {selectedSkill.status === 'Mastered' ? (
                <View style={styles.verificationCard}>
                  <Ionicons name="shield-checkmark" size={16} color={COLORS.success} style={{ marginRight: 8 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.verificationTitle}>Officially Verified</Text>
                    <Text style={styles.verificationText}>By: {selectedSkill.verifiedBy}</Text>
                    <Text style={styles.verificationDate}>Date: {selectedSkill.dateVerified}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.pendingVerificationCard}>
                  <Ionicons name="help-circle" size={16} color={COLORS.textLight} style={{ marginRight: 8 }} />
                  <Text style={styles.pendingVerificationText}>
                    Pending instructor live demonstration and checklist completion.
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.modalCloseActionBtn}
                onPress={() => setSelectedSkill(null)}
              >
                <Text style={styles.modalCloseBtnText}>Got it, Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

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
  filterWrapper: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterScroll: {
    paddingHorizontal: 12,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterBtnActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  filterBtnText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  filterBtnTextActive: {
    color: COLORS.white,
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
  skillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  skillIconOuter: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  skillDetails: {
    flex: 1,
  },
  skillCategory: {
    fontSize: 8.5,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  skillName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 2,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rewardText: {
    fontSize: 9.5,
    color: '#B7791F',
    fontWeight: '700',
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 9.5,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    position: 'relative',
    ...SHADOWS.dark,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  modalHeaderIconBg: {
    width: 72,
    height: 72,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...SHADOWS.light,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  modalSub: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  modalStatusPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  modalStatusText: {
    fontSize: 9,
    fontWeight: '800',
  },
  modalLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    width: '100%',
    marginBottom: 6,
  },
  rubricBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rubricItem: {
    fontSize: 11.5,
    color: COLORS.textDark,
    lineHeight: 18,
    fontWeight: '500',
  },
  verificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.successLight,
    borderRadius: 12,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B2F5EA',
    marginBottom: 20,
  },
  verificationTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.success,
  },
  verificationText: {
    fontSize: 11,
    color: COLORS.textDark,
    marginTop: 2,
    fontWeight: '600',
  },
  verificationDate: {
    fontSize: 9.5,
    color: COLORS.textLight,
    marginTop: 1,
  },
  pendingVerificationCard: {
    flexDirection: 'row',
    backgroundColor: '#EDF2F7',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  pendingVerificationText: {
    fontSize: 10.5,
    color: COLORS.textLight,
    flex: 1,
    lineHeight: 16,
    fontWeight: '500',
  },
  modalCloseActionBtn: {
    width: '100%',
    height: 46,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
});
