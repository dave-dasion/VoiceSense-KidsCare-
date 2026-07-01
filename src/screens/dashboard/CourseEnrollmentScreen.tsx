import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Course, enrollInCatalogCourse } from './CourseCatalogScreen';

export default function CourseEnrollmentScreen({ route, navigation }: any) {
  const { course }: { course: Course } = route.params;

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [processing, setProcessing] = useState(false);

  const originalPrice = course.price === 'Free' ? 0 : parseFloat(course.price.replace('$', ''));
  const discount = promoApplied ? originalPrice : 0;
  const totalPrice = originalPrice - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'FREEPASS') {
      setPromoApplied(true);
      Alert.alert('Promo Applied!', 'The FREEPASS promo code has discounted this course by 100%.');
    } else {
      Alert.alert('Invalid Promo Code', 'Try using code: FREEPASS');
    }
  };

  const handleCheckout = () => {
    // If not free, validate dummy card fields
    if (totalPrice > 0) {
      if (!cardNumber || !expiry || !cvv || !cardholder) {
        Alert.alert('Validation Error', 'Please fill in all credit card payment fields.');
        return;
      }
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      // Update catalog data store
      enrollInCatalogCourse(course.id);
      
      Alert.alert(
        'Enrollment Complete!',
        `You have successfully enrolled in ${course.title}!`,
        [
          {
            text: 'Go to Course Hub',
            onPress: () => {
              // Redirect to CourseOverview
              navigation.replace('CourseOverview', {
                course: { ...course, isEnrolled: true },
              });
            },
          },
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout Enrollment</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Course Brief */}
        <View style={styles.checkoutCard}>
          <Text style={styles.summaryTitle}>Course Selection</Text>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseMeta}>
            Instructor: {course.instructor} • {course.duration}
          </Text>
        </View>

        {/* Promo Code Input */}
        {originalPrice > 0 && (
          <View style={styles.promoContainer}>
            <Text style={styles.sectionLabel}>Promo Code</Text>
            <View style={styles.promoInputRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="Enter discount code (e.g. FREEPASS)"
                placeholderTextColor={COLORS.textLight}
                value={promoCode}
                onChangeText={setPromoCode}
                editable={!promoApplied}
              />
              <TouchableOpacity
                style={[styles.promoBtn, promoApplied && styles.promoBtnApplied]}
                onPress={handleApplyPromo}
                disabled={promoApplied || !promoCode}
              >
                <Text style={styles.promoBtnText}>{promoApplied ? 'Applied' : 'Apply'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Pricing breakdown */}
        <View style={styles.billingCard}>
          <Text style={styles.billingTitle}>Billing Summary</Text>
          
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Original Price</Text>
            <Text style={styles.billVal}>${originalPrice.toFixed(2)}</Text>
          </View>

          {promoApplied && (
            <View style={styles.billRow}>
              <Text style={[styles.billLabel, { color: COLORS.success }]}>Promo Discount (100%)</Text>
              <Text style={[styles.billVal, { color: COLORS.success }]}>-${originalPrice.toFixed(2)}</Text>
            </View>
          )}

          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Charge</Text>
            <Text style={styles.totalVal}>${totalPrice.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Card details */}
        {totalPrice > 0 && (
          <View style={styles.paymentCard}>
            <Text style={styles.paymentTitle}>Payment Information</Text>
            
            <Text style={styles.inputLabel}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor={COLORS.textLight}
              value={cardholder}
              onChangeText={setCardholder}
            />

            <Text style={styles.inputLabel}>Credit Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="4111 2222 3333 4444"
              placeholderTextColor={COLORS.textLight}
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />

            <View style={styles.halfRow}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor={COLORS.textLight}
                  value={expiry}
                  onChangeText={setExpiry}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.inputLabel}>Security Code (CVV)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor={COLORS.textLight}
                  keyboardType="numeric"
                  secureTextEntry
                  value={cvv}
                  onChangeText={setCvv}
                />
              </View>
            </View>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.checkoutBtn, processing && styles.checkoutBtnDisabled]}
          onPress={handleCheckout}
          disabled={processing}
        >
          {processing ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <>
              <Text style={styles.checkoutBtnText}>
                {totalPrice === 0 ? 'Activate Course Access' : `Pay & Complete Purchase`}
              </Text>
              <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
            </>
          )}
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
  checkoutCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
  },
  courseMeta: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  promoContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  promoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoBtn: {
    backgroundColor: COLORS.secondary,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
    marginLeft: 8,
  },
  promoBtnApplied: {
    backgroundColor: COLORS.success,
  },
  promoBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  billingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 16,
  },
  billingTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  billLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  billVal: {
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '700',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 10,
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: '800',
  },
  totalVal: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  paymentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 14,
  },
  halfRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkoutBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  checkoutBtnDisabled: {
    opacity: 0.7,
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
