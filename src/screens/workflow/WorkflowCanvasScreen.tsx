import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
  Switch,
  TextInput,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Marker, Defs } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface WorkflowNode {
  id: string;
  type: 'Trigger' | 'Action' | 'AI Node' | 'Logic';
  icon: string;
  title: string;
  app: string;
  status: 'success' | 'running' | 'idle' | 'failed';
  configSummary: string;
  pathType?: 'success' | 'failure';
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
      configSummary: 'Account: Dasion Dev, Event: payment_intent.succeeded',
    },
    {
      id: 'node-2',
      type: 'Action',
      icon: 'chatbubbles-outline',
      title: 'Send Slack Notification',
      app: 'Slack',
      status: 'success',
      configSummary: 'Channel: #sales-alerts',
      pathType: 'success',
    },
    {
      id: 'node-3',
      type: 'AI Node',
      icon: 'sparkles-outline',
      title: 'AI Customer Classifier',
      app: 'FlowPilot LLM',
      status: 'idle',
      configSummary: 'Model: GPT-4o, Output: {{category}}',
      pathType: 'success',
    },
  ]);

  // Drawer / Bottom Sheet States
  const [activeSheet, setActiveSheet] = useState<'settings' | 'library' | 'validate' | 'version' | 'publish' | null>(null);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [scale, setScale] = useState(1.0);

  // Node Settings states
  const [continueOnFailure, setContinueOnFailure] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState('3');
  const [timeoutMs, setTimeoutMs] = useState('5000');

  // Node Library categories
  const libraryNodes = [
    { title: 'HTTP Request', type: 'Action', icon: 'globe-outline', color: COLORS.accent },
    { title: 'AI Chat Agent', type: 'AI Node', icon: 'sparkles-outline', color: '#D69E2E' },
    { title: 'If / Else Branch', type: 'Logic', icon: 'git-branch-outline', color: COLORS.secondary },
    { title: 'Send SMTP Email', type: 'Action', icon: 'mail-outline', color: COLORS.success },
  ];

  // Simulated Zoom Actions
  const handleZoom = (direction: 'in' | 'out') => {
    setScale((prev) => {
      const next = direction === 'in' ? prev + 0.1 : prev - 0.1;
      return Math.min(Math.max(next, 0.7), 1.3);
    });
  };

  // Run all nodes simulation
  const handleRunTest = () => {
    Alert.alert('Testing Workflow', 'Initializing test execution running across 3 nodes...', [
      {
        text: 'OK',
        onPress: () => {
          setNodes((prev) =>
            prev.map((node) => ({
              ...node,
              status: 'success',
            }))
          );
          Alert.alert('Test Success', 'All nodes executed with 0 errors.');
        },
      },
    ]);
  };

  // Add node handler
  const handleAddNodeFromLibrary = (libNode: typeof libraryNodes[0]) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: libNode.type as any,
      icon: libNode.icon,
      title: libNode.title,
      app: libNode.title,
      status: 'idle',
      configSummary: 'Click to configure inputs',
      pathType: 'success',
    };
    setNodes([...nodes, newNode]);
    setActiveSheet(null);
  };

  // Node Settings save
  const handleApplyNodeSettings = () => {
    if (selectedNode) {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === selectedNode.id
            ? { ...n, configSummary: `Timeout: ${timeoutMs}ms, Retries: ${retryAttempts}` }
            : n
        )
      );
    }
    setActiveSheet(null);
    Alert.alert('Saved', 'Node configurations updated.');
  };

  // Auto layout logic
  const handleAutoArrange = () => {
    Alert.alert('Auto Arrange', 'Aligning node coordinates to 80px snap-to-grid spacing.');
  };

  // Validation checker
  const handleValidation = () => {
    setActiveSheet('validate');
  };

  // Deploy Workflow Staging/Production options
  const handlePublish = (env: 'Staging' | 'Production') => {
    Alert.alert(
      'Deploy Workflow',
      `Deploy "Slack Notify on Stripe Charge" to ${env} environment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Deploy Now',
          onPress: () => {
            setActiveSheet(null);
            Alert.alert('Deployment Launched', `Workflow published to ${env}. Webhook URL is now live.`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.titleInfo}>
          <Text style={styles.headerTitle}>
            {workflowId === 'new' ? 'Untitled Workflow' : 'Slack Notify on Stripe Charge'}
          </Text>
          <Text style={styles.headerSub}>Draft • v1.4 • Score: 96%</Text>
        </View>
        <TouchableOpacity style={styles.runButton} onPress={handleRunTest}>
          <Ionicons name="play" size={16} color={COLORS.white} />
          <Text style={styles.runButtonText}>Run Test</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarBtn} onPress={() => handleZoom('in')}>
          <Ionicons name="add-circle-outline" size={18} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarBtn} onPress={() => handleZoom('out')}>
          <Ionicons name="remove-circle-outline" size={18} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarBtn} onPress={handleAutoArrange}>
          <Ionicons name="grid-outline" size={18} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarBtn} onPress={handleValidation}>
          <Ionicons name="checkmark-done-circle-outline" size={18} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarBtn} onPress={() => setActiveSheet('version')}>
          <Ionicons name="git-branch-outline" size={18} color={COLORS.white} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.publishBtn}
          onPress={() => setActiveSheet('publish')}
        >
          <LinearGradient
            colors={[COLORS.secondary, COLORS.accent]}
            style={styles.publishBtnGradient}
          >
            <Text style={styles.publishBtnText}>Publish</Text>
            <Ionicons name="rocket-outline" size={14} color={COLORS.white} style={{ marginLeft: 4 }} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Visual Canvas Area */}
      <ScrollView
        contentContainerStyle={[styles.canvasScroll, { transform: [{ scale }] }]}
        style={styles.canvasContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Dynamic Connection Path wires */}
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <Svg width={width} height={height * 1.5}>
            <Defs>
              <Marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <Path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.secondary} />
              </Marker>
            </Defs>
            {/* Draw curve wires dynamically between node spaces */}
            {nodes.map((_, i) => {
              if (i === 0) return null;
              const startY = 110 + (i - 1) * 165;
              const endY = 190 + (i - 1) * 165;
              return (
                <Path
                  key={i}
                  d={`M ${width / 2} ${startY} C ${width / 2} ${startY + 40}, ${width / 2} ${endY - 45}, ${width / 2} ${endY}`}
                  stroke={COLORS.secondary}
                  strokeWidth="2.5"
                  fill="none"
                  markerEnd="url(#arrow)"
                />
              );
            })}
          </Svg>
        </View>

        {/* Node list cards */}
        {nodes.map((node, index) => {
          const isSelected = selectedNode?.id === node.id;
          const statusColors =
            node.status === 'success'
              ? COLORS.success
              : node.status === 'failed'
              ? COLORS.danger
              : COLORS.textLight;

          return (
            <React.Fragment key={node.id}>
              <TouchableOpacity
                style={[styles.nodeCard, isSelected && styles.selectedNodeCard]}
                onPress={() => {
                  setSelectedNode(node);
                  setActiveSheet('settings');
                }}
              >
                <View style={styles.nodeHeader}>
                  <View style={styles.nodeBadge}>
                    <Text style={styles.nodeBadgeText}>{node.type.toUpperCase()}</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={16} color={statusColors} />
                </View>
                <View style={styles.nodeContent}>
                  <View style={styles.iconWrapper}>
                    <Ionicons name={node.icon as any} size={20} color={COLORS.secondary} />
                  </View>
                  <View style={styles.nodeInfo}>
                    <Text style={styles.nodeTitle}>{node.title}</Text>
                    <Text style={styles.nodeApp}>{node.app}</Text>
                    <Text style={styles.nodeMeta} numberOfLines={1}>{node.configSummary}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Add node inline connector */}
              <View style={styles.adderWrapper}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setActiveSheet('library')}
                >
                  <Ionicons name="add" size={14} color={COLORS.secondary} />
                </TouchableOpacity>
              </View>
            </React.Fragment>
          );
        })}
      </ScrollView>

      {/* NODE SETTINGS PANEL */}
      {activeSheet === 'settings' && selectedNode && (
        <View style={styles.configSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Settings: {selectedNode.title}</Text>
            <TouchableOpacity onPress={() => setActiveSheet(null)}>
              <Ionicons name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.sheetBody} showsVerticalScrollIndicator={false}>
            <Text style={styles.fieldLabel}>Request Timeout (ms)</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="numeric"
              value={timeoutMs}
              onChangeText={setTimeoutMs}
            />

            <Text style={styles.fieldLabel}>Retry Attempts</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="numeric"
              value={retryAttempts}
              onChangeText={setRetryAttempts}
            />

            <View style={styles.switchRow}>
              <View>
                <Text style={styles.switchTitle}>Continue on Failure</Text>
                <Text style={styles.switchSub}>Execute subsequent nodes even if this fails.</Text>
              </View>
              <Switch
                value={continueOnFailure}
                onValueChange={setContinueOnFailure}
                trackColor={{ true: COLORS.secondary }}
              />
            </View>

            <TouchableOpacity style={styles.saveSheetButton} onPress={handleApplyNodeSettings}>
              <Text style={styles.saveSheetButtonText}>Save Node Configurations</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* NODE LIBRARY PANEL */}
      {activeSheet === 'library' && (
        <View style={styles.configSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Choose Integration Node</Text>
            <TouchableOpacity onPress={() => setActiveSheet(null)}>
              <Ionicons name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.libraryGrid}>
            {libraryNodes.map((libNode, i) => (
              <TouchableOpacity
                key={i}
                style={styles.libraryItem}
                onPress={() => handleAddNodeFromLibrary(libNode)}
              >
                <View style={styles.libIconWrapper}>
                  <Ionicons name={libNode.icon as any} size={22} color={libNode.color} />
                </View>
                <Text style={styles.libTitle}>{libNode.title}</Text>
                <Text style={styles.libType}>{libNode.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* VALIDATION PANEL */}
      {activeSheet === 'validate' && (
        <View style={styles.configSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Validation Warnings</Text>
            <TouchableOpacity onPress={() => setActiveSheet(null)}>
              <Ionicons name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.sheetBody}>
            <View style={styles.warnItem}>
              <Ionicons name="warning" size={20} color="#D69E2E" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.warnTitle}>Missing Slack Auth Credentials</Text>
                <Text style={styles.warnDesc}>Select active integration token to authenticate channel delivery.</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.saveSheetButton}
              onPress={() => {
                setActiveSheet(null);
                Alert.alert('AI Helper Fix', 'Slack authentication credentials refreshed automatically.');
              }}
            >
              <Text style={styles.saveSheetButtonText}>Auto-Fix via AI</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* VERSION PANEL */}
      {activeSheet === 'version' && (
        <View style={styles.configSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Version Control History</Text>
            <TouchableOpacity onPress={() => setActiveSheet(null)}>
              <Ionicons name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.sheetBody}>
            {['v1.4 - Updated Stripe parameters (Active)', 'v1.3 - Combined Slack notify action', 'v1.2 - Added Customer classifier prompt'].map((version, i) => (
              <TouchableOpacity
                key={i}
                style={styles.versionRow}
                onPress={() => {
                  setActiveSheet(null);
                  Alert.alert('Restore Version', `Revert canvas workspace to ${version.split(' ')[0]}?`);
                }}
              >
                <Ionicons name="time-outline" size={16} color={COLORS.secondary} style={{ marginRight: 8 }} />
                <Text style={styles.versionText}>{version}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* PUBLISH DEPLOYMENT PANEL */}
      {activeSheet === 'publish' && (
        <View style={styles.configSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Publish Deployment Settings</Text>
            <TouchableOpacity onPress={() => setActiveSheet(null)}>
              <Ionicons name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.sheetBody}>
            <Text style={styles.fieldLabel}>Deploy Destination Environment</Text>
            <View style={styles.envRow}>
              <TouchableOpacity style={styles.envBtn} onPress={() => handlePublish('Staging')}>
                <Text style={styles.envBtnText}>Staging Sandbox</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.envBtn, { marginLeft: 12, backgroundColor: COLORS.secondary }]} onPress={() => handlePublish('Production')}>
                <Text style={styles.envBtnText}>Production Cluster</Text>
              </TouchableOpacity>
            </View>
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
    color: COLORS.white,
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
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toolbarBtn: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  publishBtn: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  publishBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  publishBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  canvasContainer: {
    flex: 1,
  },
  canvasScroll: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 120,
  },
  nodeCard: {
    width: width * 0.85,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    ...SHADOWS.light,
    zIndex: 10,
  },
  selectedNodeCard: {
    borderColor: COLORS.secondary,
    borderWidth: 2,
  },
  nodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nodeBadge: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  nodeBadgeText: {
    fontSize: 8,
    fontWeight: '800',
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
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: COLORS.border,
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
    color: COLORS.white,
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
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  addButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.cardBg,
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
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: height * 0.5,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  sheetBody: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 12,
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
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  switchTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  switchSub: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  saveSheetButton: {
    backgroundColor: COLORS.secondary,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveSheetButtonText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 14,
  },
  libraryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  libraryItem: {
    width: '48%',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  libIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  libTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  libType: {
    fontSize: 9,
    color: COLORS.textLight,
  },
  warnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(214, 158, 46, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(214, 158, 46, 0.25)',
    padding: 12,
    marginBottom: 20,
  },
  warnTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D69E2E',
    marginBottom: 2,
  },
  warnDesc: {
    fontSize: 10,
    color: COLORS.textLight,
    lineHeight: 14,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  versionText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '600',
  },
  envRow: {
    flexDirection: 'row',
  },
  envBtn: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  envBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
