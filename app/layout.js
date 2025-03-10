// import localFont from "next/font/local";
// import "./globals.css";
// import {Providers} from "./providers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: "Linkerex",
//   description: "We link Students To Those opportunities",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className='dark'>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Providers>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }















// import localFont from "next/font/local";
// import "./globals.css";
// import { Providers } from "./providers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: "Linkerex",
//   description: "We link Students To Those opportunities",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className="dark">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <Providers>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }











import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata (kept here since it's a server component)
export const metadata = {
  title: "Linkerex",
  description: "We link Students To Those opportunities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
