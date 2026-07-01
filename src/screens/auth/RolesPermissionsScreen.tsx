import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  Switch,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface PermissionRule {
  id: string;
  name: string;
  desc: string;
  enabled: boolean;
}

export default function RolesPermissionsScreen({ navigation }: any) {
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Member' | 'Viewer'>('Member');
  const [permissions, setPermissions] = useState<PermissionRule[]>([
    { id: 'p1', name: 'Create Workflows', desc: 'Allow user to draft and build canvas nodes.', enabled: true },
    { id: 'p2', name: 'Publish Workflows', desc: 'Deploy workflow triggers to production clusters.', enabled: false },
    { id: 'p3', name: 'Access Integration Vault', desc: 'Configure stripe/slack OAuth access tokens.', enabled: false },
    { id: 'p4', name: 'Manage Team Members', desc: 'Send invites and terminate user sessions.', enabled: false },
  ]);

  const handleTogglePermission = (id: string, value: boolean) => {
    setPermissions(permissions.map((p) => p.id === id ? { ...p, enabled: value } : p));
  };

  const handleSaveChanges = () => {
    Alert.alert('Permissions Updated', `Security rules for role "${selectedRole}" successfully saved.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Roles & Permissions</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Role Selector Tabs */}
        <Text style={styles.sectionTitle}>Select Access Role to Configure</Text>
        <View style={styles.tabsRow}>
          {(['Admin', 'Member', 'Viewer'] as const).map((role) => (
            <TouchableOpacity
              key={role}
              style={[styles.tabBtn, selectedRole === role && styles.tabBtnActive]}
              onPress={() => {
                setSelectedRole(role);
                // Mock toggle permissions based on preset roles
                if (role === 'Admin') {
                  setPermissions(permissions.map(p => ({ ...p, enabled: true })));
                } else if (role === 'Viewer') {
                  setPermissions(permissions.map(p => ({ ...p, enabled: false })));
                } else {
                  setPermissions([
                    { id: 'p1', name: 'Create Workflows', desc: 'Allow user to draft and build canvas nodes.', enabled: true },
                    { id: 'p2', name: 'Publish Workflows', desc: 'Deploy workflow triggers to production clusters.', enabled: false },
                    { id: 'p3', name: 'Access Integration Vault', desc: 'Configure stripe/slack OAuth access tokens.', enabled: false },
                    { id: 'p4', name: 'Manage Team Members', desc: 'Send invites and terminate user sessions.', enabled: false },
                  ]);
                }
              }}
            >
              <Text style={[styles.tabText, selectedRole === role && styles.tabTextActive]}>
                {role.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Roles Details Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.secondary} style={{ marginRight: 8 }} />
          <Text style={styles.infoText}>
            {selectedRole === 'Admin' && 'Administrators hold complete ownership access including system settings.'}
            {selectedRole === 'Member' && 'Members can design, debug and test workflows but cannot publish changes.'}
            {selectedRole === 'Viewer' && 'Viewers have read-only execution monitor capabilities.'}
          </Text>
        </View>

        {/* Permissions list toggle */}
        <Text style={styles.sectionTitle}>Permission Settings Matrix</Text>
        <View style={styles.matrixCard}>
          {permissions.map((p) => (
            <View key={p.id} style={styles.ruleRow}>
              <View style={styles.ruleInfo}>
                <Text style={styles.ruleName}>{p.name}</Text>
                <Text style={styles.ruleDesc}>{p.desc}</Text>
              </View>
              <Switch
                value={p.enabled}
                onValueChange={(val) => handleTogglePermission(p.id, val)}
                trackColor={{ true: COLORS.secondary }}
              />
            </View>
          ))}
        </View>

        {/* Save */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveChanges}>
          <Text style={styles.saveBtnText}>Save Role Configuration</Text>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: COLORS.secondary,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
  },
  matrixCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    marginBottom: 28,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  ruleInfo: {
    flex: 1,
    marginRight: 16,
  },
  ruleName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  ruleDesc: {
    fontSize: 10,
    color: COLORS.textLight,
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
