# Medica-AIFinalproj
An AI tool designed to assist patients by enabling early brain tumor detection and providing continuous real-time health monitoring.


# Medica AI

Medica AI is an AI-powered clinical support tool that helps with early detection of brain tumors from medical imaging and provides continuous, real-time health monitoring for patients at risk. https://medica-ai-health-ris-g48t.bolt.host/

---

## Overview

Medica AI combines deep learning–based analysis of brain MRI scans with a connected monitoring platform that tracks key vital signs and neurological risk indicators. https://medica-ai-health-ris-g48t.bolt.host/ 
The system is designed as a decision-support aid for clinicians and a companion app for patients, not as a standalone diagnostic device. 

---

## Key Features

- Automated analysis of brain MRI to flag suspected tumors and high‑risk regions for radiologist review. 
- Risk stratification and longitudinal tracking to support early detection and follow‑up.  
- Real-time health monitoring via connected devices (e.g., blood pressure, heart rate, SpO₂, temperature, activity).    
- Smart alerts for clinicians, patients, and caregivers when measurements cross configurable thresholds. 
- Secure web dashboard for clinicians and a mobile app interface for patients. 
- Audit logs, role-based access, and data encryption to support clinical and privacy requirements.  

---

## Architecture

Medica AI is organized into three main components. 

1. **Imaging Service**  
   - REST API for MRI upload (DICOM/PNG/NIfTI) and inference. 
   - Deep learning backbone (e.g., CNN/UNet) for detection, segmentation, and classification of brain tumors.  

2. **Monitoring Service**  
   - Ingestion pipeline for streaming vitals from wearable or bedside devices via secure APIs or Bluetooth gateways.  
   - Predictive models to estimate deterioration risk and trigger alerts. 

3. **Frontend Applications**  
   - Web dashboard for clinicians: imaging review, trend visualization, alert management. 
   - Mobile app for patients: measurements, reminders, symptom logging, and education content. 

---

## Getting Started

### Prerequisites

- Python 3.10+ for backend services. 
- CUDA-capable GPU (recommended) for model inference. 
- Docker and Docker Compose for containerized deployment. 
- Access to de‑identified MRI scans and device APIs in a test environment. 

### Installation

These commands start the imaging API, monitoring service, and web dashboard in a local development setup.  

---

## Usage

### 1. Brain Tumor Detection Workflow

1. Log in to the clinician dashboard.
2. Upload a de‑identified brain MRI series for a patient. 
3. The AI model analyzes the scan and returns: 
   - Tumor presence probability.  
   - Segmentation mask highlighting suspicious regions.  
   - Basic summary: tumor vs non‑tumor, and risk level. 
4. Radiologists and clinicians review AI output alongside original images before making any clinical decisions. 

### 2. Real-Time Health Monitoring

1. Enroll a patient and link approved monitoring devices in the dashboard. 
2. Configure thresholds for vitals (e.g., heart rate, SpO₂, blood pressure) and neurological risk scores. 
3. View live and historical trends; the system generates alerts when parameters exceed thresholds or risk scores spike.
4. Patients use the mobile app to track vitals, record symptoms (e.g., headaches, seizures), and receive guidance about when to contact care teams.

---

## Model Description

- **Imaging Model:** Convolutional neural network / encoder–decoder (e.g., UNet) trained on labeled brain MRI datasets for detection and segmentation. 
- **Monitoring Models:** Time-series models (e.g., gradient boosting, RNN/Transformer) for risk prediction based on vitals and symptoms. 
- **Explainability:** Saliency maps or heatmaps for MRI predictions and feature contribution for risk scores to support clinical interpretability.

---

## Data Privacy and Security

- De‑identification of all imaging data before upload.
- Encrypted transport and storage of patient data (TLS in transit, disk encryption at rest). 
- Role-based access control and audit logs for all clinical actions.  
- Designed to be deployed in secure, on‑premise or compliant cloud environments according to local regulations.

---

## Clinical and Regulatory Disclaimer

MEDICA AI is a research and decision-support tool and does **not** replace professional medical judgment. 
It must be validated, clinically tested, and, where applicable, approved or cleared by relevant regulatory authorities before use in real-world patient care. 

All imaging outputs, predictions, and alerts are intended to assist, not override, decisions made by licensed healthcare professionals. 

---

## Roadmap

- Integration with additional imaging modalities and tumor subtypes. 
- Enhanced seizure and neurological event prediction from multimodal data.
- Patient-facing educational modules and adherence coaching.  
- Expanded interoperability with hospital information systems and EHRs. 

---

## Contributing

Contributions are welcome in the areas of model development, UI/UX, MLOps, and clinical validation study design.   
Before opening a pull request, please create an issue describing the proposed change and ensure that no patient-identifiable data is included in any sample or log.

---

## License

This project is released under an open-source license (to be defined by the project owner, e.g., MIT or Apache 2.0).
Check the `LICENSE` file in the repository for full terms and conditions. 

