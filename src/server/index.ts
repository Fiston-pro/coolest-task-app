import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import client from "@/utils/client";
import { error } from "console";

export const appRouter = router({
  createUser: publicProcedure
    .input(z.object({ email: z.string().email().nullable(), uid: z.string() }))
    .mutation(async (opts) => {
      const { email, uid } = opts.input;
      // do some magic here
      if (email == null){
        throw error("Creating user without Email")
      }
      return await client.CreateUser({ uid, email });
    }),

  getUser: publicProcedure
    .input(z.object({ uid: z.string().nullable() }))
    .query(async (opts) => {
      const { uid } = opts.input;
      if (uid == null) {
        return []
      }
      return await client.GetUser({ uid });
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
      return await client.CreateTodo({ user_id, title, completed });
    }),

  getTodos: publicProcedure
    .input(z.object({ user_id: z.number().nullable() }))
    .query(async (opts) => {
      // Retrieve users from a datasource, this is an imaginary database
      const { user_id } = opts.input;

      if (user_id == null) {
        return []
      }
      const res = await client.GetTodos({
        id: user_id,
      });
      console.log(res);
      return res
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
      });
    }),

  deleteTodo: publicProcedure.input( z.object( { id: z.number()} ) ).mutation(async (opts) => {
    // Retrieve users from a datasource, this is an imaginary database
    const {id} = opts.input;
    // do some magic here
    return await client.DeleteTodo({ todoId: id });
  }),

  helo: publicProcedure.query(async () => {
    console.log("hello");
    return "hello";
  }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
