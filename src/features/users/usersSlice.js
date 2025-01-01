import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        return userAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "USER", id: "LIST" },
        ...result.ids.map((id) => ({
          type: "User",
          id,
        })),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;
