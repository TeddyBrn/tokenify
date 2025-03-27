import Image from 'next/image';
import Link from 'next/link';

export function TopTracks({ tracks }) {
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  // Fonction pour formater le numéro sur deux colonnes
  const formatTrackNumber = (index) => {
    // Pour la première colonne (0-4), retourner index + 1
    // Pour la deuxième colonne (5-9), retourner index + 1
    return index + 1;
  };

  const organizedTracks = [...tracks].reduce((acc, track, i) => {
    const column = i < 5 ? 0 : 1;
    if (!acc[column]) acc[column] = [];
    acc[column].push(track);
    return acc;
  }, []);

  return (
    <div className="relative w-full h-full bg-black/20 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-3xl font-bold text-[#39D66E] mb-6">Popular</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 max-h-[calc(100%-5rem)] overflow-y-auto scrollbar-hide">
        {organizedTracks.map((columnTracks, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6 md:gap-7 lg:gap-9">
            {columnTracks.map((track, index) => (
              <div
                key={`${colIndex}-${index}`}
                className="flex items-center gap-2 group">
                <span className="text-[#BABABA] font-medium min-w-[1.5rem]">
                  {window.innerWidth < 640
                    ? index + 1 + colIndex * 5
                    : colIndex === 0
                    ? index + 1
                    : index + 6}
                </span>
                <div className="relative w-12 md:w-16 h-12 md:h-16 flex-shrink-0">
                  <Link
                    href={track.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full h-full">
                    <Image
                      src={track.image}
                      alt={track.name}
                      fill
                      sizes="(max-width: 768px) 48px, 64px"
                      className="object-cover rounded transition-transform duration-300 group-hover:scale-105"
                      loading="lazy" // Changed from priority
                    />
                  </Link>
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={track.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white text-sm md:text-base font-medium truncate group-hover:text-[#39D66E] transition-colors">
                    {track.name}
                  </Link>
                  <p className="text-[#BABABA] text-xs md:text-sm">
                    {formatDuration(track.duration)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
