import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileImage, AlertCircle, CheckCircle2, Activity, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  scan_id: string;
  filename: string;
  timestamp: string;
  analysis: {
    tumor_detected: boolean;
    confidence: number;
    risk_level: string;
    tumor_type: string | null;
    affected_regions: string[];
    recommendations: string[];
  };
}

export const Dashboard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PNG, JPG, or JPEG image.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (16MB max)
    if (file.size > 16 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 16MB.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Call Flask backend API
      const response = await fetch('http://localhost:5000/api/imaging/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);

      toast({
        title: "Analysis complete",
        description: `Risk level: ${result.analysis.risk_level}`,
      });
    } catch (error) {
      console.error('Error analyzing MRI:', error);
      toast({
        title: "Analysis failed",
        description: "Make sure the Flask backend is running on port 5000.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="py-20 px-4 bg-muted/30" id="dashboard">
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
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div 
                onClick={handleUploadClick}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-12 h-12 text-primary mx-auto mb-3 animate-spin" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Analyzing MRI scan...
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload MRI files
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PNG, JPG, JPEG formats (max 16MB)
                    </p>
                  </>
                )}
              </div>
              <Button 
                onClick={handleUploadClick}
                disabled={isAnalyzing}
                className="w-full gradient-medical text-white"
              >
                {isAnalyzing ? "Analyzing..." : "Upload Scan"}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results Card */}
          <Card className="shadow-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                {analysisResult ? "Analysis Result" : "Recent Analysis"}
              </CardTitle>
              <CardDescription>
                {analysisResult ? "Latest scan analysis" : "Upload a scan to see results"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysisResult ? (
                <div className={`p-4 rounded-lg border ${
                  analysisResult.analysis.risk_level === 'high' 
                    ? 'bg-destructive/10 border-destructive/20'
                    : analysisResult.analysis.risk_level === 'medium'
                    ? 'bg-warning/10 border-warning/20'
                    : 'bg-success/10 border-success/20'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {analysisResult.analysis.tumor_detected ? (
                        <AlertCircle className={`w-5 h-5 ${
                          analysisResult.analysis.risk_level === 'high' 
                            ? 'text-destructive'
                            : 'text-warning'
                        }`} />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      )}
                      <span className="font-medium text-sm">
                        {analysisResult.filename}
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        analysisResult.analysis.risk_level === 'high'
                          ? 'bg-destructive/10 text-destructive border-destructive/20'
                          : analysisResult.analysis.risk_level === 'medium'
                          ? 'bg-warning/10 text-warning border-warning/20'
                          : 'bg-success/10 text-success border-success/20'
                      }
                    >
                      {analysisResult.analysis.risk_level} Risk
                    </Badge>
                  </div>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>
                      <strong>Confidence:</strong> {(analysisResult.analysis.confidence * 100).toFixed(1)}%
                    </p>
                    {analysisResult.analysis.tumor_detected && (
                      <>
                        {analysisResult.analysis.tumor_type && (
                          <p>
                            <strong>Type:</strong> {analysisResult.analysis.tumor_type}
                          </p>
                        )}
                        {analysisResult.analysis.affected_regions.length > 0 && (
                          <p>
                            <strong>Regions:</strong> {analysisResult.analysis.affected_regions.join(", ")}
                          </p>
                        )}
                      </>
                    )}
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <strong>Recommendations:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {analysisResult.analysis.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <span className="font-medium text-sm">Sample: MRI-2024-001</span>
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
                        <span className="font-medium text-sm">Sample: MRI-2024-002</span>
                      </div>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        Moderate Risk
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Possible mass detected. Radiologist review pending.
                    </p>
                  </div>
                </>
              )}
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
