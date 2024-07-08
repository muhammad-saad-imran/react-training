// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiConfig } from "./config";

// Define our single API slice object
export const testApiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: apiConfig.testApi.baseUrl }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
    }),
    getTodoById: builder.query({
      query: (id) => `/todos/${id}`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetTodosQuery, useGetTodoByIdQuery } = testApiSlice;

export default testApiSlice;
