import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const slides: OnboardingSlide[] = [
    {
      id: '1',
      icon: 'git-network',
      iconColor: COLORS.secondary,
      title: 'Build Workflows Visually',
      subtitle: 'NO-CODE OR LOW-CODE EDITOR',
      description: 'Drag, drop, and link triggers to actions. Compose complex automations inside a premium interactive canvas tailored for mobile devices.',
    },
    {
      id: '2',
      icon: 'apps-outline',
      iconColor: COLORS.accent,
      title: 'Connect Your Apps',
      subtitle: '400+ INTEGRATIONS LOADED',
      description: 'Instantly authenticate and link Slack, Stripe, Notion, Gmail, GitHub, and custom webhooks. We handle the OAuth token refresh cycles for you.',
    },
    {
      id: '3',
      icon: 'sparkles',
      iconColor: '#D69E2E',
      title: 'AI Workflow Assistant',
      subtitle: 'COPILOT CHAT & GRAPH SUGGESTIONS',
      description: 'Describe what you want to automate in natural language. Our LLM-powered compiler generates blocks, fields, and paths automatically.',
    },
    {
      id: '4',
      icon: 'analytics',
      iconColor: COLORS.success,
      title: 'Monitor Everything',
      subtitle: 'REAL-TIME TRACING & AUDIT RUNS',
      description: 'Step-by-step debug logging for every run. Instantly replay failed executions with full payloads and visual node highlighting.',
    },
    {
      id: '5',
      icon: 'rocket-outline',
      iconColor: COLORS.info,
      title: 'Get Started Now',
      subtitle: 'ENTERPRISE-GRADE INFRASTRUCTURE',
      description: 'Create a collaborative workspace, invite team members, deploy agentic flows, and launch your business operations to autopilot.',
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderSlide = ({ item }: { item: OnboardingSlide }) => {
    return (
      <View style={styles.slideWrapper}>
        <View style={styles.graphicContainer}>
          {/* Mock Graphic Board */}
          <LinearGradient
            colors={['rgba(30, 41, 59, 0.4)', 'rgba(15, 23, 42, 0.8)']}
            style={styles.graphicCard}
          >
            <View style={[styles.graphicCircle, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
              <Ionicons name={item.icon as any} size={70} color={item.iconColor} />
            </View>
            {/* Dynamic UI details inside slide mock card */}
            <View style={styles.mockNodeChain}>
              <View style={styles.mockNodeDot} />
              <View style={[styles.mockNodeLine, { backgroundColor: item.iconColor }]} />
              <View style={[styles.mockNodeDot, { backgroundColor: item.iconColor }]} />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideDesc}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Header Controls */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>Flow<Text style={{ color: COLORS.secondary }}>Pilot</Text></Text>
        </View>
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Slide Carousels */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
      />

      {/* Bottom Control Bar */}
      <View style={styles.bottomControls}>
        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* CTA Actions */}
        <TouchableOpacity
          onPress={handleNext}
          style={[
            styles.ctaButton,
            currentIndex === slides.length - 1 ? styles.ctaStartButton : null,
          ]}
        >
          <Text style={styles.ctaButtonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Continue"}
          </Text>
          <Ionicons
            name={currentIndex === slides.length - 1 ? "rocket" : "arrow-forward"}
            size={18}
            color={COLORS.white}
            style={{ marginLeft: 6 }}
          />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    height: 50,
  },
  brandContainer: {
    flexDirection: 'row',
  },
  brandText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  skipButton: {
    padding: 6,
  },
  skipText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  slideWrapper: {
    width: width,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  graphicContainer: {
    flex: 1.1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 24,
  },
  graphicCard: {
    width: '90%',
    height: '80%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  graphicCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  mockNodeChain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    width: '60%',
    justifyContent: 'center',
  },
  mockNodeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  mockNodeLine: {
    flex: 1,
    height: 2,
  },
  textContainer: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  slideSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    letterSpacing: 2,
    marginBottom: 8,
    fontFamily: FONTS.bold,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: FONTS.black,
  },
  slideDesc: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    height: 80,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  activeDot: {
    width: 20,
    backgroundColor: COLORS.secondary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: COLORS.border,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ctaStartButton: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
    ...SHADOWS.medium,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
