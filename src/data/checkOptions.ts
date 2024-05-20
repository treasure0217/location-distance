const checkOptions: {
  label: string;
  value: string;
  options?: { label: string; value: string }[];
}[] = [
  {
    label: 'Essentials',
    value: 'Essentials',
    options: [
      { label: 'Grocery Stores', value: 'grocery_stores' },
      { label: 'Pharmacy', value: 'pharmacy' },
      { label: 'Gas Station', value: 'gas_station' },
      { label: 'Convenience Store', value: 'convenience_store' },
      { label: 'Pet Store', value: 'pet_store' },
      { label: 'Hardware Store', value: 'hardware_store' },
      { label: 'Liquor Store', value: 'liquor_store' },
      { label: 'Barber/Salon', value: 'barber/salon' },
      { label: 'Banks', value: 'bank' },
      { label: 'Airport', value: 'airport' },
    ],
  },
  {
    label: 'Fitness',
    value: 'Fitness',
    options: [
      { label: 'Gym', value: 'gym' },
      { label: 'Yoga', value: 'yoga' },
      { label: 'Track', value: 'track' },
      { label: 'Pool', value: 'pool' },
      { label: 'Courts', value: 'courts' },
      { label: 'Field', value: 'field' },
      { label: 'Golf', value: 'golf' },
    ],
  },
  {
    label: 'Medical',
    value: 'Medical',
    options: [
      { label: 'Hospital', value: 'hospital' },
      { label: 'Emergency Room', value: 'emergency_room' },
      { label: 'Dentist', value: 'dentist' },
      { label: 'Veterinary', value: 'veterinary' },
    ],
  },
  {
    label: 'Restaurant',
    value: 'restaurant',
  },
  {
    label: 'Fast/Quick Food',
    value: 'fast/quick_food',
  },
  {
    label: 'Hotel',
    value: 'hotel',
  },
];

export default checkOptions;
