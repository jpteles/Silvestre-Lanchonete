// import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
// import apiClient from "../services/api";
// import { Pencil, Trash2, X } from "lucide-react";

// interface Produto {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   available: boolean;
//   imageUrl?: string;
// }

// const AdminPage: React.FC = () => {
//   const [produtos, setProdutos] = useState<Produto[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [isEditing, setIsEditing] = useState<Produto | null>(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     available: true,
//     image: null as File | null,
//   });

//   useEffect(() => {
//     carregarProdutos();
//   }, []);

//   const carregarProdutos = async () => {
//     try {
//       const response = await apiClient.get<Produto[]>("/products");
//       setProdutos(response.data);
//     } catch (err) {
//       console.error("Erro ao carregar produtos:", err);
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const target = e.target as HTMLInputElement;
//     const { name, value, type } = target;
//     if (type === "file") {
//       setFormData({ ...formData, [name]: target.files ? target.files[0] : null });
//     } else if (type === "checkbox") {
//       setFormData({ ...formData, [name]: target.checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const resetForm = () => {
//     setFormData({ name: "", description: "", price: "", category: "", available: true, image: null });
//     setIsEditing(null);
//     setShowForm(false);
//     const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
//     if (fileInput) fileInput.value = "";
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const submissionData = new FormData();
//     submissionData.append("name", formData.name);
//     submissionData.append("description", formData.description);
//     submissionData.append("price", String(formData.price));
//     submissionData.append("category", formData.category);
//     submissionData.append("available", String(formData.available));
//     if (formData.image) submissionData.append("image", formData.image);

//     try {
//       if (isEditing) {
//         await apiClient.put(`/products/${isEditing.id}`, submissionData);
//         alert("Produto atualizado com sucesso!");
//       } else {
//         await apiClient.post("/products", submissionData);
//         alert("Produto cadastrado com sucesso!");
//       }
//       resetForm();
//       carregarProdutos();
//     } catch (err: any) {
//       const errorMsg = err.response?.data?.message || err.message || "Erro ao salvar produto.";
//       alert(errorMsg);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Tem certeza que deseja excluir este produto?")) {
//       try {
//         await apiClient.delete(`/products/${id}`);
//         carregarProdutos();
//       } catch (err: any) {
//         alert(err.response?.data?.message || "Erro ao excluir produto.");
//       }
//     }
//   };

//   const handleEdit = (produto: Produto) => {
//     setIsEditing(produto);
//     setFormData({
//       name: produto.name,
//       description: produto.description,
//       price: String(produto.price),
//       category: produto.category,
//       available: produto.available,
//       image: null,
//     });
//     setShowForm(true);
//   };

//   return (
//     <div className="min-h-screen bg-white px-6 py-8 font-poppins">

//       {/* Topo */}
//       <div className="mb-6 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-zinc-900">Produto</h1>
//         <button
//           onClick={() => { resetForm(); setShowForm(true); }}
//           className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600 transition"
//         >
//           + Adicionar produto
//         </button>
//       </div>

//       {/* Modal de formulário */}
//       {showForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-lg font-bold text-zinc-900">
//                 {isEditing ? "Editar Produto" : "Novo Produto"}
//               </h2>
//               <button onClick={resetForm}>
//                 <X className="h-5 w-5 text-zinc-500 hover:text-zinc-900" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//               <input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Nome"
//                 required
//                 className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 placeholder="Preço"
//                 required
//                 type="number"
//                 step="0.01"
//                 className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 placeholder="Categoria"
//                 required
//                 className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Descrição"
//                 rows={3}
//                 className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 name="image"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="text-sm text-zinc-500"
//               />
//               <label className="flex items-center gap-2 text-sm text-zinc-700">
//                 <input
//                   type="checkbox"
//                   name="available"
//                   checked={formData.available}
//                   onChange={handleChange}
//                   className="accent-orange-500"
//                 />
//                 Disponível
//               </label>
//               <div className="flex gap-2 pt-2">
//                 <button
//                   type="submit"
//                   className="flex-1 rounded-lg bg-orange-500 py-2 text-sm font-bold text-white hover:bg-orange-600 transition"
//                 >
//                   {isEditing ? "Atualizar" : "Adicionar"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition"
//                 >
//                   Cancelar
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Tabela */}
//       <div className="overflow-hidden rounded-2xl border border-zinc-200">
//         <table className="w-full text-sm">
//           <thead className="bg-zinc-50 text-zinc-500">
//             <tr>
//               <th className="px-4 py-3 text-left">Imagem</th>
//               <th className="px-4 py-3 text-left">Nome</th>
//               <th className="px-4 py-3 text-left">Status</th>
//               <th className="px-4 py-3 text-left">Descrição</th>
//               <th className="px-4 py-3 text-left">Preço</th>
//               <th className="px-4 py-3 text-left">Categoria</th>
//               <th className="px-4 py-3 text-left">Ação</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-zinc-100">
//             {produtos.map((produto) => (
//               <tr key={produto.id} className="hover:bg-zinc-50">
//                 <td className="px-4 py-3">
//                   {produto.imageUrl ? (
//                     <img
//                       src={produto.imageUrl}
//                       alt={produto.name}
//                       className="h-12 w-12 rounded-lg object-cover"
//                     />
//                   ) : (
//                     <div className="h-12 w-12 rounded-lg bg-zinc-100" />
//                   )}
//                 </td>
//                 <td className="px-4 py-3 font-medium text-zinc-900">{produto.name}</td>
//                 <td className="px-4 py-3">
//                   <span className={`font-semibold ${produto.available ? "text-green-500" : "text-red-500"}`}>
//                     {produto.available ? "Disponível" : "Indisponível"}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 max-w-xs text-zinc-500">{produto.description}</td>
//                 <td className="px-4 py-3 text-zinc-900">
//                   R$ {typeof produto.price === "number" ? produto.price.toFixed(2) : "N/A"}
//                 </td>
//                 <td className="px-4 py-3 text-zinc-500">{produto.category}</td>
//                 <td className="px-4 py-3">
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleEdit(produto)}
//                       className="flex items-center gap-1 text-green-500 hover:text-green-600 font-medium"
//                     >
//                       <Pencil className="h-4 w-4" />
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(produto.id)}
//                       className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

//Como é para funcionar 

import React, { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";

interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl?: string;
}

const mockProdutos: Produto[] = [
  { id: "1", name: "Virado à Paulista", description: "Acompanha arroz soltinho, feijão, couve, farofa, ovos e suculenta linguiça grelhada.", price: 24.90, category: "Pratos do dia", available: true, imageUrl: "/assets/Virado_a_Paulista_1.jpg" },
  { id: "2", name: "Bife à Rolê", description: "Acompanha arroz soltinho, feijão e bife à rolê.", price: 24.90, category: "Pratos do dia", available: true, imageUrl: "/assets/bife_a_role.jpg" },
  { id: "3", name: "Feijoada", description: "Acompanha arroz soltinho, feijoada, couve, farofa, torresmo e bisteca.", price: 24.90, category: "Pratos do dia", available: false, imageUrl: "/assets/feijoada.jpg" },
  { id: "4", name: "Picanha", description: "Acompanha picanha assada, feijão, arroz, farofa e vinagrete.", price: 35.00, category: "Pratos especiais", available: true, imageUrl: "/assets/picanha.jpg" },
  { id: "5", name: "X-Salada", description: "O Sanduíche acompanha carne bovina, queijo, alface, tomate, cebola e maionese.", price: 12.00, category: "Hambúrgueres & Beirutes", available: true, imageUrl: "/assets/x_salada.png" },
]

const AdminPage: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState<Produto | null>(null);
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", category: "", available: true, image: null as File | null,
  });

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", category: "", available: true, image: null });
    setIsEditing(null);
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    if (type === "file") setFormData({ ...formData, [name]: target.files?.[0] ?? null });
    else if (type === "checkbox") setFormData({ ...formData, [name]: target.checked });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrl = formData.image
      ? URL.createObjectURL(formData.image)
      : isEditing?.imageUrl;

    if (isEditing) {
      setProdutos(produtos.map(p => p.id === isEditing.id ? {
        ...p,
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        available: formData.available,
        imageUrl: imageUrl,
      } : p));
    } else {
      setProdutos([...produtos, {
        id: String(Date.now()),
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        available: formData.available,
        imageUrl: imageUrl,
      }]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setProdutos(produtos.filter(p => p.id !== id));
  };

  const handleEdit = (produto: Produto) => {
    setIsEditing(produto);
    setFormData({
      name: produto.name,
      description: produto.description,
      price: String(produto.price),
      category: produto.category,
      available: produto.available,
      image: null,
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 font-poppins">

      {/* Topo */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Produto</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600 transition"
        >
          + Adicionar produto
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900">
                {isEditing ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button onClick={resetForm}>
                <X className="h-5 w-5 text-zinc-500 hover:text-zinc-900" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome"
                required
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Preço"
                required
                type="number"
                step="0.01"
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Categoria"
                required
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrição"
                rows={3}
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="text-sm text-zinc-500"
              />
              <label className="flex items-center gap-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="accent-orange-500"
                />
                Disponível
              </label>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-orange-500 py-2 text-sm font-bold text-white hover:bg-orange-600 transition"
                >
                  {isEditing ? "Atualizar" : "Adicionar"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-4 py-3 text-left">Imagem</th>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Descrição</th>
              <th className="px-4 py-3 text-left">Preço</th>
              <th className="px-4 py-3 text-left">Categoria</th>
              <th className="px-4 py-3 text-left">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {produtos.map((produto) => (
              <tr key={produto.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3">
                  {produto.imageUrl
                    ? <img src={produto.imageUrl} alt={produto.name} className="h-12 w-12 rounded-lg object-cover" />
                    : <div className="h-12 w-12 rounded-lg bg-zinc-100" />
                  }
                </td>
                <td className="px-4 py-3 font-medium text-zinc-900">{produto.name}</td>
                <td className="px-4 py-3">
                  <span className={`font-semibold ${produto.available ? "text-green-500" : "text-red-500"}`}>
                    {produto.available ? "Disponível" : "Indisponível"}
                  </span>
                </td>
                <td className="px-4 py-3 max-w-xs text-zinc-500">{produto.description}</td>
                <td className="px-4 py-3 text-zinc-900">R$ {produto.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-zinc-500">{produto.category}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(produto)}
                      className="flex items-center gap-1 text-green-500 hover:text-green-600 font-medium"
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(produto.id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;