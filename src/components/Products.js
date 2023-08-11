import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../config";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${baseURL}/api/products`).then((response) => {
        setProducts(response.data.details);
      });
    };
    fetchData();
  }, []);
  return (
    <div className="product_header">
      <Row className="product_content">
        {products.map((product, index) => {
          return (
            <Col
              key={index}
              xxl={3}
              lg={4}
              md={6}
              sm={10}
              xs={12}
              className="product_container"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={`${baseURL}${product.imageSrc}`}
                  alt={`product${product.id}`}
                  className="product_image"
                />
              </Link>
              {product.name}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Products;
