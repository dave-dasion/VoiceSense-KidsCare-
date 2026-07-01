import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResetPasswordScreen({ route, navigation }: any) {
  const { destination } = route.params || { destination: 'your-account' };
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Requirements check helper
  const checkRequirement = (regex: RegExp) => regex.test(password);

  const reqs = [
    { label: 'Minimum 8 characters', met: password.length >= 8 },
    { label: 'At least one uppercase letter', met: checkRequirement(/[A-Z]/) },
    { label: 'At least one lowercase letter', met: checkRequirement(/[a-z]/) },
    { label: 'At least one numerical digit', met: checkRequirement(/[0-9]/) },
    { label: 'At least one special character', met: checkRequirement(/[^A-Za-z0-9]/) },
  ];

  const handleResetPassword = () => {
    const allMet = reqs.every((r) => r.met);
    if (!allMet) {
      Alert.alert('Validation Error', 'Password does not meet all secure complexity requirements.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Confirm password does not match.');
      return;
    }

    Alert.alert('Password Updated', 'Your account credentials have been successfully updated.', [
      { text: 'Log In Now', onPress: () => navigation.navigate('Login') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.desc}>
          Configure your new credentials for <Text style={styles.highlight}>{destination}</Text>. Ensure it meets the security matrix below.
        </Text>

        {/* Inputs */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Min. 8 characters"
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

          {/* Requirements Checklist */}
          <View style={styles.checklistContainer}>
            {reqs.map((req, index) => (
              <View key={index} style={styles.checkRow}>
                <Ionicons
                  name={req.met ? 'checkmark-circle' : 'ellipse-outline'}
                  size={15}
                  color={req.met ? COLORS.success : COLORS.textLight}
                  style={styles.checkIcon}
                />
                <Text style={[styles.checkText, req.met && styles.checkTextMet]}>{req.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Re-enter password"
              placeholderTextColor={COLORS.textLight}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Reset Trigger */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleResetPassword}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.submitBtnText}>Update Password</Text>
              <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    fontFamily: FONTS.black,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  desc: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 22,
    marginBottom: 28,
    alignSelf: 'flex-start',
  },
  highlight: {
    color: COLORS.white,
    fontWeight: '700',
  },
  formContainer: {
    width: '100%',
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
  checklistContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  checkIcon: {
    marginRight: 8,
  },
  checkText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  checkTextMet: {
    color: COLORS.white,
    fontWeight: '600',
  },
  submitBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
    ...SHADOWS.medium,
  },
  gradientButton: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
