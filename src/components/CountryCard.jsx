import Card from "react-bootstrap/Card";

const CountryCard = ({ country }) => {
  return (
    <>
      <Card className="">
        <Card.Img
          variant="top"
          src={country.flags.svg}
          alt={country.name.common}
        />
        <Card.Body>
          <Card.Title>{country.name.common}</Card.Title>
          <Card.Text>
            {Object.keys(country.currencies).map((currencyCode, index) => (
              <div key={index}>
                <p>
                  <strong>{country.currencies[currencyCode].symbol} </strong>
                  {country.currencies[currencyCode].name}
                  &nbsp;({currencyCode})
                </p>
              </div>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CountryCard;
