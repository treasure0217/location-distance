'use client';

import AddressInput from '@/components/AddressInput';
import FilterDropdown from '@/components/FilterDropdown';
import InterestedPlaces from '@/components/InterestedPlaces';
import Map from '@/components/Map';

export default function Home() {
  return (
    <div>
      <div className='fixed left-0 top-0 z-[30] h-screen w-10 bg-black'>
        <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-xl text-white'>
          Website Name
        </p>
      </div>
      <div className='fixed left-10 top-0 z-[20] h-screen w-[360px] border-r border-gray-200 bg-white'>
        <InterestedPlaces className='h-full w-full' />
      </div>
      <div className='fixed left-10 top-0 z-[10] flex h-[72px] w-full border-b border-gray-200 pl-[360px]'>
        <div className='flex h-full w-full items-center gap-4 px-4'>
          <AddressInput className='w-full max-w-3xl' />
          <FilterDropdown />
        </div>
      </div>
      <div className='fixed left-0 top-0 h-screen w-full pl-[400px] pt-[72px]'>
        <Map />
      </div>
    </div>
  );
}
