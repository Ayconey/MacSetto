import axios from 'axios'
import React, { useEffect, useState, useSyncExternalStore } from 'react'
import {Row,Col,Button} from 'react-bootstrap'
import "../css/caloriecalc.css"

export default function CalorieCalc(props) {
    //states
    const [Meal,updateMeal] = useState([])
    const [Products,UpdateProducts] = useState([])
    const [Name,updateName] = useState('')
    const [Res,updateRes] = useState({
        Calories:0,
        TotalFat:0,
        Carbohydrates:0,
        Protein:0,
        SaturatedFat:0,
        TransFat:0,
        Cholesterol:0,
        Sugars:0,
        DietaryFiber:0,
        VitADaily:0,
        VitCDaily:0,
        CalciumDaily:0,
        IronDaily:0,
        Sodium:0,
    })
    const getProducts = () => {
        const headers = {
            'Content-type':'application/json',
        }
        axios.get(`${props.url}menu/?name=${Name}`,{headers:headers})
        .then(response=>{
            UpdateProducts(response.data)
        })
        .catch(error=>{console.log(error)})
  }

    const FormSubmit = (event) => {
        event.preventDefault()
        updateName(event.target.name.value)
        const headers = {
            'Content-type':'application/json',
        }
        axios.get(`${props.url}menu/?name=${event.target.name.value}`,{headers:headers})
        .then(response=>{
            UpdateProducts(response.data)
        })
    }
    const CalculateCalories = () => {
        let tmpRes = {
            Calories:0,
            TotalFat:0,
            Carbohydrates:0,
            Protein:0,
            SaturatedFat:0,
            TransFat:0,
            Cholesterol:0,
            Sugars:0,
            DietaryFiber:0,
            VitADaily:0,
            VitCDaily:0,
            CalciumDaily:0,
            IronDaily:0,
            Sodium:0,
        }
        for(let item of Meal){
            console.log(item)
            for (const [key, value] of Object.entries(item)){
                tmpRes[key] = tmpRes[key]+parseFloat(value)
            }
        }
        updateRes(tmpRes)
    }
    const AddItem = (item)=>{
        let new_item = Meal.concat(item)
        updateMeal(new_item)
    }

  useEffect(()=>{
    getProducts()
  },[])

  return (
    <div>
        <Row>
            <Col xs={1}></Col>
            <Col>
                <div id="productAdd">
                    <form onSubmit={FormSubmit}>
                    <h3><input placeholder="product's name" name='name' /> <Button id='btsButton' type='submit'>search</Button></h3>
                    </form>
                    
                    <div id="products">
                        {Products.map((item)=>(
                            <div key={item.id}>
                                <h4>{item.Name} <Button id='btsButton' onClick={()=>{AddItem(item)}}>add</Button> </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </Col>
            <Col>
                <div id="meal">
                    <h2>Your Meal</h2>
                    {Meal.map((item)=>(
                        <div key={item.id}>
                            <h4>{item.Name}</h4>
                            <p>{item.Calories}kcal  C: {item.Carbohydrates}g  P: {item.Protein}g  F: {item.TotalFat}g</p>
                        </div>
                    ))}
                    <Button onClick={()=>{CalculateCalories()}}>Calculate</Button>
                </div>
                <div id='res'>
                    <h2>Results</h2>
                    <h3>Calories: {Res.Calories} kcal</h3>
                    <h3>Fat: {Res.TotalFat} g</h3>
                    <h3>Carbohydrates: {Res.Carbohydrates} g</h3>
                    <h3>Protein: {Res.Protein} g</h3>
                    <h3>SaturatedFat: {Res.SaturatedFat} g</h3>
                    <h3>TransFat: {Res.TransFat} g</h3>
                    <p>recommended daily max( 1% of calories ): {(Res.Calories *0.001).toFixed(2)} g</p>
                    <h3>Cholesterol: {Res.Cholesterol} mg</h3>
                    <p>recommended daily max: 300 mg</p>
                    <h3>Sugars: {Res.Sugars} g</h3>
                    <p>recommended daily max: 26 g</p>
                    <h3>Dietary Fiber: {Res.DietaryFiber} g</h3>
                    <h3>Vit. A Daily: {Res.VitADaily} %</h3>
                    <h3>Vit. C Daily: {Res.VitCDaily} %</h3>
                    <h3>Calcium Daily: {Res.CalciumDaily} %</h3>
                    <h3>Iron Daily: {Res.IronDaily} %</h3>
                    <h3>Sodium: {Res.Sodium} mg </h3>
                    <p>recommended daily max: 2300 mg </p>
                </div>
            </Col>
            <Col xs={1}></Col>
        </Row>
        
    </div>
  )
}
