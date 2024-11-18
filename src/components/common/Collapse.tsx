'use client';

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import useCollapse from '~/hooks/useCollapse';
import { CollapseProps } from '~/shared/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const Collapse = ({ items, classCollapseItem, iconUp, iconDown }: CollapseProps) => {
  const { activeIndex, handleSetIndex } = useCollapse();

  return (
    <>
      {items.map(({ title, description }, index) => (
        <div
          key={`accordion-${index}`}
          onClick={() => handleSetIndex(index)}
          className="mx-auto max-w-3xl select-none bg-transparent text-base text-gray-700"
        >
          <div className={classCollapseItem}>

          <div
            className="align-center flex justify-between "
            id={`accordion__heading-${index}`}
            aria-disabled="false"
            aria-expanded="false"
            aria-controls={`accordion__panel-${index}`}
            role="button"
          >
            <Accordion type="single" collapsible className="w-full dark:text-black">
              <AccordionItem value="booking" className="border-0">
                <AccordionTrigger className="my-0 py-0">
                  <h2 className="w-full pr-2 text-md font-medium leading-6 text-gray-900 dark:text-slate-300">{title}</h2>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mt-2 text-gray-600 dark:text-slate-400">{description}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Collapse;
