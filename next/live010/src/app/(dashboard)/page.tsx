import Link from "next/link";
import { Checkout } from "../components/checkout";
import { ListVehicles } from "../components/list-vehicles";

export default function Home() {
  // * using a server component in a client component
  return (
    <>
      <h1>Home</h1>
      {/* <Checkout list={<ListVehicles />} /> */}
      <Link href="/auth/signin">Ir para o SignIn</Link>
    </>
  );
}
