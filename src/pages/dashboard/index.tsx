import Checkbox from '@/components/checkBox';
import React,{useEffect, useState} from 'react';
import { BsPencilSquare } from 'react-icons/bs'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaPlus } from 'react-icons/fa'
import { ImBin } from 'react-icons/im'
import ConfirmDialog from '@/components/confirmingDialog';
import { userStore, todoStore } from '@/store';
import router from 'next/router';
import EditingDialog from '@/components/editingDialog';
import AddingDialog from '@/components/addingDialog';
import ConfirmingDelete from '@/components/confirmingDelete';



const ExamSimulator = () => {

    const todos = todoStore(state => state.todos)
    useEffect(() => {
        todoStore.getState().getTodos();
    }, [])

    const [showClosingDialog, setShowClosingDialog] = useState(false);
    const [editingTodo, setEditingTodo] = useState<any>(null);
    const [addTodo, setAddTodo] = useState<boolean>(false);
    const [deleteTodoItem, setDeleteTodoItem] = useState<any>(null);

    const deleteTodo = async ( id: number) => {
        await todoStore.getState().deleteTodo(id);
        setDeleteTodoItem(null);
    }


    const Logout = async () => {
        await userStore.getState().removeUser();
        router.push('/')
    }

    const updateTodo = async (id: number , title: string, completed:boolean) => {
        await todoStore.getState().updateTodo(id, title, completed);
    }
 
    const addTodoHandle = async ( title: string, completed:boolean) => {
        await todoStore.getState().createTodo( title, completed);                
    };

    
    return (
        <div className='h-screen flex flex-col justify-evenly items-center'>
            <h1 className='text-3xl	font-bold'>List of your todos</h1>
            <div onClick={() => setShowClosingDialog(true)} className=' fixed top-7 right-7 h-12 flex items-center text-base px-4 py-3 mr-2 leading-none text-black bg-slate-200 rounded-xl hover:bg-slate-500 hover:text-white lg:mt-0 cursor-pointer'>
                <h1 className='text-lg font-bold' >Logout</h1>
                <HiArrowNarrowRight className="ml-2" />
            </div>
            { addTodo && <AddingDialog isOpen={true} closeModal={()=>setAddTodo(false)} addingTodo={addTodoHandle} />}
            { editingTodo && <EditingDialog isOpen={true} closeModal={()=>setEditingTodo(null)} editingTodo={updateTodo} data={editingTodo} />}
            <ConfirmDialog isOpen={showClosingDialog} closeModal={()=>setShowClosingDialog(false)} successAction={Logout} text='Are you sure you want to Logout it ?' />
            { deleteTodoItem && <ConfirmingDelete id={deleteTodoItem} isOpen={true} closeModal={()=>setDeleteTodoItem(null)} successAction={deleteTodo} text='Are you sure you want to delete it ?' />}
            {
                todos && todos.map(todo => (
                    <div key={todo.id} className='flex justify-between items-center w-1/2 bg-white p-4 rounded-lg'>
                        <input type="checkbox" checked={todo.completed} />
                        <p>{todo.title}</p>
                        <div className='flex flex-row gap-2'>
                            <button onClick={() => setEditingTodo(todo)} className='bg-blue-500 hover:bg-blue-700 flex flex-row items-center gap-2 text-white font-bold py-2 px-4 rounded'>
                                Edit <BsPencilSquare />
                            </button>
                            <button onClick={() => setDeleteTodoItem(todo.id)} className='bg-red-500 hover:bg-red-700 flex flex-row items-center gap-2 text-white font-bold py-2 px-4 rounded'>
                                Delete <BsPencilSquare />
                            </button>
                        </div>
                    </div>
                ))

            }

                <button onClick={() => setAddTodo(true)} className={`fixed bottom-7 right-7 rounded-full w-16 h-16 bg-blue-500 hover:bg-blue-600 focus:outline-none ${addTodo && 'rotate-45'} transition-all duration-500 ease-out `} >
                    <div className="flex justify-center items-center h-full">
                        <FaPlus size={24} className="text-white text-xl" />
                    </div>
                </button>
            </div>    
        );
    
    };

export default ExamSimulator;