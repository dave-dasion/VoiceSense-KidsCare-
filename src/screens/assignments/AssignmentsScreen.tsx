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

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  grade?: string;
  instructions: string;
}

interface PracticalTask {
  id: string;
  title: string;
  category: string;
  steps: { id: string; text: string; completed: boolean }[];
}

export default function AssignmentsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');
  
  // Assignment submission state
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  
  // Practical task state
  const [selectedTask, setSelectedTask] = useState<PracticalTask | null>(null);

  const [assignments, setPosts] = useState<Assignment[]>([
    {
      id: 'a1',
      title: 'Case Study: Handling Refusal of Care',
      course: 'Dementia Care Advanced',
      dueDate: 'June 30, 2026',
      status: 'Pending',
      instructions: 'Review the case of Mr. Henderson, who has refused to take his evening medication three times this week. Write a 300-word response outlining your strategy to de-escalate the situation and encourage compliance without force.',
    },
    {
      id: 'a2',
      title: 'Critical Incident Reporting Assessment',
      course: 'Compliance & Legal Safety',
      dueDate: 'June 25, 2026',
      status: 'Graded',
      grade: '95/100',
      instructions: 'Submit a mock incident report for a patient slip-and-fall scenario in the hallway, focusing on timeline details, witness statements, and environmental conditions.',
    },
    {
      id: 'a3',
      title: 'Active Listening & Empathy Simulation Prep',
      course: 'Professional Communication',
      dueDate: 'July 04, 2026',
      status: 'Pending',
      instructions: 'Prepare responses to three common family objections regarding care plan adjustments. Focus on reflecting concerns and validating their emotions.',
    },
  ]);

  const [practicalTasks, setPracticalTasks] = useState<PracticalTask[]>([
    {
      id: 'p1',
      title: 'Manual Patient Bed Transfer (Slide Board)',
      category: 'Mobility Assistance',
      steps: [
        { id: 's1', text: 'Communicate the transfer plan clearly to the patient', completed: true },
        { id: 's2', text: 'Lock wheelchair brakes and align it at 45 degrees to the bed', completed: false },
        { id: 's3', text: 'Position the transfer board securely under patient thighs', completed: false },
        { id: 's4', text: 'Guide the patient across the board using proper posture (bend knees, straight back)', completed: false },
      ],
    },
    {
      id: 'p2',
      title: 'Standard Blood Pressure & Oxygen Vital Log',
      category: 'Health Assessment',
      steps: [
        { id: 's5', text: 'Sanitize hands and explain procedure to patient', completed: true },
        { id: 's6', text: 'Properly place and secure blood pressure cuff on upper arm', completed: true },
        { id: 's7', text: 'Record systolic, diastolic pressure, and heart rate values', completed: true },
        { id: 's8', text: 'Apply pulse oximeter and log blood oxygen concentration percentage', completed: false },
      ],
    },
  ]);

  const handleAssignmentSubmit = () => {
    if (!submissionText.trim() || !selectedAssignment) return;

    setPosts(prev =>
      prev.map(a => {
        if (a.id === selectedAssignment.id) {
          return { ...a, status: 'Submitted' };
        }
        return a;
      })
    );

    Alert.alert('Submission Successful', 'Your written assignment has been sent for reviewer grading.');
    setSubmissionText('');
    setSelectedAssignment(null);
  };

  const toggleStep = (taskId: string, stepId: string) => {
    setPracticalTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const updatedSteps = task.steps.map(step => {
            if (step.id === stepId) {
              return { ...step, completed: !step.completed };
            }
            return step;
          });
          
          // Update selected task in state to refresh modal UI
          if (selectedTask && selectedTask.id === taskId) {
            setSelectedTask({ ...task, steps: updatedSteps });
          }
          return { ...task, steps: updatedSteps };
        }
        return task;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.backButton}>
          <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assignments & Exercises</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Overview Stats Bar */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statsCard}
        >
          <View style={styles.statGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>2</Text>
              <Text style={styles.statLbl}>Due Soon</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>95%</Text>
              <Text style={styles.statLbl}>Avg Grade</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>3</Text>
              <Text style={styles.statLbl}>Completed</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Tab selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            onPress={() => setActiveTab('written')}
            style={[styles.tabBtn, activeTab === 'written' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'written' && styles.tabTextActive]}>Written Case Studies</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('practical')}
            style={[styles.tabBtn, activeTab === 'practical' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'practical' && styles.tabTextActive]}>Practical Checklists</Text>
          </TouchableOpacity>
        </View>

        {/* Items List */}
        <View style={styles.listContainer}>
          {activeTab === 'written' ? (
            assignments.map(a => {
              const isPending = a.status === 'Pending';
              const isGraded = a.status === 'Graded';
              return (
                <TouchableOpacity 
                  key={a.id} 
                  style={styles.card}
                  onPress={() => {
                    if (isPending) {
                      setSelectedAssignment(a);
                    } else {
                      Alert.alert(
                        a.title,
                        isGraded 
                          ? `This assignment has been graded. Score: ${a.grade}` 
                          : 'This assignment has already been submitted and is pending review.'
                      );
                    }
                  }}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.courseName}>{a.course}</Text>
                    <View style={[
                      styles.statusBadge,
                      isPending && styles.badgePending,
                      a.status === 'Submitted' && styles.badgeSubmitted,
                      isGraded && styles.badgeGraded
                    ]}>
                      <Text style={[
                        styles.badgeText,
                        isPending && { color: COLORS.warning },
                        a.status === 'Submitted' && { color: COLORS.secondary },
                        isGraded && { color: COLORS.success }
                      ]}>{isGraded ? a.grade : a.status}</Text>
                    </View>
                  </View>

                  <Text style={styles.cardTitle}>{a.title}</Text>
                  
                  <View style={styles.cardFooter}>
                    <Text style={styles.dueDateText}>Due: {a.dueDate}</Text>
                    {isPending && (
                      <View style={styles.actionPrompt}>
                        <Text style={styles.actionPromptText}>Submit Now</Text>
                        <Ionicons name="chevron-forward" size={12} color={COLORS.primary} />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            practicalTasks.map(task => {
              const completedCount = task.steps.filter(s => s.completed).length;
              const progress = completedCount / task.steps.length;
              return (
                <TouchableOpacity 
                  key={task.id} 
                  style={styles.card}
                  onPress={() => setSelectedTask(task)}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.courseName}>{task.category}</Text>
                    <Text style={styles.progressText}>{completedCount}/{task.steps.length} Steps Done</Text>
                  </View>

                  <Text style={styles.cardTitle}>{task.title}</Text>

                  {/* Simple Progress Bar */}
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                  </View>

                  <View style={[styles.cardFooter, { marginTop: 12 }]}>
                    <Text style={styles.dueDateText}>Interactive Clinical Guide</Text>
                    <View style={styles.actionPrompt}>
                      <Text style={styles.actionPromptText}>Open checklist</Text>
                      <Ionicons name="chevron-forward" size={12} color={COLORS.primary} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Assignment Submit Modal */}
      <Modal visible={selectedAssignment !== null} animationType="slide" transparent>
        <SafeAreaView style={styles.modalOverlay}>
          {selectedAssignment && (
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle} numberOfLines={1}>Submit Assignment</Text>
                <TouchableOpacity onPress={() => setSelectedAssignment(null)}>
                  <Ionicons name="close" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} style={styles.modalBody}>
                <Text style={styles.modalSubHeader}>{selectedAssignment.course}</Text>
                <Text style={styles.modalAssignmentTitle}>{selectedAssignment.title}</Text>
                <Text style={styles.modalInstructionsTitle}>Instructions:</Text>
                <Text style={styles.modalInstructions}>{selectedAssignment.instructions}</Text>
                
                <Text style={styles.modalInstructionsTitle}>Your Submission:</Text>
                <TextInput
                  style={styles.submissionInput}
                  placeholder="Type your assignment response here..."
                  multiline
                  value={submissionText}
                  onChangeText={setSubmissionText}
                />
              </ScrollView>

              <TouchableOpacity style={styles.submitBtn} onPress={handleAssignmentSubmit}>
                <Text style={styles.submitBtnText}>Submit Written Assignment</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </Modal>

      {/* Practical Checklist Modal */}
      <Modal visible={selectedTask !== null} animationType="slide" transparent>
        <SafeAreaView style={styles.modalOverlay}>
          {selectedTask && (
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle} numberOfLines={1}>Practical Task Guide</Text>
                <TouchableOpacity onPress={() => setSelectedTask(null)}>
                  <Ionicons name="close" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} style={styles.modalBody}>
                <Text style={styles.modalSubHeader}>{selectedTask.category}</Text>
                <Text style={styles.modalAssignmentTitle}>{selectedTask.title}</Text>
                <Text style={styles.modalInstructionsTitle}>Step-by-Step Practical Guidelines:</Text>

                {selectedTask.steps.map(step => (
                  <TouchableOpacity 
                    key={step.id} 
                    style={styles.stepRow}
                    onPress={() => toggleStep(selectedTask.id, step.id)}
                  >
                    <Ionicons 
                      name={step.completed ? "checkmark-circle" : "ellipse-outline"} 
                      size={24} 
                      color={step.completed ? COLORS.success : COLORS.textLight} 
                      style={{ marginRight: 12 }}
                    />
                    <Text style={[styles.stepText, step.completed && styles.stepTextCompleted]}>
                      {step.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity style={styles.submitBtn} onPress={() => setSelectedTask(null)}>
                <Text style={styles.submitBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
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
  scrollContent: {
    paddingBottom: 30,
  },
  statsCard: {
    margin: 16,
    borderRadius: 20,
    padding: 20,
    ...SHADOWS.medium,
  },
  statGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '800',
  },
  statLbl: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.textDark,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  courseName: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgePending: {
    backgroundColor: COLORS.warning + '15',
  },
  badgeSubmitted: {
    backgroundColor: COLORS.secondary + '15',
  },
  badgeGraded: {
    backgroundColor: COLORS.success + '15',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 20,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  dueDateText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  actionPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionPromptText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    marginRight: 4,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 3,
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
  modalSubHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  modalAssignmentTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 24,
    marginBottom: 16,
  },
  modalInstructionsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  modalInstructions: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 20,
  },
  submissionInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 12,
    height: 140,
    fontSize: 14,
    color: COLORS.textDark,
    textAlignVertical: 'top',
    backgroundColor: '#F8FAFC',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: '500',
    lineHeight: 18,
  },
  stepTextCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
});
