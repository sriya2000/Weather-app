import { Link,useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Header: React.FC = () => {

  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/city/${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <div className="d-flex flex-column mb-4">

       {/* Logo will be link to home page */}
      <Link to="/" style={{ textDecoration: 'none' }}></Link>
      <p className="display-4 fw-bold logo" style={{ cursor: 'pointer' }}>WW⚡</p>
      <div className="mb-4">
        <form className="d-flex position-relative" onSubmit={handleSubmit}>
          <input
            className="form-control ps-5 py-2 rounded-pill search-bar"
            type="search"
            placeholder="Search by City"
            aria-label="Search"
             value={search}
            onChange={e => setSearch(e.target.value)}
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
