import { useEffect, useState } from "react";

const Animate = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [active, setActive] = useState(Array(text.length).fill(false));
  useEffect(() => {
   
    let time;
    const mountain = () => {
      setActive((pre) => {
        let up = Array(text.length).fill(false);
        
          up[index] = true;
        
        return up;
      });

      setIndex((pre) => {
        let next = pre + dir;
        if (next === text.length) {
          setDir(-1);
          return pre - 1;
        }
        if (next < 0) {
          setDir(1);
          return pre + 1;
        }
        return next
      });
    };
    
    time = setInterval(mountain, 100);
    return () => clearInterval(time);
  }, [index, text, dir]);
  return (
    <div>
      {text.split("").map((ele, i) => (
        <span key={i} className={active[i] ? "active" : ""}>
          {ele}
        </span>
      ))}
    </div>
  );
};

export default Animate;
