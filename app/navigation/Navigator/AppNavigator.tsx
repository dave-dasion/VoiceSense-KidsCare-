import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MVPNavigator from "./MVPNavigator";
import store from "../../redux/store";
import { LogBox } from 'react-native';

const AppStack = createStackNavigator();

const App = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen
          name="MVP"
          component={MVPNavigator}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
