import React from 'react';
import { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } from './redux';

function App() {
  const [count, setCount] = React.useState('');
  const [newProduct, setNewProduct] = React.useState('');
  const [addProduct, { isError }] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAppProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct('');
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap();
  };

  const { data = [], isLoading } = useGetGoodsQuery(count);
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div className="App">
      <div>
        <input type="text" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
        <button onClick={() => handleAppProduct()}>Add</button>
      </div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      {data.map((item) => (
        <li onClick={() => handleDeleteProduct(item.id)} key={item.id}>
          {item.name}
        </li>
      ))}
    </div>
  );
}

export default App;
