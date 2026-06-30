import React, { useRef, useState } from "react";
import { View, TouchableWithoutFeedback, ScrollView, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ExpoConstants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from "react-native-raw-bottom-sheet";
import { CardForm } from "@stripe/stripe-react-native";

import { ImagesAssets } from "constant";
import { Button, Text, SocialMedia, ListItem, ListItemSwitch } from "components";
import { t, platform } from "utils";
import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { userPreferences } from "ducks";

import styles from "./SettingsScreen.styles";
import navigationOptions from "./SettingsScreen.navigationOptions";
import quotes from "../../../assets/quotes/quotes.json";

const quoteIndex = Math.floor(Math.random() * Math.floor(quotes.length));

const SettingsScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<any>(null);
  const [isEnabled, setIsEnabled] = useState(false);


  const openAlert = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: async () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          });
          await AsyncStorage.removeItem("REFRESH_TOKEN");
        },
      },
    ]);
  }

  const alertPayment = () => {
    Alert.alert("Unlock Premium Features",
      "Our app provides extra features. Do you want to unlock them? You just need to pay.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => {
          bottomSheetModalRef.current?.open();
        },
      },
    ]);
  }

  const rowItems = [
    // {
    //   title: "Autism Support Needs Score",
    //   onPress: () => {
    //     navigation.push("PerformanceScore");
    //   },
    // },
    // {
    //   title: "Recovery & Team Strategy Insights",
    //   onPress: () => {
    //     navigation.push("RecoveryScreen");
    //   },
    // },
    {
      title: "Billing",
      onPress: () => {
        navigation.push("Billing");
      },
    },
    {
      title: t("SETTINGS_SCREEN_REMAINDER"),
      onPress: navigator.openRemainder,
    },
    {
      title: "About This App",
      onPress: navigator.openAbout,
    },
    {
      isSwitchItem: true,
      title: "Unlock Premium Features",
      value: isEnabled,
      get onChange() {
        return () => {
          if (isEnabled) {
            setIsEnabled(false)
          } else {
            alertPayment()
          }
        };
      },
    },
    // {
    //   isSwitchItem: true,
    //   title: t("SETTINGS_SCREEN_UNITS"),
    //   value: useSelector(userPreferences.selectors.getUseMetricUnits),
    //   get onChange() {
    //     return () => {
    //       dispatch(userPreferences.actions.toggleUnits(!this.value));
    //     };
    //   },
    // },
    // {
    //   title: t("SETTINGS_SCREEN_IMPORT_SAVE_DELETE_DATA"),
    //   onPress: navigator.openMyData,
    // },
    // {
    //   title: t("SETTINGS_SCREEN_NOTIFICATIONS"),
    //   onPress: navigator.openNotifications,
    // },
    // {
    //   title: t("SETTINGS_SCREEN_MY_LOCATION"),
    //   onPress: navigator.openMyLocation,
    // },
    {
      title: t("SETTINGS_SCREEN_SUPPORT_US"),
      onPress: navigator.openSupportUs,
    },
    // {
    //   title: t("SETTINGS_SCREEN_FAQ"),
    //   onPress: navigator.openFaq,
    // },
    {
      title: "Data to Decision",
      onPress: () => WebBrowser.openBrowserAsync("https://data-to-decision.com/"),
    },
    {
      title: t("SETTINGS_SCREEN_ROADMAP"),
      onPress: () =>
        WebBrowser.openBrowserAsync(
          "https://data-to-decision.com/about.html"
        ),
    },
    // {
    //   title: t("SETTINGS_SCREEN_HELP_TRANSLATION"),
    //   onPress: () => Linking.openURL("https://data-to-decision.com/"),
    // },
    {
      title: t("SETTINGS_SCREEN_FEEDBACK"),
      onPress: () => WebBrowser.openBrowserAsync("https://docs.google.com/forms/d/e/1FAIpQLScDL-Zd7NIymXPPp9B66IKQi1Kj1XnDI_X_qKK9y5RjbbZkTg/viewform"),
    },
    {
      title: t("SETTINGS_SCREEN_TERMS_OF_USE"),
      onPress: () => {
        // TermsOfUseScreen
        navigation.push("TermsOfUseScreen");

      },
    },
    // {
    //   title: t("SETTINGS_SCREEN_SPEECH"),
    //   onPress: navigator.openSpeechSummary,
    // },
    {
      title: t("SETTINGS_SCREEN_TERMS&CONDITION"),
      onPress: navigator.openTems,
    },
    // {
    //   title: t("LOGIN_SCREEN"),
    //   onPress: navigator.openLogin,
    // },
    // {
    //   title: t("ElderlyCareHome"),
    //   onPress: navigator.openElderlyCareHomeScreen,
    // },
    // {
    //   title: t("ElderlyCareSchedule"),
    //   onPress: navigator.openElderlyCareScheduleScreen,
    // },
    {
      title: "Other Related Apps",
      onPress: navigator.openElderlyCareOptions,
    },
    {
      title: "Related Diseases",
      onPress: navigator.openOtherDisease,
    },
    {
      title: "Logout",
      onPress: "",
      isLogout: true
    },
  ];

  if (__DEV__) {
    rowItems.push({
      title: t("SETTINGS_SCREEN_LANGUAGES"),
      onPress: navigator.openLanguages,
    });
  }

  const [steps, setSteps] = useState(0);
  const { version, ios, android } = ExpoConstants.expoConfig;
  const buildNumber = platform.isIOS ? ios.buildNumber : android.versionCode;

  return (
    <ScrollView style={styles.container}>
      {rowItems.map((item, index) => {
        if (item.isSwitchItem) {
          return (
            <ListItemSwitch
              key={index}
              showBottomLine={index !== rowItems.length - 1}
              value={item.value}
              onChange={item.onChange}
              title={item.title}
            />
          );
        } else {
          return (
            <ListItem
              key={index}
              showBottomLine={index !== rowItems.length - 1}
              onPress={() => { item?.isLogout ? openAlert() : item.onPress() }}
              title={item.title}
            />
          );
        }
      })}
      <TouchableWithoutFeedback onPress={() => setSteps(steps + 1)}>
        <View style={styles.logoNMFContainer}>
          <Image style={styles.logoNMF} resizeMode="contain" source={ImagesAssets.logos.nmf} />
        </View>
      </TouchableWithoutFeedback>

      <Text.Tertiary bold lightGray style={styles.appVersionTitle}>
        {t("SETTINGS_SCREEN_APP_VERSION", { version }) + "-" + buildNumber}
      </Text.Tertiary>

      <SocialMedia />

      {!__DEV__ && (
        <View style={styles.textContainer}>
          <Text.Secondary darkGray center style={styles.quote}>
            {quotes[quoteIndex].quote}
          </Text.Secondary>
          <Text.Primary bold center style={styles.author}>
            {quotes[quoteIndex].author}
          </Text.Primary>
        </View>
      )}

      {steps > 4 ? (
        <View>
          <Button.Primary
            fullWidth
            style={styles.hiddenBtn}
            text={"Open Storybook"}
            onPress={navigator.openStorybook}
          />
          <Button.Danger
            fullWidth
            style={styles.hiddenBtn}
            text={"Crash test"}
            onPress={() => {
              const date = new Date();
              const timestamp = date.getTime();
              throw new Error("Developer error test: " + timestamp);
            }}
          />
        </View>
      ) : null}

      <RBSheet
        ref={bottomSheetModalRef}
        draggable={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
          container: {
            borderRadius: 10,
          },
        }}
        height={450}
      >
        <View
          style={
            {
              // flex: 1,
              // alignItems: "center",
              // padding: 20
            }
          }
        >
          <View
            style={{
              height: 50,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,
            }}
          >
            <Text.H2 style={{ alignSelf: "center" }}>Payment</Text.H2>
          </View>
          <View style={{ height: 20 }} />
          {/* <CardField
                postalCodeEnabled={true}
                placeholders={{
                  number: "4242 4242 4242 4242",
                }}
                cardStyle={{
                  backgroundColor: "#FFFFFF",
                  textColor: "#000000",
                  borderWidth:1
                }}
                style={{
                  width: "90%",
                  height: 50,
                  marginVertical: 30,
                  
                }}
                onCardChange={(cardDetails) => {
                  // setCard(cardDetails);
                }}
                onFocus={(focusedField) => {
                  console.log("focusField", focusedField);
                }}
              /> */}
          <View
            style={{
              // flex: 1,
              // alignItems: "center",
              padding: 20,
            }}
          >
            <CardForm
              placeholders={{
                number: "4242 4242 4242 4242",
              }}
              onFormComplete={(cardDetails) => {
                console.log("card details", cardDetails);
                // setCardDetails(cardDetails)
              }}
              style={{
                height: 200,
                justifyContent: "center",
                alignItems: "center",
                // textAlign: "center",
              }}
              cardStyle={{
                backgroundColor: "#efefefef",
                // textAlign: "center",
                textColor: "pink",
              }}
            />

            {/* <View style={{ height: 5 }} /> */}

            <Button.Primary
              style={{
                width: "100%",
                alignSelf: "center",
                marginBottom: 10,
                backgroundColor: "green",
              }}
              onPress={() => {
                bottomSheetModalRef.current?.close();
                setIsEnabled(true)
                // handlePayPress()
              }}
              text={"Pay $100"}
            // color="black"
            />
            <Button.Primary
              style={{
                width: "100%",
                alignSelf: "center",
                marginBottom: 10,
                backgroundColor: "red",
              }}
              onPress={() => {
                bottomSheetModalRef.current?.close();
                // handlePayPress()
              }}
              text="Cancel"
            // color="black"
            />
          </View>
        </View>
      </RBSheet>
    </ScrollView>
  );
};

SettingsScreen.navigationOptions = navigationOptions;

export default SettingsScreen;
