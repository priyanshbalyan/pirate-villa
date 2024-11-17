import { FeaturesProps } from '~/shared/types';
import Headline from '../common/Headline';
import ItemGrid from '../common/ItemGrid';

const Features2 = ({ header, items, columns = 3, id }: FeaturesProps) => (
  <section className="relative mx-auto py-12 md:py-16 lg:py-20" id="features2">
    <div className="pointer-events-none absolute inset-0 mb-36 bg-primary-50 dark:bg-slate-800"></div>
    <div className="relative mx-auto -mb-12 max-w-6xl px-4 sm:px-6">
      {header && <Headline header={header} titleClass="text-4xl md:text-5xl" />}
      <ItemGrid
        items={items}
      />
    </div>
  </section>
);

export default Features2;
