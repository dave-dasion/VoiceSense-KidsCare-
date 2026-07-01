import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface Workflow {
  id: string;
  name: string;
  appIcons: string[];
  status: 'Active' | 'Paused' | 'Draft' | 'Failed';
  lastModified: string;
  runs: number;
  isPinned: boolean;
  isFavorite: boolean;
}

export default function RecentWorkflowsScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: 'wf-1',
      name: 'Slack Notify on Stripe Charge',
      appIcons: ['logo-usd', 'chatbubbles'],
      status: 'Active',
      lastModified: '2 hours ago',
      runs: 142,
      isPinned: true,
      isFavorite: true,
    },
    {
      id: 'wf-2',
      name: 'Google Sheets CRM Sync',
      appIcons: ['grid', 'people'],
      status: 'Active',
      lastModified: '1 day ago',
      runs: 45,
      isPinned: true,
      isFavorite: false,
    },
    {
      id: 'wf-3',
      name: 'OpenAI Lead auto-enricher',
      appIcons: ['sparkles', 'mail'],
      status: 'Draft',
      lastModified: '3 days ago',
      runs: 0,
      isPinned: false,
      isFavorite: true,
    },
    {
      id: 'wf-4',
      name: 'Shopify Stock Sync Webhook',
      appIcons: ['cart', 'sync'],
      status: 'Failed',
      lastModified: '5 hours ago',
      runs: 304,
      isPinned: false,
      isFavorite: false,
    },
    {
      id: 'wf-5',
      name: 'GitHub PR Automated reviewer',
      appIcons: ['logo-github', 'chatbox'],
      status: 'Paused',
      lastModified: '1 week ago',
      runs: 12,
      isPinned: false,
      isFavorite: false,
    },
  ]);

  const handleFavorite = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, isFavorite: !wf.isFavorite } : wf))
    );
  };

  const handlePin = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, isPinned: !wf.isPinned } : wf))
    );
  };

  const handleExecute = (wfName: string) => {
    Alert.alert('Execute Workflow', `Trigger execution run for "${wfName}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Execute Now', onPress: () => Alert.alert('Execution Started', 'The workflow execution was queued successfully.') },
    ]);
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

  const handleClone = (wf: Workflow) => {
    const clonedWf: Workflow = {
      ...wf,
      id: `wf-${Date.now()}`,
      name: `${wf.name} (Copy)`,
      isPinned: false,
      isFavorite: false,
    };
    setWorkflows([clonedWf, ...workflows]);
    Alert.alert('Workflow Cloned', `"${wf.name}" has been duplicated.`);
  };

  const filteredWorkflows = workflows
    .filter((wf) => wf.name.toLowerCase().includes(search.toLowerCase()))
    .filter((wf) => filterStatus === 'All' || wf.status === filterStatus)
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  const getStatusColor = (status: Workflow['status']) => {
    switch (status) {
      case 'Active':
        return COLORS.success;
      case 'Paused':
        return COLORS.warning;
      case 'Draft':
        return COLORS.secondary;
      case 'Failed':
        return COLORS.danger;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recent Workflows</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('QuickCreate')}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Main Container */}
      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search active pipelines..."
            placeholderTextColor={COLORS.textLight}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filter Badges */}
        <View style={styles.filterRow}>
          {['All', 'Active', 'Paused', 'Draft', 'Failed'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.filterBadge, filterStatus === status && styles.filterBadgeActive]}
              onPress={() => setFilterStatus(status)}
            >
              <Text style={[styles.filterText, filterStatus === status && styles.filterTextActive]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List of Workflows */}
        <FlatList
          data={filteredWorkflows}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.wfCard}>
              <View style={styles.wfMainRow}>
                {/* Apps Icon chain */}
                <View style={styles.chainWrapper}>
                  {item.appIcons.map((icon, index) => (
                    <View key={index} style={[styles.iconDot, { marginLeft: index > 0 ? -10 : 0 }]}>
                      <Ionicons name={icon as any} size={15} color={COLORS.white} />
                    </View>
                  ))}
                </View>

                {/* Info details */}
                <View style={styles.wfDetails}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {item.isPinned && (
                      <Ionicons name="pin" size={12} color={COLORS.secondary} style={{ marginRight: 4 }} />
                    )}
                    <Text style={styles.wfName} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                  <Text style={styles.wfMeta}>
                    Modified {item.lastModified} • {item.runs} runs
                  </Text>
                </View>

                {/* Favorite & Options */}
                <View style={styles.actionBtnCol}>
                  <TouchableOpacity onPress={() => handleFavorite(item.id)}>
                    <Ionicons
                      name={item.isFavorite ? 'star' : 'star-outline'}
                      size={18}
                      color={item.isFavorite ? '#D69E2E' : COLORS.textLight}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedWorkflow(selectedWorkflow?.id === item.id ? null : item)}
                    style={{ marginTop: 12 }}
                  >
                    <Ionicons name="ellipsis-vertical" size={16} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Status footer strip */}
              <View style={styles.cardFooter}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                  <Text style={[styles.statusLabel, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
                
                {/* Inline Quick trigger actions */}
                <View style={styles.inlineControls}>
                  <TouchableOpacity
                    style={styles.controlBtn}
                    onPress={() => navigation.navigate('WorkflowCanvas', { workflowId: item.id })}
                  >
                    <Ionicons name="create-outline" size={14} color={COLORS.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlBtn, { marginLeft: 8 }]}
                    onPress={() => handleExecute(item.name)}
                  >
                    <Ionicons name="play-outline" size={14} color={COLORS.success} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Toggle Menu Sheet Drawer Drawer */}
              {selectedWorkflow?.id === item.id && (
                <View style={styles.drawerMenu}>
                  <TouchableOpacity style={styles.drawerItem} onPress={() => handlePin(item.id)}>
                    <Ionicons name="pin-outline" size={16} color={COLORS.white} />
                    <Text style={styles.drawerText}>{item.isPinned ? 'Unpin Workflow' : 'Pin to Top'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerItem} onPress={() => handleClone(item)}>
                    <Ionicons name="copy-outline" size={16} color={COLORS.white} />
                    <Text style={styles.drawerText}>Duplicate Pipeline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => handleDelete(item.id, item.name)}
                  >
                    <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
                    <Text style={[styles.drawerText, { color: COLORS.danger }]}>Delete Pipeline</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
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
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  addBtn: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchWrapper: {
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
  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterBadgeActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  filterText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  filterTextActive: {
    color: COLORS.white,
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
  wfMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  iconDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wfDetails: {
    flex: 1,
  },
  wfName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  wfMeta: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  actionBtnCol: {
    alignItems: 'center',
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
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '800',
  },
  inlineControls: {
    flexDirection: 'row',
  },
  controlBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
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
});
