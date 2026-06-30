import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// ─── Auth ─────────────────────────────────────────
import SplashScreen from '../../screens/MVP/Auth/SplashScreen';
import RoleSelectionScreen from '../../screens/MVP/Auth/RoleSelectionScreen';
import LoginScreen from '../../screens/MVP/Auth/LoginScreen';
import SignUpScreen from '../../screens/MVP/Auth/SignUpScreen';
import OtpVerifyScreen from '../../screens/MVP/Auth/OtpVerifyScreen';
import KidLoginScreen from '../../screens/MVP/Auth/KidLoginScreen';
import CharlieWorldScreen from '../../screens/MVP/Kids/CharlieWorldScreen';
import LunaVoiceSenseScreen from '../../screens/MVP/Kids/LunaVoiceSenseScreen';

// ─── Onboarding ───────────────────────────────────
import AddChildScreen from '../../screens/MVP/Onboarding/AddChildScreen';
import ConsentScreen from '../../screens/MVP/Onboarding/ConsentScreen';

// ─── Parent Tabs ──────────────────────────────────
import ParentDashboard from '../../screens/MVP/Parent/Dashboard';
import TrendsScreen from '../../screens/MVP/Parent/TrendsScreen';
import InterestsScreen from '../../screens/MVP/Parent/InterestsScreen';
import RiskFlagsScreen from '../../screens/MVP/Parent/RiskFlagsScreen';
import SettingsScreen from '../../screens/MVP/Parent/SettingsScreen';

// ─── Parent Stack Screens ─────────────────────────
import ChildSessions from '../../screens/MVP/Parent/ChildSessions';
import ReportScreen from '../../screens/MVP/Parent/ReportScreen';

// ─── Child Session Flow ───────────────────────────
import SessionWarmup from '../../screens/MVP/Child/SessionWarmup';
import GameEngine from '../../screens/MVP/Child/GameEngine';
import MicroCheck from '../../screens/MVP/Child/MicroCheck';
import ProtocolScreen from '../../screens/MVP/Child/ProtocolScreen';
import EscalationScreen from '../../screens/MVP/Child/EscalationScreen';
import SummaryScreen from '../../screens/MVP/Child/SummaryScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ─── Parent Bottom Tab Navigator ──────────────────
const ParentTabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#6366f1',
            tabBarInactiveTintColor: '#94a3b8',
            tabBarStyle: {
                height: 82, paddingBottom: 8, paddingTop: 4,
                borderTopWidth: 0, elevation: 12,
                shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16,
            },
            tabBarLabelStyle: { fontSize: 11, fontWeight: '600', bottom: 10 },
            tabBarIcon: ({ focused, color, size }) => {
                const icons: Record<string, [string, string]> = {
                    Dashboard: ['home', 'home-outline'],
                    Trends: ['stats-chart', 'stats-chart-outline'],
                    Interests: ['star', 'star-outline'],
                    'Risk Flags': ['warning', 'warning-outline'],
                    Settings: ['settings', 'settings-outline'],
                };
                const [active, inactive] = icons[route.name] ?? ['ellipse', 'ellipse-outline'];
                return <Ionicons name={(focused ? active : inactive) as any} size={size} color={color} />;
            },
        })}
    >
        <Tab.Screen name="Dashboard" component={ParentDashboard} />
        <Tab.Screen name="Trends" component={TrendsScreen} />
        <Tab.Screen name="Interests" component={InterestsScreen} />
        <Tab.Screen name="Risk Flags" component={RiskFlagsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
);

// ─── Root Stack Navigator ─────────────────────────
const MVPNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* ── Auth Flow ── */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />
        <Stack.Screen name="KidLogin" component={KidLoginScreen} />
        <Stack.Screen name="CharlieWorld" component={CharlieWorldScreen} />
        <Stack.Screen name="LunaVoiceSense" component={LunaVoiceSenseScreen} />

        {/* ── Onboarding Flow ── */}
        <Stack.Screen name="Consent" component={ConsentScreen} />
        <Stack.Screen name="AddChild" component={AddChildScreen} />

        {/* ── Parent Main Hub ── */}
        <Stack.Screen name="ParentMain" component={ParentTabNavigator} />
        <Stack.Screen name="ChildSessions" component={ChildSessions} />
        <Stack.Screen name="Report" component={ReportScreen} />

        {/* ── Child Session Flow ── */}
        <Stack.Screen name="Warmup" component={SessionWarmup} />
        <Stack.Screen name="GameEngine" component={GameEngine} />
        <Stack.Screen name="MicroCheck" component={MicroCheck} />
        <Stack.Screen name="Protocol" component={ProtocolScreen} />
        <Stack.Screen name="Escalation" component={EscalationScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
    </Stack.Navigator>
);

export default MVPNavigator;
