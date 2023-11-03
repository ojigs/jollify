import { apiSlice } from "../../app/apiSlice";

const playlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaylists: builder.query({
      query: (limit) => `/api/playlists?limit=${limit}`,
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
        "User",
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
              const liked = draft.likes?.includes(userId);
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
  useGetAllPlaylistsQuery,
  useGetPlaylistDetailsQuery,
  useCreatePlaylistMutation,
  useAddSongToPlaylistMutation,
  useLikePlaylistMutation,
} = playlistApiSlice;
