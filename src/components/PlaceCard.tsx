import Image from 'next/image';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import { GOOGLE_MAPS_API_KEY } from '@/config/env';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { setSelectedPlaceId } from '@/redux/slices/map.slice';

interface Props {
  className?: string;
  place: Record<string, any>;
}

const PlaceCard: React.FC<Props> = ({ className, place }) => {
  const dispatch = useAppDispatch();
  const placeId = useAppSelector((state) => state.map.selectedPlaceId);

  const handleSelectCard = () => {
    dispatch(
      setSelectedPlaceId(placeId === place.place_id ? '' : place.place_id),
    );
  };

  return (
    <div
      className={cx(
        'group cursor-pointer overflow-hidden rounded border shadow-sm transition-all ease-in-out hover:border-gray-500',
        className,
        placeId === place.place_id
          ? 'border-gray-500 bg-gray-500/10'
          : 'border-gray-500/20',
      )}
      onClick={handleSelectCard}
    >
      <LazyLoadImage
        src={
          place.photos?.[0]?.photo_reference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${400}&photoreference=${place.photos?.[0]?.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
            : '/images/image-placeholder.jpg'
        }
        alt={place.name}
        wrapperClassName='!h-40 !w-full flex-shrink-0 !block overflow-hidden'
        className='!h-full !w-full !object-cover'
        delayMethod='debounce'
        effect='blur'
      />
      <div className='space-y-2 p-2'>
        <h4 className='text-base font-medium leading-tight'>{place.name}</h4>
        <div className='flex gap-2'>
          <div className='flex items-center gap-1'>
            <Icon icon='mdi:map-marker-distance' />
            <p className='text-sm font-medium italic text-gray-800'>
              {place.distance.toFixed(3)} miles
            </p>
          </div>
          <div className='flex items-center gap-1'>
            <Icon icon='mdi:car-outline' />
            <p className='text-sm font-medium italic text-gray-800'>
              {Math.ceil(place.duration / 60)}m {place.duration % 60}s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
