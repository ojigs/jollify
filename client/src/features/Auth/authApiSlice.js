import { apiSlice } from "../../app/apiSlice";
import { updateTheme } from "../../app/themeSlice";
import { setUser, logoutUser } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateTheme("rock"));
          dispatch(setUser(data.username));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateTheme("rock"));
          dispatch(setUser(data.username));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    loginSuccess: builder.query({
      query: () => "/auth/loginSuccess",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateTheme("rock"));
          dispatch(setUser(data.username));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutUser());
          dispatch(updateTheme("pop"));
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoginSuccessQuery,
} = authApiSlice;
