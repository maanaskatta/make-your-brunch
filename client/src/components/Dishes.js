import React, {Component} from 'react';
import { Button, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';
import {dishURL} from './URLList';



class Dishes extends Component
{

    constructor(props)
    {
        super(props);

        this.state={
            dishes: []
        }


    }

    // const repsonse = await fetch(dishURL);
    // const data = await repsonse.json();
    componentDidMount()
    {       
        fetch(dishURL)
        .then(response => response.json())
        .then((data) => {   
            this.setState({ dishes: data }); 
        });
    }


    render()
    {   
        console.log(this.state.dishes);
        return(         
                            
            <div id="dishesArea" className="container">
                {this.state.dishes.map(dish =>{
                    return(
                        <div key={dish.dishId} className="row mb-5">
                            <Card id="dish-Cards" className="col-10 col-sm-8 m-auto">
                                <CardImg height="280" className="mt-2" top src={dish.dishImage} alt={dish.dishName}/>
                                <CardBody>
                                    <CardTitle className="text-danger"><h3>{dish.dishName}</h3></CardTitle>
                                    <CardSubtitle><h6><span className="text-info">Chef :</span> <span className="text-warning">{dish.authorName}</span></h6></CardSubtitle>
                                    <CardText>{dish.dishDescription}</CardText>
                                    <Link to={`/getDish/${dish.dishId}`}><Button className="btn btn-danger">Cook Now!</Button></Link>
                                </CardBody>
                            </Card>
                        </div>
                    );
                })}                    
            </div>            
        );
    }
}

export default Dishes;