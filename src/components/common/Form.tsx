'use client';

import { twMerge } from 'tailwind-merge';
import { FormProps } from '../../shared/types';

const Form = ({
  title,
  description,
  columns,
  containerClass,
}: FormProps) => {
  return (
    <form id="contactForm" className={twMerge('', containerClass)}>
      {title && <h2 className={`${description ? 'mb-2' : 'mb-4'} text-xl font-bold`}>{title}</h2>}
      {columns?.map(({ title, texts }, index) => (
          <div
            key={`item-column-${index}`}
            className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1 flex xs:flex-row items-start mt-4"
          >
            <div className="mb-2 font-medium text-gray-800 dark:text-gray-300 w-3/12 text-sm">{title}</div>
            <div className="w-9/12">
            {texts &&
              texts.map((text, index2) => (
                <p key={`item-text-${index2}`} className="text-gray-600 dark:text-slate-400 text-sm">
                  {text}
                </p>
              ))}
              </div>
          </div>
        ))}
    </form>
  );
};

export default Form;
