import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, ActivityIndicator, Modal, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BIBLE_BOOKS = [
  { id: 'GEN', name: 'Genesis' },
  { id: 'EXO', name: 'Exodus' },
  { id: 'LEV', name: 'Leviticus' },
  { id: 'NUM', name: 'Numbers' },
  { id: 'DEU', name: 'Deuteronomy' },
  { id: 'JOS', name: 'Joshua' },
  { id: 'JDG', name: 'Judges' },
  { id: 'RUT', name: 'Ruth' },
  { id: '1SA', name: '1 Samuel' },
  { id: '2SA', name: '2 Samuel' },
  { id: '1KI', name: '1 Kings' },
  { id: '2KI', name: '2 Kings' },
  { id: '1CH', name: '1 Chronicles' },
  { id: '2CH', name: '2 Chronicles' },
  { id: 'EZR', name: 'Ezra' },
  { id: 'NEH', name: 'Nehemiah' },
  { id: 'EST', name: 'Esther' },
  { id: 'JOB', name: 'Job' },
  { id: 'PSA', name: 'Psalms' },
  { id: 'PRO', name: 'Proverbs' },
  { id: 'ECC', name: 'Ecclesiastes' },
  { id: 'SNG', name: 'Song of Solomon' },
  { id: 'ISA', name: 'Isaiah' },
  { id: 'JER', name: 'Jeremiah' },
  { id: 'LAM', name: 'Lamentations' },
  { id: 'EZK', name: 'Ezekiel' },
  { id: 'DAN', name: 'Daniel' },
  { id: 'HOS', name: 'Hosea' },
  { id: 'JOL', name: 'Joel' },
  { id: 'AMO', name: 'Amos' },
  { id: 'OBA', name: 'Obadiah' },
  { id: 'JON', name: 'Jonah' },
  { id: 'MIC', name: 'Micah' },
  { id: 'NAH', name: 'Nahum' },
  { id: 'HAB', name: 'Habakkuk' },
  { id: 'ZEP', name: 'Zephaniah' },
  { id: 'HAG', name: 'Haggai' },
  { id: 'ZEC', name: 'Zechariah' },
  { id: 'MAL', name: 'Malachi' },
  { id: 'MAT', name: 'Matthew' },
  { id: 'MRK', name: 'Mark' },
  { id: 'LUK', name: 'Luke' },
  { id: 'JHN', name: 'John' },
  { id: 'ACT', name: 'Acts' },
  { id: 'ROM', name: 'Romans' },
  { id: '1CO', name: '1 Corinthians' },
  { id: '2CO', name: '2 Corinthians' },
  { id: 'GAL', name: 'Galatians' },
  { id: 'EPH', name: 'Ephesians' },
  { id: 'PHP', name: 'Philippians' },
  { id: 'COL', name: 'Colossians' },
  { id: '1TH', name: '1 Thessalonians' },
  { id: '2TH', name: '2 Thessalonians' },
  { id: '1TI', name: '1 Timothy' },
  { id: '2TI', name: '2 Timothy' },
  { id: 'TIT', name: 'Titus' },
  { id: 'PHM', name: 'Philemon' },
  { id: 'HEB', name: 'Hebrews' },
  { id: 'JAS', name: 'James' },
  { id: '1PE', name: '1 Peter' },
  { id: '2PE', name: '2 Peter' },
  { id: '1JN', name: '1 John' },
  { id: '2JN', name: '2 John' },
  { id: '3JN', name: '3 John' },
  { id: 'JUD', name: 'Jude' },
  { id: 'REV', name: 'Revelation' }
];

// Add chapter and verse limits for each book
const BOOK_CHAPTERS = {
  'GEN': 50, 'EXO': 40, 'LEV': 27, 'NUM': 36, 'DEU': 34,
  'JOS': 24, 'JDG': 21, 'RUT': 4, '1SA': 31, '2SA': 24,
  '1KI': 22, '2KI': 25, '1CH': 29, '2CH': 36, 'EZR': 10,
  'NEH': 13, 'EST': 10, 'JOB': 42, 'PSA': 150, 'PRO': 31,
  'ECC': 12, 'SNG': 8, 'ISA': 66, 'JER': 52, 'LAM': 5,
  'EZK': 48, 'DAN': 12, 'HOS': 14, 'JOL': 3, 'AMO': 9,
  'OBA': 1, 'JON': 4, 'MIC': 7, 'NAH': 3, 'HAB': 3,
  'ZEP': 3, 'HAG': 2, 'ZEC': 14, 'MAL': 4, 'MAT': 28,
  'MRK': 16, 'LUK': 24, 'JHN': 21, 'ACT': 28, 'ROM': 16,
  '1CO': 16, '2CO': 13, 'GAL': 6, 'EPH': 6, 'PHP': 4,
  'COL': 4, '1TH': 5, '2TH': 3, '1TI': 6, '2TI': 4,
  'TIT': 3, 'PHM': 1, 'HEB': 13, 'JAS': 5, '1PE': 5,
  '2PE': 3, '1JN': 5, '2JN': 1, '3JN': 1, 'JUD': 1,
  'REV': 22
};

// Add verse limits for each chapter (simplified version - you might want to add the complete list)
const CHAPTER_VERSES = {
  'GEN': {
    1: 31, 2: 25, 3: 24, 4: 26, 5: 32,
    // ... add more chapters as needed
  },
  // ... add more books as needed
};

export default function BibleVerseScreen() {
  const [currentVerse, setCurrentVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState(1);
  const [showChapterVerseInput, setShowChapterVerseInput] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [showVerseList, setShowVerseList] = useState(false);

  const fetchRandomVerse = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://bible-api.com/?random=verse');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch verse');
      }

      if (!data.text || !data.reference) {
        throw new Error('Invalid verse data received');
      }

      setCurrentVerse({
        verse: data.text.trim(),
        reference: data.reference,
        theme: 'Daily Inspiration'
      });
    } catch (err) {
      setError('Failed to fetch verse. Please try again.');
      console.error('Error fetching verse:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookVerse = async (bookId, chapterNum, verseNum) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://bible-api.com/${bookId}+${chapterNum}:${verseNum}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch verse');
      }

      if (!data.text || !data.reference) {
        throw new Error('Invalid verse data received');
      }

      setCurrentVerse({
        verse: data.text.trim(),
        reference: data.reference,
        theme: 'Daily Inspiration'
      });
      setSelectedBook(bookId);
      setSelectedChapter(chapterNum);
      setSelectedVerse(verseNum);
    } catch (err) {
      setError('Failed to fetch verse. Please try again.');
      console.error('Error fetching verse:', err);
    } finally {
      setLoading(false);
      setShowChapterList(false);
      setShowVerseList(false);
    }
  };

  const handleBookSelect = (bookId) => {
    setSelectedBook(bookId);
    setSelectedChapter(1);
    setSelectedVerse(1);
    setShowBookModal(false);
    setShowChapterList(true);
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setSelectedVerse(1);
    setShowChapterList(false);
    setShowVerseList(true);
  };

  const handleVerseSelect = (verse) => {
    setSelectedVerse(verse);
    setShowVerseList(false);
    fetchBookVerse(selectedBook, selectedChapter, verse);
  };

  useEffect(() => {
    fetchRandomVerse();
  }, []);

  const shareVerse = async () => {
    if (!currentVerse) return;
    
    try {
      await Share.share({
        message: `"${currentVerse.verse}" - ${currentVerse.reference}`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderBookModal = () => (
    <Modal
      visible={showBookModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowBookModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a Book</Text>
          <ScrollView style={styles.bookList}>
            {BIBLE_BOOKS.map((book) => (
              <TouchableOpacity
                key={book.id}
                style={[
                  styles.bookItem,
                  selectedBook === book.id && styles.selectedBookItem
                ]}
                onPress={() => handleBookSelect(book.id)}
              >
                <Text style={[
                  styles.bookName,
                  selectedBook === book.id && styles.selectedBookName
                ]}>
                  {book.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowBookModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderChapterList = () => (
    <Modal
      visible={showChapterList}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setShowChapterList(false);
        setSelectedBook(null);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {BIBLE_BOOKS.find(b => b.id === selectedBook)?.name}
          </Text>
          <FlatList
            data={Array.from({ length: BOOK_CHAPTERS[selectedBook] }, (_, i) => i + 1)}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.selectionItem,
                  selectedChapter === item && styles.selectedItem
                ]}
                onPress={() => handleChapterSelect(item)}
              >
                <Text style={[
                  styles.selectionItemText,
                  selectedChapter === item && styles.selectedItemText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={4}
            contentContainerStyle={styles.selectionList}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setShowChapterList(false);
              setSelectedBook(null);
            }}
          >
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderVerseList = () => (
    <Modal
      visible={showVerseList}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setShowVerseList(false);
        setShowChapterList(true);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {BIBLE_BOOKS.find(b => b.id === selectedBook)?.name} {selectedChapter}
          </Text>
          <FlatList
            data={Array.from({ length: 50 }, (_, i) => i + 1)}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.selectionItem,
                  selectedVerse === item && styles.selectedItem
                ]}
                onPress={() => handleVerseSelect(item)}
              >
                <Text style={[
                  styles.selectionItemText,
                  selectedVerse === item && styles.selectedItemText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={4}
            contentContainerStyle={styles.selectionList}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setShowVerseList(false);
              setShowChapterList(true);
            }}
          >
            <Text style={styles.closeButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.button} onPress={fetchRandomVerse}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity 
          style={[styles.button, styles.selectBookButton]} 
          onPress={() => setShowBookModal(true)}
        >
          <Text style={styles.buttonText}>Select Book</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.newVerseButton]} 
          onPress={fetchRandomVerse}
        >
          <Text style={styles.buttonText}>Random Verse</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About Daily Verses</Text>
        <Text style={styles.infoText}>
          These verses are provided by the Bible API to encourage and guide your daily walk with God. 
          Feel free to share them with others who might need encouragement.
        </Text>
      </View>

      {renderBookModal()}
      {renderChapterList()}
      {renderVerseList()}
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
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  selectBookButton: {
    backgroundColor: '#9b59b6',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookList: {
    maxHeight: '80%',
  },
  bookItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  selectedBookItem: {
    backgroundColor: '#f0f0f0',
  },
  bookName: {
    fontSize: 16,
    color: '#2c3e50',
  },
  selectedBookName: {
    color: '#3498db',
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  selectionList: {
    padding: 10,
  },
  selectionItem: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    minWidth: 70,
  },
  selectedItem: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  selectionItemText: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '500',
  },
  selectedItemText: {
    color: '#ffffff',
    fontWeight: '600',
  },
}); 