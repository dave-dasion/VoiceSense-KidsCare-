import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  useWindowDimensions,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { navigate } from "navigation";
import { cognitoPool } from "screens/cognito-pool";
import { NavStatelessComponent } from "interfaces";
import { ImagesAssets } from "constant";

import navigationOptions from "./LoginScreen.navigationOptions";

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  forest: "#0C2F2D",        // deep teal-dark background
  deepGreen: "#0F3D3A",     // slightly lighter deep teal
  midGreen: "#16baac",      // ✦ PRIMARY brand color
  leafGreen: "#1dd4c4",     // lighter teal accent
  mintGlow: "#7EEADF",      // glow / highlight teal
  cream: "#F0F9F8",
  sand: "#E0F4F2",
  textDark: "#0E2625",
  textMid: "#4A6665",
  textLight: "#92AFAE",
  white: "#FFFFFF",
  cardBg: "rgba(255,255,255,0.97)",
  inputBg: "#F4FAFA",
  inputBorder: "#C8E8E6",
  inputFocus: "#16baac",
  shadow: "rgba(22, 186, 172, 0.18)",
};

// ─── Animated Input ──────────────────────────────────────────────────────────
const FloatingInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: any;
  autoCapitalize?: any;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  isTablet?: boolean;
}> = ({ label, value, onChangeText, keyboardType, autoCapitalize, secureTextEntry, rightIcon, isTablet }) => {
  const [focused, setFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.spring(labelAnim, { toValue: 1, useNativeDriver: false, speed: 20 }).start();
  };
  const handleBlur = () => {
    setFocused(false);
    if (!value) {
      Animated.spring(labelAnim, { toValue: 0, useNativeDriver: false, speed: 20 }).start();
    }
  };

  const labelTop = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [isTablet ? 20 : 14, 0] });
  const labelSize = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [isTablet ? 18 : 15, 12] });
  const labelColor = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [C.textLight, focused ? C.midGreen : C.textMid],
  });

  return (
    <View style={[fi.wrapper, isTablet && fi.wrapperTablet, focused && fi.wrapperFocused]}>
      <Animated.Text style={[fi.label, { top: labelTop, fontSize: labelSize, color: labelColor }]}>
        {label}
      </Animated.Text>
      <View style={fi.row}>
        <TextInput
          style={[fi.input, isTablet && fi.inputTablet]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon}
      </View>
    </View>
  );
};

const fi = StyleSheet.create({
  wrapper: {
    borderWidth: 1.5,
    borderColor: C.inputBorder,
    borderRadius: 14,
    backgroundColor: C.inputBg,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 16,
  },
  wrapperTablet: {
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 14,
    marginBottom: 22,
    borderRadius: 18,
  },
  wrapperFocused: {
    borderColor: C.midGreen,
    backgroundColor: C.white,
    shadowColor: C.midGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    position: "absolute",
    left: 16,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: C.textDark,
    paddingVertical: 2,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  inputTablet: {
    fontSize: 20,
    paddingVertical: 4,
  },
});

// ─── Decorative Circles ──────────────────────────────────────────────────────
const Orb: React.FC<{ style: any; size: number; color: string; opacity?: number }> = ({
  style,
  size,
  color,
  opacity = 1,
}) => (
  <View
    style={[
      {
        position: "absolute",
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
      },
      style,
    ]}
  />
);

// ─── Main Screen ─────────────────────────────────────────────────────────────
const LoginScreen: NavStatelessComponent = () => {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const [ispatient] = useState("1");

  // Entrance animations
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;
  const scaleCard = useRef(new Animated.Value(0.96)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, speed: 12, bounciness: 4, useNativeDriver: true }),
      Animated.spring(scaleCard, { toValue: 1, speed: 12, bounciness: 4, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePressIn = () =>
    Animated.spring(buttonScale, { toValue: 0.97, useNativeDriver: true, speed: 30 }).start();
  const handlePressOut = () =>
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();

  const onPressLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter both email and password.");
      return;
    }
    setIsLoading(true);
    const user = new CognitoUser({ Username: email, Pool: cognitoPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: async (res) => {
        setIsLoading(false);
        const token = res?.refreshToken?.token;
        const emailId = res?.idToken?.payload?.email;
        await AsyncStorage.setItem("REFRESH_TOKEN", JSON.stringify(token));
        await AsyncStorage.setItem("emailId", emailId);
        await AsyncStorage.setItem("isAdmin", ispatient);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: ispatient === "3" ? "AdminPage" : "HomeScreen" }],
          });
        }, 350);
      },
      onFailure: (err) => {
        setIsLoading(false);
        switch (err.name) {
          case "UserNotConfirmedException":
            return Alert.alert("Email Not Confirmed", "Please verify your email address.");
          case "NotAuthorizedException":
            return Alert.alert("Invalid Credentials", "Email or password is incorrect.");
          default:
            return Alert.alert("Something went wrong", "Please try again later.");
        }
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.forest} />
      <ScrollView
        contentContainerStyle={[s.scroll, isTablet && { paddingHorizontal: 80 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Background ── */}
        <View style={s.background}>
          <Orb style={{ top: -60, right: -60 }} size={220} color={C.deepGreen} opacity={1} />
          <Orb style={{ top: 80, right: -30 }} size={100} color={C.midGreen} opacity={0.3} />
          <Orb style={{ top: 160, left: -50 }} size={150} color={C.deepGreen} opacity={0.7} />
          <Orb style={{ top: 260, right: 30 }} size={50} color={C.mintGlow} opacity={0.18} />
        </View>

        {/* ── Header Section ── */}
        <Animated.View style={[s.header, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
          <Image
            source={ImagesAssets.logos.nmf}
            style={[s.logo, isTablet && { height: 100, marginBottom: 8 }]}
            resizeMode="contain"
          />
          <Text style={[s.tagline, isTablet && { fontSize: 15 }]}>Your wellness journey starts here</Text>
        </Animated.View>

        {/* ── Card ── */}
        <Animated.View
          style={[
            s.card,
            isTablet && s.cardTablet,
            { opacity: fadeIn, transform: [{ translateY: slideUp }, { scale: scaleCard }] },
          ]}
        >
          {/* Welcome text */}
          <View style={s.welcomeRow}>
            <View>
              <Text style={[s.welcomeTitle, isTablet && { fontSize: 30 }]}>Welcome back</Text>
              <Text style={[s.welcomeSub, isTablet && { fontSize: 16 }]}>
                Sign in to continue
              </Text>
            </View>
            <View style={s.badge}>
              <Icon name="leaf" size={isTablet ? 22 : 18} color={C.midGreen} />
            </View>
          </View>

          {/* Divider */}
          <View style={s.divider} />

          {/* Inputs */}
          <FloatingInput
            label="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            isTablet={isTablet}
          />

          <FloatingInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            isTablet={isTablet}
            rightIcon={
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon
                  name={isPasswordVisible ? "eye-slash" : "eye"}
                  size={isTablet ? 22 : 18}
                  color={C.textLight}
                />
              </TouchableOpacity>
            }
          />

          {/* Forgot password */}
          <TouchableOpacity style={s.forgotRow}>
            <Text style={[s.forgotText, isTablet && { fontSize: 15 }]}>Forgot your password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[s.loginBtn, isTablet && s.loginBtnTablet, isLoading && s.loginBtnLoading]}
              onPress={onPressLogin}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.9}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={[s.loginBtnText, isTablet && { fontSize: 20 }]}>Signing in…</Text>
              ) : (
                <>
                  <Text style={[s.loginBtnText, isTablet && { fontSize: 20 }]}>Sign In</Text>
                  <View style={s.loginBtnArrow}>
                    <Icon name="arrow-right" size={isTablet ? 16 : 14} color={C.white} />
                  </View>
                </>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Separator */}
          <View style={s.orRow}>
            <View style={s.orLine} />
            <Text style={s.orText}>or</Text>
            <View style={s.orLine} />
          </View>

          {/* Sign Up */}
          <TouchableOpacity
            style={[s.signupBtn, isTablet && s.signupBtnTablet]}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={[s.signupText, isTablet && { fontSize: 17 }]}>
              New here?{" "}
              <Text style={s.signupLink}>Create an account</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ── Footer ── */}
        <Animated.View style={[s.footer, { opacity: fadeIn }]}>
          <Text style={s.footerText}>Protected by end-to-end encryption</Text>
          <Icon name="lock" size={11} color={C.mintGlow} style={{ marginLeft: 5 }} />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

LoginScreen.navigationOptions = navigationOptions();

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: C.forest,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    overflow: "hidden",
  },

  // Header
  header: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 70 : 55,
    paddingBottom: 28,
  },
  logo: {
    width: "65%",
    height: 72,
    tintColor: C.white,
    marginBottom: 10,
  },
  tagline: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    letterSpacing: 0.8,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontStyle: "italic",
  },

  // Card
  card: {
    backgroundColor: C.cardBg,
    borderRadius: 28,
    padding: 26,
    shadowColor: C.forest,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 20,
  },
  cardTablet: {
    padding: 40,
    borderRadius: 36,
  },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: C.textDark,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: -0.5,
  },
  welcomeSub: {
    fontSize: 14,
    color: C.textMid,
    marginTop: 3,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  badge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#E0F7F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A8E6E2",
  },
  divider: {
    height: 1,
    backgroundColor: "#E4F4F3",
    marginVertical: 20,
  },

  // Forgot
  forgotRow: {
    alignSelf: "flex-end",
    marginTop: -6,
    marginBottom: 22,
  },
  forgotText: {
    fontSize: 13,
    color: C.midGreen,
    fontWeight: "600",
  },

  // Login Button
  loginBtn: {
    backgroundColor: C.midGreen,
    borderRadius: 14,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.midGreen,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  loginBtnTablet: {
    height: 66,
    borderRadius: 18,
  },
  loginBtnLoading: {
    opacity: 0.7,
  },
  loginBtnText: {
    color: C.white,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.4,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-medium",
  },
  loginBtnArrow: {
    marginLeft: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Or row
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E4F4F3",
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: C.textLight,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontStyle: "italic",
  },

  // Sign up
  signupBtn: {
    alignItems: "center",
    paddingVertical: 6,
  },
  signupBtnTablet: {
    paddingVertical: 10,
  },
  signupText: {
    fontSize: 15,
    color: C.textMid,
  },
  signupLink: {
    color: C.midGreen,
    fontWeight: "700",
  },

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: 0.5,
  },
});

export default LoginScreen;