import { apiSlice } from "./api/apiSlice";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `/categories`,
      }),
      providesTags: ["products"],
    }),
    // getSingleProduct: builder.query({
    //   query: (id) => ({
    //     url: `/products/${id}`,
    //   }),
    //   providesTags: ["products"],
    // }),
    // addProduct: builder.mutation({
    //   query: ({ data, id }) => ({
    //     url: `/products/${id}`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["products"],
    // }),
    // updateProduct: builder.mutation({
    //   query: ({ data, id }) => ({
    //     url: `/products/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["products"],
    // }),
    // deleteProduct: builder.mutation({
    //   query: (id) => ({
    //     url: `/products/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["products"],
    // }),
    // getProductsCount: builder.query({
    //   query: () => ({
    //     url: `products/get/count`,
    //   }),
    // }),
    // getFeaturedProducts: builder.query({
    //   query: () => ({
    //     url: `products/get/featured`,
    //   }),
    // }),

    // // ------upload gallery image
    // uploadProductGallery: builder.mutation({
    //   query: ({ data, id }) => ({
    //     url: `/products/gallery-images/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["products"],
    // }),
  }),
});

export const { useGetCategoriesQuery } = productsApi;
