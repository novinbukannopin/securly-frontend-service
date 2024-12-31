import { Text } from 'recharts';

export const InfoDataNotAvailable = () => {
  return (
    <Text x='50%' y='50%' textAnchor='middle' fill='gray' fontSize={16}>
      No Data Available
    </Text>
  );
};
