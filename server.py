from flask import Flask, request, jsonify
import tensorflow as tf
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

model_path = os.getenv('MODEL_PATH')
model = tf.keras.models.load_model(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    restaurant_ids = data['restaurantIds']
    region_id = data['regionId']

    max_index = model.get_layer('restaurant_embedding').input_dim - 1

    valid_restaurant_ids = [restaurant_id for restaurant_id in restaurant_ids if restaurant_id < max_index]

    if not valid_restaurant_ids:
        return jsonify({'predictions': []})

    restaurant_inputs = tf.convert_to_tensor([[restaurant_id] for restaurant_id in valid_restaurant_ids], dtype=tf.int32)
    region_inputs = tf.convert_to_tensor([[region_id]] * len(valid_restaurant_ids), dtype=tf.int32)

    predictions = model([restaurant_inputs, region_inputs])
    prediction_results = predictions.numpy().flatten().tolist()

    return jsonify({'predictions': prediction_results, 'valid_restaurant_ids': valid_restaurant_ids})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
