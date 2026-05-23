import { useState, useRef } from 'react';
import { Camera, X, Loader2 } from 'lucide-react';
import { analyzeImageForIngredients } from '../utils/openaiClient';

interface ImageScannerProps {
  onIngredientsExtracted: (ingredients: string) => void;
}

export function ImageScanner({ onIngredientsExtracted }: ImageScannerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 선택할 수 있습니다.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('파일 크기가 20MB를 초과합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64String = (e.target?.result as string).split(',')[1];
      setSelectedImage(base64String);
      setError(null);
      setIsAnalyzing(true);

      try {
        const ingredients = await analyzeImageForIngredients(base64String);
        onIngredientsExtracted(ingredients);
        setSelectedImage(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '이미지 분석에 실패했습니다.';
        setError(errorMessage);
        setSelectedImage(null);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-warm-900 mb-4">
        사진으로 재료 추출 (선택사항)
      </label>

      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center py-8 bg-beige-50 border-2 border-dashed border-warm-300 rounded-lg">
          <Loader2 className="w-8 h-8 text-warm-600 animate-spin mb-3" />
          <p className="text-sm text-warm-700 font-medium">AI가 사진에서 식재료를 찾는 중...</p>
        </div>
      ) : selectedImage ? (
        <div className="flex flex-col items-center justify-center py-6 bg-beige-50 border-2 border-beige-300 rounded-lg p-4">
          <img
            src={`data:image/jpeg;base64,${selectedImage}`}
            alt="미리보기"
            className="w-32 h-32 object-cover rounded-lg mb-4 shadow-md"
          />
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
            삭제
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragActive
              ? 'border-warm-600 bg-warm-50'
              : 'border-beige-300 bg-beige-50 hover:border-warm-400 hover:bg-warm-50'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className={`w-8 h-8 mx-auto mb-3 transition-colors ${
            isDragActive ? 'text-warm-600' : 'text-warm-500'
          }`} />
          <p className="text-sm font-medium text-warm-800 mb-1">
            클릭하여 사진 선택 또는 드래그 앤 드롭
          </p>
          <p className="text-xs text-warm-600">
            냉장고 사진이나 영수증 사진 업로드
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isAnalyzing}
        className="hidden"
      />

      {error && (
        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-400 rounded">
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
