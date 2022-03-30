import React, {useEffect} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchMeal = async() => {
    try{
    setIsLoading(true);
    const res = await fetch('https://react-http-meal-1e274-default-rtdb.firebaseio.com/meals.json')
    if(!res.ok){
      throw new Error('Somthing went Wrong!')
    }
    const data = await res.json();
    const loadedMeals = [];
    
    for(const key in data){
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description : data[key].description,
        price: data[key].price,
      })
    }
    setMeals(loadedMeals);    
    setIsLoading(false);
  }catch(err){
    setIsLoading(false);
    setHttpError(err.message);
  }
  }
  useEffect(()=>{
    fetchMeal()
  },[])

  if(isLoading){
    return(
      <p style={{color: '#fff', textAlign: 'center'}}>Loading..</p>
    )
  }
  if(httpError){
    return(
      <p style={{color: 'red', textAlign: 'center'}}>{httpError}</p>
    )
  }

    const mealsList = meals.map(meal=> <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/> )
    return (
        <section className={classes.meals}>
            <Card>
            <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;