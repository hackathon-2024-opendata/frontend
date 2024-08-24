"use client";
//TODO: use clientを消してmetadataを記載する
//height 100%のコードは別で切り出す

import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Box, Card, CardContent } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" >
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Box sx={{ display: "flex"}}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {children}
            </Box>
          </Box>
        </AppRouterCacheProvider>
      </body>
        {/* <style global jsx>{`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
          }
        `}</style> */}
    </html>
  );
}
