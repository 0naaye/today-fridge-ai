import { Utensils, Flame } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <Utensils className="w-12 h-12 text-warm-700 animate-cook-bounce" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Flame className="w-8 h-8 text-warm-600 animate-cook-spin opacity-70" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-warm-800 mb-2">요리 중입니다...</p>
        <div className="flex gap-1 justify-center">
          <span className="w-2 h-2 bg-warm-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-2 h-2 bg-warm-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 bg-warm-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}
