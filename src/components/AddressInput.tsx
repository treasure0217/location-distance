import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
  useTransition,
} from 'react';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';
import debounce from 'lodash.debounce';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setCenter, setZoom } from '@/redux/slices/map.slice';

interface Props {
  className?: string;
}

const AddressInput: React.FC<Props> = ({ className }) => {
  const [address, setAddress] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Record<string, any>[]>([]);
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();

  const fetchSuggestions = debounce(async (input: string) => {
    if (input.trim() === '') {
      setSuggestions([]);
      return;
    }

    const response = await fetch(`/api/address-autocomplete?input=${input}`);
    const suggestions = await response.json();

    setSuggestions(suggestions);
  }, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSelectAddress = (address: string) => {
    setAddress(address);
    setSuggestions([]);
    onSubmit(address);
  };

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    setSuggestions([]);
    onSubmit(address);
  };

  const onSubmit = (address: string) => {
    startTransition(async () => {
      const response = await fetch(`/api/address-info?address=${address}`);
      const placeInfo = JSON.parse(await response.text());

      console.log(placeInfo);

      if (!placeInfo.geometry?.location) {
        toast.error(
          'Invalid address, please choose the address from the dropdown',
        );
        return;
      }

      dispatch(setCenter(placeInfo.geometry.location));
      dispatch(setZoom(16));
    });
  };

  return (
    <form className={cx('relative', className)} onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter Address'
        className='h-10 w-full rounded-full border border-gray-500 py-2 pl-4 pr-14'
        value={address}
        onChange={handleChange}
      />
      <button
        type='submit'
        className='absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-green-700'
      >
        <Icon icon='mingcute:search-2-fill' className='text-xl text-white' />
      </button>
      {suggestions.length > 0 && (
        <ul className='absolute -bottom-2 w-full translate-y-full rounded bg-white py-1 shadow-[0px_0px_2px_#0008]'>
          {suggestions.map((suggestion) => (
            <li
              className='cursor-pointer px-4 py-2 hover:bg-gray-500/50'
              key={suggestion.place_id}
              onClick={() => handleSelectAddress(suggestion.description)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default AddressInput;
