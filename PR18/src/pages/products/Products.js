import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products, categories, formatPrice } from '../../data/products';

// Задание 2. Список товаров. Фильтр хранится в адресе (?category=books),
// поэтому он сохраняется при переходе «Назад» и ссылку с фильтром можно отправить
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('category') || 'all';
  const filteredProducts = filter === 'all' ? products : products.filter(product => product.category === filter);

  const handleFilter = e => {
    const value = e.target.value;
    setSearchParams(value === 'all' ? {} : { category: value });
  };

  return <section className="section">
    <h2>Наши товары</h2>
    <div className="controls">
      <label htmlFor="category-filter">Фильтр по категории:</label>
      <select id="category-filter" value={filter} onChange={handleFilter}>
        <option value="all">Все</option>
        {Object.entries(categories).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
      <span className="muted">Найдено: {filteredProducts.length}</span>
    </div>
    <div className="demo-grid">
      {filteredProducts.map(product => <article key={product.id} className="demo">
        <h3>{product.name}</h3>
        <p>Цена: {formatPrice(product.price)}</p>
        <p>Категория: {categories[product.category]}</p>
        <Link to={`/products/${product.id}`}>Подробнее</Link>
      </article>)}
    </div>
  </section>;
}
