import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from "constant/urls";
import { styles } from "./Step7.styles";
import AxiosHelper from "utils/AxiosHelper";
import StorageHelper from "utils/StorageHelper";
import { Colors } from "style";

const Step6 = () => {
  let data = [
    { 
      id: 1,
      title: "STEP 1: Observation of Autism-Related Behaviors",
      description: "This is the description for item 1.",
    },
    {
      id: 2,
      title: "Step 2: Communication & Language Development",
      description: "This is the description for item 2.",
    },
    {
      id: 3,
      title: "Step 3: Sensory Sensitivities",
      description: "This is the description for item 3.",
    },
    {
      id: 4,
      title: "Step 4: Daily Living & Functional Skills",
      description: "This is the description for item 4.",
    },
    {
      id: 5,
      title: "Step 5: Social Engagement & Peer Interaction",
      description: "This is the description for item 5.",
    },
    {
      id: 6,
      title: "Step 6: Emotional Regulation & Coping Mechanisms",
      description: "This is the description for item 5.",
    },
  ];

  const [summaryData, setSummaryData] = useState([]);

  const [summaryData1, setSummaryData1] = useState("No Summary");
  const [summaryData2, setSummaryData2] = useState("No Summary");
  const [summaryData3, setSummaryData3] = useState("No Summary");
  const [summaryData4, setSummaryData4] = useState("No Summary");
  const [summaryData5, setSummaryData5] = useState("No Summary");
  const [summaryData6, setSummaryData6] = useState("No Summary");

  const apiCallStep1 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page1&email=${emailId}`)
      .then(async (response) => {
        setSummaryData1(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep2 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page2&email=${emailId}`)
      .then(async (response) => {
        setSummaryData2(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep3 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page3&email=${emailId}`)
      .then(async (response) => {
        setSummaryData3(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep4 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page4&email=${emailId}`)
      .then(async (response) => {
        setSummaryData4(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep5 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page5&email=${emailId}`)
      .then(async (response) => {
        setSummaryData5(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep6 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page6&email=${emailId}`)
      .then(async (response) => {
        setSummaryData6(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  useEffect(() => {
    setSummaryData(data);
    apiCallStep1();
    apiCallStep2();
    apiCallStep3();
    apiCallStep4();
    apiCallStep5();
    apiCallStep6();
  }, []);

  // const getAssessmentData = () => {
  //   return summaryData.map((item, index) => {
  //     let data = "";

  //     switch (index) {
  //       case 0:
  //         data = summaryData1;
  //         break;
  //       case 1:
  //         data = summaryData2;
  //         break;
  //       case 2:
  //         data = summaryData3;
  //         break;
  //       case 3:
  //         data = summaryData4;
  //         break;
  //       case 4:
  //         data = summaryData5;
  //         break;
  //       case 5:
  //         data = summaryData6;
  //         break;
  //       default:
  //         break;
  //     }
  //     return (
  //       <View key={item.id} style={styles.item}>
  //         <Text style={styles.title}>{item.title}</Text>
  //         <Text style={styles.description}>{data}</Text>
  //       </View>
  //     );
  //   });
  // };

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          color: Colors.AppColorSecondory,
          fontWeight: "bold",
          marginTop: "5%",
        }}
      >
        {"STEP 7: SUMMARY"}
      </Text>

      <ScrollView style={styles.container}>
        {/* {getAssessmentData()} */}

        <View key={data[0].id} style={styles.item}>
          <Text style={styles.title}>{data[0].title}</Text>
          <Text style={styles.description}>{summaryData1}</Text>
        </View>

        <View key={data[1].id} style={styles.item}>
          <Text style={styles.title}>{data[1].title}</Text>
          <Text style={styles.description}>{summaryData2}</Text>
        </View>

        <View key={data[2].id} style={styles.item}>
          <Text style={styles.title}>{data[2].title}</Text>
          <Text style={styles.description}>{summaryData3}</Text>
        </View>

        <View key={data[3].id} style={styles.item}>
          <Text style={styles.title}>{data[3].title}</Text>
          <Text style={styles.description}>{summaryData4}</Text>
        </View>


        <View key={data[4].id} style={styles.item}>
          <Text style={styles.title}>{data[4].title}</Text>
          <Text style={styles.description}>{summaryData5}</Text>
        </View>

        <View key={data[5].id} style={styles.item}>
          <Text style={styles.title}>{data[5].title}</Text>
          <Text style={styles.description}>{summaryData6}</Text>
        </View>

      </ScrollView>

      {/* <WebView
           style={{ width: "100%", height: height * 0.6 }}
           originWhitelist={["*"]}
           source={{
             uri:
               "https://eldercare-prof-pdf-storage.s3.amazonaws.com/d4332c8b-f49c-4547-bdfc-dea828e8c9ca.pdf?AWSAccessKeyId=AKIAV6VZDFR5MGEHXV4B&Signature=h9C83zZRhF3CQtQqcET1%2BdVGAmU%3D&Expires=1740645965",
           }}
         /> */}
    </View>
  );
};

export default Step6;
