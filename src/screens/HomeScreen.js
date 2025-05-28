import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <Header title="#PrayerReminder" navigation={navigation} />
        <Text style={styles.headline}>Start</Text>
        <Text style={styles.headline}>Your Day With</Text>
        <Text style={styles.headline}>Prayer</Text>
        <View style={styles.centerContent}>
          <TouchableOpacity style={styles.getStartedBtn} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* Curved white overlay at the bottom left */}
      <View style={styles.curveOverlay} />
      {/* Large image at the bottom right, partially visible */}
      <Image
        source={require('../../assets/home.png')}
        style={styles.bottomImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    zIndex: 2,
    backgroundColor: 'transparent',
    paddingTop: 15,
  },
  headline: {
    fontSize: 48,
    fontWeight: '900',
    color: '#22A45D',
    marginBottom: 0,
    textAlign: 'left',
    paddingHorizontal: 24,
    lineHeight: 54,
  },
  centerContent: {
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 26,
    zIndex: 3,
  },
  getStartedBtn: {
    backgroundColor: '#22A45D',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#22A45D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
    fontSize: 5,
  },
  getStartedText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
    fontFamily: 'Calibri',
  },
  curveOverlay: {
    position: 'absolute',
    left: -SCREEN_WIDTH * 0.3,
    bottom: 0,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.35,
    backgroundColor: '#fff',
    borderTopRightRadius: SCREEN_WIDTH * 0.8,
    borderTopLeftRadius: SCREEN_WIDTH * 0.8,
    zIndex: 1,
    transform: [{ rotate: '-15deg' }],
  },
  bottomImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: -30,
    width: SCREEN_WIDTH * 1.1,
    height: SCREEN_HEIGHT * 0.50,
    zIndex: 2,
  },
}); 