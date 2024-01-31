import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import "./index.css";

const App = () => {
  const searchInput = useRef(null);

const handleSearch = (event) => {
  event.preventDefault();
  console.log(searchInput.current.value);
};

const handleSelection = (selection) => {
  searchInput.current.value = selection;
}
//Once the form is submitted by pressing the enter key in the search box, the page will not refresh and a submitted text will be displayed in the console
//enter any search term in the search box and press the enter key
  return (
    <div className="container">
      <h1 className="title">Image Search</h1>
      <div className="search-section">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Type something to search..."
            className="search-input"
            ref={searchInput}
          />
        </Form>
      </div>
      <div className="filters">
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
      </div>
    </div>
  );
};

export default App;
