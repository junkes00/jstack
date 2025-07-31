async function getVehicles() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return ["RS5", "M2", "M3", "RS6"];
}

export async function ListVehicles() {
  const vehicles = await getVehicles();

  return (
    <ul>
      {vehicles.map((vehicle) => (
        <li key={vehicle}>{vehicle}</li>
      ))}
    </ul>
  );
}
