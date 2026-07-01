import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useAuth, User } from '../../context/AuthContext';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { getInitials, getAvatarStyle } from '../../utils/avatar';

export default function UserListScreen({ navigation }: any) {
  const { users, toggleUserStatus, deleteUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (userId: string, userName: string, currentStatus: string) => {
    const actionText = currentStatus === 'Active' ? 'Deactivate' : 'Activate';
    Alert.alert(
      `${actionText} Account`,
      `Are you sure you want to ${actionText.toLowerCase()} the account of ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            await toggleUserStatus(userId);
          },
        },
      ]
    );
  };

  const handleDelete = (userId: string, userName: string) => {
    Alert.alert(
      'Delete Account',
      `This action cannot be undone. Are you sure you want to permanently delete the account of ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteUser(userId);
            if (success) {
              Alert.alert('Deleted', `${userName}'s account has been deleted.`);
            }
          },
        },
      ]
    );
  };

  const renderUserItem = ({ item }: { item: User }) => {
    const itemAvatarStyle = getAvatarStyle(item.name);
    return (
      <View style={styles.userCard}>
        {/* User Info Row */}
        <View style={styles.userInfoRow}>
          <View style={[styles.avatarCircle, { backgroundColor: itemAvatarStyle.bg, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ fontSize: 14, fontWeight: '800', color: itemAvatarStyle.text, fontFamily: FONTS.bold }}>
              {getInitials(item.name)}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badgeRow}>
          <View
            style={[
              styles.badge,
              item.role === 'Administrator'
                ? styles.adminBadge
                : item.role === 'Instructor'
                ? styles.instructorBadge
                : styles.learnerBadge,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                item.role === 'Administrator'
                  ? styles.adminText
                  : item.role === 'Instructor'
                  ? styles.instructorText
                  : styles.learnerText,
              ]}
            >
              {item.role}
            </Text>
          </View>

          <View
            style={[
              styles.badge,
              item.status === 'Active'
                ? styles.activeBadge
                : item.status === 'Pending'
                ? styles.pendingBadge
                : styles.inactiveBadge,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                item.status === 'Active'
                  ? styles.activeText
                  : item.status === 'Pending'
                  ? styles.pendingText
                  : styles.inactiveText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        {/* Action Controls */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.editBtn]}
            onPress={() => navigation.navigate('UserRoleManagement', { userId: item.id })}
          >
            <View style={styles.actionBtnContent}>
              <Ionicons name="create-outline" size={14} color={COLORS.textDark} style={styles.actionIcon} />
              <Text style={styles.editBtnText}>Edit Role</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionBtn,
              item.status === 'Active' ? styles.blockBtn : styles.unblockBtn,
            ]}
            onPress={() => handleToggleStatus(item.id, item.name, item.status)}
          >
            <View style={styles.actionBtnContent}>
              <Ionicons
                name={item.status === 'Active' ? 'lock-closed-outline' : 'lock-open-outline'}
                size={14}
                color={item.status === 'Active' ? COLORS.danger : COLORS.success}
                style={styles.actionIcon}
              />
              <Text style={item.status === 'Active' ? styles.blockBtnText : styles.unblockBtnText}>
                {item.status === 'Active' ? 'Block' : 'Unblock'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteBtn]}
            onPress={() => handleDelete(item.id, item.name)}
          >
            <View style={styles.actionBtnContent}>
              <Ionicons name="trash-outline" size={14} color={COLORS.danger} style={styles.actionIcon} />
              <Text style={styles.deleteBtnText}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const showBackButton = navigation.canGoBack();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => showBackButton ? navigation.goBack() : navigation.openDrawer()} 
          style={styles.backButton}
        >
          <Ionicons name={showBackButton ? "arrow-back" : "menu"} size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Directory</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={18} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Search users by name or email..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* FlatList */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users matched your search criteria.</Text>
          </View>
        }
      />
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
    color: COLORS.secondary,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: COLORS.textDark,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  userCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  adminBadge: {
    backgroundColor: COLORS.accentLight,
  },
  adminText: {
    color: COLORS.accent,
  },
  instructorBadge: {
    backgroundColor: '#FAF5FF',
  },
  instructorText: {
    color: COLORS.practice,
  },
  learnerBadge: {
    backgroundColor: '#EBF8FF',
  },
  learnerText: {
    color: COLORS.learn,
  },
  activeBadge: {
    backgroundColor: '#E6FFFA',
  },
  activeText: {
    color: COLORS.success,
  },
  pendingBadge: {
    backgroundColor: '#FEFCBF',
  },
  pendingText: {
    color: COLORS.succeed,
  },
  inactiveBadge: {
    backgroundColor: '#FFF5F5',
  },
  inactiveText: {
    color: COLORS.danger,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    marginRight: 4,
  },
  editBtn: {
    backgroundColor: '#F1F5F9',
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  blockBtn: {
    backgroundColor: '#FFF5F5',
  },
  blockBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.danger,
  },
  unblockBtn: {
    backgroundColor: '#E6FFFA',
  },
  unblockBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.success,
  },
  deleteBtn: {
    backgroundColor: '#FFF5F5',
  },
  deleteBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.danger,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: 14,
  },
});
