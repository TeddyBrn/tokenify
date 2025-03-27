import Image from 'next/image';
import Link from 'next/link';
import { lalezar } from '@/lib/fonts';

export function ArtistCard({ artist }) {
  const formatFollowers = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  return (
    <div className="relative w-full h-full aspect-auto overflow-hidden rounded-lg">
      <Image
        src={artist.image}
        alt={artist.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-75"
        loading="eager" // Changed from priority
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <Link
          href={artist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-7xl font-bold text-white hover:text-[#39D66E] transition-colors">
          {artist.name}
        </Link>
        <p className="text-white mt-2  text-2xl">
          {formatFollowers(artist.followers)} followers
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {artist.genres.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 text-lg font-bold bg-[#39D66E]/10 text-[#39D66E] rounded-full">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
