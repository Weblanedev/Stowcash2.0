"use client";
import Container from "@components/container";
import { getStaticPage, queries } from "@data";
import Providers from "context/Providers";
import React from "react";

const About = ({ data }) => {
  const { site, page } = data;
  return (
    <Providers>
      <Container site={site} page={page}>
        <main className="">
          <div className="border-b-black border-b-[1px] py-32 md:py-48 px-6 md:px-32 flex flex-col md:flex-row md:justify-between md:items-center">
            <h1 className="md:w-[60%] font-semibold">Privacy policy</h1>
            <h5 className="md:w-[35%] md:text-center  font-normal">
              At Omyre, we value your privacy. This policy outlines how we
              handle your personal information. By using our services, you agree
              to these terms.
            </h5>
          </div>
          <div className="px-6 md:px-32 md:w-[70%] py-32">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum qui
              repellat placeat hic impedit labore, reprehenderit accusamus
              dolores nisi fugit deserunt provident voluptas et nobis
              accusantium est quia nihil magni corporis maiores mollitia laborum
              cupiditate. Sapiente, quisquam. Rerum totam perspiciatis dolore
              vel ad atque aut id earum ea neque corrupti, cum temporibus
              maiores quos. Iste consequatur neque quam accusamus obcaecati!
              Dignissimos dolorum, voluptate ad voluptatibus quo cumque nihil
              incidunt optio ab tempora consectetur placeat quas deleniti earum
              inventore ipsum ratione quos ut culpa veniam ex. Dolores at
              excepturi culpa placeat libero velit quidem numquam ad recusandae
              iste repellendus nobis fugiat aut harum, exercitationem
              repudiandae non impedit delectus rerum, nesciunt voluptate. Omnis
              nisi magnam numquam temporibus possimus nulla deserunt libero
              consequatur, odio error ipsa saepe exercitationem sed tempore esse
              laudantium commodi iure suscipit deleniti minus! Deserunt
              quibusdam error magni, quisquam omnis quis dolores recusandae,
              quam tempora eius explicabo veniam tempore voluptas repellendus
              harum voluptatum rem animi. Sapiente laudantium consectetur et
              illo rem nobis ad incidunt laboriosam eum culpa nam eaque
              cupiditate rerum, architecto perferendis quos est a doloremque
              mollitia voluptas quia recusandae facere porro amet! Eum
              praesentium eligendi, sit ex est odit. Commodi, iusto in. Dolorem
              minima quibusdam perferendis voluptatum aliquam eaque officia
              suscipit, commodi molestias quasi. Alias corrupti, ea nobis iusto
              quibusdam odio recusandae aliquid, inventore nesciunt ut deserunt
              id labore, velit assumenda facilis voluptas modi fuga. Iure
              accusamus assumenda voluptates at pariatur ipsam reiciendis
              distinctio officia, id aspernatur sint aut nulla quia fugiat
              quisquam accusantium beatae numquam similique rerum animi. Ratione
              id ducimus reiciendis. Magnam quas ab amet dolorem deleniti
              similique debitis, aperiam ut cupiditate at quasi alias a eum ex
              nostrum suscipit? Voluptas rem aperiam aliquam. Ab nulla repellat
              aut debitis hic eos. Recusandae, numquam! Incidunt ullam eum
              pariatur quod modi. Obcaecati vero unde reiciendis quia quasi?
              Vitae nobis corporis porro, recusandae alias voluptatibus deleniti
              vel optio architecto dolorum error id maxime magni? Repudiandae
              ipsam maiores soluta, laudantium porro consequatur sed quas enim
              voluptas quibusdam molestias doloribus aliquid dolores?
              Consequuntur illo consectetur tenetur eligendi dolorum sit rem,
              magni voluptatibus beatae praesentium odio reiciendis incidunt
              voluptatem ratione, accusamus amet pariatur cum dolores illum
              inventore? Architecto deserunt perferendis accusantium repellat
              veritatis provident eveniet, vero praesentium, facere aspernatur
              reiciendis, sunt autem consequuntur obcaecati! Atque ut, cumque
              accusamus tenetur ducimus facilis et sit molestiae voluptas nihil
              culpa optio vero fuga quas expedita odit? Voluptatem iste
              excepturi illum accusamus. Repudiandae commodi nostrum, voluptatem
              cum dignissimos recusandae eos deleniti nesciunt illum sit dolorem
              est ex vero debitis aliquid veniam, veritatis laborum praesentium
              quod cumque voluptatum quidem vitae nulla. Mollitia eius inventore
              voluptatum iure deleniti suscipit totam eum magni, commodi sunt
              similique ab, iste nihil aliquam hic laboriosam perspiciatis. Sed
              id repellat ea! Amet placeat, minima maiores omnis iusto ex
              obcaecati veniam animi voluptatem ad fugit tempora iste, eligendi
              facilis. Perspiciatis corrupti, voluptates labore culpa corporis
              reiciendis neque ad voluptatem obcaecati distinctio ipsam nam
              repudiandae quae exercitationem quos aliquam, architecto incidunt
              a, voluptatum iusto non expedita sequi. Quo veniam, provident eum
              adipisci dolore error consequuntur cupiditate soluta magnam
              accusamus porro natus. Nam hic esse dolore nostrum quaerat error
              officiis vero tenetur, officia laboriosam placeat voluptas,
              consequatur voluptatum, alias id sequi consequuntur rem aliquam
              totam impedit saepe eaque accusantium! Odit laudantium sunt
              aliquid nulla id dignissimos vero, nemo accusantium adipisci
              blanditiis aut explicabo sed assumenda facere maiores voluptas ad
              error dolorum, et quidem ex qui. Iste consequuntur neque suscipit
              impedit, aut ratione fugit repudiandae tempore ipsa voluptatum
              provident nostrum eligendi vel autem accusantium ullam quam
              minima! Iste inventore excepturi officia incidunt laborum
              necessitatibus quis ratione asperiores illo nisi eveniet aliquid
              temporibus optio id, facere error nihil?
            </p>
          </div>
        </main>
      </Container>
    </Providers>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "page" && _id == ${queries.homeID}] | order(_updatedAt desc)[0]{
      "id": _id,
      hasTransparentHeader,
      modules[]{
        defined(_ref) => { ...@->content[0] {
          ${queries.modules}
        }},
        !defined(_ref) => {
          ${queries.modules},
        }
      },
      title,
      seo
    }
  `,
    {
      active: preview,
      token: previewData?.token,
    }
  );

  return {
    props: {
      data: pageData,
    },
  };
}

export default About;
