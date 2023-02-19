from flask import Flask, render_template, request
from keras.models import load_model
import keras.utils as image
from keras.applications.imagenet_utils import decode_predictions 

app = Flask(__name__)

dic = {0 : 'maligmant', 1 : 'benign'}

model = load_model('cancer_pretrained_model.h5')

model.make_predict_function()

def predict_label(img_path):
	i = image.load_img(img_path, target_size=(224,224))
	i = image.img_to_array(i)/255.0
	# NOTE: changed shape from 1, 100,100 to 224,224,3 per our model in 2_train_model
	i = i.reshape(1, 224,224,3)
	p = model.predict(i)
	print(p)
	if p[0][0] > p[0][1]:
		return "benign"
	else:
		return "malignant"
	# dec_pred = decode_predictions(p)
	
	# return dic[p[0]]


# routes
@app.route("/", methods=['GET', 'POST'])
def main():
	return render_template("index.html")

@app.route("/about")
def about_page():
	return "Please subscribe  Artificial Intelligence Hub..!!!"

@app.route("/submit", methods = ['GET', 'POST'])
def get_output():
	if request.method == 'POST':
		img = request.files['my_image']

		#img_path = "static/" + img.filename	
		img_path = img.filename	
		img.save(img_path)

		p = predict_label(img_path)

	return render_template("index.html", prediction = p, img_path = img_path)


if __name__ =='__main__':
	#app.debug = True
	app.run(debug = True)
