import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { INITIAL_SALES_CHAT, SalesChatMessage } from './mockSalesPracticeData';

const SUGGESTED_SALES_PITCHES = [
  'Ask about patient medical history',
  'Pitch our premium RN safety coordinator tier',
  'Offer a free face-to-face family meeting',
  'Address the budget concern with payment terms',
];

export default function MockSalesConversationScreen({ navigation }: any) {
  const [messages, setMessages] = useState<SalesChatMessage[]>(INITIAL_SALES_CHAT);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [score, setScore] = useState(50); // Live performance score (0-100)
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: SalesChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'agent',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Dynamic sales performance score update
    let scoreDelta = 5;
    if (text.toLowerCase().includes('rn') || text.toLowerCase().includes('safety')) {
      scoreDelta = 15;
    } else if (text.toLowerCase().includes('meeting') || text.toLowerCase().includes('free')) {
      scoreDelta = 10;
    } else if (text.toLowerCase().includes('discount') || text.toLowerCase().includes('cheap')) {
      scoreDelta = -10; // Penalize premature discounting!
    }
    setScore((prev) => Math.min(Math.max(prev + scoreDelta, 0), 100));

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    setIsTyping(true);
    setTimeout(() => {
      let clientReply = "We want to make sure the caregiver has experience with mobility support, as dad uses a walker.";

      if (text.toLowerCase().includes('rn') || text.toLowerCase().includes('safety')) {
        clientReply = "Oh, having a registered nurse review the logs is reassuring. That definitely makes the price difference worth it.";
      } else if (text.toLowerCase().includes('meeting') || text.toLowerCase().includes('free')) {
        clientReply = "A face-to-face meet and greet would be wonderful. Can we schedule that for this Saturday?";
      } else if (text.toLowerCase().includes('discount') || text.toLowerCase().includes('budget')) {
        clientReply = "I appreciate you looking at payment terms, but I want to make sure we don't compromise on caregiver quality.";
      }

      const clientMsg: SalesChatMessage = {
        id: `client_${Date.now()}`,
        sender: 'client',
        text: clientReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, clientMsg]);
      setIsTyping(false);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1200);
  };

  const handleFinishRoleplay = () => {
    Alert.alert(
      'Roleplay Complete! 🎊',
      `Your closing scorecard: ${score}/100. Let's view the performance details.`,
      [
        {
          text: 'View Feedback',
          onPress: () => navigation.navigate('SalesPerformanceFeedback'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Sales Call Simulator</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreText}>AI Rapport: </Text>
            <Text style={[styles.scoreValue, { color: score > 70 ? COLORS.success : COLORS.danger }]}>
              {score}%
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.finishBtn} onPress={handleFinishRoleplay}>
          <Text style={styles.finishText}>Finish</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Messages view */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messageFeed}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => {
            const isClient = msg.sender === 'client';
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  isClient ? styles.rowLeft : styles.rowRight
                ]}
              >
                {isClient && (
                  <View style={styles.avatarBubble}>
                    <Text style={{ fontSize: 13 }}>👤</Text>
                  </View>
                )}

                <View style={[
                  styles.messageBubble,
                  isClient ? styles.bubbleClient : styles.bubbleAgent
                ]}>
                  <Text style={[
                    styles.messageText,
                    isClient ? styles.textClient : styles.textAgent
                  ]}>
                    {msg.text}
                  </Text>
                  <Text style={[
                    styles.timestampText,
                    isClient ? styles.timeClient : styles.timeAgent
                  ]}>
                    {msg.timestamp}
                  </Text>
                </View>
              </View>
            );
          })}

          {isTyping && (
            <View style={[styles.messageRow, styles.rowLeft]}>
              <View style={styles.avatarBubble}>
                <Text style={{ fontSize: 13 }}>👤</Text>
              </View>
              <View style={[styles.messageBubble, styles.bubbleClient, styles.typingBubble]}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={styles.typingText}>Client is replying...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Suggestion Pills */}
        <View style={styles.suggestionContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
            {SUGGESTED_SALES_PITCHES.map((pitch, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionPill}
                onPress={() => handleSendMessage(pitch)}
              >
                <Text style={styles.suggestionText}>{pitch}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your sales response..."
            placeholderTextColor={COLORS.textLight}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => handleSendMessage(inputText)}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  scoreText: {
    fontSize: 10.5,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 10.5,
    fontWeight: '800',
  },
  finishBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  finishText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '700',
  },
  messageFeed: {
    padding: 16,
    paddingBottom: 24,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  rowLeft: {
    justifyContent: 'flex-start',
  },
  rowRight: {
    justifyContent: 'flex-end',
  },
  avatarBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    ...SHADOWS.light,
  },
  messageBubble: {
    maxWidth: '78%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...SHADOWS.light,
  },
  bubbleClient: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bubbleAgent: {
    backgroundColor: COLORS.secondary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  textClient: {
    color: COLORS.textDark,
  },
  textAgent: {
    color: COLORS.white,
  },
  timestampText: {
    fontSize: 8,
    marginTop: 4,
    textAlign: 'right',
  },
  timeClient: {
    color: COLORS.textLight,
  },
  timeAgent: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 8,
    fontWeight: '500',
  },
  suggestionContainer: {
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  suggestionPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  suggestionText: {
    fontSize: 11,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 13,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendBtnDisabled: {
    backgroundColor: '#CBD5E0',
  },
});
