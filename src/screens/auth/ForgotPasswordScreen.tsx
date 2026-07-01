import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }: any) {
  const { forgotPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const handleSendCode = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    const code = await forgotPassword(email);
    if (code) {
      setGeneratedCode(code);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Brand Header */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../assets/images/LOGO_blue.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your email to receive a password reset verification code</Text>
        </View>

        {/* Input Form */}
        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="name@example.com"
              placeholderTextColor={COLORS.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.sendButton} onPress={handleSendCode} disabled={isLoading}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.sendButtonText}>Send Reset Code</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Success Message & Next Steps */}
          {generatedCode && (
            <View style={styles.codeAlert}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Ionicons name="mail-open-outline" size={20} color="#22543D" style={{ marginRight: 6 }} />
                <Text style={styles.codeAlertTitle}>Mock Email Sent!</Text>
              </View>
              <Text style={styles.codeAlertText}>
                We sent a simulation code to your email.
              </Text>
              <View style={styles.codeContainer}>
                <Text style={styles.codeValue}>{generatedCode}</Text>
              </View>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => navigation.navigate('ResetPassword')}
              >
                <Text style={styles.resetButtonText}>Proceed to Reset Password</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Back to Login */}
          <View style={styles.loginContainer}>
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center' }} 
              onPress={() => navigation.navigate('Login')}
            >
              <Ionicons name="arrow-back-outline" size={16} color={COLORS.secondary} style={{ marginRight: 4 }} />
              <Text style={styles.loginLink}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoImage: {
    width: 90,
    height: 90,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.black,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 20,
    fontFamily: FONTS.regular,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    ...SHADOWS.medium,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 52,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: COLORS.textDark,
  },
  sendButton: {
    height: 52,
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  codeAlert: {
    backgroundColor: '#F0FFF4',
    borderWidth: 1,
    borderColor: '#C6F6D5',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  codeAlertTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#22543D',
    marginBottom: 4,
  },
  codeAlertText: {
    fontSize: 12,
    color: '#2F855A',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
  },
  codeContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C6F6D5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  codeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#276749',
    letterSpacing: 2,
  },
  resetButton: {
    backgroundColor: '#2F855A',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
  },
  resetButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
  },
});
