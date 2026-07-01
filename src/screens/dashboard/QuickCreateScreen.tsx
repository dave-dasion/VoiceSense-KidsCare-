import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Template {
  name: string;
  desc: string;
  category: string;
  icon: string;
  color: string;
}

export default function QuickCreateScreen({ navigation }: any) {
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const creationOptions = [
    { title: 'Blank Flow', desc: 'Start with clean canvas', icon: 'git-branch', color: COLORS.secondary, route: 'WorkflowCanvas' },
    { title: 'AI Copilot Compiler', desc: 'Build with prompt description', icon: 'sparkles', color: '#D69E2E', route: 'AiSuggestions' },
    { title: 'Scheduled Trigger', desc: 'Trigger flows using cron timers', icon: 'time', color: COLORS.success, route: 'WorkflowCanvas' },
    { title: 'Webhook Trigger', desc: 'Trigger via API webhook payload', icon: 'git-pull-request', color: COLORS.accent, route: 'WorkflowCanvas' },
  ];

  const categories = ['All', 'Marketing', 'Sales', 'Productivity', 'Operations'];

  const templates: Template[] = [
    { name: 'Auto Slack post for new Shopify Order', desc: 'Notify workspace team members of new customer orders.', category: 'Marketing', icon: 'logo-usd', color: '#EA4335' },
    { name: 'Daily Calendar to Slack summary', desc: 'Push daily schedules directly to your team feeds.', category: 'Productivity', icon: 'calendar', color: COLORS.success },
    { name: 'CRM Hubspot Contact Sync', desc: 'Export leads collected via webhooks to Hubspot databases.', category: 'Sales', icon: 'people', color: COLORS.accent },
    { name: 'GitHub Alert to Jira Ticket', desc: 'Open a task upon critical repository issues.', category: 'Operations', icon: 'logo-github', color: COLORS.secondary },
  ];

  const handleCreateAI = () => {
    if (!prompt) {
      Alert.alert('Empty Prompt', 'Please describe what you want the AI Compiler to build.');
      return;
    }
    Alert.alert(
      'AI Compiling',
      'Our LLM agent is parsing blocks and setting up node connections. Ready to view in canvas.',
      [{ text: 'Open Canvas', onPress: () => navigation.navigate('WorkflowCanvas', { workflowId: 'new' }) }]
    );
  };

  const handleVoiceCommand = () => {
    Alert.alert(
      'Voice Command Active',
      'Listening for instructions... Describe trigger conditions and action loops now.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Mock Voice input recognized', onPress: () => setPrompt('Sync newly registered customers from Stripe to active Slack channel') }
      ]
    );
  };

  const filteredTemplates = templates.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quick Create</Text>
        <TouchableOpacity style={styles.voiceBtn} onPress={handleVoiceCommand}>
          <Ionicons name="mic" size={22} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Prompt bar */}
        <View style={styles.aiCard}>
          <Text style={styles.aiCardTitle}>✨ Describe flow to generate with AI</Text>
          <View style={styles.promptInputWrapper}>
            <TextInput
              style={styles.promptInput}
              placeholder="e.g. When a Stripe charge succeeds, send Slack notification..."
              placeholderTextColor={COLORS.textLight}
              value={prompt}
              onChangeText={setPrompt}
              multiline
            />
          </View>
          <TouchableOpacity style={styles.aiActionBtn} onPress={handleCreateAI}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.accent]}
              style={styles.aiGradient}
            >
              <Text style={styles.aiActionText}>Compile Workflow</Text>
              <Ionicons name="flash" size={14} color={COLORS.white} style={{ marginLeft: 4 }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Creation Option Grid */}
        <Text style={styles.sectionTitle}>Start Options</Text>
        <View style={styles.creationGrid}>
          {creationOptions.map((opt) => (
            <TouchableOpacity
              key={opt.title}
              style={styles.optionCard}
              onPress={() => navigation.navigate(opt.route, { workflowId: 'new' })}
            >
              <View style={[styles.optIconCircle, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
                <Ionicons name={opt.icon as any} size={22} color={opt.color} />
              </View>
              <Text style={styles.optTitle}>{opt.title}</Text>
              <Text style={styles.optDesc}>{opt.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories selector */}
        <Text style={styles.sectionTitle}>Browse Templates</Text>
        <View style={styles.categoryRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catBadge, selectedCategory === cat && styles.catBadgeActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Templates cards list */}
        {filteredTemplates.map((template, index) => (
          <TouchableOpacity
            key={index}
            style={styles.templateCard}
            onPress={() => navigation.navigate('WorkflowCanvas', { workflowId: 'new' })}
          >
            <View style={[styles.tempIconBg, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
              <Ionicons name={template.icon as any} size={20} color={template.color} />
            </View>
            <View style={styles.tempDetails}>
              <Text style={styles.tempName}>{template.name}</Text>
              <Text style={styles.tempDesc}>{template.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  voiceBtn: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  aiCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  aiCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 12,
  },
  promptInputWrapper: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    height: 80,
    marginBottom: 12,
  },
  promptInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 13,
    textAlignVertical: 'top',
  },
  aiActionBtn: {
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
  aiGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  aiActionText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  creationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionCard: {
    width: '48%',
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  optIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  optDesc: {
    fontSize: 10,
    color: COLORS.textLight,
    lineHeight: 14,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  catBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catBadgeActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  catText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  catTextActive: {
    color: COLORS.white,
  },
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 10,
  },
  tempIconBg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tempDetails: {
    flex: 1,
    marginRight: 8,
  },
  tempName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  tempDesc: {
    fontSize: 10,
    color: COLORS.textLight,
    lineHeight: 14,
  },
});
