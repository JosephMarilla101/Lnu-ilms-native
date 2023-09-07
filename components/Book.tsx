import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { InterText } from './StyledText';
import { useGetBook } from '../hooks/useBook';
import Colors from '../constants/Colors';

const Book = ({ bookId }: { bookId: number }) => {
  const book = useGetBook(bookId);

  if (book.isLoading) return <BookLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {book.data?.bookCover ? (
          <Image
            source={{
              uri: book.data?.bookCover,
            }}
            style={styles.image}
          />
        ) : (
          ''
        )}
      </View>

      <View style={styles.details}>
        <InterText style={styles.bookTitle}>{book.data?.name}</InterText>
        <InterText
          style={{ ...styles.text, textAlign: 'center', fontStyle: 'italic' }}
        >
          by
        </InterText>
        <InterText
          style={styles.bookAuthor}
        >{`(${book.data?.author.name})`}</InterText>

        <InterText
          style={{
            ...styles.text,
            textAlign: 'center',
            fontStyle: 'italic',
            marginTop: 10,
          }}
        >
          ISBN #: {book.data?.isbn}
        </InterText>

        <InterText
          style={{ ...styles.text, textAlign: 'center', fontStyle: 'italic' }}
        >
          Copies Available: {book.data?.copies}
        </InterText>
      </View>
    </View>
  );
};

export default Book;

const BookLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}></View>

      <View style={styles.details}>
        <ActivityIndicator
          size='large'
          color={Colors['light'].primary}
          style={{ marginRight: 10 }}
        />
        <InterText
          style={{
            ...styles.text,
            textAlign: 'center',
            fontStyle: 'italic',
            marginTop: 10,
          }}
        >
          Please wait...
        </InterText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 10,
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#f0f0f0',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: 150,
    height: 200,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  bookTitle: {
    color: Colors['light'].primary,
    fontSize: 21,
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
  },
  bookAuthor: {
    color: Colors['light'].secondary,
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
  },
  text: {
    color: 'black',
  },
});
