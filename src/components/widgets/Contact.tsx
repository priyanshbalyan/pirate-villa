import Form from '../common/Form';
import Headline from '../common/Headline';
import { ContactProps } from '~/shared/types';
import WidgetWrapper from '../common/WidgetWrapper';

const Contact = ({ header, content, items, form, id, hasBackground = false }: ContactProps) => (
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="max-w-6xl">
    {header && <Headline header={header} titleClass="text-3xl sm:text-5xl" />}
    <div className="flex items-stretch justify-center">
      <div className={`grid ${!content && !items ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}>
        <div className="h-full pr-6">
          {content && <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">{content}</p>}
          <ul className="mb-6 md:mb-0">
            {items &&
              items.map(({ title, description, icon: Icon }, index) => (
                <li key={`item-contact-${index}`} className="flex">
                  <div className="ml-4 flex h-10 mr-4 items-center  ">
                    -
                  </div>
                  <div className="">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">{title}</h3>
                    {typeof description === 'string' ? (
                      <p key={`text-description-${index}`} className="text-gray-600 dark:text-slate-400">
                        {description}
                      </p>
                    ) : (
                      description &&
                      description.map((desc, index) => (
                        <p key={`text-description-${index}`} className="text-gray-600 dark:text-slate-400">
                          {desc}
                        </p>
                      ))
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <Form {...form} columns={[
          {
            title: 'Essentials',
            texts: ['Wireless Internet', 'WiFi', 'Towels provided', 'Linens provided']
          },
          {
            title: 'Laundry',
            texts: ['Washing machine', 'Dryer']
          },
          {
            title: 'Safety',
            texts: ['No carbon monoxide detector or gas appliances (host has indicated there are no carbon monoxide detectors or gas appliances on the property)', 'Smoke detector (host has indicated there is a smoke detector on the property)']
          },
          {
            title: 'Suitability',
            texts: ['Minimum age limit of renters']
          },
          {
            title: 'Pets',
            texts: ['No pets allowed']
          }
        ]} containerClass="card h-fit max-w-2xl mx-auto p-5 md:p-12" btnPosition="center" />
      </div>
    </div>
  </WidgetWrapper>
);

export default Contact;
