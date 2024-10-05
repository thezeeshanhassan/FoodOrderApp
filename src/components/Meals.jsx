import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import MealItem from "./MealItem.jsx";
export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3000/meals");
      setLoadedMeals(response.data);
    }

    fetchData();
  }, []);

  return (
    <>
      <ol id="meals">
        {loadedMeals.map((meal) => {
          return <MealItem meal={meal}></MealItem>;
        })}
      </ol>
    </>
  );
}
