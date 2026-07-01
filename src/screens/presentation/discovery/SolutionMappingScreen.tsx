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

export default function SolutionMappingScreen({ navigation }: any) {
  const [map1, setMap1] = useState<string>('');
  const [map2, setMap2] = useState<string>('');
  const [map3, setMap3] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const checkMapping = () => {
    return map1 === 'ocr' && map2 === 'onprem' && map3 === 'lora';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3. Technical Solution Mapping</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Matching Gaps to Capabilities</Text>
          <Text style={styles.cardBody}>
            Proper solution mapping prevents scope creep. Link client gaps to correct platform product modules below:
          </Text>
        </View>

        {/* Gap 1 */}
        <View style={styles.mappingGroup}>
          <Text style={styles.gapLabel}>Client Gap 1: Manual typing of paper patient charts.</Text>
          <View style={styles.choiceRow}>
            <TouchableOpacity
              style={[styles.miniBtn, map1 === 'ocr' && styles.miniBtnActive]}
              onPress={() => { setMap1('ocr'); setSubmitted(false); }}
            >
              <Text style={styles.miniBtnText}>Layout OCR Engine</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.miniBtn, map1 === 'api' && styles.miniBtnActive]}
              onPress={() => { setMap1('api'); setSubmitted(false); }}
            >
              <Text style={styles.miniBtnText}>REST Ingestion API</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Gap 2 */}
        <View style={styles.mappingGroup}>
          <Text style={styles.gapLabel}>Client Gap 2: HIPAA block on sharing patient cloud data.</Text>
          <View style={styles.choiceRow}>
            <TouchableOpacity
              style={[styles.miniBtn, map2 === 'onprem' && styles.miniBtnActive]}
              onPress={() => { setMap2('onprem'); setSubmitted(false); }}
            >
              <Text style={styles.miniBtnText}>Private On-Prem Host</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.miniBtn, map2 === 'cloud' && styles.miniBtnActive]}
              onPress={() => { setMap2('cloud'); setSubmitted(false); }}
            >
              <Text style={styles.miniBtnText}>Public Cloud API</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Gap 3 */}
        <View style={styles.mappingGroup}>
          <Text style={styles.gapLabel}>Client Gap 3: Extraction accuracy is low for custom invoice templates.</Text>
          <View style={styles.choiceRow}>
            <TouchableOpacity
              style={[styles.miniBtn, map3 === 'prompt' && styles.miniBtnActive]}
              onPress={() => { setMap3('prompt'); setSubmitted(false); }}
            >
              <Text style={styles.miniBtnText}>Prompt Engineering</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.miniBtn, map3 === 'lora' && styles.miniBtnActive]}
              onPress={() => { setMap3('lora'); setSubmitted(false); }}
            >
              <Text style={styles.miniBtnText}>LoRA Fine-Tuned Model</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit */}
        {!submitted ? (
          <TouchableOpacity
            style={[styles.submitBtn, (!map1 || !map2 || !map3) && styles.submitBtnDisabled]}
            disabled={!map1 || !map2 || !map3}
            onPress={() => setSubmitted(true)}
          >
            <Text style={styles.submitBtnText}>Verify Solution Map</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.feedbackPanel, checkMapping() ? styles.correctPanel : styles.wrongPanel]}>
            <Ionicons
              name={checkMapping() ? "checkmark-circle" : "close-circle"}
              size={32}
              color={checkMapping() ? COLORS.success : COLORS.danger}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.feedbackText}>
              {checkMapping()
                ? "Perfect Solution Mapping! You correctly aligned client requirements with HIPAA compliance and fine-tuned accuracy modules."
                : "Incorrect mapping. Review details: HIPAA requires On-Prem; Custom template accuracy requires LoRA Fine-Tuned weights."}
            </Text>
          </View>
        )}

        {/* Return to Hub */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('AIProductHub')}
        >
          <Text style={styles.nextButtonText}>Finish Discovery Sub-Module</Text>
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
  mappingGroup: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    ...SHADOWS.light,
  },
  gapLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 16,
    marginBottom: 10,
  },
  choiceRow: {
    flexDirection: 'row',
  },
  miniBtn: {
    flex: 1,
    height: 36,
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  miniBtnActive: {
    backgroundColor: COLORS.secondary + '15',
    borderColor: COLORS.secondary,
    borderWidth: 1.5,
  },
  miniBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  submitBtn: {
    backgroundColor: COLORS.secondary,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  submitBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  feedbackPanel: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20,
  },
  correctPanel: {
    backgroundColor: '#F0FFF4',
    borderColor: '#C6F6D5',
  },
  wrongPanel: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FED7D7',
  },
  feedbackText: {
    fontSize: 11,
    color: COLORS.textDark,
    textAlign: 'center',
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
