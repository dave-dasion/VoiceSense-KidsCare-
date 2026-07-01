import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function EmailVerificationScreen({ route, navigation }: any) {
  const { email } = route.params || { email: 'your-email@company.com' };
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;
    setTimer(59);
    setCanResend(false);
    Alert.alert('Verification Sent', `A new verification link has been dispatched to ${email}.`);
  };

  const handleVerifyCheck = () => {
    Alert.alert('Verification Successful', 'Your email has been verified.', [
      { text: 'Continue', onPress: () => navigation.navigate('DashboardHome') }
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

        {/* Vector Icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="mail-open-outline" size={48} color={COLORS.secondary} />
        </View>

        {/* Message */}
        <Text style={styles.title}>Verify your Email</Text>
        <Text style={styles.desc}>
          We sent a verification link to <Text style={styles.emailHighlight}>{email}</Text>. Click the link in your inbox to verify your account status.
        </Text>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.verifyBtn} onPress={handleVerifyCheck}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.verifyBtnText}>I've Verified My Email</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.white} style={{ marginLeft: 6 }} />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn't receive email? </Text>
            {canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Resend Link</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>Resend in {timer}s</Text>
            )}
          </View>
        </View>

        {/* Edit Email option */}
        <TouchableOpacity style={styles.changeEmailBtn} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.changeEmailText}>Change Email Address</Text>
        </TouchableOpacity>
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
  emailHighlight: {
    color: COLORS.white,
    fontWeight: '700',
  },
  actionsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  verifyBtn: {
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
  verifyBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  resendLink: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: '700',
  },
  timerText: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  changeEmailBtn: {
    padding: 8,
  },
  changeEmailText: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
