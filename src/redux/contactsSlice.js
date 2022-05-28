import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token

     if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
  }),
  tagTypes: ['Contact'],
  endpoints: build => ({
    getContactsByName: build.query({
      query: name => `/contacts/?name=${name}`,
    }),
    getAllContacts: build.query({
      query: () => '/contacts',
      providesTags: ['Contact'],
      keepUnusedDataFor: 5,
    }),
    deleteContact: build.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    createContact: build.mutation({
      query: newContact => ({
      url: '/contacts',
      method: 'POST',
      body: newContact,
    }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: build.mutation({
      query: data => {
        const { id, ...body } = data;
        return {
          url: `/contacts/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsByNameQuery,
  useGetAllContactsQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
  useUpdateContactMutation,
} = contactsApi;
