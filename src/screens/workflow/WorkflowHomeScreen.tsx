import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Paused' | 'Draft' | 'Failed';
  runsCount: number;
  successRate: string;
  lastUpdated: string;
}

export default function WorkflowHomeScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: 'wf-1',
      name: 'Slack Notify on Stripe Charge',
      description: 'Post a message in #sales channel whenever a Stripe payment is completed.',
      status: 'Active',
      runsCount: 142,
      successRate: '99.3%',
      lastUpdated: '2 hours ago',
    },
    {
      id: 'wf-2',
      name: 'Sync Google Sheets to Notion',
      description: 'Automatically export new rows from feedback sheet into Notion database.',
      status: 'Active',
      runsCount: 45,
      successRate: '100%',
      lastUpdated: '1 day ago',
    },
    {
      id: 'wf-3',
      name: 'AI Lead auto-enricher',
      description: 'Use OpenAI to read incoming email queries and tag leads in CRM.',
      status: 'Draft',
      runsCount: 0,
      successRate: '0%',
      lastUpdated: '3 days ago',
    },
    {
      id: 'wf-4',
      name: 'GitHub Commit webhook relay',
      description: 'Ping Discord webhook whenever a push occurs in repo.',
      status: 'Paused',
      runsCount: 1210,
      successRate: '95.8%',
      lastUpdated: '1 week ago',
    },
  ]);

  const filteredWorkflows = workflows.filter((wf) =>
    wf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Workflow['status']) => {
    switch (status) {
      case 'Active':
        return { bg: COLORS.successLight, text: COLORS.success, dot: COLORS.success };
      case 'Paused':
        return { bg: COLORS.warningLight, text: COLORS.warning, dot: COLORS.warning };
      case 'Draft':
        return { bg: COLORS.infoLight, text: COLORS.info, dot: COLORS.info };
      case 'Failed':
        return { bg: COLORS.dangerLight, text: COLORS.danger, dot: COLORS.danger };
    }
  };

  const renderWorkflowItem = ({ item }: { item: Workflow }) => {
    const statusColors = getStatusColor(item.status);
    return (
      <TouchableOpacity
        style={styles.wfCard}
        onPress={() => navigation.navigate('WorkflowCanvas', { workflowId: item.id })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.wfName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.wfDesc} numberOfLines={2}>{item.description}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColors.dot }]} />
            <Text style={[styles.statusText, { color: statusColors.text }]}>{item.status}</Text>
          </View>
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
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workflow Builder</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('WorkflowCanvas', { workflowId: 'new' })}
        >
          <Ionicons name="add" size={20} color={COLORS.white} />
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
            placeholder="Search workflows..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>Active Automations</Text>
        
        <FlatList
          data={filteredWorkflows}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkflowItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="git-network-outline" size={48} color={COLORS.textLight} />
              <Text style={styles.emptyTitle}>No workflows found</Text>
              <Text style={styles.emptySub}>Create your first AI automation sequence now.</Text>
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
    backgroundColor: COLORS.white,
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  createButton: {
    backgroundColor: COLORS.primary,
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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  wfCard: {
    backgroundColor: COLORS.white,
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
  wfName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  wfDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 12,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
