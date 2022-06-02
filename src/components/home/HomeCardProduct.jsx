// import PropTypes from "prop-types";
import React, { useContext } from 'react';
import '../../css/HomeCardProduct.css';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';

function HomeCardProduct(props) {
  const navigate = useNavigate();
  const { product } = props;
  // const { setViewProductDetails, replaceSpecialChars } = useContext(Context);

  // const redirectProductDetails = ({ target: { value } }) => {
  //   setViewProductDetails(product);
  //   localStorage.setItem('viewProductDetails', JSON.stringify(product));
  //   navigate(`/product/${ value }`);
  //   window.location.reload();
  // };

  const addToCart = () => {

    if (!JSON.parse(localStorage.getItem('cartProducts')) || JSON.parse(localStorage.getItem('cartProducts')).length === 0) {
      const setProduct = product;
      setProduct.quantity = 1;
      localStorage.setItem('cartProducts', JSON.stringify([ setProduct ]));

    } else {
      const findProduct = JSON.parse(localStorage.getItem('cartProducts')).find(
        (productFind) => productFind.sku === product.sku,
      );

      if (!findProduct) {
        console.log('entrou no if');
        const setProduct = product;
        setProduct.quantity = 1;
        const newArray = JSON.parse(localStorage.getItem('cartProducts')).filter(
          (productFilter) => productFilter.sku !== setProduct.sku,
        );
        newArray.push(setProduct);
        localStorage.setItem('cartProducts', JSON.stringify(newArray));

      }
      if (findProduct) {
        console.log('entrou no else');
        const setProduct = findProduct;
        setProduct.quantity += 1;
        const newArray = JSON.parse(localStorage.getItem('cartProducts')).filter(
          (productFilter) => productFilter.sku !== setProduct.sku,
        );
        newArray.push(setProduct);
        localStorage.setItem('cartProducts', JSON.stringify(newArray));
      }
    }
  };
  return (

    <div className="HomeCardProduct">
      <div className="card-body">
        <img
          src={product.image}
          alt={product.name}
          className="thumbnail"
        />
        <div className="card-title">
          <h4>{product.name}</h4>
        </div>
        <div className="card-price">
          <h4>{product.price}</h4>
        </div>
      </div>
      <div className="card-cart">
        <button
          type="button"
          onClick={addToCart}
          className="add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

// HomeCardProduct.propTypes = {
//   ean: PropTypes.string,
//   name: PropTypes.string,
//   price: PropTypes.number,
//   categories: PropTypes.arrayOf(PropTypes.string),
// };

export default HomeCardProduct;
