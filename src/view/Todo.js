import React, { useState,useEffect} from 'react'
import { VscTrash } from "react-icons/vsc";
import { GoPencil } from "react-icons/go";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../fireconfig';
const Todo = () => {
 const [data, setdata] = useState([])
 const [newdata, setnewdata] = useState()
 const [edit, setedit] = useState(false)
 const [editdata, seteditdata] = useState('')
 const [editid, seteditid] = useState()
 const [refresh, setrefresh] = useState(false)
    const userCollectionRef = collection(db,"firebase")
// fethddata from firestore
    const FethDataFromFiredb =async()=>{
        const data = await getDocs(userCollectionRef)
        setdata(data.docs.map((doc)=>({
            ...doc.data(), id:doc.id
        })))

    }
    useEffect(() => {
        FethDataFromFiredb()
    }, [refresh])
           // create item
           const createTodo = async() => { 
            await addDoc(userCollectionRef, {data:newdata})
            setrefresh(true)
    
        }

    // Edit item
    const EditTodo = async() =>{
        const userDoc =doc(db,"firebase",editid)
        const newField ={data:editdata}
         await updateDoc(userDoc,newField)
         setnewdata('')
         setedit(false)
         setrefresh(true)
         }
    // delete item
    const DeteletTodo = async(id) =>{
       const userDoc =doc(db,"firebase",id)
       await deleteDoc(userDoc)
        setrefresh(true)
    }

//  edit btn
const editbtn =(data)=>{
seteditdata(data.data)
seteditid(data.id)
setedit(true)
    }
 
    // form onsubmit
    const onsub = (e)=>{
        e.preventDefault()
    }
  return (
    <div className='container'>
        <div>
        
  <h3 className='head'>TODO List App</h3>
  <form onSubmit={onsub}>
    <input type='text' placeholder='Make Todo'value={edit?editdata:newdata} onChange={(e)=>{edit? seteditdata(e.target.value): setnewdata(e.target.value)}}/> 
   { edit ? <button onClick={EditTodo}>UPDATE TODO</button>:
   <button onClick={createTodo}>ADD TODO</button>
   } 
  </form>
  { data.map((data)=>{
  return  (
        <div className='flexy' key={data.id}>

        <div>
          <p>{data.data}</p>
          <p className='sm'>{data.data}</p>
        </div>
      
        <p className='trash'>
          <GoPencil className='mr icon' onClick={()=>{editbtn(data) }}/>
          <VscTrash className='icon' onClick={()=>{DeteletTodo(data.id)}}/></p>
      
        </div>
    )
  })
}
  </div>
    </div>
  )
}

export default Todo
