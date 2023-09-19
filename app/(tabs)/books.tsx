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
import { useQueryClient } from '@tanstack/react-query';
import BookList from '../../components/BookList';
import { useBookList } from '../../hooks/useBook';
import { useVerifyToken } from '../../hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import Colors from '../../constants/Colors';

const Books = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const [filter, setFilter] = useState('');
  const authVerifier = useVerifyToken();
  const queryClient = useQueryClient();
  const colorScheme = useColorScheme();
  const bookList = useBookList(filter);

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
  }, [filter]);

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

          {filter && bookList.isFetching && (
            <ActivityIndicator
              size='large'
              color='blue'
              style={{ marginLeft: 10 }}
            />
          )}
        </View>
        <BookList filter={filter} />
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
