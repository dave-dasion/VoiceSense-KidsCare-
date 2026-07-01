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

export default function SignUpScreen({ navigation }: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', color: '#64748B', width: '0%' };
    if (password.length < 6) return { label: 'Weak', color: '#EF4444', width: '25%' };
    if (password.length < 10) return { label: 'Medium', color: '#F59E0B', width: '60%' };
    return { label: 'Strong', color: '#10B981', width: '100%' };
  };

  const handleSignUp = () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Validation Error', 'First Name, Last Name, Email, and Password are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      Alert.alert('Validation Error', 'You must accept the Terms of Service & Privacy Policy.');
      return;
    }

    // Go to Email Verification
    navigation.navigate('EmailVerification', { email });
  };

  const strength = getPasswordStrength();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start orchestrating workflows and managing your automation team.</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.rowFields}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.inputShort}
                placeholder="First name"
                placeholderTextColor={COLORS.textLight}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.inputShort}
                placeholder="Last name"
                placeholderTextColor={COLORS.textLight}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. name@company.com"
            placeholderTextColor={COLORS.textLight}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+1 (555) 000-0000"
            placeholderTextColor={COLORS.textLight}
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />

          <View style={styles.rowFields}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Company Name</Text>
              <TextInput
                style={styles.inputShort}
                placeholder="e.g. Acme Corp"
                placeholderTextColor={COLORS.textLight}
                value={company}
                onChangeText={setCompany}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.label}>Job Title</Text>
              <TextInput
                style={styles.inputShort}
                placeholder="e.g. DevOps Lead"
                placeholderTextColor={COLORS.textLight}
                value={jobTitle}
                onChangeText={setJobTitle}
              />
            </View>
          </View>

          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="Min. 8 characters"
            placeholderTextColor={COLORS.textLight}
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthHeader}>
                <Text style={styles.strengthLabel}>Password Strength:</Text>
                <Text style={[styles.strengthValue, { color: strength.color }]}>{strength.label}</Text>
              </View>
              <View style={styles.strengthBarBg}>
                <View style={[styles.strengthBarActive, { backgroundColor: strength.color, width: strength.width as any }]} />
              </View>
            </View>
          )}

          <Text style={styles.label}>Confirm Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor={COLORS.textLight}
            secureTextEntry
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Terms checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
              {agreeTerms && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
            </View>
            <Text style={styles.checkboxText}>
              I accept the Terms of Service & Privacy Policy.
            </Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.submitButtonText}>Create Account</Text>
              <Ionicons name="arrow-forward-outline" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
          <Text style={styles.footerLabel}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerAction}> Log In</Text>
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
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
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
    marginBottom: 16,
  },
  rowFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    height: 52,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.white,
    marginBottom: 16,
  },
  inputShort: {
    height: 52,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.white,
    marginBottom: 16,
  },
  strengthContainer: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  strengthLabel: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  strengthValue: {
    fontSize: 11,
    fontWeight: '700',
  },
  strengthBarBg: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthBarActive: {
    height: '100%',
    borderRadius: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 2,
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
  submitButton: {
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
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
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
