import { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
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
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prayer Time Notifications</Text>
          {Object.entries(notifications).map(([time, enabled]) => (
            <View key={time} style={styles.settingRow}>
              <Text style={styles.settingLabel}>
                {time.charAt(0).toUpperCase() + time.slice(1)} Prayer
              </Text>
              <Switch
                value={enabled}
                onValueChange={() => toggleNotification(time)}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={enabled ? '#3498db' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={preferences.darkMode}
              onValueChange={() => togglePreference('darkMode')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={preferences.darkMode ? '#3498db' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Sound</Text>
            <Switch
              value={preferences.soundEnabled}
              onValueChange={() => togglePreference('soundEnabled')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={preferences.soundEnabled ? '#3498db' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Switch
              value={preferences.vibrationEnabled}
              onValueChange={() => togglePreference('vibrationEnabled')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={preferences.vibrationEnabled ? '#3498db' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Version 1.0.0</Text>
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
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  settingLabel: {
    fontSize: 16,
    color: '#2c3e50',
  },
  button: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  buttonText: {
    fontSize: 16,
    color: '#3498db',
  },
}); 