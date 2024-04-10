from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from PIL import Image

app = Flask(__name__)
CORS(app)

model_path = "./tuberculosis_model.h5"
alexnet_model = tf.keras.models.load_model(model_path)

def preprocess(image):
    img = Image.open(image)
    img = img.convert("RGB")
    img = img.resize((256, 256))
    img = np.array(img, dtype=np.float32) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.route('/predict', methods=['POST'])
def predict():
    image_file = request.files['image']

    img = preprocess(image_file)

    prediction = alexnet_model.predict(img)

    result = 1 if prediction[0] > 0.9 else 0
    
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)