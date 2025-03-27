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
      <body>{children}</body>
    </html>
  );
}
