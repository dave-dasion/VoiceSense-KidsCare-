import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
    ScrollView, StatusBar, Dimensions
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '../../../components';

const { width } = Dimensions.get('window');

const ConsentScreen = () => {
    const navigation = useNavigation<any>();

    // Original Logic Preserved
    const [consents, setConsents] = useState({
        screening: false,
        dataUsage: false,
        diagnosis: false,
        voiceStorage: false,
    });

    const canContinue = consents.screening && consents.dataUsage && consents.diagnosis;

    const toggleConsent = (key: keyof typeof consents) => {
        setConsents({ ...consents, [key]: !consents[key] });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Simple Top Navigation */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
                    <Ionicons name="chevron-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <View style={styles.progressTrack}>
                    <View style={[styles.progressBar, { width: '60%' }]} />
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Avatar size={64} emoji="⚖️" style={{ marginBottom: 16, backgroundColor: '#EEF2FF', borderWidth: 0 }} />
                    <Text style={styles.title}>Parental Consent</Text>
                    <Text style={styles.subtitle}>
                        We value your privacy. Please review our safety commitments and accept to continue.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionLabel}>REQUIRED AGREEMENTS</Text>

                    {/* Screening Consent */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.consentItem, consents.screening && styles.activeItem]}
                        onPress={() => toggleConsent('screening')}
                    >
                        <Ionicons
                            name={consents.screening ? "checkmark-circle" : "ellipse-outline"}
                            size={26}
                            color={consents.screening ? "#10B981" : "#CBD5E1"}
                        />
                        <Text style={[styles.consentText, consents.screening && styles.activeText]}>
                            I accept the screening process and methodology.
                        </Text>
                    </TouchableOpacity>

                    {/* Data Usage */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.consentItem, consents.dataUsage && styles.activeItem]}
                        onPress={() => toggleConsent('dataUsage')}
                    >
                        <Ionicons
                            name={consents.dataUsage ? "checkmark-circle" : "ellipse-outline"}
                            size={26}
                            color={consents.dataUsage ? "#10B981" : "#CBD5E1"}
                        />
                        <Text style={[styles.consentText, consents.dataUsage && styles.activeText]}>
                            I agree to the data usage policy for personalized reports.
                        </Text>
                    </TouchableOpacity>

                    {/* Diagnosis Disclaimer */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.consentItem, consents.diagnosis && styles.activeItem]}
                        onPress={() => toggleConsent('diagnosis')}
                    >
                        <Ionicons
                            name={consents.diagnosis ? "checkmark-circle" : "ellipse-outline"}
                            size={26}
                            color={consents.diagnosis ? "#10B981" : "#CBD5E1"}
                        />
                        <Text style={[styles.consentText, consents.diagnosis && styles.activeText]}>
                            I understand this app is <Text style={{ fontWeight: '800' }}>NOT</Text> a clinical diagnosis tool.
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <Text style={styles.sectionLabel}>OPTIONAL</Text>

                    {/* Voice Storage - Optional */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.consentItem, styles.optionalItem, consents.voiceStorage && styles.activeOptional]}
                        onPress={() => toggleConsent('voiceStorage')}
                    >
                        <Ionicons
                            name={consents.voiceStorage ? "add-circle" : "radio-button-off"}
                            size={26}
                            color={consents.voiceStorage ? Colors.primary : "#94A3B8"}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.consentText, { marginBottom: 2 }]}>Enable voice storage</Text>
                            <Text style={styles.subtext}>Allows us to track progress and improve accuracy over time.</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Continue Button - Logic Maintained */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.continueButton, !canContinue && styles.disabledButton]}
                    disabled={!canContinue}
                    onPress={() => navigation.navigate('AddChild')}
                >
                    <LinearGradient
                        colors={!canContinue ? ['#CBD5E1', '#CBD5E1'] : [Colors.primary, '#4F46E5']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    >
                        <Text style={styles.continueButtonText}>I Accept & Continue</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.white} />
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.safetyNote}>
                    <Ionicons name="lock-closed" size={12} /> Your data is encrypted and stored securely.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 60,
        gap: 20,
    },
    backCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.light,
    },
    progressTrack: {
        flex: 1,
        height: 6,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 3,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginVertical: 30,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 22,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        ...Typography.header,
        fontSize: 28,
        textAlign: 'center',
        color: '#1E293B',
    },
    subtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 22,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 20,
        ...Shadows.medium,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 16,
        marginLeft: 4,
    },
    consentItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    activeItem: {
        backgroundColor: '#F0FDF4',
        borderColor: '#DCFCE7',
    },
    activeText: {
        color: '#166534',
        fontWeight: '500',
    },
    optionalItem: {
        backgroundColor: '#F1F5F9',
    },
    activeOptional: {
        backgroundColor: '#EEF2FF',
        borderColor: '#E0E7FF',
    },
    consentText: {
        ...Typography.body,
        flex: 1,
        fontSize: 15,
        color: '#475569',
        lineHeight: 20,
    },
    subtext: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 20,
    },
    continueButton: {
        marginTop: 30,
        borderRadius: 18,
        overflow: 'hidden',
        ...Shadows.medium,
    },
    gradient: {
        flexDirection: 'row',
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    disabledButton: {
        opacity: 0.5,
        elevation: 0,
    },
    continueButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '800',
    },
    safetyNote: {
        textAlign: 'center',
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 20,
    }
});

export default ConsentScreen;