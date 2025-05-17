import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const prayerTimes = {
    morning: '6:00 AM',
    noon: '12:00 PM',
    evening: '6:00 PM',
    night: '9:00 PM'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.subtitle}>Your Daily Prayer Companion</Text>
        </View>

        <View style={styles.verseContainer}>
          <Text style={styles.verseText}>
            "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus."
          </Text>
          <Text style={styles.verseReference}>- 1 Thessalonians 5:16-18</Text>
        </View>

        <View style={styles.prayerTimesContainer}>
          <Text style={styles.sectionTitle}>Daily Prayer Times</Text>
          {Object.entries(prayerTimes).map(([prayer, time]) => (
            <View key={prayer} style={styles.prayerTimeRow}>
              <Text style={styles.prayerName}>{prayer.charAt(0).toUpperCase() + prayer.slice(1)} Prayer</Text>
              <Text style={styles.prayerTime}>{time}</Text>
            </View>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('PrayerList')}
            >
              <Text style={styles.actionButtonText}>Prayer List</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('BibleVerse')}
            >
              <Text style={styles.actionButtonText}>Bible Verse</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.actionButtonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Today's Focus</Text>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Gratitude Prayer</Text>
            <Text style={styles.featureDescription}>
              Take a moment to thank God for His blessings and grace in your life.
            </Text>
          </View>
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
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  verseContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  verseText: {
    fontSize: 18,
    color: '#2c3e50',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 26,
  },
  verseReference: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 10,
  },
  prayerTimesContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  prayerTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  prayerName: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '500',
  },
  prayerTime: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  quickActions: {
    padding: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  featuresContainer: {
    padding: 20,
  },
  featureCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  featureDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 24,
  },
}); 