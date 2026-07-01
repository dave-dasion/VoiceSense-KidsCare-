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

export default function BusinessCommunicationScreen({ navigation }: any) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const agendaOptions = [
    { id: '1', title: 'Welcome & Roll Call', time: '5 mins', desc: 'Confirm attendee presence and assign meeting scribe.' },
    { id: '2', title: 'Review Action Items', time: '10 mins', desc: 'Trace status on previous deliverables and milestones.' },
    { id: '3', title: 'Key Issue Discussion', time: '20 mins', desc: 'Focus on main topic decisions. Prevent off-topic drift.' },
    { id: '4', title: 'AOB & Next Steps', time: '10 mins', desc: 'Open floor for final remarks and outline next week responsibilities.' },
  ];

  const toggleAgendaItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Business Communication</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Structured Business Communication</Text>
          <Text style={styles.cardBody}>
            Meetings are only productive if they have clear goals. A structured <Text style={{ fontWeight: '800', color: COLORS.secondary }}>Agenda</Text> prevents time waste and off-topic discussion drift.
          </Text>
          <Text style={styles.cardBody}>
            Practice active listening, state action responsibilities clearly, and follow up with meeting minutes documents within 24 hours.
          </Text>
        </View>

        {/* Agenda Builder Simulator */}
        <Text style={styles.sectionTitle}>Interactive Meeting Agenda Builder</Text>
        <Text style={styles.sectionSubtitle}>
          Select agenda components below to build a meeting checklist:
        </Text>

        <View style={styles.agendaBuilder}>
          {agendaOptions.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.agendaCard, isSelected && styles.agendaCardActive]}
                onPress={() => toggleAgendaItem(item.id)}
              >
                <View style={styles.cardTopRow}>
                  <View style={styles.cardTitleRow}>
                    <Ionicons
                      name={isSelected ? "checkbox" : "square-outline"}
                      size={18}
                      color={isSelected ? COLORS.secondary : COLORS.textLight}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={[styles.itemTitle, isSelected && styles.itemTitleActive]}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.timeBadge}>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </View>
                <Text style={styles.itemDesc}>{item.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ProductivityAssessment')}
        >
          <Text style={styles.nextButtonText}>Proceed to Final Assessment</Text>
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
  agendaBuilder: {
    marginBottom: 24,
  },
  agendaCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  agendaCardActive: {
    borderColor: COLORS.secondary,
    backgroundColor: '#F7FAFC',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  itemTitleActive: {
    color: COLORS.secondary,
  },
  timeBadge: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  itemDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 15,
    marginLeft: 26,
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
