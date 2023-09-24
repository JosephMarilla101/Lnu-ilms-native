import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TextInput,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useQueryClient } from '@tanstack/react-query';
import BookList from '../../components/BookList';
import { useBookList, useGetActiveCategories } from '../../hooks/useBook';
import { useVerifyToken } from '../../hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import Colors from '../../constants/Colors';

const Books = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const authVerifier = useVerifyToken();
  const queryClient = useQueryClient();
  const colorScheme = useColorScheme();
  const activeCategories = useGetActiveCategories();
  const bookList = useBookList(filter, categoryFilter);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    authVerifier.refetch();

    queryClient.prefetchInfiniteQuery(['bookList']);
    queryClient.invalidateQueries(['book']);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleBottomReached = () => {
    bookList.fetchNextPage();
  };

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentSize, layoutMeasurement, contentOffset } =
        event.nativeEvent;

      // Add a treshold of 200px to trigger bottom reach earlier
      const atBottom =
        contentSize.height - contentOffset.y <= layoutMeasurement.height + 200;

      if (atBottom && !isAtBottom) {
        setIsAtBottom(true);
        handleBottomReached();
      } else if (!atBottom && isAtBottom) {
        setIsAtBottom(false);
      }
    },
    [isAtBottom]
  );

  useEffect(() => {
    bookList.refetch();
  }, [filter, categoryFilter]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={handleScroll}
      style={styles.scroll}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <TextInput
            editable
            maxLength={40}
            onChangeText={(text) => setFilter(text)}
            value={filter}
            placeholder='Search Books'
            style={{
              ...styles.input,
              borderColor: Colors[colorScheme ?? 'light'].primary,
            }}
            cursorColor={'gray'}
            autoFocus={false}
          />

          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={categoryFilter}
              onValueChange={(itemValue) => setCategoryFilter(itemValue)}
              prompt='Category'
            >
              <Picker.Item label='None' value='' />
              {activeCategories.data &&
                activeCategories.data.map((category) => (
                  <Picker.Item
                    label={category.name}
                    value={category.name}
                    key={category.id}
                  />
                ))}
            </Picker>
          </View>
        </View>
        <BookList filter={filter} category={categoryFilter} />
      </View>
    </ScrollView>
  );
};

export default Books;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  input: {
    width: '100%',
    maxWidth: 220,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Inter',
  },
});
