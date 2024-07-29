import React from 'react';
import Newsletter from '@components/newsletter';
import ThemeSwitch from '@components/theme-switch';
import Menu from '@components/menu';
import Icon from '@components/icon';
import axios from 'axios';

const Footer = () => {
  const [blockData, setblockData] = React.useState([]);
  React.useEffect(() => {
    (async () =>
      await axios
        .get(
          'https://sfpive8k.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22footerSettings%22%5D%5B0%5D%7B%0A%20%20%20%20%20%20%22blocks%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22title%22%3A%20blockTitle1%2C%0A%20%20%20%20%20%20%20%20%20%20newsletter%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22id%22%3A%20%22footer%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20klaviyoListID%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20submit%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20successMsg%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20errorMsg%5B%5D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22title%22%3A%20blockTitle2%2C%0A%20%20%20%20%20%20%20%20%20%20%22menu%22%3A%20blockMenu2-%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20items%5B%5D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22title%22%3A%20blockTitle3%2C%0A%20%20%20%20%20%20%20%20%20%20%22menu%22%3A%20blockMenu3-%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20items%5B%5D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22title%22%3A%20blockTitle4%2C%0A%20%20%20%20%20%20%20%20%20%20social%5B%5D%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20icon%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D'
        )
        .then((res) => {
          setblockData(res.data.result.blocks);
        }))();
  }, []);

  if (blockData.length > 0) {
    return (
      <footer className='footer border-t-[1px] border-t-black' role='contentinfo'>
        <div className='footer--grid'>
          {blockData?.map((block, key) => (
            <div key={key} className='footer--block'>
              {block.title && <p className='is-h3'>{block.title}</p>}

              {block.menu?.items && (
                <Menu items={block.menu.items} className='menu-footer' />
              )}

              {block.newsletter && <Newsletter data={block.newsletter} />}

              {block.social && (
                <div className='menu-social'>
                  {block.social.map((link, key) => {
                    return (
                      <a
                        key={key}
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <Icon name={link.icon} />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Put our extras in the last block */}
              {key === 3 && (
                <div className='footer--extras'>
                  <ThemeSwitch />

                  <div className='footer--disclaimer'>
                    <p>
                      &copy; {new Date().getFullYear()}. All Rights Reserved.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </footer>
    );
  }
};

export default Footer;
