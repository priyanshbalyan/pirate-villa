import { twMerge } from 'tailwind-merge';

interface DividerLine {
  dividerLineClass?: string;
}

const DividerLine = ({ dividerLineClass }: DividerLine) => (
  <hr className={twMerge('border-site dark:border-gray-700 my-4', dividerLineClass)} />
);

export default DividerLine;
