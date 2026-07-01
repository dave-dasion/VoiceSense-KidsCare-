import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ExcelFormulasScreen({ navigation }: any) {
  const [formulaInput, setFormulaInput] = useState('=B2*10');
  const [calculatedValue, setCalculatedValue] = useState('125,000');
  const [errorMsg, setErrorMsg] = useState('');

  // Mock Cell variables
  const cells: Record<string, number> = {
    B2: 12500,
    C2: 3000,
    D2: 4500,
  };

  const handleCalculate = () => {
    setErrorMsg('');
    const input = formulaInput.trim();
    if (!input.startsWith('=')) {
      setErrorMsg("Excel formulas must begin with an equals sign '='");
      setCalculatedValue('ERROR');
      return;
    }

    const expression = input.substring(1).toUpperCase().replace(/\s+/g, '');
    try {
      // Simple parser for formulas like B2*10, B2+C2, etc.
      let evaluatedExpr = expression;
      for (const [cellKey, val] of Object.entries(cells)) {
        evaluatedExpr = evaluatedExpr.replace(new RegExp(cellKey, 'g'), String(val));
      }

      // Check if expression contains unauthorized chars
      if (/[^0-9+\-*/().]/.test(evaluatedExpr)) {
        setErrorMsg('Formula references undefined cells or invalid characters.');
        setCalculatedValue('ERROR');
        return;
      }

      // Safe evaluation using Function
      const result = new Function(`return (${evaluatedExpr})`)();
      if (isNaN(result) || !isFinite(result)) {
        setErrorMsg('Invalid calculation (division by zero or infinite result).');
        setCalculatedValue('ERROR');
      } else {
        setCalculatedValue(Number(result).toLocaleString());
      }
    } catch (err) {
      setErrorMsg('Syntax error in formula construction.');
      setCalculatedValue('ERROR');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Excel Formulas</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Lesson Concept */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Writing Formulas</Text>
          <Text style={styles.cardBody}>
            Formulas are equations that perform calculations on values in your sheet. Every single formula in Excel <Text style={{ fontWeight: '800', color: COLORS.danger }}>MUST begin with an equals sign (=)</Text>.
          </Text>
          <Text style={styles.cardBody}>
            Instead of typing raw numbers, you should reference cell addresses (e.g. `=B2+C2`). This ensures that if the values in those cells change, the formula result updates automatically!
          </Text>
        </View>

        {/* Reference Cells */}
        <Text style={styles.sectionTitle}>Reference Values Context</Text>
        <View style={styles.referenceContainer}>
          <View style={styles.refRow}>
            <Text style={styles.refCell}>Cell B2 (Sales)</Text>
            <Text style={styles.refVal}>{cells.B2.toLocaleString()}</Text>
          </View>
          <View style={styles.refRow}>
            <Text style={styles.refCell}>Cell C2 (Marketing)</Text>
            <Text style={styles.refVal}>{cells.C2.toLocaleString()}</Text>
          </View>
          <View style={styles.refRow}>
            <Text style={styles.refCell}>Cell D2 (Operations)</Text>
            <Text style={styles.refVal}>{cells.D2.toLocaleString()}</Text>
          </View>
        </View>

        {/* Live Formula Calculator */}
        <Text style={styles.sectionTitle}>Live Formula Editor Simulator</Text>
        <Text style={styles.sectionSubtitle}>Type your equation below and hit calculate. Try `=B2+C2` or `=B2-D2`:</Text>

        <View style={styles.editorPanel}>
          <View style={styles.inputRow}>
            <Text style={styles.fxLabel}>fx</Text>
            <TextInput
              style={styles.formulaInput}
              value={formulaInput}
              onChangeText={setFormulaInput}
              placeholder="e.g. =B2+C2"
              placeholderTextColor={COLORS.textLight}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity style={styles.calculateBtn} onPress={handleCalculate}>
            <Text style={styles.calculateBtnText}>Evaluate Equation</Text>
          </TouchableOpacity>

          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Calculated Cell Output:</Text>
            <Text style={[styles.resultValue, calculatedValue === 'ERROR' && { color: COLORS.danger }]}>
              {calculatedValue}
            </Text>
          </View>

          {errorMsg.length > 0 && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={16} color={COLORS.danger} style={{ marginRight: 6 }} />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          )}
        </View>

        {/* Lesson Navigation CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ExcelFunctions')}
        >
          <Text style={styles.nextButtonText}>Proceed to Functions</Text>
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
  referenceContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },
  refRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  refCell: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  refVal: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  editorPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 10,
    backgroundColor: '#F8FAFC',
  },
  fxLabel: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '800',
    color: COLORS.textLight,
    marginRight: 10,
  },
  formulaInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: COLORS.textDark,
    fontFamily: 'System',
  },
  calculateBtn: {
    backgroundColor: COLORS.secondary,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  calculateBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 14,
  },
  resultLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.success,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  errorText: {
    fontSize: 11,
    color: COLORS.danger,
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
