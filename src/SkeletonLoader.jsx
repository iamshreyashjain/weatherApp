const SkeletonLoader = () => {
    return (
      <div className="border border-blue-900 shadow rounded-md p-4 max-w-md w-full mx-auto">
        <div className="animate-pulse">
          {/* Skeleton for Image */}
          <div className="bg-slate-200 w-[400px] h-[300px] rounded-md mx-auto"></div>
  
          {/* Skeleton for Title */}
          <div className="h-8 bg-slate-200 rounded mt-4 w-3/4 mx-auto"></div>
  
          {/* Skeleton for Description */}
          <div className="space-y-2 mt-4">
            <div className="h-6 bg-slate-200 rounded w-full"></div>

          </div>
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  