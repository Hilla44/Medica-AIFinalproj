import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Dashboard />
      </main>
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">
            © 2024 Medica AI. Research and decision-support tool for clinical use.
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            Medica AI is not a standalone diagnostic device. All outputs are intended to assist, 
            not override, decisions made by licensed healthcare professionals. Must be validated 
            and approved by regulatory authorities before clinical deployment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
