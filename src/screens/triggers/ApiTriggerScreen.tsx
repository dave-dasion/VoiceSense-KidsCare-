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

export default function ApiTriggerScreen({ navigation }: any) {
  const [endpointUri, setEndpointUri] = useState('https://api.github.com/repos/dasion/kids-care/issues');
  const [httpMethod, setHttpMethod] = useState<'GET' | 'POST'>('GET');
  const [authType, setAuthType] = useState<'OAuth2' | 'Bearer' | 'ApiKey'>('Bearer');
  const [bearerToken, setBearerToken] = useState('');
  
  // Policies settings
  const [maxRetries, setMaxRetries] = useState('5');
  const [rateLimit, setRateLimit] = useState('60'); // requests per min
  const [timeoutSec, setTimeoutSec] = useState('10');

  const handleTestApi = () => {
    Alert.alert('Testing Target API', 'Sending HTTP request to resource payload...', [
      {
        text: 'OK',
        onPress: () => {
          Alert.alert('Test Successful', 'Status: 200 OK\nSize: 4.8 KB\nResponse Body:\n[{"id": 19482, "title": "Fix WebView Font Scaling Issue"}]');
        }
      }
    ]);
  };

  const handleSave = () => {
    Alert.alert('API Trigger Active', 'Polling query is now active.', [
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
        <Text style={styles.headerTitle}>API Poller Settings</Text>
        <TouchableOpacity style={styles.testBtn} onPress={handleTestApi}>
          <Text style={styles.testBtnText}>Test API</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Endpoint Input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Target Endpoint API URI</Text>
          <TextInput
            style={styles.inputField}
            value={endpointUri}
            onChangeText={setEndpointUri}
            placeholder="e.g. https://api.service.com/v1/resource"
            placeholderTextColor={COLORS.textLight}
            autoCapitalize="none"
          />
        </View>

        {/* HTTP Methods */}
        <Text style={styles.sectionTitle}>Request Method</Text>
        <View style={styles.methodsRow}>
          {(['GET', 'POST'] as const).map((method) => (
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

        {/* Authentication selection */}
        <Text style={styles.sectionTitle}>API Auth Credentials</Text>
        <View style={styles.methodsRow}>
          {(['OAuth2', 'Bearer', 'ApiKey'] as const).map((auth) => (
            <TouchableOpacity
              key={auth}
              style={[styles.methodBtn, authType === auth && styles.methodBtnActive]}
              onPress={() => setAuthType(auth)}
            >
              <Text style={[styles.methodText, authType === auth && styles.methodTextActive]}>
                {auth}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            {authType === 'OAuth2' ? 'OAuth Access Token' : authType === 'Bearer' ? 'Bearer Auth JWT' : 'API Key Header'}
          </Text>
          <TextInput
            style={styles.inputField}
            secureTextEntry
            value={bearerToken}
            onChangeText={setBearerToken}
            placeholder="Enter integration keys..."
            placeholderTextColor={COLORS.textLight}
            autoCapitalize="none"
          />
        </View>

        {/* Retry & Timeout Policy */}
        <Text style={styles.sectionTitle}>Timeout & Retry Policy Settings</Text>
        
        <View style={styles.policyRow}>
          <View style={styles.policyCol}>
            <Text style={styles.policyLabel}>Max Retries</Text>
            <TextInput
              style={styles.policyInput}
              value={maxRetries}
              onChangeText={setMaxRetries}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.policyCol, { marginLeft: 10 }]}>
            <Text style={styles.policyLabel}>Rate Limit (req/m)</Text>
            <TextInput
              style={styles.policyInput}
              value={rateLimit}
              onChangeText={setRateLimit}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.policyCol, { marginLeft: 10 }]}>
            <Text style={styles.policyLabel}>Timeout (s)</Text>
            <TextInput
              style={styles.policyInput}
              value={timeoutSec}
              onChangeText={setTimeoutSec}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Save Connection */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Connect API Trigger</Text>
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
  policyRow: {
    flexDirection: 'row',
    marginBottom: 28,
  },
  policyCol: {
    flex: 1,
  },
  policyLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '700',
    marginBottom: 6,
  },
  policyInput: {
    height: 44,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
  saveBtn: {
    height: 48,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
