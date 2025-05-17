import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dailyVerses = [
  {
    verse: `For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future.`,
    reference: "Jeremiah 29:11",
    theme: "God's Plan"
  },
  {
    verse: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
    theme: "Strength"
  },
  {
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    theme: "Courage"
  },
  {
    verse: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Trust"
  },
  {
    verse: "The LORD is my shepherd, I lack nothing.",
    reference: "Psalm 23:1",
    theme: "Provision"
  }
];

export default function BibleVerseScreen() {
  const [currentVerse, setCurrentVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get a random verse when the component mounts
    const randomIndex = Math.floor(Math.random() * dailyVerses.length);
    setCurrentVerse(dailyVerses[randomIndex]);
    setLoading(false);
  }, []);

  const shareVerse = async () => {
    try {
      await Share.share({
        message: `"${currentVerse.verse}" - ${currentVerse.reference}`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getNewVerse = () => {
    setLoading(true);
    const randomIndex = Math.floor(Math.random() * dailyVerses.length);
    setCurrentVerse(dailyVerses[randomIndex]);
    setLoading(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Verse</Text>
      </View>

      <View style={styles.verseContainer}>
        <Text style={styles.theme}>{currentVerse.theme}</Text>
        <Text style={styles.verseText}>{currentVerse.verse}</Text>
        <Text style={styles.reference}>- {currentVerse.reference}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={shareVerse}>
          <Text style={styles.buttonText}>Share Verse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.newVerseButton]} onPress={getNewVerse}>
          <Text style={styles.buttonText}>New Verse</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About Daily Verses</Text>
        <Text style={styles.infoText}>
          These verses are carefully selected to provide encouragement and guidance for your daily walk with God. 
          Feel free to share them with others who might need encouragement.
        </Text>
      </View>
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
  verseContainer: {
    backgroundColor: '#f8f9fa',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  theme: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 15,
  },
  verseText: {
    fontSize: 20,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 15,
  },
  reference: {
    fontSize: 16,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  newVerseButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  infoContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 24,
  },
}); 