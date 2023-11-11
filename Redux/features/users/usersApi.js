import { apiSlice } from "../api/apiSlice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
      }),
      providesTags: ["users"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: ["users"],
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    getUserCount: builder.query({
      query: () => ({
        url: `users/get/count`,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useGetUserCountQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} = usersApi;
