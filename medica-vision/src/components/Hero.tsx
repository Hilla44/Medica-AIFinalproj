import { Brain, Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-medical opacity-10" />
      
      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Clinical Intelligence</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
            Medica AI
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Early brain tumor detection and real-time health monitoring powered by advanced machine learning
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card shadow-card">
              <Brain className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">MRI Analysis</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card shadow-card">
              <Activity className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Real-Time Monitoring</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card shadow-card">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="gradient-medical text-white font-medium">
              Access Clinical Dashboard
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground pt-8 max-w-2xl mx-auto">
            Medica AI is a research and decision-support tool. Not a replacement for professional medical judgment.
            Must be validated and approved by regulatory authorities before clinical use.
          </p>
        </div>
      </div>
    </section>
  );
};
