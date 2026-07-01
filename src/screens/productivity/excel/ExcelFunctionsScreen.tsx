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

export default function ExcelFunctionsScreen({ navigation }: any) {
  const [selectedFunc, setSelectedFunc] = useState<'SUM' | 'AVERAGE' | 'IF' | 'VLOOKUP'>('SUM');

  const functionsData = {
    SUM: {
      syntax: '=SUM(number1, [number2], ...)',
      desc: 'Adds all the numbers in a range of cells.',
      example: '=SUM(B2:B5)',
      output: '25,000',
      useCase: 'Calculating total sales or expenses over a period.',
    },
    AVERAGE: {
      syntax: '=AVERAGE(number1, [number2], ...)',
      desc: 'Returns the average (arithmetic mean) of the arguments.',
      example: '=AVERAGE(B2:B5)',
      output: '6,250',
      useCase: 'Determining the average monthly salary or unit cost.',
    },
    IF: {
      syntax: '=IF(logical_test, value_if_true, value_if_false)',
      desc: 'Checks whether a condition is met, and returns one value if TRUE, and another if FALSE.',
      example: '=IF(B2>=10000, "Bonus Eligible", "No Bonus")',
      output: '"Bonus Eligible" (Since B2 is 12,500)',
      useCase: 'Flagging high-value clients or categorizing items.',
    },
    VLOOKUP: {
      syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
      desc: 'Searches for a value in the first column of a table, and returns a value in the same row from a specified column.',
      example: '=VLOOKUP("Sales", A2:B5, 2, FALSE)',
      output: '12,500',
      useCase: 'Finding pricing based on product ID or staff names.',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Excel Functions</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Lesson Concept */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>What are Functions?</Text>
          <Text style={styles.cardBody}>
            Functions are predefined formulas built into Excel. They take specific input values, called <Text style={{ fontWeight: '700', color: COLORS.secondary }}>arguments</Text>, perform operations, and return outputs.
          </Text>
          <Text style={styles.cardBody}>
            Using functions avoids writing long, messy equations. For instance, `=SUM(B2:B100)` replaces adding 99 separate cells manually!
          </Text>
        </View>

        {/* Function Select Buttons */}
        <Text style={styles.sectionTitle}>Select a Core Function to Learn</Text>
        <View style={styles.tabContainer}>
          {(['SUM', 'AVERAGE', 'IF', 'VLOOKUP'] as const).map((func) => (
            <TouchableOpacity
              key={func}
              style={[styles.tabButton, selectedFunc === func && styles.tabButtonActive]}
              onPress={() => setSelectedFunc(func)}
            >
              <Text style={[styles.tabText, selectedFunc === func && styles.tabTextActive]}>{func}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Function Details Simulator */}
        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <Text style={styles.detailTitle}>{selectedFunc} Function</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Built-in</Text>
            </View>
          </View>

          <Text style={styles.detailDesc}>{functionsData[selectedFunc].desc}</Text>

          <View style={styles.syntaxBox}>
            <Text style={styles.syntaxLabel}>SYNTAX:</Text>
            <Text style={styles.syntaxValue}>{functionsData[selectedFunc].syntax}</Text>
          </View>

          <View style={styles.exampleBox}>
            <Text style={styles.exampleLabel}>EXAMPLE FORMULA:</Text>
            <Text style={styles.exampleValue}>{functionsData[selectedFunc].example}</Text>
            <Text style={styles.exampleOutput}>
              Result: <Text style={{ color: COLORS.success, fontWeight: '800' }}>{functionsData[selectedFunc].output}</Text>
            </Text>
          </View>

          <View style={styles.useCaseBox}>
            <Text style={styles.useCaseLabel}>COMMON USE CASE:</Text>
            <Text style={styles.useCaseValue}>{functionsData[selectedFunc].useCase}</Text>
          </View>
        </View>

        {/* Lesson Navigation CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ExcelDataAnalysis')}
        >
          <Text style={styles.nextButtonText}>Proceed to Data Analysis</Text>
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
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#EDF2F7',
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.secondary,
  },
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  badge: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  detailDesc: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
    marginBottom: 16,
  },
  syntaxBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  syntaxLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  syntaxValue: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'System',
    color: COLORS.textDark,
  },
  exampleBox: {
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  exampleLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  exampleValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  exampleOutput: {
    fontSize: 12,
    color: COLORS.textDark,
    marginTop: 6,
  },
  useCaseBox: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  useCaseLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  useCaseValue: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
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
