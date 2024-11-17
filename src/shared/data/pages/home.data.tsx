import {
  IconArrowDown,
  IconArrowsRightLeft,
  IconBrandLinkedin,
  IconBrandTailwind,
  IconBrandTwitter,
  IconBulb,
  IconCheck,
  IconClock,
  IconComponents,
  IconDownload,
  IconListCheck,
  IconMail,
  IconMapPin,
  IconPhoneCall,
  IconRocket,
} from '@tabler/icons-react';
import {
  CallToActionProps,
  ContactProps,
  ContentProps,
  FAQsProps,
  FeaturesProps,
  HeroProps,
  PricingProps,
  SocialProofProps,
  StepsProps,
  TeamProps,
  TestimonialsProps,
} from '../../types';
import nextJsLogo from '~/assets/images/nextjs-logo.png';
import reactLogo from '~/assets/images/react-logo.png';
import tailwindCssLogo from '~/assets/images/tailwind-css-logo.png';
import typescriptLogo from '~/assets/images/typescript-logo.png';

import southExterior2 from 'public/south-exterior-2.avif';
import southLivingArea3 from 'public/south-living-area-3.webp';
import southRoom4 from 'public/south-room-4.avif';
import southBathroom from 'public/south-bathroom.avif';
import southInterior2 from 'public/south-interior-2.avif';
import southLivingArea from 'public/south-living-area.avif';
import southRoom5 from 'public/south-room-5.avif';
import southBeach from 'public/south-beach.avif';
import southInterior3 from 'public/south-interior-3.avif';
import southPrivateKitchen from 'public/south-private-kitchen.avif';
import southRoom from 'public/south-room.webp';
import southDining from 'public/south-dining.webp';
import southInterior from 'public/south-interior.avif';
import southRoom2 from 'public/south-room-2.avif';
import southTerracePatio from 'public/south-terrace-patio.avif';
import southExterior1 from 'public/south-exterior-1.avif';
import southLivingArea2 from 'public/south-living-area-2.webp';
import southRoom3 from 'public/south-room-3.avif';

import northBathroom from 'public/north-bathroom.avif';
import northMiscellaneous from 'public/north-miscellaneous.avif';
import northPrivateKitchen from 'public/north-private-kitchen.avif';
import northRoom2 from 'public/north-room-2.avif';
import northRoom3 from 'public/north-room-3.avif';
import northRoom4 from 'public/north-room-4.avif';
import northRoom5 from 'public/north-room-5.avif';
import northRoom6 from 'public/north-room-6.avif';
import northRoom from 'public/north-room.avif';
import northTerracePatio3 from 'public/north-terrace-patio-3.avif';
import northTerracePatio from 'public/north-terrace-patio.avif';
import northTerracePatio2 from 'public/north-terrace-patio-2.avif';

// Hero data on Home page *******************


// SocialProof data on Home page *******************
export const socialProofHome: SocialProofProps = {
  id: 'socialProof-on-home',
  hasBackground: false,
  images: [
    {
      link: 'https://nextjs.org/',
      src: nextJsLogo,
      alt: 'NextJs Logo',
    },
    {
      link: 'https://react.dev/',
      src: reactLogo,
      alt: 'React Logo',
    },
    {
      link: 'https://tailwindcss.com/',
      src: tailwindCssLogo,
      alt: 'Tailwind CSS Logo',
    },
    {
      link: 'https://www.typescriptlang.org/',
      src: typescriptLogo,
      alt: 'Typescript Logo',
    },
  ],
};

// Steps data on Home page *******************
export const stepsHome: StepsProps = {
  id: 'steps-on-home',
  hasBackground: false,
  isReversed: false,
  isImageDisplayed: true,
  image: {
    src: southInterior,
    alt: 'Steps image',
  },
  header: {
    title: 'Sed ac magna sit amet risus tristique interdum.',
  },
  items: [
    {
      title: 'Step 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis, quam nec venenatis lobortis, mirisus tempus nulla, sed porttitor est nibh at nulla. Praesent placerat enim ut ex tincidunt vehicula. Fusce sit amet dui tellus.',
      icon: IconArrowDown,
    },
    {
      title: 'Step 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis, quam nec venenatis lobortis, mirisus tempus nulla, sed porttitor est nibh at nulla.',
      icon: IconArrowDown,
    },
    {
      title: 'Step 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis, quam nec venenatis lobortis, mirisus tempus nulla, sed porttitor est nibh at nulla.',
      icon: IconArrowDown,
    },
    {
      title: 'Ready!',
    },
  ],
};

// Testimonials data on Home page *******************
export const testimonialsHome: TestimonialsProps = {
  id: 'testimonials-on-home',
  hasBackground: true,
  header: {
    title: 'What our guests say about us',
    subtitle:
      '',
  },
  testimonials: [
    {
      name: 'Angie C.',
      job: 'Beautiful home',
      testimonial: `The home is beautiful and very clean and well appointed. Loved the nice addition of a speaker. We loved having a big cooler, nice chairs and umbrella. Snorkeling gear was ok, We had some difficulty with a couple of the snorkels not working properly. I enjoyed using the kayaks and paddle boards to see the turtles in the bay and the beach is a short walk from the home. The view is ok, you can see some water from the master bedroom balcony. Close location to Cruz Bay. A great place to stay overall.`,
      image: {
        src: 'https://images.unsplash.com/photo-1619734086067-24bf8889ea7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Angie C.',
      },
      href: '/',
    },
    {
      name: 'Jackie P.',
      job: 'Perfect Location, Comfort, and Cleanliness',
      testimonial: `Location was 5 minutes away from red hook ferry, making it easy to get to dinner spots and beaches. Villa was brand new with lots of special touches, such as a spice rack, new grill, soft sheets, thick towels, and full sized washer and dryer. The villa was very clean as well.`,
      image: {
        src: 'https://images.unsplash.com/photo-1565049786474-1dea82a8b995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Jackie P.',
      },
      href: '/',
    },
    {
      name: 'Robert B.',
      job: 'Wonderful Villa',
      testimonial: `Nicely appointed. Great location. Nice owners`,
      image: {
        src: 'https://images.unsplash.com/photo-1659057106920-da022cfbc0cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Robert B.',
      },
      href: '/',
    },
    {
      name: 'Pamela C.',
      job: '2023 St John Family Trip',
      testimonial: `Wonderful experience. The entire family had a great time. The Tuttle family made our trip over the top for us. The Villa was beautiful with everything and more that you would need. We will be sharing this trip with everyone we know for many years.`,
      image: {
        src: 'https://images.unsplash.com/photo-1572417884940-c24659be6068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Pamela C.',
      },
      href: '/',
    },
    {
      name: 'Matthew S.',
      job: 'Awesome time',
      testimonial: `Enjoyed it Beautiful place`,
      image: {
        src: 'https://images.unsplash.com/photo-1694287877106-ee22f764aef1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Matthew S.',
      },
      href: '/',
    },
    {
      name: 'Tricia C.',
      job: 'St John Lovely Unit Short Walk From Beach',
      testimonial: `We really enjoyed our stay at the property. The management team running the property (among others) was very communicative and we really had no problems with getting in / access to information etc. They also offered access to pre-stocking our kitchen, which came in very handy! The island is lovely and we enjoyed having our Jeep to get around to various beaches and this location is very close to Cruz Bay. While the unit was very modern and relatively close to the beach (just as 2 min walk around the building), our only issue with the unit was hot water. We really did not have anything but luke-warm water in the two very nice upstairs bathrooms. We were given the advice to try to run the water longer so that it could heat up, but that never did fix the issue. And we even then had issues with the downstairs bathroom water temperature as well. This would be the reason we did not rate it 5-stars. All in all, very nice stay!`,
      image: {
        src: 'https://images.unsplash.com/photo-1665984867752-6370ab5ae35e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Tricia C.',
      },
      href: '/',
    },
  ],
};

// FAQS data on Home page *******************


// Pricing data on Home page *******************
export const pricingHome: PricingProps = {
  id: 'pricing-on-home',
  hasBackground: true,
  header: {
    title: 'Prices for each plan',
    subtitle:
      'Proin eget vestibulum sem, vel ultrices ligula. Vestibulum in eleifend lectus, non mollis odio. Donec nibh ipsum, suscipit non pulvinar quis, lobortis ac lorem.',
    // tagline: 'Pricing',
  },
  prices: [
    {
      title: 'basic',
      price: 29,
      period: 'per month',
      items: [
        {
          description: 'Etiam in libero, et volutpat',
        },
        {
          description: 'Aenean ac nunc dolor tristique',
        },
        {
          description: 'Cras scelerisque accumsan lib',
        },
        {
          description: 'In hac habitasse',
        },
      ],
      callToAction: {
        targetBlank: true,
        text: 'Free 7-day trial',
        href: '/',
      },
      hasRibbon: false,
    },
    {
      title: 'standard',
      price: 69,
      period: 'per month',
      items: [
        {
          description: 'Proin vel laoreet',
        },
        {
          description: 'Ut efficitur egestas',
        },
        {
          description: 'Pellentesque ut nibh',
        },
        {
          description: 'Donec fringilla sem',
        },
      ],
      callToAction: {
        targetBlank: true,
        text: 'Free 15-day trial',
        href: '/',
      },
      hasRibbon: true,
      ribbonTitle: 'Popular',
    },
    {
      title: 'premium',
      price: 199,
      period: 'per month',
      items: [
        {
          description: 'Curabitur suscipit risus',
        },
        {
          description: 'Aliquam blandit malesuada',
        },
        {
          description: 'Suspendisse sit amet',
        },
        {
          description: 'Suspendisse auctor dui',
        },
      ],
      callToAction: {
        targetBlank: true,
        text: 'Free 30-day trial',
        href: '/',
      },
      hasRibbon: false,
    },
  ],
};

// Team data on Home page *******************
export const teamHome: TeamProps = {
  id: 'team-on-home',
  hasBackground: false,
  header: {
    title: 'Team Members',
    subtitle:
      'Suspendisse in dui nibh. Donec enim leo, sodales et egestas id, malesuada non diam. Sed dapibus velit et mauris condimentum, vel imperdiet erat egestas.',
    // tagline: 'Team',
  },
  teams: [
    {
      name: 'Cindy Belcher',
      occupation: 'SEO Consultant',
      image: {
        src: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Cindy Belcher',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
    {
      name: 'Toby Foster',
      occupation: 'Marketing Tech',
      image: {
        src: 'https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2172&q=80',
        alt: 'Toby Foster',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
    {
      name: 'Clark Bourne',
      occupation: 'Content Manager',
      image: {
        src: 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
        alt: 'Clark Bourne',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
    {
      name: 'Bella Chase',
      occupation: 'UX Designer',
      image: {
        src: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
        alt: 'Bella Chase',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
  ],
};

// Contact data on Home page *******************


// CallToAction data *******************
export const callToAction2Home: CallToActionProps = {
  title: 'Next.js + Tailwind CSS',
  subtitle:
    'Aliquam sodales porttitor lacus ac tristique. Etiam posuere elit at leo feugiat sodales. Sed ac mauris quis sem tempor condimentum non at metus.',
  callToAction: {
    text: 'Get template',
    href: 'https://github.com/onwidget/tailnext',
    icon: IconDownload,
  },
  items: [
    {
      title: 'Get template',
      description: 'Aliquam sodales est lectus, quis.',
      href: 'https://github.com/onwidget/tailnext',
    },
    {
      title: 'Learn more',
      description: 'Class aptent taciti sociosqu ad litora torquent per conubia.',
      href: '/',
    },
    {
      title: 'Subscribe',
      description: 'Morbi orci nunc, euismod ac dui id, convallis.',
      form: {
        icon: IconMail,
        input: {
          type: 'email',
          name: 'email',
          autocomplete: 'email',
          placeholder: 'Enter your email address',
        },
        btn: {
          title: 'Subscribe',
          type: 'submit',
        },
      },
    },
  ],
};

export const southPictures = [
  { image: southExterior2, title: 'Exterior' },
  { image: southLivingArea3, title: 'Living Area' },
  { image: southRoom4, title: 'Room' },
  { image: southBathroom, title: 'Bathroom' },
  { image: southInterior2, title: 'Interior' },
  { image: southLivingArea, title: 'Living Area' },
  { image: southRoom5, title: 'Room' },
  { image: southBeach, title: 'Beach' },
  { image: southInterior3, title: 'Interior' },
  { image: southPrivateKitchen, title: 'Private Kitchen' },
  { image: southRoom, title: 'Room' },
  { image: southDining, title: 'Dining' },
  { image: southInterior, title: 'Interior' },
  { image: southRoom2, title: 'Room' },
  { image: southTerracePatio, title: 'Terrace/Patio' },
  { image: southExterior1, title: 'Exterior' },
  { image: southLivingArea2, title: 'Living Area' },
  { image: southRoom3, title: 'Room' },
]

export const northPictures = [
  { image: northBathroom, title: 'Bathroom' },
  { image: northMiscellaneous, title: 'Miscellaneous' },
  { image: northPrivateKitchen, title: 'Private Kitchen' },
  { image: northRoom2, title: 'Room' },
  { image: northRoom3, title: 'Room' },
  { image: northRoom4, title: 'Room' },
  { image: northRoom5, title: 'Room' },
  { image: northRoom6, title: 'Room' },
  { image: northRoom, title: 'Room' },
  { image: northTerracePatio2, title: 'Terrace/Patio' },
  { image: northTerracePatio3, title: 'Terrace/Patio' },
  { image: northTerracePatio, title: 'Terrace/Patio' },
]