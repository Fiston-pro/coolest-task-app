import { GraphQLClient } from 'graphql-request';
import { userSchema, todoSchema } from '../lib/schemas';

const endpoint = 'https://amusing-malamute-68.hasura.app/v1/graphql';

const client = new GraphQLClient(endpoint, {
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': '2INGk9K4kwjN7R3O715pLVDmiTT8pdlbtEDWb70GwgH0PBZn1wTBSscQXojBHQd6',
  },
});

interface User {
  returning: any;
  id: number;
  uid: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// create a new user
export const createUser = async (email: string, uid: string): Promise<number> => {
  const query = `
    mutation CreateUser($uid: String!, $email: String!) {
      insert_user(objects: {email: $email, uid: $uid}) {
        returning {
          id
        }
      }
    }
  `;

  const variables = {
    email,
    uid,
  };

  const data = await client.request<{ insert_users_one: User }>(query, variables);

  return data.insert_users_one.returning[0];
};

// read all todos for a user
export const getTodos = async (userId: number): Promise<Todo[]> => {
  const query = `
    query GetTodos {
      todos(where: {user_id: {_eq: ${userId}}}) {
        id
        title
        completed
      }
    }
  `;

  const variables = {
    userId,
  };

  const data = await client.request<{ todos: Todo[] }>(query, variables);

  return data.todos;
};

// create a new todo for a user
export const createTodo = async (user_id: number, title: string, completed:boolean): Promise<Todo> => {
  const query = `
    mutation CreateTodo($user_id: Int!, $title: String!, $completed: Boolean!) {
      insert_todos_one(object: {title: $title, completed: $completed, user_id: $user_id}) {
        id,
        title,
        completed
      }
    }
  `;

  const variables = {
    user_id,
    title,
    completed
  };

  const data = await client.request<{ insert_todos_one: Todo }>(query, variables);

  return data.insert_todos_one;
};

// update a todo
export const updateTodo = async (
    id: number,
    title: string,
    completed: boolean
  ) => {
    const query = `
      mutation UpdateTodo($id: uuid!, $title: String!, $completed: Boolean!) {
        update_todos_by_pk(
          pk_columns: { id: $id }
          _set: { title: $title, completed: $completed }
        ) {
          id
          title
          completed
        }
      }
    `;
  
    const variables = {
      id,
      title,
      completed,
    };
  
    const data = await client.request<{ update_todos_by_pk: Todo }>(query, variables);
  
    return data.update_todos_by_pk;
  };
  
  // delete a todo
  export const deleteTodo = async (todoId: number) => {
    const query = `
      mutation DeleteTodo($todoId: Int!) {
        delete_todos_by_pk(id: $todoId) {
          id
        }
      }
    `;
  
    const variables = {
      todoId,
    };
  
    const data = await client.request<{ delete_todos_by_pk: Todo }>(query, variables);
  
    return data.delete_todos_by_pk;
  };
  
