import React, { Component } from 'react';
// import logo from '../logo.svg';
import * as action from "../actions/api";
import '../App.css';


class Main extends Component {
  constructor(props){ 
    super(props) 
    
    this.handleSubmit = this.handleSubmit.bind(this) 
  }
  
  handleSubmit(event){ 
    console.log("---INIT----")
    event.preventDefault() 
  
    action.InitAPI() 
    .then((res)=>{
      
        if(res.data.status === 200){
          alert(` Ledger Init Done !! 
          Go go ViewList page `) 
        }
        
    })
    .catch((err)=>{
        console.log(err)
    })
  }


  render(){ 
    return( 
     <div class="row container-fluid">
      
       <div class="col-md-12">
         <button class="init-btn" onClick={this.handleSubmit}>Init</button>
       </div>
    </div> 
    ) 
  } 
}

export default Main;
