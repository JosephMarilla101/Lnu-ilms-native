import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import { InterText } from '../components/StyledText';
import { useChangePassword } from '../hooks/useStudent';
import { Ionicons } from '@expo/vector-icons';

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const changePassword = useChangePassword();
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    password_confirmation: '',
  });

  const handleChangePassword = () => {
    changePassword.mutate(formData);
  };

  useEffect(() => {
    if (changePassword.isSuccess) {
      setFormData({
        current_password: '',
        new_password: '',
        password_confirmation: '',
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password change successfully!',
        position: 'top',
        topOffset: 50,
      });
    }
  }, [changePassword.isSuccess, changePassword.isError]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <InterText style={styles.label}>Current Password:</InterText>
        <TextInput
          editable
          maxLength={40}
          autoCapitalize='words'
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, current_password: text }))
          }
          value={formData.current_password}
          placeholder='Enter Current Password'
          style={{
            ...styles.input,
            borderColor: Colors[colorScheme ?? 'light'].primary,
          }}
          cursorColor={'gray'}
        />

        <InterText style={styles.label}>New Password:</InterText>
        <TextInput
          editable
          maxLength={40}
          autoComplete='email'
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, new_password: text }))
          }
          value={formData.new_password}
          placeholder='Enter New Password'
          style={{
            ...styles.input,
            borderColor: Colors[colorScheme ?? 'light'].primary,
          }}
          cursorColor={'gray'}
        />

        <InterText style={styles.label}>Confirm Password:</InterText>
        <TextInput
          editable
          maxLength={40}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, password_confirmation: text }))
          }
          value={formData.password_confirmation}
          placeholder='Confirm Password'
          style={{
            ...styles.input,
            borderColor: Colors[colorScheme ?? 'light'].primary,
          }}
          cursorColor={'gray'}
        />

        {changePassword.isError && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Ionicons
              name='ios-warning-outline'
              size={24}
              color='red'
              style={{ marginRight: 5 }}
            />
            <InterText style={styles.errorText}>
              {changePassword.error?.message}
            </InterText>
          </View>
        )}

        <Pressable
          style={{ ...styles.button, flexDirection: 'row' }}
          onPress={handleChangePassword}
          disabled={changePassword.isLoading}
        >
          {changePassword.isLoading && (
            <ActivityIndicator
              size='small'
              color='#fff'
              style={{ marginRight: 10 }}
            />
          )}
          <Text style={styles.text}>Change Password</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
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
  select: {
    borderWidth: 2,
    borderRadius: 8,
    fontFamily: 'Inter',
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
    marginTop: 20,
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
