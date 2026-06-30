import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { NavStatelessComponent } from "interfaces";
import navigationOptions from "./ImageDetails.navigationOptions";
import { Colors } from "style";
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from "constant/urls";
import { useRoute } from "@react-navigation/native";

const ImageDetails: NavStatelessComponent = () => {
  let { width, height } = Dimensions.get("window");
  const route = useRoute();
  const { data } = route?.params;
  return (
    <ScrollView style={styles.container}>
      {/* Reward Message Section */}
      {data.header === "Learn Saying Aaah" && (
        <>
          <View style={styles.marginView} />
          <View style={styles.rewardContainer}>
            <Text style={styles.rewardText}>
              🎯 If the child completes and wins after trying 5 words, we will let him play another game as a reward. The other games are not clickable until he wins.
            </Text>
          </View>
        </>
      )}
      <Text style={styles.header}>{data.header}</Text>
      <Text style={styles.subHeader}>{data.subHeaderText}</Text>
      <View style={{ alignItems: "center", marginTop: "5%" }}>
        <TouchableOpacity
          onPress={() => {
            console.log("data", data);
            WebBrowser.openBrowserAsync(data.emilyURL);
          }}
        >
          <Image
            style={{ height: height / 5, width: width / 2, resizeMode: "contain" }}
            source={require("../../../assets/images/Emily.png")}
          />
        </TouchableOpacity>
      </View>

      {data.header === "Learn Saying Aaah" && (
        <View style={{
          alignItems: 'center'
        }}>
          <Image
            style={{ height: height / 5, width: width / 2, resizeMode: "contain" }}
            source={data?.imageUrl}
          />
        </View>)}
      <View style={{ marginTop: "12%" }}>
        <Text style={styles.thirdHead}>{"How It Works:"}</Text>
        <View style={styles.marginView} />
        {data?.points?.map((item, index) => {
          return (
            <View style={styles.detailsContainer}>
              <Text style={styles.bulletPoint}>
                {" "}
                {index + 1}. {item.text}
              </Text>
            </View>
          );
        })}

        <Text style={styles.thirdHead}>{"Voice Agent Role:"}</Text>
        <View style={styles.marginView} />
        {data?.agent?.map((item, index) => {
          return (
            <View style={styles.detailsContainer}>
              <Text style={styles.bulletPoint}>
                {" "}
                {index + 1}. {item.text}
              </Text>
            </View>
          );
        })}


      </View>

      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
};

ImageDetails.navigationOptions = navigationOptions;

export default ImageDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 10,
    alignSelf: "center",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 20,
    marginBottom: 20,
    color: "gray",
    // marginTop: '15%'
    alignSelf: "center",
    textAlign: "center",
  },
  detailsContainer: {
    flex: 1,
  },
  bulletPoint: {
    fontSize: 11,
    color: "gray",
    marginBottom: 5,
  },
  thirdHead: {
    fontSize: 18,
    color: Colors.black,
    marginTop: "5%",
  },
  marginView: {
    marginTop: "3%",
  },
  // New styles for reward message
  rewardContainer: {
    backgroundColor: '#E8F5E8', // Light green background
    borderRadius: 8,
    padding: 15,
    marginTop: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50', // Green accent
  },
  rewardText: {
    fontSize: 17,
    color: '#2E7D32', // Dark green text
    fontWeight: '500',
    lineHeight: 18,
  },
});