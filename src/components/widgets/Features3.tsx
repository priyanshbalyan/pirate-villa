import { FeaturesProps } from '~/shared/types';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';
import ItemGrid from '../common/ItemGrid';

const Features3 = ({
  header,
  items,
  columns = 3,
  isBeforeContent,
  isAfterContent,
  id,
  hasBackground = false,
}: FeaturesProps) => (
  <WidgetWrapper
    id={id ? id : ''}
    hasBackground={hasBackground}
    containerClass={`max-w-6xl ${isBeforeContent ? 'md:pb-8 lg:pb-12' : ''} ${
      isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : ''
    }`}
  >
    {header && <Headline header={header} titleClass="text-4xl md:text-5xl" />}
    <ItemGrid
      items={items}
    />
  </WidgetWrapper>
);

export default Features3;
