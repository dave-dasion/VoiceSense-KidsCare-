import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateWorkspaceScreen({ navigation }: any) {
  const [workspaceName, setWorkspaceName] = useState('');
  const [slug, setSlug] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [teamSize, setTeamSize] = useState('1-5');

  const handleGenerateSlug = () => {
    if (!workspaceName) return;
    const formatted = workspaceName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setSlug(formatted);
  };

  const handleAISuggestion = () => {
    if (!company) {
      Alert.alert('AI Assistant', 'Please fill in your Company Name first so the AI can generate suggestions.');
      return;
    }
    const suggestions = [
      `${company} Automations`,
      `${company} Ops Center`,
      `Flow-${company.toLowerCase()}`,
    ];
    const picked = suggestions[Math.floor(Math.random() * suggestions.length)];
    setWorkspaceName(picked);
    setSlug(
      picked
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    );
  };

  const handleCreateWorkspace = () => {
    if (!workspaceName || !slug) {
      Alert.alert('Validation Error', 'Workspace Name and URL slug are required.');
      return;
    }
    navigation.navigate('InviteMembers');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Workspace</Text>
          <Text style={styles.subtitle}>Set up a central hub to collaborate on custom workflow pipelines.</Text>
        </View>

        {/* Logo Upload Card */}
        <View style={styles.uploadCard}>
          <View style={styles.uploadCircle}>
            <Ionicons name="cloud-upload-outline" size={24} color={COLORS.secondary} />
          </View>
          <View style={styles.uploadInfo}>
            <Text style={styles.uploadTitle}>Upload Workspace Logo</Text>
            <Text style={styles.uploadSub}>PNG, JPG up to 5MB. 512x512 recommended.</Text>
          </View>
        </View>

        {/* Inputs */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Company/Organization Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Acme Corporation"
            placeholderTextColor={COLORS.textLight}
            value={company}
            onChangeText={setCompany}
          />

          <View style={styles.nameHeaderRow}>
            <Text style={styles.label}>Workspace Name *</Text>
            <TouchableOpacity onPress={handleAISuggestion}>
              <Text style={styles.aiBtnText}>✨ AI Suggest</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="e.g. Acme Ops"
            placeholderTextColor={COLORS.textLight}
            value={workspaceName}
            onChangeText={(text) => {
              setWorkspaceName(text);
              // auto generate slug if empty/matching
            }}
            onBlur={handleGenerateSlug}
          />

          <Text style={styles.label}>Workspace URL Slug *</Text>
          <View style={styles.slugWrapper}>
            <Text style={styles.slugPrefix}>flowpilot.ai/ws/</Text>
            <TextInput
              style={styles.slugInput}
              placeholder="acme-ops"
              placeholderTextColor={COLORS.textLight}
              value={slug}
              onChangeText={setSlug}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Industry</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. E-Commerce, Healthcare, SaaS"
            placeholderTextColor={COLORS.textLight}
            value={industry}
            onChangeText={setIndustry}
          />

          <Text style={styles.label}>Team Size</Text>
          <View style={styles.teamSizeRow}>
            {['1-5', '6-25', '26-100', '100+'].map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeBtn, teamSize === size && styles.sizeBtnActive]}
                onPress={() => setTeamSize(size)}
              >
                <Text style={[styles.sizeText, teamSize === size && styles.sizeTextActive]}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Create Button */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleCreateWorkspace}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.submitBtnText}>Create Workspace</Text>
              <Ionicons name="arrow-forward-outline" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('InviteMembers')}>
            <Text style={styles.skipText}>Set up workspace later</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
    fontFamily: FONTS.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  uploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 28,
  },
  uploadCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  uploadInfo: {
    flex: 1,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 2,
  },
  uploadSub: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  formContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    height: 52,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.white,
    marginBottom: 20,
  },
  nameHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  aiBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.accent,
  },
  slugWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    height: 52,
    paddingHorizontal: 16,
  },
  slugPrefix: {
    color: COLORS.textLight,
    fontSize: 14,
    marginRight: 2,
    fontWeight: '600',
  },
  slugInput: {
    flex: 1,
    height: '100%',
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  teamSizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  sizeBtn: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  sizeBtnActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  sizeText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: '700',
  },
  sizeTextActive: {
    color: COLORS.white,
  },
  submitBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    ...SHADOWS.medium,
  },
  gradientButton: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  skipText: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
