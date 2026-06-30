import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
    Dimensions, StatusBar
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const RoleSelectionScreen = () => {
    const navigation = useNavigation<any>();

    const handleRoleSelect = (role: string) => {
        if (role === 'Parent') {
            navigation.navigate('Login');
        } else if (role === 'Kid') {
            navigation.navigate('KidLogin');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Decorative Background Element */}
            <View style={styles.bgCircle} />

            <View style={styles.content}>
                <View style={styles.headerSection}>
                    <Text style={styles.header}>Hi there!</Text>
                    <Text style={styles.subtitle}>Choose your adventure for today!</Text>
                </View>

                <View style={styles.rolesContainer}>
                    {/* Kid Role Card */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[styles.roleCard, { borderColor: '#FFA07A', borderWidth: 2 }]}
                        onPress={() => handleRoleSelect('Kid')}
                    >
                        <LinearGradient
                            colors={['#FFF9F5', '#FFF0E6']}
                            style={styles.cardGradient}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: '#FFE4E1' }]}>
                                <Ionicons name="game-controller" size={32} color="#FF6347" />
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={[styles.roleTitle, { color: '#FF4500' }]}>Kid Mode</Text>
                                <Text style={styles.roleDescription}>
                                    Play fun games and explore new worlds!
                                </Text>
                            </View>

                            <View style={[styles.arrowCircle, { backgroundColor: '#FFDAB9' }]}>
                                <Ionicons name="sparkles" size={20} color="#FF6347" />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Parent Role Card */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.roleCard}
                        onPress={() => handleRoleSelect('Parent')}
                    >
                        <LinearGradient
                            colors={['#FFFFFF', '#F8FAFC']}
                            style={styles.cardGradient}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: '#EEF2FF' }]}>
                                <Ionicons name="people" size={32} color={Colors.primary} />
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={styles.roleTitle}>Parent</Text>
                                <Text style={styles.roleDescription}>
                                    Manage child profiles and view reports
                                </Text>
                            </View>

                            <View style={styles.arrowCircle}>
                                <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Clinician Role Card (Locked) */}
                    <View style={[styles.roleCard, styles.disabledCard]}>
                        <View style={styles.cardGradient}>
                            <View style={[styles.iconContainer, { backgroundColor: '#F1F5F9' }]}>
                                <Ionicons name="medical" size={32} color="#94A3B8" />
                            </View>

                            <View style={styles.textContainer}>
                                <View style={styles.lockedHeaderRow}>
                                    <Text style={[styles.roleTitle, { color: '#94A3B8' }]}>Clinician</Text>
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>SOON</Text>
                                    </View>
                                </View>
                                <Text style={[styles.roleDescription, { color: '#94A3B8' }]}>
                                    Diagnostic tools and management
                                </Text>
                            </View>

                            <Ionicons name="lock-closed" size={22} color="#CBD5E1" />
                        </View>
                    </View>
                </View>

                <View style={[styles.footer, { marginTop: 20 }]}>
                    <Ionicons name="heart" size={16} color="#FF69B4" />
                    <Text style={styles.footerText}>Made for happy faces</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC', // Slightly off-white for modern feel
    },
    bgCircle: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: '#EEF2FF',
        top: -width * 0.2,
        right: -width * 0.2,
        opacity: 0.5,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    headerSection: {
        marginTop: 60,
        marginBottom: 40,
    },
    header: {
        ...Typography.header,
        fontSize: 40,
        fontWeight: '900',
        color: '#1E293B',
        letterSpacing: -1,
    },
    subtitle: {
        ...Typography.caption,
        fontSize: 18,
        color: '#64748B',
        marginTop: 8,
        lineHeight: 24,
    },
    rolesContainer: {
        gap: 20,
        flex: 1,
    },
    roleCard: {
        borderRadius: 24,
        overflow: 'hidden',
        ...Shadows.medium,
        backgroundColor: Colors.white,
    },
    cardGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
    },
    disabledCard: {
        opacity: 0.7,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
        paddingRight: 8,
    },
    roleTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 4,
    },
    lockedHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    roleDescription: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
        fontWeight: '500',
    },
    arrowCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#E2E8F0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#64748B',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    footerText: {
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: '600',
    },
});

export default RoleSelectionScreen;