import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function FileUploadTriggerScreen({ navigation }: any) {
  const [storageProvider, setStorageProvider] = useState('Google Drive Enterprise');
  const [folderPath, setFolderPath] = useState('/Automations/Incoming');
  const [fileExtension, setFileExtension] = useState('.csv, .pdf');
  const [maxSizeMb, setMaxSizeMb] = useState('25');
  const [aiDocParsing, setAiDocParsing] = useState(true);

  const handleTestTrigger = () => {
    Alert.alert('Testing File Listener', 'Checking remote folder for new file uploads...', [
      {
        text: 'OK',
        onPress: () => {
          Alert.alert('File Found', 'Found 1 new file matching extension filters.\n\nName: july_payroll.csv\nSize: 4.2 MB\nColumns: [employee_id, hours_worked, rate]');
        }
      }
    ]);
  };

  const handleSave = () => {
    Alert.alert('File Trigger Connected', 'Listener callback successfully established.', [
      { text: 'OK', onPress: () => navigation.goBack() }
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
        <Text style={styles.headerTitle}>File Upload Trigger</Text>
        <TouchableOpacity style={styles.testBtn} onPress={handleTestTrigger}>
          <Text style={styles.testBtnText}>Test Listener</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Storage Provider Dropdown */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Storage Service Provider</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => Alert.alert('Providers', 'Google Drive, Dropbox, AWS S3, OneDrive')}
          >
            <Text style={styles.dropdownText}>{storageProvider}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* Folder Path */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Target Folder Path</Text>
          <TextInput
            style={styles.inputField}
            value={folderPath}
            onChangeText={setFolderPath}
            placeholder="e.g. /Incoming/Uploads"
            placeholderTextColor={COLORS.textLight}
            autoCapitalize="none"
          />
        </View>

        {/* Extensions filter */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Allowed File Extensions</Text>
          <TextInput
            style={styles.inputField}
            value={fileExtension}
            onChangeText={setFileExtension}
            placeholder="e.g. .pdf, .csv, .xlsx"
            placeholderTextColor={COLORS.textLight}
            autoCapitalize="none"
          />
        </View>

        {/* Max Size */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Maximum File Size Limit (MB)</Text>
          <TextInput
            style={[styles.inputField, { width: 100, textAlign: 'center' }]}
            value={maxSizeMb}
            onChangeText={setMaxSizeMb}
            keyboardType="numeric"
          />
        </View>

        {/* AI Parsing switch */}
        <View style={styles.switchRow}>
          <View style={{ flex: 1, marginRight: 16 }}>
            <Text style={styles.switchTitle}>Smart AI Document Parsing</Text>
            <Text style={styles.switchSub}>Automatically extract keys, values, and text blocks from scanned PDFs or images.</Text>
          </View>
          <Switch
            value={aiDocParsing}
            onValueChange={setAiDocParsing}
            trackColor={{ true: COLORS.secondary }}
          />
        </View>

        {/* Save Connection */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Activate File Trigger</Text>
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
  testBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.cardBg,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  testBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 24,
  },
  switchTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  switchSub: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  saveBtn: {
    height: 48,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
