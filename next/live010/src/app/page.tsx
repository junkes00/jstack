import { Checkout } from "./components/checkout";
import { ListVehicles } from "./components/list-vehicles";

export default function Home() {
  // * using a server component in a client component
  return <Checkout list={<ListVehicles />} />;
}
