from flask import Flask, render_template, request
from keras.models import load_model
from keras.utils.data_utils import get_file
import keras.utils as image
from keras.applications.imagenet_utils import decode_predictions 
import numpy as np
import math
import os

app = Flask(__name__)

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "glowing-program-379304-00f032baaa6d.json"

# get model
model = load_model("gs://cancer_treatment/saved_model")

# assign weights
model.load_weights("gs://cancer_treatment/best_weights")

model.make_predict_function()

def predict_label(img_path):
	i = image.load_img(img_path, target_size=(224,224))
	i = image.img_to_array(i)
	i = np.expand_dims(i, axis = 0)
	p = model.predict(i)
	print(math.floor(p[0][0] * 100), img_path)
	if p[0][0] > p[0][1]:
		return ["доброкачественная", math.floor(p[0][0] * 100)]
	else:
		return ["меланома", math.floor(p[0][1] * 100)]

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
		print(res[1])
		opposite_prob = 100 - res[1]
	return {"prediction_label" : res[0], "probability": res[1], "opposite_probability": opposite_prob, "img_path" : img_path}

if __name__ =='__main__':
	#app.debug = True
	app.run(debug = True)
