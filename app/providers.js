// // app/providers.js
// 'use client';

// import { NextUIProvider } from '@nextui-org/react';

// export function Providers({ children }) {
//   return (
//     <NextUIProvider>
//       {children}
//     </NextUIProvider>
//   );
// }


// app/providers.js
'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
}
