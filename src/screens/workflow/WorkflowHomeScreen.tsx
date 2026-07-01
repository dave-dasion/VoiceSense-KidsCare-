import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Paused' | 'Draft' | 'Archived';
  category: string;
  runsCount: number;
  successRate: string;
  lastUpdated: string;
  version: string;
  tags: string[];
}

export default function WorkflowHomeScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Draft' | 'Archived'>('All');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: 'wf-1',
      name: 'Slack Notify on Stripe Charge',
      description: 'Post a message in #sales channel whenever a Stripe payment is completed.',
      status: 'Active',
      category: 'Sales',
      runsCount: 142,
      successRate: '99.3%',
      lastUpdated: '2 hours ago',
      version: 'v1.4',
      tags: ['Stripe', 'Slack', 'Finance'],
    },
    {
      id: 'wf-2',
      name: 'Sync Google Sheets to Notion',
      description: 'Automatically export new rows from feedback sheet into Notion database.',
      status: 'Active',
      category: 'Productivity',
      runsCount: 45,
      successRate: '100%',
      lastUpdated: '1 day ago',
      version: 'v2.1',
      tags: ['Notion', 'Google', 'Sync'],
    },
    {
      id: 'wf-3',
      name: 'AI Lead auto-enricher',
      description: 'Use OpenAI to read incoming email queries and tag leads in CRM.',
      status: 'Draft',
      category: 'Marketing',
      runsCount: 0,
      successRate: '0%',
      lastUpdated: '3 days ago',
      version: 'v0.2',
      tags: ['AI', 'OpenAI', 'CRM'],
    },
    {
      id: 'wf-4',
      name: 'Old Zendesk ticket connector',
      description: 'Legacy ticket sync pipeline archived last month.',
      status: 'Archived',
      category: 'Customer Support',
      runsCount: 1204,
      successRate: '92.4%',
      lastUpdated: '4 weeks ago',
      version: 'v0.9',
      tags: ['Zendesk', 'Archived'],
    },
  ]);

  const handleDuplicate = (wf: Workflow) => {
    const duplicated: Workflow = {
      ...wf,
      id: `wf-${Date.now()}`,
      name: `${wf.name} (Copy)`,
      status: 'Draft',
      runsCount: 0,
      successRate: '0%',
      lastUpdated: 'Just now',
    };
    setWorkflows([duplicated, ...workflows]);
    setSelectedWorkflow(null);
    Alert.alert('Workflow Cloned', `"${wf.name}" has been duplicated.`);
  };

  const handleArchive = (id: string, name: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, status: 'Archived' } : wf))
    );
    setSelectedWorkflow(null);
    Alert.alert('Archived', `"${name}" has been archived.`);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Delete Workflow', `Are you sure you want to permanently delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setWorkflows((prev) => prev.filter((wf) => wf.id !== id));
          setSelectedWorkflow(null);
        },
      },
    ]);
  };

  const handleRename = (wf: Workflow) => {
    Alert.prompt('Rename Workflow', 'Enter a new name for your workflow:', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Save',
        onPress: (newName) => {
          if (newName) {
            setWorkflows((prev) =>
              prev.map((item) => (item.id === wf.id ? { ...item, name: newName } : item))
            );
            setSelectedWorkflow(null);
          }
        },
      },
    ], 'plain-text', wf.name);
  };

  const filteredWorkflows = workflows
    .filter((wf) => wf.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((wf) => activeTab === 'All' || wf.status === activeTab);

  const getStatusColor = (status: Workflow['status']) => {
    switch (status) {
      case 'Active':
        return { bg: 'rgba(16, 185, 129, 0.15)', text: COLORS.success, dot: COLORS.success };
      case 'Paused':
        return { bg: 'rgba(245, 158, 11, 0.15)', text: COLORS.warning, dot: COLORS.warning };
      case 'Draft':
        return { bg: 'rgba(59, 130, 246, 0.15)', text: COLORS.secondary, dot: COLORS.secondary };
      case 'Archived':
        return { bg: 'rgba(148, 163, 184, 0.15)', text: COLORS.textLight, dot: COLORS.textLight };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardHome')} style={styles.menuButton}>
          <Ionicons name="home-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FlowPilot Builder</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('QuickCreate')}
        >
          <Ionicons name="add" size={16} color={COLORS.white} />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search active workflows..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Tab Switcher Badges */}
        <View style={styles.tabRow}>
          {(['All', 'Active', 'Draft', 'Archived'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBadge, activeTab === tab && styles.tabBadgeActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredWorkflows}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const statusColors = getStatusColor(item.status);
            return (
              <View style={styles.wfCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.titleContainer}>
                    <View style={styles.nameRow}>
                      <Text style={styles.wfName} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.versionTag}>{item.version}</Text>
                    </View>
                    <Text style={styles.wfDesc} numberOfLines={2}>{item.description}</Text>
                  </View>
                  <View style={styles.headerRightActions}>
                    <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                      <View style={[styles.statusDot, { backgroundColor: statusColors.dot }]} />
                      <Text style={[styles.statusText, { color: statusColors.text }]}>{item.status}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setSelectedWorkflow(selectedWorkflow?.id === item.id ? null : item)}
                      style={styles.optionsBtn}
                    >
                      <Ionicons name="ellipsis-vertical" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Tags Row */}
                <View style={styles.tagsRow}>
                  {item.tags.map((tag) => (
                    <View key={tag} style={styles.tagBadge}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.statsContainer}>
                    <View style={styles.statGroup}>
                      <Ionicons name="play-outline" size={13} color={COLORS.textLight} />
                      <Text style={styles.statValue}> {item.runsCount} runs</Text>
                    </View>
                    <View style={[styles.statGroup, { marginLeft: 12 }]}>
                      <Ionicons name="trending-up-outline" size={13} color={COLORS.textLight} />
                      <Text style={styles.statValue}> {item.successRate} success</Text>
                    </View>
                  </View>
                  <Text style={styles.lastUpdatedText}>Updated {item.lastUpdated}</Text>
                </View>

                {/* Options Drawer menu */}
                {selectedWorkflow?.id === item.id && (
                  <View style={styles.drawerMenu}>
                    <TouchableOpacity
                      style={styles.drawerItem}
                      onPress={() => navigation.navigate('WorkflowCanvas', { workflowId: item.id })}
                    >
                      <Ionicons name="create-outline" size={16} color={COLORS.white} />
                      <Text style={styles.drawerText}>Open In Canvas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerItem} onPress={() => handleRename(item)}>
                      <Ionicons name="text-outline" size={16} color={COLORS.white} />
                      <Text style={styles.drawerText}>Rename Workflow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerItem} onPress={() => handleDuplicate(item)}>
                      <Ionicons name="copy-outline" size={16} color={COLORS.white} />
                      <Text style={styles.drawerText}>Duplicate Workflow</Text>
                    </TouchableOpacity>
                    {item.status !== 'Archived' && (
                      <TouchableOpacity style={styles.drawerItem} onPress={() => handleArchive(item.id, item.name)}>
                        <Ionicons name="archive-outline" size={16} color={COLORS.white} />
                        <Text style={styles.drawerText}>Archive Workflow</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.drawerItem} onPress={() => handleDelete(item.id, item.name)}>
                      <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
                      <Text style={[styles.drawerText, { color: COLORS.danger }]}>Delete Workflow</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="git-network-outline" size={48} color={COLORS.textLight} />
              <Text style={styles.emptyTitle}>No workflows found</Text>
              <Text style={styles.emptySub}>Create your first automated flow to start scaling operations.</Text>
            </View>
          }
        />
      </View>
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
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  createButton: {
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    ...SHADOWS.light,
  },
  createButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 13,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBadgeActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  listContent: {
    paddingBottom: 24,
  },
  wfCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  wfName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
    flexShrink: 1,
  },
  versionTag: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.secondary,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 6,
  },
  wfDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  optionsBtn: {
    paddingLeft: 10,
    paddingVertical: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tagBadge: {
    backgroundColor: '#0F172A',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    marginTop: 12,
    paddingTop: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  lastUpdatedText: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  drawerMenu: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  drawerText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '700',
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 12,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
