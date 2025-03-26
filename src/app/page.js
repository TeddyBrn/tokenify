'use client';
import Image from 'next/image';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { Roboto } from 'next/font/google';
import { useState, useEffect } from 'react';

const roboto = Roboto({ subsets: ['latin'] });
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = '3c8858e88a074034a41ac56d973c7ced';
const CLIENT_SECRET = '5bbcda3d2ea4430cba2002449ebe0578';

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
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    };
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then((response) => response.json())
      .then((data) => {
				setAccessToken(data.access_token);
        console.log(accessToken);
        console.log(data.access_token);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <div className={`${roboto.className} h-screen bg-[#252525]`}>
      <div className="bg-[#111111] p-5 flex items-center ">
        <Image
          src="/logo-spotify.png"
          alt="logo"
          width={50}
          height={50}
          priority={true}
        />
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
