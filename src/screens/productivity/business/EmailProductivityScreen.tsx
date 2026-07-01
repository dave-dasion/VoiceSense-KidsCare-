import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

interface Email {
  id: string;
  sender: string;
  subject: string;
  isImportant: boolean;
}

export default function EmailProductivityScreen({ navigation }: any) {
  const [emails, setEmails] = useState<Email[]>([
    { id: '1', sender: 'Newsletter Hub', subject: 'Weekly digest optimization tips', isImportant: false },
    { id: '2', sender: 'Operations Director', subject: 'Emergency schedule adjustments needed', isImportant: true },
    { id: '3', sender: 'Promo Tracker', subject: '50% off office supplies this Friday', isImportant: false },
  ]);

  const archiveEmail = (id: string) => {
    setEmails(emails.filter((email) => email.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Email Productivity</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Inbox Zero & Sorting Rules</Text>
          <Text style={styles.cardBody}>
            Email can easily become a major distraction. <Text style={{ fontWeight: '800', color: COLORS.secondary }}>Inbox Zero</Text> is a workflow discipline designed to keep the inbox empty by immediately deciding whether to delegate, archive, reply, or delete.
          </Text>
          <Text style={styles.cardBody}>
            Use sorting filters to route automated alerts and newsletters out of the primary workspace inbox automatically.
          </Text>
        </View>

        {/* Email Inbox simulator */}
        <Text style={styles.sectionTitle}>Inbox Zero Simulator</Text>
        <Text style={styles.sectionSubtitle}>
          Process your emails below. Tap the archive folder to clear clutter:
        </Text>

        <View style={styles.inboxPanel}>
          <View style={styles.inboxHeader}>
            <Ionicons name="mail-open-outline" size={18} color={COLORS.textDark} />
            <Text style={styles.inboxTitle}>Primary Inbox ({emails.length} unread)</Text>
          </View>

          {emails.length === 0 ? (
            <View style={styles.emptyInbox}>
              <Ionicons name="checkmark-done" size={40} color={COLORS.success} />
              <Text style={styles.emptyTitle}>Inbox Zero Achieved!</Text>
              <Text style={styles.emptyDesc}>Excellent work processing and archiving clutter.</Text>
            </View>
          ) : (
            emails.map((email) => (
              <View key={email.id} style={styles.emailRow}>
                <View style={styles.emailText}>
                  <View style={styles.senderHeader}>
                    {email.isImportant && (
                      <View style={styles.importantBadge}>
                        <Text style={styles.importantText}>Urgent</Text>
                      </View>
                    )}
                    <Text style={styles.senderName}>{email.sender}</Text>
                  </View>
                  <Text style={styles.emailSubject}>{email.subject}</Text>
                </View>
                <TouchableOpacity style={styles.archiveBtn} onPress={() => archiveEmail(email.id)}>
                  <Ionicons name="archive-outline" size={18} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('BusinessCommunication')}
        >
          <Text style={styles.nextButtonText}>Proceed to Business Comm</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
    fontFamily: FONTS.bold,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 16,
  },
  inboxPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.light,
  },
  inboxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  inboxTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginLeft: 8,
  },
  emptyInbox: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 10,
  },
  emptyDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  emailText: {
    flex: 1,
    marginRight: 12,
  },
  senderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  importantBadge: {
    backgroundColor: '#FFF5F5',
    borderWidth: 0.5,
    borderColor: '#FEB2B2',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
    marginRight: 6,
  },
  importantText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.danger,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  emailSubject: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  archiveBtn: {
    backgroundColor: COLORS.secondary,
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
