import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface ParamField {
  id: string;
  name: string;
  type: 'Text' | 'Boolean' | 'Number';
}

export default function ManualTriggerScreen({ navigation }: any) {
  const [triggerName, setTriggerName] = useState('Manual Slack Post Button');
  const [requireConfirmation, setRequireConfirmation] = useState(true);
  const [paramFields, setParamFields] = useState<ParamField[]>([
    { id: '1', name: 'custom_message', type: 'Text' },
    { id: '2', name: 'alert_admin', type: 'Boolean' },
  ]);

  const handleAddParam = () => {
    const newParam: ParamField = {
      id: String(Date.now()),
      name: `param_${paramFields.length + 1}`,
      type: 'Text',
    };
    setParamFields([...paramFields, newParam]);
  };

  const handleDeleteParam = (id: string) => {
    setParamFields(paramFields.filter((p) => p.id !== id));
  };

  const handleSimulateExecution = () => {
    if (requireConfirmation) {
      Alert.alert(
        'Confirm Run',
        'Are you sure you want to manually run this workflow?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Run Now',
            onPress: () => {
              Alert.alert('Workflow Triggered', 'Workflow successfully fired. Run ID: run_man_9148');
            },
          },
        ]
      );
    } else {
      Alert.alert('Workflow Triggered', 'Workflow successfully fired. Run ID: run_man_9148');
    }
  };

  const handleSave = () => {
    Alert.alert('Manual Trigger Saved', 'Manual entry point details updated.', [
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
        <Text style={styles.headerTitle}>Manual Button Trigger</Text>
        <TouchableOpacity style={styles.testBtn} onPress={handleSimulateExecution}>
          <Text style={styles.testBtnText}>Simulate</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Trigger Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Button Widget Label</Text>
          <TextInput
            style={styles.inputField}
            value={triggerName}
            onChangeText={setTriggerName}
            placeholder="e.g. Fired from webhook widget"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Require confirmation switch */}
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>Require Confirmation Alert</Text>
            <Text style={styles.switchSub}>Show modal prompt before execution begins.</Text>
          </View>
          <Switch
            value={requireConfirmation}
            onValueChange={setRequireConfirmation}
            trackColor={{ true: COLORS.secondary }}
          />
        </View>

        {/* Inputs Fields Parameters */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Input Arguments Parameters</Text>
          <TouchableOpacity style={styles.addParamBtn} onPress={handleAddParam}>
            <Ionicons name="add" size={14} color={COLORS.secondary} />
            <Text style={styles.addParamText}>Add Param</Text>
          </TouchableOpacity>
        </View>

        {paramFields.map((param, index) => (
          <View key={param.id} style={styles.paramCard}>
            <View style={{ flex: 1 }}>
              <TextInput
                style={styles.paramNameInput}
                value={param.name}
                onChangeText={(val) => {
                  setParamFields(
                    paramFields.map((p) => (p.id === param.id ? { ...p, name: val } : p))
                  );
                }}
                placeholder="Parameter Name"
                placeholderTextColor={COLORS.textLight}
                autoCapitalize="none"
              />
              <Text style={styles.paramTypeText}>Type: {param.type}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteParam(param.id)} style={styles.deleteParamBtn}>
              <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Save Connection */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Connect Manual Trigger</Text>
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 24,
  },
  switchTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  switchSub: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addParamBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addParamText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    marginLeft: 4,
  },
  paramCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 10,
  },
  paramNameInput: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  paramTypeText: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  deleteParamBtn: {
    padding: 6,
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
