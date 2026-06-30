



import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { t } from "utils";
import { Colors, ComponentsStyle } from "style";

const navigationOptions = ({ navigation }): StackNavigationOptions => {
  // Dynamic title (can be passed through route params)

  return {
    headerShown: true,
    headerStyle: {
      ...ComponentsStyle.header,
    },
    headerBackTitle: null,
    headerTitle: () => (
      <Text style={{
        fontSize: 20,
        fontWeight: "bold",
      }}>
        {t("SETTINGS_SCREEN_TITLE")}
      </Text>
    ),
    headerRight: () => (
      <View>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate("VoiceChat")
        }}
        style={{ marginRight: 15 }}
      >
        <Image
          style={{ height: 25, width: 25,tintColor:Colors.AppColorSecondory }}
          source={require("../../../assets/images/LOGO_blue.png")}
        />
      </TouchableOpacity>
      
      </View>
    )

  };
};

export default navigationOptions;


