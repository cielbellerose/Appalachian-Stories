import map from "../resources/APPA_Map-1.png";
import mappify from "../modules/mappify";
import MapImageDot from "./MapImageDot";
import { useRef, useEffect, useState } from "react";

export default function Map({url}) {
  const [mapDots,setMapDots] = useState(() => [])
  const mapImg = useRef(null);
  console.log("Starting Map componant for url", url);

  //getAPIitems from URL
  useEffect(() => {
    fetch(url)
    .then(r => r.json())
    .then((data) => console.log(data));
  },[])


  const scale = .908
  return (
    //709.549 3355.049"
    <div className="map">
      <img ref={mapImg}  src={map}></img> 
      <svg  viewBox={`0 0 ${700.549 * scale} ${3455.049 * scale}`}>
        {/* <MapImageDot ID={1} X={200} Y={20} onClick={()=>{}}/> */}
        <path
          transform="translate(-36,-20)"
          stroke="green"
          fill="none"
          strokeWidth="1"
          d={mappify.ATPath}
        ></path>
      </svg>
    </div>
  );
}
