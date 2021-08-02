import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { MapContainer, Marker,  TileLayer } from 'react-leaflet';
import getIcon, { getIconIndex } from '../../assets/icons';
import connection from '../../services/connection';

export default function Map(props: MapProps) {
  const [selectedJob, setSelectedJob] = useState<number>(-1);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsResult, setJobsResult] = useState<Job[]>([]);
  const [search, setSearch] = useState<string>("");
  const position = { lat: -5.1133, lng: -36.6348 };

  useEffect(() => {
    connection.get('/jobs').then((res) => {
        setJobs(res.data);
        setJobsResult(res.data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    let _jobs = jobs.filter((v, i) => {
      if(v.name.includes(search)){
        return true;
      }
      return false;
    });
    setJobsResult(_jobs);
  }, [search]);

  return (
    (props.ph || 0) > 0 &&
    (props.mh || 0) > 0 &&
    (props.ph || 0) === props.dimensions.h ?
    <MapContainer id="map"
      style={{ width: '100vw', height: (props.ph || 0) - (props.mh || 0) }}
      center={position}
      zoom={15}
      scrollWheelZoom={true}
    >
      <div className="map-search">
        <Form.Control
          type="text"
          name="search"
          value={search}
          placeholder="Pesquisar pelo nome"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)} 
        />
      </div>
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        jobsResult.map((m, i) => {
          let iconIndex = getIconIndex(m.icon) as number;
          let icon = getIcon(iconIndex);

          if(m.id === selectedJob){
            icon = getIcon(iconIndex, `black:info:${icon[1]}`);
          };

          return(
            <Marker key={`marker-${i}`} icon={icon[0]} position={position} eventHandlers={{
              click: () => {
                setSelectedJob(m.id? m.id:-1);
              }
            }}>
              
            </Marker>
          );
        })
      }
    </MapContainer> : null
  );
};

/*
  
*/