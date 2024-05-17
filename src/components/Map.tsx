import { GoogleMap, LoadScript } from '@react-google-maps/api';
import cx from 'classnames';
import { GOOGLE_MAPS_API_KEY } from '@/config/env';

interface Props {
  className?: string;
}

const Map: React.FC<Props> = ({ className }) => {
  return (
    <div className='h-full'>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: 39.8283, lng: -98.5795 }}
          zoom={4}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
