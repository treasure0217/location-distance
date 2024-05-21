import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import PlaceCard from './PlaceCard';

interface Props {
  className?: string;
  placeType: string;
  places: Record<string, any>[];
}

const Cards: React.FC<Props> = ({ className, placeType, places }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={cx('', className)}>
      <div
        className='flex cursor-pointer items-center gap-1'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon
          icon='mage:play-fill'
          className={cx(
            'transition-all duration-300 ease-in-out',
            isOpen ? 'rotate-90' : '',
          )}
        />
        <p className='select-none font-medium'>
          {placeType} ({places.length})
        </p>
      </div>
      <div
        className={cx(
          'grid overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'mt-2 grid-rows-[1fr]' : 'mt-0 grid-rows-[0fr]',
        )}
      >
        <div className={cx('min-h-0 space-y-2')}>
          {Array.isArray(places) &&
            places.map((place) => (
              <PlaceCard place={place} key={place.place_id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
