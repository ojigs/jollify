import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { logoutUser } from "../features/Auth/authSlice";

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
  tagTypes: ["User", "Playlist", "Song"],
  endpoints: (builder) => ({
    // users feature
    getUserDetails: builder.query({
      query: (userId) => `/api/users/${userId}`,
    }),
    getCurrentUser: builder.query({
      query: () => `/api/users/currentUser`,
      providesTags: ["User"],
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
      query: ({ page, limit }) => `/api/songs?page=${page}&limit=${limit}`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `/api/songs/${songId}`,
      providesTags: (result, error, id) => [{ type: "Song", id }],
    }),
    getAnySong: builder.query({
      query: () => "/api/songs/any",
    }),
    getTopSongs: builder.query({
      query: (limit) => `/api/songs/top?limit=${limit}`,
    }),
    likeSong: builder.mutation({
      query: ({ songId }) => ({
        url: `/api/songs/${songId}/like`,
        method: "POST",
      }),
      async onQueryStarted({ songId, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getSongDetails", songId, (draft) => {
            const liked = draft.likes.includes(userId);
            if (!liked) {
              draft.likes = [...draft.likes, userId];
            } else {
              draft.likes = draft.likes.filter((e) => !(e === userId));
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["User"],
    }),
    addComment: builder.mutation({
      query: ({ songId, body }) => ({
        url: `/api/songs/${songId}/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Song", id: arg.songId },
      ],
    }),
    // playlists feature
    getAllPlaylists: builder.query({
      query: (limit) => `/api/playlists?limit=${limit}`,
      // providesTags: ["Playlist"],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Playlist", id: _id })),
              { type: "Playlist", id: "LIST" },
            ]
          : [{ type: "Playlist", id: "LIST" }],
    }),
    getPlaylistDetails: builder.query({
      query: (playlistId) => `/api/playlists/${playlistId}`,
      providesTags: (result, error, id) => [{ type: "Playlist", id }],
    }),
    createPlaylist: builder.mutation({
      query: (body) => ({
        url: "/api/playlists",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", { type: "Playlist", id: "LIST" }],
    }),
    addSongToPlaylist: builder.mutation({
      query: ({ playlistId, songId }) => ({
        url: `/api/playlists/${playlistId}/songs/${songId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Playlist", id: arg.playlistId },
      ],
    }),
    likePlaylist: builder.mutation({
      query: ({ playlistId }) => ({
        url: `/api/playlists/${playlistId}/like`,
        method: "POST",
      }),
      async onQueryStarted(
        { playlistId, userId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getPlaylistDetails",
            playlistId,
            (draft) => {
              const liked = draft.likes.includes(userId);
              if (!liked) {
                draft.likes = [...draft.likes, userId];
              } else {
                draft.likes = draft.likes.filter((e) => !(e === userId));
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["User"],
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
      async onQueryStarted({ albumId, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getAlbumDetails", albumId, (draft) => {
            const liked = draft.likes.includes(userId);
            if (!liked) {
              draft.likes = [...draft.likes, userId];
            } else {
              draft.likes = draft.likes.filter((e) => !(e === userId));
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["User"],
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
      async onQueryStarted(
        { artisteId, userId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getArtisteDetails",
            artisteId,
            (draft) => {
              const liked = draft.likes.includes(userId);
              if (!liked) {
                draft.likes = [...draft.likes, userId];
              } else {
                draft.likes = draft.likes.filter((e) => !(e === userId));
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["User"],
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
  //playlists feature
  useGetAllPlaylistsQuery,
  useGetPlaylistDetailsQuery,
  useCreatePlaylistMutation,
  useAddSongToPlaylistMutation,
  useLikePlaylistMutation,
  //albums feature
  useGetAllAlbumsQuery,
  useGetAlbumDetailsQuery,
  useLikeAlbumMutation,
  //artistes feature
  useGetAllArtistesQuery,
  useGetArtisteDetailsQuery,
  useLikeArtisteMutation,
} = apiSlice;
