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
import { MOCK_USER_PERFORMANCE, UserPerformanceRecord } from './mockAnalyticsData';

export default function UserPerformanceReportScreen({ navigation }: any) {
  
  const getStatusColor = (status: UserPerformanceRecord['certStatus']) => {
    switch (status) {
      case 'Active':
        return COLORS.success;
      case 'Expiring':
        return COLORS.warning;
      default:
        return COLORS.danger;
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
        <Text style={styles.headerTitle}>User Reports</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Trainee Performance Directory</Text>

        {MOCK_USER_PERFORMANCE.map((user) => {
          const statusColor = getStatusColor(user.certStatus);
          return (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
                
                {/* Cert Badge */}
                <View style={[
                  styles.statusBadge,
                  { borderColor: statusColor, backgroundColor: `${statusColor}10` }
                ]}>
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {user.certStatus === 'None' ? 'NO CERT' : `${user.certStatus.toUpperCase()} CERT`}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Completed</Text>
                  <Text style={styles.statValue}>{user.coursesCompleted} Courses</Text>
                </View>

                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Quiz Avg</Text>
                  <Text style={[
                    styles.statValue,
                    { color: user.quizAverage >= 85 ? COLORS.success : COLORS.textDark }
                  ]}>
                    {user.quizAverage}%
                  </Text>
                </View>

                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Last Active</Text>
                  <Text style={styles.statValue}>{user.lastActive}</Text>
                </View>
              </View>

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
  userCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  userEmail: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 8,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2F7',
    marginVertical: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 4,
  },
});
