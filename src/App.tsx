import { useState } from 'react';
import { RecipeForm } from './components/RecipeForm';
import { RecipeReceipt } from './components/RecipeReceipt';
import { LoadingAnimation } from './components/LoadingAnimation';
import { generateRecipe, RecipeResponse } from './utils/openaiClient';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [filters, setFilters] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      setError('재료를 입력해주세요.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = await generateRecipe(ingredients, skillLevel, filters);
      setRecipe(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '레시피 생성에 실패했습니다.';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewRecipe = () => {
    setRecipe(null);
    setIngredients('');
    setSkillLevel('intermediate');
    setFilters([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige-100 to-beige-50">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-warm-900 mb-2">오늘의 냉파</h1>
          <p className="text-lg text-warm-700">재료를 말해주면 맛있는 레시피를 만들어줘요</p>
        </div>

        {error && (
          <div className="w-full max-w-2xl mx-auto mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {isLoading && <LoadingAnimation />}

        {!recipe && !isLoading && (
          <RecipeForm
            ingredients={ingredients}
            skillLevel={skillLevel}
            filters={filters}
            onIngredientsChange={setIngredients}
            onSkillLevelChange={setSkillLevel}
            onFiltersChange={setFilters}
            onSubmit={handleGenerateRecipe}
            isLoading={isLoading}
          />
        )}

        {recipe && !isLoading && <RecipeReceipt recipe={recipe} onNewRecipe={handleNewRecipe} />}
      </div>
    </div>
  );
}

export default App;
