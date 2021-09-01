import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Form, Button, Collapse, Container, Row } from 'react-bootstrap';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa'
import getIcon, { getIconIndex } from '../../assets/icons';
import connection from '../../services/connection';
import { enumToStringArray, MarkerIcon } from '../../enums';
import { useHistory } from 'react-router-dom';
import 'leaflet.awesome-markers'; 

export default function Map(props: MapProps) {
  const history = useHistory();
  const [selectedJob, setSelectedJob] = useState<number>(-1);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [job, setJob] = useState<Job>();
  const [jobsResult, setJobsResult] = useState<Job[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [search, setSearch] = useState<string>("");
  const position = { lat: -5.1133, lng: -36.6348 };

  const getSelectedJob = useCallback(() => {
    for (let i in jobs) {
      if (jobs[i].id === selectedJob) {
        return jobs[i];
      };
    };

    return undefined;
  }, [jobs, selectedJob]);

  useEffect(() => {
    connection.get('/jobs').then((res) => {
      setJobs(res.data);
      setJobsResult(res.data);
    }).catch(() => { });
  }, []);

  useEffect(() => {
    let _jobs = [...jobs].filter((v, i) => {
      let values = v.icon.split(":");
      if (v.name.includes(search) && (filters[`${values[2]}`] || filters[`${values[2]}`] === undefined)) {
        return true;
      }
      return false;
    });
    setJobsResult([..._jobs]);
  }, [jobs, search, filters]);

  useEffect(() => {
    setJob(getSelectedJob());
  }, [getSelectedJob]);

  function onChangeFilter(e: ChangeEvent<HTMLInputElement>) {
    let name = e.currentTarget.name;
    let value = e.currentTarget.checked;
    setFilters({ ...filters, [name]: value });
  };

  return (
    (props.ph || 0) > 0 &&
      (props.mh || 0) > 0 &&
      (props.ph || 0) === props.dimensions.h ?
      <MapContainer id="map"
        style={{ width: '100vw', height: (props.ph || 0) - (props.mh || 0) }}
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <div className="map-search" onDoubleClick={(e) => e.stopPropagation()}>
          <Form.Control
            type="text"
            name="search"
            value={search}
            placeholder="Pesquisar pelo nome"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
          />
          <Button onClick={() => { setShowFilters(!showFilters) }} variant={!showFilters ? "danger" : "dark"}>
            {!showFilters ? <FaChevronDown size={15} color="white" /> :
              <FaChevronUp size={15} color="white" />}
          </Button>
          <Collapse in={showFilters}>
            <Container fluid id="filters">
              <Row>
                <Form>
                  {enumToStringArray(MarkerIcon).map((m, i) => {
                    let values = m.split(":");
                    return <Form.Check
                      key={`job-filter-${i}`}
                      name={values[2]}
                      checked={filters[`${values[2]}`] || filters[`${values[2]}`] === undefined}
                      type="checkbox"
                      label={values[2]}
                      onChange={onChangeFilter}
                    />;
                  })}
                </Form>
              </Row>
            </Container>
          </Collapse>
          {job && <div id="info">
            <Button id="open" onClick={() => history.push({ pathname: "/jobs/info", state: job })}>
              Abrir página
            </Button>
            <Button id="close" onClick={() => setSelectedJob(-1)}>
              <FaTimes size={25} />
            </Button>
            <h3>
              {job.name} | {job.icon.split(":")[2]}
            </h3>
            {job.description && <p>
              {job.description}
            </p>}
          </div>}
        </div>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          jobsResult.map((m, i) => {
            let iconIndex = getIconIndex(m.icon) as number;
            let icon = getIcon(iconIndex);

            if (m.id === selectedJob) {
              icon = getIcon(iconIndex, `black:info:${icon[1]}`);
            };

            return (
              <Marker key={`marker-${i}`} icon={icon[0]} position={{ lat: m.lat, lng: m.lng }} eventHandlers={{
                click: () => {
                  setSelectedJob(m.id ? m.id : -1);
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