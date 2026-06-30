import React, { useEffect, useRef, useState } from "react";
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

import { ImagesAssets } from "constant";
import { NavStatelessComponent } from "interfaces";
import { navigate } from "navigation";
import { cognitoPool } from "screens/cognito-pool";

import navigationOptions from "./SignUp.navigationOptions";

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  forest: "#0C2F2D",
  deepGreen: "#0F3D3A",
  brand: "#16baac",
  brandLight: "#1dd4c4",
  mintGlow: "#7EEADF",
  textDark: "#0E2625",
  textMid: "#4A6665",
  textLight: "#92AFAE",
  white: "#FFFFFF",
  cardBg: "rgba(255,255,255,0.97)",
  inputBg: "#F4FAFA",
  inputBorder: "#C8E8E6",
  errorRed: "#E53E3E",
  successGreen: "#16baac",
};

// ─── Password Strength ────────────────────────────────────────────────────────
const getStrength = (pw: string) => {
  if (!pw) return { level: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "Weak", color: "#E53E3E" };
  if (score === 2) return { level: 2, label: "Fair", color: "#ED8936" };
  if (score === 3) return { level: 3, label: "Good", color: "#ECC94B" };
  return { level: 4, label: "Strong", color: C.brand };
};

// ─── Floating Label Input ─────────────────────────────────────────────────────
const FloatingInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: any;
  autoCapitalize?: any;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  isTablet?: boolean;
  error?: boolean;
}> = ({ label, value, onChangeText, keyboardType, autoCapitalize, secureTextEntry, rightIcon, isTablet, error }) => {
  const [focused, setFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.spring(labelAnim, { toValue: 1, useNativeDriver: false, speed: 20 }).start();
  };
  const handleBlur = () => {
    setFocused(false);
    if (!value) Animated.spring(labelAnim, { toValue: 0, useNativeDriver: false, speed: 20 }).start();
  };

  const labelTop = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [isTablet ? 20 : 14, 0] });
  const labelSize = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [isTablet ? 18 : 15, 12] });
  const labelColor = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [C.textLight, error ? C.errorRed : focused ? C.brand : C.textMid],
  });

  return (
    <View
      style={[
        fi.wrapper,
        isTablet && fi.wrapperTablet,
        focused && fi.wrapperFocused,
        error && fi.wrapperError,
      ]}
    >
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
    marginBottom: 14,
  },
  wrapperTablet: {
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 14,
    marginBottom: 20,
    borderRadius: 18,
  },
  wrapperFocused: {
    borderColor: C.brand,
    backgroundColor: C.white,
    shadowColor: C.brand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  wrapperError: {
    borderColor: C.errorRed,
    backgroundColor: "#FFF5F5",
  },
  label: {
    position: "absolute",
    left: 16,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: 0.3,
  },
  row: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    fontSize: 16,
    color: C.textDark,
    paddingVertical: 2,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  inputTablet: { fontSize: 20, paddingVertical: 4 },
});

// ─── Orb ──────────────────────────────────────────────────────────────────────
const Orb: React.FC<{ style: any; size: number; color: string; opacity?: number }> = ({
  style, size, color, opacity = 1,
}) => (
  <View style={[{ position: "absolute", width: size, height: size, borderRadius: size / 2, backgroundColor: color, opacity }, style]} />
);

// ─── Step Indicator ───────────────────────────────────────────────────────────
const StepDot: React.FC<{ active: boolean; done: boolean }> = ({ active, done }) => (
  <View style={[sd.dot, active && sd.dotActive, done && sd.dotDone]}>
    {done && <Icon name="check" size={10} color={C.white} />}
  </View>
);

const sd = StyleSheet.create({
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E0F7F6",
    borderWidth: 2,
    borderColor: C.inputBorder,
    justifyContent: "center",
    alignItems: "center",
  },
  dotActive: { borderColor: C.brand, backgroundColor: C.white },
  dotDone: { backgroundColor: C.brand, borderColor: C.brand },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SignUp: NavStatelessComponent = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const navigation = useNavigation();
  const strength = getStrength(password);

  // Animations
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

  const handlePressIn = () => Animated.spring(buttonScale, { toValue: 0.97, useNativeDriver: true, speed: 30 }).start();
  const handlePressOut = () => Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();

  const onPressRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }
    setPasswordMismatch(false);
    setIsLoading(true);

    cognitoPool.signUp(email, password, [], null, (err, data) => {
      setIsLoading(false);
      if (err) {
        switch (err.name) {
          case "InvalidParameterException":
            return Alert.alert("Invalid Email", "Please enter a valid email address.");
          case "InvalidPasswordException":
            return Alert.alert("Weak Password", "Password must be at least 8 characters.");
          case "UsernameExistsException":
            return Alert.alert("Already Registered", "This email is already in use.");
          default:
            return Alert.alert("Error", "Something went wrong. Please try again.");
        }
      }
      Alert.alert("Account Created!", "Please verify your email to continue.", [
        {
          text: "Verify Now",
          onPress: () => navigation.navigate("OtpVerified", { email }),
        },
      ]);
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={C.forest} />
      <ScrollView
        contentContainerStyle={[s.scroll, isTablet && { paddingHorizontal: 80 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Background orbs */}
        <View style={s.background}>
          <Orb style={{ top: -60, right: -60 }} size={220} color={C.deepGreen} />
          <Orb style={{ top: 80, right: -30 }} size={100} color={C.brand} opacity={0.28} />
          <Orb style={{ top: 160, left: -50 }} size={150} color={C.deepGreen} opacity={0.7} />
          <Orb style={{ top: 260, right: 30 }} size={50} color={C.mintGlow} opacity={0.18} />
        </View>

        {/* Header */}
        <Animated.View style={[s.header, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
          {/* Back button */}
          {/* <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={isTablet ? 18 : 15} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity> */}

          <Image
            source={ImagesAssets.logos.nmf}
            style={[s.logo, isTablet && { height: 100 }]}
            resizeMode="contain"
          />
          <Text style={[s.tagline, isTablet && { fontSize: 15 }]}>Join the AutismCare community</Text>
        </Animated.View>

        {/* Card */}
        <Animated.View
          style={[
            s.card,
            isTablet && s.cardTablet,
            { opacity: fadeIn, transform: [{ translateY: slideUp }, { scale: scaleCard }] },
          ]}
        >
          {/* Title row */}
          <View style={s.titleRow}>
            <View>
              <Text style={[s.title, isTablet && { fontSize: 28 }]}>Create Account</Text>
              <Text style={[s.subtitle, isTablet && { fontSize: 15 }]}>Fill in your details below</Text>
            </View>
            <View style={s.badge}>
              <Icon name="user-plus" size={isTablet ? 20 : 16} color={C.brand} />
            </View>
          </View>

          {/* Step indicators */}
          <View style={s.stepsRow}>
            <StepDot active={!email} done={!!email} />
            <View style={[s.stepLine, !!email && { backgroundColor: C.brand }]} />
            <StepDot active={!!email && !password} done={!!password} />
            <View style={[s.stepLine, !!password && { backgroundColor: C.brand }]} />
            <StepDot active={!!password && !confirmPassword} done={!!confirmPassword} />
          </View>

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
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Icon name={isPasswordVisible ? "eye-slash" : "eye"} size={isTablet ? 22 : 18} color={C.textLight} />
              </TouchableOpacity>
            }
          />

          {/* Password strength */}
          {password.length > 0 && (
            <View style={s.strengthContainer}>
              <View style={s.strengthBars}>
                {[1, 2, 3, 4].map((i) => (
                  <View
                    key={i}
                    style={[
                      s.strengthBar,
                      { backgroundColor: i <= strength.level ? strength.color : C.inputBorder },
                    ]}
                  />
                ))}
              </View>
              <Text style={[s.strengthLabel, { color: strength.color }]}>{strength.label}</Text>
            </View>
          )}

          <FloatingInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(t) => { setConfirmPassword(t); if (passwordMismatch) setPasswordMismatch(false); }}
            secureTextEntry={!isConfirmPasswordVisible}
            isTablet={isTablet}
            error={passwordMismatch}
            rightIcon={
              <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Icon name={isConfirmPasswordVisible ? "eye-slash" : "eye"} size={isTablet ? 22 : 18} color={C.textLight} />
              </TouchableOpacity>
            }
          />

          {passwordMismatch && (
            <Text style={s.errorText}>
              <Icon name="exclamation-circle" size={12} color={C.errorRed} /> Passwords do not match
            </Text>
          )}

          {/* Register Button */}
          <Animated.View style={[{ transform: [{ scale: buttonScale }] }, { marginTop: 8 }]}>
            <TouchableOpacity
              style={[s.registerBtn, isTablet && s.registerBtnTablet, isLoading && s.registerBtnLoading]}
              onPress={onPressRegister}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.9}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={[s.registerBtnText, isTablet && { fontSize: 20 }]}>Creating account…</Text>
              ) : (
                <>
                  <Text style={[s.registerBtnText, isTablet && { fontSize: 20 }]}>Create Account</Text>
                  <View style={s.registerBtnArrow}>
                    <Icon name="arrow-right" size={isTablet ? 16 : 14} color={C.white} />
                  </View>
                </>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <View style={s.orRow}>
            <View style={s.orLine} />
            <Text style={s.orText}>or</Text>
            <View style={s.orLine} />
          </View>

          {/* Login link */}
          <TouchableOpacity style={s.loginRow} onPress={() => navigation.goBack()}>
            <Text style={[s.loginText, isTablet && { fontSize: 17 }]}>
              Already have an account?{" "}
              <Text style={s.loginLink}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <Animated.View style={[s.footer, { opacity: fadeIn }]}>
          <Text style={s.footerText}>Protected by end-to-end encryption</Text>
          <Icon name="lock" size={11} color={C.mintGlow} style={{ marginLeft: 5 }} />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

SignUp.navigationOptions = navigationOptions();

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
    top: 0, left: 0, right: 0,
    height: 320,
    overflow: "hidden",
  },

  // Header
  header: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 60 : 46,
    paddingBottom: 24,
  },
  backBtn: {
    position: "absolute",
    left: 0,
    top: Platform.OS === "ios" ? 62 : 48,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "60%",
    height: 68,
    tintColor: C.white,
    marginBottom: 8,
  },
  tagline: {
    color: "rgba(255,255,255,0.5)",
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
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: C.textDark,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: C.textMid,
    marginTop: 3,
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

  // Steps
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: C.inputBorder,
    marginHorizontal: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#E4F4F3",
    marginBottom: 18,
  },

  // Strength
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -8,
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  strengthBars: {
    flexDirection: "row",
    flex: 1,
    gap: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 10,
    width: 48,
    textAlign: "right",
  },

  // Error
  errorText: {
    fontSize: 12,
    color: C.errorRed,
    marginTop: -8,
    marginBottom: 10,
    paddingLeft: 4,
  },

  // Register button
  registerBtn: {
    backgroundColor: C.brand,
    borderRadius: 14,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.brand,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  registerBtnTablet: { height: 66, borderRadius: 18 },
  registerBtnLoading: { opacity: 0.7 },
  registerBtnText: {
    color: C.white,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.4,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-medium",
  },
  registerBtnArrow: {
    marginLeft: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Or
  orRow: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  orLine: { flex: 1, height: 1, backgroundColor: "#E4F4F3" },
  orText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: C.textLight,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontStyle: "italic",
  },

  // Login link
  loginRow: { alignItems: "center", paddingVertical: 4 },
  loginText: { fontSize: 15, color: C.textMid },
  loginLink: { color: C.brand, fontWeight: "700" },

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: 0.5,
  },
});

export default SignUp;