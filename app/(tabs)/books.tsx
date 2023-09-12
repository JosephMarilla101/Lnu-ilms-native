import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import BookList from '../../components/BookList';
import { useBookList } from '../../hooks/useBook';
import { useVerifyToken } from '../../hooks/useAuth';
import { useCallback, useState } from 'react';

const Books = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const authVerifier = useVerifyToken();
  const queryClient = useQueryClient();
  const bookList = useBookList();

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

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={handleScroll}
      style={styles.scroll}
    >
      <View style={styles.container}>
        <BookList />
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
});
