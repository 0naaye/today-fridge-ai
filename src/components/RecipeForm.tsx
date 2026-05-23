import { Wand2, Leaf, Flame, Microwave } from 'lucide-react';
import { ImageScanner } from './ImageScanner';

interface RecipeFormProps {
  ingredients: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  filters: string[];
  onIngredientsChange: (ingredients: string) => void;
  onSkillLevelChange: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  onFiltersChange: (filters: string[]) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function RecipeForm({
  ingredients,
  skillLevel,
  filters,
  onIngredientsChange,
  onSkillLevelChange,
  onFiltersChange,
  onSubmit,
  isLoading,
}: RecipeFormProps) {
  const filterOptions = [
    { id: 'vegan', label: '비건', icon: Leaf },
    { id: 'noSpicy', label: '매운맛 금지', icon: Flame },
    { id: 'microwave', label: '자취생용', icon: Microwave },
  ];

  const toggleFilter = (filterId: string) => {
    setFilters(filters.includes(filterId)
      ? filters.filter(f => f !== filterId)
      : [...filters, filterId]
    );
  };

  const setFilters = onFiltersChange;
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-beige-200">
        <ImageScanner onIngredientsExtracted={onIngredientsChange} />

        <div className="my-8 border-t-2 border-dashed border-beige-300"></div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-warm-900 mb-3">
            재료를 입력해주세요
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => onIngredientsChange(e.target.value)}
            placeholder="예: 달걀, 양파, 두부, 고추, 소금"
            disabled={isLoading}
            className="w-full px-4 py-3 border-2 border-beige-300 rounded-lg focus:outline-none focus:border-warm-600 focus:ring-2 focus:ring-warm-100 resize-none disabled:bg-beige-50 disabled:cursor-not-allowed transition-all"
            rows={4}
          />
          <p className="text-xs text-warm-600 mt-2">쉼표로 각 재료를 구분해주세요</p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-warm-900 mb-4">
            조건 선택 (선택사항)
          </label>
          <div className="flex flex-wrap gap-3">
            {filterOptions.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => toggleFilter(id)}
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  filters.includes(id)
                    ? 'bg-warm-600 text-white shadow-md'
                    : 'bg-beige-200 text-warm-800 hover:bg-beige-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-warm-900 mb-4">
            요리 숙련도를 선택해주세요
          </label>
          <div className="space-y-3">
            {[
              { value: 'beginner' as const, label: '초보', description: '간단하고 쉬운 요리' },
              { value: 'intermediate' as const, label: '중수', description: '중간 난이도 요리' },
              { value: 'advanced' as const, label: '고수', description: '복잡하고 고급 요리' },
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="skillLevel"
                  value={option.value}
                  checked={skillLevel === option.value}
                  onChange={(e) => onSkillLevelChange(e.target.value as typeof skillLevel)}
                  disabled={isLoading}
                  className="w-4 h-4 text-warm-600 cursor-pointer disabled:cursor-not-allowed"
                />
                <span className="ml-3 flex flex-col">
                  <span className="font-medium text-warm-800 group-hover:text-warm-900">{option.label}</span>
                  <span className="text-xs text-warm-600">{option.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !ingredients.trim()}
          className="w-full bg-gradient-to-r from-warm-600 to-warm-700 hover:from-warm-700 hover:to-warm-800 disabled:from-beige-400 disabled:to-beige-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Wand2 className="w-5 h-5" />
          {isLoading ? '요리 중...' : '레시피 생성'}
        </button>
      </div>
    </div>
  );
}
