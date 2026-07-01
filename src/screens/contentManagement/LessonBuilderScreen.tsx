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

export default function LessonBuilderScreen({ navigation }: any) {
  const [parentCourse, setParentCourse] = useState('');
  const [title, setTitle] = useState('');
  const [sequence, setSequence] = useState('1');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!parentCourse.trim() || !title.trim() || !content.trim()) {
      Alert.alert('Validation Error', 'Please complete all lesson field configurations.');
      return;
    }
    Alert.alert(
      'Success 🎉',
      `Lesson: "${title}" saved in course folder!`,
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
        <Text style={styles.headerTitle}>Lesson Builder</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.label}>Parent Course</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Advanced Dementia Care Practices"
          value={parentCourse}
          onChangeText={setParentCourse}
        />

        <View style={styles.row}>
          <View style={{ flex: 3, marginRight: 8 }}>
            <Text style={styles.label}>Lesson Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. De-escalating Agitation"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Order / Seq</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              keyboardType="numeric"
              value={sequence}
              onChangeText={setSequence}
            />
          </View>
        </View>

        <Text style={styles.label}>Lesson Content (Markdown Supported)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write instructional details, nursing validation techniques, or procedure checklists..."
          multiline
          numberOfLines={8}
          value={content}
          onChangeText={setContent}
        />

        {/* Buttons */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save & Compile Lesson</Text>
          <Ionicons name="cloud-upload" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
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
  row: {
    flexDirection: 'row',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  saveBtn: {
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    ...SHADOWS.medium,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
