import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Dimensions,
  Animated,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function DashboardHomeScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState('Acme Ops');
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const stats = [
    { title: 'Total Workflows', count: '28', change: '+4 this week', icon: 'git-network', color: COLORS.secondary },
    { title: 'Running Executions', count: '3', change: 'Active now', icon: 'play-circle', color: COLORS.success },
    { title: 'Failed Executions', count: '1', change: 'Requires attention', icon: 'alert-circle', color: COLORS.danger },
    { title: 'Connected Apps', count: '14', change: 'OAuth ok', icon: 'apps', color: COLORS.accent },
  ];

  const quickActions = [
    { title: 'Create Flow', icon: 'add-circle-outline', route: 'QuickCreate', color: COLORS.secondary },
    { title: 'Live Runs', icon: 'pulse-outline', route: 'RunningWorkflows', color: COLORS.success },
    { title: 'Failures', icon: 'bug-outline', route: 'FailedWorkflows', color: COLORS.danger },
    { title: 'AI Suggestions', icon: 'sparkles-outline', route: 'AiSuggestions', color: '#D69E2E' },
    { title: 'Usage Summary', icon: 'analytics-outline', route: 'UsageSummary', color: COLORS.info },
    { title: 'Activity Timeline', icon: 'time-outline', route: 'ActivityFeed', color: COLORS.white },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Floating AI Assistant Trigger */}
      <TouchableOpacity
        style={styles.floatingAiButton}
        onPress={() => navigation.navigate('AiSuggestions')}
      >
        <LinearGradient
          colors={[COLORS.secondary, COLORS.accent]}
          style={styles.floatingAiGradient}
        >
          <Ionicons name="sparkles" size={24} color={COLORS.white} />
        </LinearGradient>
      </TouchableOpacity>

      {/* Header bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <TouchableOpacity
            style={styles.workspaceSelector}
            onPress={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
          >
            <Text style={styles.workspaceName}>{activeWorkspace}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.secondary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* Notifications & Settings Buttons */}
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => navigation.navigate('ActivityFeed')}
          >
            <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
            <View style={styles.badgeDot} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerIconBtn, { marginLeft: 12 }]}
            onPress={() => navigation.navigate('AuthSettings')}
          >
            <Ionicons name="settings-outline" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Workspace Menu Overlay */}
      {showWorkspaceMenu && (
        <View style={styles.workspaceMenu}>
          {['Acme Ops', 'Personal Sandbox', 'Production Lab'].map((ws) => (
            <TouchableOpacity
              key={ws}
              style={styles.workspaceMenuItem}
              onPress={() => {
                setActiveWorkspace(ws);
                setShowWorkspaceMenu(false);
              }}
            >
              <Ionicons
                name="briefcase-outline"
                size={16}
                color={activeWorkspace === ws ? COLORS.secondary : COLORS.textLight}
              />
              <Text style={[styles.menuItemText, activeWorkspace === ws && styles.menuItemActiveText]}>
                {ws}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.createWsMenuItem}
            onPress={() => {
              setShowWorkspaceMenu(false);
              navigation.navigate('CreateWorkspace');
            }}
          >
            <Ionicons name="add" size={16} color={COLORS.white} />
            <Text style={styles.createWsMenuText}>Create New Workspace</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Scroll Contents */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.secondary} />}
      >
        {/* Search Bar shortcut */}
        <TouchableOpacity style={styles.searchShortcut} onPress={() => navigation.navigate('RecentWorkflows')}>
          <Ionicons name="search-outline" size={18} color={COLORS.textLight} style={{ marginRight: 8 }} />
          <Text style={styles.searchShortcutText}>Search workflows and pipelines...</Text>
        </TouchableOpacity>

        {/* AI Insight banner */}
        <LinearGradient
          colors={['rgba(59, 130, 246, 0.15)', 'rgba(147, 51, 234, 0.05)']}
          style={styles.aiBanner}
        >
          <View style={styles.aiBannerHeader}>
            <View style={styles.aiBannerTitleGroup}>
              <Ionicons name="sparkles" size={18} color="#D69E2E" style={{ marginRight: 6 }} />
              <Text style={styles.aiBannerTitle}>AI Copilot Suggestion</Text>
            </View>
            <Text style={styles.aiScore}>Health Score: 94%</Text>
          </View>
          <Text style={styles.aiBannerText}>
            Stripe charge workflow is experiencing minor delays in step 2. We recommend updating API timeouts.
          </Text>
          <TouchableOpacity style={styles.aiBannerAction} onPress={() => navigation.navigate('AiSuggestions')}>
            <Text style={styles.aiBannerActionText}>Apply Fixes</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.secondary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </LinearGradient>

        {/* KPI Grid */}
        <Text style={styles.sectionTitle}>Workspace Metrics</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <TouchableOpacity
              key={i}
              style={styles.statCard}
              onPress={() =>
                stat.title.includes('Fail')
                  ? navigation.navigate('FailedWorkflows')
                  : stat.title.includes('Run')
                  ? navigation.navigate('RunningWorkflows')
                  : navigation.navigate('RecentWorkflows')
              }
            >
              <View style={styles.statCardHeader}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                <Text style={styles.statCardChange}>{stat.change}</Text>
              </View>
              <Text style={styles.statCount}>{stat.count}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions Grid */}
        <Text style={styles.sectionTitle}>Control Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, i) => (
            <TouchableOpacity
              key={i}
              style={styles.actionItem}
              onPress={() => navigation.navigate(action.route)}
            >
              <View style={[styles.actionIconBg, { borderColor: 'rgba(255, 255, 255, 0.05)' }]}>
                <Ionicons name={action.icon as any} size={24} color={action.color} />
              </View>
              <Text style={styles.actionTitle} numberOfLines={1}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Workflows widget */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Pipelines</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RecentWorkflows')}>
            <Text style={styles.sectionLink}>View All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.recentWfItem}
          onPress={() => navigation.navigate('WorkflowCanvas', { workflowId: 'wf-1' })}
        >
          <View style={styles.recentWfDetails}>
            <View style={styles.recentWfIconBg}>
              <Ionicons name="git-network-outline" size={20} color={COLORS.secondary} />
            </View>
            <View>
              <Text style={styles.recentWfName}>Slack Notify on Stripe Charge</Text>
              <Text style={styles.recentWfStatus}>Active • 142 runs • 99% success</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
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
  floatingAiButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    zIndex: 999,
    ...SHADOWS.glow,
  },
  floatingAiGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
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
  welcomeText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  workspaceSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  workspaceName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
  },
  workspaceMenu: {
    position: 'absolute',
    top: 64,
    left: 16,
    width: 200,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
    zIndex: 100,
    ...SHADOWS.medium,
  },
  workspaceMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  menuItemText: {
    color: COLORS.textLight,
    fontSize: 13,
    marginLeft: 8,
    fontWeight: '600',
  },
  menuItemActiveText: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
  createWsMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  createWsMenuText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  searchShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 20,
  },
  searchShortcutText: {
    color: COLORS.textLight,
    fontSize: 13,
  },
  aiBanner: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    padding: 16,
    marginBottom: 24,
  },
  aiBannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiBannerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiBannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
  aiScore: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.success,
  },
  aiBannerText: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 12,
  },
  aiBannerAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiBannerActionText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
  sectionLink: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: (width - 44) / 2,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCardChange: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  statCount: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  actionItem: {
    width: (width - 32) / 3,
    alignItems: 'center',
    marginVertical: 12,
  },
  actionIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    ...SHADOWS.light,
  },
  actionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
  },
  recentWfItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    ...SHADOWS.light,
  },
  recentWfDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentWfIconBg: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentWfName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  recentWfStatus: {
    fontSize: 10,
    color: COLORS.textLight,
  },
});
