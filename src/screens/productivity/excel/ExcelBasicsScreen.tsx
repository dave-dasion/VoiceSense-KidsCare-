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

export default function ExcelBasicsScreen({ navigation }: any) {
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: string } | null>({ r: 1, c: 'A' });
  const rows = [1, 2, 3, 4, 5];
  const cols = ['A', 'B', 'C', 'D', 'E'];

  const cellData: Record<string, string> = {
    'A1': 'Revenue', 'B1': 'Q1', 'C1': 'Q2', 'D1': 'Q3', 'E1': 'Q4',
    'A2': 'Sales', 'B2': '12,500', 'C2': '14,200', 'D2': '15,600', 'E2': '18,900',
    'A3': 'Marketing', 'B3': '3,000', 'C3': '3,500', 'D3': '3,200', 'E3': '4,100',
    'A4': 'Operations', 'B4': '4,500', 'C4': '4,800', 'D4': '5,100', 'E4': '5,300',
    'A5': 'Total Net', 'B5': '5,000', 'C5': '5,900', 'D5': '7,300', 'E5': '9,500',
  };

  const getCellLabel = (c: string, r: number) => `${c}${r}`;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Excel Basics</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Lesson Concept */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Core Grid Concept</Text>
          <Text style={styles.cardBody}>
            Excel organizes information into a grid. Each column is identified by a letter (A, B, C...) and each row by a number (1, 2, 3...). The intersection of a row and a column is called a <Text style={{ fontWeight: '800', color: COLORS.secondary }}>Cell</Text>.
          </Text>
          <Text style={styles.cardBody}>
            Cells are addressed by combining their Column Letter and Row Number (e.g. <Text style={{ fontFamily: FONTS.bold, fontWeight: '800' }}>B3</Text> is column B, row 3).
          </Text>
        </View>

        {/* Interactive Cell Simulator */}
        <Text style={styles.sectionTitle}>Interactive Grid Simulator</Text>
        <Text style={styles.sectionSubtitle}>Tap cells in the grid below to inspect their addresses and content:</Text>

        <View style={styles.gridContainer}>
          {/* Column Headers */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell, { width: 40 }]} />
            {cols.map((col) => (
              <View key={col} style={[styles.cell, styles.headerCell]}>
                <Text style={styles.headerText}>{col}</Text>
              </View>
            ))}
          </View>

          {/* Grid Rows */}
          {rows.map((row) => (
            <View key={row} style={styles.row}>
              <View style={[styles.cell, styles.headerCell, { width: 40 }]}>
                <Text style={styles.headerText}>{row}</Text>
              </View>
              {cols.map((col) => {
                const label = getCellLabel(col, row);
                const isSelected = selectedCell?.r === row && selectedCell?.c === col;
                return (
                  <TouchableOpacity
                    key={col}
                    style={[
                      styles.cell,
                      styles.dataCell,
                      isSelected && styles.selectedCell,
                    ]}
                    onPress={() => setSelectedCell({ r: row, c: col })}
                  >
                    <Text
                      style={[styles.cellText, isSelected && styles.selectedCellText]}
                      numberOfLines={1}
                    >
                      {cellData[label] || ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Selected Cell Panel */}
        {selectedCell && (
          <View style={styles.panel}>
            <View style={styles.panelRow}>
              <View style={styles.addressBox}>
                <Text style={styles.addressText}>{getCellLabel(selectedCell.c, selectedCell.r)}</Text>
              </View>
              <View style={styles.valueBox}>
                <Text style={styles.valueLabel}>Cell Content:</Text>
                <Text style={styles.valueText}>
                  {cellData[getCellLabel(selectedCell.c, selectedCell.r)] || 'Empty'}
                </Text>
              </View>
            </View>
            <View style={styles.panelExplanation}>
              <Ionicons name="information-circle-outline" size={16} color={COLORS.secondary} style={{ marginRight: 6 }} />
              <Text style={styles.explanationText}>
                Column {selectedCell.c}, Row {selectedCell.r}. This is a {typeof cellData[getCellLabel(selectedCell.c, selectedCell.r)] === 'string' && isNaN(Number(cellData[getCellLabel(selectedCell.c, selectedCell.r)]?.replace(/,/g, ''))) ? 'text label' : 'numeric value'}.
              </Text>
            </View>
          </View>
        )}

        {/* Lesson Navigation CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ExcelFormulas')}
        >
          <Text style={styles.nextButtonText}>Proceed to Formulas</Text>
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
  gridContainer: {
    backgroundColor: '#E2E8F0',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#CBD5E0',
  },
  headerCell: {
    backgroundColor: '#EDF2F7',
  },
  dataCell: {
    backgroundColor: COLORS.white,
  },
  selectedCell: {
    backgroundColor: '#EBF8FF',
    borderColor: COLORS.secondary,
    borderWidth: 1.5,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  cellText: {
    fontSize: 10,
    color: COLORS.textDark,
  },
  selectedCellText: {
    fontWeight: '800',
    color: COLORS.secondary,
  },
  panel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  panelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressBox: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  valueBox: {
    flex: 1,
  },
  valueLabel: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  valueText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 2,
  },
  panelExplanation: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 12,
    paddingTop: 10,
  },
  explanationText: {
    fontSize: 11,
    color: COLORS.textLight,
    flex: 1,
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
