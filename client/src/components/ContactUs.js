import React, {Component} from 'react';
import {Card, Input} from 'reactstrap';
import {Link} from 'react-router-dom';

import Header from './Header';

class ContactUs extends Component
{
    render()
    {
        return(
            <div>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="breadcrumb">
                                <Link className="breadcrumb-item" to="/home">Home</Link>
                                <span id="breadCrumbDishName" className="breadcrumb-item active">Contact Us</span>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div id="contact-us-title" className="col-12">
                            <h1>Contact Us</h1>                            
                        </div>
                    </div>
                   
                    <br/>
                    <div className="row mb-3">
                        <Card className="col-10 offset-1 col-sm-6 offset-sm-3">
                            
                               <div className="row mb-3">                                   
                                    <div className="col-12">
                                        <span id="contact-form-icons" className="fa fa-user fa-lg"></span>
                                        <Input type="text" name="name" id="name" placeholder="Name"/>                                        
                                    </div>                                   
                               </div>
                               <div className="row mb-3">                                   
                                    <div className="col-12">
                                        <span id="contact-form-icons" className="fa fa-envelope fa-lg"></span>
                                        <Input type="email" name="email" id="email" placeholder="Email"/>                                        
                                    </div>                                   
                               </div>
                               <div className="row mb-3">                                   
                                    <div className="col-12">
                                        <span id="contact-form-icons" className="fa fa-phone fa-lg"></span>
                                        <Input type="text" name="phnNum" id="phnNum" placeholder="Mobile Number"/>                                        
                                    </div>                                   
                               </div>
                               <div className="row mb-3">                                   
                                    <div className="col-12">
                                        <span id="contact-form-icons" className="fa fa-pencil fa-lg"></span>
                                        <textarea className="form-control" type="textarea" name="message" id="message" placeholder="Message" rows="6"/>                                        
                                    </div>                                   
                               </div>
                               <br/>
                               <div className="row mb-3">                                   
                                    <div className="col-12">
                                        <input className="form-control bg-info text-white" type="button" value="SUBMIT"/>                                        
                                    </div>                                   
                               </div>                            
                   
                        </Card>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default ContactUs;