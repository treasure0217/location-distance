import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';

interface Props {
  className?: string;
  label?: string;
  value?: string;
  checked?: boolean;
  onCheck?: React.Dispatch<string | number | boolean>;
}

const Checkbox: React.FC<Props> = ({
  className,
  label,
  value,
  checked = false,
  onCheck = () => null,
}) => {
  return (
    <div
      className={cx(
        'flex w-fit cursor-pointer items-center gap-1.5',
        className,
      )}
      onClick={() => onCheck(value as string)}
    >
      <div className='flex h-5 w-5 items-center justify-center border border-gray-600'>
        {checked && <Icon icon='mdi:check-bold' />}
      </div>
      <p className='pt-px'>{label}</p>
    </div>
  );
};

export default Checkbox;
