import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-full relative">
      <div className="hidden h-full md:flex md:flex-col  md:w-72 md:fixed md:inset-y-0 z-[80] bg-gradient-to-br from-black via-[#07030a] to-[#09000e] text-[#E0E0E0]">
        <div>
          <Sidebar />
        </div>
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>


    </div>
  );
}