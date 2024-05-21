import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import useFetchPlaces from '@/hooks/useFetchPlaces';
import { setPlacesArray } from '@/redux/slices/map.slice';
import Cards from './Cards';

interface Props {
  className?: string;
}

const InterestedPlaces: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { center, filter } = useAppSelector((state) => state.map);
  const [isFetching, placesArray] = useFetchPlaces(center, filter);

  useEffect(() => {
    dispatch(setPlacesArray(placesArray));
    console.log(placesArray);
  }, [placesArray, dispatch]);

  return (
    <div className={cx('overflow-auto', className)}>
      <div className='flex items-center gap-2 px-3 py-4'>
        <Icon icon='mdi:place-outline' className='text-2xl' />
        <h1 className='text-center text-xl font-medium leading-loose'>
          Place of Interests
        </h1>
      </div>
      <div className='space-y-4 px-4'>
        {isFetching ? (
          <Skeleton className='h-8' count={10} />
        ) : (
          Array.isArray(placesArray) &&
          placesArray.map((places, i) => (
            <div key={i}>
              <Cards placeType={places.placeType} places={places.places} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InterestedPlaces;
