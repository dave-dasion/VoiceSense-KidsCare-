import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBoxSec from 'components/CheckBoxSec'; 
import { NavStatelessComponent } from 'interfaces';
import navigationOptions from './RequestDocument.navigationOptions';

const DasionConsent: NavStatelessComponent = () => {
  // 👤 Patient Info
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [isDobPickerVisible, setIsDobPickerVisible] = useState(false); // Date picker visibility for dob
  const [phone, setPhone] = useState('');
  const [hospitalName, setHospitalName] = useState(''); 

  // 📄 Records Checkboxes (individual states)
  const [isAll, setIsAll] = useState(false);
  const [isNotes, setIsNotes] = useState(false);
  const [isLabs, setIsLabs] = useState(false);
  const [isImaging, setIsImaging] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [otherRecord, setOtherRecord] = useState('');

  // 📆 Date range
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isFromDatePickerVisible, setIsFromDatePickerVisible] = useState(false); // Date picker visibility for from date
  const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false); // Date picker visibility for to date

  // 📤 Where to send
  const [sendToMe, setSendToMe] = useState(false);
  const [sendToProvider, setSendToProvider] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [emailFax, setEmailFax] = useState('');

  // 📎 Upload
  const [uploadedFile, setUploadedFile] = useState(null);

  // ✍️ Authorization
  const [signature, setSignature] = useState('');
  const [signatureDate, setSignatureDate] = useState(new Date());
  const [isSigDatePickerVisible, setIsSigDatePickerVisible] = useState(false); // Date picker visibility for signature date

  // 📎 Upload Handler
  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/jpeg', 'image/png'],
    });
    if (result.type === 'success') {
      setUploadedFile(result);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📝 Patient Request for Medical Records</Text>

      <Section title="👤 Patient Information">
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <Text style={styles.dateLabel}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setIsDobPickerVisible(true)} 
        >
          <View >
          <Text  style={styles.input}>{dob.toDateString()}</Text>

          </View>
          {/* <TextInput
            style={styles.input}
            value={dob.toDateString()}
            editable={false}
          /> */}
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDobPickerVisible}
          mode="date"
          date={dob}
          onConfirm={(selectedDate) => {
            setDob(selectedDate);
            setIsDobPickerVisible(false); 
          }}
          onCancel={() => setIsDobPickerVisible(false)} 
        />
                <Text style={styles.dateLabel}>Phone Number</Text>

        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </Section>

      <Section title="🏥 Facility Releasing Records">
        <TextInput
          placeholder="Hospital/Clinic Name"
          style={styles.input}
          value={hospitalName}
          onChangeText={setHospitalName}
        />
      </Section>

      <Section title="📄 Records Requested">
        <View style={styles.checkRow}>
          <CheckBoxSec value={isAll} checkOnpress={() => setIsAll(!isAll)} />
          <Text style={styles.checkLabel}>All Records</Text>
        </View>
        <View style={styles.checkRow}>
          <CheckBoxSec value={isNotes} checkOnpress={() => setIsNotes(!isNotes)} />
          <Text style={styles.checkLabel}>Visit Notes</Text>
        </View>
        <View style={styles.checkRow}>
          <CheckBoxSec value={isLabs} checkOnpress={() => setIsLabs(!isLabs)} />
          <Text style={styles.checkLabel}>Lab Results</Text>
        </View>
        <View style={styles.checkRow}>
          <CheckBoxSec value={isImaging} checkOnpress={() => setIsImaging(!isImaging)} />
          <Text style={styles.checkLabel}>Imaging/X-Ray Reports</Text>
        </View>
        <View style={styles.checkRow}>
          <CheckBoxSec value={isOther} checkOnpress={() => setIsOther(!isOther)} />
          <Text style={styles.checkLabel}>Other</Text>
        </View>
        {isOther && (
          <TextInput
            placeholder="Please specify"
            style={styles.input}
            value={otherRecord}
            onChangeText={setOtherRecord}
          />
        )}
      </Section>

      <Section title="📆 Date Range of Records">
        <Text style={styles.dateLabel}>From</Text>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setIsFromDatePickerVisible(true)} // Open the date picker for From Date
        >
         
          <View  style={styles.input}>
           <Text>{fromDate.toDateString()}</Text>
          </View>

        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isFromDatePickerVisible}
          mode="date"
          date={fromDate}
          onConfirm={(selectedDate) => {
            setFromDate(selectedDate);
            setIsFromDatePickerVisible(false); // Close the picker after selecting a date
          }}
          onCancel={() => setIsFromDatePickerVisible(false)} // Close the picker without selecting a date
        />

        <Text style={styles.dateLabel}>To</Text>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setIsToDatePickerVisible(true)} // Open the date picker for To Date
        >
          <View  style={styles.input}>
           <Text>{toDate.toDateString()}</Text>
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isToDatePickerVisible}
          mode="date"
          date={toDate}
          onConfirm={(selectedDate) => {
            setToDate(selectedDate);
            setIsToDatePickerVisible(false); // Close the picker after selecting a date
          }}
          onCancel={() => setIsToDatePickerVisible(false)} // Close the picker without selecting a date
        />
      </Section>

      <Section title="📤 Where Should Records Be Sent?">
        <View style={styles.checkRow}>
          <CheckBoxSec value={sendToMe} checkOnpress={() => setSendToMe(!sendToMe)} />
          <Text style={styles.checkLabel}>Send to me (email/app)</Text>
        </View>
        <View style={styles.checkRow}>
          <CheckBoxSec value={sendToProvider} checkOnpress={() => setSendToProvider(!sendToProvider)} />
          <Text style={styles.checkLabel}>Send to provider/person</Text>
        </View>
        <TextInput
          placeholder="Recipient Name"
          style={styles.input}
          value={recipientName}
          onChangeText={setRecipientName}
        />
        <TextInput
          placeholder="Email or Fax"
          style={styles.input}
          value={emailFax}
          onChangeText={setEmailFax}
        />
      </Section>


      <Section title="✍️ Authorization">
        <Text style={styles.authText}>
          “I authorize the release of my medical records as indicated above. I understand this request complies with HIPAA and is valid for one year unless revoked in writing.”
        </Text>
        <TextInput
          placeholder="Digital Signature"
          style={styles.input}
          value={signature}
          onChangeText={setSignature}
        />
        <Text style={styles.dateLabel}>Signature Date</Text>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setIsSigDatePickerVisible(true)} // Open the date picker for signature date
        >
          <TextInput
            style={styles.input}
            value={signatureDate.toDateString()}
            editable={false}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isSigDatePickerVisible}
          mode="date"
          date={signatureDate}
          onConfirm={(selectedDate) => {
            setSignatureDate(selectedDate);
            setIsSigDatePickerVisible(false); // Close the picker after selecting a date
          }}
          onCancel={() => setIsSigDatePickerVisible(false)} // Close the picker without selecting a date
        />
      </Section>
    </ScrollView>
  );
}

// 🔹 Reusable Section Wrapper
const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

DasionConsent.navigationOptions = navigationOptions;

export default DasionConsent



const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  inputWrapper: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  dateLabel: { marginBottom: 4, fontWeight: '500' },
  uploadBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadBtnText: { color: '#fff', fontWeight: 'bold' },
  fileName: { marginTop: 8, fontStyle: 'italic', color: '#444' },
  info: { color: '#555', marginBottom: 10 },
  authText: { fontSize: 14, color: '#333', marginBottom: 12 },
});
