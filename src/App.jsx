import React, { useEffect, useRef, useState } from "react";
import "./App.css"
const App = () => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const div2 = document.querySelector(".div2");

    const handleMouseEnter = () => setCursorVisible(false);
    const handleMouseLeave = () => setCursorVisible(true);

    const handleMouseMoveDiv2 = (e) => {
      const div2Rect = div2.getBoundingClientRect();
      const midPoint = div2Rect.height / 2;

      if (e.clientY < midPoint) {
        div2.scrollBy({ top: -10, behavior: "smooth" });
      } else {
        div2.scrollBy({ top: 10, behavior: "smooth" });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    if (div2) {
      div2.addEventListener("mouseenter", handleMouseEnter);
      div2.addEventListener("mouseleave", handleMouseLeave);
      div2.addEventListener("mousemove", handleMouseMoveDiv2);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (div2) {
        div2.removeEventListener("mouseenter", handleMouseEnter);
        div2.removeEventListener("mouseleave", handleMouseLeave);
        div2.removeEventListener("mousemove", handleMouseMoveDiv2);
      }
    };
  }, []);


  const calculateGap = () => {
    if (div1Ref.current && div2Ref.current) {
      const div1Top = div1Ref.current.getBoundingClientRect().top;
      const div2Top = div2Ref.current.getBoundingClientRect().top;
      const gap = Math.abs(div2Top - div1Top);

      if (gap === 16 && !eventFired) {
        handleGapReached();
      } else if (gap !== 16) {

        console.log("bhoooot jedda gap he ")
      }
    }
  };

  const handleGapReached = () => {
    console.log("The gap between the tops of the divs is exactly 16px!");
    alert("Gap is 16px!");
  };
  useEffect(() => {
    const div2 = div2Ref.current;
  
    if (div2) {
      div2.addEventListener("scroll", calculateGap);
      calculateGap(); // Initial calculation
    }
  
    return () => {
      if (div2) {
        div2.removeEventListener("scroll", calculateGap);
      }
    };
  }, []);


  return (
    <div className="w-[328px] relative bg-white h-screen overflow-hidden overflow-y-auto scrollbar-hide"  ref={div1Ref}>
      <div className="flex flex-col div1 gap-2 fixed top-0 left-0 w-[328px] z-10">
        <div className="rounded-3xl div1.1  bg-[#A098CF] h-[130px]"></div>
        <div className='rounded-3xl div1.2 bg-[url("./assets/building.png")] bg-no-repeat bg-cover bg-center h-[225px]'></div>
      </div>

      {/* <div className="rounded-3xl div2 absolute top-[355px] w-full bg-[#ffffffa6]  z-20 scrollbar-hide p-4  cursor-none"> */}
      <div className="rounded-3xl div2 absolute top-[355px] w-full bg-[#ffffffa6]  z-20 scrollbar-hide p-4  cursor-none"ref={div2Ref}>
        <h2 className="heading">Header</h2>
        <p>
        {Array(5000)
            .fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit. ")
            .join(" ")}
        </p>
      </div>

      {!cursorVisible && (
        <div className='fixed w-[68px] h-[109px] pointer-events-none bg-[url("./assets/scroll.png")]  z-40 bg-cover bg-center' style={{ top: `${cursorPos.y}px`, left: `${cursorPos.x}px` }} />
      )}
    </div>
  );
};

export default App;