import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { getCertificate } from './mockCertData';

const STEPS = [
  'Requesting verified credential token...',
  'Compiling certificate high-res vector canvas...',
  'Applying verified digital signature keys...',
  'Attaching secure verification QR metadata...',
  'Finalizing encrypted PDF compilation...',
  'Writing cache file block to downloads...'
];

export default function CertificateDownloadScreen({ route, navigation }: any) {
  const { certificateId } = route.params;
  const cert = getCertificate(certificateId);

  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setIsDone(true);
          return 100;
        }
        
        // Advance steps based on progress milestones
        const targetStep = Math.min(
          Math.floor((next / 100) * STEPS.length),
          STEPS.length - 1
        );
        if (targetStep > stepIdx) {
          setStepIdx(targetStep);
        }

        return next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isDone, stepIdx]);

  const handleOpenPdf = () => {
    Alert.alert(
      'Open Certificate',
      `Loading offline PDF file: "${cert?.credentialId || 'Certificate'}.pdf"`,
      [{ text: 'Dismiss' }]
    );
  };

  const handleSaveToDevice = () => {
    Alert.alert(
      'Saved Successful',
      'The PDF certificate has been copied to your system Downloads directory.',
      [{ text: 'Close', onPress: () => navigation.popToTop() }]
    );
  };

  if (!cert) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No Certificate Data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          disabled={!isDone}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={isDone ? COLORS.secondary : COLORS.textLight} 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Download PDF</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        
        {!isDone ? (
          /* DOWNLOADING STATE */
          <View style={styles.centerCol}>
            <ActivityIndicator size="large" color={COLORS.secondary} style={styles.spinner} />
            
            <Text style={styles.titleText}>Generating Secure PDF</Text>
            <Text style={styles.subtitleText}>{cert.title}</Text>

            {/* Progress Bar Container */}
            <View style={styles.progressBarWrapper}>
              <View style={styles.progressBackground}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressPercent}>{progress}%</Text>
            </View>

            {/* Current Step Description */}
            <View style={styles.stepBubble}>
              <Ionicons name="cog" size={14} color={COLORS.secondary} style={styles.stepIcon} />
              <Text style={styles.stepText}>{STEPS[stepIdx]}</Text>
            </View>
          </View>
        ) : (
          /* SUCCESS COMPLETED STATE */
          <View style={styles.centerCol}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark-sharp" size={48} color={COLORS.white} />
            </View>

            <Text style={styles.titleText}>Generator Completed!</Text>
            <Text style={styles.subtitleText}>Your official certificate is ready</Text>

            {/* PDF File Info Card */}
            <View style={styles.fileCard}>
              <View style={styles.fileIconBg}>
                <Ionicons name="document-text" size={32} color="#E53E3E" />
              </View>
              <View style={styles.fileDetails}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {cert.title.replace(/\s+/g, '_')}_Certificate.pdf
                </Text>
                <Text style={styles.fileSize}>1.4 MB  •  PDF Document</Text>
              </View>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            </View>

            {/* Completed Actions */}
            <View style={styles.actionBlock}>
              <TouchableOpacity style={styles.primaryActionBtn} onPress={handleSaveToDevice}>
                <Ionicons name="save-outline" size={18} color={COLORS.white} style={{ marginRight: 8 }} />
                <Text style={styles.actionBtnText}>Save to Downloads</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryActionBtn} onPress={handleOpenPdf}>
                <Ionicons name="eye-outline" size={18} color={COLORS.primary} style={{ marginRight: 8 }} />
                <Text style={styles.secondaryBtnText}>View Document</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCol: {
    alignItems: 'center',
    width: '100%',
  },
  spinner: {
    marginBottom: 24,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  progressBarWrapper: {
    width: '85%',
    marginTop: 28,
    alignItems: 'center',
  },
  progressBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.secondary,
    marginTop: 8,
    fontFamily: FONTS.bold,
  },
  stepBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.infoLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#BEE3F8',
  },
  stepIcon: {
    marginRight: 8,
  },
  stepText: {
    fontSize: 11,
    color: COLORS.info,
    fontWeight: '700',
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    ...SHADOWS.medium,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: '90%',
    marginTop: 32,
    marginBottom: 32,
    ...SHADOWS.light,
  },
  fileIconBg: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  fileSize: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
    fontWeight: '500',
  },
  actionBlock: {
    width: '90%',
  },
  primaryActionBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    ...SHADOWS.light,
  },
  actionBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryActionBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    fontWeight: '700',
  },
});
