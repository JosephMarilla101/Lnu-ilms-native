import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const BorrowedBooks = () => {
  return (
    <View style={styles.container}>
      <Text>BorrowedBooks</Text>
    </View>
  );
};

export default BorrowedBooks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['light'].background,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
