import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth, UserRole } from '../../context/AuthContext';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getInitials, getAvatarStyle } from '../../utils/avatar';

export default function UserRoleManagementScreen({ route, navigation }: any) {
  const { userId } = route.params;
  const { users, updateUserRole, isLoading } = useAuth();

  const targetUser = users.find((u) => u.id === userId);
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    targetUser?.role || 'Learner'
  );

  if (!targetUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>User not found.</Text>
      </SafeAreaView>
    );
  }

  const handleSaveRole = async () => {
    if (selectedRole === targetUser.role) {
      Alert.alert('No Change', 'The selected role is already assigned to this user.');
      return;
    }

    Alert.alert(
      'Modify User Role',
      `Are you sure you want to change ${targetUser.name}'s role from ${targetUser.role} to ${selectedRole}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            const success = await updateUserRole(userId, selectedRole);
            if (success) {
              Alert.alert('Role Updated', `${targetUser.name} is now an ${selectedRole}.`);
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  const roleDetails = {
    Learner: {
      emoji: '👩‍🎓',
      desc: 'Can participate in learning modules, take quizzes, complete certifications, and message AI Coach.',
      color: COLORS.learn,
      bgColor: '#EBF8FF',
    },
    Instructor: {
      emoji: '👨‍🏫',
      desc: 'Can generate learning contents, create practice quizzes, and view progress dashboards for assigned Learners.',
      color: COLORS.practice,
      bgColor: '#FAF5FF',
    },
    Administrator: {
      emoji: '👨‍💼',
      desc: 'Full access to the admin dashboard, user directories, role permissions, content settings, and analytics reports.',
      color: COLORS.accent,
      bgColor: '#FEFCBF',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="close" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Authorization</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={[styles.avatarCircle, { backgroundColor: getAvatarStyle(targetUser.name).bg, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: getAvatarStyle(targetUser.name).text, fontFamily: FONTS.bold }}>
              {getInitials(targetUser.name)}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{targetUser.name}</Text>
            <Text style={styles.userEmail}>{targetUser.email}</Text>
            <View style={[styles.badge, { backgroundColor: roleDetails[targetUser.role].bgColor }]}>
              <Text style={[styles.badgeText, { color: roleDetails[targetUser.role].color }]}>
                Current: {targetUser.role}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Assign New Permission Level</Text>

        {/* Role Cards List */}
        {(['Learner', 'Instructor', 'Administrator'] as UserRole[]).map((r) => {
          const detail = roleDetails[r];
          const isSelected = selectedRole === r;

          return (
            <TouchableOpacity
              key={r}
              style={[
                styles.roleCard,
                isSelected && { borderColor: detail.color, borderWidth: 2 },
              ]}
              onPress={() => setSelectedRole(r)}
              activeOpacity={0.8}
            >
              <View style={[styles.roleIconBg, { backgroundColor: detail.bgColor }]}>
                <Text style={styles.roleEmoji}>{detail.emoji}</Text>
              </View>
              <View style={styles.roleTextContainer}>
                <Text style={[styles.roleTitle, isSelected && { color: detail.color }]}>
                  {r}
                </Text>
                <Text style={styles.roleDesc}>{detail.desc}</Text>
              </View>
              <View style={styles.radioOutline}>
                {isSelected && <View style={[styles.radioDot, { backgroundColor: detail.color }]} />}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveRole} disabled={isLoading}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save Permissions</Text>
            )}
          </LinearGradient>
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
    color: COLORS.textLight,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  userCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    ...SHADOWS.light,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 2,
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  roleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...SHADOWS.light,
  },
  roleIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleEmoji: {
    fontSize: 22,
  },
  roleTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  roleDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 14,
    marginTop: 4,
  },
  radioOutline: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  saveButton: {
    height: 52,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
    ...SHADOWS.light,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: 40,
  },
});
