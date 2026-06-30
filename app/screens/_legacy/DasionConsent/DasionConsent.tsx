// import { NavStatelessComponent } from 'interfaces';
// import React, { useCallback, useRef, useState } from 'react';
// import {
//   View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView
// } from 'react-native';
// import navigationOptions from './DasionConsent.navigationOptions';
// import { Colors } from 'style';
// import { Button, Text } from 'components';
// import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from "expo-document-picker";
// import RBSheet from 'react-native-raw-bottom-sheet';


// const DasionConsent: NavStatelessComponent = () => {
//   const bottomSheetModalRef = useRef<any>(null);

//   const [patient, setPatient] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     contact: '',
//     email: '',
//     emergencyContact: '',
//     notes: ''
//   });



//   const handleSubmit = () => {
//     const { name, age, gender, contact } = patient;
//     if (!name || !age || !gender || !contact) {
//       Alert.alert('Missing Info', 'Please fill all required fields.');
//       return;
//     }
//     // Do something with the patient info (e.g., API call)
//     Alert.alert('Saved', 'Patient information has been submitted.');
//   };


//   const pickImage = async () => {
//     // Request permission to access the camera roll
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert('Permission to access camera roll is required!');
//       return;
//     }

//     // Launch the image picker
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images, // You can specify the media types
//       allowsEditing: true, // Allows the user to edit the image
//       aspect: [4, 3], // Aspect ratio of the crop
//       quality: 1, // Image quality (0 to 1)
//     });

//     if (!result.cancelled) {
//       console.log('Image URI:', result.uri);
//       bottomSheetModalRef.current?.close()
//       // Do something with the image URI, e.g., display it or upload it
//     }
//   };


//   const pickDocument = async () => {
//     // Ask the user to pick a document
//     const result = await DocumentPicker.getDocumentAsync({
//       type: "*/*", // You can specify the types of documents you want to allow
//       copyToCacheDirectory: true, // Optional, to copy the file to cache
//     });

//     if (result.type === "success") {
//       // Handle successful document picking
//       console.log("Document URI:", result.uri);
//       console.log("Document Name:", result.name);
//       console.log("Document Size:", result.size);
//       bottomSheetModalRef.current?.close()
//     } else {
//       // Handle user cancellation or errors
//       console.log("Document picking canceled");
//     }
//   };

//   const handleChange = ()=>{

//   }

//   const openCamera = async () => {
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert('Permission to access the camera is required!');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       // setCapturedImage(result.uri);
//     }
//   };
//   return (
//     <SafeAreaView style={styles.safeArea}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <Text.H3>Patient Information</Text.H3>
//           <InputField label="Full Name" value={patient.name} onChange={(val) => {handleChange('name', val)}} required />
//           <InputField label="Date of birth" value={patient.age} onChange={(val) => {handleChange('age', val)}} keyboardType="numeric" required />
//           <InputField label="Phone Number" value={patient.gender} onChange={(val) => {handleChange('gender', val)}} required />
//           <Text.Header>Provider or Facility Releasing Records</Text.Header>
//           <InputField label="Hospital/Clinic Name" value={patient.contact} onChange={(val) => {handleChange('contact', val)}} keyboardType="phone-pad" required />
//           <InputField label="Email Address" value={patient.email} onChange={(val) => {handleChange('email', val)}} keyboardType="email-address" />
//           <InputField label="Address" value={patient.email} onChange={(val) => {handleChange('email', val)}} keyboardType="email-address" />
//           <InputField label="Emergency Contact" value={patient.emergencyContact} onChange={(val) => {handleChange('emergencyContact', val)}} keyboardType="phone-pad" />
//           <InputField label="Medical Notes / Condition" value={patient.notes} onChange={(val) => {handleChange('notes', val)}} multiline />

//           <TouchableOpacity style={styles.button} onPress={() => bottomSheetModalRef.current?.open()}>
//             <Text.H3 style={styles.buttonText}>Upload your document</Text.H3>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//             <Text.H3 style={styles.buttonText}>Submit</Text.H3>
//           </TouchableOpacity>
//           <View style={styles.padding} />
//           {/* <BottomSheetModal
//             // conta
//             ref={bottomSheetModalRef}
//             onChange={handleSheetChanges}
//           >
//             <BottomSheetView style={styles.contentContainer}>
//               <Text>Select Option</Text>
//               <View style={{height:20}}/>
//               <Button.Primary
//                 style={{
//                   width: "90%",
//                   alignSelf: "center",
//                   marginBottom:10
//                 }}
//                 onPress={()=>{
//                   pickDocument()
//                 }}
//                 text="Select Document"
//                 // color="black"
//               />

//               <Button.Primary
//                 style={{
//                   width: "90%",
//                   alignSelf: "center",
//                   marginBottom:10
//                 }}
//                 onPress={async ()=>{
//                   pickImage();
              
//                 }}
//                 text="Select Image"
//                 // color="black"
//               />

              
//               <Button.Primary
//                 style={{
//                   width: "90%",
//                   alignSelf: "center",
//                   marginBottom:10,
//                   backgroundColor:'red'
//                 }}
//                 onPress={()=>{
//                   bottomSheetModalRef.current?.dismiss();
//                 }}
//                 text="Cancel"
//                 // color="black"
//               />
//             </BottomSheetView>
//           </BottomSheetModal> */}

//           <RBSheet
//             ref={bottomSheetModalRef}
//             draggable={false}
//             customStyles={{
//               wrapper: {
//                 backgroundColor: "rgba(0, 0, 0, 0.4)",
//               },
//               container: {
//                 borderRadius: 10,
//               },
//             }}
//             height={250}
//           >
//             <View
//               style={
//                 {
//                   // flex: 1,
//                   // alignItems: "center",
//                   // padding: 20
//                 }
//               }
//             >
//               <View
//                 style={{
//                   height: 50,
//                   width: "100%",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   backgroundColor: "white",
//                   shadowColor: "#000",
//                   shadowOffset: {
//                     width: 0,
//                     height: 1,
//                   },
//                   shadowOpacity: 0.18,
//                   shadowRadius: 1.0,

//                   elevation: 1,
//                 }}
//               >
//                 <Text.H2 style={{ alignSelf: "center" }}>Upload your document</Text.H2>
//               </View>
//               <View style={{ height: 20 }} />
//               <Button.Primary
//                 style={{
//                   width: "90%",
//                   alignSelf: "center",
//                   marginBottom:10
//                 }}
//                 onPress={()=>{
//                   pickDocument()
//                 }}
//                 text="Select Document"
//                 // color="black"
//               />

//               <Button.Primary
//                 style={{
//                   width: "90%",
//                   alignSelf: "center",
//                   marginBottom:10
//                 }}
//                 onPress={async ()=>{
//                   pickImage();
              
//                 }}
//                 text="Select Image"
//                 // color="black"
//               />

              
//               <Button.Primary
//                 style={{
//                   width: "90%",
//                   alignSelf: "center",
//                   marginBottom:10,
//                   backgroundColor:'red'
//                 }}
//                 onPress={()=>{
//                   bottomSheetModalRef.current?.close();
//                 }}
//                 text="Cancel"
//                 // color="black"
//               />

//             </View>
//           </RBSheet>
//         </ScrollView>
//     </SafeAreaView>
//   );
// };

// const InputField = ({ label, value, onChange, required, ...props }) => (
//   <View style={styles.inputWrapper}>
//     <Text.H3 style={styles.label}>
//       {label} {required && <Text.H3 style={{ color: 'red' }}>*</Text.H3>}
//     </Text.H3>
//     <TextInput
//       style={styles.input}
//       value={value}
//       onChangeText={onChange}
//       placeholder={label}
//       placeholderTextColor="#aaa"
//       {...props}
//     />
//   </View>
// );

// DasionConsent.navigationOptions = navigationOptions;


// export default DasionConsent;


// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f0f4f7',
//   },
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     margin: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 6,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: Colors.AppColor,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   inputWrapper: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 6,
//   },
//   input: {
//     backgroundColor: '#f9f9f9',
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     fontSize: 16,
//     color: '#000',
//   },
//   button: {
//     backgroundColor: Colors.AppColor,
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//     shadowColor: Colors.AppColor,
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 4 },
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   padding: {
//     paddingBottom: 30
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     // height:499,
//     // backgroundColor:'red'
//   },
// });

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
import CheckBoxSec from 'components/CheckBoxSec'; // ✅ use your custom checkbox
import { NavStatelessComponent } from 'interfaces';
import navigationOptions from './DasionConsent.navigationOptions';

const DasionConsent: NavStatelessComponent = () => {  // 👤 Patient Info
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
          onPress={() => setIsDobPickerVisible(true)} // Open the date picker on press
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
            setIsDobPickerVisible(false); // Close the picker after selecting a date
          }}
          onCancel={() => setIsDobPickerVisible(false)} // Close the picker without selecting a date
        />
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

      <Section title="📎 Upload Required Document">
        <Text style={styles.info}>Upload ID, power of attorney, or legal document</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={handleDocumentPick}>
          <Text style={styles.uploadBtnText}>Upload Document</Text>
        </TouchableOpacity>
        {uploadedFile && <Text style={styles.fileName}>{uploadedFile.name}</Text>}
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
