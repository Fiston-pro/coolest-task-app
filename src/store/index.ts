import { create } from "zustand";
import "firebase/auth";
import { auth } from "../lib/firebase";
import { z } from "zod";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { trpc } from "@/utils/trpc";


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
  loginUser: ( email: string, password: string) => Promise<void>;
  removeUser: () => Promise<void>;
  createUser: (email: string, uid: string) => void;
};

type TodoStore = {
  todos: Todo[];
  createTodo: (title: string, completed: boolean) => void;
  getTodos: () => void;
  updateTodo: (id: number, title: string, completed: boolean) => void;
  deleteTodo: (id: number) => void;
}

export const todoStore = create<TodoStore>((set) => ({
    todos: [],
    createTodo: async (title: string, completed: boolean) => {
      const user_id: number = userStore.getState().id as number;
      // add to db
      const data = await trpc.createTodo.useMutation({ user_id, title, completed });
      const newTodo = data.isSuccess ? data.data : null as unknown as Todo;
      set((state) => ({ todos: [...state.todos, newTodo] }));
      toast.success('Todo created successfully');
    },

    getTodos: () => {
      const user_id = userStore.getState().id as number;
      // get from db
      const data = trpc.getTodos.useQuery(user_id);

      set({ todos: data.data });

    },

    updateTodo: async (id: number, title: string, completed: boolean) => {
      // do db stuff
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
      toast.success('Todo deleted successfully');
    },
  }));


// Define the auth store
export const userStore = create<UserStore>((set) => ({

  id: null,
  email: null,
  uid: null,

  createUser: async ( email:string, uid:string ) => {
    // Sign up with Firebase
    await createUserWithEmailAndPassword(auth, email, uid).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      toast.success('User created successfully');
      const tempUser = { email: user.email, uid: user.uid };
      console.log(tempUser);
      set({ email: user.email, uid: user.uid })
      // add the user to the database
      
    }).catch((error) => {
      toast.error(error.code);
      console.log(error);
    });

  },
  
  loginUser: async (email: string, password: string) => {
    // Sign in with Firebase
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.email);
      toast.success('User logged in successfully');
      set({ email: user.email, uid: user.uid })
      // add the user to the store
    }).catch((error) => {
      toast.error(error.code);
      console.log(error);
    });
  },

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