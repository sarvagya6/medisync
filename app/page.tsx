import Link from "next/link";

import { landingConfig } from "@/config/landing";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { getAuthSession } from "@/lib/auth";

import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
  const session = await getAuthSession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={landingConfig.mainNav} />
          <nav>
            {session ? (
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
        <div className="flex flex-col min-h-[calc(100vh-15rem)] items-center justify-center">
          <div
            className={cn(
              " font-sans antialiased text-6xl font-bold text-center leading-tight",
              spaceGrotesk.className
            )}
          >
            MediSync it Live
          </div>
          <div className="flex flex-wrap items center max-w-4xl py-8">
            <Link href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-4 rounded-none border-2 border-black mx-4 text-base font-semibold min-w-[9rem] hover:bg-red-500 hover:text-white cursor-pointer"
              )}
            >
              Manage Own Reports
            </Link>
            <Link href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-4 rounded-none border-2 border-black mx-4 text-base font-semibold min-w-[9rem] hover:bg-blue-500 hover:text-white cursor-pointer"
              )}
              // onClick set isHealthcareProfessional=true and save to local storage and redirect to login page
                onClick={
                  () => {
                    localStorage.setItem('isHealthcareProfessional', 'true');
                  }
                }
            >
              Manage Patients
            </Link>

            
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  );
}
