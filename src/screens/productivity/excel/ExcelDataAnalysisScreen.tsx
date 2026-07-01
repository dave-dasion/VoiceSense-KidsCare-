import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

interface DataRow {
  id: string;
  name: string;
  department: string;
  sales: number;
}

export default function ExcelDataAnalysisScreen({ navigation }: any) {
  const [sortField, setSortField] = useState<'name' | 'sales'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterDept, setFilterDept] = useState<'All' | 'Tech' | 'Marketing'>('All');

  const initialData: DataRow[] = [
    { id: '1', name: 'Alice Smith', department: 'Tech', sales: 15000 },
    { id: '2', name: 'Bob Johnson', department: 'Marketing', sales: 12000 },
    { id: '3', name: 'Charlie Brown', department: 'Tech', sales: 18000 },
    { id: '4', name: 'Diana Prince', department: 'Marketing', sales: 22000 },
    { id: '5', name: 'Ethan Hunt', department: 'Tech', sales: 9000 },
  ];

  const handleSort = (field: 'name' | 'sales') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredData = initialData.filter(
    (row) => filterDept === 'All' || row.department === filterDept
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>4. Data Analysis</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Lesson Concept */}
        <View style={styles.lessonCard}>
          <Text style={styles.cardHeader}>Sorting & Filtering Data</Text>
          <Text style={styles.cardBody}>
            Analyzing large lists requires arranging rows in order (<Text style={{ fontWeight: '700', color: COLORS.secondary }}>Sorting</Text>) or hiding rows that don't match criteria (<Text style={{ fontWeight: '700', color: COLORS.secondary }}>Filtering</Text>).
          </Text>
          <Text style={styles.cardBody}>
            Sorting can be alphabetical (A to Z) or numeric (high to low). Filtering allows you to isolates subsets like viewing only a specific department's performance.
          </Text>
        </View>

        {/* Filter Selection */}
        <Text style={styles.sectionTitle}>Interactive Table Controls</Text>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Filter by Dept:</Text>
          {(['All', 'Tech', 'Marketing'] as const).map((dept) => (
            <TouchableOpacity
              key={dept}
              style={[styles.filterBtn, filterDept === dept && styles.filterBtnActive]}
              onPress={() => setFilterDept(dept)}
            >
              <Text style={[styles.filterText, filterDept === dept && styles.filterTextActive]}>{dept}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Interactive Sortable Grid */}
        <Text style={styles.sectionSubtitle}>Tap column headers (Staff or Sales) to sort rows dynamically:</Text>
        <View style={styles.table}>
          {/* Table Headers */}
          <View style={styles.tableRowHeader}>
            <TouchableOpacity style={[styles.thCell, { flex: 1.5 }]} onPress={() => handleSort('name')}>
              <View style={styles.headerCellContent}>
                <Text style={styles.thText}>Staff Name</Text>
                {sortField === 'name' && (
                  <Ionicons
                    name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
                    size={12}
                    color={COLORS.secondary}
                    style={{ marginLeft: 4 }}
                  />
                )}
              </View>
            </TouchableOpacity>

            <View style={[styles.thCell, { flex: 1 }]}>
              <Text style={styles.thText}>Department</Text>
            </View>

            <TouchableOpacity style={[styles.thCell, { flex: 1, alignItems: 'flex-end' }]} onPress={() => handleSort('sales')}>
              <View style={styles.headerCellContent}>
                <Text style={styles.thText}>Sales ($)</Text>
                {sortField === 'sales' && (
                  <Ionicons
                    name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
                    size={12}
                    color={COLORS.secondary}
                    style={{ marginLeft: 4 }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Table Body */}
          {sortedData.map((row) => (
            <View key={row.id} style={styles.tableRow}>
              <Text style={[styles.tdCell, { flex: 1.5 }]}>{row.name}</Text>
              <Text style={[styles.tdCell, { flex: 1 }]}>{row.department}</Text>
              <Text style={[styles.tdCell, { flex: 1, textAlign: 'right', fontWeight: '700' }]}>
                {row.sales.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Lesson Navigation CTA */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ExcelPivotTables')}
        >
          <Text style={styles.nextButtonText}>Proceed to Pivot Tables</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: FONTS.bold,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 14,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginRight: 12,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 6,
    backgroundColor: COLORS.white,
  },
  filterBtnActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  table: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.light,
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#EDF2F7',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  thCell: {
    justifyContent: 'center',
  },
  headerCellContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  tdCell: {
    fontSize: 12,
    color: COLORS.textDark,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
