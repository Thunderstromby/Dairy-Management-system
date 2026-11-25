import { StitchAboutPage } from './StitchAboutPage';
import { StitchBenefitsPage } from './StitchBenefitsPage';
import { StitchContactPage } from './StitchContactPage';
import { StitchDashboardPreviewPage } from './StitchDashboardPreviewPage';
import { StitchFeaturesPage } from './StitchFeaturesPage';
import { StitchHomePage } from './StitchHome';
import { StitchHowItWorksPage } from './StitchHowItWorksPage';

export function PublicInnerContent({ screenId }: { screenId: string }) {
  switch (screenId) {
    case 'public.about':
      return <StitchAboutPage />;
    case 'public.features':
      return <StitchFeaturesPage />;
    case 'public.how-it-works':
      return <StitchHowItWorksPage />;
    case 'public.benefits':
      return <StitchBenefitsPage />;
    case 'public.dashboard-preview':
      return <StitchDashboardPreviewPage />;
    case 'public.contact':
      return <StitchContactPage />;
    default:
      return <StitchHomePage />;
  }
}
