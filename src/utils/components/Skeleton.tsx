import { Skeleton, Stack, SxProps, Theme } from '@mui/material';

type TDimensionsProps = {
  width?: number | string;
  height?: number | string;
  direction?: 'row' | 'column';
};

type TSkeletonProps = {
  count?: number;
  dimensions?: TDimensionsProps;
  styles?: SxProps<Theme>;
  variant?: 'rectangular' | 'rounded' | 'text' | 'circular';
};

const SkeletonGroup = ({ dimensions = {}, count = 3, styles = {}, variant = 'rectangular' }: TSkeletonProps) => {
  const { width, height, direction = 'row' } = dimensions;

  return (
    <Stack direction={direction}>
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          animation="wave"
          width={width}
          height={height}
          sx={styles}
          data-testid={`skeletonExpenses-${index}`}
        />
      ))}
    </Stack>
  );
};

export default SkeletonGroup;
