import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="background-image">
        <div className="text-overlay">
          <h1>Accesorios para Mujer</h1>
          <p>Explora nuestras categorías de productos</p>
        </div>
        <div className="product-images">
          <div className="product-image product-one">
            <img
              src="https://lavanijewels.com/cdn/shop/products/Anillo-ojo-turco-Lavani_900x.jpg?v=1710771689"
              alt="Zarcillos"
            />
          </div>
          <div className="product-image product-two">
            <img
              src="https://ae-pic-a1.aliexpress-media.com/kf/S7c5525173a834ca6b537f4f1c119f207T/Anillo-de-dedo-ajustable-abierto-de-ojo-malvado-cl-sico-con-circonita-c-bica-para-mujer.jpg_640x640Q90.jpg_.webp"
              alt="Anillos"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;