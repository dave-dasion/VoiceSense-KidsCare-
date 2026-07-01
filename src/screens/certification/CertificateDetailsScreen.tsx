import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { getCertificate } from './mockCertData';

const { width } = Dimensions.get('window');

export default function CertificateDetailsScreen({ route, navigation }: any) {
  const { certificateId } = route.params;
  const cert = getCertificate(certificateId);
  const { user } = useAuth();

  if (!cert) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Certificate not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleShare = () => {
    Alert.alert(
      'Share Credential',
      `Copy the link below to share your verified certificate for "${cert.title}":\n\nhttps://verify.elderlycare.edu/certs/${cert.credentialId}`,
      [
        { text: 'Copy Link', onPress: () => Alert.alert('Success', 'Credential link copied to clipboard!') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Certificate Details</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Certificate Rendering Area */}
        <View style={styles.certificateOuterBorder}>
          <LinearGradient
            colors={['#FFFDF5', '#F7F4EB']}
            style={styles.certificateCanvas}
          >
            {/* Elegant Inner Border */}
            <View style={styles.certificateInnerBorder}>
              
              {/* Corner Ornaments */}
              <View style={[styles.cornerOrnament, styles.topLeftCorner]} />
              <View style={[styles.cornerOrnament, styles.topRightCorner]} />
              <View style={[styles.cornerOrnament, styles.bottomLeftCorner]} />
              <View style={[styles.cornerOrnament, styles.bottomRightCorner]} />

              {/* Certificate Ribbon Icon */}
              <Ionicons name="ribbon" size={44} color="#D69E2E" style={styles.certIcon} />

              <Text style={styles.certMainHeader}>CERTIFICATE OF ACHIEVEMENT</Text>
              <Text style={styles.certSubHeader}>THIS IS PROUDLY PRESENTED TO</Text>

              {/* Trainee Name */}
              <Text style={styles.traineeName}>{user?.name || 'Verified Trainee'}</Text>
              
              <View style={styles.horizontalDivider} />

              <Text style={styles.completionStatement}>
                for successfully completing all course criteria, lessons, and graded practical checks required for professional qualification in:
              </Text>

              {/* Title of Certification */}
              <Text style={styles.certificationTitle}>{cert.title}</Text>

              <View style={styles.horizontalDivider} />

              {/* Footer row: Signatures, Seal, QR Code */}
              <View style={styles.certFooterRow}>
                {/* Left: Signature */}
                <View style={styles.signatureCol}>
                  <Text style={styles.signatureName}>{cert.instructorName || 'Lead Instructor, RN'}</Text>
                  <View style={styles.sigLine} />
                  <Text style={styles.signatureTitle}>Program Director</Text>
                </View>

                {/* Center: Gold Badge Seal */}
                <View style={styles.sealCol}>
                  <View style={styles.goldSeal}>
                    <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
                  </View>
                  <Text style={styles.sealLabel}>VERIFIED</Text>
                </View>

                {/* Right: Security QR Code */}
                <View style={styles.qrCol}>
                  <View style={styles.qrCodeBorder}>
                    <Ionicons name="qr-code" size={36} color={COLORS.textDark} />
                  </View>
                  <Text style={styles.qrLabel}>Scan to Verify</Text>
                </View>
              </View>

              {/* Bottom Credential Stats */}
              <Text style={styles.bottomCredentialId}>
                Credential ID: {cert.credentialId}  •  Completed: {cert.unlockedDate}
              </Text>

            </View>
          </LinearGradient>
        </View>

        {/* Verified Skills Section */}
        <View style={styles.skillsCard}>
          <Text style={styles.skillsTitle}>Verified Professional Competencies</Text>
          <Text style={styles.skillsSubtitle}>
            Trainee demonstrated high proficiency in the following practical skills:
          </Text>
          {cert.skillsVerified.map((skill, index) => (
            <View key={index} style={styles.skillRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Actions Button Panel */}
        <View style={styles.btnPanel}>
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={() => navigation.navigate('CertificateDownload', { certificateId: cert.id })}
          >
            <Ionicons name="download-outline" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
            <Text style={styles.downloadBtnText}>Download Official PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
            <Text style={styles.shareBtnText}>Share Verified Credential</Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    fontWeight: '700',
  },
  backBtn: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backBtnText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  certificateOuterBorder: {
    borderWidth: 8,
    borderColor: '#B7791F', // Dark Gold Outer Border
    borderRadius: 8,
    ...SHADOWS.medium,
    backgroundColor: COLORS.white,
    marginBottom: 20,
  },
  certificateCanvas: {
    padding: 12,
  },
  certificateInnerBorder: {
    borderWidth: 1.5,
    borderColor: 'rgba(183, 121, 31, 0.4)', // Faint Gold Line
    borderRadius: 4,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    position: 'relative',
  },
  cornerOrnament: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderColor: '#B7791F',
  },
  topLeftCorner: {
    top: 6,
    left: 6,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRightCorner: {
    top: 6,
    right: 6,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeftCorner: {
    bottom: 6,
    left: 6,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRightCorner: {
    bottom: 6,
    right: 6,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  certIcon: {
    marginBottom: 10,
  },
  certMainHeader: {
    fontSize: 13,
    fontWeight: '900',
    color: '#744210', // Dark Golden-Brown
    fontFamily: FONTS.bold,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  certSubHeader: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textLight,
    marginTop: 12,
    letterSpacing: 1,
  },
  traineeName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginTop: 8,
    textAlign: 'center',
  },
  horizontalDivider: {
    width: '60%',
    height: 1,
    backgroundColor: 'rgba(183, 121, 31, 0.3)',
    marginVertical: 14,
  },
  completionStatement: {
    fontSize: 9.5,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: 10,
  },
  certificationTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    paddingHorizontal: 4,
    marginTop: 2,
  },
  certFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 4,
  },
  signatureCol: {
    alignItems: 'center',
    width: '35%',
  },
  signatureName: {
    fontSize: 8.5,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#2B6CB0', // Simulated handwriting ink
    fontFamily: FONTS.regular,
  },
  sigLine: {
    width: '90%',
    height: 1,
    backgroundColor: COLORS.textLight,
    marginVertical: 4,
  },
  signatureTitle: {
    fontSize: 7,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  sealCol: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  goldSeal: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D69E2E',
    borderWidth: 2,
    borderColor: '#ECC94B',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  sealLabel: {
    fontSize: 7.5,
    fontWeight: '800',
    color: '#D69E2E',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  qrCol: {
    alignItems: 'center',
    width: '35%',
  },
  qrCodeBorder: {
    padding: 3,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
  },
  qrLabel: {
    fontSize: 7,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginTop: 4,
  },
  bottomCredentialId: {
    fontSize: 8,
    color: COLORS.textLight,
    marginTop: 20,
    fontWeight: '600',
  },
  skillsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 24,
  },
  skillsTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  skillsSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 4,
    marginBottom: 12,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D69E2E',
    marginRight: 10,
  },
  skillText: {
    fontSize: 11.5,
    color: COLORS.textDark,
    fontWeight: '600',
    flex: 1,
  },
  btnPanel: {
    width: '100%',
  },
  downloadBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    ...SHADOWS.light,
  },
  downloadBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  shareBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBtnText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
