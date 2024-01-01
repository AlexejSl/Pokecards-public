import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateSearchResults = (results) => setSearchResults(results);
  const isLoadingCheck = (bool) => setIsLoading(bool);

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        updateSearchResults,
        isLoading,
        isLoadingCheck,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
