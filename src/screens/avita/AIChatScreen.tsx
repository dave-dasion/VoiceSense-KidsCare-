import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { INITIAL_CHAT_HISTORY, ChatMessage, SUGGESTED_PROMPTS } from './mockAvitaData';

export default function AIChatScreen({ navigation }: any) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_HISTORY);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    
    // Auto Scroll to Bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate AI Coaching response
    setIsTyping(true);
    setTimeout(() => {
      let avitaReply = "That's an interesting question! As your coach, I recommend studying the clinical modules or checking the Learning Helper for detailed checklists.";

      // Tailored responses for suggested prompts
      if (text.toLowerCase().includes('dementia') || text.toLowerCase().includes('redirect')) {
        avitaReply = "Redirecting a dementia patient should always start with validating their current feeling. Avoid arguing with their statement. Instead, validate their reality, then gently transition to a new activity.";
      } else if (text.toLowerCase().includes('transfers') || text.toLowerCase().includes('mobility')) {
        avitaReply = "For patient transfers: Always lock the wheelchair brakes, set feet flat at shoulder-width, keep your back straight, and grab the patient's transfer belt close to their center of gravity.";
      } else if (text.toLowerCase().includes('hygiene') || text.toLowerCase().includes('bath')) {
        avitaReply = "When bedbathing: Ensure patient privacy, keep towels warm, wash from clean areas to dirty areas, pat dry carefully, and apply moisturizer to protect the skin barrier.";
      } else if (text.toLowerCase().includes('xp') || text.toLowerCase().includes('badge')) {
        avitaReply = "To earn the Grandmaster XP badge: Complete active courses, pass final chapter quizzes with a score >90%, and submit all practical care checklists.";
      }

      const avitaMsg: ChatMessage = {
        id: `msg_avita_${Date.now()}`,
        sender: 'avita',
        text: avitaReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, avitaMsg]);
      setIsTyping(false);
      
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Avita AI Tutor</Text>
          <Text style={styles.headerStatus}>Active Coaching Session</Text>
        </View>
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => setMessages(INITIAL_CHAT_HISTORY)}
        >
          <Text style={styles.clearText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 4 : 0}
      >
        {/* Messages Feed */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messageFeed}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => {
            const isAvita = msg.sender === 'avita';
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  isAvita ? styles.rowLeft : styles.rowRight
                ]}
              >
                {isAvita && (
                  <View style={styles.avatarBubble}>
                    <Text style={{ fontSize: 13 }}>🤖</Text>
                  </View>
                )}
                
                <View style={[
                  styles.messageBubble,
                  isAvita ? styles.bubbleAvita : styles.bubbleUser
                ]}>
                  <Text style={[
                    styles.messageText,
                    isAvita ? styles.textAvita : styles.textUser
                  ]}>
                    {msg.text}
                  </Text>
                  <Text style={[
                    styles.timestampText,
                    isAvita ? styles.timeAvita : styles.timeUser
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
                <Text style={{ fontSize: 13 }}>🤖</Text>
              </View>
              <View style={[styles.messageBubble, styles.bubbleAvita, styles.typingBubble]}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={styles.typingText}>Avita is writing...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Suggestion Pills */}
        <View style={styles.suggestionContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
            {SUGGESTED_PROMPTS.map((prompt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionPill}
                onPress={() => sendMessage(prompt)}
              >
                <Text style={styles.suggestionText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask Avita a question..."
            placeholderTextColor={COLORS.textLight}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => sendMessage(inputText)}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={() => sendMessage(inputText)}
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
  headerStatus: {
    fontSize: 10.5,
    color: COLORS.success,
    fontWeight: '600',
  },
  clearBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  clearText: {
    fontSize: 12.5,
    color: COLORS.textLight,
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
  bubbleAvita: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bubbleUser: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  textAvita: {
    color: COLORS.textDark,
  },
  textUser: {
    color: COLORS.white,
  },
  timestampText: {
    fontSize: 8,
    marginTop: 4,
    textAlign: 'right',
  },
  timeAvita: {
    color: COLORS.textLight,
  },
  timeUser: {
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
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendBtnDisabled: {
    backgroundColor: '#CBD5E0',
  },
});
