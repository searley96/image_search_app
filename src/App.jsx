import axios from "axios";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import "./index.css";

const API_URL = "https://api.unsplash.com/search/photos";

const IMAGES_PER_PAGE = 20;

const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // define fetchImages function which is declared async so we can use await inside of it
  // inside fetchImages function, make a GET API call using axios to the URL in which API_URL constant is stored
  // store data.results using setImages and total pages using setTotalPages function

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log("data", data);
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  };

  // once the form is submitted by pressing the enter key in the search box, the page will not refresh and a submitted text will be displayed in the console
  // enter any search term in the search box and press the enter key
  // return image id, url, and alt description
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
        <div onClick={() => handleSelection("nature")}>Nature</div>
        <div onClick={() => handleSelection("birds")}>Birds</div>
        <div onClick={() => handleSelection("cats")}>Cats</div>
        <div onClick={() => handleSelection("shoes")}>Shoes</div>
      </div>
      <div className="images">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className="image"
          />
        ))}
      </div>
    </div>
  );
};

export default App;
