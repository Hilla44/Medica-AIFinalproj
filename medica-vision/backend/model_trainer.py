import kagglehub
import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np
import os
from PIL import Image
from sklearn.model_selection import train_test_split

def download_dataset():
    """Download brain tumor dataset from Kaggle"""
    print("Downloading brain tumor dataset...")
    path = kagglehub.dataset_download("praneet0327/brain-tumor-dataset")
    print(f"Dataset downloaded to: {path}")
    return path

def load_and_preprocess_data(dataset_path, img_size=(224, 224)):
    """Load and preprocess brain tumor images"""
    images = []
    labels = []
    
    # Assuming dataset structure: dataset_path/class_name/images
    for class_name in os.listdir(dataset_path):
        class_path = os.path.join(dataset_path, class_name)
        if not os.path.isdir(class_path):
            continue
            
        label = 1 if 'tumor' in class_name.lower() else 0
        
        for img_file in os.listdir(class_path):
            if img_file.lower().endswith(('.png', '.jpg', '.jpeg')):
                img_path = os.path.join(class_path, img_file)
                try:
                    img = Image.open(img_path).convert('RGB')
                    img = img.resize(img_size)
                    img_array = np.array(img) / 255.0
                    images.append(img_array)
                    labels.append(label)
                except Exception as e:
                    print(f"Error loading {img_path}: {e}")
    
    return np.array(images), np.array(labels)

def create_model(input_shape=(224, 224, 3)):
    """Create CNN model for brain tumor detection"""
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dropout(0.5),
        layers.Dense(512, activation='relu'),
        layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy', tf.keras.metrics.Precision(), tf.keras.metrics.Recall()]
    )
    
    return model

def train_model():
    """Main training pipeline"""
    # Download dataset
    dataset_path = download_dataset()
    
    # Load and preprocess data
    print("Loading and preprocessing data...")
    X, y = load_and_preprocess_data(dataset_path)
    print(f"Loaded {len(X)} images")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Create and train model
    print("Creating model...")
    model = create_model()
    
    print("Training model...")
    history = model.fit(
        X_train, y_train,
        epochs=20,
        batch_size=32,
        validation_split=0.2,
        callbacks=[
            tf.keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True),
            tf.keras.callbacks.ReduceLROnPlateau(patience=3)
        ]
    )
    
    # Evaluate model
    print("Evaluating model...")
    test_loss, test_accuracy, test_precision, test_recall = model.evaluate(X_test, y_test)
    print(f"Test Accuracy: {test_accuracy:.4f}")
    print(f"Test Precision: {test_precision:.4f}")
    print(f"Test Recall: {test_recall:.4f}")
    
    # Save model
    os.makedirs('models', exist_ok=True)
    model.save('models/brain_tumor_model.h5')
    print("Model saved to models/brain_tumor_model.h5")
    
    return model, history

if __name__ == '__main__':
    train_model()
