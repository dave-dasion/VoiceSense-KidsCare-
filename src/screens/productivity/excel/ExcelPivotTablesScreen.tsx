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

export default function ExcelPivotTablesScreen({ navigation }: any) {
  const [rowField, setRowField] = useState<'Department' | 'Staff'>('Department');
  const [valueField, setValueField] = useState<'SUM of Sales' | 'COUNT'>('SUM of Sales');

  // Aggregation results
  const pivotData = {
    Department: {
      'SUM of Sales': [
        { key: 'Tech', value: '$42,000' },
        { key: 'Marketing', value: '$34,000' },
        { key: 'Grand Total', value: '$76,000' },
      ],
      'COUNT': [
        { key: 'Tech', value: '3 employees' },
        { key: 'Marketing', value: '2 employees' },
        { key: 'Grand Total', value: '5 employees' },
      ],
    },
    Staff: {
      'SUM of Sales': [
        { key: 'Alice Smith', value: '$15,000' },
        { key: 'Bob Johnson', value: '$12,000' },
        { key: 'Charlie Brown', value: '$18,000' },
        { key: 'Diana Prince', value: '$22,000' },
        { key: 'Ethan Hunt', value: '$9,000' },
        { key: 'Grand Total', value: '$76,000' },
      ],
      'COUNT': [
        { key: 'Alice Smith', value: '1 count' },
        { key: 'Bob Johnson', value: '1 count' },
        { key: 'Charlie Brown', value: '1 count' },
        { key: 'Diana Prince', value: '1 count' },
        { key: 'Ethan Hunt', value: '1 count' },
        { key: 'Grand Total', value: '5 counts' },
      ],
    },
  };

  const currentResult = pivotData[rowField][valueField];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>5. Excel Pivot Tables</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Lesson Concept */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Pivot Table Summaries</Text>
          <Text style={styles.cardBody}>
            Pivot Tables allow you to summarize and extract insights from large, messy tables without writing complex functions. They "pivot" or rotate columns and rows to group similar records together.
          </Text>
          <Text style={styles.cardBody}>
            By defining <Text style={{ fontWeight: '700', color: COLORS.secondary }}>Rows</Text> and <Text style={{ fontWeight: '700', color: COLORS.secondary }}>Values</Text>, you can instantly sum, count, or average sales figures grouped by department or staff member.
          </Text>
        </View>

        {/* Pivot Config Simulator */}
        <Text style={styles.sectionTitle}>Interactive Pivot Builder</Text>
        <Text style={styles.sectionSubtitle}>Toggle configurations to see the Pivot report aggregate dynamically:</Text>

        <View style={styles.configContainer}>
          {/* Row Field Toggle */}
          <View style={styles.configBlock}>
            <Text style={styles.configLabel}>Drag to Rows:</Text>
            <View style={styles.toggleRow}>
              {(['Department', 'Staff'] as const).map((field) => (
                <TouchableOpacity
                  key={field}
                  style={[styles.toggleBtn, rowField === field && styles.toggleBtnActive]}
                  onPress={() => setRowField(field)}
                >
                  <Text style={[styles.toggleText, rowField === field && styles.toggleTextActive]}>{field}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Values Field Toggle */}
          <View style={styles.configBlock}>
            <Text style={styles.configLabel}>Summarize Values By:</Text>
            <View style={styles.toggleRow}>
              {(['SUM of Sales', 'COUNT'] as const).map((val) => (
                <TouchableOpacity
                  key={val}
                  style={[styles.toggleBtn, valueField === val && styles.toggleBtnActive]}
                  onPress={() => setValueField(val)}
                >
                  <Text style={[styles.toggleText, valueField === val && styles.toggleTextActive]}>{val}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Generated Report Grid */}
        <Text style={styles.sectionTitle}>Generated Pivot Report Output</Text>
        <View style={styles.pivotTable}>
          <View style={styles.tableRowHeader}>
            <Text style={[styles.thText, { flex: 1.5 }]}>{rowField}</Text>
            <Text style={[styles.thText, { flex: 1, textAlign: 'right' }]}>{valueField}</Text>
          </View>

          {currentResult.map((item, index) => {
            const isTotal = item.key === 'Grand Total';
            return (
              <View key={index} style={[styles.tableRow, isTotal && styles.totalRow]}>
                <Text style={[styles.tdText, { flex: 1.5 }, isTotal && styles.totalText]}>{item.key}</Text>
                <Text style={[styles.tdText, { flex: 1, textAlign: 'right' }, isTotal && styles.totalText]}>
                  {item.value}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Lesson Navigation CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ExcelExercises')}
        >
          <Text style={styles.nextButtonText}>Proceed to Exercises</Text>
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
  configContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  configBlock: {
    marginBottom: 16,
  },
  configLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  toggleTextActive: {
    color: COLORS.secondary,
  },
  pivotTable: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.light,
  },
  tableRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  thText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  totalRow: {
    backgroundColor: '#EDF2F7',
    borderTopWidth: 1.5,
    borderTopColor: COLORS.border,
  },
  totalText: {
    fontWeight: '800',
    color: COLORS.primary,
  },
  tdText: {
    fontSize: 12,
    color: COLORS.textDark,
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
