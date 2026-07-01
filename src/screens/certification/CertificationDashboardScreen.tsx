import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getCertificates, getBadgeStats, Certificate } from './mockCertData';

export default function CertificationDashboardScreen({ navigation }: any) {
  const certs = getCertificates();
  const badgeStats = getBadgeStats();
  const showBackButton = navigation.canGoBack();

  const unlockedCerts = certs.filter((c) => c.isUnlocked);
  const inProgressCerts = certs.filter((c) => !c.isUnlocked);

  const renderUnlockedCert = ({ item }: { item: Certificate }) => {
    return (
      <TouchableOpacity
        style={styles.unlockedWrapper}
        onPress={() => navigation.navigate('CertificateDetails', { certificateId: item.id })}
      >
        <LinearGradient
          colors={['#D69E2E', '#B7791F', '#744210']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.unlockedCard}
        >
          <View style={styles.cardGlowOverlay} />
          <View style={styles.unlockedHeader}>
            <View style={styles.badgeIconBg}>
              <Ionicons name="ribbon" size={24} color="#D69E2E" />
            </View>
            <View style={styles.headerTextCol}>
              <Text style={styles.unlockedTag}>VERIFIED CREDENTIAL</Text>
              <Text style={styles.unlockedTitle}>{item.title}</Text>
            </View>
          </View>

          <View style={styles.unlockedFooter}>
            <View style={styles.metadataCol}>
              <Text style={styles.metaLabel}>Completion Date</Text>
              <Text style={styles.metaValue}>{item.unlockedDate}</Text>
            </View>
            <View style={[styles.metadataCol, { alignItems: 'flex-end' }]}>
              <Text style={styles.metaLabel}>Credential ID</Text>
              <Text style={styles.metaValue}>{item.credentialId}</Text>
            </View>
          </View>

          <View style={styles.actionPromptRow}>
            <Text style={styles.actionPromptText}>View Certificate Details</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.white} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderInProgressCert = (cert: Certificate) => {
    return (
      <View key={cert.id} style={styles.inProgressCard}>
        <View style={styles.inProgressHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inProgressCategory}>{cert.category.toUpperCase()}</Text>
            <Text style={styles.inProgressTitle}>{cert.title}</Text>
          </View>
          <View style={styles.percentBadge}>
            <Text style={styles.percentText}>{cert.progress}%</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${cert.progress}%` }
            ]}
          />
        </View>

        <Text style={styles.reqsTitle}>Pending Milestones:</Text>
        {cert.requirements.map((req) => (
          <View key={req.id} style={styles.reqRow}>
            <Ionicons
              name={req.isDone ? 'checkmark-circle' : 'ellipse-outline'}
              size={15}
              color={req.isDone ? COLORS.success : COLORS.textLight}
              style={styles.reqIcon}
            />
            <Text style={[styles.reqText, req.isDone && styles.reqTextDone]}>
              {req.name}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => showBackButton ? navigation.goBack() : (navigation.openDrawer ? navigation.openDrawer() : navigation.getParent()?.openDrawer())} 
          style={styles.headerMenuBtn}
        >
          <Ionicons name={showBackButton ? "arrow-back" : "menu"} size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Certification Hub</Text>
          <Text style={styles.headerSubtitle}>Verified Credentials & Badges</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Statistics Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <View style={[styles.statIconBg, { backgroundColor: COLORS.warningLight }]}>
              <Ionicons name="trophy" size={20} color="#D69E2E" />
            </View>
            <Text style={styles.statVal}>{unlockedCerts.length}</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconBg, { backgroundColor: COLORS.infoLight }]}>
              <Ionicons name="time" size={20} color={COLORS.info} />
            </View>
            <Text style={styles.statVal}>{inProgressCerts.length}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>

          <TouchableOpacity
            style={styles.statBox}
            onPress={() => navigation.navigate('AchievementBadges')}
          >
            <View style={[styles.statIconBg, { backgroundColor: COLORS.accentLight }]}>
              <Ionicons name="sparkles" size={20} color={COLORS.accent} />
            </View>
            <Text style={styles.statVal}>{badgeStats.unlocked}/{badgeStats.total}</Text>
            <Text style={styles.statLabel}>Badges Unlocked</Text>
          </TouchableOpacity>
        </View>

        {/* Unlocked / Earned Section */}
        <Text style={styles.sectionTitle}>Earned Certificates</Text>
        {unlockedCerts.length > 0 ? (
          <FlatList
            data={unlockedCerts}
            renderItem={renderUnlockedCert}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyCertContainer}>
            <Ionicons name="ribbon-outline" size={40} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Earned Certificates Yet</Text>
            <Text style={styles.emptySubtitle}>Complete all requirements on active paths to unlock.</Text>
          </View>
        )}

        {/* Target Certifications Section */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Target Certifications</Text>
        {inProgressCerts.map(renderInProgressCert)}

        {/* View Badges Button */}
        <TouchableOpacity
          style={styles.badgeButton}
          onPress={() => navigation.navigate('AchievementBadges')}
        >
          <Ionicons name="ribbon-outline" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
          <Text style={styles.badgeButtonText}>View Achievement Badges</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerMenuBtn: {
    padding: 6,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  statIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statVal: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  unlockedWrapper: {
    marginBottom: 16,
    ...SHADOWS.medium,
  },
  unlockedCard: {
    borderRadius: 16,
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  cardGlowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  unlockedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeIconBg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextCol: {
    flex: 1,
  },
  unlockedTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FEEBC8',
    letterSpacing: 1,
  },
  unlockedTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
    marginTop: 2,
  },
  unlockedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 14,
    marginBottom: 10,
  },
  metadataCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 8,
    color: '#E2E8F0',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: 11,
    color: COLORS.white,
    fontWeight: '700',
    marginTop: 2,
  },
  actionPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  actionPromptText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.white,
    marginRight: 6,
  },
  inProgressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 16,
  },
  inProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  inProgressCategory: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  inProgressTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    marginTop: 2,
  },
  percentBadge: {
    backgroundColor: COLORS.infoLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  percentText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.info,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#EDF2F7',
    borderRadius: 3,
    marginBottom: 14,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  },
  reqsTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  reqIcon: {
    marginRight: 8,
    marginTop: 1,
  },
  reqText: {
    fontSize: 11,
    color: COLORS.textLight,
    flex: 1,
    lineHeight: 15,
  },
  reqTextDone: {
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  emptyCertContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  emptyTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 10,
    fontFamily: FONTS.bold,
  },
  emptySubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  badgeButton: {
    backgroundColor: COLORS.primary,
    height: 46,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    ...SHADOWS.medium,
  },
  badgeButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
