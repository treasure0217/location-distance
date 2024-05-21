import { NextResponse } from 'next/server';
import {
  fetchDirections,
  fetchDriveTimes,
  fetchNearByPlaces,
} from '@/utils/fetchGoogleApi';
import { getPlaceType } from '@/utils/getPlaceType';

export async function POST(req: NextResponse) {
  const { address, radius, placeTypes } = await req.json();

  const placesArray = await Promise.all(
    placeTypes.map(async (placeType: string) => {
      try {
        const placesNearBy = await fetchNearByPlaces(
          address,
          radius * 1609.34,
          placeType,
        );

        const destinations = placesNearBy.map(
          (place) => place.geometry.location,
        );

        const driveTimes = await fetchDriveTimes([address], destinations);

        const placesWithDriveTimes = placesNearBy.map((place, index) => ({
          ...place,
          distance: driveTimes[index].distance / 1609.34,
          duration: driveTimes[index].duration,
        }));

        placesWithDriveTimes.sort((a, b) => a.duration! - b.duration!);

        let places = placesWithDriveTimes.slice(0, 3);

        for (let i = 0; i < places.length; i++) {
          places[i].route = await fetchDirections(
            address,
            places[i].geometry.location,
          );
        }

        return {
          placeType: getPlaceType(placeType),
          places,
        };
      } catch (err) {
        return { placeType: getPlaceType(placeType), places: [] };
      }
    }),
  );

  return NextResponse.json(placesArray);
}
