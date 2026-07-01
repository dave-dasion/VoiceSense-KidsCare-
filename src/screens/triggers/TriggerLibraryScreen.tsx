import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface TriggerItem {
  id: string;
  name: string;
  category: 'Schedule' | 'Webhook' | 'API' | 'Email' | 'Database' | 'Manual' | 'Event';
  icon: string;
  desc: string;
  screenName: string;
  popular?: boolean;
}

export default function TriggerLibraryScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const triggers: TriggerItem[] = [
    {
      id: 'trig-1',
      name: 'Schedule Trigger (Cron)',
      category: 'Schedule',
      icon: 'time-outline',
      desc: 'Execute workflows automatically based on dates, times, or recurring intervals.',
      screenName: 'ScheduleTrigger',
      popular: true,
    },
    {
      id: 'trig-2',
      name: 'Webhook Listener',
      category: 'Webhook',
      icon: 'globe-outline',
      desc: 'Start workflows instantly when external services trigger HTTP callbacks.',
      screenName: 'WebhookTrigger',
      popular: true,
    },
    {
      id: 'trig-3',
      name: 'API Polling Listener',
      category: 'API',
      icon: 'cloud-download-outline',
      desc: 'Trigger workflows through REST endpoints and custom API integrations.',
      screenName: 'ApiTrigger',
    },
    {
      id: 'trig-4',
      name: 'Email Event Receiver',
      category: 'Email',
      icon: 'mail-outline',
      desc: 'Trigger actions when emails match sender filters or contain attachments.',
      screenName: 'EmailTrigger',
      popular: true,
    },
    {
      id: 'trig-5',
      name: 'Database Change Listener',
      category: 'Database',
      icon: 'server-outline',
      desc: 'Monitor DB events (Inserts, Updates, Deletes) to launch automations.',
      screenName: 'DatabaseTrigger',
    },
    {
      id: 'trig-6',
      name: 'Manual Tap Trigger',
      category: 'Manual',
      icon: 'finger-print-outline',
      desc: 'Start pipelines manually with one-tap widgets or dashboard buttons.',
      screenName: 'ManualTrigger',
    },
    {
      id: 'trig-7',
      name: 'App System Event',
      category: 'Event',
      icon: 'notifications-outline',
      desc: 'React immediately to user signups, invoice receipts, or payment completion events.',
      screenName: 'EventTrigger',
    },
  ];

  const categories = ['All', 'Schedule', 'Webhook', 'API', 'Email', 'Database', 'Manual', 'Event'];

  const filteredTriggers = triggers
    .filter((trig) => trig.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((trig) => selectedCategory === 'All' || trig.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trigger Library</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Search */}
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search triggers..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories horizontal scroll */}
        <View style={{ height: 44, marginBottom: 16 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.catBadge, selectedCategory === cat && styles.catBadgeActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trigger list */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollList}>
          {filteredTriggers.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.trigCard}
              onPress={() => navigation.navigate(item.screenName)}
            >
              <View style={styles.trigHeader}>
                <View style={styles.iconWrapper}>
                  <Ionicons name={item.icon as any} size={22} color={COLORS.secondary} />
                </View>
                <View style={styles.badgeRow}>
                  {item.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>POPULAR</Text>
                    </View>
                  )}
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.trigName}>{item.name}</Text>
              <Text style={styles.trigDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
  },
  categoryRow: {
    paddingRight: 16,
    alignItems: 'center',
  },
  catBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catBadgeActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  catText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  catTextActive: {
    color: COLORS.white,
  },
  scrollList: {
    paddingBottom: 40,
  },
  trigCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  trigHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularBadge: {
    backgroundColor: 'rgba(214, 158, 46, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  popularText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#D69E2E',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  trigName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  trigDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    lineHeight: 16,
  },
});
