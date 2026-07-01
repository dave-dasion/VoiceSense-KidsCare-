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

export default function EventTriggerScreen({ navigation }: any) {
  const [eventSource, setEventSource] = useState('Stripe Payment Gateway');
  const [eventType, setEventType] = useState('payment_intent.succeeded');
  
  const [eventLogs, setEventLogs] = useState([
    { id: '1', event: 'payment_intent.succeeded', idVal: 'evt_stripe_91402', status: 'processed', time: '5m ago' },
    { id: '2', event: 'payment_intent.succeeded', idVal: 'evt_stripe_91384', status: 'processed', time: '1h ago' },
  ]);

  const handleTestEvent = () => {
    Alert.alert('Testing Event Broker', 'Checking event log buffers for matching callbacks...', [
      {
        text: 'OK',
        onPress: () => {
          Alert.alert('Broker Connected', 'Successfully listening for "payment_intent.succeeded".\n\nActive broker nodes: 3 online.');
        }
      }
    ]);
  };

  const handleSave = () => {
    Alert.alert('Event Broker Active', 'Listener callback successfully established.', [
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
        <Text style={styles.headerTitle}>System Event Listener</Text>
        <TouchableOpacity style={styles.testBtn} onPress={handleTestEvent}>
          <Text style={styles.testBtnText}>Test Event</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Event source */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Integration Event Broker Source</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => Alert.alert('Event Sources', 'Stripe, Auth Server, File Storage, Calendar')}
          >
            <Text style={styles.dropdownText}>{eventSource}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* Event trigger details */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Event Type Callback Event</Text>
          <TextInput
            style={styles.inputField}
            value={eventType}
            onChangeText={setEventType}
            placeholder="e.g. user.created, payment.succeeded"
            placeholderTextColor={COLORS.textLight}
            autoCapitalize="none"
          />
        </View>

        {/* Event Logs list */}
        <Text style={styles.sectionTitle}>Event Broker Feed Logs</Text>
        {eventLogs.map((log) => (
          <View key={log.id} style={styles.logCard}>
            <View style={styles.logHeader}>
              <Text style={styles.logEventText}>{log.event}</Text>
              <Text style={styles.logTimeText}>{log.time}</Text>
            </View>
            <View style={styles.logMeta}>
              <Text style={styles.logIdText}>ID: {log.idVal}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>{log.status.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Save Connection */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Connect Event Trigger</Text>
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
  logCard: {
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
    marginBottom: 6,
  },
  logEventText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  logTimeText: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  logMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logIdText: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: COLORS.success,
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
