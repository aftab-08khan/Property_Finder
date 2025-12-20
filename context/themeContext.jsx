import React, { createContext, useContext, useEffect, useState } from "react";

const Theme = createContext(null);
export const useTheme = () => useContext(Theme);

export const ThemeContext = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/aftab-08khan/UAE_Rental_API/refs/heads/main/uae_properties.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch properties");
        return res.json();
      })
      .then(setProperties)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const getPropertyById = (id) => {
    return properties.find((item) => Number(item.id) === Number(id));
  };
  const getPropertiesByCity = (city, limit = 8) => {
    return properties
      .filter((item) => {
        const propertyCity = item?.displayAddress
          ?.split(",")
          .pop()
          ?.trim()
          .toLowerCase();

        return propertyCity === city.toLowerCase();
      })
      .slice(0, limit);
  };

  return (
    <Theme.Provider
      value={{
        properties,
        loading,
        error,
        getPropertyById,
        getPropertiesByCity,
      }}
    >
      {children}
    </Theme.Provider>
  );
};
