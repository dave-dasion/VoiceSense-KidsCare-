import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
    ScrollView, KeyboardAvoidingView, Platform, TextInput,
    Animated, StatusBar, ActivityIndicator
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '../../../components';

const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Other'];

const LoginScreen = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [country, setCountry] = useState('United States');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [loading, setLoading] = useState(false);

    // Animation for smooth dropdown appearance
    const dropdownAnim = useRef(new Animated.Value(0)).current;

    const toggleCountryPicker = () => {
        const toValue = showCountryPicker ? 0 : 1;
        setShowCountryPicker(!showCountryPicker);
        Animated.timing(dropdownAnim, {
            toValue,
            duration: 300,
            useNativeDriver: false, // Height/Opacity for layout shift
        }).start();
    };

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('OtpVerify', { email });
        }, 1500);
    };

    const getBorderColor = (fieldName: string) =>
        focusedField === fieldName ? Colors.primary : '#E2E8F0';

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Back Header */}
                    <View style={styles.navHeader}>
                        <TouchableOpacity
                            style={styles.backBtnCircle}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="chevron-back" size={24} color={Colors.text} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.header}>
                        <Avatar size={88} emoji="🔒" style={{ marginBottom: 20 }} rounded={false} />
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Secure access for your child's safety</Text>
                    </View>

                    <View style={styles.form}>
                        {/* Email Field */}
                        <View style={styles.field}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={[styles.inputRow, { borderColor: getBorderColor('email') }]}>
                                <Ionicons name="mail" size={20} color={focusedField === 'email' ? Colors.primary : Colors.textLight} style={styles.inputIcon} />
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

                        {/* Password Field */}
                        <View style={styles.field}>
                            <Text style={styles.label}>Password</Text>
                            <View style={[styles.inputRow, { borderColor: getBorderColor('password') }]}>
                                <Ionicons name="lock-closed" size={20} color={focusedField === 'password' ? Colors.primary : Colors.textLight} style={styles.inputIcon} />
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChangeText={setPassword}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    secureTextEntry={!showPassword}
                                    placeholderTextColor="#94A3B8"
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={Colors.textLight} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Country Selection */}
                        <View style={styles.field}>
                            <Text style={styles.label}>Region (for localized support)</Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={[styles.inputRow, { borderColor: showCountryPicker ? Colors.primary : '#E2E8F0' }]}
                                onPress={toggleCountryPicker}
                            >
                                <Ionicons name="location" size={20} color={showCountryPicker ? Colors.primary : Colors.textLight} style={styles.inputIcon} />
                                <Text style={[styles.inputText, { flex: 1, color: Colors.text }]}>{country}</Text>
                                <Ionicons name={showCountryPicker ? 'chevron-up' : 'chevron-down'} size={20} color={Colors.textLight} />
                            </TouchableOpacity>

                            {showCountryPicker && (
                                <Animated.View style={[styles.dropdown, { opacity: dropdownAnim }]}>
                                    {countries.map((c) => (
                                        <TouchableOpacity
                                            key={c}
                                            style={[styles.dropdownItem, country === c && styles.dropdownItemSelected]}
                                            onPress={() => { setCountry(c); toggleCountryPicker(); }}
                                        >
                                            <Text style={[styles.dropdownText, country === c && styles.dropdownTextSelected]}>{c}</Text>
                                            {country === c && <Ionicons name="checkmark-circle" size={18} color={Colors.primary} />}
                                        </TouchableOpacity>
                                    ))}
                                </Animated.View>
                            )}
                        </View>

                        <TouchableOpacity style={styles.forgotRow}>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Action Button */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[styles.loginBtn, (!email || !password) && styles.loginBtnDisabled]}
                            onPress={handleLogin}
                            disabled={!email || !password || loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={Colors.white} />
                            ) : (
                                <>
                                    <Text style={styles.loginBtnText}>Sign In</Text>
                                    <Ionicons name="arrow-forward" size={20} color={Colors.white} />
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>New to VoiceSense? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.footerLink}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    scroll: { paddingHorizontal: 24, paddingBottom: 40 },
    navHeader: { marginTop: 10, marginBottom: 20 },
    backBtnCircle: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center',
        ...Shadows.light,
    },
    header: { alignItems: 'center', marginBottom: 40 },
    logoBox: {
        width: 88, height: 88, borderRadius: 28,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 20, ...Shadows.medium,
    },
    title: { ...Typography.header, fontSize: 32, fontWeight: '800', color: '#1E293B' },
    subtitle: { ...Typography.caption, fontSize: 16, color: '#64748B', marginTop: 6 },
    form: { gap: 20 },
    field: { gap: 8 },
    label: { fontSize: 14, fontWeight: '700', color: '#475569', marginLeft: 4 },
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: Colors.white, borderRadius: 16,
        borderWidth: 1.5, paddingHorizontal: 16,
        height: 60, ...Shadows.light,
    },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, fontSize: 16, color: Colors.text, fontWeight: '500' },
    inputText: { fontSize: 16, fontWeight: '500' },
    dropdown: {
        backgroundColor: Colors.white, borderRadius: 16, marginTop: 8,
        padding: 8, ...Shadows.medium, borderWidth: 1, borderColor: '#F1F5F9',
    },
    dropdownItem: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        padding: 14, borderRadius: 12
    },
    dropdownItemSelected: { backgroundColor: '#F1F5F9' },
    dropdownText: { fontSize: 15, color: '#475569' },
    dropdownTextSelected: { color: Colors.primary, fontWeight: '700' },
    forgotRow: { alignSelf: 'flex-end', marginTop: -10 },
    forgotText: { color: Colors.primary, fontWeight: '700', fontSize: 14 },
    loginBtn: {
        backgroundColor: Colors.primary, flexDirection: 'row',
        height: 60, borderRadius: 18,
        alignItems: 'center', justifyContent: 'center', gap: 10,
        marginTop: 10, ...Shadows.medium,
    },
    loginBtnDisabled: { backgroundColor: '#CBD5E1', elevation: 0, shadowOpacity: 0 },
    loginBtnText: { color: Colors.white, fontSize: 18, fontWeight: '800' },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
    footerText: { fontSize: 15, color: '#64748B' },
    footerLink: { color: Colors.primary, fontWeight: '800', fontSize: 15 },
});

export default LoginScreen;