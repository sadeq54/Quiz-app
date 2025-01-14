// lesson 196 add the progress bar 
// adding the use effect for both timeout and interval bu ther is 
// a problem with the interval and the timeout that  will be fixed in the next lesson 
import {useEffect, useState} from 'react';
export default function Progressbar({onTimeOut, timeOut , mode }) {
    const [intervaleTime, setIntervaleTime] = useState(timeOut);

  
    useEffect(() => {
     const timer = setTimeout(() => {
        if(onTimeOut !==null)
          onTimeOut ();
        
      }, timeOut);
      
      return () => {

        clearTimeout(timer);
      }
    },[timeOut, onTimeOut]);


    useEffect(() => {
        const interval =  setInterval(() => {
          setIntervaleTime((prevIntervaleTime) => prevIntervaleTime - 100);
        }, 100);
        return () =>{

          clearInterval(interval);
        } 
        // clear interval will be excuted when the component unmount , before the setIntervaleTime
        // gets executed again
      }, []);

      return (
        
        <progress
          max={timeOut}
           value={intervaleTime}
              id='question-timer'
              className={mode} />

        
    )

}
