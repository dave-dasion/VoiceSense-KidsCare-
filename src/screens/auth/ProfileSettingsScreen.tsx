import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileSettingsScreen({ navigation }: any) {
  const [name, setName] = useState('Dave Dasion');
  const [email, setEmail] = useState('dave@flowpilot.ai');
  const [company, setCompany] = useState('Dasion Ltd');
  const [timezone, setTimezone] = useState('GMT -5:00 (EST)');

  const handleSave = () => {
    Alert.alert('Profile Saved', 'Your personal account profile details have been updated.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar Header */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarText}>DD</Text>
            <TouchableOpacity style={styles.editAvatarBtn} onPress={() => Alert.alert('Edit Avatar', 'Photo library upload is mock-integrated.')}>
              <Ionicons name="camera" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarName}>{name}</Text>
          <Text style={styles.avatarRole}>Workspace Administrator</Text>
        </View>

        {/* Inputs */}
        <Text style={styles.sectionTitle}>Personal Details</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.inputField}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.inputField, { opacity: 0.6 }]}
            value={email}
            editable={false}
            placeholder="Your email address"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Company/Organization</Text>
          <TextInput
            style={styles.inputField}
            value={company}
            onChangeText={setCompany}
            placeholder="Organization name"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Preferred Timezone</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => Alert.alert('Timezone', 'Lists coming soon')}
          >
            <Text style={styles.dropdownText}>{timezone}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* Save button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Settings Changes</Text>
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
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 12,
    ...SHADOWS.glow,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.accent,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  avatarName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  avatarRole: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  inputField: {
    height: 48,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.white,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 48,
    paddingHorizontal: 12,
  },
  dropdownText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  saveBtn: {
    height: 48,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
