import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_NOTIFICATIONS } from './mockNotificationData';

export default function TrainingRemindersScreen({ navigation }: any) {
  
  const reminders = MOCK_NOTIFICATIONS.filter((n) => n.type === 'reminder');

  const handleLaunchReminder = (title: string) => {
    if (title.toLowerCase().includes('quiz')) {
      navigation.navigate('QuizHome');
    } else {
      navigation.navigate('MyLearningHome');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Training Reminders</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Intro */}
        <View style={styles.introCard}>
          <View style={styles.infoRow}>
            <Ionicons name="notifications-circle" size={36} color={COLORS.primary} style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.introTitle}>Micro-learning Pushes</Text>
              <Text style={styles.introBody}>
                Keep your certifications active and training metrics top-tier by completing scheduled modules.
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Pending Tasks</Text>

        {reminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminderCard}>
            <View style={styles.cardHeader}>
              <View style={styles.tagRow}>
                <View style={[styles.priorityBadge, { backgroundColor: reminder.priority === 'high' ? '#FED7D7' : '#EBF8FF' }]}>
                  <Text style={[styles.priorityText, { color: reminder.priority === 'high' ? COLORS.danger : COLORS.secondary }]}>
                    {reminder.priority.toUpperCase()} PRIORITY
                  </Text>
                </View>
              </View>
              <Text style={styles.cardTime}>{reminder.time}</Text>
            </View>

            <Text style={styles.cardTitle}>{reminder.title}</Text>
            <Text style={styles.cardDesc}>{reminder.body}</Text>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleLaunchReminder(reminder.title)}
            >
              <Text style={styles.actionBtnText}>Launch Scheduled Event</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.white} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
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
  introCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  introBody: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    marginTop: 4,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    fontFamily: FONTS.bold,
  },
  reminderCard: {
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
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: 'row',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 8,
    fontWeight: '800',
  },
  cardTime: {
    fontSize: 9.5,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  cardDesc: {
    fontSize: 11.5,
    color: COLORS.textLight,
    lineHeight: 17,
    marginTop: 6,
    fontWeight: '500',
  },
  actionBtn: {
    height: 36,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    ...SHADOWS.light,
  },
  actionBtnText: {
    color: COLORS.white,
    fontSize: 11.5,
    fontWeight: '700',
  },
});
