import React from 'react';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { BsShield } from 'react-icons/bs';
import { useState, useEffect } from "react";
import axios from "axios";

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import '../style.scss';
import FormData from 'form-data';



const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Main = () => {
  const { currentColor, currentMode } = useStateContext();
  const [prediction, setPredictionData] = useState(null);
  const [file, setFile] = useState()

  function handleFileSelected(Event) {
    setFile(Event.target.files[0])
  }

  function getData(Event) {
      const formData = new FormData()
      Event.preventDefault()
      formData.append('image', file )
      axios({
        method: "POST",
        url:"/submit",
        data: formData,
        headers:  {
          'Content-Type': 'multipart/form-data',
        },

      })
      .then((response) => {
        const res = response.data
        setPredictionData(({
          prediction_label: res.prediction_label,
          benign_probability: res.benign_probability,
          malignant_probability: res.malignant_probability,
          img_path: res.img_path
        }))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      });
  }


  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Медкарта пациента</p>
              <p className="text-2xl">Крапивина А.И.</p>
            </div>

            <button
              type="button"
              style={{ color: 'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)' }}
              className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
            >
            <BsShield/>
            </button>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Загрузить"
              borderRadius="10px"
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-10 flex-wrap justify-center mt-6">
        {prediction && 
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Статистика заболевания</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span></span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">{prediction.malignant_probability}%</span>
                </p>
                <p className="text-gray-500 mt-1">Меланома</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">{prediction.benign_probability}%</p>

                <p className="text-gray-500 mt-1">Доброкачественное образование</p>
              </div>

              <div className="mt-5">
                <SparkLine currentColor={currentColor} id="line-sparkLine" type="Line" height="80px" width="250px" data={SparklineAreaData} color={currentColor} />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Загрузить отчет"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
        }
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3 bg-white flex local-bootstrap"
          >
            <div className="container flex flex-wrap">
              <p className="font-semibold text-xl">AI Диагностика</p>
              <form className="form-horizontal" onSubmit={getData}>

                <div className="form-group flex flex-wrap gap-2">
                  <label className="control-label" htmlFor="pwd">
                  <p>Анализ по фото</p>
                  <div className="col-sm-10 ">          
                    <input type="file" onChange={handleFileSelected} className="form-control" placeholder="фото родинки" name="my_image" id="pwd"/>
                  </div>
                  </label>
                </div>
                <div className="form-group flex justify-between items-center mt-4">        
                  <div className="flex flex-wrap gap-10 col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-success">Отправить</button>

                    {prediction && <div className="flex flex-wrap gap-4">
                        <img src={prediction.img_path} height="400px" width="400px" />
                        <p className="font-semibold text-xl">Предсказание  : <i> {prediction.prediction_label} </i></p>
                      </div>
                    }
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      {prediction && 

      <div className="flex gap-10 m-4 flex-wrap justify-center">
    
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Анализ</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>

          <div className="mt-10 ">
            {weeklyStats.map((item) => (
              <div key={item.title} className="flex justify-between mt-4 w-full">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{ background: item.iconBg }}
                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>

                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
            <div className="mt-4">
              <SparkLine currentColor={currentColor} id="area-sparkLine" height="160px" type="Area" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
            </div>
          </div>

        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Направление</p>
            <button type="button" className="text-xl font-semibold text-gray-400">
              <IoIosMore />
            </button>
          </div>
          <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-25 bg-orange-400 py-0.7 px-2 text-gray-200 mt-20">
            Среда (3 мая 2023)
          </p>

          <div>
            {medicalproBranding.data.map((item) => (
              <div>
                <p className="text-xs text-gray-400">{item.title}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            
            ))}
          
          </div>
          <div className="border-b-1 border-color pb-4 mt-2">
            <p className="text-md font-semibold mb-2">Место</p>
            <div className="flex gap-4">
            
            </div>
          </div>
          <div className="border-b-1 border-color pb-4 mt-2">
            <p className="text-md font-semibold mb-2">Время</p>
            <div className="flex gap-4">
            
            </div>
          </div>
          <div className="mt-2">
            <p className="text-md font-semibold mb-2">Ваш врач</p>
            <div className="flex gap-4">
              {medicalproBranding.leaders.map((item, index) => (
                <img key={index} className="rounded-full w-8 h-8" src={item.image} alt="" />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                color="white"
                bgColor={currentColor}
                text="Изменить"
                borderRadius="10px"
              />
            </div>

            <p className="text-gray-400 text-sm"></p>
          </div>
        </div>
        
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Дальнейшие шаги</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="mt-10 w-72 md:w-400">
            {recentTransactions.map((item) => (
              <div key={item.title} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                color="white"
                bgColor={currentColor}
                text="Добавить"
                borderRadius="10px"
              />
            </div>

            <p className="text-gray-400 text-sm"></p>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default Main;
