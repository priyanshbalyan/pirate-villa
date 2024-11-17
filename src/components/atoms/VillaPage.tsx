import Hero from '~/components/widgets/Hero';
import Features from '~/components/widgets/Features';
import Content from '~/components/widgets/Content';
import Testimonials from '~/components/widgets/Testimonials';
import FAQs2 from '~/components/widgets/FAQs2';
import Contact from '~/components/widgets/Contact';
import {
    contactHome,
    northPictures,
    testimonialsHome,
} from '~/shared/data/pages/home.data';
import { southPictures } from '~/shared/data/pages/home.data';
import { ContentProps, FAQsProps, HeroProps } from '~/shared/types';
import southExterior from 'public/south-exterior-1.avif';
import northTerracePatio2 from 'public/north-terrace-patio-2.avif';


export default function VillaPage({ north }: { north: boolean}) {
    const villaText = north ? 'North' : 'South'

    const content = <>
        <p>Pirates Landing North and South are exquisite, luxury duplex villas nestled on the pristine shores of Chocolate Hole Beach in St. John, U.S. Virgin Islands. These beautifully designed, high-end retreats offer breathtaking ocean views and are just a quick 5-minute drive from the vibrant Cruz Bay. Each villa is only steps from the beach.</p>
        <br/>
        <p>Both villas boast private jacuzzi, sleek modern kitchens, and air-conditioned interiors, with each spacious bedroom having its own luxurious en-suite bathroom. The open-concept layout creates a seamless indoor-outdoor living experience, ideal for soaking in the island&apos;s natural beauty.</p>
        <br/>
        <p>To elevate your stay, Pirates Landing offers personalized concierge services, including seamless transfers, villa provisioning, excursion bookings and organizing exclusive experiences like beachside yoga sessions or indulgent massages. With convenient access to local grocery stores, dining, and shopping, these villas promise a serene, stress-free escape. Guests also enjoy high-speed Wi-Fi, beach chairs, umbrellas, and coolers, ensuring every beach day is effortless and unforgettable.</p>
        <br/>
        <p>Perfect for those seeking a luxurious yet relaxed getaway in paradise!</p>
    </>

    const heroHome: HeroProps = {
        title: (
            <>
                The Pirate{'\''}s Landing {villaText}
            </>
        ),
        callToAction2: {
            text: 'Book Now',
            href: '/book' + (north ? '?north=true' : ''),
        },
        north: north
    };

    const contentHomeOne: ContentProps = {
        id: 'contentOne-on-home-one',
        hasBackground: true,
        header: {
            title: 'The Pirates Landing South3-bedroom condo in fabulous Cruz Bay with WiFi, AC',
            subtitle: '',
            tagline: '',
        },
        content,
        image: {
            src: southExterior,
            alt: 'Colorful Image',
        },
        isReversed: true,
        isAfterContent: false,
    };

    const contentHomeTwo: ContentProps = {
        id: 'contentOne-on-home-two',
        hasBackground: true,
        header: {
            title: 'The Pirate\'s Landing North 3-bedroom condo with WiFi, AC in enchanting Cruz Bay',
            subtitle: '',
            tagline: '',
        },
        content,
        image: {
            src: northTerracePatio2,
            alt: 'Colorful Image',
        },
        isReversed: false,
    };

    const faqs2Home: FAQsProps = {
        id: 'faqsTwo-on-home',
        hasBackground: false,
        header: {
          title: 'Frequently Asked Questions',
          tagline: 'FAQS',
        },
        items: [
          {
            title: `Is The Pirates Landing ${villaText} 3-bedroom condo in fabulous Cruz Bay with WiFi, AC pet-friendly?`,
            description: `No, pets are not allowed at this property. `
          },
          {
            title: `Where is The Pirates Landing ${villaText} 3-bedroom condo in fabulous Cruz Bay with WiFi, AC located?`,
            description: `Situated in St. John, this condo building is steps from Chocolate Hole and 1.9 mi (3.1 km) from Virgin Islands National Park. Chocolate Hole Beach and Sunset Beach are also within 1 mi (2 km). `,
          },
        ],
      };

    return (
        <>
            <Hero {...heroHome} />

            {north ? <>
                <Content {...contentHomeTwo} />
                <Features items={northPictures} />
            </> : <>
                <Content {...contentHomeOne} />
                <Features items={southPictures} />
            </>}

            <Testimonials {...testimonialsHome} />
            <FAQs2 {...faqs2Home} />
            <Contact {...contactHome} />

        </>
    );
}
