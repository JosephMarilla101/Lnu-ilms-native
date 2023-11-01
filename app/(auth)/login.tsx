import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';
// import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';
import { InterText } from '../../components/StyledText';
import { useEffect, useState } from 'react';
import { useStudentLogin } from '../../hooks/useAuth';
import { useAuth } from '../../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const Login = () => {
  const colorScheme = useColorScheme();
  const studentLogin = useStudentLogin();
  const { setAuth } = useAuth();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    studentLogin.mutate(formData);
  };

  useEffect(() => {
    if (studentLogin.isSuccess) {
      setAuth({ user: studentLogin.data.user, verifying: false });
      studentLogin.reset();
    }
  }, [studentLogin.isSuccess]);

  // clear the storage when rendering login screen
  useEffect(() => {
    const clearStorage = async () =>
      await AsyncStorage.removeItem('lnu-ilms_token');

    clearStorage();
  }, []);

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
        User Login
      </InterText>

      <View style={styles.formContainer}>
        <InterText style={styles.label}>Email:</InterText>
        <TextInput
          editable
          maxLength={40}
          autoComplete='email'
          autoCapitalize='none'
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
          value={formData.email}
          placeholder='Email'
          style={{
            ...styles.input,
            borderColor: Colors[colorScheme ?? 'light'].primary,
          }}
          cursorColor={'gray'}
        />

        <InterText style={styles.label}>Password:</InterText>
        <View style={{ position: 'relative', marginBottom: 20 }}>
          <TextInput
            editable
            maxLength={40}
            autoCapitalize='none'
            autoComplete='password'
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, password: text }))
            }
            value={formData.password}
            placeholder='Password'
            style={{
              ...styles.input,
              borderColor: Colors[colorScheme ?? 'light'].primary,
              paddingRight: 40,
            }}
            cursorColor={'gray'}
            secureTextEntry={!isPasswordShown}
          />

          <Ionicons
            name={isPasswordShown ? 'eye' : 'eye-off'}
            size={24}
            color='gray'
            style={{
              position: 'absolute',
              top: 16,
              right: 12,
            }}
            onPress={() => setIsPasswordShown((prev) => !prev)}
          />
        </View>

        {/* <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isPasswordShown}
            onValueChange={setIsPasswordShown}
            color={isPasswordShown ? '#4630EB' : undefined}
          />
          <Pressable onPress={() => setIsPasswordShown(!isPasswordShown)}>
            <InterText style={styles.checkboxLabel}>Show password</InterText>
          </Pressable>
        </View> */}

        {studentLogin.isError && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name='ios-warning-outline'
              size={24}
              color='red'
              style={{ marginRight: 5 }}
            />
            <InterText style={styles.errorText}>
              {studentLogin.error?.message}
            </InterText>
          </View>
        )}

        <Pressable
          style={{ ...styles.button, flexDirection: 'row' }}
          onPress={handleLogin}
          disabled={studentLogin.isLoading}
        >
          {studentLogin.isLoading && (
            <ActivityIndicator
              size='small'
              color='#fff'
              style={{ marginRight: 10 }}
            />
          )}

          <Text style={styles.text}>Login</Text>
        </Pressable>

        <Link href='/register' asChild>
          <Pressable>
            <InterText
              style={{
                textAlign: 'center',
                marginTop: 20,
                fontSize: 14,
                color: Colors['light'].primary,
              }}
            >
              Don't have an account?
            </InterText>
            <InterText
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: Colors['light'].primary,
                textDecorationLine: 'underline',
              }}
            >
              Register here
            </InterText>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  formContainer: {
    maxWidth: 350,
    width: '100%',
    marginTop: 15,
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
    marginTop: 15,
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
    color: 'gray',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: Colors['light'].primary,
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    maxWidth: 260,
  },
});
