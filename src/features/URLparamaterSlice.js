import { createSlice } from '@reduxjs/toolkit';

export const URLparamater = createSlice({
  name: 'URLparamater',
  initialState: {
    urlParamsBlock : {
      query : '',
      catagory : '',
      style : '',
      vector : '',
      premium : ''
    }
  },
  reducers: {
    addParams: (state,action) => {
      state.urlParamsBlock.query = action.payload.query
      state.urlParamsBlock.catagory = action.payload.catagory
      state.urlParamsBlock.style = action.payload.style
    }
  },
});

export const { addParams} = URLparamater.actions;
export const selectUrlParamsBlock = state=> state.URLparamater.urlParamsBlock
export default URLparamater.reducer;
