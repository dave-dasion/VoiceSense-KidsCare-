import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen({ navigation }: any) {
  // Animation values
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const loaderOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence logo animations
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1.0,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Fade in text and subtitle
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        // Fade in loader
        Animated.timing(loaderOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    });

    // Simulate auto auth check and navigate
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        style={StyleSheet.absoluteFillObject}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            {/* Animated Logo (FlowPilot Symbol) */}
            <Animated.View
              style={[
                styles.logoWrapper,
                {
                  opacity: logoOpacity,
                  transform: [{ scale: logoScale }],
                },
              ]}
            >
              <View style={styles.nodeCircleLarge}>
                <Ionicons name="git-branch" size={64} color={COLORS.white} />
              </View>
              {/* Glow spots */}
              <View style={[styles.glowSpot, styles.glow1]} />
              <View style={[styles.glowSpot, styles.glow2]} />
            </Animated.View>

            {/* Branding Name */}
            <Animated.View style={[styles.textWrapper, { opacity: textOpacity }]}>
              <View style={styles.brandTitleRow}>
                <Text style={styles.brandFlow}>Flow</Text>
                <Text style={styles.brandPilot}>Pilot</Text>
                <View style={styles.aiBadge}>
                  <Text style={styles.aiBadgeText}>AI</Text>
                </View>
              </View>
              <Text style={styles.tagline}>BUILD. AUTOMATE. OPTIMIZE.</Text>
              <Text style={styles.description}>
                The AI-powered workflow platform to build, automate and optimize your business.
              </Text>
            </Animated.View>
          </View>

          {/* Loading Indicator and Version */}
          <Animated.View style={[styles.bottomWrapper, { opacity: loaderOpacity }]}>
            <ActivityIndicator size="small" color={COLORS.secondary} style={{ marginBottom: 16 }} />
            <Text style={styles.statusText}>Connecting to secure node cluster...</Text>
            <Text style={styles.version}>v1.0.4 • Enterprise Edition</Text>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    position: 'relative',
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  nodeCircleLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    ...SHADOWS.glow,
  },
  glowSpot: {
    position: 'absolute',
    borderRadius: 30,
  },
  glow1: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.accent,
    top: -10,
    left: -10,
    opacity: 0.6,
  },
  glow2: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.secondary,
    bottom: -10,
    right: -10,
    opacity: 0.6,
  },
  textWrapper: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  brandFlow: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.white,
    fontFamily: FONTS.black,
  },
  brandPilot: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.secondary,
    fontFamily: FONTS.black,
  },
  aiBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
    ...SHADOWS.glow,
  },
  aiBadgeText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textLight,
    letterSpacing: 4,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  description: {
    fontSize: 14,
    color: 'rgba(248, 250, 252, 0.75)',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: FONTS.medium,
  },
  bottomWrapper: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  version: {
    fontSize: 11,
    color: 'rgba(148, 163, 184, 0.4)',
    fontWeight: '600',
  },
});
