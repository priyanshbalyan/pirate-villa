import { footerData2 } from '~/shared/data/global.data';

const Footer2 = () => {
  const { links, columns, socials, footNote } = footerData2;

  return (
    <div className="px-4 sm:px-6 text-site bg-primary flex justify-center w-full border-t-site border-[1px] border-b-site">
      <div className='max-w-7xl'>
        <div className="xs:gap-8 grid grid-cols-4 gap-20 gap-y-8 py-8 md:py-12">
          {columns.map(({ title, texts }, index) => (
            <div
              key={`item-column-${index}`}
              className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1"
            >
              <div className="mb-2 font-semibold">{title}</div>
              {texts &&
                texts.map((text, index2) => (
                  <p key={`item-text-${index2}`} className="">
                    {text}
                  </p>
                ))}
            </div>
          ))}
          <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
            <div className="mb-2 font-semibold">Social</div>
            <ul className="mb-4 -ml-2 rtl:ml-0 rtl:-mr-2 flex md:order-1 md:mb-0">
              {socials.map(({ label, icon: Icon, href }, index) => (
                <li key={`item-social-${index}`}>
                  <a
                    className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-white focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
                    aria-label={label}
                    href={href}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-muted py-6 text-sm md:flex md:items-center md:justify-between md:py-8">
          <ul className="mb-4 flex pl-2 rtl:pl-0 rtl:pr-2 md:order-1 md:mb-0">
            {links &&
              links.map(({ label, href }, index) => (
                <li key={`item-link-${index}`}>
                  <a
                    className="text-site duration-150 ease-in-out placeholder:transition hover:text-gray-700 hover:underline"
                    aria-label={label}
                    href={href}
                  >
                    {label}
                  </a>
                  {links.length - 1 !== index && <span className="mr-1 rtl:mr-0 rtl:ml-1"> · </span>}
                </li>
              ))}
          </ul>
          {footNote}
        </div>
      </div>
    </div>
  );
};

export default Footer2;
