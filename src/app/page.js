'use client';
import Image from 'next/image';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { GradualSpacing } from '@/components/ui/gradual-spacing';
import { FadeText } from "@/components/ui/fade-text"
import { Roboto } from 'next/font/google';
import { useState, useEffect } from 'react';
require('dotenv').config();

const roboto = Roboto({ subsets: ['latin'] });
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export default function Home() {
  const placeholders = ['Search for an artist', 'Search for an artist'];

  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');

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

  async function searchArtist() {
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
      console.log(data.artists.items[0]);

      const findArtist = data.artists?.items.find((art) => {
        const pattern = new RegExp(searchInput, 'i');
        return pattern.test(art.name);
      });

      if (findArtist) {
        const id = findArtist.id;
        console.log(id);
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album&market=FR`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const data = await response.json();
        console.log(data.items);
      }

      if (findArtist) {
        const id = findArtist.id;
        console.log(id);
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${id}/top-tracks?market=fr`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const data = await response.json();
        console.log(data.tracks);
      }
    }
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    searchArtist();
  };

  return (
    <div className={`${roboto.className} h-screen overflow-hidden`}>
      <div className="bg-[#111111] p-3 md:p-5 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/logo-spotify.png"
            alt="logo"
            width={50}
            height={50}
            priority={true}
            className="w-8 h-8 md:w-12 md:h-12 lg:w-[50px] lg:h-[50px]"
          />
          <h1 className="text-[#39D66E] font-bold text-sm sm:text-sm md:text-4xl lg:text-4xl">
            Tokenify
          </h1>
        </div>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>

      <div className="flex flex-col justify-center items-center h-[calc(100%-4rem)] gap-6 bg-linear-to-t/longer from-[#0a0a0a] to-[#363636]  px-4 py-8 md:py-12">
        <GradualSpacing
          className="font-display text-center text-4xl font-bold -tracking-widest mb-8 text-[#39D66E] dark:text-white md:text-8xl md:leading-[5rem]"
          text="What is Tokenify ?"
        />
				<FadeText
        className="text-6xl font-bold text-[#BABABA] dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 1} },
        }}
        text="Find an artist"
      />
			<FadeText
        className="text-6xl font-bold text-[#BABABA] dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 2 } },
        }}
        text="Their best songs"
      />
			<FadeText
        className="text-6xl font-bold text-[#BABABA] dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 3} },
        }}
        text="Their albums"
      />
        {/* <Image
          src="/not-found.png"
          alt="spotify"
          width={300}
          height={300}
					priority={true}
          className="w-[180px] md:w-[250px] lg:w-[300px] h-auto"
        />
        <p className="text-[#e9e9e9] text-2xl md:text-4xl lg:text-6xl mt-8 md:mt-16 lg:mt-20 text-center">
          No Results Found
        </p>
        <p className="text-[#BABABA] text-lg md:text-xl lg:text-2xl mt-6 md:mt-8 lg:mt-10 text-center max-w-[90%] md:max-w-[80%]">
          Sorry, there are no results for this search.
        </p>
        <p className="text-[#BABABA] text-lg md:text-xl lg:text-2xl mt-3 md:mt-4 lg:mt-5 text-center">
          Please try another artist name.
        </p> */}
      </div>
    </div>
  );
}
