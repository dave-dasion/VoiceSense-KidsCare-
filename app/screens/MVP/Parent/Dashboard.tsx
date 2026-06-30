import React, { useRef, useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView,
    TouchableOpacity, Dimensions, StatusBar
} from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet"; // Ensure this is installed
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '../../../components';

const { width } = Dimensions.get('window');

const Dashboard = () => {
    const navigation = useNavigation<any>();
    const refRBSheet = useRef<any>();
    const [selectedActivity, setSelectedActivity] = useState<any>(null);

    // Logic for opening details
    const openActivityDetails = (activity: any) => {
        setSelectedActivity(activity);
        refRBSheet.current.open();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hello, Parent! 👋</Text>
                        <Text style={styles.date}>Tuesday, March 3, 2026</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.profileButton}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Avatar size={54} emoji="🧔" />
                    </TouchableOpacity>
                </View>

                {/* Main Action Card */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.mainActionCard}
                    onPress={() => navigation.navigate('Warmup')}
                >
                    <LinearGradient
                        colors={[Colors.primary, '#4F46E5']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.cardGradient}
                    >
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle}>Start Today's Session</Text>
                            <Text style={styles.cardSubtitle}>Help Charlie grow through play</Text>
                        </View>
                        <View style={styles.playIconWrapper}>
                            <Ionicons name="play" size={28} color={Colors.white} />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Stats Grid */}
                <View style={styles.statsContainer}>
                    <View style={[styles.statCard, { backgroundColor: '#F0F9FF' }]}>
                        <View style={[styles.statIconBox, { backgroundColor: '#BAE6FD' }]}>
                            <Ionicons name="calendar" size={20} color="#0369A1" />
                        </View>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Sessions</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: '#FDF2F8' }]}>
                        <View style={[styles.statIconBox, { backgroundColor: '#FBCFE8' }]}>
                            <Ionicons name="trending-up" size={20} color="#BE185D" />
                        </View>
                        <Text style={styles.statValue}>84%</Text>
                        <Text style={styles.statLabel}>Progress</Text>
                    </View>
                </View>

                {/* Recent Activity Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                {/* Activity List */}
                <TouchableOpacity
                    style={styles.activityItem}
                    onPress={() => openActivityDetails({
                        title: "Focus Quest Completed",
                        time: "Yesterday at 4:30 PM",
                        type: "game",
                        desc: "Charlie showed high engagement in logic puzzles today. Visual focus remained steady for 8 minutes."
                    })}
                >
                    <View style={[styles.activityIcon, { backgroundColor: '#DCFCE7' }]}>
                        <Ionicons name="game-controller" size={22} color="#166534" />
                    </View>
                    <View style={styles.activityText}>
                        <Text style={styles.activityTitle}>Focus Quest Completed</Text>
                        <Text style={styles.activityTime}>Yesterday at 4:30 PM</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.activityItem}
                    onPress={() => openActivityDetails({
                        title: "New Interest Detected",
                        time: "2 days ago",
                        type: "insight",
                        desc: "Based on voice analysis and choice patterns, we've detected a growing interest in logic and spatial reasoning."
                    })}
                >
                    <View style={[styles.activityIcon, { backgroundColor: '#FEF3C7' }]}>
                        <Ionicons name="bulb" size={22} color="#92400E" />
                    </View>
                    <View style={styles.activityText}>
                        <Text style={styles.activityTitle}>Interest Detected: Logic</Text>
                        <Text style={styles.activityTime}>2 days ago</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Sheet for Detailed View */}
            <RBSheet
                ref={refRBSheet}
                draggable={true}
                closeOnPressMask={true}
                height={400}
                customStyles={{
                    wrapper: { backgroundColor: "rgba(0,0,0,0.5)" },
                    draggableIcon: { backgroundColor: "#CBD5E1", width: 60 },
                    container: { borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24 }
                }}
            >
                {selectedActivity && (
                    <View>
                        <View style={styles.sheetHeader}>
                            <Text style={styles.sheetTitle}>{selectedActivity.title}</Text>
                            <Text style={styles.sheetTime}>{selectedActivity.time}</Text>
                        </View>

                        <View style={styles.detailsCard}>
                            <Text style={styles.detailsHeading}>Summary</Text>
                            <Text style={styles.detailsText}>{selectedActivity.desc}</Text>
                        </View>

                        <View style={styles.sheetActions}>
                            <TouchableOpacity style={styles.sheetBtnPrimary}>
                                <Text style={styles.sheetBtnText}>View Full Report</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </RBSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    scrollContent: { padding: 24 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    greeting: { fontSize: 28, fontWeight: '800', color: '#1E293B' },
    date: { fontSize: 14, color: '#64748B', fontWeight: '500', marginTop: 2 },
    profileButton: { ...Shadows.light },
    profileGradient: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },

    mainActionCard: { borderRadius: 28, overflow: 'hidden', marginBottom: 24, ...Shadows.medium },
    cardGradient: { flexDirection: 'row', alignItems: 'center', padding: 28 },
    cardInfo: { flex: 1 },
    cardTitle: { color: Colors.white, fontSize: 22, fontWeight: '800' },
    cardSubtitle: { color: 'rgba(255, 255, 255, 0.85)', fontSize: 15, marginTop: 6, fontWeight: '500' },
    playIconWrapper: {
        width: 56, height: 56, borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white'
    },

    statsContainer: { flexDirection: 'row', gap: 16, marginBottom: 30 },
    statCard: {
        flex: 1, padding: 20, borderRadius: 24,
        alignItems: 'flex-start', ...Shadows.light,
    },
    statIconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    statValue: { fontSize: 24, fontWeight: '800', color: '#1E293B' },
    statLabel: { fontSize: 13, color: '#64748B', fontWeight: '600', marginTop: 2 },

    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
    seeAll: { color: Colors.primary, fontWeight: '700' },

    activityItem: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: Colors.white, padding: 16,
        borderRadius: 20, marginBottom: 12, ...Shadows.light,
    },
    activityIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    activityText: { flex: 1 },
    activityTitle: { fontSize: 15, fontWeight: '700', color: '#334155' },
    activityTime: { fontSize: 12, color: '#94A3B8', marginTop: 2 },

    // Sheet Styles
    sheetHeader: { marginBottom: 20 },
    sheetTitle: { fontSize: 22, fontWeight: '800', color: '#1E293B' },
    sheetTime: { fontSize: 14, color: '#64748B', marginTop: 4 },
    detailsCard: { backgroundColor: '#F1F5F9', padding: 20, borderRadius: 20, marginBottom: 24 },
    detailsHeading: { fontSize: 12, fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
    detailsText: { fontSize: 16, color: '#334155', lineHeight: 24 },
    sheetActions: { width: '100%' },
    sheetBtnPrimary: { backgroundColor: Colors.primary, padding: 18, borderRadius: 16, alignItems: 'center' },
    sheetBtnText: { color: Colors.white, fontWeight: '800', fontSize: 16 }
});

export default Dashboard;