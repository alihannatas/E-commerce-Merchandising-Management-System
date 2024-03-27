import  { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Ürünleri ve kategorileri veritabanından al
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
    fetch('http://localhost:3000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleAddProduct = (product) => {
    // Yeni ürünü veritabanına ekle
    fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(res => res.json())
      .then(data => {
        setProducts([...products, data]);
        // Formu temizle
        document.getElementById("addProductForm").reset();
      });
  };

  const handleUpdateProduct = (product) => {
    // Mevcut ürünü veritabanında güncelle
    fetch(`http://localhost:3000/api/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(res => res.json())
      .then(data => {
        const updatedProducts = products.map(p => (p.id === data.id ? data : p));
        setProducts(updatedProducts);
        setEditingProduct(null);
      });
  };

  const handleDeleteProduct = (productId) => {
    // Ürünü veritabanından sil
    fetch(`http://localhost:3000/api/products/${productId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
      });
  };

  const handleFilterByCategory = (categoryId) => {
    // Kategoriye göre filtrelenmiş ürünleri veritabanından al
    setSelectedCategory(categoryId);
    fetch(`http://localhost:3000/api/products/category/${categoryId}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  // Kategori ID'lerini kategori isimlerine dönüştürme fonksiyonu
  const getCategoryNameById = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.name : '';
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const renderEditForm = () => {
    if (!editingProduct) return null;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const updatedProduct = {
            id: editingProduct.id,
            title: e.target.title.value,
            description: e.target.description.value,
            categoryId: e.target.categoryId.value,
            stockQuantity: e.target.stockQuantity.value
          };
          handleUpdateProduct(updatedProduct);
        }}
        className="border border-neutral-600 rounded-md p-4 m-4 flex flex-col  gap-y-1"
      >
        <h2 className="text-3xl text-center bg-slate-400">Ürünü Düzenle</h2>
        <label htmlFor="title" className="text-left pb-1">
          Ürün Adı
        </label>
        <input type="text" name="title" defaultValue={editingProduct.title} className="border rounded-md p-2 mb-4" maxLength={200} required/>
        <label htmlFor="description" className="text-left pb-1">
          Ürün Açıklaması
        </label>
        <textarea type="text" name="description" defaultValue={editingProduct.description} className="border rounded-md p-2 mb-4" required/>
        <label htmlFor="stockQuantity" className="text-left pb-1">
          Stok Adet
        </label>
        <input type="number" name="stockQuantity" defaultValue={editingProduct.stockQuantity} className="border rounded-md p-2 mb-4" required/>
        <label htmlFor="categoryId" className="text-left pb-1">
          Kategori
        </label>
        <select name="categoryId" defaultValue={editingProduct.categoryId} className="border rounded-md p-2 mb-4" required>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Güncelle
        </button>
        <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white p-2 rounded-md ml-2">
          İptal
        </button>
      </form>
    );
  };

  return (
    <div className="m-5 font-sans">
      <h1 className="text-5xl font-bold">Ürün Yönetimi</h1>
      <div className="flex justify-center items-center"></div>
      <form
        id="addProductForm" 
        onSubmit={(e) => {
          e.preventDefault();
          const newProduct = {
            title: e.target.name.value,
            description: e.target.description.value,
            categoryId: e.target.categoryId.value,
            stockQuantity: e.target.stockQuantity.value
          };
          handleAddProduct(newProduct);
        }}
        className="border border-neutral-600 rounded-md p-4 m-4 flex flex-col  gap-y-1"
      >
        <h2 className="text-3xl text-center bg-slate-400">Yeni Ürün Ekle</h2>
        <label htmlFor="name" className="text-left pb-1">
          Ürün Adı
        </label>
        <input type="text" name="name" className="border rounded-md p-2 mb-4" maxLength={200} required/>
        <label htmlFor="description" className="text-left pb-1">
          Ürün Açıklaması
        </label>
        <textarea type="text" name="description" className="border rounded-md p-2 mb-4" required/>
        <label htmlFor="stockQuantity" className="text-left pb-1">
          Stok Adet
        </label>
        <input type="number" name="stockQuantity" className="border rounded-md p-2 mb-4" required/>
        <label htmlFor="categoryId" className="text-left pb-1">
          Kategori
        </label>
        <select name="categoryId" className="border rounded-md p-2 mb-4" required>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category
                .name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-green-500 p-2 rounded-md">
          Ekle
        </button>
      </form>
      {renderEditForm()} {/* Düzenleme formunu ekranda göster */}
      <select
        value={selectedCategory}
        onChange={(e) => handleFilterByCategory(e.target.value)}
        className="border rounded-md p-2 mb-4"
      >
        <option value="">Tüm Kategoriler</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row justify-between bg-gray-200 p-2 border rounded-md mb-4 items-center">
          <span className="font-bold">Ürün ID</span>
          <span className="font-bold">Ürün Adı</span>
          <span className="font-bold">Açıklama</span>
          <span className="font-bold">Stok</span>
          <span className="font-bold">Kategori</span>
          <span className="font-bold">İşlem</span>
        </div>

        <ul className="m-4  w-full">
          {products.map(product => (
            <li key={product.id} className="border rounded-md p-4 flex flex-row justify-between items-center">
              <span>{product.id}</span>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <span>{product.stockQuantity}</span>
              <span>{getCategoryNameById(product.categoryId)}</span>
              <div>
                <button className='bg-blue-500 text-white' onClick={() => handleEditProduct(product)}>
                  Düzenle
                </button>
                <button className="bg-red-500 text-white" onClick={() => handleDeleteProduct(product.id)}>
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
