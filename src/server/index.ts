import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import client from "@/utils/client";

export const appRouter = router({
  createUser: publicProcedure
    .input(z.object({ email: z.string().email(), uid: z.string() }))
    .mutation(async (opts) => {
      const { email, uid } = opts.input;
      // do some magic here
      return await  client.CreateUser({uid, email})
    }),

  createTodo: publicProcedure
    .input(
      z.object({
        user_id: z.number(),
        title: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      const { user_id, title, completed } = opts.input;
      // do some magic here
      return await client.CreateTodo({user_id, title, completed});
    }),

  getTodos: publicProcedure.input(z.object({ user_id: z.number() })).query(async (opts) => {
    // Retrieve users from a datasource, this is an imaginary database
    const { user_id } = opts.input;
    return await client.GetTodos({
        id: user_id});
  }),

  updateTodo: publicProcedure
    .input(
      z.object({ id: z.number(), title: z.string(), completed: z.boolean() })
    )
    .mutation(async (opts) => {
      // Retrieve users from a datasource, this is an imaginary database
      const { id, title, completed } = opts.input;
      // do some magic here
      return await client.UpdateTodo({
        id,
        title,
        completed,
      })
       
    }),

  deleteTodo: publicProcedure.input(z.number()).mutation(async (opts) => {
    // Retrieve users from a datasource, this is an imaginary database
    const id = opts.input;
    // do some magic here
    return await client.DeleteTodo({todoId: id}) ;
  }),

  helo: publicProcedure.query(async () => {
    return "hello";
  }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
