import { FeaturesProps } from '~/shared/types';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';
import ItemGrid from '../common/ItemGrid';
import { cn } from '~/lib/utils';
import { PlayfairDisplay } from '~/utils/utils';

const Features = ({ id, header, columns = 3, items, hasBackground = false }: FeaturesProps) => (
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="scroll-mt-16 max-w-6xl">
    <Headline header={{ title: 'Photo Gallery', subtitle: '' }} titleClass={cn(PlayfairDisplay.className, "text-3xl md:text-4xl uppercase text-site")} />
    <ItemGrid
      items={items}
    />
  </WidgetWrapper>
);

export default Features;
