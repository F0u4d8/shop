
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { redeem } from '../actions/userActions';
import classes from './RedeemScreen.module.css';

const RedeemScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

const [worth,setWorth] = useState(0)
const [type, setType]= useState('')

const dispatch = useDispatch()

  const submitHandler = (e)=>{



e.preventDefault()

if(type ==='pharmacien'){

  setWorth(userInfo.portFeulle/5)
  }else if (type=== "des légumes"){
    setWorth(userInfo.portFeulle/3)
  
  
  }else if(type ==="Marchandises diverses") {
  
    setWorth(userInfo.portFeulle/4)
  
  }else if(type === "denrées alimentaires"){
  
    setWorth(userInfo.portFeulle/2)
  
  }



  }

  const printHandler = ()=>{

    
    const price = userInfo.portFeulle;
    
     dispatch(redeem(price))



const element = document.createElement("a");
    const file = new Blob(["bon d'achat pour " + userInfo.name+" de " + type + " jusqu'a " + worth +"DA" ], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();


  }

  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo ) {
      navigate('/login');
    }
  }, [dispatch  , userInfo , navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.leftSide}>
        <div className={classes.Wrapper}>
          <div className={classes.Card}>
            {' '}
            <h3 className={classes.text}>you have</h3><h2 className={classes.wallet}>{userInfo.portFeulle}</h2>
          </div>{' '}
          
        </div>
      </div>
      <div className={classes.content}><h2>Is worth of</h2>
      
      <Form onSubmit={submitHandler}>
            <Form.Group controlId="rating">
              <Form.Label>bons</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="pharmacien"> pharmacien</option>
                <option value=  "des légumes">des légumes</option>
                <option value="Marchandises diverses">Marchandises diverses</option>
                <option value="denrées alimentaires">denrées alimentaires</option>
                
              </Form.Control>
            </Form.Group>
            
            <button className={classes.submitReview}>Submit</button>
          </Form>

        <div className={classes.content}><h2> equivallant: {worth} DA</h2> 
        <button className={classes.submitReview} onClick={printHandler}>imprimer</button></div>  
        
       
      </div>
    </div>

    
  );
};

export default RedeemScreen;
