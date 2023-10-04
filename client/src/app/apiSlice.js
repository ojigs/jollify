import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { logoutUser } from "../features/Users/slice/userSlice";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
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
    }
  } else {
    await mutex.waitForUnlock();
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // users feature
    getUserDetails: builder.query({
      query: (userId) => `/api/users/${userId}`,
    }),
    editUserDetails: builder.mutation({
      query: (data) => ({
        url: "/api/users/",
        method: "PATCH",
        body: data,
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/users/upload",
        method: "POST",
        body: data,
      }),
    }),
    // songs feature
    getAllSongs: builder.query({
      query: () => "/api/songs",
    }),
    getSongDetails: builder.query({
      query: (songId) => `/api/songs/${songId}`,
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
      query: () => "/api/playlists",
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
    }),
    addSongToPlaylist: builder.mutation({
      query: ({ playlistId, songId }) => ({
        url: `/api/playlists/${playlistId}/songs/${songId}`,
        method: "POST",
      }),
    }),
    //albums feature
    getAllAlbums: builder.query({
      query: () => "/api/albums",
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
      query: () => "/api/artistes",
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
  useEditUserDetailsMutation,
  useUploadImageMutation,
  //songs feature
  useGetAllSongsQuery,
  useGetSongDetailsQuery,
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
