import { StyleSheet } from 'react-native';

export const COLORS = {
  // Brand Colors
  primary: '#0B0F19',       // Deep Dark Slate
  secondary: '#3B82F6',     // Electric Blue
  accent: '#8B5CF6',        // Electric Violet/Purple
  accentLight: '#F3E8FF',
  
  // Gradients
  gradientStart: '#0F172A', // Slate 900
  gradientEnd: '#020617',   // Slate 950
  
  // Backgrounds
  background: '#0B0F19',    // Dark background for premium look
  backgroundLight: '#FFFFFF',
  cardBg: '#1E293B',        // Slate 800
  cardBgLight: '#F8FAFC',   // Slate 50
  
  // Interface
  white: '#FFFFFF',
  textDark: '#F8FAFC',      // Off-white for readability on dark
  textLight: '#94A3B8',     // Cool Gray
  textDarkLightMode: '#0F172A', // For light-themed items
  border: '#334155',        // Slate 700
  borderLight: '#E2E8F0',
  
  // States
  success: '#10B981',      // Emerald Green
  successLight: '#D1FAE5',
  warning: '#F59E0B',      // Amber
  warningLight: '#FEF3C7',
  danger: '#EF4444',       // Rose Red
  dangerLight: '#FEE2E2',
  info: '#06B6D4',         // Cyan
  infoLight: '#CFFAFE',
};

export const FONTS = {
  bold: 'Inter-Bold',
  medium: 'Inter-Medium',
  regular: 'System', 
  light: 'Inter-Light-BETA',
  black: 'Inter-Black',
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  glow: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  input: {
    height: 52,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.white,
    marginBottom: 16,
  },
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    ...SHADOWS.medium,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
