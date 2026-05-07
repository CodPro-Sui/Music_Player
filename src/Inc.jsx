import React from 'react'

const Inc = ({text,increase,decrease,fd}) => {
  return (
    <div className='inc'>
        <i className="fa-solid fa-minus" onClick={decrease}></i>
        <span className='txt'>{fd?text.toFixed(1,"0"): text <= 5000?"Off":(text || 1)  / 1000}</span>
        <i className="fa-solid fa-plus" onClick={increase}></i>
    </div>
  )
}

export default Inc