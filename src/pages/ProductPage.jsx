import React, { useEffect, useState, useMemo, useContext } from 'react';
import Context from '../context/Context';
import { Link } from 'react-router-dom';
import { Footer, HeaderGeneric, SelectQuantityProduct, CartModal, GoToButton } from '../components';
import './css/ProductPage.css';
import { FaCartArrowDown, FaCreditCard, FaHeart } from "react-icons/fa"; //https://react-icons.github.io/react-icons/icons?name=fa
import formatCoin from '../utils/formatCoin';

function ProductPage() {
  const product = useMemo(() => JSON.parse(localStorage.getItem('viewProductDetails')) || [], []);
  const favorites = useMemo(() => JSON.parse(localStorage.getItem('favorites')) || [], []);

  const [ isFavorite, setIsFavorite ] = useState(false);
  const { showModalCart, setShowModalCart } = useContext(Context);

  useEffect(() => {
    setShowModalCart(false)
  }, [])

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      const isFavorite = favorites.find((favorite) => favorite.id === product.id);
      setIsFavorite(!!isFavorite);
    }
  }, [ favorites, product.id, showModalCart ]);

  const addFavorite = () => {
    if (!JSON.parse(localStorage.getItem('favorites')) || JSON.parse(localStorage.getItem('favorites')).length === 0) {
      const setProduct = product;
      localStorage.setItem('favorites', JSON.stringify([ setProduct ]));
      setIsFavorite(true);
    } else {
      const findProduct = JSON.parse(localStorage.getItem('favorites')).find(
        (productFind) => productFind.name === product.name,
      );

      if (!findProduct) {
        const setProduct = product;
        const newArray = JSON.parse(localStorage.getItem('favorites')).filter(
          (productFilter) => productFilter.name !== setProduct.name,
        );
        newArray.push(setProduct);
        localStorage.setItem('favorites', JSON.stringify(newArray));
        setIsFavorite(true);
      } else {
        const newArray = JSON.parse(localStorage.getItem('favorites')).filter(
          (productFilter) => productFilter.name !== findProduct.name,
        );
        localStorage.setItem('favorites', JSON.stringify(newArray));
        setIsFavorite(false);
      }
    }
  };


  return (
    <div className="product-page">
      {showModalCart && <CartModal />}
      <HeaderGeneric />
      <div className="route-page">
        <a href="/" className="route-link">Home</a>
        <span>/</span>
        <span className="route-link-current">{product.name}</span>
      </div>
      <div className="container-details">
        <div className='details'>
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-details">
            <div className="product-name">
              <h1 className="product-detail-name">{product.name}</h1>
              <div className="icon-heart-detail">
                <button type="button" onClick={addFavorite}>
                  {
                    isFavorite ?
                      <FaHeart style={{ fill: 'red', cursor: 'pointer', fontSize: '20px' }} /> :
                      <FaHeart style={{ fill: 'rgba(128, 128, 128, 0.55)', cursor: 'pointer', fontSize: '20px' }} />
                  }
                </button>
              </div>
            </div>
            <h4 className="product-description">{product.description}</h4>
            <h3 className="product-price">{formatCoin(product.price)}</h3>
            <h6 className="product-avaliable">Estoque disponível</h6>
            <hr />
            <h6 className="add-cart">Adicionar ao Carrinho</h6>
            <SelectQuantityProduct key={product.name} product={product}
            />
            <div className="buttons">
              <GoToButton route="/cart" title="Ver carrinho de compras" icon="FaCreditCard" />
              <GoToButton route="/" title="Continuar comprando" icon="FaCartArrowDown" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
