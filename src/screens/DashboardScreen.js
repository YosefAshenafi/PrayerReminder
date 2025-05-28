import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Platform, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { getPrayerRequests, addPrayerRequest, deletePrayerRequest } from '../utils/storage';
import { formatDistanceToNow } from 'date-fns';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Sample prayer requests data - this would typically come from your backend/state management
const samplePrayerRequests = [
  { id: 1, text: "Pray for Sarah's health recovery", timestamp: "2 hours ago", isNew: true },
  { id: 2, text: "Prayer for guidance in career decisions", timestamp: "Yesterday", isNew: false },
  { id: 3, text: "Pray for peace in the Middle East", timestamp: "2 days ago", isNew: false },
];

export default function DashboardScreen({ navigation }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [isAddingRequest, setIsAddingRequest] = useState(false);
  const [newRequest, setNewRequest] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    loadPrayerRequests();
    return () => clearInterval(timer);
  }, []);

  const loadPrayerRequests = () => {
    const requests = getPrayerRequests();
    setPrayerRequests(requests);
  };

  const handleAddRequest = () => {
    if (!newRequest.trim()) {
      Alert.alert('Error', 'Please enter a prayer request');
      return;
    }
    addPrayerRequest(newRequest.trim());
    setNewRequest('');
    setIsAddingRequest(false);
    loadPrayerRequests();
  };

  const handleDeleteRequest = (id) => {
    Alert.alert(
      'Delete Request',
      'Are you sure you want to delete this prayer request?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deletePrayerRequest(id);
            loadPrayerRequests();
          }
        }
      ]
    );
  };

  const hour = currentTime.getHours();
  const isDay = hour >= 6 && hour < 18;
  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Blessings to you, Yosef</Text>
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name="settings-outline" size={24} color="#22A45D" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.prayNowButton}>
            <LinearGradient
              colors={['#81c784', '#66bb6a', '#43a047', '#2e7d32']}
              style={styles.prayNowGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.3, 0.7, 1]}
            >
              <MaterialCommunityIcons name="hands-pray" size={36} color="#ffffff" />
              <Text style={styles.prayNowText}>Pray Now</Text>
            </LinearGradient>
          </TouchableOpacity>
          <LinearGradient
            colors={isDay ? 
              ['#81c784', '#66bb6a', '#43a047', '#2e7d32'] : 
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
                color="#ffffff"
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
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => setIsAddingRequest(true)}
              >
                <FontAwesome5 name="plus" size={16} color="#1b5e20" />
              </TouchableOpacity>
            </View>
            
            {isAddingRequest && (
              <View style={styles.addRequestContainer}>
                <TextInput
                  style={styles.requestInput}
                  placeholder="Enter your prayer request..."
                  value={newRequest}
                  onChangeText={setNewRequest}
                  multiline
                />
                <View style={styles.addRequestButtons}>
                  <TouchableOpacity 
                    style={[styles.addRequestButton, styles.cancelButton]}
                    onPress={() => {
                      setIsAddingRequest(false);
                      setNewRequest('');
                    }}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.addRequestButton, styles.saveButton]}
                    onPress={handleAddRequest}
                  >
                    <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={styles.requestsList}>
              {prayerRequests.map((request) => (
                <TouchableOpacity 
                  key={request.id} 
                  style={styles.requestCard}
                  onLongPress={() => handleDeleteRequest(request.id)}
                >
                  <View style={styles.requestContent}>
                    <Text style={styles.requestText}>{request.text}</Text>
                    <Text style={styles.requestTime}>
                      {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                    </Text>
                  </View>
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
      <View style={styles.featureIconContainer}>
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
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  greeting: {
    fontSize: 26,
    fontFamily: Platform.select({
      ios: 'Avenir Next',
      android: 'sans-serif-light',
    }),
    color: '#2c3e50',
    textAlign: 'left',
    letterSpacing: 0.3,
  },
  settingsButton: {
    padding: 8,
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
    fontFamily: Platform.select({
      ios: 'Avenir Next',
      android: 'sans-serif-medium',
    }),
    letterSpacing: 0.5,
  },
  eventTime: {
    fontSize: 32,
    color: '#fff',
    fontFamily: Platform.select({
      ios: 'Avenir Next',
      android: 'sans-serif-medium',
    }),
    marginVertical: 2,
    letterSpacing: 1,
  },
  eventSub: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.85,
    fontFamily: Platform.select({
      ios: 'Avenir Next',
      android: 'sans-serif',
    }),
    letterSpacing: 0.3,
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
  featureIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    width: '100%',
  },
  featureLabel: {
    fontSize: 13,
    color: '#2c3e50',
    fontFamily: Platform.select({
      ios: 'Avenir Next',
      android: 'sans-serif-medium',
    }),
    textAlign: 'center',
    letterSpacing: 0.3,
    width: '100%',
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
    fontSize: 20,
    fontFamily: Platform.select({
      ios: 'Avenir Next',
      android: 'sans-serif-medium',
    }),
    color: '#2c3e50',
    letterSpacing: 0.5,
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
    borderWidth: 1,
    borderColor: '#a5d6a7',
  },
  requestContent: {
    flex: 1,
    marginRight: 12,
  },
  requestText: {
    fontSize: 15,
    color: '#2c3e50',
    marginBottom: 4,
    fontFamily: Platform.select({
      ios: 'Avenir Next',
      android: 'sans-serif-medium',
    }),
    letterSpacing: 0.3,
  },
  requestTime: {
    fontSize: 12,
    color: '#7f8c8d',
    fontFamily: Platform.select({
      ios: 'Avenir Next',
      android: 'sans-serif',
    }),
    letterSpacing: 0.2,
  },
  addRequestContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  addRequestButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  addRequestButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#1b5e20',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  saveButtonText: {
    color: '#fff',
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
    color: '#ffffff',
    fontSize: 22,
    fontFamily: Platform.select({
      ios: 'Avenir Next',
      android: 'sans-serif-medium',
    }),
    marginLeft: 16,
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
}); 