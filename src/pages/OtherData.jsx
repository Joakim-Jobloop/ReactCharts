import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";

export const OtherData = () => {
  const url = "https://data.ssb.no/api/v0/dataset/1076.json?lang=no";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const ageSpan = 106;
      const futherData = data.dataset;
      console.log(futherData.dimension.Region.category);

      const fullPopulationArray = data.dataset.value;
      console.log(fullPopulationArray);
      const newArrayLength = Math.ceil(fullPopulationArray.length / ageSpan);
      const populationByRegion = Array.from(
        { length: newArrayLength },
        (_, index) =>
          fullPopulationArray.slice(index * ageSpan, (index + 1) * ageSpan)
      );
      console.log(populationByRegion);


      const regionIndexes = futherData.dimension.Region.category.index;
      const regionNames = futherData.dimension.Region.category.label;
      const combinedObject = {};
      for (const index in regionIndexes) {
        combinedObject[index] = {
          value: regionIndexes[index],
          label: regionNames[index],
        };
      }
      console.log(combinedObject);
      const fixedObject = Object.fromEntries(
        Object.entries(combinedObject).map(([id, { value, label }]) => [
          value,
          { id, label },
        ])
      );
      console.log(fixedObject);
      const addInPopulation = populationByRegion.map((region) => {
        return region.map((_, index) => {
          return { ...fixedObject[index], ...populationByRegion[index] };
        });
      });
      console.log(addInPopulation);

      // console.log(populationByRegion)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <h1>PopulationAgesPage</h1>
      <section className="flex w-[1000px] flex-wrap items-center justify-center gap-16"></section>
    </DashboardLayout>
  );
};
