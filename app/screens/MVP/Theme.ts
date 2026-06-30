export const Colors = {
    primary: '#6366f1', // Indigo
    secondary: '#8b5cf6', // Violet
    accent: '#f43f5e', // Rose
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textLight: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    white: '#ffffff',
    black: '#000000',
    cardGradient: ['#6366f1', '#a855f7'],
    glass: 'rgba(255, 255, 255, 0.8)',
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const Typography = {
    header: {
        fontSize: 28,
        fontWeight: 'bold' as const,
        color: Colors.text,
    },
    subheader: {
        fontSize: 20,
        fontWeight: '600' as const,
        color: Colors.text,
    },
    body: {
        fontSize: 16,
        color: Colors.text,
    },
    caption: {
        fontSize: 14,
        color: Colors.textLight,
    },
};

export const Shadows = {
    light: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5.46,
        elevation: 5,
    },
};
