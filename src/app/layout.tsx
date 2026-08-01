import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark", "font-sans", inter.variable)}>
      <body>
        <TooltipProvider>
          <main className="flex-1">{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}
