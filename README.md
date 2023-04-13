# ОнкоСистема AI для диганостики и лечения рака кожи 
_МФТИ Старт в Инновации, ТИУ ТехЛидер, СПбГУ ЛЭТИ Наука настоящего и будущего, 23-я Международная научная конференция Сахаровские чтения, Научная Весна_

## ШАГ 1. Открыть терминал и склонировать репозиторий
```
git clone https://github.com/nimus1024/oncosystem-ai.git
```
После чего открыть VScode, выбрать oncosystem-ai папку в компьютере, открыть как новый проект)

## ШАГ 2. Установить python 3.9 (нужно для isic-cli)

For Mac
```
brew install python@3.9
brew unlink python@3.9
brew unlink python@3.8
brew link --force python@3.9
export PATH="/usr/local/opt/python/libexec/bin:$PATH"
```
(вернись обратно к python3.8 версии, повтори последние 4 строчки с 3.8 вместо 3.9)

Для Windows, нужно просто
```
# install python 3.11 through downloading exe, install
```

## ШАГ 3. *ДЛЯ ПРОСТОГО ЗАПУСКА СИСТЕМЫ* Загрузить нашу пред-обученную модель
1. Скачать модель, которую мы обучили и сохранили в формате .h5: https://drive.google.com/file/d/1I6L-JMw-PZzN4z06I4ZAbc1vBZk_xM0N/view?usp=share_link
2. Поместить файл внутрь папки репозитория
 
## ШАГ 3. *ДЛЯ РАЗРАБОТКИ* Установить ISIC database of skin cancer imaging (будем использовать для тренировки и тестирования модели)
```
# For Mac: pip install isic-cli
py -3.11 -m pip install isic-cli
mkdir images
# launch below and terminate when half is loaded with Ctrl+C. This dataset is too large. 
isic image download --limit 0 --search 'benign_malignant:benign' images/benign 
# launch below and wait until fully completed
isic image download --limit 0 --search 'benign_malignant:malignant' images/malignant 
```

## ШАГ 4. Запустить Flask app.py бакэнд 
```
python main.py
```

## ШАГ 5. Открыть ещё один терминал и начать start React npm app чтобы открылся веб-сайт
```
# delete package-lock.json
npm install
npm start
```
