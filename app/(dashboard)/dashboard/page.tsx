import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db"; 
import Link from "next/link";

export default async function DashboardPage() {

  const session = await getAuthSession();
  // upload file to pinata and save the hash to the database using @/lib/pinata
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div>
            {session ? (
              <Link href="/createcase">
                Create Case
              </Link>
            ) : (
              <Link href="/login">
                Login
              </Link>
            )}
          </div>
          </div>
          </header>
          </div>
          );
}