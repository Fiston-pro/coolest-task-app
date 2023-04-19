import { auth } from "../../lib/firebase";
import { User, signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { user?: User; message?: string; }): void; new(): any; }; }; }) {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
        auth,
      email,
      password
    );
    const user = userCredential.user;

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ "message": "Invalid credentials" });
  }
}
