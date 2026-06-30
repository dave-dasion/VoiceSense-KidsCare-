import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { ListItem } from "components";
import { NavStatelessComponent } from "interfaces";

import styles from "./PerformanceScore.styles";
import navigationOptions from "./PerformanceScore.navigationOptions";
import { Colors } from "style";

const PerformanceScore: NavStatelessComponent = () => {
  const rowItems = [
    {
      title: "Behavioral & Emotional Insights",
      topics: [
        {
          title:
            "Analyzes data from wearables (e.g., heart rate, movement patterns) and voice biomarkers to detect emotional states like anxiety or overstimulation",
          link: "",
        },
        {
          title: "Tracks behavioral trends to identify triggers and calming patterns",
          link: "",
        },
      ],
    },
    {
      title: "Personalized Support Framework",
      topics: [
        {
          title: "Recommends personalized daily routines and interventions based on observed behavior patterns and responses",
          link: "",
        },
        {
          title:
            "Predicts high-stress situations and suggests proactive support strategies",
          link: "",
        },
      ],
    },
    {
      title: "Sensory & Environment Management",
      topics: [
        {
          title:
            "Monitors sensory input levels (light, noise, touch) and recommends adjustments to reduce sensory overload",
          link: "",
        },
        {
          title:
            "Suggests calming tools or spaces based on real-time sensory stress detection",
          link: "",
        },
      ],
    },
    {
      title: "Adaptive Care Plan",
      topics: [
        {
          title:
            "Continuously updates the care approach based on day-to-day changes in communication, mood, and interaction levels",
          link: "",
        },
      ],
    },
  ];
  
  return (
    <ScrollView style={styles.container}>
      <View style={{ height: 10 }} />
      {rowItems.map((item, index) => {
        return (
          <View style={styles.container}>
            <View style={{ height: 5 }} />
            <Text style={styles.headingStyle}>{item.title}</Text>
            <View style={{ height: 10 }} />
            {item.topics.map((item1, index) => {
              return(
                <>
                <TouchableOpacity>
                  <Text style={styles.descriptionTextStyle}>{item1.title}</Text>
                </TouchableOpacity>
                <View style={{ height: 8 }} />
              </>
              )
              
            })}
            <View style={{ height: 8 }} />
            <View style={{ height: 2,backgroundColor:Colors.grey }} />
          </View>
        );
      })}
    </ScrollView>
  );
};

PerformanceScore.navigationOptions = navigationOptions;

export default PerformanceScore;
