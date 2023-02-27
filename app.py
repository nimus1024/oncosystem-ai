from flask import Flask, render_template, request
from keras.models import load_model
import keras.utils as image
from keras.applications.imagenet_utils import decode_predictions 
import numpy as np

app = Flask(__name__)

model = load_model('cancer_pretrained_model.h5')
model.load_weights("best_weights")

model.make_predict_function()

def predict_label(img_path):
	i = image.load_img(img_path, target_size=(224,224))
	i = image.img_to_array(i)
	i = np.expand_dims(i, axis = 0)
	p = model.predict(i)
	print(p, img_path)
	if p[0][0] > p[0][1]:
		return "benign"
	else:
		return "malignant"

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

		p = predict_label(img_path)
		print(p)
	return {"prediction" : p, "img_path" : img_path}

if __name__ =='__main__':
	#app.debug = True
	app.run(debug = True)
