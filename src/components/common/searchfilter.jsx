import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../css/searchfilter.css";
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const SearchFilter = ({ searchKeyword, setAllfilters, setFilters, filters }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [categories, setCategories] = useState([]);


  const getAllEventsCategories = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/events/allcategory`);
      console.log(response.data)
      //fill categories with data
      const categoryOptions = response.data.categories.map((category) => ({
        value: category.event_type,
        label: category.event_type,
      }));
      setCategories(categoryOptions);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllEventsCategories();
  }, [])


  // const categories = [
  //   { value: "Festival | Concert", label: "Festival | Concert" },
  //   { value: "Family", label: "Family" },
  //   { value: "Theater | Cinema", label: "Theater | Cinema" },
  //   { value: "Sport", label: "Sport" },
  //   { value: "Food | Drink", label: "Food | Drink" },
  //   { value: "Education", label: "Education" },
  //   { value: "Course | Lecture", label: "Course | Lecture" },
  // ];

  const cities = [
    { value: "Agadir", label: "Agadir" },
    { value: "Rabat", label: "Rabat" },
    { value: "Casablanca", label: "Casablanca" },
    { value: "Fes", label: "Fes" },
  ];

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (!filters.includes(category) && category !== "") {
      setSelectedCategory(category);
      setFilters([...filters, category]);
      //add category also in allfilters
      setAllfilters(prevAllfilters => ({
        ...prevAllfilters,
        categories: [...prevAllfilters.categories, category]
      }));
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    if (!filters.includes(city) && city !== "") {
      setSelectedCity(city);
      setFilters([...filters, city]);
      //add city also in allfilters
      setAllfilters(prevAllfilters => ({
        ...prevAllfilters,
        cities: [...prevAllfilters.cities, city]
      }));
    }
  };

  const handleDeleteFilter = (filter) => {
    const newFilters = filters.filter((f) => f !== filter);
    setFilters(newFilters);
    // remove filter from allfilters
    setAllfilters(prevAllfilters => {
      const newCategories = prevAllfilters.categories.filter(c => c !== filter);
      const newCities = prevAllfilters.cities.filter(city => city !== filter);
      return {
        categories: newCategories,
        cities: newCities
      };
    });

  };

  const handleClearAllFilters = () => {
    setFilters([]);
    setSelectedCategory("");
    setSelectedCity("");
    // clear the allfilters
    setAllfilters({
      categories: [],
      cities: []
    });

  };
  return (
    <div className="search-filter">
      <div className="search-filter-container">
        <div className="top-search-filter">
          <div className="search-keyword">Apply filter : </div>
          <div className="filter-input">
            <span className="material-symbols-outlined">category</span>
            <select value="" onChange={handleCategoryChange}>
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-input">
            <span className="material-symbols-outlined">pin_drop</span>
            <select value="" onChange={handleCityChange}>
              <option value="">City</option>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bottom-search-filter">
          <div className="left-side">
            <div className="search-keyword">
              Search result for : <span>"{searchKeyword?.startsWith(" ")? "": searchKeyword}"</span>
            </div>
            {filters.map((filter) => (
              <div key={filter} className="filter">
                <div
                  onClick={() => handleDeleteFilter(filter)}
                  className="close"
                  title="Cancel Filter"
                >
                  <span className="material-symbols-outlined">cancel</span>
                </div>
                <span className="content">{filter}</span>
              </div>
            ))}
          </div>
          <div className="right-side">
            {filters.length ? (
              <div onClick={handleClearAllFilters}>Clear All Filters</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
