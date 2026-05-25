import AdminPage from './AdminProduct';
import AdminOrderStatus from './AdminOrderStatus';

export function Admin() {
  return (
    <section className="h-192 bg-[#EF6A11]">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6">
      <h1 className="text-3xl text-cyan-600 font-bold mb-8">Painel Administrativo</h1>
      
        <AdminPage />
        <br />
        <AdminOrderStatus />
    </div>
    </section>
  );
}
export default Admin;