import {combineReducers, configureStore} from '@reduxjs/toolkit'
import imageSlice from './Slices/imageSlice'
import POSTSLICE from './Slices/postSlice'



const reducers = combineReducers({
    imgSlice : imageSlice,
    posts: POSTSLICE
})

const store = configureStore({
    reducer: reducers})

export default store