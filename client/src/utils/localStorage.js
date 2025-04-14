// Save user preferences to localStorage
export const savePreferences = (preferences) => {
  try {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error("Error saving preferences to localStorage:", error);
    return false;
  }
};

// Get user preferences from localStorage
export const getPreferences = () => {
  try {
    const preferences = localStorage.getItem("userPreferences");
    return preferences ? JSON.parse(preferences) : null;
  } catch (error) {
    console.error("Error getting preferences from localStorage:", error);
    return null;
  }
};

// Save search history to localStorage
export const saveSearchHistory = (search) => {
  try {
    const history = getSearchHistory();
    const newHistory = history ? [search, ...history.filter(s => s !== search).slice(0, 9)] : [search];
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    return true;
  } catch (error) {
    console.error("Error saving search to localStorage:", error);
    return false;
  }
};

// Get search history from localStorage
export const getSearchHistory = () => {
  try {
    const history = localStorage.getItem("searchHistory");
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error getting search history from localStorage:", error);
    return [];
  }
};

// Save recently viewed properties to localStorage
export const saveRecentlyViewed = (propertyId) => {
  try {
    const viewed = getRecentlyViewed();
    const newViewed = viewed ? [propertyId, ...viewed.filter(id => id !== propertyId).slice(0, 9)] : [propertyId];
    localStorage.setItem("recentlyViewed", JSON.stringify(newViewed));
    return true;
  } catch (error) {
    console.error("Error saving recently viewed to localStorage:", error);
    return false;
  }
};

// Get recently viewed properties from localStorage
export const getRecentlyViewed = () => {
  try {
    const viewed = localStorage.getItem("recentlyViewed");
    return viewed ? JSON.parse(viewed) : [];
  } catch (error) {
    console.error("Error getting recently viewed from localStorage:", error);
    return [];
  }
};

// Toggle a property as favorite
export const toggleFavorite = (propertyId) => {
  try {
    const favorites = getFavorites();
    const isFav = favorites.includes(propertyId);
    
    let newFavorites;
    if (isFav) {
      newFavorites = favorites.filter(id => id !== propertyId);
    } else {
      newFavorites = [...favorites, propertyId];
    }
    
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    return !isFav; // Return the new state
  } catch (error) {
    console.error("Error toggling favorite in localStorage:", error);
    return false;
  }
};

// Check if a property is favorite
export const isFavorite = (propertyId) => {
  try {
    const favorites = getFavorites();
    return favorites.includes(propertyId);
  } catch (error) {
    console.error("Error checking favorite in localStorage:", error);
    return false;
  }
};

// Get all favorite properties
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites from localStorage:", error);
    return [];
  }
};

// Save form data for later
export const saveFormData = (formId, data) => {
  try {
    localStorage.setItem(`form_${formId}`, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving form data to localStorage:", error);
    return false;
  }
};

// Get saved form data
export const getFormData = (formId) => {
  try {
    const data = localStorage.getItem(`form_${formId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting form data from localStorage:", error);
    return null;
  }
};

// Clear saved form data
export const clearFormData = (formId) => {
  try {
    localStorage.removeItem(`form_${formId}`);
    return true;
  } catch (error) {
    console.error("Error clearing form data from localStorage:", error);
    return false;
  }
};
