import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity,
    SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StatusBar
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../../../components';

const SignUpScreen = () => {
    const navigation = useNavigation<any>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // UI Logic: Track focus for input styling (Kept existing state logic, added UI enhancement)
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const getBorderColor = (field: string) =>
        focusedField === field ? Colors.primary : '#E2E8F0';

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color={Colors.text} />
                    </TouchableOpacity>

                    <View style={[styles.headerContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>Start your journey with us</Text>
                        </View>
                        <Avatar size={64} emoji="✨" />
                    </View>

                    <View style={styles.form}>
                        {/* Name Input */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={[styles.inputRow, { borderColor: getBorderColor('name') }]}>
                                <Ionicons name="person-outline" size={20} color={focusedField === 'name' ? Colors.primary : Colors.textLight} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChangeText={setName}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholderTextColor="#94A3B8"
                                />
                            </View>
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={[styles.inputRow, { borderColor: getBorderColor('email') }]}>
                                <Ionicons name="mail-outline" size={20} color={focusedField === 'email' ? Colors.primary : Colors.textLight} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="name@example.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor="#94A3B8"
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Password</Text>
                            <View style={[styles.inputRow, { borderColor: getBorderColor('password') }]}>
                                <Ionicons name="lock-closed-outline" size={20} color={focusedField === 'password' ? Colors.primary : Colors.textLight} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Create a password"
                                    value={password}
                                    onChangeText={setPassword}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    secureTextEntry
                                    placeholderTextColor="#94A3B8"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.signUpButton}
                            onPress={() => navigation.navigate('Consent')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.signUpButtonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    scrollContent: { padding: Spacing.xl, paddingBottom: 40 },
    backButton: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white,
        justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.lg,
        ...Shadows.light
    },
    headerContainer: { marginBottom: Spacing.xxl },
    title: { ...Typography.header, fontSize: 32, color: '#1E293B' },
    subtitle: { ...Typography.caption, fontSize: 16, marginTop: 8, color: '#64748B' },
    form: { gap: Spacing.lg },
    inputWrapper: { gap: 8 },
    label: { ...Typography.body, fontWeight: '600', color: '#475569', marginLeft: 4 },
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: Colors.white, paddingHorizontal: Spacing.md,
        borderRadius: 16, borderWidth: 1.5, height: 60, ...Shadows.light,
    },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, fontSize: 16, color: Colors.text, fontWeight: '500' },
    signUpButton: {
        backgroundColor: Colors.primary, padding: Spacing.lg,
        borderRadius: 18, alignItems: 'center', marginTop: Spacing.md,
        height: 70, justifyContent: 'center', ...Shadows.medium,
    },
    signUpButtonText: { color: Colors.white, fontSize: 18, fontWeight: '800' },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xxl },
    footerText: { ...Typography.caption, color: '#64748B' },
    loginText: { color: Colors.primary, fontWeight: 'bold' },
});

export default SignUpScreen;