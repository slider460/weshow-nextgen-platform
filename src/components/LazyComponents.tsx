import { Suspense, lazy } from 'react';

// Lazy загрузка компонентов
const LazyModernServicesSection = lazy(() => import('./ModernServicesSection'));
const LazyModernPortfolioSection = lazy(() => import('./ModernPortfolioSection'));
const LazyComplexSolutionsSection = lazy(() => import('./ComplexSolutionsSection'));
const LazyRentalEquipmentSection = lazy(() => import('./RentalEquipmentSection'));
const LazyWorkflowRoadmapSection = lazy(() => import('./WorkflowRoadmapSection'));
const LazyGamePromoSection = lazy(() => import('./GamePromoSection'));
const LazyModernShowreelSection = lazy(() => import('./ModernShowreelSection'));
const LazySocialProofSection = lazy(() => import('./SocialProofSection'));

// Компонент загрузки
const SectionSkeleton = () => (
  <div className="w-full bg-slate-50 animate-pulse">
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        {/* Заголовок секции */}
        <div className="text-center space-y-4">
          <div className="h-8 bg-slate-300 rounded-lg max-w-md mx-auto"></div>
          <div className="h-4 bg-slate-200 rounded max-w-xl mx-auto"></div>
        </div>
        
        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="h-6 bg-slate-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
                <div className="h-10 bg-slate-300 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

interface LazySectionProps {
  children: React.ReactNode;
}

const LazySection = ({ children }: LazySectionProps) => (
  <Suspense fallback={<SectionSkeleton />}>
    {children}
  </Suspense>
);

// Экспортируем ленивые компоненты и обертки
export {
  LazyModernServicesSection,
  LazyModernPortfolioSection,
  LazyComplexSolutionsSection,
  LazyRentalEquipmentSection,
  LazyWorkflowRoadmapSection,
  LazyGamePromoSection,
  LazyModernShowreelSection,
  LazySocialProofSection,
  LazySection,
  SectionSkeleton
};