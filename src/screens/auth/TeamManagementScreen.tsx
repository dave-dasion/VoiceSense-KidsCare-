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

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Viewer';
  status: 'Active' | 'Pending';
}

export default function TeamManagementScreen({ navigation }: any) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Member' | 'Viewer'>('Member');
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Dave Dasion', email: 'dave@flowpilot.ai', role: 'Owner', status: 'Active' },
    { id: '2', name: 'Alice Smith', email: 'alice@flowpilot.ai', role: 'Admin', status: 'Active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@flowpilot.ai', role: 'Member', status: 'Active' },
    { id: '4', name: 'Carol Danvers', email: 'carol@flowpilot.ai', role: 'Viewer', status: 'Pending' },
  ]);

  const handleSendInvite = () => {
    if (!inviteEmail) {
      Alert.alert('Validation Error', 'Please input an email address to invite.');
      return;
    }
    const newMember: Member = {
      id: String(Date.now()),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole as any,
      status: 'Pending',
    };
    setMembers([newMember, ...members]);
    setInviteEmail('');
    Alert.alert('Invitation Dispatched', `A workspace invitation link has been dispatched to ${inviteEmail}.`);
  };

  const handleRemoveMember = (id: string, name: string) => {
    Alert.alert('Remove Member', `Are you sure you want to revoke ${name}'s workspace access token?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Revoke Access',
        style: 'destructive',
        onPress: () => {
          setMembers((prev) => prev.filter((m) => m.id !== id));
          Alert.alert('Access Revoked', `${name} is no longer in this workspace.`);
        }
      }
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
        <Text style={styles.headerTitle}>Team Management</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Send Invitation Form */}
        <Text style={styles.sectionTitle}>Invite Team Members</Text>
        <View style={styles.inviteCard}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.inputField}
              value={inviteEmail}
              onChangeText={setInviteEmail}
              placeholder="e.g. colleague@company.com"
              placeholderTextColor={COLORS.textLight}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Default Access Role</Text>
            <View style={styles.roleGrid}>
              {(['Admin', 'Member', 'Viewer'] as const).map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.roleBadge, inviteRole === r && styles.roleBadgeActive]}
                  onPress={() => setInviteRole(r)}
                >
                  <Text style={[styles.roleText, inviteRole === r && styles.roleTextActive]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.inviteBtn} onPress={handleSendInvite}>
            <Text style={styles.inviteBtnText}>Send Workspace Invite</Text>
          </TouchableOpacity>
        </View>

        {/* Member Directory */}
        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Workspace Directory ({members.length})</Text>
        {members.map((m) => (
          <View key={m.id} style={styles.memberRow}>
            <View style={styles.memberInfo}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>
                  {m.name ? m.name.substring(0, 2).toUpperCase() : 'U'}
                </Text>
              </View>
              <View>
                <Text style={styles.memberName}>{m.name}</Text>
                <Text style={styles.memberEmail}>{m.email}</Text>
              </View>
            </View>

            <View style={styles.memberActions}>
              <View style={[styles.statusTag, m.status === 'Pending' && styles.statusTagPending]}>
                <Text style={[styles.statusTagText, m.status === 'Pending' && styles.statusTagTextPending]}>
                  {m.role.toUpperCase()}
                </Text>
              </View>
              {m.role !== 'Owner' && (
                <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemoveMember(m.id, m.name)}>
                  <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
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
  inviteCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  inputField: {
    height: 44,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.white,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  roleGrid: {
    flexDirection: 'row',
  },
  roleBadge: {
    flex: 1,
    height: 36,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  roleBadgeActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  roleTextActive: {
    color: COLORS.white,
  },
  inviteBtn: {
    height: 44,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  inviteBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 8,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  memberAvatarText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  memberName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  memberEmail: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  memberActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTag: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 8,
  },
  statusTagPending: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  statusTagText: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.success,
  },
  statusTagTextPending: {
    color: COLORS.danger,
  },
  removeBtn: {
    padding: 4,
  },
});
