import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_CMS_MEDIA, CMSMedia } from './mockContentData';

export default function MediaLibraryScreen({ navigation }: any) {
  
  const handleUpload = () => {
    Alert.alert('Asset Upload', 'Select a file from your system directory to upload.');
  };

  const getIcon = (type: CMSMedia['filetype']) => {
    switch (type) {
      case 'Video':
        return 'videocam-outline';
      case 'PDF':
        return 'document-text-outline';
      default:
        return 'image-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Media Library</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Upload card */}
        <TouchableOpacity style={styles.uploadCard} onPress={handleUpload}>
          <Ionicons name="cloud-upload-outline" size={36} color={COLORS.primary} style={{ marginBottom: 6 }} />
          <Text style={styles.uploadTitle}>Upload New Media Asset</Text>
          <Text style={styles.uploadDesc}>Supports JPG, PNG, MP4, and PDF guidelines files up to 100MB.</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Uploaded Resources</Text>

        {MOCK_CMS_MEDIA.map((item) => (
          <View key={item.id} style={styles.mediaCard}>
            <View style={styles.mediaRow}>
              <View style={styles.iconBg}>
                <Ionicons name={getIcon(item.filetype)} size={22} color={COLORS.primary} />
              </View>
              
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.filename} numberOfLines={1}>{item.filename}</Text>
                <Text style={styles.metaText}>{item.filetype} • {item.size}</Text>
              </View>

              <TouchableOpacity style={styles.deleteBtn} onPress={() => Alert.alert('Delete', 'Delete this asset?')}>
                <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

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
  uploadCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  uploadDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    fontFamily: FONTS.bold,
  },
  mediaCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  mediaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filename: {
    fontSize: 12.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  metaText: {
    fontSize: 10.5,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  deleteBtn: {
    padding: 8,
  },
});
