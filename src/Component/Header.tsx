import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="d-flex flex-column mb-4">
      <p className="display-4 fw-bold logo">WW⚡</p>
      <div className="mb-4">
        <form className="d-flex position-relative">
          <input
            className="form-control ps-5 py-2 rounded-pill search-bar"
            type="search"
            placeholder="Search by City"
            aria-label="Search"
          />
          <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
            <i className="bi bi-search"></i>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Header;
