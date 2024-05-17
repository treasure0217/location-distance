import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';

interface Props {
  className?: string;
}

const AddressInput: React.FC<Props> = ({ className }) => {
  return (
    <div className={cx('relative', className)}>
      <input
        type='text'
        placeholder='Enter Address'
        className='h-10 w-full rounded-full border border-gray-500 py-2 pl-4 pr-14'
      />
      <button className='absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-green-700'>
        <Icon icon='mingcute:search-2-fill' className='text-xl text-white' />
      </button>
    </div>
  );
};

export default AddressInput;
