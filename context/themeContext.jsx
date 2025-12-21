import React, { createContext, useContext, useEffect, useState } from "react";

const Theme = createContext(null);
export const useTheme = () => useContext(Theme);

export const ThemeContext = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://raw.githubusercontent.com/aftab-08khan/UAE_Rental_API/refs/heads/main/uae_properties.json"
        );

        if (!res.ok) throw new Error("Failed to fetch properties");

        const data = await res.json();

        setProperties(data);
        setFilteredProperties(data); // ✅ important
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
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
        filteredProperties,
        setFilteredProperties,
      }}
    >
      {children}
    </Theme.Provider>
  );
};
