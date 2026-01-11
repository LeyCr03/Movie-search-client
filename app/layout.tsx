import './globals.css';
import { Toaster } from '@/components/atoms/ui/sonner';
import { Navbar } from '@/components/layout/Navbar';
import { ThemeProvider } from 'next-themes'

export const metadata = {
  title: "Subscription Manager",
  description: "Subscription Manager Dashboard with nextjs/postgres/node",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-background">
        <ThemeProvider attribute="class" defaultTheme='light' enableSystem={false}>
          <Navbar></Navbar>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}