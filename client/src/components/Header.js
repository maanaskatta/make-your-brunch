import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Modal, ModalHeader, Button, ModalBody, Input, Label} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {dishURL} from './URLList';

import {storage} from '../firebase/index';

var dishFile = {};



class Header extends Component
{
    constructor(props)
    {
        super(props); 
        
        this.state={
            isNavOpen : false,
            isModalOpen: false,
            imgurl: null,

        }

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openAlert = this.openAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    } 

    

    onChangeHandler(event){
        event.preventDefault();
        dishFile = event.target.files[0];
        console.log(dishFile);

    }

    openAlert()
    {
        document.getElementById('feedback').style.display="block";
    }

    

    closeAlert()
    {
        document.getElementById('feedback').style.display="none";
        //window.location.reload();

    }

    
    toggleNav()
    {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        })
    }

    toggleModal()
    {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }


    handleSubmit(event)
    {   
        var authorName = document.getElementById('authorName').value;
        var dishName = document.getElementById('dishName').value;
        var dishDescription = document.getElementById('description').value;
        var ingredients = document.getElementById('ingredients').value;
        var dishProcedure = document.getElementById('procedure').value;
        var difficulty = document.getElementById('difficulty').value;
        var yeilds = document.getElementById('yeilds').value;
        var prepTime = document.getElementById('prepTime').value;   

        if(dishFile.size !== undefined && authorName.length!== 0 && dishName.length!== 0 && dishDescription.length!== 0 && ingredients.length!== 0 && dishProcedure.length!== 0 && difficulty.length!== 0  && yeilds.length!== 0 && prepTime.length!== 0)
        {            
            const currDate = Date.now();
            const uploadImageName = dishFile.name + currDate;
            const uploadTask = storage.ref(`uploads/${uploadImageName}`).put(dishFile);
            uploadTask.on('state_changed',
            (snapshot)=>{

            },
            (error)=>{
                console.log(error);
            },  
            ()=>{
                storage.ref('uploads').child(uploadImageName).getDownloadURL().then(url => {
                    
                    this.setState({
                        imgurl : url
                    });
                    console.log("The image URL is :" + this.state.imgurl);
                    const dish_url = url;
                    sendData(dish_url);
                })
            });
            this.toggleModal();
            document.getElementById('loaderIcon').style.display = "block";
            //this.openAlert();  
        }
        else{

            alert("Fill all the contents");
                       
        }
            

        async function sendData(dish_url)
        {  
            

            const dishContent ={
                authorName: authorName,
                dishName: dishName,
                dishImage: dish_url,
                dishDescription: dishDescription,
                ingredients: ingredients,
                dishProcedure: dishProcedure,
                difficulty: difficulty,
                yeilds: yeilds,
                prepTime: prepTime
            }      

            console.log(dishContent);

            const options={
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dishContent),                
            }

            fetch(dishURL,options)
            .then(console.log("The Dish is submitted!"))
            .then(document.getElementById('loaderIcon').style.display = "none")
            .then(document.getElementById('feedback').style.display="block");

        }
    }


    render()
    {
        return(
            <div>
                <Navbar id="main_nav" dark expand="md" color="info">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />

                        <NavbarBrand className="mr-auto" href="/home">
                            <h4 className="text-white">MAKE-YOUR-BRUNCH</h4>
                        </NavbarBrand>

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="ml-sm-5" navbar>
                                <NavItem className="mr-sm-3">
                                    <NavLink className='nav-link' to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to="/contactus">
                                    <i className="fa fa-phone" aria-hidden="true"></i> Contact 
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar >
                                <NavItem>
                                    <Button color='danger' onClick={this.toggleModal}>
                                        <span className="fa fa-plus fa-lg"></span> Add a Dish
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>                         
                    </div>
                </Navbar>

                <div id="loaderIcon" className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1><span className="fa fa-gear fa-spin text-danger fa-lg mr-2"></span>Uploading your dish...</h1>    
                        </div>
                    </div>
                </div>


                <Modal className="modal-lg" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add a Dish</ModalHeader>

                    <ModalBody className="text-black">
                        <form encType="multipart/form-data">
                           <div className="row">
                               <div className="col-12 col-sm-2">
                                   <Label>Author Name</Label>
                               </div>
                               <div className="col-12 col-sm">
                                   <Input type="text" id="authorName" name="authorName" placeholder="Author Name*" required/> 
                                </div>
                           </div>

                            <br/>

                           <div className="row">
                               <div className="col-12 col-sm-2">
                                   <Label>Dish Name</Label>
                               </div>
                               <div className="col-12 col-sm">
                                   <Input className="form-control" type="text" id="dishName" name="dishName" placeholder="Dish Name*" />
                               </div>
                           </div>

                           <br/>

                           <div className="row">
                               <div className="col-12 col-sm-2">
                                   <Label>Dish Image</Label>
                               </div>
                               <div className="col-12 col-sm">
                                   <Input  id='dishImage' type="file" name="file" onChange={(event) =>this.onChangeHandler(event)} accept="image/*" required/>
                               </div>
                           </div>

                           <br/>

                           <div className="row">
                               <div className="col-12 col-sm-2">
                                   <Label>Dish Description</Label>
                               </div>
                               <div className="col-12 col-sm">
                                   <textarea className="form-control" id="description" name="description" rows="6" placeholder="Describe your dish!*"  ></textarea>
                               </div>
                           </div>

                           <br/>

                           <div className="row">
                               <div className="col-12 col-sm-2">
                                   <Label>Ingredients</Label>
                               </div>
                               <div className="col-12 col-sm">
                                   <textarea className="form-control" id="ingredients" name="ingredients" rows="6" placeholder="List out your ingredients number-wise*"  ></textarea>
                               </div>
                           </div>

                           <br/>

                           <div className="row">
                               <div className="col-12 col-sm-2">
                                   <Label>Procedure</Label>
                               </div>
                               <div className="col-12 col-sm">
                                   <textarea className="form-control" id="procedure" name="procedure" rows="6" placeholder="List the procedure number-wise*"  ></textarea>
                               </div>
                           </div>
                           
                           <br/>

                           <div className="row">
                               <div className="col-12 col-sm-2">
                                   <Label>Difficulty</Label>
                               </div>
                               <div className="col-12 col-sm-4">
                                   <Input type="select" id="difficulty" name="difficulty"  >
                                       <option>Easy</option>
                                       <option>Medium</option>
                                       <option>Hard</option>                                       
                                   </Input>
                               </div>
                           </div>
                           
                           <br/>

                           <div className="row">
                               <div className="col-12 col-sm-2">
                                   <Label>Yeilds</Label>
                               </div>
                               <div className="col-12 col-sm-4">
                                   <Input type="select" name='yeilds' id='yeilds'  >
                                       <option>1</option>
                                       <option>2</option>
                                       <option>3</option>
                                       <option>4</option>
                                       <option>5</option>
                                       <option>6</option>
                                       <option>7</option>
                                       <option>8</option>
                                       <option>9</option>
                                       <option>10</option>                                       
                                   </Input>
                               </div>
                           </div>
                           
                           <br/>

                           <div className="row">
                               <div className="col-12 col-sm-2">
                                   <Label>Preparation Time</Label>
                               </div>
                               <div className="col-12 col-sm-4">
                                   <Input className="form-control" id="prepTime" name="prepTime" type="number" placeholder="Time in minutes"></Input>
                               </div>
                           </div>

                            <br/>

                            <div className="row">
                                <div className="col-12 col-sm-4 offset-2 offset-sm-4">
                                    <Button onClick={this.handleSubmit} className="mr-2" color="warning">SUBMIT</Button>
                                    <Button onClick={this.toggleModal} color="danger">CANCEL</Button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>

                <div id="feedback" className="alert alert-dismissible alert-success">
                    <button onClick={this.closeAlert} id="close" type="button" className="close" data-dismiss="alert">&times;</button>
                    <strong>Well done!</strong> You successfully uploaded your dish.
                </div>
            </div>          
        );
    }
}

export default Header;