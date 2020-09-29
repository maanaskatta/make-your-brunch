import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {dishURL} from './URLList';

class Dashboard extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            results: [],
        }

        this.dispSearchDish = this.dispSearchDish.bind(this);
        this.hideSearchDish = this.hideSearchDish.bind(this);

    }

    hideSearchDish()
    {
        document.getElementById('dish-list').style.display = "none";     
    }

    dispSearchDish()
    {
        document.getElementById('dish-list').style.display = "block";
    
        var text = document.getElementById('search-box').value;  
  
        
        const disp = async (text) => {
            const res = await fetch(dishURL);
            const dishes = await res.json();
            
            let matches = dishes.filter(dish => {
                const regex = new RegExp(`^${text}`,'gi');

                return dish.dishName.match(regex);
            });

            if(text.length === 0)
            {
                matches = [];
            }else{
                outputHTML(matches);
            }

            
        }

        const outputHTML = (matches) => {

            if(matches.length > 0)
            { 
                this.setState({
                    results : matches
                })                
            } 
        }

        disp(text);
    }


    

    render()
    {
        return(
            <div id="dashboard-jumbotron" className="jumbotron">
                <div id="overlay">
                    <div className="container">
                        <div id="title" className="row">
                            <div className="col-12 col-sm-2 order-first">
                                <p id="title-text">MAKE YOUR BRUNCH</p>
                            </div>
                            <div id="search" className="col-12 col-sm-4 offset-sm-2 mt-3 mt-sm-5 order-last">
                                <i id="find-icon" className="fa fa-search fa-lg" aria-hidden="true"></i>
                            <input id='search-box' /*onBlur={this.hideSearchDish}*/ onChange={this.dispSearchDish}  className="form-control" type="text" placeholder='Looking for a dish?...' autoComplete="off"/>
                            
                            <div id="dish-list">
                                {this.state.results.map(result => {
                                    return(
                                        <div id='dish-card' class="card card-body mb-1 bg-secondary text-white">
                                            <h4 >{result.dishName}</h4>
                                            <small>{result.authorName}</small>
                                            <Link to={`/getDish/${result.dishId}`}><Button className="badge badge-danger" color="danger">Cook Now!</Button></Link>
                                        </div>
                                    );
                                })}
                            </div>
                            </div>
                        </div>
                        <br/>                   
                    </div>
                </div>            
            </div>
        );
    }
}

export default Dashboard;