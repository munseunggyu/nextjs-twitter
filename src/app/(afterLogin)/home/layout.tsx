export default function AfterLoginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      nav
      {children}
    </main>
  );
}
