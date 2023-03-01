# MIPT Start to Innovation: AI to Treat Skin Cancern

## Step 1. Open terminal and clone repo
```
git clone https://github.com/bs35/cancern-treatment.git
```
(Then open VScode, find cancern-treatment folder in your computer system, open it as a new project)

## Step 2. Install python 3.9 or later (required for isic-cli)

For Mac
```
brew install python@3.9
brew unlink python@3.9
brew unlink python@3.8
brew link --force python@3.9
export PATH="/usr/local/opt/python/libexec/bin:$PATH"
```
(to go back to old python3.8 version, repeat last 4 lines swapping 3.9 and 3.8)

For Windows, set up is easier.
```
# install python 3.11 through downloading exe, install
```

## Step 3. Install ISIC database of skin cancer imaging (will use to train and test the model)
```
# For Mac: pip install isic-cli
py -3.11 -m pip install isic-cli
mkdir images
# launch below and terminate when half is loaded with Ctrl+C. This dataset is too large. 
isic image download --limit 0 --search 'benign_malignant:benign' images/benign 
# launch below and wait until fully completed
isic image download --limit 0 --search 'benign_malignant:malignant' images/malignant 
```

## Step 4. Start Flask app.py for backend and React npm app to launch the website 
```
python app.py
# delete package-lock.json
npm install
npm start
```
