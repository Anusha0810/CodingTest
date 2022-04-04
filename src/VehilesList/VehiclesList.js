import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as moment from 'moment';

const VehiclesList = (props) => {
    const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];
    const [allData, setAllData] = useState([]);
    const [filterd, setFilterd] = useState([]);
    const [counties, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState({});

    const getData = () => {
        setIsLoading(true);
        axios.get('http://localhost:5132/api/Vechicles').then(res => {
            let data = res.data || [];
            data.sort((a, b) => a.createdOn > b.createdOn ? 1 : -1);
            data.forEach(x => { x.createdOn = format(x.createdOn) });
            let countryData = data.map(x => x.country).filter((x, i, a) => a.indexOf(x) == i);
            setCountries(countryData);
            setAllData(data)
            setFilterd(data)
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.log(err)
        })
    }
    const format = (dt, format = 'MM/DD/YYYY') => {
        return moment(dt).format(format);
    }
    const applyFilter = (e) => {

        setFilter(f => {
            f[e.target.name] = e.target.value;
            filterData(f);
            return f;
        })
    }
    const filterData = (filter) => {
        const keys = ['name', 'wmi', 'country', 'createdOn', 'vehicleType'];
        let data = allData.filter(row => (!filter.search ||
            keys.some(k =>
                (row[k] || '').toString().toLowerCase().includes(filter.search.toLowerCase())
            )
        ) && (!filter.country || row.country == filter.country));
        setFilterd(data);
    }
    useEffect(() => {
        getData();
    }, [])

    return <div>
        <header>WMI Data - Honda | Total: {allData.length} | Filtered: {filterd.length}</header>
        <div className="filters mb-2">
            <div className="row">
                <div className="col-md-6">
                    <input id="search" name="search" placeholder="Search.." onChange={applyFilter} />
                </div>
                <div className="col-md-6">
                    <select name="country" id="country" onChange={applyFilter} >
                        {counties.map(c => <option key={c} value={c}>{c || 'View All'}</option>)}
                    </select>
                </div>
            </div>
        </div>
        <div className="list">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>WMI</th>
                        <th>Country</th>
                        <th>Created On</th>
                        <th>Vechicle Type</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <tr><td colSpan="5">Loading ...</td> </tr>}
                    {filterd.map(row => <tr key={row.wmi}>
                        <td>{row.name}</td>
                        <td>{row.wmi}</td>
                        <td>{row.country}</td>
                        <td>{row.createdOn}</td>
                        <td>{row.vehicleType}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
}

export default VehiclesList;
