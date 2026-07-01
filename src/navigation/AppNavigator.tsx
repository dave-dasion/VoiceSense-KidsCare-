import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { getInitials, getAvatarStyle } from '../utils/avatar';

// Import Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';
import UserListScreen from '../screens/admin/UserListScreen';
import UserRoleManagementScreen from '../screens/admin/UserRoleManagementScreen';

// Dashboard Module Sub-screens
import MyLearningScreen from '../screens/dashboard/MyLearningScreen';
import AssignedCoursesScreen from '../screens/dashboard/AssignedCoursesScreen';
import ContinueLearningScreen from '../screens/dashboard/ContinueLearningScreen';
import RecentActivityScreen from '../screens/dashboard/RecentActivityScreen';
import LearningStatisticsScreen from '../screens/dashboard/LearningStatisticsScreen';

// Certification Module Screens (Module 10)
import CertificationDashboardScreen from '../screens/certification/CertificationDashboardScreen';
import CertificateDetailsScreen from '../screens/certification/CertificateDetailsScreen';
import CertificateDownloadScreen from '../screens/certification/CertificateDownloadScreen';
import AchievementBadgesScreen from '../screens/certification/AchievementBadgesScreen';

// Learning Path Module Screens
import LearningPathsListScreen from '../screens/dashboard/LearningPathsListScreen';
import LearningPathDetailsScreen from '../screens/dashboard/LearningPathDetailsScreen';
import LearningRoadmapScreen from '../screens/dashboard/LearningRoadmapScreen';
import LearningProgressScreen from '../screens/dashboard/LearningProgressScreen';

// Course Management Module Screens
import CourseCatalogScreen from '../screens/dashboard/CourseCatalogScreen';
import CourseDetailsScreen from '../screens/dashboard/CourseDetailsScreen';
import CourseEnrollmentScreen from '../screens/dashboard/CourseEnrollmentScreen';
import MyCoursesScreen from '../screens/dashboard/MyCoursesScreen';
import CourseOverviewScreen from '../screens/dashboard/CourseOverviewScreen';
import CourseContentScreen from '../screens/dashboard/CourseContentScreen';

// Lesson Management Module Screens
import LessonListScreen from '../screens/lessons/LessonListScreen';
import LessonDetailsScreen from '../screens/lessons/LessonDetailsScreen';
import LessonContentScreen from '../screens/lessons/LessonContentScreen';
import VideoLessonScreen from '../screens/lessons/VideoLessonScreen';
import DocumentLessonScreen from '../screens/lessons/DocumentLessonScreen';
import InteractiveLessonScreen from '../screens/lessons/InteractiveLessonScreen';
import LessonCompletionScreen from '../screens/lessons/LessonCompletionScreen';

// Productivity Software Training Module Screens
import ProductivityHubScreen from '../screens/productivity/ProductivityHubScreen';
// Excel
import ExcelDashboardScreen from '../screens/productivity/excel/ExcelDashboardScreen';
import ExcelBasicsScreen from '../screens/productivity/excel/ExcelBasicsScreen';
import ExcelFormulasScreen from '../screens/productivity/excel/ExcelFormulasScreen';
import ExcelFunctionsScreen from '../screens/productivity/excel/ExcelFunctionsScreen';
import ExcelDataAnalysisScreen from '../screens/productivity/excel/ExcelDataAnalysisScreen';
import ExcelPivotTablesScreen from '../screens/productivity/excel/ExcelPivotTablesScreen';
import ExcelExercisesScreen from '../screens/productivity/excel/ExcelExercisesScreen';
import ExcelAssessmentScreen from '../screens/productivity/excel/ExcelAssessmentScreen';
// Word
import WordDashboardScreen from '../screens/productivity/word/WordDashboardScreen';
import WordBasicsScreen from '../screens/productivity/word/WordBasicsScreen';
import DocumentFormattingScreen from '../screens/productivity/word/DocumentFormattingScreen';
import BusinessDocumentsScreen from '../screens/productivity/word/BusinessDocumentsScreen';
import TemplatesScreen from '../screens/productivity/word/TemplatesScreen';
import CollaborationFeaturesScreen from '../screens/productivity/word/CollaborationFeaturesScreen';
import WordExercisesScreen from '../screens/productivity/word/WordExercisesScreen';
import WordAssessmentScreen from '../screens/productivity/word/WordAssessmentScreen';
// PowerPoint
import PowerPointDashboardScreen from '../screens/productivity/powerpoint/PowerPointDashboardScreen';
import SlideDesignScreen from '../screens/productivity/powerpoint/SlideDesignScreen';
import PresentationBuildingScreen from '../screens/productivity/powerpoint/PresentationBuildingScreen';
import StorytellingTechniquesScreen from '../screens/productivity/powerpoint/StorytellingTechniquesScreen';
import SalesDeckCreationScreen from '../screens/productivity/powerpoint/SalesDeckCreationScreen';
import PowerPointExercisesScreen from '../screens/productivity/powerpoint/PowerPointExercisesScreen';
import PowerPointAssessmentScreen from '../screens/productivity/powerpoint/PowerPointAssessmentScreen';
// Business
import ProductivityDashboardScreen from '../screens/productivity/business/ProductivityDashboardScreen';
import TimeManagementScreen from '../screens/productivity/business/TimeManagementScreen';
import WorkplaceOrganizationScreen from '../screens/productivity/business/WorkplaceOrganizationScreen';
import EmailProductivityScreen from '../screens/productivity/business/EmailProductivityScreen';
import BusinessCommunicationScreen from '../screens/productivity/business/BusinessCommunicationScreen';
import ProductivityAssessmentScreen from '../screens/productivity/business/ProductivityAssessmentScreen';

// Sales Outreach & Communication Training Module (Module 7)
import SalesHubScreen from '../screens/sales/SalesHubScreen';
// Prospect Identification
import ProspectingDashboardScreen from '../screens/sales/prospecting/ProspectingDashboardScreen';
import IdealCustomerProfileScreen from '../screens/sales/prospecting/IdealCustomerProfileScreen';
import LeadResearchScreen from '../screens/sales/prospecting/LeadResearchScreen';
import ProspectQualificationScreen from '../screens/sales/prospecting/ProspectQualificationScreen';
import ProspectingExerciseScreen from '../screens/sales/prospecting/ProspectingExerciseScreen';
// Sales Outreach
import OutreachDashboardScreen from '../screens/sales/outreach/OutreachDashboardScreen';
import ColdCallingScreen from '../screens/sales/outreach/ColdCallingScreen';
import ColdEmailScreen from '../screens/sales/outreach/ColdEmailScreen';
import LinkedInOutreachScreen from '../screens/sales/outreach/LinkedInOutreachScreen';
import MultiChannelOutreachScreen from '../screens/sales/outreach/MultiChannelOutreachScreen';
import OutreachPracticeScreen from '../screens/sales/outreach/OutreachPracticeScreen';
// Communication Skills
import CommunicationDashboardScreen from '../screens/sales/communication/CommunicationDashboardScreen';
import ProfessionalCommunicationScreen from '../screens/sales/communication/ProfessionalCommunicationScreen';
import BusinessEtiquetteScreen from '../screens/sales/communication/BusinessEtiquetteScreen';
import ActiveListeningScreen from '../screens/sales/communication/ActiveListeningScreen';
import RelationshipBuildingScreen from '../screens/sales/communication/RelationshipBuildingScreen';
import CommunicationPracticeScreen from '../screens/sales/communication/CommunicationPracticeScreen';
// Discovery Conversations
import DiscoveryDashboardScreen from '../screens/sales/discovery/DiscoveryDashboardScreen';
import ClientNeedsAnalysisScreen from '../screens/sales/discovery/ClientNeedsAnalysisScreen';
import DiscoveryQuestionsScreen from '../screens/sales/discovery/DiscoveryQuestionsScreen';
import PainPointIdentificationScreen from '../screens/sales/discovery/PainPointIdentificationScreen';
import DiscoveryPracticeScreen from '../screens/sales/discovery/DiscoveryPracticeScreen';
// Objection Handling
import ObjectionDashboardScreen from '../screens/sales/objections/ObjectionDashboardScreen';
import CommonObjectionsScreen from '../screens/sales/objections/CommonObjectionsScreen';
import ResponseTechniquesScreen from '../screens/sales/objections/ResponseTechniquesScreen';
import NegotiationBasicsScreen from '../screens/sales/objections/NegotiationBasicsScreen';
import ObjectionPracticeScreen from '../screens/sales/objections/ObjectionPracticeScreen';
// Sales Process Fundamentals
import SalesPipelineScreen from '../screens/sales/fundamentals/SalesPipelineScreen';
import OpportunityQualificationScreen from '../screens/sales/fundamentals/OpportunityQualificationScreen';
import FollowUpStrategiesScreen from '../screens/sales/fundamentals/FollowUpStrategiesScreen';
import SalesProcessAssessmentScreen from '../screens/sales/fundamentals/SalesProcessAssessmentScreen';
// Sales Role Play
import RolePlayDashboardScreen from '../screens/sales/roleplay/RolePlayDashboardScreen';
import MockCallScreen from '../screens/sales/roleplay/MockCallScreen';
import MockNegotiationScreen from '../screens/sales/roleplay/MockNegotiationScreen';
import SalesAssessmentScreen from '../screens/sales/roleplay/SalesAssessmentScreen';

// AI Product Presentation Module Screens (Module 8)
import AIProductHubScreen from '../screens/presentation/AIProductHubScreen';
// AI Product Knowledge
import AIProductDashboardScreen from '../screens/presentation/knowledge/AIProductDashboardScreen';
import ProductOverviewScreen from '../screens/presentation/knowledge/ProductOverviewScreen';
import ProductFeaturesScreen from '../screens/presentation/knowledge/ProductFeaturesScreen';
import ProductBenefitsScreen from '../screens/presentation/knowledge/ProductBenefitsScreen';
import ProductKnowledgeAssessmentScreen from '../screens/presentation/knowledge/ProductKnowledgeAssessmentScreen';
// Product Positioning
import ProductPositioningScreen from '../screens/presentation/positioning/ProductPositioningScreen';
import CompetitiveAdvantageScreen from '../screens/presentation/positioning/CompetitiveAdvantageScreen';
import ValuePropositionScreen from '../screens/sales/positioning/ValuePropositionScreen';
import IndustryPositioningScreen from '../screens/sales/positioning/IndustryPositioningScreen';
// Healthcare Solutions Training
import HealthcareOverviewScreen from '../screens/presentation/healthcare/HealthcareOverviewScreen';
import HealthcareUseCasesScreen from '../screens/presentation/healthcare/HealthcareUseCasesScreen';
import ClinicalWorkflowsScreen from '../screens/presentation/healthcare/ClinicalWorkflowsScreen';
import HealthcareCustomerScenariosScreen from '../screens/presentation/healthcare/HealthcareCustomerScenariosScreen';
// IT Services Training
import ITServicesOverviewScreen from '../screens/presentation/itservices/ITServicesOverviewScreen';
import ManagedServicesScreen from '../screens/presentation/itservices/ManagedServicesScreen';
import ITWorkflowsScreen from '../screens/presentation/itservices/ITWorkflowsScreen';
import TechnologySolutionsScreen from '../screens/sales/itservices/TechnologySolutionsScreen';
// Client Discovery
import ClientDiscoveryDashboardScreen from '../screens/presentation/discovery/ClientDiscoveryDashboardScreen';
import RequirementGatheringScreen from '../screens/presentation/discovery/RequirementGatheringScreen';
import NeedsAssessmentScreen from '../screens/presentation/discovery/NeedsAssessmentScreen';
import SolutionMappingScreen from '../screens/presentation/discovery/SolutionMappingScreen';
// Product Demonstration
import DemoPreparationScreen from '../screens/presentation/demo/DemoPreparationScreen';
import DemoDeliveryScreen from '../screens/presentation/demo/DemoDeliveryScreen';
import DemoScriptsScreen from '../screens/presentation/demo/DemoScriptsScreen';
import DemoBestPracticesScreen from '../screens/presentation/demo/DemoBestPracticesScreen';
import DemoPracticeScreen from '../screens/presentation/demo/DemoPracticeScreen';
// Question Handling
import FAQScreen from '../screens/presentation/questions/FAQScreen';
import TechnicalQuestionsScreen from '../screens/presentation/questions/TechnicalQuestionsScreen';
import BusinessQuestionsScreen from '../screens/presentation/questions/BusinessQuestionsScreen';
import PresentationResponseTechniquesScreen from '../screens/presentation/questions/ResponseTechniquesScreen';
import QuestionPracticeScreen from '../screens/presentation/questions/QuestionPracticeScreen';
// Closing & Follow-Up
import ClosingTechniquesScreen from '../screens/presentation/closing/ClosingTechniquesScreen';
import ProposalDiscussionScreen from '../screens/presentation/closing/ProposalDiscussionScreen';
import FollowUpPlanningScreen from '../screens/presentation/closing/FollowUpPlanningScreen';
import ClosingAssessmentScreen from '../screens/presentation/closing/ClosingAssessmentScreen';

// Quiz & Assessment Module Screens (Module 9)
import QuizListScreen from '../screens/quiz/QuizListScreen';
import QuizInstructionsScreen from '../screens/quiz/QuizInstructionsScreen';
import QuizAttemptScreen from '../screens/quiz/QuizAttemptScreen';
import QuizResultScreen from '../screens/quiz/QuizResultScreen';
import AssessmentReviewScreen from '../screens/quiz/AssessmentReviewScreen';
import LeaderboardScreen from '../screens/quiz/LeaderboardScreen';

// Progress Tracking Module Screens (Module 11)
import ProgressOverviewScreen from '../screens/progress/ProgressOverviewScreen';
import CourseProgressScreen from '../screens/progress/CourseProgressScreen';
import SkillProgressScreen from '../screens/progress/SkillProgressScreen';
import LearningAnalyticsScreen from '../screens/progress/LearningAnalyticsScreen';
import PerformanceInsightsScreen from '../screens/progress/PerformanceInsightsScreen';

// Avita AI Coach Module Screens (Module 12)
import AvitaHomeScreen from '../screens/avita/AvitaHomeScreen';
import AIChatScreen from '../screens/avita/AIChatScreen';
import AILearningAssistantScreen from '../screens/avita/AILearningAssistantScreen';
import PersonalizedRecommendationsScreen from '../screens/avita/PersonalizedRecommendationsScreen';
import DailyLearningTasksScreen from '../screens/avita/DailyLearningTasksScreen';
import AIFeedbackScreen from '../screens/avita/AIFeedbackScreen';

// AI Sales Practice Module Screens (Module 13)
import MockSalesConversationScreen from '../screens/salesPractice/MockSalesConversationScreen';
import AIObjectionPracticeScreen from '../screens/salesPractice/AIObjectionPracticeScreen';
import AIClientSimulationScreen from '../screens/salesPractice/AIClientSimulationScreen';
import SalesPerformanceFeedbackScreen from '../screens/salesPractice/SalesPerformanceFeedbackScreen';
import AICoachingSummaryScreen from '../screens/salesPractice/AICoachingSummaryScreen';

// Notifications Module Screens (Module 14)
import NotificationCenterScreen from '../screens/notifications/NotificationCenterScreen';
import TrainingRemindersScreen from '../screens/notifications/TrainingRemindersScreen';
import CertificationAlertsScreen from '../screens/notifications/CertificationAlertsScreen';
import AnnouncementsScreen from '../screens/notifications/AnnouncementsScreen';

// Reporting & Analytics Module Screens (Module 15 - Admin)
import AnalyticsDashboardScreen from '../screens/adminAnalytics/AnalyticsDashboardScreen';
import UserPerformanceReportScreen from '../screens/adminAnalytics/UserPerformanceReportScreen';
import CoursePerformanceReportScreen from '../screens/adminAnalytics/CoursePerformanceReportScreen';
import AssessmentAnalyticsScreen from '../screens/adminAnalytics/AssessmentAnalyticsScreen';
import CertificationReportScreen from '../screens/adminAnalytics/CertificationReportScreen';

// Content Management Module Screens (Module 16 - Admin)
import ContentDashboardScreen from '../screens/contentManagement/ContentDashboardScreen';
import CourseBuilderScreen from '../screens/contentManagement/CourseBuilderScreen';
import LessonBuilderScreen from '../screens/contentManagement/LessonBuilderScreen';
import QuizBuilderScreen from '../screens/contentManagement/QuizBuilderScreen';
import MediaLibraryScreen from '../screens/contentManagement/MediaLibraryScreen';
import ContentApprovalScreen from '../screens/contentManagement/ContentApprovalScreen';

// Settings Module Screens (Module 17)
import GeneralSettingsScreen from '../screens/settings/GeneralSettingsScreen';
import BrandingSettingsScreen from '../screens/settings/BrandingSettingsScreen';
import NotificationSettingsScreen from '../screens/settings/NotificationSettingsScreen';
import LMSConfigurationScreen from '../screens/settings/LMSConfigurationScreen';
import AICoachingConfigurationScreen from '../screens/settings/AICoachingConfigurationScreen';

// Search & Knowledge Hub Module
import SearchAndKnowledgeHubScreen from '../screens/knowledgeHub/SearchAndKnowledgeHubScreen';
import ArticleDetailsScreen from '../screens/knowledgeHub/ArticleDetailsScreen';

// Discussion & Collaboration Module
import DiscussionBoardScreen from '../screens/collaboration/DiscussionBoardScreen';

// Live Training & Webinar Module
import LiveTrainingScreen from '../screens/training/LiveTrainingScreen';

// Assignments & Practical Exercises Module
import AssignmentsScreen from '../screens/assignments/AssignmentsScreen';

// Gamification & Rewards Module
import GamificationRewardsScreen from '../screens/gamification/GamificationRewardsScreen';

// Resource Library Module
import ResourceLibraryScreen from '../screens/resources/ResourceLibraryScreen';

// Calendar & Learning Schedule Module
import CalendarScheduleScreen from '../screens/calendar/CalendarScheduleScreen';

// Feedback & Survey Module
import FeedbackSurveyScreen from '../screens/feedback/FeedbackSurveyScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const { user, logout } = useAuth();
  const avatarStyle = getAvatarStyle(user?.name || '');

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Drawer Header */}
        <View style={drawerStyles.drawerHeader}>
          <View style={[drawerStyles.avatarContainer, { backgroundColor: avatarStyle.bg }]}>
            <Text style={[drawerStyles.avatarText, { color: avatarStyle.text }]}>
              {getInitials(user?.name || '')}
            </Text>
          </View>
          <View style={drawerStyles.userInfo}>
            <Text style={drawerStyles.userName} numberOfLines={1}>{user?.name}</Text>
            <Text style={drawerStyles.userRole}>{user?.role}</Text>
          </View>
        </View>

        {/* Drawer Items list */}
        <View style={drawerStyles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Logout Button at bottom */}
      <TouchableOpacity 
        style={drawerStyles.logoutButton} 
        onPress={() => {
          logout();
        }}
      >
        <Ionicons name="log-out-outline" size={20} color={COLORS.danger} style={{ marginRight: 12 }} />
        <Text style={drawerStyles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

function DrawerNavigator() {
  const { user } = useAuth();
  
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.secondary,
        drawerInactiveTintColor: COLORS.textLight,
        drawerLabelStyle: {
          fontSize: 13,
          fontWeight: '700',
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen 
        name="DashboardHome" 
        component={DashboardScreen} 
        options={{ 
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="MyLearningHome" 
        component={MyLearningScreen} 
        options={{ 
          title: 'My Learning Tracks',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="LearningPathsHome" 
        component={LearningPathsListScreen} 
        options={{ 
          title: 'Learning Paths',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="git-network-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="CourseCatalogHome" 
        component={CourseCatalogScreen} 
        options={{ 
          title: 'Course Catalog',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="MyCoursesHome" 
        component={MyCoursesScreen} 
        options={{ 
          title: 'My Courses',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="UserProfileHome" 
        component={UserProfileScreen} 
        options={{ 
          title: 'My Profile',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="ProductivityHubHome" 
        component={ProductivityHubScreen} 
        options={{ 
          title: 'Productivity Training',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="desktop-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="SalesHubHome" 
        component={SalesHubScreen} 
        options={{ 
          title: 'Sales Training',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trending-up-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="AIProductHubHome" 
        component={AIProductHubScreen} 
        options={{ 
          title: 'AI Presentation',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="QuizHome" 
        component={QuizListScreen} 
        options={{ 
          title: 'Quizzes & Assessments',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="SearchAndKnowledgeHubHome" 
        component={SearchAndKnowledgeHubScreen} 
        options={{ 
          title: 'Knowledge Hub',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="DiscussionBoardHome" 
        component={DiscussionBoardScreen} 
        options={{ 
          title: 'Discussion & Collab',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="LiveTrainingHome" 
        component={LiveTrainingScreen} 
        options={{ 
          title: 'Live Training & Webinars',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="videocam-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="AssignmentsHome" 
        component={AssignmentsScreen} 
        options={{ 
          title: 'Assignments & Exercises',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="GamificationRewardsHome" 
        component={GamificationRewardsScreen} 
        options={{ 
          title: 'Rewards & Leaderboard',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="ResourceLibraryHome" 
        component={ResourceLibraryScreen} 
        options={{ 
          title: 'Resource Library',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="folder-open-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="CalendarScheduleHome" 
        component={CalendarScheduleScreen} 
        options={{ 
          title: 'Learning Schedule',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="FeedbackSurveyHome" 
        component={FeedbackSurveyScreen} 
        options={{ 
          title: 'Feedback & Surveys',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="UpcomingCertificationsHome" 
        component={CertificationDashboardScreen} 
        options={{ 
          title: 'Certifications',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="ProgressOverviewHome" 
        component={ProgressOverviewScreen} 
        options={{ 
          title: 'Progress Center',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="AvitaHome" 
        component={AvitaHomeScreen} 
        options={{ 
          title: 'Avita AI Coach',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="AIClientSimulationHome" 
        component={AIClientSimulationScreen} 
        options={{ 
          title: 'Sales Simulator',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="NotificationCenterHome" 
        component={NotificationCenterScreen} 
        options={{ 
          title: 'Notifications',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="SettingsHome" 
        component={GeneralSettingsScreen} 
        options={{ 
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )
        }} 
      />
      {user?.role === 'Administrator' && (
        <>
          <Drawer.Screen 
            name="UserListHome" 
            component={UserListScreen} 
            options={{ 
              title: 'User Directory',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="people-outline" size={size} color={color} />
              )
            }} 
          />
          <Drawer.Screen 
            name="AnalyticsDashboardHome" 
            component={AnalyticsDashboardScreen} 
            options={{ 
              title: 'Analytics Hub',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="bar-chart-outline" size={size} color={color} />
              )
            }} 
          />
          <Drawer.Screen 
            name="ContentDashboardHome" 
            component={ContentDashboardScreen} 
            options={{ 
              title: 'CMS Portal',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="create-outline" size={size} color={color} />
              )
            }} 
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

const drawerStyles = StyleSheet.create({
  drawerHeader: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 24,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  userInfo: {
    marginLeft: 14,
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  userRole: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    fontWeight: '600',
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.danger,
  },
});

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Authenticated App Stack
          <>
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            
            {/* Dashboard Sub-screens */}
            <Stack.Screen name="MyLearning" component={MyLearningScreen} />
            <Stack.Screen name="AssignedCourses" component={AssignedCoursesScreen} />
            <Stack.Screen name="ContinueLearning" component={ContinueLearningScreen} />
            <Stack.Screen name="RecentActivity" component={RecentActivityScreen} />
            <Stack.Screen name="UpcomingCertifications" component={CertificationDashboardScreen} />
            <Stack.Screen name="CertificateDetails" component={CertificateDetailsScreen} />
            <Stack.Screen name="CertificateDownload" component={CertificateDownloadScreen} />
            <Stack.Screen name="AchievementBadges" component={AchievementBadgesScreen} />
            <Stack.Screen name="LearningStatistics" component={LearningStatisticsScreen} />

            {/* Learning Path Module Screens */}
            <Stack.Screen name="LearningPathsList" component={LearningPathsListScreen} />
            <Stack.Screen name="LearningPathDetails" component={LearningPathDetailsScreen} />
            <Stack.Screen name="LearningRoadmap" component={LearningRoadmapScreen} />
            <Stack.Screen name="LearningProgress" component={LearningProgressScreen} />

            {/* Course Management Module Screens */}
            <Stack.Screen name="CourseCatalog" component={CourseCatalogScreen} />
            <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
            <Stack.Screen name="CourseEnrollment" component={CourseEnrollmentScreen} />
            <Stack.Screen name="MyCourses" component={MyCoursesScreen} />
            <Stack.Screen name="CourseOverview" component={CourseOverviewScreen} />
            <Stack.Screen name="CourseContent" component={CourseContentScreen} />

            {/* Lesson Management Module Screens */}
            <Stack.Screen name="LessonList" component={LessonListScreen} />
            <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
            <Stack.Screen name="LessonContent" component={LessonContentScreen} />
            <Stack.Screen name="VideoLesson" component={VideoLessonScreen} />
            <Stack.Screen name="DocumentLesson" component={DocumentLessonScreen} />
            <Stack.Screen name="InteractiveLesson" component={InteractiveLessonScreen} />
            <Stack.Screen name="LessonCompletion" component={LessonCompletionScreen} />

            {/* Productivity Module Screens */}
            <Stack.Screen name="ProductivityHub" component={ProductivityHubScreen} />
            
            {/* Excel Sub-module */}
            <Stack.Screen name="ExcelDashboard" component={ExcelDashboardScreen} />
            <Stack.Screen name="ExcelBasics" component={ExcelBasicsScreen} />
            <Stack.Screen name="ExcelFormulas" component={ExcelFormulasScreen} />
            <Stack.Screen name="ExcelFunctions" component={ExcelFunctionsScreen} />
            <Stack.Screen name="ExcelDataAnalysis" component={ExcelDataAnalysisScreen} />
            <Stack.Screen name="ExcelPivotTables" component={ExcelPivotTablesScreen} />
            <Stack.Screen name="ExcelExercises" component={ExcelExercisesScreen} />
            <Stack.Screen name="ExcelAssessment" component={ExcelAssessmentScreen} />

            {/* Word Sub-module */}
            <Stack.Screen name="WordDashboard" component={WordDashboardScreen} />
            <Stack.Screen name="WordBasics" component={WordBasicsScreen} />
            <Stack.Screen name="DocumentFormatting" component={DocumentFormattingScreen} />
            <Stack.Screen name="BusinessDocuments" component={BusinessDocumentsScreen} />
            <Stack.Screen name="Templates" component={TemplatesScreen} />
            <Stack.Screen name="CollaborationFeatures" component={CollaborationFeaturesScreen} />
            <Stack.Screen name="WordExercises" component={WordExercisesScreen} />
            <Stack.Screen name="WordAssessment" component={WordAssessmentScreen} />

            {/* PowerPoint Sub-module */}
            <Stack.Screen name="PowerPointDashboard" component={PowerPointDashboardScreen} />
            <Stack.Screen name="SlideDesign" component={SlideDesignScreen} />
            <Stack.Screen name="PresentationBuilding" component={PresentationBuildingScreen} />
            <Stack.Screen name="StorytellingTechniques" component={StorytellingTechniquesScreen} />
            <Stack.Screen name="SalesDeckCreation" component={SalesDeckCreationScreen} />
            <Stack.Screen name="PowerPointExercises" component={PowerPointExercisesScreen} />
            <Stack.Screen name="PowerPointAssessment" component={PowerPointAssessmentScreen} />

            {/* Business Productivity Sub-module */}
            <Stack.Screen name="ProductivityDashboard" component={ProductivityDashboardScreen} />
            <Stack.Screen name="TimeManagement" component={TimeManagementScreen} />
            <Stack.Screen name="WorkplaceOrganization" component={WorkplaceOrganizationScreen} />
            <Stack.Screen name="EmailProductivity" component={EmailProductivityScreen} />
            <Stack.Screen name="BusinessCommunication" component={BusinessCommunicationScreen} />
            <Stack.Screen name="ProductivityAssessment" component={ProductivityAssessmentScreen} />

            {/* Sales Outreach & Communication Training Module */}
            <Stack.Screen name="SalesHub" component={SalesHubScreen} />
            
            {/* Prospecting */}
            <Stack.Screen name="ProspectingDashboard" component={ProspectingDashboardScreen} />
            <Stack.Screen name="IdealCustomerProfile" component={IdealCustomerProfileScreen} />
            <Stack.Screen name="LeadResearch" component={LeadResearchScreen} />
            <Stack.Screen name="ProspectQualification" component={ProspectQualificationScreen} />
            <Stack.Screen name="ProspectingExercise" component={ProspectingExerciseScreen} />
            
            {/* Outreach */}
            <Stack.Screen name="OutreachDashboard" component={OutreachDashboardScreen} />
            <Stack.Screen name="ColdCalling" component={ColdCallingScreen} />
            <Stack.Screen name="ColdEmail" component={ColdEmailScreen} />
            <Stack.Screen name="LinkedInOutreach" component={LinkedInOutreachScreen} />
            <Stack.Screen name="MultiChannelOutreach" component={MultiChannelOutreachScreen} />
            <Stack.Screen name="OutreachPractice" component={OutreachPracticeScreen} />
            
            {/* Communication */}
            <Stack.Screen name="CommunicationDashboard" component={CommunicationDashboardScreen} />
            <Stack.Screen name="ProfessionalCommunication" component={ProfessionalCommunicationScreen} />
            <Stack.Screen name="BusinessEtiquette" component={BusinessEtiquetteScreen} />
            <Stack.Screen name="ActiveListening" component={ActiveListeningScreen} />
            <Stack.Screen name="RelationshipBuilding" component={RelationshipBuildingScreen} />
            <Stack.Screen name="CommunicationPractice" component={CommunicationPracticeScreen} />
            
            {/* Discovery */}
            <Stack.Screen name="DiscoveryDashboard" component={DiscoveryDashboardScreen} />
            <Stack.Screen name="ClientNeedsAnalysis" component={ClientNeedsAnalysisScreen} />
            <Stack.Screen name="DiscoveryQuestions" component={DiscoveryQuestionsScreen} />
            <Stack.Screen name="PainPointIdentification" component={PainPointIdentificationScreen} />
            <Stack.Screen name="DiscoveryPractice" component={DiscoveryPracticeScreen} />
            
            {/* Objections */}
            <Stack.Screen name="ObjectionDashboard" component={ObjectionDashboardScreen} />
            <Stack.Screen name="CommonObjections" component={CommonObjectionsScreen} />
            <Stack.Screen name="ResponseTechniques" component={ResponseTechniquesScreen} />
            <Stack.Screen name="NegotiationBasics" component={NegotiationBasicsScreen} />
            <Stack.Screen name="ObjectionPractice" component={ObjectionPracticeScreen} />
            
            {/* Fundamentals */}
            <Stack.Screen name="SalesPipeline" component={SalesPipelineScreen} />
            <Stack.Screen name="OpportunityQualification" component={OpportunityQualificationScreen} />
            <Stack.Screen name="FollowUpStrategies" component={FollowUpStrategiesScreen} />
            <Stack.Screen name="SalesProcessAssessment" component={SalesProcessAssessmentScreen} />
            
            {/* Role Play */}
            <Stack.Screen name="RolePlayDashboard" component={RolePlayDashboardScreen} />
            <Stack.Screen name="MockCall" component={MockCallScreen} />
            <Stack.Screen name="MockNegotiation" component={MockNegotiationScreen} />
            <Stack.Screen name="SalesAssessment" component={SalesAssessmentScreen} />

            {/* AI Product Presentation & Demonstration Module (Module 8) */}
            <Stack.Screen name="AIProductHub" component={AIProductHubScreen} />
            {/* AI Product Knowledge */}
            <Stack.Screen name="AIProductDashboard" component={AIProductDashboardScreen} />
            <Stack.Screen name="ProductOverview" component={ProductOverviewScreen} />
            <Stack.Screen name="ProductFeatures" component={ProductFeaturesScreen} />
            <Stack.Screen name="ProductBenefits" component={ProductBenefitsScreen} />
            <Stack.Screen name="ProductKnowledgeAssessment" component={ProductKnowledgeAssessmentScreen} />
            {/* Product Positioning */}
            <Stack.Screen name="ProductPositioning" component={ProductPositioningScreen} />
            <Stack.Screen name="CompetitiveAdvantage" component={CompetitiveAdvantageScreen} />
            <Stack.Screen name="ValueProposition" component={ValuePropositionScreen} />
            <Stack.Screen name="IndustryPositioning" component={IndustryPositioningScreen} />
            {/* Healthcare Solutions */}
            <Stack.Screen name="HealthcareOverview" component={HealthcareOverviewScreen} />
            <Stack.Screen name="HealthcareUseCases" component={HealthcareUseCasesScreen} />
            <Stack.Screen name="ClinicalWorkflows" component={ClinicalWorkflowsScreen} />
            <Stack.Screen name="HealthcareCustomerScenarios" component={HealthcareCustomerScenariosScreen} />
            {/* IT Services */}
            <Stack.Screen name="ITServicesOverview" component={ITServicesOverviewScreen} />
            <Stack.Screen name="ManagedServices" component={ManagedServicesScreen} />
            <Stack.Screen name="ITWorkflows" component={ITWorkflowsScreen} />
            <Stack.Screen name="TechnologySolutions" component={TechnologySolutionsScreen} />
            {/* Client Discovery */}
            <Stack.Screen name="ClientDiscoveryDashboard" component={ClientDiscoveryDashboardScreen} />
            <Stack.Screen name="RequirementGathering" component={RequirementGatheringScreen} />
            <Stack.Screen name="NeedsAssessment" component={NeedsAssessmentScreen} />
            <Stack.Screen name="SolutionMapping" component={SolutionMappingScreen} />
            {/* Product Demonstration */}
            <Stack.Screen name="DemoPreparation" component={DemoPreparationScreen} />
            <Stack.Screen name="DemoDelivery" component={DemoDeliveryScreen} />
            <Stack.Screen name="DemoScripts" component={DemoScriptsScreen} />
            <Stack.Screen name="DemoBestPractices" component={DemoBestPracticesScreen} />
            <Stack.Screen name="DemoPractice" component={DemoPracticeScreen} />
            {/* Question Handling */}
            <Stack.Screen name="FAQ" component={FAQScreen} />
            <Stack.Screen name="TechnicalQuestions" component={TechnicalQuestionsScreen} />
            <Stack.Screen name="BusinessQuestions" component={BusinessQuestionsScreen} />
            <Stack.Screen name="PresentationResponseTechniques" component={PresentationResponseTechniquesScreen} />
            <Stack.Screen name="QuestionPractice" component={QuestionPracticeScreen} />
            {/* Closing & Follow-Up */}
            <Stack.Screen name="ClosingTechniques" component={ClosingTechniquesScreen} />
            <Stack.Screen name="ProposalDiscussion" component={ProposalDiscussionScreen} />
            <Stack.Screen name="FollowUpPlanning" component={FollowUpPlanningScreen} />
            <Stack.Screen name="ClosingAssessment" component={ClosingAssessmentScreen} />

            {/* Quiz & Assessment Module (Module 9) */}
            <Stack.Screen name="QuizList" component={QuizListScreen} />
            <Stack.Screen name="QuizInstructions" component={QuizInstructionsScreen} />
            <Stack.Screen name="QuizAttempt" component={QuizAttemptScreen} />
            <Stack.Screen name="QuizResult" component={QuizResultScreen} />
            <Stack.Screen name="AssessmentReview" component={AssessmentReviewScreen} />
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />

            {/* Search & Knowledge Hub Module */}
            <Stack.Screen name="SearchAndKnowledgeHub" component={SearchAndKnowledgeHubScreen} />
            <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />

            {/* Discussion & Collaboration Module */}
            <Stack.Screen name="DiscussionBoard" component={DiscussionBoardScreen} />

            {/* Live Training & Webinar Module */}
            <Stack.Screen name="LiveTraining" component={LiveTrainingScreen} />

            {/* Assignments & Practical Exercises Module */}
            <Stack.Screen name="Assignments" component={AssignmentsScreen} />

            {/* Gamification & Rewards Module */}
            <Stack.Screen name="GamificationRewards" component={GamificationRewardsScreen} />

            {/* Resource Library Module */}
            <Stack.Screen name="ResourceLibrary" component={ResourceLibraryScreen} />

            {/* Calendar & Learning Schedule Module */}
            <Stack.Screen name="CalendarSchedule" component={CalendarScheduleScreen} />

            {/* Feedback & Survey Module */}
            <Stack.Screen name="FeedbackSurvey" component={FeedbackSurveyScreen} />

            {/* Progress Tracking Module (Module 11) */}
            <Stack.Screen name="ProgressOverview" component={ProgressOverviewScreen} />
            <Stack.Screen name="CourseProgress" component={CourseProgressScreen} />
            <Stack.Screen name="SkillProgress" component={SkillProgressScreen} />
            <Stack.Screen name="LearningAnalytics" component={LearningAnalyticsScreen} />
            <Stack.Screen name="PerformanceInsights" component={PerformanceInsightsScreen} />

            {/* Avita AI Coach Module (Module 12) */}
            <Stack.Screen name="AvitaHome" component={AvitaHomeScreen} />
            <Stack.Screen name="AIChat" component={AIChatScreen} />
            <Stack.Screen name="AILearningAssistant" component={AILearningAssistantScreen} />
            <Stack.Screen name="PersonalizedRecommendations" component={PersonalizedRecommendationsScreen} />
            <Stack.Screen name="DailyLearningTasks" component={DailyLearningTasksScreen} />
            <Stack.Screen name="AIFeedback" component={AIFeedbackScreen} />

            {/* AI Sales Practice Module (Module 13) */}
            <Stack.Screen name="MockSalesConversation" component={MockSalesConversationScreen} />
            <Stack.Screen name="AIObjectionPractice" component={AIObjectionPracticeScreen} />
            <Stack.Screen name="AIClientSimulation" component={AIClientSimulationScreen} />
            <Stack.Screen name="SalesPerformanceFeedback" component={SalesPerformanceFeedbackScreen} />
            <Stack.Screen name="AICoachingSummary" component={AICoachingSummaryScreen} />

            {/* Notifications Module (Module 14) */}
            <Stack.Screen name="NotificationCenter" component={NotificationCenterScreen} />
            <Stack.Screen name="TrainingReminders" component={TrainingRemindersScreen} />
            <Stack.Screen name="CertificationAlerts" component={CertificationAlertsScreen} />
            <Stack.Screen name="Announcements" component={AnnouncementsScreen} />

            {/* Settings Module (Module 17) */}
            <Stack.Screen name="Settings" component={GeneralSettingsScreen} />
            <Stack.Screen name="BrandingSettings" component={BrandingSettingsScreen} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
            <Stack.Screen name="LMSConfiguration" component={LMSConfigurationScreen} />
            <Stack.Screen name="AICoachConfiguration" component={AICoachingConfigurationScreen} />

            {/* Admin Specific Screens */}
            {user.role === 'Administrator' && (
              <>
                <Stack.Screen name="UserList" component={UserListScreen} />
                <Stack.Screen name="UserRoleManagement" component={UserRoleManagementScreen} />
                
                {/* Reporting & Analytics Module (Module 15) */}
                <Stack.Screen name="AnalyticsDashboard" component={AnalyticsDashboardScreen} />
                <Stack.Screen name="UserPerformanceReport" component={UserPerformanceReportScreen} />
                <Stack.Screen name="CoursePerformanceReport" component={CoursePerformanceReportScreen} />
                <Stack.Screen name="AssessmentAnalytics" component={AssessmentAnalyticsScreen} />
                <Stack.Screen name="CertificationReport" component={CertificationReportScreen} />

                {/* Content Management Module (Module 16) */}
                <Stack.Screen name="ContentDashboard" component={ContentDashboardScreen} />
                <Stack.Screen name="CourseBuilder" component={CourseBuilderScreen} />
                <Stack.Screen name="LessonBuilder" component={LessonBuilderScreen} />
                <Stack.Screen name="QuizBuilder" component={QuizBuilderScreen} />
                <Stack.Screen name="MediaLibrary" component={MediaLibraryScreen} />
                <Stack.Screen name="ContentApproval" component={ContentApprovalScreen} />
              </>
            )}
          </>
        ) : (
          // Unauthenticated Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegistrationScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
