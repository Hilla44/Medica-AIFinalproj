from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import numpy as np
from PIL import Image
import tensorflow as tf
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'dcm', 'nii'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Load ML model (placeholder - you'll need to train/load your actual model)
model = None

def load_model():
    global model
    try:
        # Load your trained model here
        # model = tf.keras.models.load_model('models/brain_tumor_model.h5')
        print("Model loading placeholder - train and save your model first")
    except Exception as e:
        print(f"Model loading error: {e}")

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    """Preprocess MRI image for model prediction"""
    img = Image.open(image_path).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'Medica AI Imaging Service',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/imaging/analyze', methods=['POST'])
def analyze_mri():
    """Analyze uploaded MRI scan for brain tumor detection"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400
    
    try:
        # Save uploaded file
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filepath)
        
        # Preprocess image
        img_array = preprocess_image(filepath)
        
        # Mock prediction (replace with actual model inference)
        # prediction = model.predict(img_array)
        # For now, return mock data
        tumor_probability = np.random.uniform(0.1, 0.9)
        has_tumor = tumor_probability > 0.5
        
        result = {
            'scan_id': str(uuid.uuid4()),
            'filename': filename,
            'timestamp': datetime.now().isoformat(),
            'analysis': {
                'tumor_detected': bool(has_tumor),
                'confidence': float(tumor_probability),
                'risk_level': 'high' if tumor_probability > 0.7 else 'medium' if tumor_probability > 0.4 else 'low',
                'tumor_type': 'glioma' if has_tumor else None,
                'affected_regions': ['frontal lobe', 'temporal lobe'] if has_tumor else [],
                'recommendations': [
                    'Radiologist review required',
                    'Follow-up scan in 3 months' if tumor_probability < 0.7 else 'Immediate specialist consultation'
                ]
            },
            'metadata': {
                'image_size': img_array.shape[1:3],
                'processing_time_ms': np.random.randint(500, 1500)
            }
        }
        
        # Clean up uploaded file
        os.remove(filepath)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': f'Processing failed: {str(e)}'}), 500

@app.route('/api/monitoring/vitals', methods=['POST'])
def record_vitals():
    """Record patient vital signs"""
    data = request.get_json()
    
    required_fields = ['patient_id', 'vitals']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Process and store vitals
    vitals = data['vitals']
    
    # Mock risk calculation
    risk_score = np.random.uniform(0, 1)
    
    result = {
        'record_id': str(uuid.uuid4()),
        'patient_id': data['patient_id'],
        'timestamp': datetime.now().isoformat(),
        'vitals': vitals,
        'risk_assessment': {
            'score': float(risk_score),
            'level': 'high' if risk_score > 0.7 else 'medium' if risk_score > 0.4 else 'low',
            'alerts': ['Elevated heart rate detected'] if vitals.get('heartRate', 0) > 100 else []
        }
    }
    
    return jsonify(result), 201

@app.route('/api/monitoring/history/<patient_id>', methods=['GET'])
def get_monitoring_history(patient_id):
    """Get patient monitoring history"""
    # Mock historical data
    history = [
        {
            'timestamp': datetime.now().isoformat(),
            'heartRate': 75,
            'bloodPressure': '120/80',
            'temperature': 98.6,
            'spo2': 98
        }
    ]
    
    return jsonify({
        'patient_id': patient_id,
        'records': history,
        'summary': {
            'total_records': len(history),
            'date_range': {
                'start': history[-1]['timestamp'] if history else None,
                'end': history[0]['timestamp'] if history else None
            }
        }
    }), 200

if __name__ == '__main__':
    load_model()
    app.run(debug=True, host='0.0.0.0', port=5000)
