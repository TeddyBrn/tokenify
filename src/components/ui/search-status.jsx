'use client';
import Image from 'next/image';

export function SearchStatus() {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <Image
        src="/not-found.png"
        alt="spotify"
        width={300}
        height={300}
        className="w-[180px] md:w-[250px] lg:w-[300px] h-auto"
				priority={true}
      />
      <p className='text-[#BABABA] text-2xl md:text-4xl lg:text-6xl mt-8 md:mt-16 lg:mt-20 text-center'>
        No Results Found
      </p>
      <p className='text-[#BABABA] text-lg md:text-xl lg:text-2xl mt-6 md:mt-8 lg:mt-10 text-center'>
        Sorry, there are no results for this search.
      </p>
      <p className='text-[#BABABA] text-lg md:text-xl lg:text-2xl mt-3 md:mt-4 lg:mt-5 text-center'>
        Please try another artist name.
      </p>
    </div>
  );
}
