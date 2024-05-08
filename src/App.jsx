import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import slide_1 from "./images/slide_1.webp"
import slide_2 from "./images/slide_2.webp"
import slide_3 from "./images/slide_3.webp"
import slide_4 from "./images/slide_4.webp"
import slideman_1 from "./images/slideman_1.png"
import slideman_2 from "./images/slideman_2.png"
import slideman_3 from "./images/slideman_3.png"
import slideman_4 from "./images/slideman_4.png"
import cloud from "./images/clouds.webp"
import rainbow from "./images/rainbow2.png"
import birds from "./images/birds.webp"
import arrow from "./images/arrow.png"


const imageUrls = [
  slide_1,
  slide_2,
  slide_3,
  slide_4
];

const slideman = [
  slideman_1,
  slideman_2,
  slideman_3,
  slideman_4
]




function customEasing(progress) {
  return Math.sin(progress * Math.PI / 2);
}

function App() {
  const canvasRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(3);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  // const [progress, setProgress] = useState(0);
  const [currentperson,setcurrentperson] = useState(0)
  const [floatingimage,setfloatingimage] = useState(4)
  const [transdur,setransdur] = useState(0.5)
  const [floattext,setfloattext] = useState(1)

  const [currentImageAspectRatio, setCurrentImageAspectRatio] = useState(1);
  const [nextImageAspectRatio, setNextImageAspectRatio] = useState(1);

  let intervalId
  console.log("floatimage",floatingimage);
  console.log("floattext",floattext);


  const calculateImageWidth = (imageHeight, aspectRatio) => {
    return imageHeight * aspectRatio;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const currentImage = new Image();
    const nextImage = new Image();
    currentImage.src = imageUrls[currentImageIndex];
    nextImage.src = imageUrls[nextImageIndex];
    const ratio = window.devicePixelRatio || 1;

    const numFrames = 20;
    const animationDuration = 500; // 1 second

    // canvas.width = window.innerWidth * ratio;
  canvas.height =  window.innerHeight * ratio;

  // canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `100%`;

  currentImage.onload = () => {
    setCurrentImageAspectRatio(currentImage.width / currentImage.height);
    let width_val = calculateImageWidth(canvas.height, currentImageAspectRatio);
    canvas.width = width_val > window.innerWidth?width_val:innerWidth*ratio
    canvas.style.width = canvas.width>window.innerWidth? `${canvas.width /ratio}px`:window.innerWidth/ratio;
    
    console.log("width of canvas",canvas.width,canvas.style.width);
  };

  nextImage.onload = () => {
    setNextImageAspectRatio(nextImage.width / nextImage.height);
  };

  ctx.scale(ratio, ratio);

    function drawImagesWithMotionBlurEffect() {

      const interval = animationDuration / numFrames;
      let currentFrame = 0;
      let progress = 0
      


      const intervalId = setInterval(() => {
        ctx.imageSmoothingEnabled = false;


        const currentOffset = customEasing(progress) * canvas.width;
        const nextOffset = ((1 - customEasing(progress))*20) * canvas.width 

        

        ctx.globalAlpha = progress;
        ctx.drawImage(nextImage, -nextOffset, 0, (canvas.width) + nextOffset, canvas.height);

        ctx.globalAlpha = 1 - progress;
        ctx.drawImage(currentImage, 0, 0, canvas.width + currentOffset*5, canvas.height);

       
        

        currentFrame++;
 
        let val = currentFrame/numFrames
        
        progress = currentFrame / numFrames 
        // setProgress(prevProgress => {
        //   const val = currentFrame / numFrames * 100;
        //   return val;
        // });
        
        

        if (currentFrame >numFrames) {
          clearInterval(intervalId);
          setCurrentImageIndex(nextImageIndex);
          setNextImageIndex((nextImageIndex + 1) % imageUrls.length);
          // setProgress(0);
        }
      }, interval);
    }

    

    
    
    

    drawImagesWithMotionBlurEffect();

    return () => {
      clearInterval(intervalId);
    };
  }

  const handleNextImage = () => {
    setNextImageIndex((nextImageIndex + 1) % imageUrls.length);
    setcurrentperson((currentperson+1)% slideman.length)
    setfloatingimage(floatingimage - 1 < 0?3:floatingimage-1)
    setfloattext((floattext+1)%6)
    setransdur(0.5)
    
    draw()
  };

  const handlePrevImage = () => {
    setNextImageIndex((nextImageIndex + imageUrls.length - 1) % imageUrls.length);
    setcurrentperson(currentperson - 1 < 0?3:currentperson-1)
    setfloatingimage((floatingimage+1)%6)
    setfloattext(floattext - 1 < 0?3:floattext-1)
    setransdur(0.5)
    draw()
  };

  useEffect(() =>{
    draw()
  },[])

  useEffect(() =>{
    if (floatingimage === 5){setTimeout(() => {
      console.log("equal 5");

      setransdur(0)

      setfloatingimage(1)
      setfloattext(1)
    }, 500);}
  },[floatingimage == 5])

  useEffect(() =>{
    if (floatingimage === 0){setTimeout(() => {
      console.log("equal 0");

      setransdur(0)

      setfloatingimage(4)
      setfloattext(4)
    }, 500);}
  },[floatingimage == 0 ])


  useEffect(() =>{
    if (floattext === 5){setTimeout(() => {
      console.log("equal 5");

      setransdur(0)

      
      setfloattext(1)
    }, 500);}
  },[floattext == 5])

  useEffect(() =>{
    if (floattext === 0){setTimeout(() => {
      console.log("equal 0");

      setransdur(0)

      setfloattext(4)
    }, 500);}
  },[floattext == 0 ])



 
  
let style_cloud = {transform: `translateX(-${floatingimage*100}vw)translateY(-20%)`,transitionDuration:`${transdur}s`}

let style_text = {transform: `translateX(-${floattext*100}vw)translateY(-20%)`,transitionDuration:`${transdur}s`}
  


  return (
    <div className='full-container' style={{height:"100dvh",position:"relative"}}>
      <canvas style={{height:"100%",width:"100%",objectFit:"cover"}} ref={canvasRef}   />

      <div className="right-button col-md-4 col-6" onClick={handleNextImage}>
        <img style={{transform:'rotate(180deg)'}} className='img-fluid arrow left-arrow' src={arrow} alt="" />
      </div>
      <div className="left-button col-md-4 col-6" onClick={handlePrevImage}>
          <img  className='img-fluid arrow right-arrow' src={arrow} alt="" />
      </div>
      <div className="hover-image d-flex" style={style_cloud}>
        <div className="cloud">
          <img  src={cloud} alt="" />
        </div>
        <div className="cloud">
          <img  src={birds} alt="" />
        </div>
        <div className="cloud">
          <img  src={cloud} alt="" />
        </div>
        <div className="cloud">
          <img  src={rainbow} alt="" />
        </div>
        <div className="cloud">
          <img  src={cloud} alt="" />
        </div>
        <div className="cloud">
          <img  src={birds} alt="" />
        </div>
       
       
        
       
      </div>
      <div className="text" style={style_text}>
            <div className='d-md-flex justify-content-around align-items-center text-center'>
              <h1 style={{fontSize:'80px',fontWeight:'800',color:"white"}}>Natural <br /> Blend</h1>
              <div>
                <h2 style={{fontSize:'60px',fontWeight:'800',color:"rgba(255,255,255,0.5)"}}>04.</h2>
                <p style={{fontSize:'15px',fontWeight:'300',color:'white'}}>There is no place like the beach, <br /> where the land meets the sea, <br /> and the sea meets the sky.</p>
                </div>
             
            </div>
        
            <div className='d-md-flex justify-content-around align-items-center text-center'>
              <h1 style={{fontSize:'80px',fontWeight:'800',color:"white"}}>Natural <br /> Blend</h1>
              <div>
                <h2 style={{fontSize:'60px',fontWeight:'800',color:"rgba(255,255,255,0.5)"}}>01.</h2>
                <p style={{fontSize:'15px',fontWeight:'300',color:'white'}}>There is no place like the beach, <br /> where the land meets the sea, <br /> and the sea meets the sky.</p>
                </div>
             
            </div>
            <div className='d-md-flex justify-content-around align-items-center text-center'>
              <h1 style={{fontSize:'80px',fontWeight:'800',color:"white"}}>Natural <br /> Blend</h1>
              <div>
                <h2 style={{fontSize:'60px',fontWeight:'800',color:"rgba(255,255,255,0.5)"}}>02.</h2>
                <p style={{fontSize:'15px',fontWeight:'300',color:'white'}}>There is no place like the beach, <br /> where the land meets the sea, <br /> and the sea meets the sky.</p>
                </div>
             
            </div>
            <div className='d-md-flex justify-content-around align-items-center text-center'>
              <h1 style={{fontSize:'80px',fontWeight:'800',color:"white"}}>Natural <br /> Blend</h1>
              <div>
                <h2 style={{fontSize:'60px',fontWeight:'800',color:"rgba(255,255,255,0.5)"}}>03.</h2>
                <p style={{fontSize:'15px',fontWeight:'300',color:'white'}}>There is no place like the beach, <br /> where the land meets the sea, <br /> and the sea meets the sky.</p>
                </div>
             
            </div>
            <div className='d-md-flex justify-content-around align-items-center text-center'>
              <h1 style={{fontSize:'80px',fontWeight:'800',color:"white"}}>Natural <br /> Blend</h1>
              <div>
                <h2 style={{fontSize:'60px',fontWeight:'800',color:"rgba(255,255,255,0.5)"}}>04.</h2>
                <p style={{fontSize:'15px',fontWeight:'300',color:'white'}}>There is no place like the beach, <br /> where the land meets the sea, <br /> and the sea meets the sky.</p>
                </div>
             
            </div>

            <div className='d-md-flex justify-content-around align-items-center text-center'>
              <h1 style={{fontSize:'80px',fontWeight:'800',color:"white"}}>Natural <br /> Blend</h1>
              <div>
                <h2 style={{fontSize:'60px',fontWeight:'800',color:"rgba(255,255,255,0.5)"}}>01.</h2>
                <p style={{fontSize:'15px',fontWeight:'300',color:'white'}}>There is no place like the beach, <br /> where the land meets the sea, <br /> and the sea meets the sky.</p>
                </div>
             
            </div>
        
      </div>
      <div className="person">
        <img height="400" src={slideman[0]} style={{opacity:`${currentperson==0?"1":"0"}`}} alt="" />
        <img height="400" src={slideman[1]} style={{opacity:`${currentperson==1?"1":"0"}`}} alt="" />
        <img height="400" src={slideman[2]} style={{opacity:`${currentperson==2?"1":"0"}`}} alt="" />
        <img height="400" src={slideman[3]} style={{opacity:`${currentperson==3?"1":"0"}`}} alt="" />
      </div>
    </div>
  );

}

export default App
