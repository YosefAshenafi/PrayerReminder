import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Sample prayer requests data - this would typically come from your backend/state management
const samplePrayerRequests = [
  { id: 1, text: "Pray for Sarah's health recovery", timestamp: "2 hours ago", isNew: true },
  { id: 2, text: "Prayer for guidance in career decisions", timestamp: "Yesterday", isNew: false },
  { id: 3, text: "Pray for peace in the Middle East", timestamp: "2 days ago", isNew: false },
];

export default function DashboardScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Determine if it's day or night for icon
  const hour = currentTime.getHours();
  const isDay = hour >= 6 && hour < 18;
  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.greeting}>Blessings to you, Yosef</Text>
          <TouchableOpacity style={styles.prayNowButton}>
            <LinearGradient
              colors={['#e8f5e9', '#a5d6a7', '#81c784', '#66bb6a']}
              style={styles.prayNowGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.3, 0.7, 1]}
            >
              <MaterialCommunityIcons name="hands-pray" size={36} color="#1b5e20" />
              <Text style={styles.prayNowText}>Pray Now</Text>
            </LinearGradient>
          </TouchableOpacity>
          <LinearGradient
            colors={isDay ? 
              ['#e8f5e9', '#a5d6a7', '#81c784', '#66bb6a'] : 
              ['#1b5e20', '#2e7d32', '#388e3c', '#43a047']}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.3, 0.7, 1]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.eventTitle}>{isDay ? 'Daytime' : 'Nighttime'}</Text>
              <Text style={styles.eventTime}>{timeString}</Text>
              <Text style={styles.eventSub}>{isDay ? 'May your day be filled with peace' : 'Rest in His presence'}</Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={isDay ? 'weather-sunny' : 'weather-night'}
                size={54}
                color={isDay ? '#2e7d32' : '#81c784'}
                style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8 }}
              />
            </View>
          </LinearGradient>
          <View style={styles.gridContainer}>
            <View style={styles.gridRow}>
              <FeatureBox label="Prayer List" />
              <FeatureBox label="Answered" />
              <FeatureBox label="Waiting" />
            </View>
            <View style={styles.gridRow}>
              <FeatureBox label="Prayer Notes" />
              <FeatureBox label="Calendar" />
              <FeatureBox label="Scriptures" />
            </View>
            <View style={styles.gridRow}>
              <FeatureBox label="Reminders" />
              <FeatureBox label="Community" />
              <FeatureBox label="Journal" />
            </View>
          </View>
          <View style={styles.prayerRequestsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Prayer Requests</Text>
              <TouchableOpacity style={styles.addButton}>
                <FontAwesome5 name="plus" size={16} color="#1b5e20" />
              </TouchableOpacity>
            </View>
            <View style={styles.requestsList}>
              {samplePrayerRequests.map((request) => (
                <TouchableOpacity key={request.id} style={styles.requestCard}>
                  <View style={styles.requestContent}>
                    <Text style={styles.requestText}>{request.text}</Text>
                    <Text style={styles.requestTime}>{request.timestamp}</Text>
                  </View>
                  {request.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>New</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function FeatureBox({ label }) {
  const getIcon = () => {
    switch (label) {
      case 'Prayer List':
        return <FontAwesome5 name="list" size={24} color="#1b5e20" />;
      case 'Answered':
        return <FontAwesome5 name="check-circle" size={24} color="#1b5e20" />;
      case 'Waiting':
        return <FontAwesome5 name="clock" size={24} color="#1b5e20" />;
      case 'Prayer Notes':
        return <FontAwesome5 name="sticky-note" size={24} color="#1b5e20" />;
      case 'Calendar':
        return <FontAwesome5 name="calendar-alt" size={24} color="#1b5e20" />;
      case 'Scriptures':
        return <FontAwesome5 name="book" size={24} color="#1b5e20" />;
      case 'Reminders':
        return <FontAwesome5 name="bell" size={24} color="#1b5e20" />;
      case 'Community':
        return <FontAwesome5 name="users" size={24} color="#1b5e20" />;
      case 'Journal':
        return <FontAwesome5 name="book" size={24} color="#1b5e20" />;
      default:
        return <FontAwesome5 name="pray" size={24} color="#1b5e20" />;
    }
  };

  return (
    <TouchableOpacity style={styles.featureBox}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={styles.featureLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 18,
    color: '#2c3e50',
    marginVertical: 30,
    textAlign: 'left',
  },
  card: {
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    justifyContent: 'space-between',
    minHeight: 110,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  eventTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  eventTime: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '900',
    marginVertical: 2,
    letterSpacing: 1,
  },
  eventSub: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.85,
  },
  iconContainer: {
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    marginVertical: 10,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  featureBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH / 3.5,
    height: SCREEN_WIDTH / 3.5,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    padding: 12,
  },
  featureLabel: {
    fontSize: 13,
    color: '#2c3e50',
    fontWeight: '500',
    textAlign: 'center',
  },
  prayerRequestsSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestsList: {
    flex: 1,
  },
  requestCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  requestContent: {
    flex: 1,
    marginRight: 12,
  },
  requestText: {
    fontSize: 15,
    color: '#2c3e50',
    marginBottom: 4,
  },
  requestTime: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  newBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#1b5e20',
    fontSize: 12,
    fontWeight: '600',
  },
  prayNowButton: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  prayNowGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayNowText: {
    color: '#1b5e20',
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
}); 