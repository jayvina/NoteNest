import React, { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react';

const form = () => {


  const [title, setTitle] = useState("")
  const [write, setWrite] = useState("");
  const [task, setTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    const copyTask = [...task];
    copyTask.push({title, write});
    setTask(copyTask);

    if (editIndex !== null) {
      // Update Note
      const updatedTasks = [...task];
      updatedTasks[editIndex] = { title, write };
      setTask(updatedTasks);
      setEditIndex(null);
    } else {
      // Add Note
      setTask([...task, { title, write }]);
    }

    setTitle("");
    setWrite("")
  }

  const deleteNote = (idx) =>{
    const copyTask = [...task];
    copyTask.splice(idx, 1);
    setTask(copyTask);
  }

  const handleEdit = (index) => {
    setTitle(task[index].title);
    setWrite(task[index].write);
    setEditIndex(index);
  }

  return (

    <div className=' min-h-screen bg-gray-200'>
      <div className="flex justify-center items-center p-15" > 
        <h1 className="text-3xl font-bold text-gray-500 ">
          Capture your thoughts and ideas
        </h1>
      </div>
      <div className='flex flex-col sm:flex-row gap-15 lg:ml-25'>
        <form onSubmit={(e) => {handleSubmit(e)}} className='mt-10 bg-white lg:h-130 p-15 w-full sm:w-3/4 md:w-2/4 rounded-2xl flex flex-col mx-auto md:ml-20'>

        <div className="flex flex-col space-y-1 w-full">
          <label className="text-gray-800 font-medium">Note Heading</label>
          <input type="text" placeholder='Enter note title...' className=" bg-gray-200 border border-gray-300 p-2 rounded-md w-full"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          />
        </div>

        <div className="flex flex-col space-y-1 mt-4 w-full ">
          <label className="text-gray-800 font-medium">Write Note</label>
          <textarea placeholder='Start writing your note...' className="sm:h-30 border border-gray-300 p-2 rounded-md w-full lg:h-54 resize-none bg-gray-200"
          value={write}
          onChange={(e) =>{
            setWrite(e.target.value)
          }}
          ></textarea>
        </div>

        <button type='submit' className=' p-2 mt-4 rounded-md cursor-pointer hover:bg-green-300 transition transform active:scale-95 active:opacity-80 duration-100 h-10 w-full bg-green-200'>Add Note</button>
        </form>

      
      <div className='w-2/3 justify-center mr-10 mt-5'>
        <div className=' h-full mt-6 w-full max-w-xl px-4 md:px-0'>
        {task.length === 0 ? (
            <p className='text-gray-500 text-lg text-center mr-30 mt-20'>
              No notes yet — start by adding one! 📝
            </p>
          ) : (
            task.map(function(elem, idx) {
              return (
                <div key={idx} className=' relative white h-30 w-full p-5 bg-white flex rounded-2xl justify-between mt-5 '>
                  <div>
                    <h1 className=' absolute text-3xl font-bold'>{elem.title}</h1>
                    <p className='text-md mt-12 text-gray-500 '>{elem.write}</p>
                  </div>

                  <button type='submit'
                    onClick={() => handleEdit(idx)}
                    className=' ... cursor-pointer p-2 bg-gray-200 rounded-md h-10 transition transform active:scale-95 active:opacity-80 duration-100 text-black flex items-center gap-2 '
                    >
                      <Edit />
                  </button>

                  <button
                    onClick={() => { deleteNote(idx); }}
                    className=' cursor-pointer p-2 bg-red-500 rounded-md hover:bg-red-400 h-10 transition transform active:scale-95 active:opacity-80 duration-100 text-white flex items-center gap-2 '
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              );
            })
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default form

