import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ProductOverviewScreen({ navigation }: any) {
  const [selectedLayer, setSelectedLayer] = useState<'input' | 'hidden' | 'output'>('input');

  const getLayerDetails = () => {
    switch (selectedLayer) {
      case 'input':
        return {
          title: "Input Layer (Text & Speech Tokens)",
          body: "Raw customer inquiries are broken down into numerical sub-word tokens using byte-pair encoding (BPE). These token IDs index an embedding lookup table to produce initial vector states.",
        };
      case 'hidden':
        return {
          title: "Hidden Transformer Layers (12-Layer Attention)",
          body: "Vector sequences undergo multi-head self-attention, where query, key, and value matrices establish syntactic and semantic links between words. Fine-tuning adjusts attention head weights.",
        };
      case 'output':
        return {
          title: "Output Layer (Probabilistic Logits)",
          body: "The final hidden state vector passes through a softmax layer to project the most probable reply token. Temperature parameters control variance (creativity vs accuracy).",
        };
    }
  };

  const details = getLayerDetails();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. Neural Flow Overview</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Concept Card */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Neural Network Mechanics</Text>
          <Text style={styles.cardBody}>
            An Artificial Intelligence engine processes inputs through specialized layer hierarchies. Click each layer block in the pipeline below to inspect token vector transitions:
          </Text>
        </View>

        {/* Network Pipeline Visualizer */}
        <Text style={styles.sectionTitle}>Interactive Network Architecture</Text>
        <View style={styles.visualizerPanel}>
          {/* Input Block */}
          <TouchableOpacity
            style={[styles.nodeBlock, selectedLayer === 'input' && styles.nodeBlockActive]}
            onPress={() => setSelectedLayer('input')}
          >
            <Ionicons name="cloud-upload-outline" size={20} color={selectedLayer === 'input' ? COLORS.secondary : COLORS.textLight} />
            <Text style={[styles.nodeText, selectedLayer === 'input' && styles.nodeTextActive]}>Input Layer</Text>
          </TouchableOpacity>

          <Ionicons name="arrow-down" size={16} color={COLORS.textLight} style={{ marginVertical: 4 }} />

          {/* Hidden Block */}
          <TouchableOpacity
            style={[styles.nodeBlock, selectedLayer === 'hidden' && styles.nodeBlockActive]}
            onPress={() => setSelectedLayer('hidden')}
          >
            <Ionicons name="git-branch-outline" size={20} color={selectedLayer === 'hidden' ? COLORS.secondary : COLORS.textLight} />
            <Text style={[styles.nodeText, selectedLayer === 'hidden' && styles.nodeTextActive]}>Hidden Layers</Text>
          </TouchableOpacity>

          <Ionicons name="arrow-down" size={16} color={COLORS.textLight} style={{ marginVertical: 4 }} />

          {/* Output Block */}
          <TouchableOpacity
            style={[styles.nodeBlock, selectedLayer === 'output' && styles.nodeBlockActive]}
            onPress={() => setSelectedLayer('output')}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color={selectedLayer === 'output' ? COLORS.secondary : COLORS.textLight} />
            <Text style={[styles.nodeText, selectedLayer === 'output' && styles.nodeTextActive]}>Output Layer</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Detail Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>{details.title}</Text>
          <Text style={styles.detailsBody}>{details.body}</Text>
        </View>

        {/* Proceed CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ProductFeatures')}
        >
          <Text style={styles.nextButtonText}>Proceed to Feature Latency Tuning</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
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
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  visualizerPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginBottom: 20,
    ...SHADOWS.light,
  },
  nodeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 44,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  nodeBlockActive: {
    backgroundColor: COLORS.secondary + '10',
    borderColor: COLORS.secondary,
    borderWidth: 1.5,
  },
  nodeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    marginLeft: 8,
  },
  nodeTextActive: {
    color: COLORS.secondary,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  detailsTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  detailsBody: {
    fontSize: 12,
    color: COLORS.textDark,
    lineHeight: 17,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
