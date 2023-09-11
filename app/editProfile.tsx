import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { Link, router } from 'expo-router';
import { InterText } from '../components/StyledText';
import { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import { useUpdateProfile } from '../hooks/useStudent';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const courseSelection = [
  'BSIT',
  'BSTM',
  'BSED',
  'BPED',
  'BSBio',
  'BSHM',
  'BECED',
  'BAEL',
  'TCP',
  'BACOM',
  'POLCI',
];

const collegeSelection = ['CAS', 'CME', 'COE'];

export default function ModalScreen() {
  const { auth } = useAuth();
  const colorScheme = useColorScheme();
  const updateProfile = useUpdateProfile();
  const [formData, setFormData] = useState({
    fullname: auth.user?.fullname ?? '',
    course: auth.user?.course ?? courseSelection[0],
    college: auth.user?.college ?? collegeSelection[0],
    mobile: auth.user?.mobile ?? '',
    email: auth.user?.email ?? '',
  });

  const handleUpdateProfile = () => {
    updateProfile.mutate(formData);
  };

  useEffect(() => {
    if (updateProfile.isSuccess) {
      setFormData({
        fullname: '',
        course: courseSelection[0],
        college: collegeSelection[0],
        mobile: '',
        email: '',
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile updated successfully!',
        position: 'top',
        topOffset: 50,
      });
      router.back();
    }
  }, [updateProfile.isSuccess, updateProfile.isError]);

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <InterText style={styles.label}>Full Name:</InterText>
          <TextInput
            editable
            maxLength={40}
            autoCapitalize='words'
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, fullname: text }))
            }
            value={formData.fullname}
            placeholder='Full Name'
            style={{
              ...styles.input,
              borderColor: Colors[colorScheme ?? 'light'].primary,
            }}
            cursorColor={'gray'}
          />

          <InterText style={styles.label}>Email:</InterText>
          <TextInput
            editable
            maxLength={40}
            autoComplete='email'
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

          <InterText style={styles.label}>Mobile #:</InterText>
          <TextInput
            editable
            maxLength={40}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, mobile: text }))
            }
            value={formData.mobile}
            placeholder='Mobile #'
            style={{
              ...styles.input,
              borderColor: Colors[colorScheme ?? 'light'].primary,
            }}
            cursorColor={'gray'}
          />

          <View style={{ flexDirection: 'column' }}>
            <View>
              <InterText style={styles.label}>Course:</InterText>
              <View
                style={{
                  ...styles.select,
                  borderColor: Colors[colorScheme ?? 'light'].primary,
                }}
              >
                <Picker
                  selectedValue={formData.course}
                  onValueChange={(itemValue) =>
                    setFormData((prev) => ({ ...prev, course: itemValue }))
                  }
                  prompt='Course'
                >
                  {courseSelection.map((course, i) => {
                    return (
                      <Picker.Item label={course} value={course} key={i} />
                    );
                  })}
                </Picker>
              </View>
            </View>

            <View>
              <InterText style={styles.label}>College:</InterText>
              <View
                style={{
                  ...styles.select,
                  borderColor: Colors[colorScheme ?? 'light'].primary,
                }}
              >
                <Picker
                  selectedValue={formData.college}
                  onValueChange={(itemValue) =>
                    setFormData((prev) => ({ ...prev, college: itemValue }))
                  }
                  prompt='College'
                >
                  {collegeSelection.map((college, i) => {
                    return (
                      <Picker.Item label={college} value={college} key={i} />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>

          {updateProfile.isError && (
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
                {updateProfile.error?.message}
              </InterText>
            </View>
          )}

          <Pressable
            style={{ ...styles.button, flexDirection: 'row' }}
            onPress={handleUpdateProfile}
            disabled={updateProfile.isLoading}
          >
            {updateProfile.isLoading && (
              <ActivityIndicator
                size='small'
                color='#fff'
                style={{ marginRight: 10 }}
              />
            )}
            <Text style={styles.text}>Update Profile</Text>
          </Pressable>

          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Link href='/changePassword' asChild>
              <Pressable>
                <InterText
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: Colors['light'].primary,
                  }}
                >
                  Want to change password?
                </InterText>
                <InterText
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: Colors['light'].primary,
                    textDecorationLine: 'underline',
                  }}
                >
                  Click here
                </InterText>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
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
    marginTop: 30,
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