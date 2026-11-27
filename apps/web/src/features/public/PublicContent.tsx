import innerHeroPrivacy from '../../assets/inner-hero-privacy-policy.png';
import innerHeroSecurity from '../../assets/inner-hero-operational-security.png';
import innerHeroTerms from '../../assets/inner-hero-terms-of-service.png';
import { StitchAboutPage } from './StitchAboutPage';
import { StitchBenefitsPage } from './StitchBenefitsPage';
import { StitchContactPage } from './StitchContactPage';
import { StitchDashboardPreviewPage } from './StitchDashboardPreviewPage';
import { StitchFeaturesPage } from './StitchFeaturesPage';
import { StitchHomePage } from './StitchHome';
import { StitchHowItWorksPage } from './StitchHowItWorksPage';
import { StitchInformationalPage } from './StitchInformationalPage';

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
    case 'public.privacy-policy':
      return <StitchInformationalPage title="Privacy Policy" image={innerHeroPrivacy} />;
    case 'public.terms-of-service':
      return <StitchInformationalPage title="Terms of Service" image={innerHeroTerms} />;
    case 'public.operational-security':
      return <StitchInformationalPage title="Operational Security" image={innerHeroSecurity} />;
    default:
      return <StitchHomePage />;
  }
}
