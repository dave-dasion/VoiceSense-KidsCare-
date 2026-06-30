import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [isSplashActive, setIsSplashActive] = useState(true);

  // Load custom fonts using expo-font
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Light-BETA': require('./assets/fonts/Inter-Light-BETA.ttf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
  });

  // Splash Screen animations
  const splashOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Fade in splash
    Animated.parallel([
      Animated.timing(splashOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();

    // End splash after 3.2 seconds
    const timer = setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setIsSplashActive(false);
      });
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // While splash screen is active or fonts are still loading, show the animated splash image
  if (isSplashActive || !fontsLoaded) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Animated.View style={[styles.splashWrapper, { opacity: splashOpacity }]}>
          <Animated.Image
            source={require('./assets/images/trainifyAi.png')}
            style={[styles.splashImage, { transform: [{ scale: logoScale }] }]}
            resizeMode="cover"
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashWrapper: {
    width: '100%',
    height: '100%',
  },
  splashImage: {
    width: width,
    height: height,
  },
});
