import React, { useState } from 'react'
import { Button,Row,Col,Dropdown,DropdownButton } from 'react-bootstrap'
import '../css/home.css'
import axios from 'axios'

export default function Home(props) {
  const [CatMain,updateCatMain] = useState('Beef & Pork')
  const [CatAdd,updateCatAdd] = useState('None')
  const [CatDrink,updateCatDrink] = useState('None')
  const [Set,updateSet] = useState({
    'main':[],
    'add':[],
    'drink':[]
  })

  const FormSubmit = (event)=>{
    event.preventDefault()
    const headers = {
      'Content-type':'application/json',
  }
    axios.post(`${props.url}menu/createSet/`,{
      cat_main:CatMain,
      cat_add:CatAdd,
      cat_drink:CatDrink,
      cal_min:event.target.cal_min.value,
      cal_max:event.target.cal_max.value,
    },{headers:headers})
    .then(response=>{
      console.log(response)
      updateSet(response.data.set)
    })
  }
  const SumCalories = () => {
    let calories = 0
    let protein = 0
    for(const item of Set.main){
      calories = calories + item.Calories
      protein = protein + item.Protein
    }
    for(const item of Set.add){
      calories = calories + item.Calories
      protein = protein + item.Protein
    }
    for(const item of Set.drink){
      calories = calories + item.Calories
      protein = protein + item.Protein
    }
    return [calories,protein]
  }
  return (
    <div>
      <div id='filter'>
        <h1>Make Your Food Set!</h1>

        <form onSubmit={FormSubmit}>
        <Row>
          <Col>
            <h2>Main</h2>
            <DropdownButton id="dropdown-basic-button" title="Category" name="cat_main">
                <Dropdown.Item onClick={()=>{updateCatMain('Breakfast')}}>Breakfast</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCatMain('Beef & Pork')}}>Beef & Pork</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCatMain('Chicken & Fish')}}>Chicken & Fish</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCatMain('Salads')}}>Salads</Dropdown.Item>
            </DropdownButton>
            <p>{CatMain}</p>
          </Col>
          <Col>
            <h2>Additions</h2>
            <DropdownButton id="dropdown-basic-button" title="Category" name="cat_add">
                <Dropdown.Item onClick={()=>{updateCatAdd('None')}}>None</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCatAdd('Snacks & Sides')}}>Snacks & Sides</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCatAdd('Desserts')}}>Desserts</Dropdown.Item>
            </DropdownButton>
            {CatAdd}
          </Col>
          <Col>
            <h2>Something to drink</h2>
            <DropdownButton id="dropdown-basic-button" title="Category" name="cat_drink">
                <Dropdown.Item onClick={()=>{updateCatDrink('None')}}>None</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCatDrink('Beverages')}}>Beverages</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCatDrink('Coffee & Tea')}}>Coffee & Tea</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCatDrink('Smoothies & Shakes')}}>Smoothies & Shakes</Dropdown.Item>
            </DropdownButton>
            {CatDrink}
          </Col>
        </Row>
        
          <h3>Calories min. : <input name='cal_min' defaultValue={400}/></h3>
          <h3>Calories max. : <input name='cal_max' defaultValue={600}/></h3>
          
          <br></br>
          <p>Minimum Calories to create set is 540</p>
          <br></br>
          <Button type='submit'>OK</Button>
        </form>

      </div>
      <div id='set'>
        <h1>Your Set</h1>
        <Row id='setItems'>
          <Col>
            {Set.main.map((item)=>(
              <div>
                <h2>{item.Name}</h2>
                <h3>calories: {item.Calories} kcal</h3>
                <h3>proteins: {item.Protein} g</h3>
              </div>
              
            ))}
          </Col>
          <Col>
            {Set.add.map((item)=>(
              <div>
                <h2>{item.Name}</h2>
                <h3>calories: {item.Calories} kcal</h3>
                <h3>proteins: {item.Protein} g</h3>
              </div>
              
            ))}
          </Col>
          <Col>
            {Set.drink.map((item)=>(
              <div>
                <h2>{item.Name}</h2>
                <h3>calories: {item.Calories} kcal</h3>
                <h3>proteins: {item.Protein} g</h3>
              </div>
              
            ))}
          </Col>
          <div id='sum'>
            <h2>In Total</h2>
            <h3>calories:{SumCalories()[0]}  kcal</h3>
            <h3>proteins:{SumCalories()[1]}  g</h3>
          </div>
        </Row>
      </div>
    </div>
  )
}
