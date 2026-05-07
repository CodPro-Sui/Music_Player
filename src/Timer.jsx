
import { createPortal } from 'react-dom'
import useTheme from './hooks/useTheme'
const Timer = ({get,cancel}) => {
    const {isDark} = useTheme();
  return createPortal(
    <div className='portal' onClick={cancel}>
        <div className={isDark?"dk":"lt"}>
        <span onClick={() => get("off")}>Off</span>
        <span onClick={() => get(10)}>10 min later</span>
        <span onClick={() => get(15)}>15 min later</span>
        <span onClick={() => get(20)}>20 min later</span>
        <span onClick={() => get(25)}>25 min later</span>
        <span onClick={() => get(30)}>30 min later</span>
        <span onClick={() => get(35)}>35 min later</span>
        <span onClick={() => get(40)}>40 min later</span>
        <span onClick={() => get(45)}>45 min later</span>
        <span onClick={() => get(50)}>50 min later</span>
        <span onClick={() => get(60)}>60 min later</span>
        </div>
    </div>,
    document.body
  )
}

export default Timer