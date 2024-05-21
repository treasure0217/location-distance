import Image from 'next/image';
import { Fragment } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
  Polyline,
} from '@react-google-maps/api';
import cx from 'classnames';
import { GOOGLE_MAPS_API_KEY } from '@/config/env';
import { usCenter } from '@/data/location';
import useAppSelector from '@/hooks/useAppSelector';

interface Props {
  className?: string;
}

const Map: React.FC<Props> = ({ className }) => {
  const { center, zoom, placesArray, selectedPlaceId } = useAppSelector(
    (state) => state.map,
  );

  const decodePolyline = (encoded: string) => {
    if (
      !window.google ||
      !window.google.maps ||
      !window.google.maps.geometry ||
      !window.google.maps.geometry.encoding
    ) {
      throw new Error(
        'Google Maps JavaScript API library with Geometry library is required.',
      );
    }

    const path = window.google.maps.geometry.encoding
      .decodePath(encoded)
      .map((point) => ({
        lat: point.lat(),
        lng: point.lng(),
      }));
    return path;
  };

  return (
    <div className={cx('h-full', className)}>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={['geometry']}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={zoom}
        >
          {center !== usCenter && (
            <OverlayView
              position={center}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className='flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-red-500'>
                <Icon icon='fa:home' className='text-sm' />
              </div>
            </OverlayView>
          )}
          {placesArray.map((places, i) => (
            <Fragment key={i}>
              {places &&
                places.places.length > 0 &&
                places.places.map((place) => (
                  <Fragment key={place.place_id}>
                    <Polyline
                      path={decodePolyline(place.route)}
                      options={{
                        strokeColor: place.strokeColor,
                        strokeOpacity: 100,
                        strokeWeight:
                          selectedPlaceId === ''
                            ? 2
                            : selectedPlaceId === place.place_id
                              ? 5
                              : 2,
                        zIndex:
                          selectedPlaceId === ''
                            ? 3
                            : selectedPlaceId === place.place_id
                              ? 5
                              : 3,
                      }}
                    />
                    <OverlayView
                      position={place.geometry.location}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div className='flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-2 border-white shadow-md'>
                        <Image
                          src={
                            place.photos?.[0]?.photo_reference
                              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${80}&photoreference=${place.photos?.[0]?.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
                              : '/images/image-placeholder.jpg'
                          }
                          alt={place.name}
                          width={80}
                          height={80}
                          className='h-full w-full rounded-full object-cover'
                        />
                      </div>
                    </OverlayView>
                  </Fragment>
                ))}
            </Fragment>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
