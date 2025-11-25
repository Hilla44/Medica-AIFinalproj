import { Brain, Activity, Bell, Lock, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Brain Tumor Detection",
    description: "Automated MRI analysis using deep learning to flag suspected tumors and high-risk regions for radiologist review.",
    color: "text-primary"
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description: "Continuous tracking of vital signs including blood pressure, heart rate, SpO₂, temperature, and activity levels.",
    color: "text-accent"
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Configurable thresholds trigger immediate notifications to clinicians, patients, and caregivers when readings are abnormal.",
    color: "text-warning"
  },
  {
    icon: TrendingUp,
    title: "Risk Stratification",
    description: "Longitudinal tracking and predictive models estimate deterioration risk and support early intervention strategies.",
    color: "text-success"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "End-to-end encryption, role-based access control, audit logs, and HIPAA-compliant data handling.",
    color: "text-destructive"
  },
  {
    icon: Users,
    title: "Dual Interface",
    description: "Dedicated web dashboard for clinicians and mobile app for patients with seamless data synchronization.",
    color: "text-primary"
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">
            Comprehensive Clinical Support
          </h2>
          <p className="text-lg text-muted-foreground">
            Combining AI-powered diagnostics with continuous patient monitoring for better outcomes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card border-border hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
