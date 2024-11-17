import { twMerge } from 'tailwind-merge';
import type { ItemGrid as ItemGridType } from '~/shared/types';
import CTA from './CTA';
import Image from 'next/image';

const ItemGrid = ({
  id,
  items,
  columns,
  defaultColumns,
  defaultIcon: DefaultIcon,
  containerClass,
  panelClass,
  iconClass,
  titleClass,
  descriptionClass,
  actionClass,
}: ItemGridType) => {
  return (
    <>
      {items && (
        <div
          className={twMerge(
            `grid mx-auto gap-2 md:gap-y-2 ${
              (columns || defaultColumns) === 4
                ? 'lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'
                : (columns || defaultColumns) === 3
                ? 'lg:grid-cols-3 sm:grid-cols-2'
                : (columns || defaultColumns) === 2
                ? 'sm:grid-cols-2'
                : 'max-w-4xl'
            }`,
            containerClass,
          )}
        >
          {items.map(({ title, description, image, callToAction }, index) => (
            <div key={id ? `item-${id}-${index}` : `item-grid-${index}`}>
              <div className={(twMerge('flex flex-row max-w-md'), panelClass)}>
                <Image className="w-[650px] h-[250px] object-cover" alt={title as string} src={image as string} objectFit='cover' objectPosition='center'/>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ItemGrid;
