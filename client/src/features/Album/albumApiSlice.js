import { apiSlice } from "../../app/apiSlice";

const albumApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
            const liked = draft.likes?.includes(userId);
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
  }),
});

export const {
  useGetAllAlbumsQuery,
  useGetAlbumDetailsQuery,
  useLikeAlbumMutation,
} = albumApiSlice;
