import { Suspense } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import Loader from './Loader';

interface DogData {
  status: string;
  message: string;
}

export default function Dog() {
  const [dog, setDog] = useState<DogData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random?w=400');
      const data = await res.json();
      setDog(data);
    } catch (err) {
      console.log('Error fetching data');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(dog);
  }, [dog]);

  return (
    <section className='flex flex-col justify-center items-center gap-4 mt-8'>
      {dog && (
        <div>
          <>
            {dog && dog?.message && (
              <div>
                <img
                  alt={dog.status}
                  src={dog.message}
                  className='border border-gray-800 rounded-lg w-[400px] h-[400px] object-cover'
                />
              </div>
            )}
          </>
        </div>
      )}
      <button
        className='flex-row justify-center text-white cursor-pointer ☐ hover:bg-slate-700
  focus: ring-4 focus: outline-none ☐ focus: ring-[#1da1f2]/50 font-medium
  rounded-lg px-5 py-2.5 text-center inline-flex items-center dark: focus:ring-
  [#1da1f2]/55 mr-2 mb-2 hover: shadow-lg transition-all duration-200
  ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-70 hover:opacity-100'
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get a dog'}
      </button>
    </section>
  );
}
