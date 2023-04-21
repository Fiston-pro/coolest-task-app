import React,{Fragment} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { trpc } from '@/utils/trpc';
import { todoStore } from '@/store';

interface Props{
    isOpen: boolean,
    closeModal: () => void,
    text: string,
    id: number,
}

const ConfirmingDelete = ({isOpen, closeModal, text, id }: Props) => {

    const { mutate } = trpc.deleteTodo.useMutation()

    const closeDialog = () =>{
        closeModal()
    }

    const onSuccess = async ( id:number ) => {
        await todoStore.getState().deleteTodo(id) // delete from store
        console.log('all todos in store',todoStore.getState().todos)
        await mutate({id}) // delete from db
        closeModal()
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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  
                            <Dialog.Title
                                as="h3"
                                className="text-lg leading-6 text-secondary font-bold"
                            >
                                Confirmation
                            </Dialog.Title>

                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                {text}
                                </p>
                            </div>

                            <div className="mt-4 flex flex-row justify-between ">
                                <button className="text-base mt-2 px-3 py-1 flex flex-row items-center border rounded-3xl text-secondary bg-blue-200 hover:bg-blue-500 cursor-pointer" onClick={closeModal}>Cancel</button>
                                <button className="text-base mt-2 px-3 py-1 flex flex-row items-center border rounded-3xl text-secondary bg-blue-200 hover:bg-blue-500 cursor-pointer" onClick={()=>onSuccess(id)}>Confirm</button>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ConfirmingDelete;