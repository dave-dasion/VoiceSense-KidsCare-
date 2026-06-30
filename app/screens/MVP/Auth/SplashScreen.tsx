import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Highly recommended for premium feel
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../Theme';
import { Avatar } from '../../../components';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
    const navigation = useNavigation<any>();

    // Animation Refs
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const floatAnim = useRef(new Animated.Value(0)).current;
    const textYAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        // Entrance Animation Sequence
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 12,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(textYAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        // Continuous Floating Loop for the heart
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: -15,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        const timer = setTimeout(() => {
            navigation.replace('RoleSelection');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Soft Gradient Background */}
            <LinearGradient
                colors={[Colors.primary, '#4c669f', '#192f6a']} // Replace with your theme variations
                style={styles.gradient}
            >
                {/* Decorative Background Circles */}
                <View style={styles.circleDecorator} />

                <Animated.View style={[
                    styles.logoContainer,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
                ]}>

                    {/* Floating Avatar */}
                    <Animated.View style={[
                        styles.iconCircle,
                        { transform: [{ translateY: floatAnim }] }
                    ]}>
                        <Avatar
                            size={120}
                            source={require('../../../../assets/kids/robot_avatar.png')}
                            style={{ borderWidth: 0, elevation: 0 }}
                        />
                    </Animated.View>

                    {/* Staggered Text Entrance */}
                    <Animated.View style={{ transform: [{ translateY: textYAnim }] }}>
                        <Animated.Text style={styles.title}>VoiceSense</Animated.Text>
                        <Animated.Text style={styles.boldTitle}>Kids Care</Animated.Text>
                        <View style={styles.divider} />
                        <Animated.Text style={styles.subtitle}>Interest Discovery Platform</Animated.Text>
                    </Animated.View>
                </Animated.View>

                {/* Loading Indicator or Version Tag */}
                <View style={styles.footer}>
                    <Animated.Text style={[styles.versionText, { opacity: fadeAnim }]}>
                        v1.0.0
                    </Animated.Text>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleDecorator: {
        position: 'absolute',
        width: width * 1.5,
        height: width * 1.5,
        borderRadius: width,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        top: -width * 0.5,
        left: -width * 0.2,
    },
    logoContainer: {
        alignItems: 'center',
        zIndex: 1,
    },
    iconCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        // Elevation for Android
        elevation: 15,
    },
    title: {
        fontSize: 28,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    boldTitle: {
        fontSize: 48,
        fontWeight: '900',
        color: Colors.white,
        textAlign: 'center',
        marginTop: -5,
    },
    divider: {
        width: 40,
        height: 4,
        backgroundColor: Colors.white,
        borderRadius: 2,
        alignSelf: 'center',
        marginVertical: 15,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 50,
    },
    versionText: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 12,
        fontWeight: 'bold',
    }
});

export default SplashScreen;