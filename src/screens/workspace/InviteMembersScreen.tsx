import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Invitation {
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

export default function InviteMembersScreen({ navigation }: any) {
  const [emailInput, setEmailInput] = useState('');
  const [roleSelection, setRoleSelection] = useState<'Admin' | 'Editor' | 'Viewer'>('Editor');
  const [invites, setInvites] = useState<Invitation[]>([]);

  const handleAddInvite = () => {
    if (!emailInput) {
      Alert.alert('Validation Error', 'Please enter an email address.');
      return;
    }
    // simple check
    if (!emailInput.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    setInvites([...invites, { email: emailInput.trim(), role: roleSelection }]);
    setEmailInput('');
  };

  const handleRemoveInvite = (index: number) => {
    setInvites((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendInvites = () => {
    if (invites.length === 0) {
      Alert.alert('No Invites Added', 'Would you like to proceed without inviting team members now?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Proceed', onPress: () => navigation.navigate('ChooseSubscription') },
      ]);
      return;
    }

    Alert.alert(
      'Invitations Dispatched',
      `Sent ${invites.length} invite email(s) successfully. Collaborators will receive notification details.`,
      [{ text: 'Continue', onPress: () => navigation.navigate('ChooseSubscription') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Invite Collaborators</Text>
          <Text style={styles.subtitle}>Add team members to your automated workflows. Grant precise editor or viewer roles.</Text>
        </View>

        {/* Input Form */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="collaborator@company.com"
              placeholderTextColor={COLORS.textLight}
              value={emailInput}
              onChangeText={setEmailInput}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.addBtn} onPress={handleAddInvite}>
              <Ionicons name="add" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Role selector */}
          <Text style={styles.label}>Workspace Role</Text>
          <View style={styles.rolesRow}>
            {(['Admin', 'Editor', 'Viewer'] as const).map((role) => (
              <TouchableOpacity
                key={role}
                style={[styles.roleBtn, roleSelection === role && styles.roleBtnActive]}
                onPress={() => setRoleSelection(role)}
              >
                <Text style={[styles.roleText, roleSelection === role && styles.roleTextActive]}>{role}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pending Invites List */}
        {invites.length > 0 && (
          <View style={styles.listContainer}>
            <Text style={styles.sectionTitle}>Pending Invitations ({invites.length})</Text>
            {invites.map((item, index) => (
              <View key={index} style={styles.inviteItem}>
                <View style={styles.inviteInfo}>
                  <Text style={styles.inviteEmail}>{item.email}</Text>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleBadgeText}>{item.role}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleRemoveInvite(index)} style={styles.removeBtn}>
                  <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* CTA Controls */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSendInvites}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.submitBtnText}>
                {invites.length > 0 ? `Send ${invites.length} Invite(s)` : 'Skip & Continue'}
              </Text>
              <Ionicons name="paper-plane-outline" size={18} color={COLORS.white} style={{ marginLeft: 6 }} />
            </LinearGradient>
          </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
    fontFamily: FONTS.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  formContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    height: 52,
    paddingLeft: 16,
    paddingRight: 6,
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.white,
    fontSize: 15,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rolesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleBtn: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  roleBtnActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  roleText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: '700',
  },
  roleTextActive: {
    color: COLORS.white,
  },
  listContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  inviteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 8,
  },
  inviteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteEmail: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
    marginRight: 10,
  },
  roleBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  roleBadgeText: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: '800',
  },
  removeBtn: {
    padding: 4,
  },
  actionsContainer: {
    marginTop: 10,
  },
  submitBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  gradientButton: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
