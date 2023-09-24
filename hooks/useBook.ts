import {
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { request } from '../utils/axios-interceptor';

export type Book = {
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

type BookRequestResponse = {
  book: Book;
  isApproved: boolean;
  requestDate: Date;
  updatedAt: Date;
};

const getRequestedBook = () => request({ url: '/book/requested' });

export const useGetRequestedBook = (): UseQueryResult<BookRequestResponse> =>
  useQuery(['book', 'requested'], getRequestedBook);

const getBookLateFee = () => request({ url: '/book/late_fee' });

type LateFee = {
  initialFee: number;
  followingDateFee: number;
};

export const useGetBookLateFee = (): UseQueryResult<LateFee> =>
  useQuery(['book', 'latefee'], getBookLateFee, {
    onError: (error: ErrorResponse) => error,
  });

type UnreturnedBook = {
  book: Book;
  isReturn: true;
  dueDate: Date;
};

const getUnreturnedBook = () => request({ url: '/book/unreturned' });

export const useGetUnreturnedBook = (): UseQueryResult<UnreturnedBook> =>
  useQuery(['book', 'unreturned'], getUnreturnedBook);

type InfiniteQueryBookList = [{ id: number }];

const fetchBookList = ({
  pageParam = undefined,
  filter = '',
  category = '',
}: {
  pageParam?: unknown;
  filter?: string;
  category?: string;
}) =>
  request({
    url: `/book/list/?cursor=${pageParam}&filter=${filter}&category=${category}`,
  });

export const useBookList = (
  filter: string,
  category: string
): UseInfiniteQueryResult<InfiniteQueryBookList, Error> =>
  useInfiniteQuery({
    queryKey: ['bookList'],
    queryFn: (context) => fetchBookList({ ...context, filter, category }),
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage[lastPage.length - 1];
      // return the book id as cursor for next page request
      return lastPost?.id;
    },
  });

const requestBook = (data: { bookId: number }) =>
  request({ url: '/book/request', method: 'post', data });

export const useRequestBook = () =>
  useMutation(requestBook, {
    onError: (error: ErrorResponse) => error,
  });

const cancelRequest = (data: { bookId: number; studentId: number }) =>
  request({ url: '/book/cancel_request', method: 'delete', data });

export const useCancelRequest = () =>
  useMutation(cancelRequest, {
    onError: (error: ErrorResponse) => error,
  });

export type Category = {
  id: number;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const getActiveCategories = () => request({ url: '/category/active' });

export const useGetActiveCategories = (): UseQueryResult<Category[]> =>
  useQuery(['category', 'active'], getActiveCategories, {
    onError: (error: ErrorResponse) => error,
  });

type ErrorResponse = {
  message?: string;
};
