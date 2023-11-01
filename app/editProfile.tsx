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
import * as ImagePicker from 'expo-image-picker';
import { Link, router } from 'expo-router';
import { InterText } from '../components/StyledText';
import { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import { useUpdateProfile, useUpdateProfilePhoto } from '../hooks/useUser';
import { useImageUpload } from '../hooks/useImageUpload';
import { useVerifyToken } from '../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

const departmentSelection = [
  'English Unit',
  'Filipino Unit',
  'HAE Unit',
  'HRM & THRM Unit',
  'IT UNIT',
  'MAPEH UNIT',
  'MATH UNIT',
  'PROFED UNIT',
  'SCIENCE UNIT',
  'SOCIAL SCIENCE UNIT',
  'SOCIAL WORK UNIT',
];

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
  const auth = useVerifyToken();
  const colorScheme = useColorScheme();
  const updateProfile = useUpdateProfile();
  const updateProfilePhoto = useUpdateProfilePhoto();
  const imageUploader = useImageUpload();
  const [formData, setFormData] = useState({
    fullname: auth.data?.profile?.fullname ?? '',
    course: auth.data?.profile?.course ?? courseSelection[0],
    college: auth.data?.profile?.college ?? collegeSelection[0],
    department: auth.data?.profile?.department ?? departmentSelection[0],
    mobile: auth.data?.profile?.mobile ?? '',
    email: auth.data?.email ?? '',
  });

  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null | undefined>(
    null
  );
  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setImageBase64(result.assets[0].base64);
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async () => {
    if (imageBase64) {
      const res = await imageUploader.mutateAsync(
        'data:image/jpg;base64,' + imageBase64
      );

      if (res.status === 200) {
        updateProfilePhoto.mutateAsync({
          profilePhoto: res.data.secure_url,
          profilePhotoId: res.data.public_id,
        });
      }
    }
    updateProfile.mutate(formData);
  };

  useEffect(() => {
    if (updateProfile.isSuccess) {
      updateProfile.reset();
      imageUploader.reset();
      updateProfilePhoto.reset();
      setImage(null);
      setFormData({
        fullname: '',
        course: courseSelection[0],
        college: collegeSelection[0],
        department: departmentSelection[0],
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
          <View
            style={{
              alignItems: 'center',
            }}
          >
            {!image ? (
              <>
                {auth.data?.profile?.profilePhoto ? (
                  <Image
                    source={{
                      uri: auth.data?.profile?.profilePhoto,
                    }}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require('../assets/images/user-male.png')}
                    style={styles.image}
                  />
                )}
              </>
            ) : (
              <Image
                source={{
                  uri: image,
                }}
                style={styles.image}
              />
            )}

            {!image ? (
              <Pressable
                style={{ ...styles.button2, flexDirection: 'row' }}
                onPress={pickImage}
                disabled={
                  imageUploader.isLoading || updateProfilePhoto.isLoading
                }
              >
                {/* {(imageUploader.isLoading || updateProfilePhoto.isLoading) && (
                <ActivityIndicator
                  size='small'
                  color='#fff'
                  style={{ marginRight: 10 }}
                />
              )} */}
                <InterText style={{ color: '#fff' }}>Choose Image</InterText>
              </Pressable>
            ) : (
              <Pressable
                style={{ ...styles.button2, flexDirection: 'row' }}
                onPress={() => {
                  setImageBase64(null);
                  setImage(null);
                }}
                disabled={
                  imageUploader.isLoading || updateProfilePhoto.isLoading
                }
              >
                <InterText style={{ color: '#fff' }}>Cancel</InterText>
              </Pressable>
            )}
          </View>

          {/* <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Button
              title='Pick an image from camera roll'
              onPress={pickImage}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View> */}

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

          {/* Render only if role is teacher */}
          {auth.data?.role === 'TEACHER' && (
            <View style={{ flexDirection: 'column' }}>
              <View>
                <InterText style={styles.label}>Department:</InterText>
                <View
                  style={{
                    ...styles.select,
                    borderColor: Colors[colorScheme ?? 'light'].primary,
                  }}
                >
                  <Picker
                    selectedValue={formData.department}
                    onValueChange={(itemValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        department: itemValue,
                      }))
                    }
                    prompt='Department'
                  >
                    {departmentSelection.map((department, i) => {
                      return (
                        <Picker.Item
                          label={department}
                          value={department}
                          key={i}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
          )}

          {/* Render only if role is student */}
          {auth.data?.role === 'STUDENT' && (
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
          )}

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
            disabled={
              updateProfile.isLoading ||
              imageUploader.isLoading ||
              updateProfilePhoto.isLoading
            }
          >
            {(updateProfile.isLoading ||
              imageUploader.isLoading ||
              updateProfilePhoto.isLoading) && (
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
    resizeMode: 'cover',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
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
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: Colors['light'].primary,
    marginTop: 10,
    width: 160,
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
