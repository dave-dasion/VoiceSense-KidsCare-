import React, { useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert,
    Animated, Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
import { Avatar } from '../../../components';

const EscalationScreen = () => {
    const navigation = useNavigation<any>();
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const handleCrisisCall = () => {
        Alert.alert(
            'Calling Crisis Line',
            'This will connect you to the National Crisis Helpline (988). Do you want to proceed?',
            [{ text: 'Call Now', onPress: () => { } }, { text: 'Cancel', style: 'cancel' }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inner}>
                {/* Pulsing Alert Icon */}
                <Animated.View style={[styles.alertRing, { transform: [{ scale: pulseAnim }] }]}>
                    <Avatar size={100} emoji="🦁" style={{ backgroundColor: '#ef4444', borderWidth: 0 }} />
                </Animated.View>

                <Text style={styles.title}>We're Here With You</Text>
                <Text style={styles.message}>
                    It sounds like you might be having a really tough time.{'\n'}
                    That's okay — we want to help you get support.
                </Text>

                {/* Safety Script */}
                <View style={styles.scriptBox}>
                    <Text style={styles.scriptTitle}>💬 A message for you:</Text>
                    <Text style={styles.scriptText}>
                        "You are safe. You are loved. You are not alone.{'\n'}
                        A trusted adult is being notified right now."
                    </Text>
                </View>

                {/* Crisis Number */}
                <View style={styles.crisisCard}>
                    <Ionicons name="call" size={28} color={Colors.white} />
                    <View>
                        <Text style={styles.crisisLabel}>National Crisis Line (USA)</Text>
                        <Text style={styles.crisisNumber}>988</Text>
                    </View>
                    <TouchableOpacity style={styles.callBtn} onPress={handleCrisisCall}>
                        <Text style={styles.callBtnText}>Call</Text>
                    </TouchableOpacity>
                </View>

                {/* Parent Notification */}
                <View style={styles.notifyBox}>
                    <Ionicons name="notifications" size={20} color={Colors.success} />
                    <Text style={styles.notifyText}>Your parent/guardian has been notified.</Text>
                </View>

                {/* Logged */}
                <View style={styles.loggedBox}>
                    <Ionicons name="shield-checkmark" size={16} color={Colors.textLight} />
                    <Text style={styles.loggedText}>This session has been flagged and securely logged.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#7f1d1d' },
    inner: {
        flex: 1, padding: Spacing.xl,
        justifyContent: 'center', alignItems: 'center',
    },
    alertRing: {
        width: 180, height: 180, borderRadius: 90,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    alertCircle: {
        width: 130, height: 130, borderRadius: 65,
        backgroundColor: '#ef4444',
        justifyContent: 'center', alignItems: 'center',
    },
    title: {
        fontSize: 32, fontWeight: 'bold',
        color: Colors.white, textAlign: 'center',
        marginBottom: Spacing.md,
    },
    message: {
        fontSize: 18, color: 'rgba(255,255,255,0.85)',
        textAlign: 'center', lineHeight: 28,
        marginBottom: Spacing.xl,
    },
    scriptBox: {
        backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20,
        padding: Spacing.xl, width: '100%', marginBottom: Spacing.xl,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
    scriptTitle: { color: Colors.white, fontWeight: 'bold', marginBottom: 8, fontSize: 16 },
    scriptText: { color: 'rgba(255,255,255,0.9)', lineHeight: 26, fontSize: 16 },
    crisisCard: {
        backgroundColor: Colors.error, width: '100%', borderRadius: 20,
        padding: Spacing.xl, flexDirection: 'row', alignItems: 'center',
        gap: Spacing.md, marginBottom: Spacing.lg,
    },
    crisisLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
    crisisNumber: { color: Colors.white, fontSize: 32, fontWeight: 'bold' },
    callBtn: {
        marginLeft: 'auto', backgroundColor: Colors.white,
        paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12,
    },
    callBtnText: { color: Colors.error, fontWeight: 'bold', fontSize: 16 },
    notifyBox: {
        flexDirection: 'row', alignItems: 'center', gap: 8,
        backgroundColor: 'rgba(16, 185, 129, 0.2)', padding: Spacing.md,
        borderRadius: 14, width: '100%', marginBottom: Spacing.md,
    },
    notifyText: { color: '#6ee7b7', fontWeight: '600' },
    loggedBox: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
    },
    loggedText: { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
});

export default EscalationScreen;
