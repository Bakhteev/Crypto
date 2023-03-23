import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getEnv } from '@/shared/utils';

const URL = getEnv('VITE_API_BASE_URL');
const API_KEY = getEnv('VITE_API_API_KEY');
console.log(API_KEY);
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
        prepareHeaders: (headers, api) => {
          headers.set('x-changenow-api-key', API_KEY);
          return headers;
        }
      }
    ),
    endpoints: (build) => ({})
  }
);

