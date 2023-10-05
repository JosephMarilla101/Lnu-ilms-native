import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { request } from '../utils/axios-interceptor';

type ResponseType = number;
type ErrorResponse = {
  message?: string;
};

const totalBooks = () => request({ url: '/dashboard/total_books' });

export const useTotalBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['total_books'], totalBooks, {
    onError: (error: ErrorResponse) => error,
  });

const totalRequestedBooks = () =>
  request({ url: '/dashboard/total_requested_books' });

export const useTotalRequestedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['total_requested_books'], totalRequestedBooks, {
    onError: (error: ErrorResponse) => error,
  });

const myTotalRequestedBooks = () =>
  request({ url: '/dashboard/my_total_requested_books' });

export const useMyTotalRequestedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['my_total_requested_books'], myTotalRequestedBooks, {
    onError: (error: ErrorResponse) => error,
  });

const totalBorrowedBooks = () =>
  request({ url: '/dashboard/total_borrowed_books' });

export const useTotalBorrowedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['total_borrowed_books'], totalBorrowedBooks, {
    onError: (error: ErrorResponse) => error,
  });

const myTotalBorrowedBooks = () =>
  request({ url: '/dashboard/my_total_borrowed_books' });

export const useMyTotalBorrowedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['my_total_borrowed_books'], myTotalBorrowedBooks, {
    onError: (error: ErrorResponse) => error,
  });

const totalAuthors = () => request({ url: '/dashboard/total_authors' });

export const useTotalAuthors = (): UseQueryResult<ResponseType> =>
  useQuery(['total_authors'], totalAuthors, {
    onError: (error: ErrorResponse) => error,
  });

const totalCatoegories = () => request({ url: '/dashboard/total_catoegories' });

export const useTotalCatoegories = (): UseQueryResult<ResponseType> =>
  useQuery(['total_catoegories'], totalCatoegories, {
    onError: (error: ErrorResponse) => error,
  });

const totalStudents = () => request({ url: '/dashboard/total_students' });

export const useTotalStudents = (): UseQueryResult<ResponseType> =>
  useQuery(['total_students'], totalStudents, {
    onError: (error: ErrorResponse) => error,
  });

const totalLibrarians = () => request({ url: '/dashboard/total_librarians' });

export const useTotalLibrarians = (): UseQueryResult<ResponseType> =>
  useQuery(['total_librarians'], totalLibrarians, {
    onError: (error: ErrorResponse) => error,
  });

const totalUnreturnedBooks = () =>
  request({ url: '/dashboard/total_unreturned_books' });

export const useTotalUnreturnedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['total_unreturned_books'], totalUnreturnedBooks, {
    onError: (error: ErrorResponse) => error,
  });

const myTotalUnreturnedBooks = () =>
  request({ url: '/dashboard/my_total_unreturned_books' });

export const useMyTotalUnreturnedBooks = (): UseQueryResult<ResponseType> =>
  useQuery(['my_total_unreturned_books'], myTotalUnreturnedBooks, {
    onError: (error: ErrorResponse) => error,
  });
