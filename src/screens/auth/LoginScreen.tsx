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

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both your email address and password.');
      return;
    }
    // Navigate to OTP or directly to create workspace
    navigation.navigate('OtpVerification', { email });
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert('SSO Authentication', `Authenticating with ${platform} Single Sign-On...`, [
      { text: 'OK', onPress: () => navigation.navigate('DashboardHome') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header branding */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to access your automated workspace pipelines.</Text>
        </View>

        {/* Input Fields Container */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. name@company.com"
              placeholderTextColor={COLORS.textLight}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter account password"
              placeholderTextColor={COLORS.textLight}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.togglePassword}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          </View>

          {/* Remember and Forgot options */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
              </View>
              <Text style={styles.checkboxText}>Remember Me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.submitButtonText}>Log In</Text>
              <Ionicons name="log-in-outline" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Biometrics quick option */}
          <TouchableOpacity style={styles.biometricButton}>
            <Ionicons name="finger-print" size={28} color={COLORS.secondary} />
            <Text style={styles.biometricText}>Quick login with Face ID / Touch ID</Text>
          </TouchableOpacity>
        </View>

        {/* Divider separator */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social SSO Grid */}
        <View style={styles.socialGrid}>
          <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocialLogin('Google')}>
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text style={styles.socialBtnText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocialLogin('GitHub')}>
            <Ionicons name="logo-github" size={20} color={COLORS.white} />
            <Text style={styles.socialBtnText}>GitHub</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocialLogin('Microsoft')}>
            <Ionicons name="logo-windows" size={20} color="#00A4EF" />
            <Text style={styles.socialBtnText}>Microsoft</Text>
          </TouchableOpacity>
        </View>

        {/* Footer links */}
        <View style={styles.footerRow}>
          <Text style={styles.footerLabel}>New to FlowPilot?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.footerAction}> Create Account</Text>
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
    marginBottom: 32,
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
  formContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    height: 52,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.white,
    fontSize: 15,
  },
  togglePassword: {
    padding: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  checkboxText: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  forgotText: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: '700',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    ...SHADOWS.medium,
  },
  gradientButton: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  biometricText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    marginHorizontal: 12,
    letterSpacing: 1,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    height: 48,
    marginHorizontal: 4,
  },
  socialBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  footerAction: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '800',
  },
});
