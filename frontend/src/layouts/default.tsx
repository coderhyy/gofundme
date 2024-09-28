import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        {/* 新增: 联系方式 */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>Email: info@ournonprofit.org</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Charity Lane, Giving City, 12345</p>
        </div>
      </footer>
    </div>
  );
}
