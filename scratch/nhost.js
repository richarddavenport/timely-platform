import { createClient } from "nhost-js-sdk";

const client = createClient({
  baseURL: `http://localhost:4000`,
});

async function run() {
  try {
    const { user, session } = await client.auth.register({
      email: "rad22684@gmail.com",
      password: "foobarbaz1!",
    });
    console.log(
      "🚀 ~ file: nhost.js ~ line 17 ~ run ~ user, session",
      user,
      session
    );
  } catch (error) {
    console.log(error);
  }
}

run();
