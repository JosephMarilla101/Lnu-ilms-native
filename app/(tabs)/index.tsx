import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import { InterText } from '../../components/StyledText';
import { useCallback, useState } from 'react';
import Book from '../../components/Book';
import { useGetRequestedBook } from '../../hooks/useBook';
import { format, parseISO } from 'date-fns';

export default function TabHomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const requestedBook = useGetRequestedBook();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    requestedBook.refetch();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const formatDate = (date?: Date) => {
    if (!date) return;

    return format(parseISO(date.toString()), 'MMM d, yyyy h:mm a');
  };

  function CardIcon(props: {
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

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.scroll}
    >
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={[styles.card]}>
            <CardIcon name='book' size={60} color={Colors['light'].primary} />

            <InterText
              style={[
                styles.cardText,
                { color: Colors['light'].primary, marginTop: 5 },
              ]}
            >
              6
            </InterText>

            <InterText
              style={[styles.cardText, { color: Colors['light'].primary }]}
            >
              Books
            </InterText>
          </View>

          <View style={[styles.card]}>
            <CardIcon name='refresh' size={60} color='#FF7276' />

            <InterText
              style={[styles.cardText, { color: '#FF7276', marginTop: 5 }]}
            >
              2
            </InterText>

            <InterText style={[styles.cardText, { color: '#FF7276' }]}>
              Unreturned Books
            </InterText>
          </View>

          <View style={[styles.card]}>
            <CardIcon
              name='bookmark'
              size={60}
              color={Colors['light'].secondary}
            />

            <InterText
              style={[
                styles.cardText,
                { color: Colors['light'].secondary, marginTop: 5 },
              ]}
            >
              4
            </InterText>

            <InterText
              style={[styles.cardText, { color: Colors['light'].secondary }]}
            >
              Requested Books
            </InterText>
          </View>

          <View style={[styles.card]}>
            <CardIcon name='calendar-times-o' size={60} color='green' />

            <InterText
              style={[styles.cardText, { color: 'green', marginTop: 5 }]}
            >
              3
            </InterText>

            <InterText style={[styles.cardText, { color: 'green' }]}>
              Borrowed Books
            </InterText>
          </View>
        </View>

        {requestedBook.data && (
          <View style={styles.requestedContainer}>
            <InterText
              style={[
                styles.text,
                {
                  fontSize: 18,
                  color: Colors['light'].primary,
                  fontWeight: '700',
                  fontStyle: 'italic',
                  marginBottom: 8,
                  marginLeft: 5,
                },
              ]}
            >
              Pending Book Request...
            </InterText>

            <Book bookId={requestedBook.data.book.id} type='cancel' />
            <View style={styles.textContainer}>
              <InterText style={[styles.text, styles.heading]}>
                Status:
              </InterText>

              <InterText style={[styles.text, styles.description]}>
                {`${
                  requestedBook.data.isApproved ? 'Approved' : 'Pending Request'
                }`}
              </InterText>
            </View>

            <View style={styles.textContainer}>
              <InterText style={[styles.text, styles.heading]}>
                Request Date:
              </InterText>

              <InterText style={[styles.text, styles.description]}>
                {formatDate(requestedBook.data.requestDate)}
              </InterText>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['light'].background,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  scroll: {
    backgroundColor: Colors['light'].background,
  },
  requestedContainer: {
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  cardContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 20,
  },
  card: {
    width: '48%',
    height: 180,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#FFF',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
    rowGap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
  },
  textContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#000',
  },
  heading: {
    fontSize: 15,
    minWidth: 140,
  },
  description: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors['light'].primary,
  },
});
