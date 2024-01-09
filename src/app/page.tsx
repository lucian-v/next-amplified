import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";

import config from "@/amplifyconfiguration.json";
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import styles from "./page.module.css";

const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

async function createTodo(formData: FormData) {
  "use server";
  const { data } = await cookiesClient.graphql({
    query: mutations.createTodo,
    variables: {
      input: {
        name: formData.get("name")?.toString() ?? "",
      },
    },
  });

  console.log("Created Todo: ", data?.createTodo);

  revalidatePath("/");
}

export default async function Home() {
  const { data, errors } = await cookiesClient.graphql({
    query: queries.listTodos,
  });

  const todos = data.listTodos.items;

  return (
    <main className={styles.main}>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <form action={createTodo}>
          <input name="name" placeholder="Add a todo" />
          <button type="submit">Add</button>
        </form>

        {(!todos || todos.length === 0 || errors) && (
          <div>
            <p>No todos, please add one.</p>
          </div>
        )}

        <ul style={{ textAlign: "left" }}>
          {todos.map((todo) => {
            return (
              <li key={todo.id} style={{ listStyle: "none" }}>
                {todo.name}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
