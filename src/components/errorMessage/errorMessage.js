import React from "react";
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
  return (
    <>
      <img src={img} alt='Error'/>
      {/* <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='Error'/>  */}
      {/* process.env.PUBLIC_URL - переменная для обращения к папке public, если картинка error.jpg лежит в папке public */}
      <span>Something goes wrong</span>
    </>
  )
}

export default ErrorMessage;