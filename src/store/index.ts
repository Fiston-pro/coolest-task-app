import { create } from "zustand";
import "firebase/auth";
import { auth } from "../lib/firebase";
import { z } from "zod";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { trpc } from "@/utils/trpc";
import { useQuery } from "react-query";
import axiosInstance from "@/components/axiosInstance";


// Define the shape of the user data that we'll store in the store
const userSchema = z.object({
    email: z.string().nullable(),
    uid: z.string(),
  }).nullable();

const todoSchema = z.object({
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
    });

type User = z.infer<typeof userSchema>;
type Todo = z.infer<typeof todoSchema>;

// Define the shape of the auth store
type UserStore = {
  id: number | null;
  email: string | null;
  uid: string | null;
  removeUser: () => Promise<void>;
  setId: (id: number) => void;
  setEmail: (email: string) => void;
  setUid: (uid: string) => void;
};

type TodoStore = {
  todos: Todo[];
  createTodo: (id:number, title: string, completed: boolean) => void;
  addTodos: (todos: any) => void;
  updateTodo: (id: number, title: string, completed: boolean) => void;
  deleteTodo: (id: number) => void;
}

export const todoStore = create<TodoStore>((set) => ({
    todos: [],
    createTodo: ( id:number, title: string, completed: boolean) => {
      
      const todos = [...todoStore.getState().todos];
      // Add the new todo object to the array
      const newTodo = { id, title, completed };
      todos.push(newTodo);
      // Update the todos array in the store
      set({ todos });

      toast.success('Todo created successfully');
    },

    addTodos: ( todos: Todo[] ) => {
      set({ todos: todos });
    },

    updateTodo: async (id: number, title: string, completed: boolean) => {
      // do db stuff
      // await trpc.updateTodo.useMutation({ id, title, completed });

      set((state) => {
        const todoIndex = state.todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
          const updatedTodo: Todo = { ...state.todos[todoIndex], title, completed };
          const updatedTodos = [...state.todos];
          updatedTodos.splice(todoIndex, 1, updatedTodo);
          toast.success('Todo updated successfully');
          return { todos: updatedTodos };
        }
        return state;
      });
    },

    deleteTodo: async (id: number) => {
      set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
    },
  }));


// Define the auth store
export const userStore = create<UserStore>((set) => ({

  id: null,
  email: null,
  uid: null,

  setId: (id: number) => {  set({ id }) },
  setEmail: (email: string) => { set({ email }) },
  setUid: (uid: string) => { set({ uid }) },

  removeUser: async () => {
    try {
      // Sign out with Firebase
      await signOut(auth);
      toast.success('User logged out successfully');

      // Clear the user's data from the store
      set({ email: null, uid: null });
    } catch (error) {
      console.error(error);
    }
  },
}));