import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { setUser, logoutUser } from "../features/Users/userSlice";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.originalStatus === 401)
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          "/auth/refresh",
          api,
          extraOptions
        );
        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logoutUser());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Playlist"],
  endpoints: (builder) => ({
    // users feature
    getUserDetails: builder.query({
      query: (userId) => `/api/users/${userId}`,
    }),
    getCurrentUser: builder.query({
      query: (userId) => `/api/users/currentUser/${userId}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("did you provide");
          dispatch(setUser(data.user));
        } catch (err) {
          console.log(err);
        }
      },
      providesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
    editUserDetails: builder.mutation({
      query: (data) => ({
        url: "/api/users/edit",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/api/users/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    // songs feature
    getAllSongs: builder.query({
      query: (limit) => `/api/songs?limit=${limit}`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `/api/songs/${songId}`,
    }),
    getAnySong: builder.query({
      query: () => "/api/songs/any",
    }),
    getTopSongs: builder.query({
      query: (limit) => `/api/songs/top?limit=${limit}`,
    }),
    likeSong: builder.mutation({
      query: (songId) => ({
        url: `/api/songs/${songId}/like`,
        method: "POST",
      }),
    }),
    //comments route
    addComment: builder.mutation({
      query: ({ songId, ...body }) => ({
        url: `/api/comments/${songId}`,
        method: "POST",
        body,
      }),
    }),
    getSongComments: builder.query({
      query: (songId) => `/api/comments/${songId}`,
    }),
    // playlists feature
    getAllPlaylists: builder.query({
      query: (limit) => `/api/playlists?limit=${limit}`,
    }),
    getPlaylistDetails: builder.query({
      query: (playlistId) => `/api/playlists/${playlistId}`,
    }),
    createPlaylist: builder.mutation({
      query: (body) => ({
        url: "/api/playlists",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    addSongToPlaylist: builder.mutation({
      query: ({ playlistId, songId }) => ({
        url: `/api/playlists/${playlistId}/songs/${songId}`,
        method: "POST",
      }),
    }),
    //albums feature
    getAllAlbums: builder.query({
      query: (limit) => `/api/albums?limit=${limit}`,
    }),
    getAlbumDetails: builder.query({
      query: (albumId) => `/api/albums/${albumId}`,
    }),
    likeAlbum: builder.mutation({
      query: ({ albumId }) => ({
        url: `/api/albums/${albumId}/like`,
        method: "POST",
      }),
    }),
    //artistes feature
    getAllArtistes: builder.query({
      query: (limit) => `/api/artistes?limit=${limit}`,
    }),
    getArtisteDetails: builder.query({
      query: (artisteId) => `/api/artistes/${artisteId}`,
    }),
    likeArtiste: builder.mutation({
      query: ({ artisteId }) => ({
        url: `/api/artistes/${artisteId}/like`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  //users feature
  useGetUserDetailsQuery,
  useGetCurrentUserQuery,
  useEditUserDetailsMutation,
  useUploadImageMutation,
  //songs feature
  useGetAllSongsQuery,
  useGetSongDetailsQuery,
  useGetAnySongQuery,
  useGetTopSongsQuery,
  useLikeSongMutation,
  //comments route
  useAddCommentMutation,
  useGetSongCommentsQuery,
  //playlists feature
  useGetAllPlaylistsQuery,
  useGetPlaylistDetailsQuery,
  useCreatePlaylistMutation,
  useAddSongToPlaylistMutation,
  //albums feature
  useGetAllAlbumsQuery,
  useGetAlbumDetailsQuery,
  useLikeAlbumMutation,
  //artistes feature
  useGetAllArtistesQuery,
  useGetArtisteDetailsQuery,
  useLikeArtisteMutation,
} = apiSlice;
