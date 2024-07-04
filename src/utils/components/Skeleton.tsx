import { Skeleton, Stack } from '@mui/material';

const SkeletonForCalc = () => {
  return (
    <Stack direction="row">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            animation="wave"
            width={85}
            height={36}
            style={{ marginTop: '10px', marginLeft: '10px' }}
          />
        ))}
    </Stack>
  );
};

export default SkeletonForCalc;
