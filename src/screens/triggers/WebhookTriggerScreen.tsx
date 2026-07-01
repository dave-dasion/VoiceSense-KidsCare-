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
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function WebhookTriggerScreen({ navigation }: any) {
  const [webhookUrl, setWebhookUrl] = useState('https://nodeapi.flowpilot.ai/webhooks/dasion-stripe-callback');
  const [httpMethod, setHttpMethod] = useState<'POST' | 'GET' | 'PUT'>('POST');
  const [authType, setAuthType] = useState<'None' | 'Bearer' | 'ApiKey'>('None');
  const [apiKey, setApiKey] = useState('');
  
  const [payloadHistory, setPayloadHistory] = useState([
    { id: '1', time: '10m ago', status: 200, payload: '{"event": "payment.success", "amount": 2500}' },
    { id: '2', time: '1h ago', status: 200, payload: '{"event": "customer.created", "id": "cus_924"}' },
  ]);

  const handleCopyUrl = () => {
    Alert.alert('Copied', 'Webhook callback URL copied to clipboard.');
  };

  const handleRegenerateUrl = () => {
    Alert.alert('Regenerate URL', 'Are you sure? Existing endpoints will be permanently disabled.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Regenerate', onPress: () => {
          setWebhookUrl(`https://nodeapi.flowpilot.ai/webhooks/dasion-stripe-${Date.now()}`);
          Alert.alert('Generated New URL', 'The new callback webhook URL is ready.');
        } 
      }
    ]);
  };

  const handleSimulateCall = () => {
    Alert.alert('Simulate Request', 'Send test POST request payload to webhook endpoint?', [
      { text: 'Cancel' },
      {
        text: 'Send Test',
        onPress: () => {
          const newRequest = {
            id: String(Date.now()),
            time: 'Just now',
            status: 200,
            payload: '{"status": "test_delivered", "source": "simulator"}',
          };
          setPayloadHistory([newRequest, ...payloadHistory]);
          Alert.alert('Delivered', 'Mock payload parsed successfully. Status: 200 OK.');
        }
      }
    ]);
  };

  const handleSave = () => {
    Alert.alert('Trigger Connected', 'Webhook trigger configured successfully.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Webhook Settings</Text>
        <TouchableOpacity style={styles.testBtn} onPress={handleSimulateCall}>
          <Text style={styles.testBtnText}>Simulate</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Endpoint Display URL */}
        <View style={styles.urlCard}>
          <Text style={styles.urlLabel}>YOUR UNIQUE WEBHOOK CALLBACK ENDPOINT</Text>
          <View style={styles.urlBox}>
            <Text style={styles.urlText} numberOfLines={1}>{webhookUrl}</Text>
            <TouchableOpacity onPress={handleCopyUrl} style={styles.copyIcon}>
              <Ionicons name="copy-outline" size={16} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.urlActions}>
            <TouchableOpacity style={styles.urlActionBtn} onPress={handleCopyUrl}>
              <Ionicons name="copy" size={12} color={COLORS.white} style={{ marginRight: 4 }} />
              <Text style={styles.urlActionText}>Copy URL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.urlActionBtn, { marginLeft: 12 }]} onPress={handleRegenerateUrl}>
              <Ionicons name="refresh" size={12} color={COLORS.white} style={{ marginRight: 4 }} />
              <Text style={styles.urlActionText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HTTP Methods */}
        <Text style={styles.sectionTitle}>HTTP Listen Method</Text>
        <View style={styles.methodsRow}>
          {(['POST', 'GET', 'PUT'] as const).map((method) => (
            <TouchableOpacity
              key={method}
              style={[styles.methodBtn, httpMethod === method && styles.methodBtnActive]}
              onPress={() => setHttpMethod(method)}
            >
              <Text style={[styles.methodText, httpMethod === method && styles.methodTextActive]}>
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Security / Authentication */}
        <Text style={styles.sectionTitle}>Endpoint Security Protocol</Text>
        <View style={styles.methodsRow}>
          {(['None', 'Bearer', 'ApiKey'] as const).map((auth) => (
            <TouchableOpacity
              key={auth}
              style={[styles.methodBtn, authType === auth && styles.methodBtnActive]}
              onPress={() => setAuthType(auth)}
            >
              <Text style={[styles.methodText, authType === auth && styles.methodTextActive]}>
                {auth === 'None' ? 'PUBLIC' : auth === 'Bearer' ? 'BEARER' : 'API KEY'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {authType !== 'None' && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {authType === 'Bearer' ? 'Secret Bearer Token' : 'Header API Key Secret'}
            </Text>
            <TextInput
              style={styles.inputField}
              secureTextEntry
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="Paste security header credentials..."
              placeholderTextColor={COLORS.textLight}
            />
          </View>
        )}

        {/* Live Logs History */}
        <Text style={styles.sectionTitle}>Payload Trigger History</Text>
        {payloadHistory.map((item) => (
          <View key={item.id} style={styles.logItem}>
            <View style={styles.logHeader}>
              <View style={styles.logStatus}>
                <View style={styles.greenDot} />
                <Text style={styles.logStatusText}>{item.status} OK</Text>
              </View>
              <Text style={styles.logTime}>{item.time}</Text>
            </View>
            <Text style={styles.logPayload} numberOfLines={1}>{item.payload}</Text>
          </View>
        ))}

        {/* Save Connection */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Activate Webhook Trigger</Text>
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
  testBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.cardBg,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  testBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  urlCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  urlLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textLight,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  urlBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 48,
  },
  urlText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  copyIcon: {
    padding: 6,
  },
  urlActions: {
    flexDirection: 'row',
    marginTop: 12,
  },
  urlActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  urlActionText: {
    fontSize: 11,
    color: COLORS.white,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  methodsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  methodBtn: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  methodBtnActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  methodText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '800',
  },
  methodTextActive: {
    color: COLORS.white,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  inputField: {
    height: 48,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.white,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  logItem: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 8,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  logStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
    marginRight: 6,
  },
  logStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.success,
  },
  logTime: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  logPayload: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  saveBtn: {
    height: 48,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
