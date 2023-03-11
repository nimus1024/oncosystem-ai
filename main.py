\from flask import Flask, render_template, request
from tensorflow import keras
from keras.models import load_model
from keras.utils.data_utils import get_file
import keras.utils as image
from keras.applications.imagenet_utils import decode_predictions 
import numpy as np
import math

app = Flask(__name__)

# get model
model = load_model("gs://cancer_treatment/cancer_pretrained_model.h5")

model.make_predict_function()

def predict_label(img_path):
	i = image.load_img(img_path, target_size=(224,224))
	i = image.img_to_array(i)
	i = np.expand_dims(i, axis = 0)
	p = model.predict(i)
	print(math.floor(p[0][0] * 100), img_path)
	benign = math.floor(p[0][0] * 100)
	malignant = 100 - benign
	if benign > malignant:
		return ["доброкачественная", benign, malignant]
	else:
		return ["меланома", benign, malignant]

# routes
# @app.route("/", methods=['GET', 'POST'])
# def main():
# 	return render_template("index.html")

@app.route("/about")
def about_page():
	return "Please subscribe  Artificial Intelligence Hub..!!!"

@app.route("/submit", methods = ['POST'])
def get_output():
	p = 0
	img_path = 0
	if request.method == 'POST':
		img = request.files.get('image', '')
		print(img)
		img_path = "static/" + img.filename
		img.save(img_path)

		res = predict_label(img_path)
	return {"prediction_label" : res[0], "benign_probability": res[1], "malignant_probability": res[2], "img_path" : img_path}

if __name__ =='__main__':
	#app.debug = True
	app.run(debug = True)
