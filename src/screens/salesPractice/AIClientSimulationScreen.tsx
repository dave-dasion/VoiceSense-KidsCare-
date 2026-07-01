import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { CLIENT_PROFILES, ClientProfile } from './mockSalesPracticeData';

export default function AIClientSimulationScreen({ navigation }: any) {
  const [selectedClientId, setSelectedClientId] = useState<string>(CLIENT_PROFILES[0].id);

  const handleStartSimulation = () => {
    navigation.navigate('MockSalesConversation');
  };

  const getTemperamentColor = (temp: ClientProfile['temperament']) => {
    switch (temp) {
      case 'Skeptical':
        return '#DD6B20'; // Orange
      case 'Friendly':
        return '#38A169'; // Green
      case 'Detail-Oriented':
        return '#3182CE'; // Blue
      default:
        return '#E53E3E'; // Red (Aggressive)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Client Simulation</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Intro Banner */}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Choose Your Persona</Text>
          <Text style={styles.introBody}>
            Select a simulated buyer with randomized temperament rules to test your objection handling, rapport building, and compliance pitches.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Simulated Buyer Directory</Text>

        {CLIENT_PROFILES.map((client) => {
          const isSelected = selectedClientId === client.id;
          const tempColor = getTemperamentColor(client.temperament);

          return (
            <TouchableOpacity
              key={client.id}
              style={[
                styles.profileCard,
                isSelected && styles.profileCardSelected
              ]}
              onPress={() => setSelectedClientId(client.id)}
            >
              <View style={styles.profileHeader}>
                <View style={styles.avatarCircle}>
                  <Ionicons name={client.avatar as any} size={22} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <Text style={styles.clientMeta}>{client.role} • {client.industry}</Text>
                </View>

                {/* Temperament tag */}
                <View style={[
                  styles.tempBadge,
                  { borderColor: tempColor, backgroundColor: `${tempColor}10` }
                ]}>
                  <Text style={[styles.tempText, { color: tempColor }]}>
                    {client.temperament}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.scenarioLabel}>Active Scenario:</Text>
              <Text style={styles.scenarioDesc}>{client.scenario}</Text>

              {isSelected && (
                <View style={styles.selectedIndicator}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} style={{ marginRight: 6 }} />
                  <Text style={styles.selectedIndicatorText}>Selected persona</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Start Button */}
        <TouchableOpacity style={styles.startBtn} onPress={handleStartSimulation}>
          <Text style={styles.startBtnText}>Launch Roleplay Session</Text>
          <Ionicons name="play" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
        </TouchableOpacity>

      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  introCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  introTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  introBody: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
    fontFamily: FONTS.bold,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    ...SHADOWS.light,
  },
  profileCardSelected: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 22,
  },
  clientName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  clientMeta: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  tempBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tempText: {
    fontSize: 8.5,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2F7',
    marginVertical: 12,
  },
  scenarioLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  scenarioDesc: {
    fontSize: 11.5,
    color: COLORS.textDark,
    lineHeight: 17,
    marginTop: 4,
    fontWeight: '500',
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  selectedIndicatorText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  startBtn: {
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    ...SHADOWS.medium,
  },
  startBtnText: {
    color: COLORS.white,
    fontSize: 13.5,
    fontWeight: '700',
  },
});
