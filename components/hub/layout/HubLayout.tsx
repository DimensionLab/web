import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

export default async function HubLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="flex flex-col min-h-screen w-full justify-between bg-lightGrey dark:bg-gray-950 text-gray-900 dark:text-gray-50">
        <Header />
        <div className="absolute top-0 w-full bg-cover bg-center bg-no-repeat text-center z-[-1]"></div>
        <section className="flex flex-col items-center justify-center h-full">
          {children}
        </section>
        <Footer />
      </main>
    </ThemeProvider>
  );
}
