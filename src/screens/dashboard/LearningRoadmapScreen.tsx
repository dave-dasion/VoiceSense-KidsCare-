import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LearningPath } from './LearningPathsListScreen';

interface RoadmapNode {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: 'Completed' | 'Active' | 'Locked';
  icon: string;
}

const MOCK_ROADMAPS: Record<string, RoadmapNode[]> = {
  p1: [
    { id: 'n1', phase: 'Phase 1: UI Foundation', title: 'React Native Layouts & Flexbox', description: 'Master alignment vectors, safe areas, wrap modes, and layouts styling variables.', status: 'Completed', icon: 'layers' },
    { id: 'n2', phase: 'Phase 2: Global State', title: 'Redux State Management Architecture', description: 'Build context providers, custom hooks, reducers, and async saga actions.', status: 'Active', icon: 'git-merge' },
    { id: 'n3', phase: 'Phase 3: Extensions', title: 'Custom Native Modules in iOS & Android', description: 'Expose Objective-C/Swift and Java methods, thread buffers, and native events.', status: 'Locked', icon: 'hardware-chip' },
    { id: 'n4', phase: 'Phase 4: Launching', title: 'App Store Optimization & Deployment', description: 'Setup Fastlane lanes, code sign provisioning profiles, and release to beta tracks.', status: 'Locked', icon: 'cloud-upload' },
  ],
  p2: [
    { id: 'n5', phase: 'Phase 1: Basic Prompts', title: 'Introduction to Prompt Chaining', description: 'Zero-shot, few-shot prompts, instruction sequencing, and system templates.', status: 'Active', icon: 'chatbubbles' },
    { id: 'n6', phase: 'Phase 2: Context Limit', title: 'Context Optimizations & Personas', description: 'Summarization, embeddings truncation, memory retention, and role parameters.', status: 'Locked', icon: 'scan' },
    { id: 'n7', phase: 'Phase 3: Pipelines', title: 'Vector DB & Agentic Pipelines', description: 'Pinecone integrations, LangChain tools, fallback agents, and code executions.', status: 'Locked', icon: 'git-network' },
  ],
  p3: [
    { id: 'n8', phase: 'Phase 1: Basic Crypto', title: 'Security Cryptography Basics', description: 'SHA-256 hashes, AES-256 encryptions, private keys, and signatures.', status: 'Completed', icon: 'key' },
    { id: 'n9', phase: 'Phase 2: IAM Controls', title: 'Enterprise Access Policies', description: 'Role-based authorization rules, dynamic security groups, audit logs.', status: 'Completed', icon: 'shield-lock' },
    { id: 'n10', phase: 'Phase 3: Audit Protocols', title: 'Cloud Data Auditing Protocols', description: 'AWS CloudTrail reviews, automated alerts, forensic investigations.', status: 'Completed', icon: 'reader' },
  ],
};

export default function LearningRoadmapScreen({ route, navigation }: any) {
  const { path }: { path: LearningPath } = route.params;

  const nodes = MOCK_ROADMAPS[path.id] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Roadmap</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Roadmap Briefing Card */}
        <View style={styles.briefCard}>
          <Ionicons name="git-branch" size={28} color={COLORS.secondary} style={{ marginBottom: 8 }} />
          <Text style={styles.briefTitle}>{path.title} Roadmap</Text>
          <Text style={styles.briefDesc}>
            Follow this chronological step-by-step training outline to earn your verified course qualification diploma.
          </Text>
        </View>

        {/* Nodes Timeline */}
        <View style={styles.timelineContainer}>
          {nodes.map((node, index) => {
            const isCompleted = node.status === 'Completed';
            const isActive = node.status === 'Active';
            const isLast = index === nodes.length - 1;

            return (
              <View key={node.id} style={styles.nodeRow}>
                {/* Timeline Column */}
                <View style={styles.timelineCol}>
                  <View style={[
                    styles.nodeBullet,
                    isCompleted && styles.bulletCompleted,
                    isActive && styles.bulletActive,
                  ]}>
                    <Ionicons
                      name={isCompleted ? 'checkmark-circle' : (isActive ? 'play' : 'lock-closed')}
                      size={isCompleted ? 18 : 12}
                      color={isCompleted || isActive ? COLORS.white : COLORS.textLight}
                    />
                  </View>
                  
                  {/* Connecting track line */}
                  {!isLast && (
                    <View style={[
                      styles.connectorLine,
                      isCompleted && styles.connectorCompleted,
                      isActive && styles.connectorActive,
                    ]} />
                  )}
                </View>

                {/* Content Column */}
                <View style={[
                  styles.nodeCard,
                  isActive && styles.nodeCardActive,
                  !isCompleted && !isActive && styles.nodeCardLocked,
                ]}>
                  <View style={styles.cardHeader}>
                    <Text style={[styles.phaseText, isActive && styles.phaseTextActive]}>
                      {node.phase}
                    </Text>
                    <Ionicons
                      name={node.icon as any}
                      size={18}
                      color={isCompleted ? COLORS.success : isActive ? COLORS.secondary : COLORS.textLight}
                    />
                  </View>

                  <Text style={styles.nodeTitle}>{node.title}</Text>
                  <Text style={styles.nodeDesc}>{node.description}</Text>

                  {isActive && (
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => navigation.navigate('ContinueLearning')}
                    >
                      <Text style={styles.actionBtnText}>Continue Chapter</Text>
                      <Ionicons name="arrow-forward" size={12} color={COLORS.white} style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </View>
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
  briefCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 24,
  },
  briefTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  briefDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
    lineHeight: 16,
  },
  timelineContainer: {
    paddingHorizontal: 8,
  },
  nodeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineCol: {
    alignItems: 'center',
    marginRight: 16,
    width: 24,
  },
  nodeBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    marginTop: 8,
  },
  bulletCompleted: {
    backgroundColor: COLORS.success,
  },
  bulletActive: {
    backgroundColor: COLORS.secondary,
  },
  connectorLine: {
    position: 'absolute',
    top: 32,
    bottom: -24,
    width: 3,
    backgroundColor: '#E2E8F0',
    zIndex: 1,
  },
  connectorCompleted: {
    backgroundColor: COLORS.success,
  },
  connectorActive: {
    backgroundColor: COLORS.secondary,
  },
  nodeCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  nodeCardActive: {
    borderColor: COLORS.secondary,
    borderWidth: 1.5,
    backgroundColor: COLORS.infoLight,
  },
  nodeCardLocked: {
    backgroundColor: '#F8FAFC',
    opacity: 0.75,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  phaseText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  phaseTextActive: {
    color: COLORS.secondary,
  },
  nodeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  nodeDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 4,
    lineHeight: 15,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  actionBtnText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
});
