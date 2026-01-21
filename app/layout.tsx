import { ThemeProvider } from '@/components/atoms/ThemeProvider';
import './globals.css';
import { Toaster } from '@/components/atoms/ui/sonner';
import { Navbar } from '@/components/layout/Navbar';

export const metadata = {
  title: "CINESPHERE",
  description: "Browse, track, and recommend movies.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="font-sans bg-background">
        <ThemeProvider>
          <Navbar></Navbar>
          {children}
          <Toaster position="bottom-right" richColors expand={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}