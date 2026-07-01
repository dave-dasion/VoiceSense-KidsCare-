import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getInitials, getAvatarStyle } from '../../utils/avatar';

const AVATARS = ['👨‍💼', '👩‍🎓', '👨‍🏫', '🧑‍💻', '👨‍🚀', '👩‍🎤', '🦁', '🌟', '🍀', '🦊'];

export default function UserProfileScreen({ navigation }: any) {
  const { user, updateProfile, logout, isLoading } = useAuth();
  const avatarStyle = getAvatarStyle(user?.name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '🧑‍🎓');

  if (!user) return null;

  const handleSave = async () => {
    if (!name || !email) {
      alert('Please fill in all fields.');
      return;
    }
    const success = await updateProfile(name, email, avatar);
    if (success) {
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setName(user.name);
    setEmail(user.email);
    setAvatar(user.avatar);
    setIsEditing(false);
  };

  const showBackButton = navigation.canGoBack();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => showBackButton ? navigation.goBack() : navigation.openDrawer()} 
            style={styles.backButton}
          >
            <Ionicons name={showBackButton ? "arrow-back" : "menu"} size={24} color={COLORS.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>User Profile</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={[styles.avatarContainer, { backgroundColor: avatarStyle.bg, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: avatarStyle.text, fontFamily: FONTS.bold }}>
              {getInitials(isEditing ? name : user.name)}
            </Text>
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>

          <View style={styles.badgeRow}>
            <View style={[styles.badge, styles.roleBadge]}>
              <Text style={styles.roleBadgeText}>{user.role}</Text>
            </View>
            <View style={[styles.badge, styles.statusBadge]}>
              <Text style={styles.statusBadgeText}>{user.status}</Text>
            </View>
          </View>
        </View>

        {/* Editor Form */}
        <View style={styles.formCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Profile Details</Text>
            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text style={styles.editLink}>Edit Info</Text>
              </TouchableOpacity>
            )}
          </View>

          {isEditing ? (
            <View>
              {/* Avatar Picker */}
              <Text style={styles.inputLabel}>Choose Avatar Emoji</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarList}>
                {AVATARS.map((av) => (
                  <TouchableOpacity
                    key={av}
                    style={[
                      styles.avatarPickBtn,
                      avatar === av && styles.avatarPickBtnSelected,
                    ]}
                    onPress={() => setAvatar(av)}
                  >
                    <Text style={styles.avatarPickEmoji}>{av}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.editActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveButton, { opacity: isLoading ? 0.7 : 1 }]}
                  onPress={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color={COLORS.white} size="small" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save Details</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.detailsList}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Joined Date</Text>
                <Text style={styles.detailVal}>{user.joinedDate}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>User Reference ID</Text>
                <Text style={styles.detailVal}>#TF-{user.id.padStart(4, '0')}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Navigation / Actions List */}
        <View style={styles.actionsCard}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <View style={styles.actionIconBg}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.secondary} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Change Password</Text>
              <Text style={styles.actionSub}>Update your login credentials securely</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
          </TouchableOpacity>

          {user.role === 'Administrator' && (
            <TouchableOpacity
              style={[styles.actionItem, { borderTopWidth: 1, borderTopColor: '#F1F5F9' }]}
              onPress={() => navigation.navigate('UserList')}
            >
              <View style={[styles.actionIconBg, { backgroundColor: '#FAF5FF' }]}>
                <Ionicons name="people-outline" size={20} color={COLORS.practice} />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Admin User Directory</Text>
                <Text style={styles.actionSub}>Manage roles, credentials & authorization</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} style={{ marginRight: 8 }} />
          <Text style={styles.logoutButtonText}>Log Out Account</Text>
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
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...SHADOWS.light,
    borderWidth: 4,
    borderColor: '#F1F5F9',
  },
  avatarEmoji: {
    fontSize: 48,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  roleBadge: {
    backgroundColor: COLORS.accentLight,
  },
  roleBadgeText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  statusBadge: {
    backgroundColor: '#E6FFFA',
  },
  statusBadgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: COLORS.white,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.light,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  editLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  avatarList: {
    marginBottom: 16,
  },
  avatarPickBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  avatarPickBtnSelected: {
    borderColor: COLORS.secondary,
    backgroundColor: '#EBF8FF',
    ...SHADOWS.light,
  },
  avatarPickEmoji: {
    fontSize: 22,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: 10,
  },
  cancelButtonText: {
    color: COLORS.textLight,
    fontWeight: '700',
    fontSize: 14,
  },
  saveButton: {
    flex: 2,
    height: 46,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  detailsList: {
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  detailVal: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  actionsCard: {
    backgroundColor: COLORS.white,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 8,
    ...SHADOWS.light,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  actionSub: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  actionArrow: {
    fontSize: 18,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 32,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.danger,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoutButtonText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: '700',
  },
});
