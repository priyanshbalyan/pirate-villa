import Image from 'next/image';
import logo from 'public/pirate-villa-logo.png'

const Logo = () => (
  <span className="ml-2 self-center whitespace-nowrap text-2xl font-bold text-gray-900 dark:text-white md:text-xl">
    <Image
      alt="Pirate Villas"
      src={logo}
      placeholder='blur'
      width={100}
      height={50}
      />
  </span>
);

export default Logo;
