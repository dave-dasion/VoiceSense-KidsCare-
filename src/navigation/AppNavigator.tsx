import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from '../theme';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import EmailVerificationScreen from '../screens/auth/EmailVerificationScreen';
import OtpVerificationScreen from '../screens/auth/OtpVerificationScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import AuthSettingsScreen from '../screens/auth/AuthSettingsScreen';

// Workspace Setup Screens
import CreateWorkspaceScreen from '../screens/workspace/CreateWorkspaceScreen';
import InviteMembersScreen from '../screens/workspace/InviteMembersScreen';
import ChooseSubscriptionScreen from '../screens/workspace/ChooseSubscriptionScreen';
import WelcomeScreen from '../screens/workspace/WelcomeScreen';

// Dashboard Screens
import DashboardHomeScreen from '../screens/dashboard/DashboardHomeScreen';
import RecentWorkflowsScreen from '../screens/dashboard/RecentWorkflowsScreen';
import QuickCreateScreen from '../screens/dashboard/QuickCreateScreen';
import RunningWorkflowsScreen from '../screens/dashboard/RunningWorkflowsScreen';
import FailedWorkflowsScreen from '../screens/dashboard/FailedWorkflowsScreen';
import AiSuggestionsScreen from '../screens/dashboard/AiSuggestionsScreen';
import UsageSummaryScreen from '../screens/dashboard/UsageSummaryScreen';
import ActivityFeedScreen from '../screens/dashboard/ActivityFeedScreen';

// Workflow Core Screens
import WorkflowHomeScreen from '../screens/workflow/WorkflowHomeScreen';
import WorkflowCanvasScreen from '../screens/workflow/WorkflowCanvasScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.background },
        }}
      >
        {/* Module 1: Auth & Workspace Screens */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="AuthSettings" component={AuthSettingsScreen} />
        
        {/* Workspace Management Screens */}
        <Stack.Screen name="CreateWorkspace" component={CreateWorkspaceScreen} />
        <Stack.Screen name="InviteMembers" component={InviteMembersScreen} />
        <Stack.Screen name="ChooseSubscription" component={ChooseSubscriptionScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        
        {/* Module 2: Dashboard Screens */}
        <Stack.Screen name="DashboardHome" component={DashboardHomeScreen} />
        <Stack.Screen name="RecentWorkflows" component={RecentWorkflowsScreen} />
        <Stack.Screen name="QuickCreate" component={QuickCreateScreen} />
        <Stack.Screen name="RunningWorkflows" component={RunningWorkflowsScreen} />
        <Stack.Screen name="FailedWorkflows" component={FailedWorkflowsScreen} />
        <Stack.Screen name="AiSuggestions" component={AiSuggestionsScreen} />
        <Stack.Screen name="UsageSummary" component={UsageSummaryScreen} />
        <Stack.Screen name="ActivityFeed" component={ActivityFeedScreen} />

        {/* Workflow Core Screens */}
        <Stack.Screen name="WorkflowHome" component={WorkflowHomeScreen} />
        <Stack.Screen name="WorkflowCanvas" component={WorkflowCanvasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
