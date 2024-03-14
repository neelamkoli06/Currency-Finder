import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import CountryCard from "./CountryCard";
import "./CountryList.css";

const CountryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const handleQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const url = "https://restcountries.com/v3.1";

  const handleSearch = async () => {
    try {
      setLoading(true);
      setCountries([]);
      const response = await axios.get(
        `${url}/currency/${searchQuery.toLowerCase()}`
      );
      setCountries(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearch();
    }
  }, [searchQuery]);

  const countriesList = () => {
    if (loading) {
      return (
        <div className="my-5">
          <Spinner />
        </div>
      );
    }
    if (countries?.length === 0 && searchQuery.length > 0) {
      return (
        <div>
          No results found for <span>{searchQuery}</span>, please try another
          keyword
        </div>
      );
    }
    if (countries?.length > 0) {
      return countries?.map((country, i) => {
        return (
          <Col className="mb-4" xs={4} key={i + 1}>
            <CountryCard country={country} />
          </Col>
        );
      });
    }
  };

  return (
    <>
      <Container className="text-center">
        <h1 className="heading my-5">Currency App</h1>
        <div className="d-flex justify-content-center mb-5">
          <Col xs={5}>
            <Form.Group controlId="countryForm">
              <Form.Label>Enter Currency code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search By currency INR, EUR"
                value={searchQuery}
                onChange={handleQuery}
              />
            </Form.Group>
          </Col>
        </div>
        <Row>{countriesList()}</Row>
      </Container>
    </>
  );
};

export default CountryList;
