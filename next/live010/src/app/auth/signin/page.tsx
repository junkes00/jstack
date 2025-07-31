import Link from "next/link";

export default function SignIn() {
  return (
    <div>
      <h1>SignIn</h1>
      <Link href="/auth/signup">Ir para o SignUp</Link>
      <Link href="/">Voltar para a Home</Link>
    </div>
  );
}