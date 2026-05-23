const apiKey = import.meta.env.VITE_GITHUB_TOKEN;

if (!apiKey) {
  console.warn('VITE_GITHUB_TOKEN is not configured. Please add it to your .env file.');
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface RecipeResponse {
  name: string;
  cookTime: string;
  ingredients: string[];
  steps: string[];
  nutrition: Nutrition;
}

export async function generateRecipe(
  ingredients: string,
  skillLevel: 'beginner' | 'intermediate' | 'advanced',
  filters: string[] = []
): Promise<RecipeResponse> {
  if (!apiKey) {
    throw new Error('VITE_GITHUB_TOKEN is not configured. Please add it to your .env file.');
  }

  const skillLevelMap = {
    beginner: '초보자',
    intermediate: '중급자',
    advanced: '고급자',
  };

  const filterMap: { [key: string]: string } = {
    vegan: '비건(모든 동물성 재료 제외)',
    noSpicy: '매운맛 금지(고추, 고추장 등 제외)',
    microwave: '자취생용(전자레인지 전용)',
  };

  const filterText = filters.length > 0
    ? `\n제약사항: ${filters.map(f => filterMap[f] || f).join(', ')}`
    : '';

  const prompt = `당신은 요리 전문가입니다. 다음 정보로 맛있는 요리 레시피를 만들어주세요.

재료: ${ingredients}
요리 숙련도: ${skillLevelMap[skillLevel]}${filterText}

다음 JSON 형식으로 정확하게 응답해주세요. 추가 설명 없이 JSON만 제공해주세요:
{
  "name": "요리 이름",
  "cookTime": "XX분",
  "ingredients": ["재료1", "재료2", "재료3"],
  "steps": ["조리 과정 1단계", "조리 과정 2단계", "조리 과정 3단계"],
  "nutrition": {
    "calories": 300,
    "protein": 25,
    "carbs": 40,
    "fat": 10
  }
}

JSON만 반환하고 다른 텍스트는 포함하지 마세요.`;

  try {
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'gpt-4o',
        temperature: 1,
        top_p: 1,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub Models API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse recipe from response');
    }

    const recipe = JSON.parse(jsonMatch[0]) as RecipeResponse;
    return recipe;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate recipe: ${error.message}`);
    }
    throw error;
  }
}

export async function analyzeImageForIngredients(imageBase64: string): Promise<string> {
  if (!apiKey) {
    throw new Error('VITE_GITHUB_TOKEN is not configured. Please add it to your .env file.');
  }

  const prompt = '이 사진은 냉장고 안 모습이거나 마트 영수증이야. 사진을 분석해서 요리에 사용할 수 있는 식재료 이름만 쉼표(,)로 구분해서 리스트로 답변해줘. 다른 설명은 하지 말고 오직 재료 이름만 줘.';

  try {
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        model: 'gpt-4o',
        temperature: 1,
        top_p: 1,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub Models API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const ingredients = data.choices[0].message.content.trim();
    return ingredients;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to analyze image: ${error.message}`);
    }
    throw error;
  }
}
