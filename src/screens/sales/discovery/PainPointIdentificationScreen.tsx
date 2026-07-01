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

export default function PainPointIdentificationScreen({ navigation }: any) {
  const [selectedDept, setSelectedDept] = useState<string>('');

  const departments: Record<string, { title: string; pain: string; solution: string; icon: string }> = {
    finance: {
      title: 'Finance & Accounts',
      pain: "Spending $6,000 monthly due to manual bookkeeping overrides and shipping tax compliance audit adjustments.",
      solution: "Automated compliance split invoicing outputs region-specific tax details instantly.",
      icon: 'calculator-outline',
    },
    warehouse: {
      title: 'Fleet Operations',
      pain: "Couriers spend 10+ hours weekly routing dispatch lists manually through spreadsheet grids.",
      solution: "Centralized routing wizard automates driver check-ins in one click.",
      icon: 'cube-outline',
    },
    support: {
      title: 'Customer Success',
      pain: "Churning 3 key client accounts due to late or missing shipment ETA alert templates.",
      solution: "Real-time SMS notification triggers notify customers automatically of delays.",
      icon: 'people-outline',
    },
  };

  const current = selectedDept ? departments[selectedDept] : null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Pain Point Mapping</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Targeting the Core Pain</Text>
          <Text style={styles.cardBody}>
            B2B buyers only invest to solve three corporate problems: **Financial Pain** (losing money), **Efficiency Pain** (wasting labor), or **Support Pain** (losing customers). Identify which pain is highest for your target account.
          </Text>
        </View>

        {/* Map selection */}
        <Text style={styles.sectionTitle}>Corporate Pain Explorer</Text>
        <Text style={styles.sectionSubtitle}>Select a corporate department to inspect its operational pain points:</Text>

        <View style={styles.deptGrid}>
          {Object.keys(departments).map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.deptCard,
                selectedDept === key && styles.deptCardActive,
              ]}
              onPress={() => setSelectedDept(key)}
            >
              <Ionicons
                name={departments[key].icon as any}
                size={22}
                color={selectedDept === key ? COLORS.secondary : COLORS.textDark}
              />
              <Text style={[styles.deptText, selectedDept === key && styles.deptTextActive]}>
                {departments[key].title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Details Panel */}
        {current ? (
          <View style={styles.detailsPanel}>
            <Text style={styles.detailsHeader}>Department Pain Assessment</Text>
            <View style={styles.painBox}>
              <Text style={styles.painTitle}>Identify Bottleneck:</Text>
              <Text style={styles.painText}>"{current.pain}"</Text>
            </View>
            <View style={styles.solBox}>
              <Text style={styles.solTitle}>Software Solution Map:</Text>
              <Text style={styles.solText}>{current.solution}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.placeholderPanel}>
            <Ionicons name="map-outline" size={36} color={COLORS.border} />
            <Text style={styles.placeholderText}>Select a department above to examine client constraints.</Text>
          </View>
        )}

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('DiscoveryPractice')}
        >
          <Text style={styles.nextButtonText}>Proceed to Discovery Practice</Text>
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
  deptGrid: {
    marginBottom: 20,
  },
  deptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  deptCardActive: {
    borderColor: COLORS.secondary,
    backgroundColor: '#F7FAFC',
  },
  deptText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    marginLeft: 12,
  },
  deptTextActive: {
    color: COLORS.secondary,
  },
  detailsPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  detailsHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    paddingBottom: 6,
  },
  painBox: {
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  painTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9B2C2C',
    textTransform: 'uppercase',
  },
  painText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 15,
    marginTop: 2,
    fontStyle: 'italic',
  },
  solBox: {
    backgroundColor: '#F0FFF4',
    borderRadius: 8,
    padding: 12,
  },
  solTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#22543D',
    textTransform: 'uppercase',
  },
  solText: {
    fontSize: 11,
    color: COLORS.textDark,
    lineHeight: 15,
    marginTop: 2,
  },
  placeholderPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginBottom: 24,
  },
  placeholderText: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 10,
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
