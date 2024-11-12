import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
      fetch('http://127.0.0.1:8000/data').then((response) => response.json())
      .then((data) => {
        let totalReturn = 1; 
        const dataWithTotalReturn = data.map((item) => {
          const add1InPercentSpace = 1 + (item.DailyReturn / 100);
          totalReturn *= add1InPercentSpace;
          return {
            ...item,
            Add1InPercentSpace: add1InPercentSpace,
            TotalReturn: (totalReturn - 1) * 100, 
          };
        });

        setData(dataWithTotalReturn);

      }).catch((err) => {
        console.log(err.message);
     });
  }, []);

  const getYearlyTicks = () => {
    return data
      .filter((item) => {
        const date = new Date(item.ReferenceDate);
        return date.getMonth() === 0 && date.getDate() === 2;
      })
      .map((item) => item.ReferenceDate);
  };

  const yearlyTicks = getYearlyTicks();

  return (
    <>
    <div>
      <h1>S&P 500 Total Return Index</h1>
    </div>
    <LineChart width={800} height={500} data={data} margin={{left: 70, right: 30, top: 20, bottom:20}}>
        <Line type="monotone" dataKey="TotalReturn" stroke="#8884d8" dot={false} />
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="ReferenceDate"
          tickFormatter={(date) => new Date(date).toLocaleDateString()}
          ticks={yearlyTicks} 
          padding={{ top: 10 }}
          label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
        />
        <YAxis domain={['auto']} label={{value: 'Total Return', position: 'insideLeft', offset: -70}}/>
        <Tooltip 
            content={({ payload, label }) => {
            if (payload && payload.length) {
              const date = new Date(label); 
              const formattedDate = date.toISOString().split('T')[0]; 
              const totalReturn = payload[0].value;  
              return (
                  <div className="custom-tooltip">
                    <p>{formattedDate}</p> 
                    <p>Total Return: {totalReturn.toFixed(2)}%</p>  
                  </div>
              );
            }
            return null;
            }} 
        />
    </LineChart>
    </>
  )
}         

export default App
