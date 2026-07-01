import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface RunningJob {
  id: string;
  name: string;
  currentStep: string;
  progress: number; // 0 to 1
  startTime: string;
  duration: string;
  triggerType: string;
}

export default function RunningWorkflowsScreen({ navigation }: any) {
  const [runningJobs, setRunningJobs] = useState<RunningJob[]>([
    {
      id: 'run-803',
      name: 'Slack Notify on Stripe Charge',
      currentStep: 'Step 2: Slack post payload compiler',
      progress: 0.6,
      startTime: '17:48:02',
      duration: '22s',
      triggerType: 'Stripe Webhook',
    },
    {
      id: 'run-804',
      name: 'Google Sheets CRM Sync',
      currentStep: 'Step 1: Fetching rows from source',
      progress: 0.25,
      startTime: '17:48:20',
      duration: '4s',
      triggerType: 'Scheduled Cron (5m)',
    },
    {
      id: 'run-805',
      name: 'GitHub PR Automated reviewer',
      currentStep: 'Step 3: Compiling feedback payload',
      progress: 0.85,
      startTime: '17:47:50',
      duration: '34s',
      triggerType: 'GitHub Webhook (PR Open)',
    },
  ]);

  // Simulate progress updates
  useEffect(() => {
    const timer = setInterval(() => {
      setRunningJobs((prev) =>
        prev.map((job) => {
          if (job.progress >= 1.0) {
            return {
              ...job,
              progress: 0.1, // Reset progress for demonstration
              duration: '1s',
            };
          }
          return {
            ...job,
            progress: Number((job.progress + 0.05).toFixed(2)),
            duration: `${parseInt(job.duration) + 1}s`,
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleStopRun = (id: string, name: string) => {
    Alert.alert('Stop Execution', `Are you sure you want to immediately terminate run execution "${id}" for "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Stop Run',
        style: 'destructive',
        onPress: () => {
          setRunningJobs((prev) => prev.filter((job) => job.id !== id));
          Alert.alert('Terminated', 'Execution run terminated successfully.');
        },
      },
    ]);
  };

  const handlePauseRun = (name: string) => {
    Alert.alert('Pause Execution', `Paused execution loop for "${name}". You can resume testing in the canvas.`, [
      { text: 'OK' }
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
        <Text style={styles.headerTitle}>Running Executions</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Main content list */}
      <FlatList
        data={runningJobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="pulse" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyText}>No running executions found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <View>
                <Text style={styles.jobName}>{item.name}</Text>
                <Text style={styles.jobId}>Run ID: {item.id} • Trigger: {item.triggerType}</Text>
              </View>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>

            {/* Current step details */}
            <Text style={styles.stepTitle}>{item.currentStep}</Text>

            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBg}>
                <View style={[styles.progressActive, { width: `${item.progress * 100}%` }]} />
              </View>
              <Text style={styles.progressPercentage}>{Math.round(item.progress * 100)}%</Text>
            </View>

            {/* Card actions */}
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handlePauseRun(item.name)}
              >
                <Ionicons name="pause-circle-outline" size={16} color={COLORS.white} />
                <Text style={styles.actionText}>Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { marginLeft: 12 }]}
                onPress={() => handleStopRun(item.id, item.name)}
              >
                <Ionicons name="stop-circle-outline" size={16} color={COLORS.danger} />
                <Text style={[styles.actionText, { color: COLORS.danger }]}>Terminate</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                style={styles.traceBtn}
                onPress={() => navigation.navigate('WorkflowCanvas', { workflowId: 'wf-1' })}
              >
                <Text style={styles.traceBtnText}>Trace Logs</Text>
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
  jobCard: {
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
  durationText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  stepTitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#0F172A',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressActive: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 3,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
    width: 32,
    textAlign: 'right',
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
