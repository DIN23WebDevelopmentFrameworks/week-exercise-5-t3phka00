import React, { useState, useEffect } from 'react';
import RecipeTagList from "./RecipeTagList";
import RecipeList from "./RecipeList";

interface IRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

const App: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes/tags")
      .then((response) => response.json())
      .then((data) => setTags(data));
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetch("https://dummyjson.com/recipes/tag/${selectedTag}")
        .then((response) => response.json())
        .then((data) => {
          console.log('API Response:', data);
          if (data && Array.isArray(data.recipes)) {
            setRecipes(data.recipes);
          } else {
            setRecipes([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching recipes:', error);
          setRecipes([]); 
        });
    }
  }, [selectedTag]);
  

  const handleSelectTag = (tagName: string) => {
    setSelectedTag(tagName);
  };

  const handleGoBack = () => {
    setSelectedTag(null);
  };

  return (
    <div>
      <h1>ACME Recipe O'Master</h1>
      
      {selectedTag ? (
        <RecipeList recipes={recipes} onGoBack={handleGoBack} />
      ) : (
        <RecipeTagList tagList={tags} onSelectTag={handleSelectTag} />
      )}
    </div>
  );
};

export default App;