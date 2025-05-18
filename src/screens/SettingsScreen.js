import { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState({
    morning: true,
    noon: true,
    evening: true,
    night: true,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    soundEnabled: true,
    vibrationEnabled: true,
  });

  const toggleNotification = (time) => {
    setNotifications(prev => ({
      ...prev,
      [time]: !prev[time]
    }));
  };

  const togglePreference = (pref) => {
    setPreferences(prev => ({
      ...prev,
      [pref]: !prev[pref]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header 
        title="Settings" 
        showSettings={false} 
        showBack={true}
        navigation={navigation} 
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prayer Time Notifications</Text>
          {Object.entries(notifications).map(([time, enabled]) => (
            <View key={time} style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>
                  {time.charAt(0).toUpperCase() + time.slice(1)} Prayer
                </Text>
                <Text style={styles.settingDescription}>
                  Receive reminders for {time} prayer time
                </Text>
              </View>
              <Switch
                value={enabled}
                onValueChange={() => toggleNotification(time)}
                trackColor={{ false: '#767577', true: '#22A45D' }}
                thumbColor={enabled ? '#fff' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Enable dark theme</Text>
            </View>
            <Switch
              value={preferences.darkMode}
              onValueChange={() => togglePreference('darkMode')}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={preferences.darkMode ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Sound</Text>
              <Text style={styles.settingDescription}>Enable notification sounds</Text>
            </View>
            <Switch
              value={preferences.soundEnabled}
              onValueChange={() => togglePreference('soundEnabled')}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={preferences.soundEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Vibration</Text>
              <Text style={styles.settingDescription}>Enable vibration alerts</Text>
            </View>
            <Switch
              value={preferences.vibrationEnabled}
              onValueChange={() => togglePreference('vibrationEnabled')}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={preferences.vibrationEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Version 1.0.0</Text>
            <Ionicons name="chevron-forward" size={20} color="#3498db" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  buttonText: {
    fontSize: 16,
    color: '#3498db',
  },
}); 