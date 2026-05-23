import { Download, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import { RecipeResponse } from '../utils/openaiClient';

function NutritionChart({ nutrition }: { nutrition: RecipeResponse['nutrition'] }) {
  const total = nutrition.protein + nutrition.carbs + nutrition.fat;
  const proteinPercent = (nutrition.protein / total) * 100;
  const carbsPercent = (nutrition.carbs / total) * 100;
  const fatPercent = (nutrition.fat / total) * 100;

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-beige-50 to-beige-100 rounded-lg border-2 border-beige-200">
      <p className="text-sm font-bold text-warm-800 mb-4 tracking-wide text-center">영양 정보 (추정치)</p>

      <div className="mb-6">
        <div className="flex items-center justify-center mb-2">
          <span className="text-3xl font-bold text-warm-900">{nutrition.calories}</span>
          <span className="text-sm text-warm-700 ml-2">kcal</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex h-8 rounded-full overflow-hidden shadow-md">
          <div
            style={{ width: `${proteinPercent}%` }}
            className="bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300"
          />
          <div
            style={{ width: `${carbsPercent}%` }}
            className="bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-300"
          />
          <div
            style={{ width: `${fatPercent}%` }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-orange-400 mx-auto mb-2"></div>
          <p className="text-xs text-warm-700 font-medium">단백질</p>
          <p className="text-sm font-bold text-warm-900">{nutrition.protein}g</p>
          <p className="text-xs text-warm-600">{proteinPercent.toFixed(1)}%</p>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-blue-400 mx-auto mb-2"></div>
          <p className="text-xs text-warm-700 font-medium">탄수화물</p>
          <p className="text-sm font-bold text-warm-900">{nutrition.carbs}g</p>
          <p className="text-xs text-warm-600">{carbsPercent.toFixed(1)}%</p>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-yellow-400 mx-auto mb-2"></div>
          <p className="text-xs text-warm-700 font-medium">지방</p>
          <p className="text-sm font-bold text-warm-900">{nutrition.fat}g</p>
          <p className="text-xs text-warm-600">{fatPercent.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}

interface RecipeReceiptProps {
  recipe: RecipeResponse;
  onNewRecipe: () => void;
}

export function RecipeReceipt({ recipe, onNewRecipe }: RecipeReceiptProps) {
  const downloadAsImage = async () => {
    const element = document.getElementById('receipt-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${recipe.name}-레시피.png`;
      link.click();
    } catch (error) {
      console.error('Failed to download image:', error);
      alert('이미지 저장에 실패했습니다.');
    }
  };

  const printRecipe = () => {
    const element = document.getElementById('receipt-content');
    if (!element) return;

    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) {
      alert('팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${recipe.name}</title>
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              margin: 20px;
              background-color: #FEFBF7;
            }
            .receipt {
              max-width: 500px;
              margin: 0 auto;
              background-color: white;
              padding: 30px;
              border: 2px solid #D4C4B0;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .receipt-title {
              text-align: center;
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 20px;
              letter-spacing: 2px;
            }
            .receipt-divider {
              border-top: 2px dashed #C9B8A0;
              margin: 20px 0;
            }
            .receipt-section {
              margin: 15px 0;
            }
            .receipt-label {
              font-weight: bold;
              font-size: 14px;
              margin-bottom: 8px;
            }
            .receipt-content {
              font-size: 13px;
              line-height: 1.6;
            }
            .receipt-footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #8B7D6B;
            }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div id="receipt-content" className="bg-white rounded-lg shadow-2xl p-12 border-4 border-beige-300" style={{ fontFamily: 'Courier New, monospace' }}>
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-warm-900 tracking-wider mb-2">{recipe.name}</h2>
          <div className="w-16 h-1 bg-warm-600 mx-auto"></div>
        </div>

        <div className="border-t-2 border-b-2 border-dashed border-warm-400 py-4 my-6 text-center">
          <p className="text-sm text-warm-700 font-semibold">소요 시간</p>
          <p className="text-2xl font-bold text-warm-900">{recipe.cookTime}</p>
        </div>

        <div className="my-6">
          <p className="text-sm font-bold text-warm-800 mb-3 tracking-wide">준비물</p>
          <div className="border-l-4 border-warm-400 pl-4 space-y-2">
            {recipe.ingredients.map((ingredient, idx) => (
              <p key={idx} className="text-sm text-warm-800">
                • {ingredient}
              </p>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-dashed border-warm-300 pt-6 my-6">
          <p className="text-sm font-bold text-warm-800 mb-4 tracking-wide">조리 과정</p>
          <div className="space-y-4">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-lg font-bold text-warm-600 min-w-fit">{idx + 1}.</span>
                <p className="text-sm text-warm-800 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <NutritionChart nutrition={recipe.nutrition} />

        <div className="border-t-2 border-dashed border-warm-300 mt-8 pt-6 text-center">
          <p className="text-base font-semibold text-warm-700 tracking-wide">오늘도 맛있게!</p>
          <p className="text-xs text-warm-500 mt-2">냉파 AI와 함께 요리하기</p>
        </div>
      </div>

      <div className="flex gap-3 mt-8 flex-wrap justify-center">
        <button
          onClick={downloadAsImage}
          className="flex items-center gap-2 bg-warm-600 hover:bg-warm-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Download className="w-5 h-5" />
          이미지 저장
        </button>
        <button
          onClick={printRecipe}
          className="flex items-center gap-2 bg-warm-500 hover:bg-warm-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Printer className="w-5 h-5" />
          인쇄
        </button>
        <button
          onClick={onNewRecipe}
          className="flex items-center gap-2 bg-beige-400 hover:bg-beige-500 text-warm-900 font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          새로운 레시피
        </button>
      </div>
    </div>
  );
}
