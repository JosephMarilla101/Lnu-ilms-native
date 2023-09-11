import {
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useVerifyToken } from '../../hooks/useAuth';
import { InterText } from '../../components/StyledText';
import Colors from '../../constants/Colors';
import { format, parseISO } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const tokenVerification = useVerifyToken();
  const { auth, setAuth } = useAuth();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // refetch profile data here
    tokenVerification.refetch();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const formatDate = (date?: Date) => {
    if (!date) return;

    return format(parseISO(date.toString()), 'MMM d, yyyy h:mm a');
  };

  useEffect(() => {
    if (tokenVerification.isSuccess) {
      setAuth({ user: tokenVerification.data, verifying: false });
    }
  }, [tokenVerification.isSuccess, refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.scroll}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 10,
          }}
        >
          {auth.user?.profilePhoto ? (
            <Image
              source={{
                uri: auth.user.profilePhoto,
              }}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../assets/images/user-male.png')}
              style={styles.image}
            />
          )}

          <View
            style={{
              maxWidth: 210,
              marginLeft: 10,
              justifyContent: 'center',
            }}
          >
            <InterText
              style={{
                ...styles.text,
                fontWeight: '700',
                fontSize: 26,
              }}
            >
              {`${auth.user?.fullname}`}
            </InterText>
            <InterText style={styles.text}>
              {`${auth.user?.studentId} (${auth.user?.course})`}
            </InterText>

            <Link href='/editProfile' asChild>
              <Pressable style={styles.button}>
                <InterText style={{ color: '#fff' }}>Edit Profile</InterText>
              </Pressable>
            </Link>
          </View>
        </View>

        <View style={styles.information}>
          <InterText style={styles.header}>Profile Information</InterText>

          <View style={styles.infoContainer}>
            <InterText style={styles.textDesc}>Student #:</InterText>
            <InterText style={styles.textData}>
              {auth.user?.studentId}
            </InterText>
          </View>

          <View style={styles.infoContainer}>
            <InterText style={styles.textDesc}>Full Name:</InterText>
            <InterText style={styles.textData}>{auth.user?.fullname}</InterText>
          </View>

          <View style={styles.infoContainer}>
            <InterText style={styles.textDesc}>College:</InterText>
            <InterText style={styles.textData}>{auth.user?.college}</InterText>
          </View>

          <View style={styles.infoContainer}>
            <InterText style={styles.textDesc}>Course:</InterText>
            <InterText style={styles.textData}>{auth.user?.course}</InterText>
          </View>

          <View style={styles.infoContainer}>
            <InterText style={styles.textDesc}>Email:</InterText>
            <InterText style={styles.textData}>{auth.user?.email}</InterText>
          </View>

          <View style={styles.infoContainer}>
            <InterText style={styles.textDesc}>Mobile:</InterText>
            <InterText style={styles.textData}>{auth.user?.mobile}</InterText>
          </View>

          <View style={styles.infoContainer}>
            <InterText style={styles.textDesc}>Reg Date:</InterText>
            <InterText style={styles.textData}>
              {formatDate(auth.user?.createdAt)}
            </InterText>
          </View>

          <View style={styles.infoContainer}>
            <InterText style={styles.textDesc}>Update Date:</InterText>
            <InterText style={styles.textData}>
              {formatDate(auth.user?.updatedAt)}
            </InterText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  information: {
    width: '100%',
    marginTop: 40,
  },
  image: {
    resizeMode: 'cover',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  button: {
    width: 125,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: Colors['light'].primary,
    marginTop: 6,
  },
  header: {
    color: '#000',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  textDesc: {
    color: 'black',
    fontWeight: '700',
    fontSize: 17,
    minWidth: 100,
  },
  textData: {
    color: Colors['light'].primary,
    fontSize: 17,
    marginLeft: 10,
    maxWidth: 250,
  },
  text: {
    color: 'black',
  },
});
