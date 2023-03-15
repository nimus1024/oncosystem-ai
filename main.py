from flask import Flask, render_template, request

from keras.models import load_model
from keras.utils.data_utils import get_file
import keras.utils as image
from keras.applications.imagenet_utils import decode_predictions 
import numpy as np
import math
import h5py
import gcsfs
import os
app = Flask(__name__)


#os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "glowing-program-379304-00f032baaa6d.json"
# PROJECT = "CANCER_TREATMENT"
# REGION = "europe-west2"

#app = Flask(__name__)

# model = load_model('cancer_pretrained_model.h5')

# PROJECT_NAME = 'glowing-program-379304'
# CREDENTIALS = 'glowing-program-379304-27f18cfbab2c.json'
# MODEL_PATH = 'gs://cancer_treatment/cancer_pretrained_model.h5'

PROJECT_NAME = 'web-app-cancer-treatment'
CREDENTIALS = 'web-app-cancer-treatment-90c0c8e4ff2d.json'
MODEL_PATH = 'gs://pretrained-melanoma-model/cancer_pretrained_model.h5'

FS = gcsfs.GCSFileSystem(project=PROJECT_NAME,
                         token=CREDENTIALS)
with FS.open(MODEL_PATH, 'rb') as model_file:
     model_gcs = h5py.File(model_file, 'r')
     model = load_model(model_gcs)
			   

# get model
# model = load_model("gs://cancer_treatment/cancer_pretrained_model.h5")

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

@app.route("/")
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
	# app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
	app.run(debug=True)

