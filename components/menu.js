import React from 'react';
import { useRouter } from 'next/router';

import { getStaticRoute, getActive } from '@lib/routes';

import { MegaDropdownButton } from '@components/menu-mega-nav';
import Dropdown from '@components/menu-dropdown';
import CustomLink from '@components/link';
import animations from 'utils/animation';

const { hoverAnimation } = animations
const Menu = ({ items, useMegaNav, hasFocus = true, onClick, ...rest }) => {
  const router = useRouter();

  if (!items) return null;
  return (
    <ul {...rest}>
      {items.map((item, key) => {
        const isDropdown = !!item.dropdownItems;
        const isStatic = getStaticRoute(item.page?.type);
        const isActive = getActive(isStatic, item.page?.slug, router);

        // Dropdown List
        if (isDropdown) {
          const { dropdownItems } = item;
          const activeDropdown =
            dropdownItems.filter((item) => {
              const isStatic = getStaticRoute(item.page?.type);
              return getActive(isStatic, item.page?.slug, router);
            }).length > 0;

          return (
            <li
              key={key}
              className={`cursor-pointer hover:scale-[0.96] hover:opacity-80 ${isActive ? 'is-active' : null}`}
              onClick={() => router.push(item.url)}>
              {useMegaNav ? (
                <MegaDropdownButton title={item.title} id={item._key} />
              ) : (
                <Dropdown
                  title={item.title}
                  id={item._key}
                  items={item.dropdownItems}
                  onClick={onClick}
                />
              )}
            </li>
          );

          // single link
        } else {
          return (
            <li
              key={key}
              className={`cursor-pointer hover:scale-[0.96] hover:opacity-80 ${isActive ? 'is-active' : null}`}
              onClick={() => router.push(item.url)}>
              <CustomLink
                tabIndex={!hasFocus ? -1 : null}
                link={item}
                onClick={onClick}
              />
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Menu;
