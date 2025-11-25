# Medica AI Flask Backend

Flask-based backend for brain tumor detection and health monitoring.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Train the Model

First, train the brain tumor detection model using the Kaggle dataset:

```bash
python model_trainer.py
```

This will:
- Download the brain tumor dataset from Kaggle
- Preprocess the images
- Train a CNN model
- Save the model to `models/brain_tumor_model.h5`

**Note**: You'll need to configure Kaggle API credentials first:
1. Go to https://www.kaggle.com/settings
2. Create a new API token
3. Place `kaggle.json` in `~/.kaggle/` directory

### 3. Run the Flask Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### MRI Analysis
```
POST /api/imaging/analyze
Content-Type: multipart/form-data

Body:
- file: MRI image file (PNG, JPG, JPEG)
```

Response:
```json
{
  "scan_id": "uuid",
  "analysis": {
    "tumor_detected": true,
    "confidence": 0.85,
    "risk_level": "high",
    "tumor_type": "glioma",
    "affected_regions": ["frontal lobe"],
    "recommendations": ["Radiologist review required"]
  }
}
```

### Record Vitals
```
POST /api/monitoring/vitals
Content-Type: application/json

Body:
{
  "patient_id": "patient-123",
  "vitals": {
    "heartRate": 75,
    "bloodPressure": "120/80",
    "temperature": 98.6,
    "spo2": 98
  }
}
```

### Get Monitoring History
```
GET /api/monitoring/history/<patient_id>
```

## Connecting to React Frontend

The React frontend is configured to make API calls to `http://localhost:5000`. Make sure:

1. Flask server is running on port 5000
2. CORS is enabled (already configured)
3. Both frontend and backend are running simultaneously

## Model Architecture

- **Input**: 224x224 RGB images
- **Architecture**: 4-layer CNN with max pooling
- **Output**: Binary classification (tumor/no tumor)
- **Training**: Binary cross-entropy loss with Adam optimizer

## Security Notes

- All patient data must be de-identified before upload
- Implement proper authentication before production use
- Add rate limiting for API endpoints
- Use HTTPS in production
- Store sensitive data encrypted

## Production Deployment

For production:
1. Set `debug=False` in app.py
2. Use a production WSGI server (e.g., Gunicorn)
3. Configure proper CORS origins
4. Add authentication middleware
5. Implement logging and monitoring
6. Use environment variables for configuration
