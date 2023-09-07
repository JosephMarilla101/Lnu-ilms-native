import {
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { request } from '../utils/axios-interceptor';

type Book = {
  id: number;
  isbn: number;
  name: string;
  bookCover?: string;
  copies: number;
  author: { id: number; name: string };
  category: { id: number; name: string };
};

export const useGetBook = (id: number): UseQueryResult<Book> => {
  const getBook = () => request({ url: `/book/?id=${id}` });
  return useQuery(['book', id], getBook, {
    onError: (error: ErrorResponse) => error,
  });
};

type ErrorResponse = {
  message?: string;
};

type InfiniteQueryBookList = [{ id: number }];

const fetchBookList = ({ pageParam = undefined }: { pageParam?: unknown }) =>
  request({ url: `/book/list/?cursor=${pageParam}` });

export const useBookList = (): UseInfiniteQueryResult<
  InfiniteQueryBookList,
  Error
> =>
  useInfiniteQuery({
    queryKey: ['bookList'],
    queryFn: fetchBookList,
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage[lastPage.length - 1];
      // return the book id as cursor for next page request
      return lastPost?.id;
    },
  });
