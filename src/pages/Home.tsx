
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from 'react';
import { Menu } from './components/Menu';
import Map from "./components/Map";
import { useDimensions } from "../hooks/useDimensions";

export default function HomePage() {
    const dimensions = useDimensions();
    const [mh, setMh] = useState(0);
    const [ph, setPh] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if(menuRef.current && pageRef.current){
            let _mh = menuRef.current?.clientHeight;
            let _ph = pageRef.current?.clientHeight;

            if(_ph !== dimensions.h){
                _ph = dimensions.h;
            };

            setMh(_mh);
            setPh(_ph);
        };
    }, [dimensions]);

    return (
        <div style={{ width: dimensions.w, height: dimensions.h }} ref={pageRef}>
            <Menu ref={menuRef}/>
            <Map dimensions={dimensions} mh={mh} ph={ph}/>
        </div>
    );
};