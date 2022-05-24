import React ,{useState} from 'react'
import {Form , Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
const navigate = useNavigate()
const [keyWord , setKeyWord] = useState('')


const submitHandler = (e)=>{

e.preventDefault()

if(keyWord.trim()){
navigate(`/search/${keyWord}`)


}else{

    navigate('/')
}

}

  return (
    <Form onSubmit={submitHandler} ><Form.Control type='text' name='q' onChange={(e)=>setKeyWord(e.target.value)} placeholder='search ' className='mr-sm-2 ml-sm-5'></Form.Control>
    <Button type='submit' variant='outline-success' className='p-2 '>Search</Button></Form>
  )
}

export default SearchBox