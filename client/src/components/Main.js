    import React, {Component} from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';



import Header from './Header';
import Dashboard from './Dashboard'
import Dishes from './Dishes';
import DishDetail from './DishDetail';
import ContactUs from './ContactUs';

class Main extends Component
{    

    // componentDidMount()
    // {
    //     tempGet().catch(console.log('Error in Main'));
    //     async function tempGet()
    //     {
    //         const response = await fetch('http://localhost:5000/api/dishes/10');
    //         const data = await response.json();
    //         console.log(data);
    //     }
    // }

    render()
    {
        const MainBody = () => 
        {
            return(
                <div>
                    <Header/>
                    <Dashboard/>
                    <Dishes/>
                </div>
            );

        }

        return(
            <Switch>
                <Route exact path="/home" component={MainBody} />
                <Route path="/getDish" component={()=> <DishDetail/>}/>
                <Route path="/contactus" component={()=> <ContactUs/>}/>
                <Redirect to="/home"/>

            </Switch>
        );
    }
}

export default Main;