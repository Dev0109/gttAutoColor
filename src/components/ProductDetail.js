import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseURL from "../config";
import { Col, Row, Image, Form } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const ProductDetail = () => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${baseURL}/api/products/id/${id}`).then((response) => {
        setProduct(response.data);
      });
      await axios
        .get(`${baseURL}/api/product/car/id/${id}`)
        .then((response) => {
          setImageUrls(response.data.filenames);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <Row className="mr-0 ml-0 mb-5">
        <Col lg={8} md={10} sm={10} xs={10} className="product_detail">
          <Row className="product_item">
            <Col md={6} sm={10} xs={10}>
              <Image
                src={`${baseURL}${product.imageSrc}`}
                className={isHovered ? "hovered" : ""}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </Col>
            <Col md={6} sm={10} xs={10}>
              <Form>
                <strong>{product.name}</strong>
              </Form>
              <Form>{product.description}</Form>
            </Col>
          </Row>
          {imageUrls && (
            <Carousel>
              {imageUrls.map((imageUrl, index) => (
                <Carousel.Item className="slide" key={index}>
                  <Image
                    src={`${baseURL}/products/product${product.id}/${imageUrl}`}
                    alt={`Image ${index + 1}`}
                    className="car_image img-fluid rounded"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
