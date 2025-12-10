import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: null,
    posts: [],
    post: {},

    addSuccess: false,
    updateSuccess: false,
    delSuccess: false
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
            state.error = null
        },
        setPosts: (state, { payload }) => {
            state.posts = payload
            state.loading = false
        },
        setPost: (state, { payload }) => {
            state.post = payload
            state.loading = false
        },
        addPost: (state, { payload }) => {
            state.posts.push(payload)
            state.loading = false
            state.addSuccess = true
        },
        delPost: (state, { payload }) => {
            state.posts = state.posts.filter(p => p._id !== payload)
            state.loading = false
            state.delSuccess = true
        },
        updatePost: (state, { payload }) => {
            const index = state.posts.findIndex(p => p._id === payload._id)
            if(index !== -1){
                state.posts[index] = payload
            }
            state.loading = false
            state.updateSuccess = true
        },
        setError: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        resetSuccess: (state) => {
            state.addSuccess = false
            state.delSuccess = false
            state.updateSuccess = false
        }
    }
})

export const {
    setLoading,
    setPosts,
    setPost,
    addPost,
    delPost,
    updatePost,
    setError,
    resetSuccess
} = postSlice.actions

const POSTSLICE = postSlice.reducer
export default POSTSLICE
