import Link from "next/link";

export default function SignUp() {
  return (
    <div>
      <h1>SignUp</h1>
      <Link href="/auth/signin">Ir para o SignIn</Link>
    </div>
  );
}
