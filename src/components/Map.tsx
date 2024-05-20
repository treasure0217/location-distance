import { Icon } from '@iconify/react/dist/iconify.js';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import cx from 'classnames';
import { GOOGLE_MAPS_API_KEY } from '@/config/env';
import { usCenter } from '@/data/location';
import useAppSelector from '@/hooks/useAppSelector';

interface Props {
  className?: string;
}

const Map: React.FC<Props> = ({ className }) => {
  const { center, zoom } = useAppSelector((state) => state.map);

  return (
    <div className='h-full'>
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
              <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-500'>
                <Icon icon='fa:home' className='text-sm' />
              </div>
            </OverlayView>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
