import React from "react";

export const Card = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.freepik.com/premium-photo/typical-brazilian-brigadeiros-various-flavors-wooden-table_92534-443.jpg?w=1380"
          alt="Brigadeiro"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Brigadeiros!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
