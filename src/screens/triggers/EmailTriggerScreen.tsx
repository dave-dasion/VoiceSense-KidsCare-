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

export default function EmailTriggerScreen({ navigation }: any) {
  const [emailAccount, setEmailAccount] = useState('gmail-account@company.com');
  const [folder, setFolder] = useState('INBOX');
  const [subjectFilter, setSubjectFilter] = useState('Invoice');
  const [senderFilter, setSenderFilter] = useState('');
  
  // Switches
  const [downloadAttachments, setDownloadAttachments] = useState(true);
  const [aiClassification, setAiClassification] = useState(true);

  const handleTestEmail = () => {
    Alert.alert('Testing Mail Connection', 'Scanning mailbox folder "INBOX" for matching subjects...', [
      {
        text: 'OK',
        onPress: () => {
          Alert.alert('Match Found', 'Found 1 email matching "Invoice".\n\nFrom: billing@stripe.com\nSubject: Invoice #19248\nAttachment: invoice_19248.pdf');
        }
      }
    ]);
  };

  const handleSave = () => {
    Alert.alert('Email Trigger Connected', 'Email event listener is active.', [
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
        <Text style={styles.headerTitle}>Email Event Listener</Text>
        <TouchableOpacity style={styles.testBtn} onPress={handleTestEmail}>
          <Text style={styles.testBtnText}>Test Mail</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Email Accounts dropdown */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Connected Email Account</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => Alert.alert('Connected Accounts', 'gmail-account@company.com (Stripe OAuth API)')}
          >
            <Text style={styles.dropdownText}>{emailAccount}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* Mail folder */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mailbox Folder Target</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => Alert.alert('Inbox Folders', 'Scanning INBOX, Archive, Spam, Sent')}
          >
            <Text style={styles.dropdownText}>{folder}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* Filter inputs */}
        <Text style={styles.sectionTitle}>Filter Rules</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Filter by Subject Keyword</Text>
          <TextInput
            style={styles.inputField}
            value={subjectFilter}
            onChangeText={setSubjectFilter}
            placeholder="e.g. Invoice, Receipts, Alert"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Filter by Sender Address</Text>
          <TextInput
            style={styles.inputField}
            value={senderFilter}
            onChangeText={setSenderFilter}
            placeholder="e.g. notifications@github.com"
            placeholderTextColor={COLORS.textLight}
            autoCapitalize="none"
          />
        </View>

        {/* Action Toggle controls */}
        <Text style={styles.sectionTitle}>Processing Options</Text>

        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>Download Attachments</Text>
            <Text style={styles.switchSub}>Parse attachments and pass metadata to actions.</Text>
          </View>
          <Switch
            value={downloadAttachments}
            onValueChange={setDownloadAttachments}
            trackColor={{ true: COLORS.secondary }}
          />
        </View>

        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>AI Intent Classification</Text>
            <Text style={styles.switchSub}>Let FlowPilot LLM auto-tag urgency, categories, and sentiments.</Text>
          </View>
          <Switch
            value={aiClassification}
            onValueChange={setAiClassification}
            trackColor={{ true: COLORS.secondary }}
          />
        </View>

        {/* Save Connection */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Connect Mail Trigger</Text>
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
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
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
    marginBottom: 12,
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
    marginTop: 20,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
