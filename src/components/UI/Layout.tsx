import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Layout;
