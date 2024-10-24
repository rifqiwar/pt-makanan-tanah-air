import React from 'react';

// Contoh data produk terkait
const relatedProducts = [
  { id: 1, name: 'Produk A', tags: ['Makanan', 'Organik'] },
  { id: 2, name: 'Produk B', tags: ['Minuman', 'Sehat'] },
  { id: 3, name: 'Produk C', tags: ['Camilan', 'Lezat'] },
];

const PromoDetail: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">Detail Promo</h1>
      <img src="https://via.placeholder.com/600x200" alt="Promo Banner" className="mb-4" />
      <p className="mb-4">
        Dapatkan penawaran menarik dengan diskon hingga 50% untuk produk terpilih. Penawaran ini berlaku
        sampai akhir bulan ini. Jangan lewatkan kesempatan emas ini!
      </p>
      <a
        href="https://example.com"
        className="inline-block bg-blue-500 text-white py-2 px-4 rounded mb-5"
      >
        Kunjungi Tautan
      </a>

      {/* Bagian untuk produk terkait */}
      <h2 className="text-2xl font-bold mb-4">Produk Terkait</h2>
      <ul className="space-y-3">
        {relatedProducts.map(product => (
          <li key={product.id} className="p-4 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <div className="mt-2">
              {product.tags.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-200 text-gray-800 py-1 px-2 mr-2 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromoDetail;
