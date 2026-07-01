import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#1A365D',      // Deep Navy
  secondary: '#2B6CB0',    // Vivid Blue
  accent: '#6B46C1',       // Vibrant Purple
  accentLight: '#FAF5FF',
  background: '#F7FAFC',   // Clean Off-white
  white: '#FFFFFF',
  textDark: '#2D3748',     // Slate Dark Gray
  textLight: '#718096',    // Slate Cool Gray
  border: '#E2E8F0',       // Light Slate Gray
  success: '#38A169',      // Emerald Green
  successLight: '#E6FFFA',
  warning: '#DD6B20',      // Warm Amber
  warningLight: '#FEFCBF',
  danger: '#E53E3E',       // Red
  dangerLight: '#FFF5F5',
  info: '#3182CE',         // Light Blue
  infoLight: '#EBF8FF',
  cardBg: '#FFFFFF',
  learn: '#3182CE',       // Blue
  practice: '#805AD5',    // Violet
  progress: '#319795',    // Teal
  succeed: '#D69E2E',     // Amber
};

export const FONTS = {
  bold: 'Inter-Bold',
  medium: 'Inter-Medium',
  regular: 'System', // system fallback if Inter is loading
  light: 'Inter-Light-BETA',
  black: 'Inter-Black',
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dark: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.cardBg || COLORS.white,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.light,
  },
  input: {
    height: 52,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    ...SHADOWS.light,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
