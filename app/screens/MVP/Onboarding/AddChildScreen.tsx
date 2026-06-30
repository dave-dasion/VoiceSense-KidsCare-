import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
    ScrollView, KeyboardAvoidingView, Platform, TextInput, Dimensions,
    StatusBar
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '../../../components';

const { width } = Dimensions.get('window');

const genders = ['Boy', 'Girl', 'Non-binary', 'Prefer not to say'];
const grades = ['Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', 'High School'];

const avatars = [
    { id: '1', emoji: '🦊', bg: '#FFEDD5' },
    { id: '2', emoji: '🐨', bg: '#F0FDF4' },
    { id: '3', emoji: '🦁', bg: '#FEF9C3' },
    { id: '4', emoji: '🐼', bg: '#F3F4F6' },
    { id: '5', emoji: '🤖', bg: '#EFF6FF' },
    { id: '6', emoji: '🦄', bg: '#FDF4FF' },
    { id: '7', emoji: '🐸', bg: '#DCFCE7' },
    { id: '8', emoji: '🐯', bg: '#FFF7ED' },
    { id: '9', emoji: '🦋', bg: '#FCE7F3' },
];

const getAgeGroup = (age: number) => {
    if (age >= 4 && age <= 6) return '🎈 Simplified Games (Ages 4–6)';
    if (age >= 7 && age <= 10) return '🎮 Medium Games (Ages 7–10)';
    if (age >= 11 && age <= 13) return '🧩 Structured Games (Ages 11–13)';
    if (age >= 14 && age <= 17) return '🧠 Advanced + Mood Module (Ages 14–17)';
    return '';
};

const AddChildScreen = () => {
    const navigation = useNavigation<any>();

    // Original Logic Preserved
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('1');
    const [showGenderPicker, setShowGenderPicker] = useState(false);
    const [showGradePicker, setShowGradePicker] = useState(false);

    // UI state for focus effects
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const ageNum = parseInt(age, 10);
    const ageGroup = !isNaN(ageNum) ? getAgeGroup(ageNum) : '';
    const canContinue = name.trim() && age.trim() && !isNaN(ageNum) && ageNum >= 4 && ageNum <= 17;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={24} color={Colors.text} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title}>Child Profile</Text>
                                <Text style={styles.subtitle}>Personalise the experience for your child</Text>
                            </View>
                            <Avatar size={60} emoji="🎒" />
                        </View>
                    </View>

                    {/* Avatar Picker Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Choose an Avatar</Text>
                        <View style={styles.avatarGrid}>
                            {avatars.map((a) => (
                                <TouchableOpacity
                                    key={a.id}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.avatarBtn,
                                        { backgroundColor: a.bg },
                                        selectedAvatar === a.id && styles.avatarSelected
                                    ]}
                                    onPress={() => setSelectedAvatar(a.id)}
                                >
                                    <Text style={styles.avatarEmoji}>{a.emoji}</Text>
                                    {selectedAvatar === a.id && (
                                        <View style={styles.selectedBadge}>
                                            <Ionicons name="checkmark" size={14} color={Colors.white} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Name Input */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Child's Name *</Text>
                        <View style={[styles.inputRow, focusedField === 'name' && styles.inputFocused]}>
                            <Ionicons name="person" size={20} color={focusedField === 'name' ? Colors.primary : "#94A3B8"} style={styles.inputIcon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Charlie"
                                value={name}
                                onChangeText={setName}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                    </View>

                    {/* Age Input & Group Badge */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Age *</Text>
                        <View style={[styles.inputRow, focusedField === 'age' && styles.inputFocused]}>
                            <Ionicons name="calendar" size={20} color={focusedField === 'age' ? Colors.primary : "#94A3B8"} style={styles.inputIcon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Age (4–17)"
                                value={age}
                                onChangeText={setAge}
                                onFocus={() => setFocusedField('age')}
                                onBlur={() => setFocusedField(null)}
                                keyboardType="number-pad"
                                maxLength={2}
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                        {ageGroup !== '' && (
                            <View style={styles.ageBadge}>
                                <LinearGradient
                                    colors={['#EFF6FF', '#DBEAFE']}
                                    style={styles.ageBadgeGradient}
                                >
                                    <Text style={styles.ageBadgeText}>{ageGroup}</Text>
                                </LinearGradient>
                            </View>
                        )}
                        {age && (isNaN(ageNum) || ageNum < 4 || ageNum > 17) && (
                            <View style={styles.errorContainer}>
                                <Ionicons name="alert-circle" size={16} color={Colors.error} />
                                <Text style={styles.ageError}>Please enter an age between 4 and 17.</Text>
                            </View>
                        )}
                    </View>

                    {/* Gender Dropdown */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Gender (Optional)</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.inputRow, showGenderPicker && styles.inputFocused]}
                            onPress={() => setShowGenderPicker(!showGenderPicker)}
                        >
                            <Ionicons name="transgender" size={20} color={showGenderPicker ? Colors.primary : "#94A3B8"} style={styles.inputIcon} />
                            <Text style={[styles.textInput, { color: selectedGender ? Colors.text : "#94A3B8" }]}>
                                {selectedGender || 'Select gender'}
                            </Text>
                            <Ionicons name={showGenderPicker ? 'chevron-up' : 'chevron-down'} size={18} color="#94A3B8" />
                        </TouchableOpacity>
                        {showGenderPicker && (
                            <View style={styles.dropdown}>
                                {genders.map((g) => (
                                    <TouchableOpacity key={g} style={styles.dropdownItem}
                                        onPress={() => { setSelectedGender(g); setShowGenderPicker(false); }}>
                                        <Text style={[styles.dropdownText, selectedGender === g && styles.dropdownSelectedText]}>{g}</Text>
                                        {selectedGender === g && <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Grade Dropdown */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>School Grade (Optional)</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.inputRow, showGradePicker && styles.inputFocused]}
                            onPress={() => setShowGradePicker(!showGradePicker)}
                        >
                            <Ionicons name="school" size={20} color={showGradePicker ? Colors.primary : "#94A3B8"} style={styles.inputIcon} />
                            <Text style={[styles.textInput, { color: selectedGrade ? Colors.text : "#94A3B8" }]}>
                                {selectedGrade || 'Select grade'}
                            </Text>
                            <Ionicons name={showGradePicker ? 'chevron-up' : 'chevron-down'} size={18} color="#94A3B8" />
                        </TouchableOpacity>
                        {showGradePicker && (
                            <View style={styles.dropdown}>
                                <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
                                    {grades.map((g) => (
                                        <TouchableOpacity key={g} style={styles.dropdownItem}
                                            onPress={() => { setSelectedGrade(g); setShowGradePicker(false); }}>
                                            <Text style={[styles.dropdownText, selectedGrade === g && styles.dropdownSelectedText]}>{g}</Text>
                                            {selectedGrade === g && <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />}
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    {/* CTA Button */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.createBtn, !canContinue && styles.createBtnDisabled]}
                        disabled={!canContinue}
                        onPress={() => navigation.navigate('ParentMain')}
                    >
                        <LinearGradient
                            colors={!canContinue ? ['#CBD5E1', '#CBD5E1'] : [Colors.primary, '#4F46E5']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                        >
                            <Text style={styles.createBtnText}>Create Profile</Text>
                            <Ionicons name="sparkles" size={20} color={Colors.white} />
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const AVATAR_SIZE = (width - 48 - 24) / 3; // Account for padding and gap

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    scroll: { paddingHorizontal: 24, paddingBottom: 24 },
    header: { marginTop: 10, marginBottom: 30 },
    backBtn: { marginBottom: 16 },
    title: { ...Typography.header, fontSize: 32, fontWeight: '800', color: '#1E293B' },
    subtitle: { fontSize: 16, color: '#64748B', marginTop: 4 },

    section: { marginBottom: 24 },
    sectionLabel: { fontSize: 14, fontWeight: '700', color: '#475569', marginBottom: 10, marginLeft: 4 },

    avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    avatarBtn: {
        width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: 24,
        justifyContent: 'center', alignItems: 'center', ...Shadows.light,
        backgroundColor: Colors.white,
    },
    avatarSelected: {
        borderWidth: 3,
        borderColor: Colors.primary,
        transform: [{ scale: 1.05 }]
    },
    avatarEmoji: { fontSize: 40 },
    selectedBadge: {
        position: 'absolute', top: -6, right: -6,
        width: 24, height: 24, borderRadius: 12,
        backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',
        borderWidth: 2, borderColor: Colors.white,
    },

    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: Colors.white, borderRadius: 16,
        borderWidth: 1.5, borderColor: '#E2E8F0',
        paddingHorizontal: 16, height: 58,
        ...Shadows.light,
    },
    inputFocused: { borderColor: Colors.primary },
    inputIcon: { marginRight: 12 },
    textInput: { flex: 1, fontSize: 16, color: Colors.text, fontWeight: '500' },

    ageBadge: { marginTop: 12, borderRadius: 12, overflow: 'hidden' },
    ageBadgeGradient: { padding: 12, borderLeftWidth: 4, borderLeftColor: Colors.primary },
    ageBadgeText: { color: Colors.primary, fontWeight: '700', fontSize: 14 },

    errorContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4, marginLeft: 4 },
    ageError: { color: Colors.error, fontSize: 13, fontWeight: '500' },

    dropdown: {
        backgroundColor: Colors.white, borderRadius: 16, borderWidth: 1.5,
        borderColor: '#E2E8F0', marginTop: 8, ...Shadows.medium, overflow: 'hidden',
    },
    dropdownItem: {
        padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    dropdownText: { fontSize: 15, color: '#475569', fontWeight: '500' },
    dropdownSelectedText: { color: Colors.primary, fontWeight: '700' },

    createBtn: { marginTop: 10, borderRadius: 20, overflow: 'hidden', ...Shadows.medium },
    gradient: { flexDirection: 'row', padding: 18, alignItems: 'center', justifyContent: 'center', gap: 10 },
    createBtnDisabled: { opacity: 0.5, elevation: 0 },
    createBtnText: { color: Colors.white, fontSize: 18, fontWeight: '800' },
});

export default AddChildScreen;