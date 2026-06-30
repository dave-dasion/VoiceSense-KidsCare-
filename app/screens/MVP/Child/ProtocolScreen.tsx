import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../../../components';

const ProtocolScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Avatar
                    size={120}
                    source={require('../../../../assets/kids/robot_avatar.png')}
                    style={{ marginBottom: Spacing.xl, borderWidth: 0 }}
                />

                <Text style={styles.title}>Safety Check</Text>
                <Text style={styles.description}>
                    Everything is okay. I just want to make sure you're feeling safe today.
                </Text>

                <View style={styles.safetyBox}>
                    <Text style={styles.safetyText}>"I feel safe and happy"</Text>
                    <TouchableOpacity style={styles.yesButton} onPress={() => navigation.replace('Summary')}>
                        <Text style={styles.yesButtonText}>Yes, that's me!</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactText}>I want to talk to an adult</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff7ed',
    },
    content: {
        flex: 1,
        padding: Spacing.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.warning,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    title: {
        ...Typography.header,
        color: '#9a3412',
    },
    description: {
        ...Typography.body,
        textAlign: 'center',
        color: '#c2410c',
        marginTop: Spacing.md,
        marginBottom: Spacing.xxl,
    },
    safetyBox: {
        backgroundColor: Colors.white,
        padding: Spacing.xl,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        ...Shadows.medium,
    },
    safetyText: {
        ...Typography.subheader,
        marginBottom: Spacing.lg,
    },
    yesButton: {
        backgroundColor: Colors.success,
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 20,
    },
    yesButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 18,
    },
    contactButton: {
        marginTop: Spacing.xl,
    },
    contactText: {
        color: Colors.textLight,
        textDecorationLine: 'underline',
    },
});

export default ProtocolScreen;
