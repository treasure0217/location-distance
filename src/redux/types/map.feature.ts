export interface IMapSlice {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  filter: {
    radius: number;
    placeTypes: string[];
  };
}
