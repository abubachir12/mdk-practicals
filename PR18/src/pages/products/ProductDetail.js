import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { categories, formatPrice, getProductById } from '../../data/products';

// Задание 2. Страница товара: id берётся из адреса /products/:id
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  if (!product) {
    return <section className="section">
      <h2>Товар не найден</h2>
      <p className="status-error">Товара с ID {id} не существует.</p>
      <button onClick={() => navigate('/products')}>Вернуться к товарам</button>
    </section>;
  }

  return <section className="section">
    <button onClick={() => navigate(-1)}>Назад</button>
    <h2>{product.name}</h2>
    <div className="demo product-card">
      <p><strong>Цена:</strong> {formatPrice(product.price)}</p>
      <p><strong>Описание:</strong> {product.description}</p>
      <p><strong>Категория:</strong> {categories[product.category]}</p>
      <p><strong>ID товара:</strong> {id}</p>
    </div>
    <p><Link to="/products">← К списку товаров</Link></p>
  </section>;
}
