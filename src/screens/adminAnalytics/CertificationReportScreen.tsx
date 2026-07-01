import React from 'react';
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
import { MOCK_CERTIFICATION_PERFORMANCE } from './mockAnalyticsData';

export default function CertificationReportScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Certification Audit</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Summary Banner */}
        <View style={styles.summaryCard}>
          <Ionicons name="shield-checkmark" size={36} color={COLORS.white} style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>Credential Compliance</Text>
            <Text style={styles.summaryBody}>
              Monitor organization-wide credential distributions. Ensure expiring coordinators are scheduled for renewal.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Certification Roster</Text>

        {MOCK_CERTIFICATION_PERFORMANCE.map((cert) => {
          const hasLapsed = cert.lapsedCount > 0;
          return (
            <View key={cert.id} style={styles.certCard}>
              <Text style={styles.certName}>{cert.certName}</Text>
              
              <View style={styles.divider} />

              {/* Roster Tallies */}
              <View style={styles.tallyRow}>
                <View style={styles.tallyBox}>
                  <Text style={styles.tallyLabel}>Active</Text>
                  <Text style={[styles.tallyVal, { color: COLORS.success }]}>{cert.issuedCount}</Text>
                </View>

                <View style={styles.tallyBox}>
                  <Text style={styles.tallyLabel}>Expiring</Text>
                  <Text style={[styles.tallyVal, { color: COLORS.warning }]}>{cert.expiringCount}</Text>
                </View>

                <View style={styles.tallyBox}>
                  <Text style={styles.tallyLabel}>Lapsed</Text>
                  <Text style={[
                    styles.tallyVal,
                    { color: hasLapsed ? COLORS.danger : COLORS.textLight }
                  ]}>
                    {cert.lapsedCount}
                  </Text>
                </View>
              </View>

              {/* Warning Alert if there are lapsed users */}
              {hasLapsed && (
                <View style={styles.lapsedWarning}>
                  <Ionicons name="alert-circle" size={14} color={COLORS.danger} style={{ marginRight: 6 }} />
                  <Text style={styles.warningText}>
                    {cert.lapsedCount} trainee credentials have lapsed. Renewal alerts dispatched.
                  </Text>
                </View>
              )}

            </View>
          );
        })}

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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  summaryTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.white,
  },
  summaryBody: {
    fontSize: 11.5,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 17,
    marginTop: 4,
    fontWeight: '500',
  },
  certCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  certName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2F7',
    marginVertical: 12,
  },
  tallyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tallyBox: {
    flex: 1,
    alignItems: 'center',
  },
  tallyLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  tallyVal: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  lapsedWarning: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FED7D7',
    marginTop: 14,
    alignItems: 'center',
  },
  warningText: {
    flex: 1,
    fontSize: 10,
    color: '#742A2A',
    fontWeight: '600',
  },
});
