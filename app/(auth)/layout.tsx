export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="flex items-center justify-center h-full ml-4">{children}</div>
  );
}