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

export default function DatabaseTriggerScreen({ navigation }: any) {
  const [dbName, setDbName] = useState('Acme PG SQL (PostgreSQL)');
  const [table, setTable] = useState('orders');
  const [eventType, setEventType] = useState<'INSERT' | 'UPDATE' | 'DELETE'>('INSERT');
  const [pollingInterval, setPollingInterval] = useState('30'); // seconds

  const handleTestConnection = () => {
    Alert.alert('Testing Database Connection', 'Establishing connection to PostgreSQL server...', [
      {
        text: 'OK',
        onPress: () => {
          Alert.alert('Connection Success', 'Successfully validated credentials.\n\nTable "orders" matches schema.\nPrimary key "id" detected.');
        }
      }
    ]);
  };

  const handleSave = () => {
    Alert.alert('Database Trigger Connected', 'Listener query started on table.', [
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
        <Text style={styles.headerTitle}>Database Events</Text>
        <TouchableOpacity style={styles.testBtn} onPress={handleTestConnection}>
          <Text style={styles.testBtnText}>Test Connection</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Connected DB accounts dropdown */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>PostgreSQL Connection Target</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => Alert.alert('Connected DBs', 'MySQL, PostgreSQL, MongoDB, Firebase')}
          >
            <Text style={styles.dropdownText}>{dbName}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* Database table selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Database Table / Collection Name</Text>
          <TextInput
            style={styles.inputField}
            value={table}
            onChangeText={setTable}
            placeholder="e.g. orders, user_profile"
            placeholderTextColor={COLORS.textLight}
            autoCapitalize="none"
          />
        </View>

        {/* Table Trigger Events */}
        <Text style={styles.sectionTitle}>Listen Event Type</Text>
        <View style={styles.methodsRow}>
          {(['INSERT', 'UPDATE', 'DELETE'] as const).map((event) => (
            <TouchableOpacity
              key={event}
              style={[styles.methodBtn, eventType === event && styles.methodBtnActive]}
              onPress={() => setEventType(event)}
            >
              <Text style={[styles.methodText, eventType === event && styles.methodTextActive]}>
                {event}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Polling interval */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Polling Query Frequency (seconds)</Text>
          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.inputField, { width: 80, textAlign: 'center' }]}
              value={pollingInterval}
              onChangeText={setPollingInterval}
              keyboardType="numeric"
            />
            <Text style={styles.unitText}>Every {pollingInterval} seconds</Text>
          </View>
          <Text style={styles.helperText}>
            Higher frequencies query database tables more often, increasing consumption run limits.
          </Text>
        </View>

        {/* DB Connection Preview Logs */}
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Detected Fields Schema</Text>
          <Text style={styles.previewText}>- id: INT (Primary Key)</Text>
          <Text style={styles.previewText}>- total_price: NUMERIC</Text>
          <Text style={styles.previewText}>- customer_email: VARCHAR</Text>
          <Text style={styles.previewText}>- created_at: TIMESTAMP</Text>
        </View>

        {/* Save Connection */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Connect Database Trigger</Text>
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
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 48,
    paddingHorizontal: 12,
  },
  dropdownText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
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
  rowInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitText: {
    fontSize: 13,
    color: COLORS.white,
    marginLeft: 12,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 6,
  },
  previewCard: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
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
