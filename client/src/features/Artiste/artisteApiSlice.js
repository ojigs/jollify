import { apiSlice } from "../../app/apiSlice";

const artisteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
              const liked = draft.artiste.likes?.includes(userId);
              if (!liked) {
                draft.artiste.likes = [...draft.artiste.likes, userId];
              } else {
                draft.artiste.likes = draft.artiste.likes.filter(
                  (e) => !(e === userId)
                );
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
  useGetAllArtistesQuery,
  useGetArtisteDetailsQuery,
  useLikeArtisteMutation,
} = artisteApiSlice;
