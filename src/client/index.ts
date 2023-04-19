import { trpc } from "@/utils/trpc";

export const createUser = async (email: string, uid: string) => {
    await trpc.createUser.mutate({ email, uid });
}

export const createTodo = async (user_id: number, title: string, completed: boolean) => {
    await trpc.createTodo.mutate({ user_id, title, completed });
}

export const getTodos = async (user_id: number) => {
    await trpc.getTodos.query(user_id);
} 

export const updateTodo = async (id: number, title: string, completed: boolean) => {
    await trpc.updateTodo.mutate({ id, title, completed });
}

export const deleteTodo = async (id: number) => {
    await trpc.deleteTodo.mutate(id);
}
