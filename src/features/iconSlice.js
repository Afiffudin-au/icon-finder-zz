import { createSlice } from '@reduxjs/toolkit';

export const iconSlice = createSlice({
  name: 'icons',
  initialState: {
    allIconBlock: {
      allIcons : [],
      loading : null
    },
    allIconCatagoryBlock : {
      allIcons : [],
      loading : null
    },
    allIconStyleBlock : {
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
    addIconCatagory : (state,action)=>{
      state.allIconCatagoryBlock.loading = action.payload.loading
      if(action.payload.loading){
        state.allIconCatagoryBlock.allIcons = []
        return
      }
      state.allIconCatagoryBlock.allIcons = action.payload.dataIconCatagory
    },
    addIconStyle : (state,action)=>{
      state.allIconStyleBlock.loading = action.payload.loading
      if(action.payload.loading){
        state.allIconStyleBlock.allIcons = []
        return
      }
      state.allIconStyleBlock.allIcons = action.payload.dataIconStyle
    }
  },
});

export const { addAllIcon,addIconCatagory,addIconStyle} = iconSlice.actions;
export const selectAllIconBlock = state => state.icons.allIconBlock;
export const selectAllIconCatagoryBlock = state=> state.icons.allIconCatagoryBlock
export const selectAllIconStyleBlock = state => state.icons.allIconStyleBlock
export default iconSlice.reducer;
