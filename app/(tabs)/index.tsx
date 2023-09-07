import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function TabHomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['light'].background,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
