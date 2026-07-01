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

export default function ResetPasswordScreen({ navigation }: any) {
  const { resetPassword, isLoading } = useAuth();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  const handleResetPassword = async () => {
    if (!token || !newPassword || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    const success = await resetPassword(token, newPassword);
    if (success) {
      navigation.navigate('Login');
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
          <Text style={styles.title}>New Password</Text>
          <Text style={styles.subtitle}>Enter verification code and set your new account password</Text>
        </View>

        {/* Input Form */}
        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Verification Code</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="key-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter 6-digit code"
              placeholderTextColor={COLORS.textLight}
              value={token}
              onChangeText={setToken}
              keyboardType="number-pad"
              maxLength={6}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="••••••••"
              placeholderTextColor={COLORS.textLight}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={secureText}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setSecureText(!secureText)}>
              <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Confirm New Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="••••••••"
              placeholderTextColor={COLORS.textLight}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={secureConfirmText}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setSecureConfirmText(!secureConfirmText)}>
              <Ionicons name={secureConfirmText ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>

          {/* Reset Button */}
          <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword} disabled={isLoading}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.resetButtonText}>Update Password</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Cancel */}
          <View style={styles.loginContainer}>
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center' }} 
              onPress={() => navigation.navigate('Login')}
            >
              <Ionicons name="arrow-back-outline" size={16} color={COLORS.secondary} style={{ marginRight: 4 }} />
              <Text style={styles.loginLink}>Cancel & Return to Login</Text>
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
    marginBottom: 20,
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
  eyeButton: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  resetButton: {
    height: 52,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    ...SHADOWS.light,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    color: COLORS.white,
    fontSize: 16,
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
