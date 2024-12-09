import { getServerTranslation } from '~/lib/serverTranslation';

const Footer2 = async () => {
  const { tArray } = await getServerTranslation()
  const footerData2 = {
    links: tArray('footer_link_text').map((text, index) => ({
      label: text,
      href: tArray('footer_link_href')[index]
    })),
    columns: tArray('footer_columns_title').map((text, index) => ({
      title: text,
      texts: tArray('footer_columns_value')?.[index]?.split('<br>')
    })),
    socials: [
    ],
    footNote: (
      <div className="mr-4 rtl:mr-0 rtl:ml-4 text-sm">

      </div>
    ),
  };
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
              <div className="mb-2 font-semibold text-[13px]">{title}</div>
              {texts &&
                texts.map((text, index2) => (
                  <p key={`item-text-${index2}`} className="text-[13px]">
                    {text}
                  </p>
                ))}
            </div>
          ))}

        </div>
        <div className="text-muted py-6 text-sm md:flex md:items-center md:justify-between md:py-8">
          <ul className="mb-4 flex pl-2 rtl:pl-0 rtl:pr-2 md:order-1 md:mb-0">
            {links &&
              links.map(({ label, href }, index) => (
                <li key={`item-link-${index}`}>
                  <a
                    className="text-site duration-150 ease-in-out placeholder:transition hover:text-gray-700 hover:underline text-[13px]"
                    aria-label={label}
                    href={href}
                  >
                    {label}
                  </a>
                  {links.length - 1 !== index && <span className="mr-1 rtl:mr-0 rtl:ml-1"> · </span>}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer2;
