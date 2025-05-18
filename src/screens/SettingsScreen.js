import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [verseNotifications, setVerseNotifications] = useState(false);
  const [prayerRequestNotifications, setPrayerRequestNotifications] = useState(false);
  const [communityPrayerNotifications, setCommunityPrayerNotifications] = useState(false);
  const [eventNotifications, setEventNotifications] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={pushNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Daily Verse Notification</Text>
            <Switch
              value={verseNotifications}
              onValueChange={setVerseNotifications}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={verseNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Prayer Request Notifications</Text>
            <Switch
              value={prayerRequestNotifications}
              onValueChange={setPrayerRequestNotifications}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={prayerRequestNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Community Prayer Notifications</Text>
            <Switch
              value={communityPrayerNotifications}
              onValueChange={setCommunityPrayerNotifications}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={communityPrayerNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Special Event Notifications</Text>
            <Switch
              value={eventNotifications}
              onValueChange={setEventNotifications}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={eventNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Theme</Text>
            <Switch
              value={darkTheme}
              onValueChange={setDarkTheme}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={darkTheme ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* General Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Preferences</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Sound</Text>
            <Switch
              value={sound}
              onValueChange={setSound}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={sound ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Switch
              value={vibration}
              onValueChange={setVibration}
              trackColor={{ false: '#767577', true: '#22A45D' }}
              thumbColor={vibration ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.settingDescription}>Prayer Reminder App v1.0.0</Text>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
    marginTop: -20,
  },
  section: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  settingDescription: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  linkButton: {
    marginTop: 8,
  },
  linkText: {
    color: '#3498db',
    fontSize: 15,
    fontWeight: '500',
  },
}); 