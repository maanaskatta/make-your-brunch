import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, Label, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {dishURL,commentURL} from './URLList';

import './DishDetail.css';
import Header from './Header';


class DishDetail extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            fetchedDish : [],
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getComments = this.getComments.bind(this);
        this.openAlert = this.openAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);

    }

    toggleModal()
    {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })

    }

   

    getComments()
    {
        var pathName = window.location.pathname;
        var res = pathName.split("/");
        var temp_dishId = res[2];
        var dishId = parseInt(temp_dishId);

        //console.log(commentURL+dishId);

        bringComments();
       async function bringComments()
       {
           const response = await fetch(commentURL+dishId);
           const data = await response.json();
           data.reverse().map(tempData => {            
            
            const commentCard = document.createElement('DIV');
            commentCard.setAttribute('class','card mb-2');

            const commentCardBody = document.createElement('DIV');
            commentCardBody.setAttribute('class','card-body'); 

            const commentCardTitle = document.createElement('H5');
            commentCardTitle.setAttribute('class','card-title');
            commentCardTitle.textContent = tempData.userName;

            const commentCardRating = document.createElement('H6');
            commentCardRating.setAttribute('class','card-subtitile mb-2 text-muted');
            commentCardRating.textContent = "Rating : " + tempData.rating;
            
            const ratingStar = document.createElement('SPAN');
            ratingStar.setAttribute('class','fa fa-star fa-lg ml-1');

            const commentCardComment = document.createElement('P');
            commentCardComment.setAttribute('id','commentText');
            commentCardComment.setAttribute('class','card-text');
            commentCardComment.textContent = tempData.comment + "\n\nSubmitted On : " + tempData.time.split('T')[0];
        
            document.getElementById('mainCommentArea').appendChild(commentCard);

            commentCard.appendChild(commentCardBody);

            commentCardBody.appendChild(commentCardTitle);
            commentCardBody.appendChild(commentCardRating);
            commentCardBody.appendChild(commentCardComment);

            commentCardRating.appendChild(ratingStar);
            
            return true;

           })
       }

    }

    handleSubmit()
    {
        var pathName = window.location.pathname;
        var res = pathName.split("/");
        var dishId = res[2];

        var userName = document.getElementById('userName').value;
        var rating = document.getElementById('rating').value;
        var comment = document.getElementById('comment').value;
        var d =new Date();        
        var commentData = {
            userName: userName,
            rating: parseInt(rating),
            comment: comment,
            time: d,
            dishId: parseInt(dishId),
        }

        
        this.toggleModal();
        //window.location.reload();
        this.openAlert();

                  
        const options={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData),                
        }

        fetch(commentURL,options)
        .then(()=>{
            document.getElementById('userName').value = "";
            document.getElementById('rating').value = "";
            document.getElementById('comment').value = "";
        }) 
        .then(console.log("Your comment is submitted!")); 
    }

    componentDidMount()
    {   
        this.getComments();
        var temp_pathName = window.location.pathname;
        var res = temp_pathName.split("/");
        var temp = res[2];
        var temp_dishId = parseInt(temp);
        var dishId = temp_dishId;

        var path = dishId.toString();

        console.log(dishURL+path);

        getTheDish(path);
        async function getTheDish(path)
        {            
            const response = await fetch(dishURL + path);
            const data = await response.json();                                                 

            //Add dish image later
            var dishImageArea = document.createElement('DIV');
            dishImageArea.setAttribute('id','dishImageArea');
            dishImageArea.setAttribute('class','jumbotron text-danger');
            dishImageArea.textContent = data[0].dishName;

            var dishImage = document.createElement('IMG');
            dishImage.setAttribute('src', `${data[0].dishImage}`);
            dishImage.setAttribute('id','dishImage');
            

            var authorName = document.createElement('H4');
            authorName.setAttribute('id','authorname');
            authorName.setAttribute('class','text-warning d-none d-sm-block')
            authorName.textContent = "Chef - " + data[0].authorName;

            var specArea = document.createElement('DIV');
            specArea.setAttribute('id','specs');
            specArea.setAttribute('class', 'container');

            var specs = document.createElement("DIV");
            specs.setAttribute('class','row');


            var difficulty = document.createElement('SPAN');
            difficulty.setAttribute('id','difficult');
            difficulty.setAttribute('class','fa fa-cog fa-lg ml-3 ml-sm-4  mr-4 mr-sm-5');
            difficulty.textContent =" " + data[0].difficulty;

            var yeilds = document.createElement('SPAN');
            yeilds.setAttribute('id','yeild');
            yeilds.setAttribute('class','fa fa-male fa-lg mr-4 mr-sm-5');
            yeilds.textContent =" "+ data[0].yeilds;

            var prepTime = document.createElement('SPAN');
            prepTime.setAttribute('id','preptime');
            prepTime.setAttribute('class','fa fa-hourglass-half fa-lg mr-sm-5');
            prepTime.textContent = " " + data[0].prepTime + " min";

            const line = document.createElement('HR');

            const ingProcArea = document.createElement('DIV');
            ingProcArea.setAttribute('id','ingProcArea');
            ingProcArea.setAttribute('class','row'); 

            //Ingredients Card

            const ingredientsCard = document.createElement('DIV');
            //ingredientsCard
            ingredientsCard.setAttribute('class','col-12 col-sm-5 offset-sm-1 mt-5');

            const ingCard = document.createElement('DIV');
            ingCard.setAttribute('id','cardMain');
            ingCard.setAttribute('class','card');

            const ingCardHead = document.createElement('DIV');
            ingCardHead.setAttribute('class','card-header');
            ingCardHead.textContent = "INGREDIENTS";


            const ingCardBody = document.createElement('DIV');
            ingCardBody.setAttribute('class','card-body');
            ingCardBody.setAttribute('id','cardBody');

            
            const ingCardText = document.createElement('P');
            ingCardText.setAttribute('id','ingredient-text');
            ingCardText.setAttribute('class','card-text');
            ingCardText.textContent = data[0].ingredients;
            
            //Procedure Card

            const procedureCard = document.createElement('DIV');
            procedureCard.setAttribute('class','col-12 col-sm-5 mt-5');

            const procCard = document.createElement('DIV');
            procCard.setAttribute('id','cardMain');
            procCard.setAttribute('class','card');

            const procCardHead = document.createElement('DIV');
            procCardHead.setAttribute('class','card-header');
            procCardHead.textContent = "PROCEDURE";


            const procCardBody = document.createElement('DIV');
            procCardBody.setAttribute('class','card-body');
            procCardBody.setAttribute('id','cardBody');

            
            const procCardText = document.createElement('P');
            procCardText.setAttribute('id','procedure-text');
            procCardText.setAttribute('class','card-text');
            procCardText.textContent = data[0].dishProcedure;

            document.getElementById('mainDishJumbotron').appendChild(dishImageArea);
            document.getElementById('mainSpecArea').appendChild(specArea);

            document.getElementById('breadCrumbDishName').textContent = data[0].dishName;

            dishImageArea.appendChild(dishImage);
            dishImageArea.appendChild(authorName);

            specArea.appendChild(specs);
            specArea.appendChild(line);
            specArea.appendChild(ingProcArea);

            specs.appendChild(difficulty);
            specs.appendChild(yeilds);
            specs.appendChild(prepTime);

            ingProcArea.appendChild(ingredientsCard);
            ingProcArea.appendChild(procedureCard);
            //  ingProcArea.appendChild(comment);
            

            ingredientsCard.appendChild(ingCard);
            procedureCard.appendChild(procCard);

            ingCard.appendChild(ingCardHead);
            ingCard.appendChild(ingCardBody);
            ingCard.appendChild(ingCardText);

            procCard.appendChild(procCardHead);
            procCard.appendChild(procCardBody);
            procCard.appendChild(procCardText);                   
        }
    }

    openAlert()
    {
        document.getElementById('feedback').style.display="block";
    }

    closeAlert()
    {
        document.getElementById('feedback').style.display="none";
    }

    render()
    {
        return(
            <div>
               <Header/>
               <div id="mainDishJumbotron"></div>

               <div id="feedback" className="alert alert-dismissible alert-success">
                    <button onClick={this.closeAlert} id="close" type="button" className="close" data-dismiss="alert">&times;</button>
                    <strong>Well done!</strong> You successfully uploaded your comment.
                </div>


               <div className="container">
                   <div className="row">
                       <div className="col-12 col-sm-5">
                            <nav className="breadcrumb">
                                <Link className="breadcrumb-item" to="/home">Home</Link>
                                <span id="breadCrumbDishName" className="breadcrumb-item active"></span>
                            </nav>                          
                       </div>

                   </div>
               </div>

               <div id="commentArea" className="container">
                   <div className="row">
                       <div className="col-12 col-sm-4">
                            <button className="btn btn-danger" onClick={this.toggleModal}>Add a Comment</button>
                       </div>
                    </div>                   
               </div>

               <br/>
               <div className="container">
                    <div id="mainSpecArea"></div>
               </div>
               
               <hr/>
               <div className="container">
                   <div className="row mb-3">
                       <div id="comment-heading" className="col-12 bg-white">
                            <h1>COMMENTS</h1>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-12 col-sm-8 offset-sm-2">
                           <div id="mainCommentArea">                               
                           </div>
                       </div>
                   </div>
               </div>

               <div className="container">
                <Modal className="modal-lg" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add a Comment</ModalHeader>

                    <ModalBody>
                        <form encType="multipart/form-data">
                            <div className="row">
                                <div className="col-12 col-sm-2">
                                    <Label>Name</Label>
                                </div>
                                <div className="col-12 col-sm">
                                    <Input className="form-control" type="text" id="userName" name="userName" placeholder="Name*" /> 
                                </div>
                            </div>

                            <br/>

                            <div className="row">
                                <div className="col-12 col-sm-2">
                                    <Label>Rating</Label>
                                </div>
                                <div className="col-12 col-sm">
                                    <Input className="form-control" type="select" id="rating" name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>                                    
                                    </Input> 
                                </div>
                            </div>

                            <br/>

                            <div className="row">
                                <div className="col-12 col-sm-2">
                                    <Label>Comment</Label>
                                </div>
                                <div className="col-12 col-sm">
                                    <textarea className="form-control" id="comment" name="comment" rows="6" placeholder="Type your comment*"></textarea>
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
            </div>
               
            </div>
        );
    }
}

export default DishDetail;