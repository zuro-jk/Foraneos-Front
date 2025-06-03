import { Skeleton } from '@/shared/ui/skeleton';

const LoadingRecipes = () => {
  return (
    <div className="container py-4 mx-auto">
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-96 w-full col-span-3" />
        <Skeleton className="h-96 w-full " />
      </div>
    </div>
  );
}

export default LoadingRecipes