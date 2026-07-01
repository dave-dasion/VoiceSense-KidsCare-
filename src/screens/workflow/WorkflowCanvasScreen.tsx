import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Marker } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface WorkflowNode {
  id: string;
  type: 'Trigger' | 'Action';
  icon: string;
  title: string;
  app: string;
  status?: 'success' | 'running' | 'idle' | 'failed';
  configSummary: string;
}

export default function WorkflowCanvasScreen({ route, navigation }: any) {
  const { workflowId } = route.params || { workflowId: 'new' };
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'node-1',
      type: 'Trigger',
      icon: 'flash-outline',
      title: 'New Charge in Stripe',
      app: 'Stripe',
      status: 'success',
      configSummary: 'Mode: Test, Account: Dasion Dev',
    },
    {
      id: 'node-2',
      type: 'Action',
      icon: 'chatbubbles-outline',
      title: 'Send Slack Notification',
      app: 'Slack',
      status: 'success',
      configSummary: 'Channel: #sales-alerts',
    },
    {
      id: 'node-3',
      type: 'Action',
      icon: 'mail-outline',
      title: 'Send Customer Thank You',
      app: 'SMTP Email',
      status: 'idle',
      configSummary: 'Recipient: {{customer.email}}',
    },
  ]);

  const [activeNode, setActiveNode] = useState<string | null>(null);

  const runWorkflow = () => {
    // Basic execution simulation
    setNodes((prev) =>
      prev.map((node) => ({
        ...node,
        status: node.id === 'node-3' ? 'success' : node.status,
      }))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.titleInfo}>
          <Text style={styles.headerTitle}>
            {workflowId === 'new' ? 'Untitled Workflow' : 'Slack Notify on Stripe Charge'}
          </Text>
          <Text style={styles.headerSub}>Draft • Last saved 10m ago</Text>
        </View>
        <TouchableOpacity style={styles.runButton} onPress={runWorkflow}>
          <Ionicons name="play" size={16} color={COLORS.white} />
          <Text style={styles.runButtonText}>Run Test</Text>
        </TouchableOpacity>
      </View>

      {/* Visual Canvas Area */}
      <ScrollView contentContainerStyle={styles.canvasScroll} style={styles.canvasContainer}>
        {/* Connection Wires SVG Layer */}
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <Svg width={width} height={500}>
            {/* Connection from Node 1 to Node 2 */}
            <Path
              d={`M ${width / 2} 110 C ${width / 2} 150, ${width / 2} 160, ${width / 2} 190`}
              stroke={COLORS.secondary}
              strokeWidth="2"
              fill="none"
            />
            {/* Connection from Node 2 to Node 3 */}
            <Path
              d={`M ${width / 2} 290 C ${width / 2} 330, ${width / 2} 340, ${width / 2} 370`}
              stroke={COLORS.border}
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
            />
          </Svg>
        </View>

        {/* Node list cards */}
        {nodes.map((node, index) => {
          const isSelected = activeNode === node.id;
          const statusIcon =
            node.status === 'success'
              ? 'checkmark-circle'
              : node.status === 'running'
              ? 'sync-circle'
              : 'ellipse-outline';
          const statusColor =
            node.status === 'success'
              ? COLORS.success
              : node.status === 'running'
              ? COLORS.secondary
              : COLORS.textLight;

          return (
            <React.Fragment key={node.id}>
              <TouchableOpacity
                style={[styles.nodeCard, isSelected && styles.selectedNodeCard]}
                onPress={() => setActiveNode(isSelected ? null : node.id)}
              >
                <View style={styles.nodeHeader}>
                  <View style={styles.nodeBadge}>
                    <Text style={styles.nodeBadgeText}>{node.type.toUpperCase()}</Text>
                  </View>
                  <Ionicons name={statusIcon as any} size={16} color={statusColor} />
                </View>
                <View style={styles.nodeContent}>
                  <View style={styles.iconWrapper}>
                    <Ionicons name={node.icon as any} size={20} color={COLORS.primary} />
                  </View>
                  <View style={styles.nodeInfo}>
                    <Text style={styles.nodeTitle}>{node.title}</Text>
                    <Text style={styles.nodeApp}>{node.app}</Text>
                    <Text style={styles.nodeMeta}>{node.configSummary}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Action Node Splitter Add Button */}
              {index < nodes.length - 1 && (
                <View style={styles.adderWrapper}>
                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              )}
            </React.Fragment>
          );
        })}
      </ScrollView>

      {/* Floating Node Config Panel (Simulated Bottom Settings Sheet) */}
      {activeNode && (
        <View style={styles.configSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Configure Connection</Text>
            <TouchableOpacity onPress={() => setActiveNode(null)}>
              <Ionicons name="close" size={20} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>
          <View style={styles.sheetBody}>
            <Text style={styles.fieldLabel}>Webhook URL Endpoint</Text>
            <View style={styles.dummyInput}>
              <Text style={styles.dummyInputText} numberOfLines={1}>
                https://nodeapi.activepieces.com/webhooks/trigger/{workflowId}
              </Text>
            </View>
            <TouchableOpacity style={styles.saveSheetButton} onPress={() => setActiveNode(null)}>
              <Text style={styles.saveSheetButtonText}>Apply Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  backButton: {
    padding: 4,
  },
  titleInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  headerSub: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  runButton: {
    backgroundColor: COLORS.success,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    ...SHADOWS.light,
  },
  runButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 13,
    marginLeft: 4,
  },
  canvasContainer: {
    flex: 1,
  },
  canvasScroll: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 100,
  },
  nodeCard: {
    width: width * 0.85,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    ...SHADOWS.light,
    zIndex: 10,
  },
  selectedNodeCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  nodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nodeBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  nodeBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  nodeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  nodeInfo: {
    flex: 1,
  },
  nodeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  nodeApp: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '600',
    marginTop: 1,
  },
  nodeMeta: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 4,
  },
  adderWrapper: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  configSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    ...SHADOWS.dark,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  sheetBody: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 6,
  },
  dummyInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 16,
  },
  dummyInputText: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  saveSheetButton: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveSheetButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
});
