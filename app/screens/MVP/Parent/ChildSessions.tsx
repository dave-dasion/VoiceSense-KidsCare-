import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../../components';

const sessions = [
    { id: '1', date: 'March 2, 2026', time: '10:30 AM', duration: '15 min', status: 'Completed' },
    { id: '2', date: 'March 1, 2026', time: '4:15 PM', duration: '12 min', status: 'Completed' },
    { id: '3', date: 'Feb 28, 2026', time: '11:00 AM', duration: '18 min', status: 'Completed' },
];

const ChildSessions = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title}>Child Sessions</Text>
                    <Avatar size={44} emoji="🐨" />
                </View>
            </View>

            <FlatList
                data={sessions}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.sessionCard}>
                        <View style={styles.sessionInfo}>
                            <Text style={styles.sessionDate}>{item.date}</Text>
                            <Text style={styles.sessionTime}>{item.time} • {item.duration}</Text>
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: Spacing.xl,
        paddingBottom: Spacing.md,
    },
    title: {
        ...Typography.header,
    },
    listContent: {
        padding: Spacing.xl,
    },
    sessionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: Spacing.lg,
        borderRadius: 15,
        marginBottom: Spacing.md,
        ...Shadows.light,
    },
    sessionInfo: {
        flex: 1,
    },
    sessionDate: {
        ...Typography.body,
        fontWeight: 'bold',
    },
    sessionTime: {
        ...Typography.caption,
    },
    statusBadge: {
        backgroundColor: '#dcfce7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginRight: Spacing.md,
    },
    statusText: {
        fontSize: 12,
        color: Colors.success,
        fontWeight: 'bold',
    },
});

export default ChildSessions;
