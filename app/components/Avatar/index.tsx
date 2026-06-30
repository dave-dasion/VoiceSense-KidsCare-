import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Shadows } from '../../screens/MVP/Theme';

interface AvatarProps {
    size?: number;
    rounded?: boolean;
    source?: any;
    emoji?: string;
    style?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({
    size = 40,
    rounded = true,
    source,
    emoji,
    style
}) => {
    const containerStyle = [
        styles.container,
        {
            width: size,
            height: size,
            borderRadius: rounded ? size / 2 : 12,
            backgroundColor: Colors.surface,
        },
        style
    ];

    if (source) {
        return (
            <View style={containerStyle}>
                <Image
                    source={source}
                    style={{ width: size, height: size, borderRadius: rounded ? size / 2 : 12 }}
                />
            </View>
        );
    }

    if (emoji) {
        return (
            <View style={[containerStyle, styles.emojiContainer]}>
                <Text style={{ fontSize: size * 0.6 }}>{emoji}</Text>
            </View>
        );
    }

    return (
        <View style={[containerStyle, styles.emojiContainer]}>
            <Text style={{ fontSize: size * 0.6 }}>👤</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        ...Shadows.light,
    },
    emojiContainer: {
        backgroundColor: '#F1F5F9',
    }
});

export default Avatar;
