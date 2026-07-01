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
import { MOCK_NOTIFICATIONS } from './mockNotificationData';

export default function CertificationAlertsScreen({ navigation }: any) {
  
  const alerts = MOCK_NOTIFICATIONS.filter((n) => n.type === 'certification');

  const handleRenewOrView = (title: string) => {
    navigation.navigate('UpcomingCertificationsHome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Certification Alerts</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Warning Banner */}
        <View style={styles.warningCard}>
          <Ionicons name="shield-half-outline" size={36} color="#B7791F" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.warningTitle}>Compliance Advisory</Text>
            <Text style={styles.warningBody}>
              Ensure all clinical care registrations remain active. Lapsed credentials block shifts.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>High-Priority Notifications</Text>

        {alerts.map((alert) => {
          const isExpiring = alert.title.toLowerCase().includes('expire');
          return (
            <View key={alert.id} style={styles.alertCard}>
              <View style={styles.cardHeader}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: isExpiring ? '#FFF5F5' : '#F0FFF4' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: isExpiring ? COLORS.danger : COLORS.success }
                  ]}>
                    {isExpiring ? 'EXPIRED SOON' : 'EARNED'}
                  </Text>
                </View>
                <Text style={styles.cardTime}>{alert.time}</Text>
              </View>

              <Text style={styles.cardTitle}>{alert.title}</Text>
              <Text style={styles.cardDesc}>{alert.body}</Text>

              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: isExpiring ? COLORS.danger : COLORS.primary }
                ]}
                onPress={() => handleRenewOrView(alert.title)}
              >
                <Text style={styles.actionBtnText}>
                  {isExpiring ? 'Launch Renewal Assessment' : 'View Achievements'}
                </Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.white} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
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
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFCBF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECC94B',
    marginBottom: 24,
    ...SHADOWS.light,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#744210',
  },
  warningBody: {
    fontSize: 11.5,
    color: '#744210',
    lineHeight: 17,
    marginTop: 4,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    fontFamily: FONTS.bold,
  },
  alertCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 8.5,
    fontWeight: '800',
  },
  cardTime: {
    fontSize: 9.5,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  cardDesc: {
    fontSize: 11.5,
    color: COLORS.textLight,
    lineHeight: 17,
    marginTop: 6,
    fontWeight: '500',
  },
  actionBtn: {
    height: 36,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    ...SHADOWS.light,
  },
  actionBtnText: {
    color: COLORS.white,
    fontSize: 11.5,
    fontWeight: '700',
  },
});
