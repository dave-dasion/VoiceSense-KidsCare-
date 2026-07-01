import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Webinar {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  isRegistered: boolean;
}

interface RecordedSession {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  views: string;
  thumbnailColor: string;
}

export default function LiveTrainingScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recorded'>('upcoming');
  const [activeVideo, setActiveVideo] = useState<RecordedSession | null>(null);

  const [webinars, setWebinars] = useState<Webinar[]>([
    {
      id: 'w1',
      title: 'Advanced Dementia Care & Behavioural Management',
      instructor: 'Dr. Sarah Jenkins',
      date: 'June 29, 2026',
      time: '2:00 PM - 3:30 PM EST',
      duration: '90 mins',
      isRegistered: false,
    },
    {
      id: 'w2',
      title: 'Cardiovascular Support & Vital Sign Monitoring',
      instructor: 'Prof. James Lim',
      date: 'July 02, 2026',
      time: '11:00 AM - 12:00 PM EST',
      duration: '60 mins',
      isRegistered: true,
    },
    {
      id: 'w3',
      title: 'Workplace Ethics & Senior Patient Advocacy',
      instructor: 'Ellen Vance',
      date: 'July 05, 2026',
      time: '4:00 PM - 5:00 PM EST',
      duration: '60 mins',
      isRegistered: false,
    },
  ]);

  const recordedSessions: RecordedSession[] = [
    {
      id: 'r1',
      title: 'Emergency Response & CPR Review for Elderly Care',
      instructor: 'Dr. Michael Chang',
      duration: '45 mins',
      views: '1.2k views',
      thumbnailColor: '#F87171',
    },
    {
      id: 'r2',
      title: 'Proper Lifting and Patient Mobility Techniques',
      instructor: 'Robert Vance',
      duration: '32 mins',
      views: '840 views',
      thumbnailColor: '#60A5FA',
    },
    {
      id: 'r3',
      title: 'Medication Administration Best Practices & Errors Avoidance',
      instructor: 'Dr. Sarah Jenkins',
      duration: '50 mins',
      views: '1.5k views',
      thumbnailColor: '#34D399',
    },
  ];

  const handleRegister = (webinarId: string) => {
    setWebinars(prev =>
      prev.map(w => {
        if (w.id === webinarId) {
          const nextState = !w.isRegistered;
          Alert.alert(
            nextState ? 'Registered Successfully!' : 'Registration Cancelled',
            nextState 
              ? `You have registered for "${w.title}". We sent an email invite details.` 
              : `You have cancelled your seat for "${w.title}".`
          );
          return { ...w, isRegistered: nextState };
        }
        return w;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.backButton}>
          <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Training & Webinars</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Live Broadcast Pulse Card */}
        <LinearGradient
          colors={['#7F1D1D', '#B91C1C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.liveBanner}
        >
          <View style={styles.liveBadgeRow}>
            <View style={styles.livePulseDot} />
            <Text style={styles.liveText}>LIVE BROADCASTING NOW</Text>
          </View>
          <Text style={styles.liveTitle}>Nutrition and Meal Planning for Chronic Illness Management</Text>
          <Text style={styles.liveInstructor}>Hosted by Dr. Emily Watson • 412 learners attending</Text>
          
          <TouchableOpacity 
            style={styles.joinLiveBtn}
            onPress={() => {
              Alert.alert('Connecting...', 'Entering live training stream lobby...');
            }}
          >
            <Ionicons name="videocam" size={18} color="#B91C1C" style={{ marginRight: 6 }} />
            <Text style={styles.joinLiveBtnText}>Join Stream Room</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Tab Selection */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            onPress={() => setActiveTab('upcoming')}
            style={[styles.tabBtn, activeTab === 'upcoming' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>Upcoming Live (3)</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('recorded')}
            style={[styles.tabBtn, activeTab === 'recorded' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'recorded' && styles.tabTextActive]}>Recorded (3)</Text>
          </TouchableOpacity>
        </View>

        {/* List Contents */}
        <View style={styles.listContainer}>
          {activeTab === 'upcoming' ? (
            webinars.map(webinar => (
              <View key={webinar.id} style={styles.webinarCard}>
                <View style={styles.webinarMetaRow}>
                  <View style={styles.webinarTag}>
                    <Ionicons name="calendar-outline" size={12} color={COLORS.secondary} style={{ marginRight: 4 }} />
                    <Text style={styles.webinarTagText}>{webinar.date}</Text>
                  </View>
                  <Text style={styles.webinarDuration}>{webinar.duration}</Text>
                </View>

                <Text style={styles.webinarTitle}>{webinar.title}</Text>
                <Text style={styles.webinarInstructor}>Presenter: {webinar.instructor}</Text>
                
                <View style={styles.webinarBottomRow}>
                  <View style={styles.timeBlock}>
                    <Ionicons name="time-outline" size={14} color={COLORS.textLight} style={{ marginRight: 4 }} />
                    <Text style={styles.timeText}>{webinar.time}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRegister(webinar.id)}
                    style={[
                      styles.registerBtn,
                      webinar.isRegistered ? styles.registeredBtnActive : styles.registerBtnInactive
                    ]}
                  >
                    <Text style={[
                      styles.registerBtnText,
                      webinar.isRegistered ? styles.registeredTextActive : styles.registerTextInactive
                    ]}>
                      {webinar.isRegistered ? 'Registered' : 'Reserve Seat'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            recordedSessions.map(session => (
              <TouchableOpacity 
                key={session.id} 
                style={styles.recordedCard}
                onPress={() => setActiveVideo(session)}
              >
                <View style={[styles.videoThumbnail, { backgroundColor: session.thumbnailColor }]}>
                  <Ionicons name="play-circle" size={48} color={COLORS.white} />
                  <Text style={styles.videoDurationBadge}>{session.duration}</Text>
                </View>

                <View style={styles.videoDetails}>
                  <Text style={styles.videoTitle} numberOfLines={2}>{session.title}</Text>
                  <Text style={styles.videoInstructor}>By {session.instructor}</Text>
                  <View style={styles.videoViewsRow}>
                    <Ionicons name="eye-outline" size={12} color={COLORS.textLight} style={{ marginRight: 4 }} />
                    <Text style={styles.videoViewsText}>{session.views}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Video Simulation Modal */}
      <Modal visible={activeVideo !== null} animationType="fade" transparent>
        <View style={styles.videoModalOverlay}>
          {activeVideo && (
            <View style={styles.videoModalContent}>
              <View style={styles.videoModalHeader}>
                <Text style={styles.videoModalTitle} numberOfLines={1}>{activeVideo.title}</Text>
                <TouchableOpacity onPress={() => setActiveVideo(null)}>
                  <Ionicons name="close-circle" size={28} color={COLORS.white} />
                </TouchableOpacity>
              </View>

              {/* Simulated Video Player */}
              <View style={styles.playerSimulator}>
                <Ionicons name="play-outline" size={60} color={COLORS.white} />
                <Text style={styles.playerLoadingText}>Streaming webinar recording...</Text>
                
                {/* Control bar */}
                <View style={styles.playerControlBar}>
                  <Ionicons name="pause" size={20} color={COLORS.white} />
                  <View style={styles.playerProgressBar}>
                    <View style={styles.playerProgressFill} />
                  </View>
                  <Text style={styles.playerTimeText}>03:14 / {activeVideo.duration}</Text>
                </View>
              </View>

              <View style={styles.videoModalBody}>
                <Text style={styles.modalPresenter}>Presented by {activeVideo.instructor}</Text>
                <Text style={styles.modalDesc}>
                  Watch this recorded webinar session to earn credits towards your continuing professional education checklist. You must complete the session to mark this training component as completed.
                </Text>
                
                <TouchableOpacity 
                  style={styles.markSessionRead}
                  onPress={() => {
                    Alert.alert('Session Recorded', 'Continuing education credits logged successfully!');
                    setActiveVideo(null);
                  }}
                >
                  <Text style={styles.markSessionText}>Mark Session as Completed</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  liveBanner: {
    margin: 16,
    borderRadius: 20,
    padding: 20,
    ...SHADOWS.medium,
  },
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    marginRight: 6,
  },
  liveText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  liveTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 6,
  },
  liveInstructor: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    marginBottom: 16,
  },
  joinLiveBtn: {
    backgroundColor: COLORS.white,
    height: 40,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  joinLiveBtnText: {
    color: '#B91C1C',
    fontSize: 13,
    fontWeight: '700',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.textDark,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  webinarCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  webinarMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  webinarTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  webinarTagText: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: '700',
  },
  webinarDuration: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  webinarTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 20,
    marginBottom: 6,
  },
  webinarInstructor: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 16,
  },
  webinarBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  timeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  timeText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  registerBtn: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerBtnInactive: {
    backgroundColor: COLORS.primary,
  },
  registeredBtnActive: {
    backgroundColor: COLORS.success + '20',
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  registerBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  registerTextInactive: {
    color: COLORS.white,
  },
  registeredTextActive: {
    color: COLORS.success,
  },
  recordedCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  videoThumbnail: {
    width: 100,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoDurationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '700',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: 18,
    marginBottom: 4,
  },
  videoInstructor: {
    fontSize: 11,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  videoViewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoViewsText: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  videoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    padding: 16,
  },
  videoModalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
  },
  videoModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  videoModalTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    marginRight: 16,
  },
  playerSimulator: {
    height: 200,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playerLoadingText: {
    color: COLORS.white,
    fontSize: 11,
    marginTop: 10,
    opacity: 0.8,
  },
  playerControlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  playerProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 10,
    borderRadius: 2,
  },
  playerProgressFill: {
    width: '40%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  playerTimeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
  },
  videoModalBody: {
    padding: 20,
  },
  modalPresenter: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 20,
  },
  markSessionRead: {
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markSessionText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
