import "../styles/globals.css";

export const metadata = {
  title: "Tokenify",
  description: "Search for your favorite artists on Spotify",
  icons: {
    icon: '/logo-spotify.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="preload"
          href="/logo-spotify.png"
          as="image"
          type="image/png"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
