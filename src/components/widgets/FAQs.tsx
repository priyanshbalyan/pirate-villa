import { FAQsProps } from '~/shared/types';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';
import ItemGrid from '../common/ItemGrid';

const FAQs = ({ header, items, columns, id, hasBackground = false }: FAQsProps) => (
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="max-w-6xl">
    {header && <Headline header={header} titleClass="text-3xl sm:text-4xl" />}
    <ItemGrid
      items={items}
    />
  </WidgetWrapper>
);

export default FAQs;
