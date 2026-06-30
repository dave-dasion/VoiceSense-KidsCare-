import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from "constant/urls";
import { styles } from "./Step6.styles";
import AxiosHelper from "utils/AxiosHelper";
import StorageHelper from "utils/StorageHelper";

const Step6 = () => {
  const symptoms = [
  { "text": "Does the individual show frequent emotional outbursts or meltdowns?", "c1": "Y", "c2": "N" },
  { "text": "Is the individual able to self-regulate with or without prompts?", "c1": "Y", "c2": "N" },
  { "text": "Are there signs of anxiety, sadness, or frustration in daily routines?", "c1": "Y", "c2": "N" },
  { "text": "Is there support in place for emotional regulation (e.g., visual schedules, breaks)?", "c1": "Y", "c2": "N" },
  { "text": "Does the individual engage in self-harming or aggressive behavior?", "c1": "Y", "c2": "N" }
];
  const [symptomsList, setSymptomsList] = useState([]);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(
      `/api/eldercare/getassesment/?questionset=eldercare-page6&email=${emailId}`
    )
      .then(async (response) => {
        console.log("response", response.data);

        symptoms[0].result = response?.data?.interactions?.[1]?.score ?? 2;
        symptoms[1].result = response?.data?.interactions?.[2]?.score ?? 2;
        symptoms[2].result = response?.data?.interactions?.[3]?.score ?? 2;
        symptoms[3].result = response?.data?.interactions?.[4]?.score ?? 2;
        await StorageHelper.setItem("Step6_summary", response?.data?.summary_text ?? "No Summary");
        setSymptomsList(symptoms);
      })
      .catch(async (err) => {
        setSymptomsList(symptoms);
        await StorageHelper.setItem('Step6_summary','No Summary');
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
              `${emilyUrl}/?questionset=eldercare-page6&email=${emailId}`
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
      <Text style={styles.StepText}>{"Step 6: Emotional Regulation & Coping Mechanisms"}</Text>
      <ScrollView>
        <View style={styles.symptomsContainer}>
          {/* <Text style={styles.HeaderText}>{'Best eye response (E) '}</Text> */}
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

export default Step6;
