import { TestimonialsProps } from '~/shared/types';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';
import CTA from '../common/CTA';
import ItemTestimonial from '../common/ItemTestimonial';
import { cn } from '~/lib/utils';
import { PlayfairDisplay } from '~/utils/utils';

const Testimonials = ({
  header,
  testimonials,
  callToAction,
  isTestimonialUp,
  id,
  hasBackground = false,
}: TestimonialsProps) => (
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="">
    {header && <Headline header={header} titleClass={cn(PlayfairDisplay.className, "uppercase text-3xl md:text-5xl text-background drop-shadow-2xl")} />}
    <div className="flex items-stretch justify-center">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {testimonials.map(
          ({ name, job, testimonial, image, href }, index) =>
            testimonial && (
              <div
                key={`item-testimonial-${index}`}
                className={`card max-w-sm h-full bg-primary dark:bg-primary border-[1px] border-site text-site ${!callToAction && href
                  ? 'hover:border-primary-600 hover:shadow-lg hover:transition hover:duration-100'
                  : ''
                  }`}
              >
                {!callToAction && href ? (
                  <ItemTestimonial
                    name={name}
                    job={job}
                    testimonial={testimonial}
                    isTestimonialUp={isTestimonialUp}
                    hasDividerLine={true}
                    startSlice={0}
                    endSlice={150}
                    image={image}
                    containerClass="h-full"
                    panelClass="justify-between items-stretch w-full h-full text-sm"
                    nameJobClass="text-left rtl:text-right"
                    jobClass="text-sm"
                    imageClass="mr-4 rtl:mr-0 rtl:ml-4 h-10 w-10 rounded-full"
                  />
                ) : (
                  <ItemTestimonial
                    name={name}
                    job={job}
                    testimonial={testimonial}
                    isTestimonialUp={isTestimonialUp}
                    hasDividerLine={true}
                    startSlice={0}
                    endSlice={150}
                    image={image}
                    containerClass="h-full"
                    panelClass="justify-between items-stretch w-full h-full"
                    nameJobClass="text-left rtl:text-right"
                    jobClass="text-sm"
                    imageClass="mr-4 rtl:mr-0 rtl:ml-4 h-10 w-10 rounded-full"
                  />
                )}
              </div>
            ),
        )}
      </div>
    </div>
    {callToAction && (
      <CTA
        callToAction={callToAction}
        containerClass="flex justify-center mx-auto w-fit mt-8 md:mt-12"
        linkClass="btn"
      />
    )}
  </WidgetWrapper>
);

export default Testimonials;
