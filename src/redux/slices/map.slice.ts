import { createSlice } from '@reduxjs/toolkit';
import { usCenter } from '@/data/location';
import { IMapSlice } from '../types/map.feature';

const initialState: IMapSlice = {
  center: usCenter,
  zoom: 4,
  filter: {
    radius: 10,
    placeTypes: [],
  },
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter(state, action) {
      state.center = action.payload;
      return state;
    },
    setZoom(state, action) {
      state.zoom = action.payload;
      return state;
    },
    setFilter(state, action) {
      state.filter = action.payload;
      return state;
    },
  },
});

export const { setCenter, setZoom, setFilter } = mapSlice.actions;

export default mapSlice.reducer;
