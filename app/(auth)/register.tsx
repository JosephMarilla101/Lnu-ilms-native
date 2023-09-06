import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  TextInput,
  Pressable,
} from 'react-native';
import { Link } from 'expo-router';
import Checkbox from 'expo-checkbox';
import Colors from '../../constants/Colors';
import { InterText } from '../../components/StyledText';
import { useState } from 'react';

const Register = () => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/ilmslogo.png')}
        style={styles.image}
      />

      <InterText
        style={{
          ...styles.title,
          color: Colors[colorScheme ?? 'light'].secondary,
        }}
      >
        Studen Registration
      </InterText>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    color: '#000',
  },
  formContainer: {
    maxWidth: 350,
    width: '100%',
    marginTop: 25,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 220,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 17,
    width: '100%',
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    marginTop: 4,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Inter',
  },
  checkbox: {
    margin: 8,
    height: 20,
    width: 20,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: Colors['light'].primary,
    marginTop: 25,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff',
  },
});
