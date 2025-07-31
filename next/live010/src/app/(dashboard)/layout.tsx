export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="h-20 border-b border-zinc-800 flex items-center">
        <div className="container mx-auto  px-10">
          <strong>jstacar</strong>
        </div>
      </header>

      <div className="container mt-10 mx-auto px-10">{children}</div>
    </div>
  );
}
