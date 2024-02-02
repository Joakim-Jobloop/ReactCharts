import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Population Ages Chart",
    },
  },
};

export const PopulationAgesPage = () => {
    const [chartData, setChartData] = useState([]);
    const [maxPopulation, setMaxPopulation] = useState(null);
    const [maxPopulationIndex, setMaxPopulationIndex] = useState(null);
    const [averageAge, setAverageAge] = useState(null);
    const url = "https://data.ssb.no/api/v0/dataset/1074.json";
  
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log(data.dataset);
        const population = data.dataset.value;
        console.log(population);
        setChartData(population);

        const maxPopulationValue = Math.max(...population);
        const maxPopulationValueIndex = population.indexOf(maxPopulationValue);
  
        setMaxPopulation(maxPopulationValue);
        setMaxPopulationIndex(maxPopulationValueIndex);


        const sumOfAges = population.reduce((acc, count, age) => acc + age * count, 0);
        const totalPopulation = population.reduce((acc, count) => acc + count, 0);
        const average = sumOfAges / totalPopulation;
        setAverageAge(average);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const data = {
      labels: chartData.map((entry, index) => `Age ${index + 1}`),
      datasets: [
        {
          fill: true,
          label: "Population",
          data: chartData,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

  return (
    <DashboardLayout>
      <h1>PopulationAgesPage</h1>
      <section className="flex w-[1000px] flex-wrap items-center justify-center gap-16">
        {/* {chartData.map((data, index) => {
            return (
                <div className="grid gap-4 p-8 border" key={`data for age: ${index}`}>
                    <p>age: {index}</p>
                <p>population: {data}</p>
                </div>
            )
        })} */}
        {/* <Doughnut data={chartData} /> */}
        <Line className="" options={options} data={data} />
        {/* <Bar data={data} /> */}
        <div>
          <h2>The largest population by age:</h2>
        <p>Age: {maxPopulationIndex}</p>
        <p>People: {maxPopulation}</p>
        </div>
        <div>
          <h2>Average Age:</h2>
          <p>{averageAge.toFixed(1)} years old</p>
        </div>
      </section>
    </DashboardLayout>
  );
};
