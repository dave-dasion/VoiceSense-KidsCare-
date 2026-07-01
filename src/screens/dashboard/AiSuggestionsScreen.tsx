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

interface Suggestion {
  id: string;
  title: string;
  type: string;
  scoreImpact: string;
  desc: string;
  applied: boolean;
}

export default function AiSuggestionsScreen({ navigation }: any) {
  const [chatText, setChatText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your FlowPilot AI assistant. Tell me what integrations or automations you would like to construct today, or ask me to optimize your current workspace.' },
  ]);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: 's-1',
      title: 'Merge duplicate Slack actions',
      type: 'Optimization',
      scoreImpact: '+4 Points',
      desc: 'You have two consecutive Slack post actions in "Stripe Alerts" pipeline. We suggest combining them to reduce rate limit exceptions.',
      applied: false,
    },
    {
      id: 's-2',
      title: 'Add retry block to CRM sync node',
      type: 'Error Handling',
      scoreImpact: '+8 Points',
      desc: 'Hubspot CRM exports frequently timeout. Adding a retry loop (3 attempts, 5s delay) will prevent pipeline failure.',
      applied: false,
    },
    {
      id: 's-3',
      title: 'Configure webhook API debouncing',
      type: 'Performance',
      scoreImpact: '+3 Points',
      desc: 'Your stock webhook receives high-frequency updates. Turn on debouncing (500ms delay) to avoid server resource exhaustion.',
      applied: false,
    },
  ]);

  const handleApplySuggestion = (id: string, title: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, applied: true } : s))
    );
    Alert.alert('Suggestion Applied', `"${title}" has been successfully compiled into your active workflow canvas.`);
  };

  const handleIgnore = (id: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSendMessage = () => {
    if (!chatText.trim()) return;
    const userMsg = { sender: 'user', text: chatText };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatText('');

    setTimeout(() => {
      let replyText = "I've analyzed your request. I recommend adding a Webhook trigger coupled with a JSON Parser block. Shall I generate this flow in your canvas?";
      if (chatText.toLowerCase().includes('optimize')) {
        replyText = "Optimizing workspace... I suggest adding a retry policy on your HTTP Request node to handle network timeouts.";
      }
      setChatMessages((prev) => [...prev, { sender: 'ai', text: replyText }]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Copilot Assistant</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Score Radial Box */}
        <View style={styles.scoreCard}>
          <LinearGradient
            colors={['rgba(214, 158, 46, 0.15)', 'rgba(59, 130, 246, 0.05)']}
            style={styles.scoreGradient}
          >
            <View style={styles.scoreRow}>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreNum}>88</Text>
                <Text style={styles.scoreLabel}>Health</Text>
              </View>
              <View style={styles.scoreDetails}>
                <Text style={styles.scoreTitle}>Workflow Health Rating</Text>
                <Text style={styles.scoreDesc}>
                  Your automation workspace is in great shape. Apply recommendations below to achieve 100% optimization.
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Suggestion list */}
        <Text style={styles.sectionTitle}>Recommendations</Text>
        {suggestions.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="checkmark-done-circle-outline" size={24} color={COLORS.success} />
            <Text style={styles.emptyCardText}>All optimization tasks are up to date.</Text>
          </View>
        ) : (
          suggestions.map((item) => (
            <View key={item.id} style={styles.sugCard}>
              <View style={styles.sugHeader}>
                <View style={styles.sugBadge}>
                  <Text style={styles.sugBadgeText}>{item.type}</Text>
                </View>
                <Text style={styles.impactText}>{item.scoreImpact}</Text>
              </View>
              <Text style={styles.sugTitle}>{item.title}</Text>
              <Text style={styles.sugDesc}>{item.desc}</Text>
              
              {/* Action row */}
              <View style={styles.sugActions}>
                {item.applied ? (
                  <View style={styles.appliedBadge}>
                    <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
                    <Text style={styles.appliedText}>Applied</Text>
                  </View>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.applyBtn}
                      onPress={() => handleApplySuggestion(item.id, item.title)}
                    >
                      <Text style={styles.applyBtnText}>Apply Suggestion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ignoreBtn} onPress={() => handleIgnore(item.id)}>
                      <Text style={styles.ignoreBtnText}>Ignore</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          ))
        )}

        {/* AI Copilot chat terminal widget */}
        <Text style={styles.sectionTitle}>AI Chat Copilot</Text>
        <View style={styles.chatCard}>
          <View style={styles.chatTerminal}>
            {chatMessages.map((msg, i) => (
              <View
                key={i}
                style={[
                  styles.msgBubble,
                  msg.sender === 'ai' ? styles.aiBubble : styles.userBubble,
                ]}
              >
                <Text style={styles.msgText}>{msg.text}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.chatInputRow}>
            <TextInput
              style={styles.chatInput}
              placeholder="Ask AI to design or modify loops..."
              placeholderTextColor={COLORS.textLight}
              value={chatText}
              onChangeText={setChatText}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
              <Ionicons name="paper-plane" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  scoreCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(214, 158, 46, 0.25)',
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.light,
  },
  scoreGradient: {
    padding: 16,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0F172A',
    borderWidth: 3,
    borderColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scoreNum: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.white,
  },
  scoreLabel: {
    fontSize: 9,
    color: COLORS.textLight,
  },
  scoreDetails: {
    flex: 1,
  },
  scoreTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  scoreDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sugCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  sugHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sugBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sugBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.success,
  },
  sugTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  sugDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
    marginBottom: 12,
  },
  sugActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 10,
  },
  applyBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  applyBtnText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  ignoreBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  ignoreBtnText: {
    color: COLORS.textLight,
    fontSize: 11,
    fontWeight: '700',
  },
  appliedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appliedText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.success,
    marginLeft: 4,
  },
  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },
  emptyCardText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  chatCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  chatTerminal: {
    height: 180,
    backgroundColor: '#0F172A',
    padding: 12,
  },
  msgBubble: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
    maxWidth: '85%',
  },
  aiBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  userBubble: {
    backgroundColor: COLORS.secondary,
    alignSelf: 'flex-end',
  },
  msgText: {
    color: COLORS.white,
    fontSize: 12,
    lineHeight: 16,
  },
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  chatInput: {
    flex: 1,
    height: 38,
    color: COLORS.white,
    fontSize: 12,
    paddingHorizontal: 8,
  },
  sendBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
});
