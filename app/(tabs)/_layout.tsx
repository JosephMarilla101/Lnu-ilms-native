import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme, StatusBar, SafeAreaView } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
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
              title: 'Books List',
              tabBarIcon: ({ color }) => (
                <TabBarIcon name='list' color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name='borrowedBooks'
            options={{
              title: 'Borrowed Books',
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
            }}
          />
        </Tabs>
      </SafeAreaView>
    </>
  );
}
