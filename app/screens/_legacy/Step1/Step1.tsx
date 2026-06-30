import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { styles } from "./Steep1.styles";
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from "constant/urls";
import AxiosHelper from "utils/AxiosHelper";
import StorageHelper from "utils/StorageHelper";

const Step1 = () => {
  
  const symptoms = [
    { text: "Does the individual show repetitive behaviors (e.g., hand-flapping, rocking)?", c1: "Y", c2: "N" },
    { text: "Is there noticeable difficulty with changes in routine or transitions?", c1: "Y", c2: "N" },
    { text: "Does the individual display intense interests or focus on specific topics?", c1: "Y", c2: "N" },
    { text: "Are there signs of difficulty with eye contact or social reciprocity?", c1: "Y", c2: "N" },
    { text: "Does the individual engage in limited or unusual play patterns?", c1: "Y", c2: "N" }
  ];
  
  const [symptomsList, setSymptomsList] = useState([]);
  const [symptomsList1, setSymptomsList1] = useState([]);
  const [symptomsList2, setSymptomsList2] = useState([]);
  const [symptomsList3, setSymptomsList3] = useState([]);
  const [symptomsList4, setSymptomsList4] = useState([]);




  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(
      `/api/eldercare/getassesment/?questionset=caretransfer-page1&email=${emailId}`
    )
      .then(async (response) => {

        console.log("response", response.data);

        symptoms[0].result = response?.data?.interactions?.[1]?.score ?? 2;
        symptoms[1].result = response?.data?.interactions?.[2]?.score ?? 2;
        symptoms[2].result = response?.data?.interactions?.[3]?.score ?? 2;
        symptoms[3].result = response?.data?.interactions?.[4]?.score ?? 2;
        symptoms[4].result = response?.data?.interactions?.[5]?.score ?? 2;

       

        setSymptomsList(symptoms);


        console.log("response?.data?.summary_text", response?.data?.summary_text);

        await StorageHelper.setItem('Step1_summary', response?.data?.summary_text ?? 'No Summary');

      })
      .catch((err) => {
        setSymptomsList(symptoms);
        console.log("Error occurred:", err);
      });
  };
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={async () => {
            const emailId = await StorageHelper.getItem('emailId');
            const result = await WebBrowser.openBrowserAsync(
              `${emilyUrl}/?questionset=caretransfer-page1&email=${emailId}`
            );
            console.log("result", result);
            apiCall();
          }}
        >
          <Image
            style={{ height: 90, width: 80, resizeMode: "cover" }}
            source={require("../../../assets/images/Emily.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.StepText}>{"Step 1: Observation of Autism-Related Behaviors"}</Text>
      <ScrollView>
        <View style={styles.symptomsContainer}>
          <View style={{ height: 20 }} />
          {symptomsList.map((symptom, index) => (
            <View key={index} style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.symptomText}>{symptom.text}</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 1 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c1}</Text>
                  </View>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 0 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c2}</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "70%", height: 1, backgroundColor: "#d5deef" }}></View>
            </View>
          ))}
          
          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Step1;
