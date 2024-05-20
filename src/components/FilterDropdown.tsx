import { useCallback, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import checkOptions from '@/data/checkOptions';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import useClickOutside from '@/hooks/useClickOutside';
import { setFilter } from '@/redux/slices/map.slice';
import Checkbox from './Forms/Checkbox';

interface Props {
  className?: string;
}

const FilterDropdown: React.FC<Props> = ({ className }) => {
  const defaultFilter = useAppSelector((state) => state.map.filter);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(defaultFilter.radius);
  const [placeTypes, setPlaceTypes] = useState<string[]>(
    defaultFilter.placeTypes,
  );
  const ref = useClickOutside(() => setIsOpen(false));

  const handleChangeRadius = (value: number | number[]) => {
    setRadius(value as number);
  };

  const handleCheckOption = (
    value: string,
    hasChildren: boolean,
    index?: number,
  ) => {
    const prev = [...placeTypes];

    if (!hasChildren) {
      setPlaceTypes(
        prev.includes(value)
          ? prev.filter((option) => option !== value)
          : [...prev, value],
      );
    } else if (
      index !== undefined &&
      checkOptions[index] &&
      checkOptions[index].options
    ) {
      setPlaceTypes(
        checkOptions[index].options.reduce(
          (acc, cur) => acc + (prev.includes(cur.value) ? 1 : 0),
          0,
        ) === 0
          ? [
              ...prev,
              ...checkOptions[index].options.map((option) => option.value),
            ]
          : prev.filter((option) => {
              if (checkOptions[index]?.options) {
                for (const _option of checkOptions[index]?.options) {
                  if (option === _option.value) {
                    return false;
                  }
                }
              }
              return true;
            }),
      );
    }
  };

  const handleCheckChecked = (index: number) => {
    if (checkOptions[index].options) {
      for (const option of checkOptions[index].options) {
        if (placeTypes.includes(option.value)) {
          return true;
        }
      }
      return false;
    } else {
      return placeTypes.includes(checkOptions[index].value) ? true : false;
    }
  };

  const handleApplyFilter = useCallback(() => {
    dispatch(setFilter({ radius, placeTypes }));
  }, [dispatch, placeTypes, radius]);

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
            defaultValue={radius}
            min={0.1}
            max={20}
            step={0.1}
            marks={{ 0.1: 0.1, 5: 5, 10: 10, 15: 15, 20: 20 }}
            onChange={handleChangeRadius}
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
                  checked={handleCheckChecked(i)}
                  onCheck={() =>
                    handleCheckOption(
                      checkOption.value,
                      checkOption.options?.length ? true : false,
                      i,
                    )
                  }
                />
                {checkOption.options && (
                  <div className='flex flex-wrap gap-x-4 gap-y-1 pl-4'>
                    {checkOption.options.map((option, j) => (
                      <Checkbox
                        label={option.label}
                        key={`${i}-${j}`}
                        value={option.value}
                        checked={placeTypes.includes(option.value)}
                        onCheck={() => handleCheckOption(option.value, false)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className='ml-auto block rounded border border-gray-500/50 px-4 py-1 font-medium'
            onClick={handleApplyFilter}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
