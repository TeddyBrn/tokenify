'use client';
require('dotenv').config();
import Image from 'next/image';
import { roboto, lalezar } from '@/lib/fonts';
import { useState, useEffect } from 'react';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { WelcomeSection } from '@/components/ui/welcome-section';
import { SearchStatus } from '@/components/ui/search-status';
import { ArtistCard } from '@/components/ui/artist-card';
import { TopTracks } from '@/components/ui/top-tracks';
import { Albums } from '@/components/ui/albums';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export default function Home() {
  const placeholders = ['Search for an artist', 'Search for an artist'];

  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [artistData, setArtistData] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    // API Access Token
    let authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:
        'grant_type=client_credentials&client_id=' +
        CLIENT_ID +
        '&client_secret=' +
        CLIENT_SECRET
    };
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
        console.log(accessToken);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // Input change event handler
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setHasSearched(false);
  };

  const onSubmit = (e) => {
    searchArtist();
    setIsSearching(true);
    setHasSearched(true);
  };

  // Search
  async function searchArtist() {
    setIsSearching(true);
    // Search for artist
    if (searchInput) {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const data = await response.json();

      const normalizeString = (str) => {
        return str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
      };

      const findArtist = data.artists?.items.find((art) => {
        const normalizedInput = normalizeString(searchInput);
        const normalizedName = normalizeString(art.name);
        return normalizedName.includes(normalizedInput);
      });

      if (!findArtist) {
        setArtistData(null);
        setTopTracks(null);
        setAlbums(null);
        setIsSearching(false);
        return;
      }

      const artistData = {
        name: findArtist.name,
        genres: findArtist.genres,
        followers: findArtist.followers.total,
        spotifyUrl: findArtist.external_urls.spotify,
        image: findArtist.images[0].url
      };

      setArtistData(artistData);

      // Get albums of the artist
      if (findArtist) {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${findArtist.id}/albums?include_groups=album&market=FR`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const dataAlbums = await response.json();

        const albumsData = dataAlbums.items.map((album) => ({
          image: album.images[0].url,
          name: album.name,
          spotifyUrl: album.external_urls.spotify,
          date: album.release_date
        }));

        setAlbums(albumsData);

        console.log(dataAlbums.items[0]);
      }

      // Get top tracks of the artist
      if (findArtist) {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${findArtist.id}/top-tracks?market=fr`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const dataTopTracks = await response.json();

        const tracksData = dataTopTracks.tracks.map((track) => ({
          image: track.album.images[0].url,
          name: track.name,
          spotifyUrl: track.external_urls.spotify,
          duration: track.duration_ms
        }));

        setTopTracks(tracksData);
      }
    }
    setIsSearching(false);
  }

  return (
    <div
      className={`${roboto.variable} ${lalezar.variable} font-sans h-screen overflow-auto scrollbar-hide`}>
      <div className="bg-[#111111] p-3 md:p-5 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center text gap-4">
          <Image
            src="/logo-spotify.png"
            alt="logo"
            width={50}
            height={50}
            priority={true}
            loading="eager"
            className="w-8 h-8 md:w-12 md:h-12 lg:w-[50px] lg:h-[50px]"
          />
          <h1 className="font-['Lalezar'] items-center text text-center text-[#39D66E] text-sm sm:text-sm md:text-4xl lg:text-4xl">
            Tokenify
          </h1>
        </div>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>

      <div className="flex flex-col justify-center items-center h-[calc(100%-4rem)] gap-6 bg-linear-to-t/longer from-[#0a0a0a] to-[#363636]  px-4 py-8 md:py-12 ">
        {!hasSearched ? (
          <WelcomeSection />
        ) : artistData ? (
          <div className="flex flex-col gap-6 w-full max-w-6xl">
            <div className="flex flex-col md:flex-row gap-6">
              <ArtistCard artist={artistData} />
              {topTracks && <TopTracks tracks={topTracks} />}
            </div>
            {albums && <Albums albums={albums} />}
          </div>
        ) : isSearching ? null : (
          <SearchStatus />
        )}
      </div>
    </div>
  );
}
