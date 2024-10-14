import React, { ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search food that you like..."
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
