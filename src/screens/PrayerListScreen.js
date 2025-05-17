import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrayerListScreen() {
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [newRequest, setNewRequest] = useState('');

  const addPrayerRequest = () => {
    if (newRequest.trim() === '') {
      Alert.alert('Error', 'Please enter a prayer request');
      return;
    }

    setPrayerRequests([
      ...prayerRequests,
      {
        id: Date.now().toString(),
        text: newRequest,
        date: new Date().toLocaleDateString(),
        answered: false
      }
    ]);
    setNewRequest('');
  };

  const toggleAnswered = (id) => {
    setPrayerRequests(prayerRequests.map(request =>
      request.id === id ? { ...request, answered: !request.answered } : request
    ));
  };

  const deleteRequest = (id) => {
    Alert.alert(
      'Delete Prayer Request',
      'Are you sure you want to delete this prayer request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setPrayerRequests(prayerRequests.filter(request => request.id !== id))
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prayer List</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new prayer request..."
          value={newRequest}
          onChangeText={setNewRequest}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={addPrayerRequest}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={prayerRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.prayerItem, item.answered && styles.answeredPrayer]}>
            <View style={styles.prayerContent}>
              <Text style={styles.prayerText}>{item.text}</Text>
              <Text style={styles.prayerDate}>{item.date}</Text>
            </View>
            <View style={styles.prayerActions}>
              <TouchableOpacity
                style={[styles.actionButton, item.answered && styles.answeredButton]}
                onPress={() => toggleAnswered(item.id)}
              >
                <Text style={styles.actionButtonText}>
                  {item.answered ? 'Answered' : 'Mark Answered'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => deleteRequest(item.id)}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        style={styles.list}
      />
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
  inputContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  prayerItem: {
    backgroundColor: '#f8f9fa',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  answeredPrayer: {
    backgroundColor: '#e8f5e9',
    borderColor: '#c8e6c9',
  },
  prayerContent: {
    marginBottom: 10,
  },
  prayerText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
  },
  prayerDate: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  prayerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: '#3498db',
  },
  answeredButton: {
    backgroundColor: '#27ae60',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
}); 