import { Stack, Skeleton } from 'src/shared/ui-kit';

type TDimensionsProps = {
  width?: number | string;
  height?: number | string;
  direction?: 'row' | 'column';
};

type TSkeletonProps = {
  count?: number;
  dimensions?: TDimensionsProps;
  styles?: React.CSSProperties;
  variant?: 'text' | 'rectangular' | 'circular';
};

const SkeletonGroup = ({ dimensions = {}, count = 3, styles = {}, variant = 'rectangular' }: TSkeletonProps) => {
  const { width, height, direction = 'row' } = dimensions;

  return (
    <Stack direction={direction}>
      {[...Array(count)].map((_, index) => (
        <Skeleton key={index} variant={variant} width={width} height={height} style={styles} />
      ))}
    </Stack>
  );
};

export default SkeletonGroup;
