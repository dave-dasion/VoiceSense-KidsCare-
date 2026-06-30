import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
    Image, Dimensions, StatusBar
} from 'react-native';
import { Colors, Shadows, Typography } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '../../../components';

const { width, height } = Dimensions.get('window');

const KidLoginScreen = () => {
    const navigation = useNavigation<any>();

    const children = [
        {
            id: '1',
            name: 'Charlie',
            emoji: '�',
            avatar: require('../../../../assets/kids/charlie_avatar.png'),
            screen: 'CharlieWorld',
            gradient: ['#6366f1', '#8b5cf6'] as any,
            tag: 'Games & Fun!',
        },
        {
            id: '2',
            name: 'Luna',
            emoji: '🦄',
            avatar: require('../../../../assets/kids/luna_avatar.png'),
            screen: 'LunaVoiceSense',
            gradient: ['#ec4899', '#a855f7'] as any,
            tag: 'Voice & Magic!',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.heroSection}>
                <Image
                    source={require('../../../../assets/kids/login_hero.png')}
                    style={styles.heroImage}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', '#F8FAFC']}
                    style={styles.heroOverlay}
                />
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Ready to Play?</Text>
                    <Text style={styles.subtitle}>Choose your character to start your adventure!</Text>
                </View>

                <View style={styles.childGrid}>
                    {children.map((child) => (
                        <TouchableOpacity
                            key={child.id}
                            style={styles.childCard}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate(child.screen)}
                        >
                            <LinearGradient colors={child.gradient} style={styles.cardGlow}>
                                <View style={styles.avatarWrapper}>
                                    <Image source={child.avatar} style={styles.avatarImage} />
                                </View>
                            </LinearGradient>
                            <View style={{ alignItems: 'center', padding: 12 }}>
                                <Text style={styles.childName}>{child.name}</Text>
                                <View style={styles.playBadge}>
                                    <Text style={styles.playText}>{child.tag}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {/* <TouchableOpacity
                        style={[styles.childCard, styles.addCard]}
                        onPress={() => navigation.navigate('AddChild')}
                    >
                        <View style={styles.addCircle}>
                            <Ionicons name="add" size={40} color="#94A3B8" />
                        </View>
                        <Text style={[styles.childName, { color: '#94A3B8' }]}>Add New</Text>
                    </TouchableOpacity> */}
                </View>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('RoleSelection')}
                >
                    <Ionicons name="arrow-back" size={20} color="#64748B" />
                    <Text style={styles.backText}>Switch Mode</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    heroSection: {
        width: '100%',
        height: height * 0.4,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: -40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#1E293B',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 8,
        fontWeight: '500',
    },
    childGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    childCard: {
        width: (width - 68) / 2,
        backgroundColor: Colors.white,
        borderRadius: 32,
        padding: 4,
        alignItems: 'center',
        ...Shadows.medium,
        overflow: 'hidden',
    },
    cardGlow: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 4,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginBottom: 0,
    },
    avatarWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: '#F1F5F9',
        marginBottom: 12,
        borderWidth: 3,
        borderColor: '#EEF2FF',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    childName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 8,
    },
    playBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6366f1',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    playText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: '900',
    },
    addCard: {
        backgroundColor: 'transparent',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#CBD5E1',
        justifyContent: 'center',
    },
    addCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        gap: 8,
    },
    backText: {
        fontSize: 16,
        color: '#64748B',
        fontWeight: '600',
    },
});

export default KidLoginScreen;
