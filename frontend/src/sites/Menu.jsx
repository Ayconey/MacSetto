import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {Button,Row,Col} from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../css/menu.css'


export default function Menu(props) {
    const [Products,UpdateProducts] = useState([])
    const [Category,updateCategory] = useState('')
    const [SortBy,updateSortBy] = useState('')
    const [Name,updateName] = useState('')

    
    let Menu = () => {
        return <div id='menu'>
        <ul>
        {Products.map((item)=>(
            <div key={item.id} className='menu-item'>
                <li>
                    <h3>{item.Name}</h3>
                    <div className='li-content'>
                        <Row>
                            <Col xs={1}></Col>
                            <Col>
                                <p>category: {item.Category}</p>
                                <p>calories: {item.Calories} kcal</p>
                                <p>fat: {item.TotalFat} g</p>
                                <p>carbohydrates: {item.Carbohydrates} g</p>
                                <p>protein: {item.Protein} g</p>
                            </Col>
                            <Col>
                                <p>saturated fat: {item.SaturatedFat} g</p>
                                <p>trans fat: {item.TransFat} g</p>
                                <p>cholesterol: {item.Cholesterol} mg</p>
                                <p>sugars: {item.Sugars} g</p>
                                <p>dietary fiber: {item.DietaryFiber} g</p>
                            </Col>
                            <Col>
                                <p>vit. A daily: {item.VitADaily} %</p>
                                <p>vit. C daily: {item.VitCDaily} %</p>
                                <p>Calcium daily: {item.CalciumDaily} %</p>
                                <p>Iron daily: {item.IronDaily} %</p>
                                <p>sodium: {item.Sodium} mg</p>
                                
                            </Col>
                            <Col xs={5}></Col>
                        </Row>
                    
                    
                    </div>
                </li>
            </div>
        ))}
        </ul>
    </div>
    }
    
    const getProducts = () => {
        const headers = {
            'Content-type':'application/json',
        }
        axios.get(`${props.url}menu/?category=${''}&name=${''}`,{headers:headers})
        .then(response=>{
            UpdateProducts(response.data)
        })

  }

    const FormSubmit = (event) => {
        event.preventDefault();
        updateName(event.target.name.value);

        const headers = {
            'Content-type':'application/json',
        }
        axios.get(`${props.url}menu/?category=${Category}&name=${event.target.name.value}&sortby=${SortBy}`,{headers:headers})
        .then(response=>{
            UpdateProducts(response.data)
        })
    }

  useEffect(()=>{
    getProducts();
    
},[])

  return (
    <div>
        <div id='header'>
            <h1>Menu</h1>
            <p>Menu of the MacDonald's restaurant with shown nutrition</p>
        </div>
        <form onSubmit={FormSubmit}>
        <div id='filter'>
            <DropdownButton id="dropdown-basic-button" title="Category" name="categ">
                <Dropdown.Item onClick={()=>{updateCategory('')}}>All</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCategory('Breakfast')}}>Breakfast</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCategory('Beef & Pork')}}>Beef & Pork</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCategory('Chicken & Fish')}}>Chicken & Fish</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCategory('Salads')}}>Salads</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCategory('Snacks & Sides')}}>Snacks & Sides</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCategory('Desserts')}}>Desserts</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCategory('Beverages')}}>Beverages</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCategory('Coffee & Tea')}}>Coffee & Tea</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateCategory('Smoothies & Shakes')}}>Smoothies & Shakes</Dropdown.Item>
            </DropdownButton>
            <p>Category: {Category}</p>
            <br></br>
            <br></br>
            <DropdownButton id="dropdown-basic-button" title="Sort by" name="categ">
                <Dropdown.Item onClick={()=>{updateSortBy('')}}>None</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateSortBy('Cal_desc')}}>Calories descending</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateSortBy('Cal_asc')}}>Calories ascending</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateSortBy('Protein')}}>Protein</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateSortBy('Fat_desc')}}>Fat descending</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateSortBy('Fat_asc')}}>Fat ascending</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateSortBy('Sugar_desc')}}>Sugar descending</Dropdown.Item>
                <Dropdown.Item onClick={()=>{updateSortBy('Sugar_asc')}}>Sugar ascending</Dropdown.Item>
            </DropdownButton>
            <p>Sort by: {SortBy}</p>
            <br></br>
            <br></br>
            <h4>Name: <input placeholder="product's name" name='name' /></h4>
            <Button type='submit' id='btsButton'>ok</Button>
        </div>
        
        </form>
        <Menu />
    </div>
  )
}
