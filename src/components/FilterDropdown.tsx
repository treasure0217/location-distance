import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import checkOptions from '@/data/checkOptions';
import useClickOutside from '@/hooks/useClickOutside';
import Checkbox from './Forms/Checkbox';

interface Props {
  className?: string;
}

const FilterDropdown: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div className={cx('relative', className)} ref={ref}>
      <button
        className='flex h-10 items-center gap-2 rounded-full border border-gray-500 px-3'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon icon='lets-icons:filter-big' className='text-xl' />
        <p>Filter</p>
      </button>
      <div
        className={cx(
          'absolute -bottom-2 right-0 w-[640px] translate-y-full rounded bg-white shadow-[0px_0px_2px_#0008] transition-all duration-300 ease-in-out',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        <div className='flex items-center gap-4 py-4 pl-6 pr-2'>
          <Slider
            defaultValue={10}
            min={0}
            max={20}
            step={1}
            marks={{ 0: 0, 5: 5, 10: 10, 15: 15, 20: 20 }}
          />
          <p className='whitespace-nowrap'>Max Radius (miles)</p>
        </div>
        <div className='px-4 py-4'>
          <div className='space-y-4'>
            {checkOptions.map((checkOption, i) => (
              <div className='space-y-2' key={i}>
                <Checkbox
                  className='underline'
                  label={checkOption.label}
                  value={checkOption.label}
                />
                {checkOption.options && (
                  <div className='flex flex-wrap gap-x-4 gap-y-1 pl-4'>
                    {checkOption.options.map((option, j) => (
                      <Checkbox
                        label={option.label}
                        value={option.value}
                        key={`${i}-${j}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
