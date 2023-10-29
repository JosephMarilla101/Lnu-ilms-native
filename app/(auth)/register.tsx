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
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import Colors from '../../constants/Colors';
import { InterText } from '../../components/StyledText';
import { useState } from 'react';
import { useStudentRegistration } from '../../hooks/useUser';
import Ionicons from '@expo/vector-icons/Ionicons';

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

const Register = () => {
  const colorScheme = useColorScheme();
  const studentRegistration = useStudentRegistration();

  const [formData, setFormData] = useState({
    id: '',
    fullname: '',
    course: courseSelection[0],
    college: collegeSelection[0],
    mobile: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleRegister = () => {
    studentRegistration.mutate(formData);
  };

  return (
    <ScrollView>
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
          Student Registration
        </InterText>

        <View style={styles.formContainer}>
          <InterText style={styles.label}>Student ID:</InterText>
          <TextInput
            editable
            maxLength={40}
            autoCapitalize='none'
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, id: text }))
            }
            value={formData.id}
            placeholder='Student ID'
            style={{
              ...styles.input,
              borderColor: Colors[colorScheme ?? 'light'].primary,
            }}
            cursorColor={'gray'}
          />

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

          <View style={{ flexDirection: 'row', gap: 4 }}>
            <View style={{ flex: 0.5 }}>
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

            <View style={{ flex: 0.5 }}>
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

          <InterText style={styles.label}>Password:</InterText>
          <TextInput
            editable
            maxLength={40}
            autoCapitalize='none'
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, password: text }))
            }
            value={formData.password}
            placeholder='Password'
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
            autoCapitalize='none'
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

          {studentRegistration.isError && (
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
                {studentRegistration.error?.message}
              </InterText>
            </View>
          )}

          <Pressable
            style={{ ...styles.button, flexDirection: 'row' }}
            onPress={handleRegister}
            disabled={studentRegistration.isLoading}
          >
            {studentRegistration.isLoading && (
              <ActivityIndicator
                size='small'
                color='#fff'
                style={{ marginRight: 10 }}
              />
            )}
            <Text style={styles.text}>Register</Text>
          </Pressable>

          <Link href='/login' asChild>
            <Pressable>
              <InterText
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  fontSize: 14,
                  color: Colors['light'].primary,
                }}
              >
                Already have an account?
              </InterText>
              <InterText
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: Colors['light'].primary,
                  textDecorationLine: 'underline',
                }}
              >
                Login here
              </InterText>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
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
    paddingBottom: 30,
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
