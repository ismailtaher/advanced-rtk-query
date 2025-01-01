import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
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
    getUserById: builder.query({
      query: (id) => `/users/?id=${id}`,
      transformResponse: (responseData) => {
        return userAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        console.log(result);
        return [...result.ids.map((id) => ({ type: "User", id }))];
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = extendedApiSlice;

// return the query result object
export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

// create memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data //normalized state object with ids & entities
);

// getSelector to create some selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
