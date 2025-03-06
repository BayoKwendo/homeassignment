import React from "react";

import { CONFIG } from "../Configs";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-number-input/style.css'
import { Pie, Line, Bar } from '@reactchartjs/react-chart.js'
import { useEffect } from "react";

const Customer = () => {

    // const [mdata, setData] = React.useState([]);

    useEffect(() => {
        onSubmit();
    }, []); // Empty array means this effect runs only once on mount

    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                hoverOffset: 4,
            },
        ],
    };

    const onSubmit = () => {

        axios.post('http://localhost:8000/get-metrics', data, CONFIG).then((response) => {
            console.log(response);
            if (response.data.status) {
            } else {
            }
        }).catch((error) => {
            // setTimeout(() => {
            //     // window.location.reload()
            // }, 5000)
            // console.log(error);
        })
    }


    return (
        <div className="col-6 offset-3">
            <div >
                <h2>Assigment</h2><br />
                <h2>Pie Chart</h2>
                <Pie data={data} />
            </div>

            <div>
                <h2>Line Chart</h2>
                <Line data={data} />
            </div>

            <div>
                <h2>Bar Chart</h2>
                <Bar data={data} />
            </div>
        </div>
    );


}


export default Customer;