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

export default function ClinicalWorkflowsScreen({ navigation }: any) {
  const [selectedNode, setSelectedNode] = useState<number>(1);

  const getPipelineData = () => {
    switch (selectedNode) {
      case 1:
        return {
          title: "Step 1: Patient Voice Ingest",
          outputType: "MIME Audio (WAV/FLAC)",
          schema: "Duration: 180s\nSample Rate: 16kHz Mono\nFormat: raw-audio-stream",
        };
      case 2:
        return {
          title: "Step 2: Speech-to-Text Extraction",
          outputType: "UTF-8 Text Transcript",
          schema: "\"Patient presents with acute chest pressure radiating down left shoulder. Pain scale 7/10...\"",
        };
      case 3:
        return {
          title: "Step 3: Medical Coding Annotation",
          outputType: "ICD-10 Code Predictions",
          schema: "{\n  \"codes\": [\n    {\"code\": \"I20.9\", \"desc\": \"Angina pectoris\", \"prob\": 0.94}\n  ]\n}",
        };
      case 4:
        return {
          title: "Step 4: FHIR JSON EHR Integration",
          outputType: "JSON Resource Payload",
          schema: "{\n  \"resourceType\": \"Encounter\",\n  \"status\": \"finished\",\n  \"class\": {\"code\": \"AMB\"}\n}",
        };
    }
  };

  const current = getPipelineData()!;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. Clinical Ingestion Flow</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>EHR Data Ingestion Pipeline</Text>
          <Text style={styles.cardBody}>
            Study how unstructured voice recordings transition into structured FHIR EHR resources. Click a pipeline stage to inspect the intermediate data outputs:
          </Text>
        </View>

        {/* Pipeline Diagram */}
        <View style={styles.pipelineMap}>
          {[
            { id: 1, label: "1. Audio Ingest", icon: "mic" },
            { id: 2, label: "2. Speech to Text", icon: "document-text" },
            { id: 3, label: "3. ICD-10 Coding", icon: "pricetag" },
            { id: 4, label: "4. FHIR EHR Save", icon: "server" },
          ].map((node, index) => (
            <React.Fragment key={node.id}>
              {index > 0 && <Ionicons name="arrow-down" size={16} color={COLORS.textLight} style={{ marginVertical: 4 }} />}
              <TouchableOpacity
                style={[styles.nodeBtn, selectedNode === node.id && styles.nodeBtnActive]}
                onPress={() => setSelectedNode(node.id)}
              >
                <Ionicons
                  name={node.icon as any}
                  size={18}
                  color={selectedNode === node.id ? COLORS.secondary : COLORS.textLight}
                  style={{ marginRight: 10 }}
                />
                <Text style={[styles.nodeLabel, selectedNode === node.id && styles.nodeLabelActive]}>
                  {node.label}
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        {/* Console output display */}
        <Text style={styles.sectionTitle}>Pipeline Stage Data Sandbox</Text>
        <View style={styles.consoleCard}>
          <View style={styles.consoleHeader}>
            <Text style={styles.consoleTitle}>{current.title}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{current.outputType}</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.codeContainer}>
            <Text style={styles.codeText}>{current.schema}</Text>
          </ScrollView>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('HealthcareCustomerScenarios')}
        >
          <Text style={styles.nextButtonText}>Proceed to Hospital CIO Scenarios</Text>
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
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 10,
    fontFamily: FONTS.bold,
  },
  pipelineMap: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginBottom: 20,
    ...SHADOWS.light,
  },
  nodeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
  },
  nodeBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary + '08',
    borderWidth: 1.5,
  },
  nodeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  nodeLabelActive: {
    color: COLORS.secondary,
  },
  consoleCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  consoleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#475569',
    paddingBottom: 8,
    marginBottom: 10,
  },
  consoleTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white,
  },
  badge: {
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
  },
  codeContainer: {
    maxHeight: 120,
  },
  codeText: {
    fontSize: 11,
    color: '#38BDF8',
    fontFamily: 'Courier',
    lineHeight: 15,
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
