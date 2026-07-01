import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { getBadges, Badge } from './mockCertData';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 44) / 2;

export default function AchievementBadgesScreen({ navigation }: any) {
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const badges = getBadges();

  const filteredBadges = badges.filter((badge) => {
    if (filter === 'earned') return badge.isUnlocked;
    if (filter === 'locked') return !badge.isUnlocked;
    return true;
  });

  const renderBadgeItem = ({ item }: { item: Badge }) => {
    return (
      <TouchableOpacity
        style={[
          styles.badgeCard,
          !item.isUnlocked && styles.lockedCard
        ]}
        onPress={() => setSelectedBadge(item)}
      >
        <View style={[
          styles.iconBorder,
          { borderColor: item.isUnlocked ? item.color : COLORS.border },
          !item.isUnlocked && styles.lockedIconBorder
        ]}>
          <Ionicons
            name={item.icon as any}
            size={28}
            color={item.isUnlocked ? item.color : COLORS.textLight}
          />
        </View>

        <Text style={[styles.badgeName, !item.isUnlocked && styles.lockedText]} numberOfLines={1}>
          {item.name}
        </Text>
        
        <View style={styles.badgeFooter}>
          <Ionicons
            name={item.isUnlocked ? 'checkmark-circle' : 'lock-closed'}
            size={12}
            color={item.isUnlocked ? COLORS.success : COLORS.textLight}
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.statusText, item.isUnlocked && styles.earnedStatusText]}>
            {item.isUnlocked ? 'Earned' : 'Locked'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Badges & Rewards</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Segmented Filter Control */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === 'all' && styles.filterBtnActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterBtnText, filter === 'all' && styles.filterBtnTextActive]}>
            All ({badges.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === 'earned' && styles.filterBtnActive]}
          onPress={() => setFilter('earned')}
        >
          <Text style={[styles.filterBtnText, filter === 'earned' && styles.filterBtnTextActive]}>
            Earned ({badges.filter((b) => b.isUnlocked).length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === 'locked' && styles.filterBtnActive]}
          onPress={() => setFilter('locked')}
        >
          <Text style={[styles.filterBtnText, filter === 'locked' && styles.filterBtnTextActive]}>
            Locked ({badges.filter((b) => !b.isUnlocked).length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Badges Grid list */}
      <FlatList
        data={filteredBadges}
        renderItem={renderBadgeItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="ribbon-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyText}>No Badges Found</Text>
          </View>
        }
      />

      {/* Badge Detail Modal popup */}
      <Modal
        visible={selectedBadge !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedBadge(null)}
      >
        <View style={styles.modalOverlay}>
          {selectedBadge && (
            <View style={styles.modalContent}>
              {/* Top Close icon */}
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setSelectedBadge(null)}
              >
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </TouchableOpacity>

              {/* Badge Icon Banner */}
              <View style={[
                styles.modalIconBg,
                { backgroundColor: selectedBadge.isUnlocked ? `${selectedBadge.color}15` : '#EDF2F7' }
              ]}>
                <View style={[
                  styles.modalIconOuter,
                  { borderColor: selectedBadge.isUnlocked ? selectedBadge.color : COLORS.border }
                ]}>
                  <Ionicons
                    name={selectedBadge.icon as any}
                    size={40}
                    color={selectedBadge.isUnlocked ? selectedBadge.color : COLORS.textLight}
                  />
                </View>
              </View>

              {/* Badge Details */}
              <Text style={styles.modalBadgeName}>{selectedBadge.name}</Text>
              <View style={[
                styles.modalStatusBadge,
                { backgroundColor: selectedBadge.isUnlocked ? COLORS.successLight : '#EDF2F7' }
              ]}>
                <Text style={[
                  styles.modalStatusText,
                  { color: selectedBadge.isUnlocked ? COLORS.success : COLORS.textLight }
                ]}>
                  {selectedBadge.isUnlocked ? 'Earned' : 'Locked'}
                </Text>
              </View>

              <Text style={styles.modalLabel}>Description</Text>
              <Text style={styles.modalDescription}>{selectedBadge.description}</Text>

              <Text style={styles.modalLabel}>How to Unlock</Text>
              <Text style={styles.modalCriteria}>{selectedBadge.criteria}</Text>

              {selectedBadge.isUnlocked && selectedBadge.unlockedDate && (
                <View style={styles.earnedDateBox}>
                  <Ionicons name="calendar-outline" size={14} color={COLORS.textLight} style={{ marginRight: 6 }} />
                  <Text style={styles.earnedDateText}>Unlocked on: {selectedBadge.unlockedDate}</Text>
                </View>
              )}

              {/* Action Close */}
              <TouchableOpacity
                style={[
                  styles.modalActionBtn,
                  { backgroundColor: selectedBadge.isUnlocked ? selectedBadge.color : COLORS.primary }
                ]}
                onPress={() => setSelectedBadge(null)}
              >
                <Text style={styles.modalActionText}>Okay, Got It</Text>
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
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
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
  gridContainer: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badgeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: COLUMN_WIDTH,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  lockedCard: {
    backgroundColor: '#F7FAFC',
    opacity: 0.75,
  },
  iconBorder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  lockedIconBorder: {
    backgroundColor: '#EDF2F7',
    borderWidth: 1.5,
  },
  badgeName: {
    fontSize: 12.5,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  lockedText: {
    color: COLORS.textLight,
  },
  badgeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusText: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  earnedStatusText: {
    color: COLORS.success,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
    marginTop: 10,
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
  modalIconBg: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIconOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  modalBadgeName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  modalStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 20,
  },
  modalStatusText: {
    fontSize: 10.5,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  modalLabel: {
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    width: '100%',
  },
  modalDescription: {
    fontSize: 12.5,
    color: COLORS.textDark,
    lineHeight: 18,
    marginBottom: 16,
    alignSelf: 'flex-start',
    width: '100%',
  },
  modalCriteria: {
    fontSize: 12.5,
    color: COLORS.textDark,
    lineHeight: 18,
    fontWeight: '600',
    marginBottom: 16,
    alignSelf: 'flex-start',
    width: '100%',
  },
  earnedDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  earnedDateText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  modalActionBtn: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  modalActionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
