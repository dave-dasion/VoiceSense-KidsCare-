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

export default function ITWorkflowsScreen({ navigation }: any) {
  const [selectedNode, setSelectedNode] = useState<number>(1);

  const getPipelineData = () => {
    switch (selectedNode) {
      case 1:
        return {
          title: "Step 1: Webhook Event Trigger",
          tech: "REST POST request via HTTPS",
          desc: "Triggered whenever an invoice file is uploaded to the secure bucket. Payload contains: document_id, bucket_url, timestamp.",
        };
      case 2:
        return {
          title: "Step 2: Message Queue Router",
          tech: "RabbitMQ / Amazon SQS broker",
          desc: "Dispatches an asynchronous processing job task to free worker daemons. Prevents server overloading during heavy surge peaks.",
        };
      case 3:
        return {
          title: "Step 3: Extraction OCR Inference",
          tech: "Docker cluster on local GPUs",
          desc: "Executes fine-tuned layout model parser. Extracts layout, table items, key-value labels, and formats them to raw structured texts.",
        };
      case 4:
        return {
          title: "Step 4: Database Storage Save",
          tech: "PostgreSQL database insertion",
          desc: "Inserts parsed model outputs. Automatically triggers external accounting ERP syncing webhooks.",
        };
    }
  };

  const current = getPipelineData();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. IT Data Workflows</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Asynchronous Processing Pipeline</Text>
          <Text style={styles.cardBody}>
            Enterprise IT departments value reliable queues. Click each pipeline step to study the internal software architecture:
          </Text>
        </View>

        {/* Pipeline Diagram */}
        <View style={styles.pipelineMap}>
          {[
            { id: 1, label: "1. Webhook Trigger", icon: "flash" },
            { id: 2, label: "2. Queue Broker", icon: "swap-horizontal" },
            { id: 3, label: "3. GPU Extraction", icon: "hardware-chip" },
            { id: 4, label: "4. Database Save", icon: "database" },
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
        <Text style={styles.sectionTitle}>Pipeline Stage Architecture Specs</Text>
        <View style={styles.consoleCard}>
          <View style={styles.consoleHeader}>
            <Text style={styles.consoleTitle}>{current.title}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{current.tech}</Text>
            </View>
          </View>
          <Text style={styles.consoleBodyText}>{current.desc}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('TechnologySolutions')}
        >
          <Text style={styles.nextButtonText}>Proceed to Technology Proposals</Text>
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
    padding: 18,
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
  consoleBodyText: {
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 18,
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
