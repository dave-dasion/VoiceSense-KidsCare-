import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import Stap1 from "screens/Step1/Step1";
import Stap2 from "screens/Step2/Step2";
import Step3 from "screens/Step3/Step3";
import Step4 from "screens/Step4/Step4";
import Step5 from "screens/Step5/Step5";
import Step6 from "screens/Step6/Step6";
import navigationOptions from "./StapperScreen.navigationOptions";
import { Colors } from "style";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";
import Step7 from "screens/Step7/Step7";

const labels = [
  "RedFlags",
  "ObservationSigns",
  "MemoryAssessments",
  "Examinition",
  "Summary",
  "Voice",
  "step7",
  "step8",
];

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "green",
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: "green",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "green",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "green",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "green",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#ffffff",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "green",
  labelColor: "#999999",
  currentStepLabelColor: "green",
};

const Stepper = (props) => {
  const { height } = Dimensions.get("window"); // Get screen height

  const [currentStep, setCurrentStep] = useState(props.route.params.steps - 1);

  const handleNext = () => {
    if (currentStep < labels.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const Step7 = () => {
    

  //   return (
  //     <View>
       

  //       <Text
  //         style={{
  //           fontSize: 18,
  //           color: Colors.AppColorSecondory,
  //           fontWeight: "bold",
  //           marginTop: "5%",
  //         }}
  //       >
  //         {"STEP 7: SUMMARY"}
  //       </Text>

  //       <ScrollView style={styles.container}>
  //         {data.map((item) => (
  //           <View key={item.id} style={styles.item}>
  //             <Text style={styles.title}>{item.title}</Text>
  //             <Text style={styles.description}>{item.description}</Text>
  //           </View>
  //         ))}
  //       </ScrollView>

  //       {/* <WebView
  //         style={{ width: "100%", height: height * 0.6 }}
  //         originWhitelist={["*"]}
  //         source={{
  //           uri:
  //             "https://eldercare-prof-pdf-storage.s3.amazonaws.com/d4332c8b-f49c-4547-bdfc-dea828e8c9ca.pdf?AWSAccessKeyId=AKIAV6VZDFR5MGEHXV4B&Signature=h9C83zZRhF3CQtQqcET1%2BdVGAmU%3D&Expires=1740645965",
  //         }}
  //       /> */}
  //     </View>
  //   );
  // };
  const Step8 = () => {
    return (
      <View>
        {/* <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              WebBrowser.openBrowserAsync("http://dev.dasion-guider.com:3000/");
            }}
          >
            <Image
              style={{ height: 90, width: 80, resizeMode: "cover" }}
              source={require("../../../assets/images/Emily.png")}
            />
          </TouchableOpacity>
        </View> */}

        <Text
          style={{
            fontSize: 18,
            color: Colors.AppColorSecondory,
            fontWeight: "bold",
            marginTop: "5%",
          }}
        >
          {"STEP 8: Voice characteristic Analytic"}
        </Text>

        <WebView
          style={{ width: "100%", height: height * 0.6 }}
          originWhitelist={["*"]}
          source={{ uri: "https://pdfobject.com/pdf/sample.pdf" }}
        />
      </View>
    );
  };

  // Render the appropriate component based on currentStep
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Stap1 />;
      case 1:
        return <Stap2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
      case 4:
        return <Step5 />;
      case 5:
        return <Step6 />;
      case 6:
        return <Step7 />;
      case 7:
        return <Step8 />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#ffff" }}>
      {/* <WebView
      // style={styles.container}
      source={{ uri: 'https://pdfobject.com/pdf/sample.pdf' }}
    /> */}
      {/* <WebView originWhitelist={["*"]} source={{ uri: "https://example.com" }} /> */}
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep}
        stepCount={labels.length}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginTop: 20 }}>{renderStepContent()}</View>
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        <TouchableOpacity
          onPress={handleBack}
          disabled={currentStep === 0}
          style={{
            backgroundColor: currentStep === 0 ? "#cccccc" : Colors.AppColor,
            padding: 15,
            borderRadius: 5,
            width: 100,
            height: 50,
            alignItems: "center",
          }}
        >
          <Text style={{ color: currentStep === 0 ? "Black" : Colors.white, fontSize: 18 }}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          disabled={currentStep === labels.length - 1}
          style={{
            backgroundColor: currentStep === labels.length - 1 ? "#cccccc" : Colors.AppColor,
            padding: 15,
            borderRadius: 5,
            width: 100,
            height: 50,
            alignItems: "center",
          }}
        >
          <Text style={{ color: currentStep === 7 ? "Black" : Colors.white, fontSize: 18 }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Stepper.navigationOptions = navigationOptions;
export default Stepper;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
// import StepIndicator from 'react-native-step-indicator';
// import Stap1 from 'screens/Step1/Step1';
// import Stap2 from 'screens/Step2/Step2';
// import Step3 from 'screens/Step3/Step3';
// import Step4 from 'screens/Step4/Step4';
// import navigationOptions from './StapperScreen.navigationOptions';
// import Colors from 'style/colors/Colors';
// import { WebView } from "react-native-webview";

// const labels = ["RedFlags", "ObservationSigns", "MemoryAssessments", "Examinition", "Summary","Voice"];

// const customStyles = {
//   stepIndicatorSize: 30,
//   currentStepIndicatorSize: 40,
//   separatorStrokeWidth: 2,
//   currentStepStrokeWidth: 3,
//   stepStrokeCurrentColor: 'green',
//   stepStrokeWidth: 2,
//   stepStrokeFinishedColor: 'green',
//   stepStrokeUnFinishedColor: '#aaaaaa',
//   separatorFinishedColor: 'green',
//   separatorUnFinishedColor: '#aaaaaa',
//   stepIndicatorFinishedColor: 'green',
//   stepIndicatorUnFinishedColor: '#ffffff',
//   stepIndicatorCurrentColor: 'green',
//   stepIndicatorLabelFontSize: 13,
//   currentStepIndicatorLabelFontSize: 13,
//   stepIndicatorLabelCurrentColor: '#ffffff',
//   stepIndicatorLabelFinishedColor: '#ffffff',
//   stepIndicatorLabelUnFinishedColor: 'green',
//   labelColor: '#999999',
//   currentStepLabelColor: 'green',
// };

// const Stepper = (props) => {
//   const [currentStep, setCurrentStep] = useState(props.route.params.steps - 1);
//   const { height } = Dimensions.get('window');
//   const handleNext = () => {
//     if (currentStep < labels.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const Step5 = () => {
//     return (
//       <View>
//         {/* <View style={{ alignItems: "center" }}>
//           <TouchableOpacity
//             onPress={() => {
//               WebBrowser.openBrowserAsync("http://dev.dasion-guider.com:3000/");
//             }}
//           >
//             <Image
//               style={{ height: 90, width: 80, resizeMode: "cover" }}
//               source={require("../../../assets/images/Emily.png")}
//             />
//           </TouchableOpacity>
//         </View> */}

//         <Text style={{ fontSize: 18, color: "#313195", fontWeight: "bold", marginTop: "5%" }}>
//           {"STEP 5: SUMMARY"}
//         </Text>

//         <WebView style={{width:'100%',height:height*0.6}} originWhitelist={["*"]} source={{ uri: "https://pdfobject.com/pdf/sample.pdf" }} />

//       </View>
//     );
//   };
//   const Step6 = () => {
//     return (
//       <View>
//         {/* <View style={{ alignItems: "center" }}>
//           <TouchableOpacity
//             onPress={() => {
//               WebBrowser.openBrowserAsync("http://dev.dasion-guider.com:3000/");
//             }}
//           >
//             <Image
//               style={{ height: 90, width: 80, resizeMode: "cover" }}
//               source={require("../../../assets/images/Emily.png")}
//             />
//           </TouchableOpacity>
//         </View> */}

//         <Text style={{ fontSize: 18, color: "#313195", fontWeight: "bold", marginTop: "5%" }}>
//           {"STEP 6: Voice characteristic Analytic"}
//         </Text>

//         <WebView style={{width:'100%',height:height*0.6}} originWhitelist={["*"]} source={{ uri: "https://pdfobject.com/pdf/sample.pdf" }} />

//       </View>
//     );
//   };

//   // Render the appropriate component based on currentStep
//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return <Stap1 />;
//       case 1:
//         return <Stap2 />;
//       case 2:
//         return <Step3 />;
//       case 3:
//         return <Step4 />;
//       case 4:
//         return <Step5 />;
//       case 5:
//         return <Step6 />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 ,backgroundColor:'#ffff'}}>
//       <StepIndicator
//         customStyles={customStyles}
//         currentPosition={currentStep}
//         stepCount={labels.length}
//       />
//       <View style={{ flex: 1, marginTop: 20 }}>{renderStepContent()}</View>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
//         <TouchableOpacity
//           onPress={handleBack}
//           disabled={currentStep === 0}
//           style={{
//             backgroundColor: currentStep === 0 ? '#cccccc' : Colors.orange,
//             padding: 15,
//             borderRadius: 5,
//             width:100,
//             height:50,
//             alignItems:'center',
//           }}
//         >
//           <Text style={{ color: '#ffffff',fontSize:18 }}>Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleNext}
//           disabled={currentStep === labels.length - 1}
//           style={{
//             backgroundColor: currentStep === labels.length - 1 ? 'red' : Colors.orange,
//             padding: 15,
//             borderRadius: 5,
//             width:100,
//             height:50,
//             alignItems:'center',
//           }}
//         >
//           <Text style={{ color: '#ffffff',fontSize:18 }}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// Stepper.navigationOptions = navigationOptions();
// export default Stepper;
