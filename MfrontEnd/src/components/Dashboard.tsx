import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileImage, AlertCircle, CheckCircle2, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Dashboard = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">
            Clinical Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Streamlined interface for radiologists and clinicians
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* MRI Upload Card */}
          <Card className="shadow-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="w-5 h-5 text-primary" />
                MRI Analysis
              </CardTitle>
              <CardDescription>Upload brain MRI scans for AI-assisted detection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag & drop MRI files here
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports DICOM, PNG, NIfTI formats
                </p>
              </div>
              <Button className="w-full gradient-medical text-white">
                Upload Scan
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results Card */}
          <Card className="shadow-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                Recent Analysis
              </CardTitle>
              <CardDescription>Latest scan results and risk assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="font-medium text-sm">Patient ID: MRI-2024-001</span>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Low Risk
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  No suspicious regions detected. Routine follow-up recommended.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-warning" />
                    <span className="font-medium text-sm">Patient ID: MRI-2024-002</span>
                  </div>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    Moderate Risk
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Possible mass detected in left frontal lobe. Radiologist review pending.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <span className="font-medium text-sm">Patient ID: MRI-2024-003</span>
                  </div>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                    High Risk
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Multiple suspicious regions identified. Urgent review required.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Patient Monitoring Card */}
          <Card className="lg:col-span-2 shadow-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Real-Time Health Monitoring
              </CardTitle>
              <CardDescription>Live vital signs and neurological risk indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Heart Rate</p>
                  <p className="text-2xl font-bold text-success">72 bpm</p>
                  <p className="text-xs text-muted-foreground mt-1">Normal</p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Blood Pressure</p>
                  <p className="text-2xl font-bold text-success">120/80</p>
                  <p className="text-xs text-muted-foreground mt-1">Optimal</p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-xs text-muted-foreground mb-1">SpO₂</p>
                  <p className="text-2xl font-bold text-success">98%</p>
                  <p className="text-xs text-muted-foreground mt-1">Excellent</p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Temperature</p>
                  <p className="text-2xl font-bold text-success">98.6°F</p>
                  <p className="text-xs text-muted-foreground mt-1">Normal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
