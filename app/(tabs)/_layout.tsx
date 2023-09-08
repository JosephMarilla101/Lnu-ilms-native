import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import {
  useColorScheme,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { InterText } from '../../components/StyledText';
import { usePathname } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return (
    <FontAwesome
      size={props.size ?? 28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  const { logout } = useAuth();
  const colorScheme = useColorScheme();
  const pathName = usePathname();

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: pathName !== '/profile' ? StatusBar.currentHeight : 0,
        }}
      >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
            headerShown: false,
            tabBarInactiveBackgroundColor: '#fff',
            tabBarActiveBackgroundColor: '#fff',
          }}
        >
          <Tabs.Screen
            name='index'
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <TabBarIcon name='home' color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name='books'
            options={{
              title: 'Books',
              tabBarIcon: ({ color }) => (
                <TabBarIcon name='book' color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name='profile'
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => (
                <TabBarIcon name='user-circle-o' color={color} />
              ),
              headerShown: true,
              headerTitleAlign: 'center',
              headerTitle: () => {
                return (
                  <InterText style={styles.headerText}>My Profile</InterText>
                );
              },
              headerRight: () => {
                return (
                  <View>
                    <Menu
                      renderer={renderers.Popover}
                      rendererProps={{
                        placement: 'bottom',
                      }}
                    >
                      <MenuTrigger style={{ padding: 10 }}>
                        <TabBarIcon name='cog' color={Colors['dark'].primary} />
                      </MenuTrigger>
                      <MenuOptions
                        customStyles={{
                          optionsContainer: {
                            paddingHorizontal: 30,
                            paddingVertical: 5,
                          },
                        }}
                      >
                        <MenuOption onSelect={logout}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignContent: 'center',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <InterText
                              style={{
                                color: 'black',
                                fontWeight: '500',
                                fontSize: 15,
                                marginRight: 8,
                              }}
                            >
                              Logout
                            </InterText>
                            <TabBarIcon
                              name='sign-out'
                              color={Colors['dark'].primary}
                              size={20}
                            />
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                );
              },
              headerStyle: {
                backgroundColor: '#fff',
              },
            }}
          />
        </Tabs>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '700',
  },
});
