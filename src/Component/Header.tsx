import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header: React.FC = () => {

  //inputCity = Store input field value
  //setInputCity = To update input value
  const [inputCity, setInputCity] = useState('');

  //To change the route
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {

    //Page will not reload when form will be submitted
    e.preventDefault();

    //If input is not blank it will navigate to /cityName route
    if (inputCity.trim()) {
      navigate(`/${inputCity.trim()}`);
    }
  };

  return (
    <div className="d-flex flex-column">
      <Link to="/" className="display-4 fw-bold logo text-decoration-none text-warning">WW⚡</Link>
      {/* <p className="display-4 fw-bold logo">WW⚡</p> */}
      <form className="d-flex position-relative my-2" onSubmit={handleSearch}>
        <input
          className="form-control ps-5 py-2 rounded-pill search-bar"
          type="search"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Search by City"
          aria-label="Search"
        />
        <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
          <i className="bi bi-search"></i>
        </span>
        <button type="submit" className="btn btn-primary ms-2 px-4 rounded-pill">Search</button>
      </form>
    </div>
  );
};

export default Header;
