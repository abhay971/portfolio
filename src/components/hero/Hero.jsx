import ShaderBackground from './ShaderBackground.jsx';
import HeroContent from './HeroContent.jsx';
import CTAButtons from './CTAButtons.jsx';
import SocialLinks from './SocialLinks.jsx';
import ScrollIndicator from './ScrollIndicator.jsx';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center" style={{ background: 'transparent' }}>
      {/* WebGL Shader Background */}
      <ShaderBackground />

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl lg:max-w-5xl xl:max-w-7xl mx-auto w-full">
          <div className="flex flex-col">
            <HeroContent />
            <div className="mt-6 md:mt-8">
              <CTAButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Social Links - Right Side */}
      <div className="absolute bottom-8 md:bottom-10 lg:bottom-12 right-4 sm:right-6 md:right-8 lg:right-8 xl:right-20 z-10 hidden sm:block">
        <SocialLinks />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
