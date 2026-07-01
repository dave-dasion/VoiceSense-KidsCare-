import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function CourseBuilderScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Clinical Care');
  const [duration, setDuration] = useState('');
  const [desc, setDesc] = useState('');

  const categories = ['Clinical Care', 'Patient Safety', 'Wellness'];

  const handleSave = (status: 'Draft' | 'Published') => {
    if (!title.trim() || !desc.trim()) {
      Alert.alert('Validation Error', 'Please fill in the course title and description.');
      return;
    }
    Alert.alert(
      'Success 🎉',
      `Course successfully saved as: ${status}!`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
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
        <Text style={styles.headerTitle}>Course Builder</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.label}>Course Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Cardiac Resuscitation Basics"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Select Category</Text>
        <View style={styles.categoryRow}>
          {categories.map((cat) => {
            const isSelected = category === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.catBtn, isSelected && styles.catBtnSelected]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.catText, isSelected && styles.catTextSelected]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Estimated Duration (e.g. 3 Hours)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 4 Hours"
          value={duration}
          onChangeText={setDuration}
        />

        <Text style={styles.label}>Course Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Summarize course objectives, clinical prerequisites, and targeted learnings..."
          multiline
          numberOfLines={4}
          value={desc}
          onChangeText={setDesc}
        />

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.draftBtn} onPress={() => handleSave('Draft')}>
            <Text style={styles.draftBtnText}>Save Draft</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.publishBtn} onPress={() => handleSave('Published')}>
            <Text style={styles.publishBtnText}>Publish Course</Text>
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
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 12.5,
    color: COLORS.textDark,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  catBtn: {
    flex: 1,
    height: 38,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  catBtnSelected: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}10`,
  },
  catText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  catTextSelected: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  draftBtn: {
    flex: 1,
    height: 44,
    backgroundColor: '#EDF2F7',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  draftBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  publishBtn: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    ...SHADOWS.medium,
  },
  publishBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.white,
  },
});
