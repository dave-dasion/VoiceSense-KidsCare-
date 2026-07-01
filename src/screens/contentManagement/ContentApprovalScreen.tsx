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
import { MOCK_APPROVAL_ITEMS, CMSApprovalItem } from './mockContentData';

export default function ContentApprovalScreen({ navigation }: any) {
  const [items, setItems] = useState<CMSApprovalItem[]>(MOCK_APPROVAL_ITEMS);

  const handleAction = (id: string, action: 'Approve' | 'Reject') => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    Alert.alert('Action Logged', `Submission has been successfully ${action === 'Approve' ? 'Approved' : 'Rejected'}.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Submissions</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Pending Approval Queue ({items.length})</Text>

        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-done-circle-outline" size={60} color={COLORS.success} />
            <Text style={styles.emptyText}>All caught up!</Text>
            <Text style={styles.emptySub}>No pending lesson or quiz approvals at this time.</Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.approvalCard}>
              <View style={styles.cardHeader}>
                <View style={styles.typeTag}>
                  <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
                </View>
                <Text style={styles.timeText}>{item.submittedAt}</Text>
              </View>

              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.authorText}>Author: {item.author}</Text>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.rejectBtn}
                  onPress={() => handleAction(item.id, 'Reject')}
                >
                  <Text style={styles.rejectBtnText}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.approveBtn}
                  onPress={() => handleAction(item.id, 'Approve')}
                >
                  <Text style={styles.approveBtnText}>Approve & Publish</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

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
  approvalCard: {
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
    marginBottom: 8,
  },
  typeTag: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 8.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  timeText: {
    fontSize: 9.5,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  titleText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  authorText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 4,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  rejectBtn: {
    flex: 1,
    height: 36,
    borderColor: COLORS.danger,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  rejectBtnText: {
    color: COLORS.danger,
    fontSize: 11.5,
    fontWeight: '700',
  },
  approveBtn: {
    flex: 2,
    height: 36,
    backgroundColor: COLORS.success,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    ...SHADOWS.light,
  },
  approveBtnText: {
    color: COLORS.white,
    fontSize: 11.5,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 12,
  },
  emptySub: {
    fontSize: 11.5,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
});
