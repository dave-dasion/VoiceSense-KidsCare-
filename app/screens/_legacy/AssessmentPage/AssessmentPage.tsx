import React, { useState } from "react";
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { ListItem } from "components";
import { NavStatelessComponent } from "interfaces";

import styles from "./AssessmentPage.styles";
import navigationOptions from "./AssessmentPage.navigationOptions";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Font } from "style";
import { navigate } from "navigation";

const AssessmentPage: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);

  return (
    <View style={styles.container}>
      {/* First View */}
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image style={{ height: 25, width: 25 }} source={require('../../../assets/images/home.png')} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Injury Assessment</Text>
      </View> */}
      {/* <View style={{height:3,backgroundColor:'#ebfaee'}}/> */}
      <ScrollView>
        <View style={styles.heading}>
          <Text style={{ fontSize: 25, marginTop: 20, fontFamily: Font.FontWeight.Bold }}>
            Assessment Steps
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 1 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>STEP 1: Observation of Autism-Related Behaviors</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 2 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>Step 2: Communication & Language Development</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>

          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>

          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 3 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>Step 3: Sensory Sensitivities</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>

          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 4 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>Step 4: Daily Living & Functional Skills</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>

          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 5 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>Step 5: Social Engagement & Peer Interaction</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 6 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>Step 6: Emotional Regulation & Coping Mechanisms</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 7 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>STEP 7: SUMMARY</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>

          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 8 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>STEP 8: Voice characteristic Analytic</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
        </View>

        <View style={styles.heading}>
          <Text style={{ fontSize: 25, marginTop: 20, fontFamily: Font.FontWeight.Bold }}>
            Assessment AI
          </Text>
          <View style={styles.innerSteps}>
            <TouchableOpacity
              onPress={() => {
                navigator.openAssessmentSingle({
                  number: 1,
                  title: "STEP 1: Observation of Autism-Related Behaviors",
                });
              }}
              style={styles.innerSteps}
            >
              <Text style={styles.titleText}>STEP 1: Observation of Autism-Related Behaviors</Text>
              <Ionicons
                suppressHighlighting={true}
                name={"chevron-forward-outline"}
                size={14}
                color={Colors.black50}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>

          <View style={styles.innerSteps}>
            <TouchableOpacity
              onPress={() => {
                navigator.openAssessmentSingle({
                  number: 2,
                  title: "Step 2: Communication & Language Development",
                });
              }}
              style={styles.innerSteps}
            >
              <Text style={styles.titleText}>Step 2: Communication & Language Development</Text>
              <Ionicons
                suppressHighlighting={true}
                name={"chevron-forward-outline"}
                size={14}
                color={Colors.black50}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
          <View style={styles.innerSteps}>
            <TouchableOpacity
              onPress={() => {
                navigator.openAssessmentSingle({
                  number: 3,
                  title: "Step 3: Sensory Sensitivities",
                });
              }}
              style={styles.innerSteps}
            >
              <Text style={styles.titleText}>Step 3: Sensory Sensitivities</Text>
              <Ionicons
                suppressHighlighting={true}
                name={"chevron-forward-outline"}
                size={14}
                color={Colors.black50}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>

          <View style={styles.innerSteps}>
            <TouchableOpacity
              onPress={() => {
                navigator.openAssessmentSingle({
                  number: 4,
                  title: "Step 4: Daily Living & Functional Skills",
                });
              }}
              style={styles.innerSteps}
            >
              <Text style={styles.titleText}>
                Step 4: Daily Living & Functional Skills
              </Text>
              <Ionicons
                suppressHighlighting={true}
                name={"chevron-forward-outline"}
                size={14}
                color={Colors.black50}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>

          <View style={styles.innerSteps}>
            <TouchableOpacity
              onPress={() => {
                navigator.openAssessmentSingle({
                  number: 5,
                  title: "Step 5: Social Engagement & Peer Interaction",
                });
              }}
              style={styles.innerSteps}
            >
              <Text style={styles.titleText}>Step 5: Social Engagement & Peer Interaction</Text>
              <Ionicons
                suppressHighlighting={true}
                name={"chevron-forward-outline"}
                size={14}
                color={Colors.black50}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
          <View style={styles.innerSteps}>
            <TouchableOpacity
              onPress={() => {
                navigator.openAssessmentSingle({
                  number: 6,
                  title: "Step 6: Emotional Regulation & Coping Mechanisms",
                });
              }}
              style={styles.innerSteps}
            >
              <Text style={styles.titleText}>Step 6: Emotional Regulation & Coping Mechanisms</Text>
              <Ionicons
                suppressHighlighting={true}
                name={"chevron-forward-outline"}
                size={14}
                color={Colors.black50}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
          <View style={styles.innerSteps}>
            <TouchableOpacity onPress={() => {
                navigation?.navigate('AIDoctorAssessmetNotes')
            }} style={styles.innerSteps}>
              <Text style={styles.titleText}>STEP 7: SUMMARY</Text>
              <Ionicons
                suppressHighlighting={true}
                name={"chevron-forward-outline"}
                size={14}
                color={Colors.black50}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
          <View style={styles.innerSteps}>
            <Text style={styles.titleText}>STEP 8: Voice characteristic Analytic</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </View>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
        </View>

        <View style={styles.heading}>
          <Text style={{ fontSize: 25, marginTop: 20, fontFamily: Font.FontWeight.Bold }}>
            Assessment of Doctor's
          </Text>
          <TouchableOpacity
            onPress={() => {
              // navigator.openAssessmentSteps({ steps: 1 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>1: AI Med Assessment </Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>

          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>

          <TouchableOpacity
            onPress={() => {
              // DoctorSOAPNotes
              navigator.openDoctorSoapNotes();
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>2: Doctor's SOAP Notes</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>

          {/* <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 3 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>STEP 3: MEMORY ASSESSMENT MADDOCKS QUESTIONS2</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>

          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 4 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>STEP 4: EXAMINATION GLASGOW COMA SCALE (GCS)3</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 5 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>STEP 5: SUMMARY</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View>
          <TouchableOpacity
            onPress={() => {
              navigator.openAssessmentSteps({ steps: 6 });
            }}
            style={styles.innerSteps}
          >
            <Text style={styles.titleText}>STEP 6: Voice characteristic Analytic</Text>
            <Ionicons
              suppressHighlighting={true}
              name={"chevron-forward-outline"}
              size={14}
              color={Colors.black50}
            />
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: Colors.black50, marginLeft: 15, marginRight: 15 }}
          ></View> */}
        </View>
      </ScrollView>
      {/* Second View */}
      {/* <TouchableOpacity onPress={() => {}} style={styles.view}>
        <Text style={styles.titleText}>Assessment Results</Text>
        <Ionicons
          suppressHighlighting={true}
          name={"chevron-forward-outline"}
          size={14}
          color={Colors.black50}
        />
      </TouchableOpacity> */}
    </View>
  );
};

AssessmentPage.navigationOptions = navigationOptions;

export default AssessmentPage;
