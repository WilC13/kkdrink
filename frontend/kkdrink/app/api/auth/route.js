import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return new Response(JSON.stringify({ user: userCredential.user }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
