import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface FailedJob {
  id: string;
  name: string;
  failedStep: string;
  errorLog: string;
  time: string;
  aiSuggestedFix: string;
}

export default function FailedWorkflowsScreen({ navigation }: any) {
  const [activeFix, setActiveFix] = useState<string | null>(null);
  const [failedJobs, setFailedJobs] = useState<FailedJob[]>([
    {
      id: 'run-792',
      name: 'Shopify Stock Sync Webhook',
      failedStep: 'Step 2: Sync payload inventory to Shopify',
      errorLog: 'Shopify API connection failed. HTTP Status 401 Unauthorized: Invalid access token.',
      time: '12m ago',
      aiSuggestedFix: 'The API credentials for Shopify have expired. Renew the access token inside your Workspace Integration settings panel.',
    },
    {
      id: 'run-780',
      name: 'Daily CRM Hubspot Contact Sync',
      failedStep: 'Step 3: Hubspot Contact Enrichment',
      errorLog: 'Jira API Connection Timed out. Remote socket did not reply within 15000ms limit.',
      time: '3 hours ago',
      aiSuggestedFix: 'Increase your node network request timeout limits inside the CRM node configurations, or re-run when remote server load is low.',
    },
  ]);

  const handleRetry = (id: string, name: string) => {
    Alert.alert('Re-run Execution', `Attempt to retry failed run "${id}" for "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Retry Now',
        onPress: () => {
          setFailedJobs((prev) => prev.filter((job) => job.id !== id));
          Alert.alert('Execution Queueing', 'Job re-queued. Success response completed.');
        },
      },
    ]);
  };

  const handleNotifyTeam = (name: string) => {
    Alert.alert('Notify Collaborators', `Dispatch warning notification for "${name}" to workspace Slack channel?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send Notification', onPress: () => Alert.alert('Sent', 'Collaborators have been notified.') },
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
        <Text style={styles.headerTitle}>Failed Pipelines</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* List content */}
      <FlatList
        data={failedJobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-circle-outline" size={48} color={COLORS.success} />
            <Text style={styles.emptyText}>All systems operational. No failed runs!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.failCard}>
            <View style={styles.jobHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.jobName}>{item.name}</Text>
                <Text style={styles.jobId}>Run ID: {item.id} • {item.time}</Text>
              </View>
              <View style={styles.errorBadge}>
                <Text style={styles.errorBadgeText}>CRITICAL</Text>
              </View>
            </View>

            {/* Failed step and logs */}
            <Text style={styles.stepTitle}>{item.failedStep}</Text>
            <View style={styles.logBox}>
              <Text style={styles.logText}>{item.errorLog}</Text>
            </View>

            {/* AI Assistant Insight trigger */}
            <TouchableOpacity
              style={styles.aiTrigger}
              onPress={() => setActiveFix(activeFix === item.id ? null : item.id)}
            >
              <Ionicons name="sparkles" size={16} color="#D69E2E" />
              <Text style={styles.aiTriggerText}>
                {activeFix === item.id ? 'Hide AI Suggested Fix' : '✨ View AI Suggested Fix'}
              </Text>
              <Ionicons
                name={activeFix === item.id ? 'chevron-up' : 'chevron-down'}
                size={14}
                color={COLORS.textLight}
                style={{ marginLeft: 'auto' }}
              />
            </TouchableOpacity>

            {/* AI Suggestion Box */}
            {activeFix === item.id && (
              <View style={styles.aiFixBox}>
                <Text style={styles.aiFixTitle}>AI Troubleshooter Fix Suggestion:</Text>
                <Text style={styles.aiFixText}>{item.aiSuggestedFix}</Text>
              </View>
            )}

            {/* Action buttons footer */}
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleRetry(item.id, item.name)}
              >
                <Ionicons name="refresh-outline" size={16} color={COLORS.success} />
                <Text style={[styles.actionText, { color: COLORS.success }]}>Retry Job</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, { marginLeft: 16 }]}
                onPress={() => handleNotifyTeam(item.name)}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={16} color={COLORS.white} />
                <Text style={styles.actionText}>Notify Team</Text>
              </TouchableOpacity>

              <View style={{ flex: 1 }} />
              
              <TouchableOpacity
                style={styles.traceBtn}
                onPress={() => navigation.navigate('WorkflowCanvas', { workflowId: 'wf-1' })}
              >
                <Text style={styles.traceBtnText}>Open Canvas</Text>
                <Ionicons name="arrow-forward" size={12} color={COLORS.secondary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  listContent: {
    padding: 16,
  },
  failCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  jobId: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  errorBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  errorBadgeText: {
    color: COLORS.danger,
    fontSize: 8,
    fontWeight: '800',
  },
  stepTitle: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
    marginBottom: 8,
  },
  logBox: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 12,
  },
  logText: {
    fontFamily: 'Courier',
    fontSize: 11,
    color: '#EF4444',
    lineHeight: 16,
  },
  aiTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(214, 158, 46, 0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(214, 158, 46, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  aiTriggerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D69E2E',
    marginLeft: 6,
  },
  aiFixBox: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 12,
  },
  aiFixTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  aiFixText: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: 4,
  },
  traceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  traceBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 12,
  },
});
