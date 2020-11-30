import { createSlice } from '@reduxjs/toolkit';

export const iconSlice = createSlice({
  name: 'icons',
  initialState: {
    allIconBlock: {
      allIcons : [],
      loading : null
    }
  },
  reducers: {
    addAllIcon: (state,action) => {
     state.allIconBlock.loading = action.payload.loading
     if(action.payload.loading){
       state.allIconBlock.allIcons = []
       return
     }
     state.allIconBlock.allIcons = action.payload.dataIcons
    },
  },
});

export const { addAllIcon } = iconSlice.actions;
export const selectAllIconBlock = state => state.icons.allIconBlock;
export default iconSlice.reducer;
