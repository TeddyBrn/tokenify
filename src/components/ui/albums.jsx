import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation
} from './carousel';

export function Albums({ albums }) {
  const getYear = (date) => {
    return date.split('-')[0];
  };

  return (
    <div className="w-full bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-12">
      <h2 className="text-3xl font-bold text-[#39D66E] mb-6">Albums</h2>
      <div className="relative">
        <Carousel disableDrag={false}>
          <CarouselContent className="-ml-4">
            {albums.map((album, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                <div className="flex flex-col group">
                  <Link
                    href={album.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={album.image}
                      alt={album.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                  <Link
                    href={album.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 font-medium text-white group-hover:text-[#39D66E] transition-colors line-clamp-2">
                    {album.name}
                  </Link>
                  <p className="text-sm text-[#BABABA]">
                    {getYear(album.date)} - Album
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation
            className="absolute -bottom-20 left-auto top-auto w-full justify-end gap-2"
            classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
            alwaysShow
          />
        </Carousel>
      </div>
    </div>
  );
}

const Profile = () => {
  // ...existing code...

  return (
    <div className="profile">
      <div className="profile-header">
        {/* ...existing header code... */}
      </div>

      {/* Only show albums section if albums array has items */}
      {albums && albums.length > 0 && (
        <div className="albums-section">
          <h2>Albums</h2>
          <div className="albums-grid">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
