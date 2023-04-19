import React,{Fragment, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react'

interface Props{
    data: {id:number, title: string, completed: boolean} ,
    isOpen: boolean,
    closeModal: () => void,
    editingTodo: (id:number, title: string, completed: boolean) => void,
}

const EditingDialog = ({isOpen, editingTodo, closeModal, data}: Props) => {

    const [todo, setTodo] = useState<string>(data.title)
    const [completed, setCompleted] = useState<boolean>(data.completed)

    const closeDialog = () =>{
        closeModal()
    }

    const  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(todo, completed)
        editingTodo(data.id, todo , completed)
        closeDialog()
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeDialog}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-200 p-6 text-left align-middle shadow-xl transition-all">
                  
                            <Dialog.Title
                                as="h3"
                                className="text-lg leading-6 text-secondary font-bold"
                            >
                                Edit the your Todo
                            </Dialog.Title>

                            <form className='w-96' onSubmit={onSubmit}>
                                <div className=" mb-4">
                                    <label htmlFor="email" className="block text-sm my-2 font-medium text-gray-700">
                                    Todo
                                    </label>
                                    <input
                                    type="text"
                                    id="todo"
                                    name="todo"
                                    value={todo}
                                    onChange={(e) => setTodo(e.target.value)}
                                    className="border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm"
                                    />
                                </div>
                                <div className=" flex flex-row gap-4 mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Completed
                                    </label>
                                    <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />

                                </div>

                            <div className="mt-4 flex flex-row justify-between ">
                                <button className="text-base mt-2 px-3 py-1 flex flex-row items-center border rounded-3xl text-secondary bg-blue-200 hover:bg-blue-500 cursor-pointer" onClick={closeModal}>Cancel</button>
                                <button className="text-base mt-2 px-3 py-1 flex flex-row items-center border rounded-3xl text-secondary bg-blue-200 hover:bg-blue-500 cursor-pointer" type='submit'>Add</button>
                            </div>
                            </form>


                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default EditingDialog;