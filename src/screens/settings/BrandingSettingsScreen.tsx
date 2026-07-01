import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_BRANDING_SETTINGS, BrandingSettings } from './mockSettingsData';

export default function BrandingSettingsScreen({ navigation }: any) {
  const [themeMode, setThemeMode] = useState<BrandingSettings['themeMode']>(DEFAULT_BRANDING_SETTINGS.themeMode);
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_BRANDING_SETTINGS.primaryColor);
  const [fontFamilyStyle, setFontFamilyStyle] = useState<BrandingSettings['fontFamilyStyle']>(DEFAULT_BRANDING_SETTINGS.fontFamilyStyle);

  const themeModes: BrandingSettings['themeMode'][] = ['Light', 'Dark', 'System'];
  const colors = [
    { code: '#1A365D', name: 'Navy' },
    { code: '#2C7A7B', name: 'Teal' },
    { code: '#2B6CB0', name: 'Slate' },
    { code: '#6B46C1', name: 'Royal' },
  ];
  const fonts: BrandingSettings['fontFamilyStyle'][] = ['Default', 'Serif', 'Monospace'];

  const handleSave = () => {
    Alert.alert('Branding Updated', 'Custom styling preferences applied successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Branding Customizer</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Theme mode */}
        <Text style={styles.label}>Theme Mode</Text>
        <View style={styles.selectorRow}>
          {themeModes.map((mode) => {
            const isSelected = themeMode === mode;
            return (
              <TouchableOpacity
                key={mode}
                style={[styles.selectorBtn, isSelected && styles.selectorBtnSelected]}
                onPress={() => setThemeMode(mode)}
              >
                <Text style={[styles.selectorText, isSelected && styles.selectorTextSelected]}>
                  {mode}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Primary Color Palette */}
        <Text style={styles.label}>Primary Brand Color</Text>
        <View style={styles.colorRow}>
          {colors.map((color) => {
            const isSelected = primaryColor === color.code;
            return (
              <TouchableOpacity
                key={color.code}
                style={[
                  styles.colorBtn,
                  { backgroundColor: color.code },
                  isSelected && styles.colorBtnSelected
                ]}
                onPress={() => setPrimaryColor(color.code)}
              >
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color={COLORS.white} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Font Family Selection */}
        <Text style={styles.label}>Typography Style</Text>
        <View style={styles.selectorRow}>
          {fonts.map((f) => {
            const isSelected = fontFamilyStyle === f;
            return (
              <TouchableOpacity
                key={f}
                style={[styles.selectorBtn, isSelected && styles.selectorBtnSelected]}
                onPress={() => setFontFamilyStyle(f)}
              >
                <Text style={[
                  styles.selectorText,
                  isSelected && styles.selectorTextSelected,
                  { fontFamily: f === 'Serif' ? 'Georgia' : f === 'Monospace' ? 'Courier' : FONTS.regular }
                ]}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
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
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 10,
    marginTop: 20,
  },
  selectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  selectorBtn: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  selectorBtnSelected: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}10`,
  },
  selectorText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  selectorTextSelected: {
    color: COLORS.primary,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  colorBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorBtnSelected: {
    borderWidth: 3,
    borderColor: '#EDF2F7',
  },
});
