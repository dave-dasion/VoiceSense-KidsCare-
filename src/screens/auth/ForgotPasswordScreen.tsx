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

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'phone'>('email');
  const [phone, setPhone] = useState('');

  const handleSendReset = () => {
    const destination = recoveryMethod === 'email' ? email : phone;
    if (!destination) {
      Alert.alert('Validation Error', `Please fill out your ${recoveryMethod === 'email' ? 'email address' : 'mobile number'}.`);
      return;
    }

    Alert.alert(
      'Recovery Dispatched',
      `We sent a secure recovery reference code to ${destination}.`,
      [{ text: 'Continue', onPress: () => navigation.navigate('ResetPassword', { destination }) }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        {/* Vector Icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="key-outline" size={48} color={COLORS.secondary} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.desc}>
          Select your preferred recovery channel. We'll send an instructions payload to reset your account.
        </Text>

        {/* Selector Buttons */}
        <View style={styles.selectorRow}>
          <TouchableOpacity
            style={[styles.selectorBtn, recoveryMethod === 'email' && styles.selectorActive]}
            onPress={() => setRecoveryMethod('email')}
          >
            <Ionicons name="mail" size={16} color={recoveryMethod === 'email' ? COLORS.white : COLORS.textLight} />
            <Text style={[styles.selectorText, recoveryMethod === 'email' && styles.selectorActiveText]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectorBtn, recoveryMethod === 'phone' && styles.selectorActive]}
            onPress={() => setRecoveryMethod('phone')}
          >
            <Ionicons name="call" size={16} color={recoveryMethod === 'phone' ? COLORS.white : COLORS.textLight} />
            <Text style={[styles.selectorText, recoveryMethod === 'phone' && styles.selectorActiveText]}>SMS</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Inputs */}
        <View style={styles.formContainer}>
          {recoveryMethod === 'email' ? (
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
          ) : (
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. +1 (555) 000-0000"
                placeholderTextColor={COLORS.textLight}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          )}

          {/* Action Trigger */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSendReset}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.submitBtnText}>Send Recovery Code</Text>
              <Ionicons name="paper-plane-outline" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
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
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    fontFamily: FONTS.black,
    marginBottom: 12,
  },
  desc: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  selectorRow: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 4,
    marginBottom: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectorBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectorActive: {
    backgroundColor: COLORS.secondary,
    ...SHADOWS.light,
  },
  selectorText: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '700',
    marginLeft: 6,
  },
  selectorActiveText: {
    color: COLORS.white,
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
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
  submitBtn: {
    borderRadius: 12,
    overflow: 'hidden',
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
