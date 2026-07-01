import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ScheduleEvent {
  id: string;
  title: string;
  category: 'Webinar' | 'Assignment' | 'Course Deadline' | 'Study Group';
  time: string;
  instructorOrCourse: string;
  dateKey: string; // Format: 'YYYY-MM-DD'
  reminderSet?: boolean;
}

interface DateItem {
  dayName: string;
  dayNum: string;
  dateKey: string;
}

export default function CalendarScheduleScreen({ navigation }: any) {
  // We represent the week of June 26 to July 2, 2026
  const weekDays: DateItem[] = [
    { dayName: 'Fri', dayNum: '26', dateKey: '2026-06-26' },
    { dayName: 'Sat', dayNum: '27', dateKey: '2026-06-27' },
    { dayName: 'Sun', dayNum: '28', dateKey: '2026-06-28' },
    { dayName: 'Mon', dayNum: '29', dateKey: '2026-06-29' },
    { dayName: 'Tue', dayNum: '30', dateKey: '2026-06-30' },
    { dayName: 'Wed', dayNum: '01', dateKey: '2026-07-01' },
    { dayName: 'Thu', dayNum: '02', dateKey: '2026-07-02' },
  ];

  const [selectedDate, setSelectedDate] = useState('2026-06-26');
  const [isAddEventVisible, setIsAddEventVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<'Webinar' | 'Assignment' | 'Course Deadline' | 'Study Group'>('Study Group');

  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: 'e1',
      title: 'Nutrition and Meal Planning live stream',
      category: 'Webinar',
      time: '05:00 PM - 06:30 PM',
      instructorOrCourse: 'Hosted by Dr. Emily Watson',
      dateKey: '2026-06-26',
      reminderSet: true,
    },
    {
      id: 'e2',
      title: 'Case Study: Handling Refusal of Care due',
      category: 'Assignment',
      time: '11:59 PM Deadline',
      instructorOrCourse: 'Course: Dementia Care Advanced',
      dateKey: '2026-06-30',
      reminderSet: false,
    },
    {
      id: 'e3',
      title: 'Advanced Dementia Care & Behavioural Management',
      category: 'Webinar',
      time: '02:00 PM - 03:30 PM',
      instructorOrCourse: 'Presented by Dr. Sarah Jenkins',
      dateKey: '2026-06-29',
      reminderSet: false,
    },
    {
      id: 'e4',
      title: 'Weekly peer review study group session',
      category: 'Study Group',
      time: '06:00 PM - 07:00 PM',
      instructorOrCourse: 'Organized by Emily Davis',
      dateKey: '2026-06-27',
      reminderSet: false,
    },
    {
      id: 'e5',
      title: 'OSHA Guidelines Assessment Deadline',
      category: 'Course Deadline',
      time: '05:00 PM',
      instructorOrCourse: 'Compliance & Safety Module',
      dateKey: '2026-07-02',
      reminderSet: true,
    },
  ]);

  const handleReminderToggle = (eventId: string) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id === eventId) {
          const updated = !e.reminderSet;
          Alert.alert(
            updated ? 'Reminder Set' : 'Reminder Cancelled',
            updated ? `You will receive a notification 15 minutes before "${e.title}".` : `Notification removed for "${e.title}".`
          );
          return { ...e, reminderSet: updated };
        }
        return e;
      })
    );
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim() || !newEventTime.trim()) {
      Alert.alert('Incomplete Fields', 'Please complete the title and time fields.');
      return;
    }

    const newEvent: ScheduleEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      category: newEventCategory,
      time: newEventTime,
      instructorOrCourse: 'Self-Scheduled Session',
      dateKey: selectedDate,
      reminderSet: true,
    };

    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setNewEventTime('');
    setIsAddEventVisible(false);
    Alert.alert('Study Block Scheduled', `Added "${newEventTitle}" to your learning calendar.`);
  };

  const getCategoryColor = (category: ScheduleEvent['category']) => {
    switch (category) {
      case 'Webinar':
        return COLORS.primary;
      case 'Assignment':
        return COLORS.warning;
      case 'Course Deadline':
        return COLORS.danger;
      case 'Study Group':
        return COLORS.success;
    }
  };

  const selectedDayEvents = events.filter(e => e.dateKey === selectedDate);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.backButton}>
          <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Schedule</Text>
        <TouchableOpacity onPress={() => setIsAddEventVisible(true)} style={styles.addEventBtn}>
          <Ionicons name="add-circle-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Week Calendar Strip */}
      <View style={styles.calendarStripContainer}>
        <Text style={styles.stripTitle}>June / July 2026</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stripScroll}>
          {weekDays.map((day) => {
            const isSelected = selectedDate === day.dateKey;
            return (
              <TouchableOpacity
                key={day.dateKey}
                onPress={() => setSelectedDate(day.dateKey)}
                style={[
                  styles.dayCard,
                  isSelected && styles.dayCardActive
                ]}
              >
                <Text style={[styles.dayNameText, isSelected && styles.textActive]}>{day.dayName}</Text>
                <Text style={[styles.dayNumText, isSelected && styles.textActive]}>{day.dayNum}</Text>
                {events.some(e => e.dateKey === day.dateKey) && (
                  <View style={[styles.dotIndicator, isSelected && { backgroundColor: COLORS.white }]} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Events Section */}
        <View style={styles.eventsContainer}>
          <Text style={styles.sectionTitle}>Agenda for Selected Day</Text>
          
          {selectedDayEvents.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={54} color={COLORS.textLight} />
              <Text style={styles.emptyTitle}>Nothing scheduled for this day</Text>
              <Text style={styles.emptySubtitle}>Keep your streak going! Schedule a personal study block to review course materials.</Text>
              
              <TouchableOpacity 
                style={styles.scheduleBlockBtn}
                onPress={() => setIsAddEventVisible(true)}
              >
                <Text style={styles.scheduleBlockBtnText}>Schedule Study Block</Text>
              </TouchableOpacity>
            </View>
          ) : (
            selectedDayEvents.map(event => {
              const catColor = getCategoryColor(event.category);
              return (
                <View key={event.id} style={styles.eventCard}>
                  <View style={[styles.categoryIndicatorBar, { backgroundColor: catColor }]} />
                  <View style={styles.eventInfo}>
                    <View style={styles.eventHeaderRow}>
                      <View style={[styles.catBadge, { backgroundColor: catColor + '15' }]}>
                        <Text style={[styles.catBadgeText, { color: catColor }]}>{event.category}</Text>
                      </View>
                      <TouchableOpacity onPress={() => handleReminderToggle(event.id)}>
                        <Ionicons 
                          name={event.reminderSet ? "notifications" : "notifications-outline"} 
                          size={18} 
                          color={event.reminderSet ? COLORS.primary : COLORS.textLight} 
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.eventTitle}>{event.title}</Text>
                    
                    <View style={styles.eventFooter}>
                      <View style={styles.timeBlock}>
                        <Ionicons name="time-outline" size={12} color={COLORS.textLight} style={{ marginRight: 4 }} />
                        <Text style={styles.timeText}>{event.time}</Text>
                      </View>
                      <Text style={styles.instructorText}>{event.instructorOrCourse}</Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Add Event Modal */}
      <Modal visible={isAddEventVisible} animationType="slide" transparent>
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Schedule Study Block</Text>
              <TouchableOpacity onPress={() => setIsAddEventVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalBody}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryPickerRow}>
                {(['Webinar', 'Assignment', 'Course Deadline', 'Study Group'] as const).map(cat => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setNewEventCategory(cat)}
                    style={[
                      styles.pickerBtn,
                      newEventCategory === cat && { backgroundColor: getCategoryColor(cat), borderColor: getCategoryColor(cat) }
                    ]}
                  >
                    <Text style={[
                      styles.pickerText,
                      newEventCategory === cat && { color: COLORS.white }
                    ]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Reminder / Study Title</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Read HIPAA summary notes"
                value={newEventTitle}
                onChangeText={setNewEventTitle}
              />

              <Text style={styles.label}>Time Slot</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 04:00 PM - 05:00 PM"
                value={newEventTime}
                onChangeText={setNewEventTime}
              />

              <TouchableOpacity style={styles.submitBtn} onPress={handleAddEvent}>
                <Text style={styles.submitBtnText}>Add to Calendar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
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
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  addEventBtn: {
    padding: 4,
  },
  calendarStripContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    ...SHADOWS.light,
  },
  stripTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginHorizontal: 16,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  stripScroll: {
    paddingHorizontal: 12,
  },
  dayCard: {
    width: 52,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    position: 'relative',
  },
  dayCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    ...SHADOWS.light,
  },
  dayNameText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  dayNumText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 2,
  },
  textActive: {
    color: COLORS.white,
  },
  dotIndicator: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  eventsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  categoryIndicatorBar: {
    width: 6,
    height: '100%',
  },
  eventInfo: {
    flex: 1,
    padding: 14,
  },
  eventHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  catBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  catBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 18,
    marginBottom: 10,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  instructorText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 20,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 14,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  scheduleBlockBtn: {
    backgroundColor: COLORS.primary,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  scheduleBlockBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  modalBody: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
    marginTop: 12,
  },
  categoryPickerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  pickerBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 6,
    marginBottom: 6,
  },
  pickerText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: COLORS.textDark,
    backgroundColor: '#F8FAFC',
    marginBottom: 8,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
