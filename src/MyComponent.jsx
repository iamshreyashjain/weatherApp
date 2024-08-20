import  { useState, useEffect } from 'react';
import SkeletonLoader from './SkeletonLoader'; 
import imgOn from './assets/CRMLoginPage.png';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      // Simulate a fetch call
      setData({
        title: 'Loaded Data',
        description: 'This is the description of the loaded data.',
        img: imgOn
      });
    }, 500);
  }, []);

  return (
    <div className="max-w-lg w-full mx-auto p-4">
      {data ? (
        <div className="flex flex-col items-center">
          <img src={data.img} alt="Loaded Image" className="w-[500px] h-[300px] object-cover rounded-md" />
          <h1 className="text-xl font-bold mt-4 text-center">{data.title}</h1>
          <p className="mt-2 text-center">{data.description}</p>
        </div>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
};

export default MyComponent;
