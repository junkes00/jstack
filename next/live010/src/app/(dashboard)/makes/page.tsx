import Link from "next/link";

async function getMakes() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return ["Audi", "BMW", "Mercedes", "Nissan", "Subaru"];
}

export default async function Makes() {
  const makes = await getMakes();

  return (
    <div>
      <h1 className="mb-4 text-xl">Marcas</h1>
      <div className="grid grid-cols-5 gap-4">
        {makes.map((make) => (
          <Link key={make} href={`/makes/${make}`}>
            <div
              key={make}
              className="bg-zinc-900 rounded-lg border border-zinc-700 grid place-items-center h-56"
            >
              {make}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
