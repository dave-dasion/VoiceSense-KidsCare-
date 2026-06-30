import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
    TextInput, Animated, Dimensions, Alert,
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from '../../../components';

const { width } = Dimensions.get('window');
const CODE_LENGTH = 6;

const OtpVerifyScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const email = route.params?.email || 'your@email.com';

    const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
    const [timer, setTimer] = useState(59);
    const [canResend, setCanResend] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((t) => {
                if (t <= 1) { setCanResend(true); clearInterval(interval); return 0; }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleInput = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text.replace(/[^0-9]/g, '').slice(-1);
        setCode(newCode);
        if (text && index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const enteredCode = code.join('');
        if (enteredCode.length < CODE_LENGTH) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
            return;
        }
        setVerifying(true);
        // Simulate verification
        setTimeout(() => {
            setVerifying(false);
            navigation.navigate('Consent');
        }, 1500);
    };

    const handleResend = () => {
        if (!canResend) return;
        setTimer(59);
        setCanResend(false);
        setCode(Array(CODE_LENGTH).fill(''));
        Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
    };

    const isFilled = code.every((c) => c !== '');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inner}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>

                <View style={styles.iconWrapper}>
                    <Avatar size={100} emoji="✉️" style={{ backgroundColor: '#eef2ff', borderWidth: 0 }} />
                </View>

                <Text style={styles.title}>Check Your Email</Text>
                <Text style={styles.subtitle}>
                    We sent a 6-digit code to{'\n'}
                    <Text style={styles.email}>{email}</Text>
                </Text>

                <Animated.View style={[styles.codeRow, { transform: [{ translateX: shakeAnim }] }]}>
                    {Array(CODE_LENGTH).fill(0).map((_, i) => (
                        <TextInput
                            key={i}
                            ref={(ref) => (inputRefs.current[i] = ref)}
                            style={[styles.codeBox, code[i] ? styles.codeBoxFilled : {}]}
                            maxLength={1}
                            keyboardType="number-pad"
                            value={code[i]}
                            onChangeText={(t) => handleInput(t, i)}
                            onKeyPress={(e) => handleKeyPress(e, i)}
                            selectionColor={Colors.primary}
                        />
                    ))}
                </Animated.View>

                <TouchableOpacity
                    style={[styles.verifyBtn, !isFilled && styles.verifyBtnDisabled]}
                    onPress={handleVerify}
                    disabled={!isFilled || verifying}
                >
                    {verifying
                        ? <Text style={styles.verifyBtnText}>Verifying...</Text>
                        : <Text style={styles.verifyBtnText}>Verify Code</Text>}
                </TouchableOpacity>

                <View style={styles.resendRow}>
                    <Text style={styles.resendLabel}>Didn't receive it? </Text>
                    {canResend
                        ? <TouchableOpacity onPress={handleResend}><Text style={styles.resendActive}>Resend Code</Text></TouchableOpacity>
                        : <Text style={styles.resendTimer}>Resend in {timer}s</Text>}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    inner: { flex: 1, padding: Spacing.xl, paddingTop: Spacing.lg },
    backBtn: { alignSelf: 'flex-start', padding: Spacing.sm },
    iconWrapper: {
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center',
        alignSelf: 'center', marginVertical: Spacing.xxl,
    },
    title: { ...Typography.header, textAlign: 'center' },
    subtitle: { ...Typography.body, textAlign: 'center', color: Colors.textLight, marginTop: Spacing.sm },
    email: { color: Colors.primary, fontWeight: 'bold' },
    codeRow: {
        flexDirection: 'row', justifyContent: 'center',
        gap: 12, marginTop: Spacing.xxl, marginBottom: Spacing.xl,
    },
    codeBox: {
        width: 48, height: 60, borderRadius: 14,
        borderWidth: 2, borderColor: '#e2e8f0',
        backgroundColor: Colors.surface, textAlign: 'center',
        fontSize: 22, fontWeight: 'bold', color: Colors.text,
    },
    codeBoxFilled: { borderColor: Colors.primary, backgroundColor: '#eef2ff' },
    verifyBtn: {
        backgroundColor: Colors.primary, padding: Spacing.lg + 4,
        borderRadius: 16, alignItems: 'center', ...Shadows.medium,
    },
    verifyBtnDisabled: { backgroundColor: '#c7d2fe' },
    verifyBtnText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
    resendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
    resendLabel: { ...Typography.body, color: Colors.textLight },
    resendActive: { color: Colors.primary, fontWeight: 'bold' },
    resendTimer: { color: Colors.textLight },
});

export default OtpVerifyScreen;
