import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_GENERAL_SETTINGS } from './mockSettingsData';

export default function GeneralSettingsScreen({ navigation }: any) {
  const [autoUpdate, setAutoUpdate] = useState(DEFAULT_GENERAL_SETTINGS.autoUpdate);
  const [offlineDownloads, setOfflineDownloads] = useState(DEFAULT_GENERAL_SETTINGS.offlineDownloads);

  const subSettings = [
    {
      title: 'Branding Settings',
      desc: 'Customize colors, theme mode, and typography.',
      icon: 'color-palette-outline',
      color: COLORS.primary,
      route: 'BrandingSettings',
    },
    {
      title: 'Notification Preferences',
      desc: 'Toggle email updates, push alarms, and compliance warnings.',
      icon: 'notifications-outline',
      color: COLORS.secondary,
      route: 'NotificationSettings',
    },
    {
      title: 'LMS Configuration',
      desc: 'Configure quiz pass marks, limits, and certificate policies.',
      icon: 'school-outline',
      color: COLORS.accent,
      route: 'LMSConfiguration',
    },
    {
      title: 'AI Coach Settings',
      desc: 'Fine-tune Avita tone, feedback modes, and models.',
      icon: 'sparkles-outline',
      color: COLORS.warning,
      route: 'AICoachConfiguration',
    },
  ];

  const handleSave = () => {
    Alert.alert('Settings Saved', 'General preferences updated successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>System Settings</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* General Options Group */}
        <Text style={styles.sectionTitle}>General System Options</Text>
        
        <View style={styles.groupCard}>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>App Language</Text>
              <Text style={styles.settingSub}>English (US)</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Auto-Update Content</Text>
              <Text style={styles.settingSub}>Download course guidelines when connected to Wi-Fi</Text>
            </View>
            <Switch
              value={autoUpdate}
              onValueChange={setAutoUpdate}
              trackColor={{ true: COLORS.primary }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Offline Download Storage</Text>
              <Text style={styles.settingSub}>Cache lesson manuals locally on device</Text>
            </View>
            <Switch
              value={offlineDownloads}
              onValueChange={setOfflineDownloads}
              trackColor={{ true: COLORS.primary }}
            />
          </View>
        </View>

        {/* Configurations Redirect List */}
        <Text style={styles.sectionTitle}>Custom Configurations</Text>

        {subSettings.map((sub, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.redirectCard}
            onPress={() => navigation.navigate(sub.route)}
          >
            <View style={[styles.iconCircle, { backgroundColor: `${sub.color}15` }]}>
              <Ionicons name={sub.icon as any} size={20} color={sub.color} />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>{sub.title}</Text>
              <Text style={styles.cardDesc}>{sub.desc}</Text>
            </View>

            <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}

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
  saveBtn: {
    padding: 6,
  },
  saveBtnText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    marginTop: 18,
    fontFamily: FONTS.bold,
  },
  groupCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingLabel: {
    fontSize: 12.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  settingSub: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2F7',
  },
  redirectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  cardDesc: {
    fontSize: 10.5,
    color: COLORS.textLight,
    lineHeight: 14,
    marginTop: 2,
    fontWeight: '500',
  },
});
