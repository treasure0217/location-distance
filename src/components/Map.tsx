import { Fragment } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  DirectionsRenderer,
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
  const { center, zoom, placesArray } = useAppSelector((state) => state.map);

  return (
    <div className={cx('h-full', className)}>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
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
          {/* {placesArray.map((places, i) => (
            <Fragment key={i}>
              {places &&
                places.places.length > 0 &&
                places.places.map((place) => (
                  <Polyline path={} />
                  // <DirectionsRenderer
                  //   directions={{
                  //     request: {
                  //       origin: center,
                  //       destination: place.geometry.location,
                  //       travelMode: google.maps.TravelMode.DRIVING,
                  //     },
                  //     routes: place.route.routes,
                  //   }}
                  //   key={place.place_id}
                  // />
                ))}
            </Fragment>
          ))} */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
