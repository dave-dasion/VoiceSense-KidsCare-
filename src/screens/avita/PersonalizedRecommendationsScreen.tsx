import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { PERSONALIZED_RECOMMENDATIONS, RecommendationItem } from './mockAvitaData';

export default function PersonalizedRecommendationsScreen({ navigation }: any) {
  
  const handleStartRecommendation = (item: RecommendationItem) => {
    Alert.alert(
      'Start Recommended Study',
      `Would you like to open: "${item.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Begin Now',
          onPress: () => {
            if (item.route) {
              navigation.navigate(item.route);
            }
          },
        },
      ]
    );
  };

  const getPriorityColor = (priority: RecommendationItem['priority']) => {
    switch (priority) {
      case 'High':
        return COLORS.danger;
      case 'Medium':
        return COLORS.secondary;
      default:
        return COLORS.success;
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
        <Text style={styles.headerTitle}>Personalized Path</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Recommendation Header Card */}
        <View style={styles.advisorCard}>
          <View style={styles.advisorHeader}>
            <Text style={styles.advisorIcon}>💡</Text>
            <View>
              <Text style={styles.advisorTitle}>Avita recommendations</Text>
              <Text style={styles.advisorSub}>Updated 10 minutes ago</Text>
            </View>
          </View>
          <Text style={styles.advisorBody}>
            These assignments are dynamically curated based on your quiz mistakes and incomplete simulation attempts.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Tailored Study Queue</Text>

        {PERSONALIZED_RECOMMENDATIONS.map((item) => {
          const priorityColor = getPriorityColor(item.priority);
          return (
            <View key={item.id} style={[styles.recCard, { borderLeftColor: priorityColor, borderLeftWidth: 4 }]}>
              <View style={styles.cardTopRow}>
                <View style={[styles.iconBg, { backgroundColor: `${item.color}15` }]}>
                  <Ionicons name={item.icon as any} size={22} color={item.color} />
                </View>
                
                <View style={styles.titleCol}>
                  <Text style={styles.recTitle}>{item.title}</Text>
                  <View style={styles.metaRow}>
                    <Ionicons name="time-outline" size={12} color={COLORS.textLight} style={{ marginRight: 4 }} />
                    <Text style={styles.metaText}>{item.duration}</Text>
                  </View>
                </View>

                {/* Priority Badge */}
                <View style={[
                  styles.priorityBadge,
                  { borderColor: priorityColor, backgroundColor: `${priorityColor}10` }
                ]}>
                  <Text style={[styles.priorityText, { color: priorityColor }]}>
                    {item.priority}
                  </Text>
                </View>
              </View>

              <Text style={styles.reasonText}>{item.reason}</Text>

              {/* Action Button */}
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: item.color }]}
                onPress={() => handleStartRecommendation(item)}
              >
                <Text style={styles.actionBtnText}>Begin Study</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.white} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          );
        })}

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
  advisorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  advisorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  advisorIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  advisorTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  advisorSub: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 1,
  },
  advisorBody: {
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
  recCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleCol: {
    flex: 1,
  },
  recTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  metaText: {
    fontSize: 10.5,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  priorityBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  reasonText: {
    fontSize: 11.5,
    color: COLORS.textLight,
    lineHeight: 16,
    marginBottom: 14,
    fontWeight: '500',
  },
  actionBtn: {
    height: 38,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: COLORS.white,
    fontSize: 12.5,
    fontWeight: '700',
  },
});
