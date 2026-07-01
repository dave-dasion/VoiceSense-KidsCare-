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
import { LinearGradient } from 'expo-linear-gradient';
import { DAILY_TASKS, DailyTask } from './mockAvitaData';

export default function DailyLearningTasksScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<DailyTask[]>(DAILY_TASKS);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const nextState = !task.isCompleted;
          if (nextState) {
            Alert.alert(
              'Task Completed! 🎉',
              `You earned +${task.points} XP! Keep up the daily study streak.`,
              [{ text: 'Awesome' }]
            );
          }
          return { ...task, isCompleted: nextState };
        }
        return task;
      })
    );
  };

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const totalPointsEarned = tasks.filter((t) => t.isCompleted).reduce((sum, t) => sum + t.points, 0);
  const maxPointsAvailable = tasks.reduce((sum, t) => sum + t.points, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Tasks</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Progress Card */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['#ED8936', '#DD6B20']}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryTopRow}>
              <View style={styles.trophyIconBg}>
                <Ionicons name="gift" size={24} color={COLORS.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.summaryTitle}>Daily Streak Active</Text>
                <Text style={styles.summarySub}>Complete tasks to gain XP multipliers</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{completedCount} / {tasks.length}</Text>
                <Text style={styles.statLabel}>Tasks Done</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{totalPointsEarned} XP</Text>
                <Text style={styles.statLabel}>Earned Today</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBg}>
                <View style={[
                  styles.progressBarFill,
                  { width: `${maxPointsAvailable > 0 ? (totalPointsEarned / maxPointsAvailable) * 100 : 0}%` }
                ]} />
              </View>
              <Text style={styles.progressText}>
                {Math.round(maxPointsAvailable > 0 ? (totalPointsEarned / maxPointsAvailable) * 100 : 0)}% of daily goals met
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>Today's checklist</Text>

        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={[
              styles.taskCard,
              task.isCompleted && styles.taskCardCompleted
            ]}
            onPress={() => toggleTaskCompletion(task.id)}
          >
            <Ionicons
              name={task.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={task.isCompleted ? COLORS.success : COLORS.border}
              style={styles.checkboxIcon}
            />

            <View style={{ flex: 1 }}>
              <Text style={[
                styles.taskTitle,
                task.isCompleted && styles.taskTitleCompleted
              ]}>
                {task.title}
              </Text>
              <View style={styles.xpRow}>
                <Ionicons name="sparkles" size={12} color="#D69E2E" style={{ marginRight: 4 }} />
                <Text style={styles.xpText}>+{task.points} XP Reward</Text>
              </View>
            </View>

            <View style={[
              styles.categoryIconBg,
              { backgroundColor: task.isCompleted ? '#E6FFFA' : '#EDF2F7' }
            ]}>
              <Ionicons
                name={task.icon as any}
                size={18}
                color={task.isCompleted ? COLORS.success : COLORS.textLight}
              />
            </View>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  summaryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  summaryGradient: {
    padding: 20,
  },
  summaryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trophyIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
  },
  summarySub: {
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 10,
  },
  statBox: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    marginTop: 2,
  },
  progressContainer: {},
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10.5,
    color: COLORS.white,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    fontFamily: FONTS.bold,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  taskCardCompleted: {
    borderColor: '#B2F5EA',
    backgroundColor: '#FAFDFE',
  },
  checkboxIcon: {
    marginRight: 14,
  },
  taskTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: 18,
  },
  taskTitleCompleted: {
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  xpText: {
    fontSize: 10,
    color: '#B7791F',
    fontWeight: '700',
  },
  categoryIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
