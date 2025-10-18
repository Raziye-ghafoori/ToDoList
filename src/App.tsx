import { useState } from 'react';
import './App.css'
import {AddToDo,RemoveToDo,ToggleToDo,RemoveToDoALL} from './Store'
import {useSelector, useDispatch} from 'react-redux'
import { MdOutlinePlaylistAdd,MdOutlineDeleteSweep ,MdOutlineFileDownloadDone  } from "react-icons/md";

function App() {
  const dispatch = useDispatch();
  const [addInput , setAddInput] = useState(false);
  const [textToDo , setTextToDo] = useState('');
  const list = useSelector((state:any)=>state.ToDoList);

  const handlerAddToDo = ()=>{
    if (textToDo == '') {
      return;
    }
    dispatch(AddToDo({id:Date.now(),text:textToDo,complated:false}))
    setTextToDo('');
    setAddInput(false);
  }
  var counter = 0 ;
  
  const counterWorkDone = ()=>{
    list.todos.forEach((todo:any) => {
      if (todo.complated == true) {
        counter++
      }
    });
  }


  counterWorkDone();

  return (
    <>
    <header>
      <h1>
        To Do List
      </h1>
      </header> 
      <section className='flex flex-col items-center justify-center'>
        <table className='border-[#ffffff81] border-5 m-5 w-[500px]'>
          <tr className='bg-red-400'>
            <th className='p-2'>status</th>
            <th colSpan={2} className='p-2'>work</th>
            
          </tr>
         {list.todos.map((todo:any)=>{
          return <>
           <tr>
            <td className='border-r-1 border-red-400' ><input type="checkbox" checked={todo.complated} className='m-2 w-[20px] h-[20px]' onChange={()=>dispatch(ToggleToDo({id:todo.id}))} /></td>
            <td className='px-2 border-r-1 border-[#ffffff81] w-[500px] text-left '>{todo.text}{todo.complated}</td>
            <td className='px-2 text-[20px] hover:text-red-500' onClick={()=>dispatch(RemoveToDo({id:todo.id}))} ><MdOutlineDeleteSweep /></td>
          </tr>
          </>
         })}
          {addInput&&<tr>
            <td className='border-r-1 border-red-400' ><input type="checkbox" className='m-2 w-[20px] h-[20px]' /></td>
            <td className='px-2 border-r-1 border-[#ffffff81] w-[500px] text-left '>
              <input onChange={(e)=>setTextToDo(e.target.value)} type="text" className='w-[100%] bg-[#ffffff81] rounded-[10px] px-2'/>
            </td>
            <td className='px-2 text-[20px] hover:text-green-500' onClick={handlerAddToDo}>< MdOutlineFileDownloadDone /></td>
          </tr>}
        </table>
        <div className='flex mb-5'>
        <button onClick={()=>dispatch(RemoveToDoALL())} className=' flex justify-center hover:bg-red-500 bg-[#1a1a1a] '>Delet All Work Done</button>
        <button onClick={()=>setAddInput(!addInput)} className='w-[25%] mx-2  flex items-center justify-center hover:bg-blue-500 bg-[#1a1a1a] '><MdOutlinePlaylistAdd className='text-[20px]'/></button>
        </div>
      </section>
      <section className='flex'>
        <div className='flex flex-col items-start text-[25px]'>
          <div>
          <span>Work done: </span>{counter}
          </div>
          <div>
          <span>Undone work: </span>{list.todos.length - counter}
          </div>
        </div>
      </section>
    </>
  )
}

export default App
