import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { InterText } from './StyledText';
import Book from './Book';
import { useBookList } from '../hooks/useBook';

const BookList = () => {
  const bookList = useBookList();
  return (
    <View>
      {bookList.isLoading ? (
        <View>
          <ActivityIndicator
            size='large'
            color='blue'
            style={{ marginRight: 10 }}
          />
        </View>
      ) : !bookList.data?.pages ? (
        <View>
          <InterText style={styles.text}>No Data Available</InterText>
        </View>
      ) : bookList.data.pages[0].length < 1 ? (
        <View>
          <InterText style={styles.text}>No Books Listed</InterText>
        </View>
      ) : (
        <>
          {bookList.data.pages.map((group, i) => {
            return (
              <View key={i}>
                {group.map((book) => {
                  return <Book bookId={book.id} key={book.id} />;
                })}
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};

export default BookList;

const styles = StyleSheet.create({
  text: {
    color: '#000',
    width: '100%',
    textAlign: 'center',
  },
});
