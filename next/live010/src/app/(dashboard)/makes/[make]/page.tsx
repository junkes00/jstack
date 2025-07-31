interface IMakeProps {
  params: {
    make: string;
  };
}

export default function Make({ params }: Readonly<IMakeProps>) {
  return <div>
    <h1>Todos os veículos de: {params.make}</h1>
  </div>;
}
