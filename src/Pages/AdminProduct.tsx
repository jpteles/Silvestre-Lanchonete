import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productApi } from "../services/api";

const URL_PRODUCT = import.meta.env.VITE_PRODUCT_API || "http://localhost:8081";

interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl?: string;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "PRATOS_DO_DIA", 
    available: true,
    image: null as File | null,
  });

  // ==========================================
  // EFEITO DE SEGURANÇA (MODO DE TESTE ATIVADO)
  // ==========================================
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    
    if (role !== "Administrador") {
      console.log("Fui expulso! O meu cargo real gravado no navegador é:", role);
      // As duas linhas abaixo continuam comentadas para podermos testar à força
      // navigate("/"); 
      // return; 
    }

    carregarProdutos();
  }, [navigate]);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const response = await productApi.get('/products'); 
      // Proteção extra caso o backend não devolva um array
      const data = response.data.content ?? response.data;
      setProdutos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setProdutos([]); // Garante que não crasha se der erro
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    if (type === "file") {
      setFormData({ ...formData, [name]: target.files?.[0] ?? null });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: "", 
      description: "", 
      price: "", 
      category: "PRATOS_DO_DIA", 
      available: true, 
      image: null 
    });
    setIsEditing(null);
    setShowForm(false);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("description", formData.description);
    submissionData.append("price", String(formData.price));
    submissionData.append("category", formData.category);
    submissionData.append("available", String(formData.available));
    if (formData.image) submissionData.append("image", formData.image);

    try {
      if (isEditing) {
        await productApi.put(`/products/${isEditing.id}`, submissionData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Produto atualizado com sucesso!");
      } else {
        await productApi.post('/products', submissionData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Produto cadastrado com sucesso!");
      }
      resetForm();
      carregarProdutos();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || "Erro ao salvar produto.";
      alert(errorMsg);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await productApi.delete(`/products/${id}`);
        carregarProdutos();
      } catch (err: any) {
        alert(err.response?.data?.message || "Erro ao excluir produto.");
      }
    }
  };

  const handleEdit = (produto: Produto) => {
    setIsEditing(produto);
    setFormData({
      name: produto.name || "",
      description: produto.description || "",
      price: produto.price ? String(produto.price) : "0",
      category: produto.category || "PRATOS_DO_DIA",
      available: produto.available ?? true,
      image: null,
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 font-poppins">

      {/* Topo */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Administração de Produtos</h1>
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
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome" required className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500" />
              <input name="price" value={formData.price} onChange={handleChange} placeholder="Preço" required type="number" step="0.01" className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500" />
              
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required 
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="PRATOS_DO_DIA">Pratos do Dia</option>
                <option value="PRATOS_ESPECIAIS">Pratos Especiais</option>
                <option value="PRATOS_EXECUTIVOS">Pratos Executivos</option>
                <option value="HAMBURGUERES_BEIRUTES">Hambúrgueres & Beirutes</option>
                <option value="BEBIDAS">Bebidas</option>
              </select>

              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descrição" rows={3} className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-orange-500" />
              <input name="image" type="file" accept="image/*" onChange={handleChange} className="text-sm text-zinc-500" />
              <label className="flex items-center gap-2 text-sm text-zinc-700">
                <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} className="accent-orange-500" />
                Disponível
              </label>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 rounded-lg bg-orange-500 py-2 text-sm font-bold text-white hover:bg-orange-600 transition">
                  {isEditing ? "Atualizar" : "Adicionar"}
                </button>
                <button type="button" onClick={resetForm} className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-zinc-400">
            Carregando produtos...
          </div>
        ) : (
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
                    {/* Proteção na Imagem */}
                    {produto.imageUrl && typeof produto.imageUrl === 'string'
                      ? <img 
                          src={produto.imageUrl.startsWith('http') ? produto.imageUrl : `${URL_PRODUCT}${produto.imageUrl}`} 
                          alt={produto.name || 'Produto'} 
                          className="h-12 w-12 rounded-lg object-cover" 
                        />
                      : <div className="h-12 w-12 rounded-lg bg-zinc-100" />
                    }
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-900">{produto.name || 'Sem nome'}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${produto.available ? "text-green-500" : "text-red-500"}`}>
                      {produto.available ? "Disponível" : "Indisponível"}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs text-zinc-500">{produto.description || ''}</td>
                  <td className="px-4 py-3 text-zinc-900">
                    {/* Proteção no Preço */}
                    R$ {produto.price != null && !isNaN(produto.price) ? Number(produto.price).toFixed(2) : "0.00"}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {/* Proteção na Categoria (Evita o crash fatal do replace) */}
                    {produto.category ? String(produto.category).replace(/_/g, ' ') : 'Sem categoria'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleEdit(produto)} className="flex items-center gap-1 text-green-500 hover:text-green-600 font-medium">
                        <Pencil className="h-4 w-4" /> Edit
                      </button>
                      <button onClick={() => handleDelete(produto.id)} className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium">
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPage;