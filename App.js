import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import PrayerListScreen from './src/screens/PrayerListScreen';
import BibleVerseScreen from './src/screens/BibleVerseScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DashboardScreen from './src/screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#2c3e50',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PrayerList" 
          component={PrayerListScreen}
          options={{ title: 'Prayer List' }}
        />
        <Stack.Screen 
          name="BibleVerse" 
          component={BibleVerseScreen}
          options={{ title: 'Daily Verse' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{ title: 'Dashboard', headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
