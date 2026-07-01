import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export default function AuthSettingsScreen({ navigation }: any) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [loginAlertsEnabled, setLoginAlertsEnabled] = useState(true);

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 'sess-1',
      device: 'iPhone 15 Pro Max',
      location: 'San Francisco, CA',
      lastActive: 'Active now',
      current: true,
    },
    {
      id: 'sess-2',
      device: 'MacBook Pro 16" (Sonoma)',
      location: 'San Francisco, CA',
      lastActive: '2 hours ago',
      current: false,
    },
    {
      id: 'sess-3',
      device: 'Chrome on Windows Desktop',
      location: 'Seattle, WA',
      lastActive: '3 days ago',
      current: false,
    },
  ]);

  const handleLogOutAll = () => {
    Alert.alert(
      'Session Invalidation',
      'Are you sure you want to terminate all other active sessions across your workspace devices?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out All',
          style: 'destructive',
          onPress: () => {
            setSessions((prev) => prev.filter((s) => s.current));
            Alert.alert('Sessions Terminated', 'All other login sessions have been successfully logged out.');
          },
        },
      ]
    );
  };

  const handleRevokeSession = (id: string, device: string) => {
    Alert.alert('Terminate Session', `Log out of ${device}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Revoke',
        style: 'destructive',
        onPress: () => {
          setSessions((prev) => prev.filter((s) => s.id !== id));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Toggle options */}
        <Text style={styles.sectionTitle}>Account Access Protection</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name="shield-outline" size={20} color={COLORS.secondary} style={styles.rowIcon} />
              <View>
                <Text style={styles.rowTitle}>Two-Factor Authentication (2FA)</Text>
                <Text style={styles.rowSub}>Verify actions with SMS or email codes.</Text>
              </View>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.secondary }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name="finger-print-outline" size={20} color={COLORS.secondary} style={styles.rowIcon} />
              <View>
                <Text style={styles.rowTitle}>Biometric Sign-In</Text>
                <Text style={styles.rowSub}>Log in using Face ID / Touch ID features.</Text>
              </View>
            </View>
            <Switch
              value={biometricsEnabled}
              onValueChange={setBiometricsEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.secondary }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.secondary} style={styles.rowIcon} />
              <View>
                <Text style={styles.rowTitle}>Login Alerts Notification</Text>
                <Text style={styles.rowSub}>Receive alerts upon new device logins.</Text>
              </View>
            </View>
            <Switch
              value={loginAlertsEnabled}
              onValueChange={setLoginAlertsEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.secondary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        {/* Sessions list */}
        <View style={styles.sessionsHeaderRow}>
          <Text style={styles.sectionTitle}>Active Sessions</Text>
          <TouchableOpacity onPress={handleLogOutAll}>
            <Text style={styles.invalidateAllText}>Sign Out All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sessionsGroup}>
          {sessions.map((sess) => (
            <View key={sess.id} style={styles.sessionItem}>
              <View style={styles.sessionDetails}>
                <Ionicons
                  name={sess.device.includes('iPhone') ? 'phone-portrait-outline' : 'desktop-outline'}
                  size={22}
                  color={COLORS.textLight}
                  style={styles.sessionIcon}
                />
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.sessionDevice}>{sess.device}</Text>
                    {sess.current && (
                      <View style={styles.currentBadge}>
                        <Text style={styles.currentBadgeText}>CURRENT</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.sessionLocation}>{sess.location} • {sess.lastActive}</Text>
                </View>
              </View>
              {!sess.current && (
                <TouchableOpacity onPress={() => handleRevokeSession(sess.id, sess.device)} style={styles.revokeBtn}>
                  <Text style={styles.revokeBtnText}>Revoke</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textLight,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsGroup: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    marginBottom: 28,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  rowIcon: {
    marginRight: 12,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  rowSub: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  sessionsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  invalidateAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.danger,
  },
  sessionsGroup: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  sessionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sessionIcon: {
    marginRight: 12,
  },
  sessionDevice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  currentBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  currentBadgeText: {
    color: COLORS.success,
    fontSize: 8,
    fontWeight: '800',
  },
  sessionLocation: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  revokeBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  revokeBtnText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '700',
  },
});
