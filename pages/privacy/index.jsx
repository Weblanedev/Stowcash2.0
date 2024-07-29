'use client';
import Container from '@components/container';
import { getStaticPage, queries } from '@data';
import Providers from 'context/Providers';
import React from 'react';

const Privacy = ({ data }) => {
  const { site, page } = data;

  
  return (
    <Providers>
    <Container site={site} page={page}>
      <main className=''>
        <div className='border-b-black border-b-[1px] py-32 md:py-48 px-6 md:px-32 flex flex-col md:flex-row md:justify-between md:items-center'>
          <h1 className='md:w-[60%] font-semibold'>Privacy policy</h1>
          <h5 className='md:w-[35%] md:text-center  font-normal'>
            At Omyre, we value your privacy. This policy outlines how we handle
            your personal information. By using our services, you agree to these
            terms.
          </h5>
        </div>
        <div className='px-6 md:px-32 md:w-[70%] py-32'>
          <p>
            At Stowcash, accessible from stowcash.co, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by Stowcash and how we use it. If you have additional
            questions or require more information about our Privacy Policy, do
            not hesitate to contact us. This Privacy Policy applies only to our
            online activities and is valid for visitors to our website with
            regards to the information that they shared and/or collect in
            Stowcash. This policy is not applicable to any information collected
            offline or via channels other than this website.
            <br />
            <br />
            <h5 className='font-semibold '>Consent</h5>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
            <br />
            <br />
            <h5 className='font-semibold '>Information we collect</h5>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information. If you
            contact us directly, we may receive additional information about you
            such as your name, email address, phone number, the contents of the
            message and/or attachments you may send us, and any other
            information you may choose to provide. When you register for an
            Account, we may ask for your contact information, including items
            such as name, company name, address, email address, and telephone
            number.
            <br />
            <br />
            <h5 className='font-semibold '>How we use your information</h5>
            We use the information we collect in various ways, including to:
            <br />
            - Provide, operate, and maintain our website
            <br />
            - Improve, personalize, and expand our website
            <br />
            - Understand and analyze how you use our website
            <br />
            - Develop new products, services, features, and functionality
            <br />
            - Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes
            <br />
            - Send you emails
            <br />
            - Find and prevent fraud
            <br />
            <br />
            <h5 className='font-semibold '>Log Files</h5>
            Stowcash follows a standard procedure of using log files. These
            files log visitors when they visit websites. All hosting companies
            do this and a part of hosting services' analytics. The information
            collected by log files include internet protocol (IP) addresses,
            browser type, Internet Service Provider (ISP), date and time stamp,
            referring/exit pages, and possibly the number of clicks. These are
            not linked to any information that is personally identifiable. The
            purpose of the information is for analyzing trends, administering
            the site, tracking users' movement on the website, and gathering
            demographic information.
            <br />
            <br />
            <h5 className='font-semibold '>Cookies and Web Beacons</h5>
            Like any other website, Stowcash uses "cookies". These cookies are
            used to store information including visitors' preferences, and the
            pages on the website that the visitor accessed or visited. The
            information is used to optimize the users' experience by customizing
            our web page content based on visitors' browser type and/or other
            information.
            <br />
            <br />
            <h5 className='font-semibold '>
              Advertising Partners Privacy Policies
            </h5>
            You may consult this list to find the Privacy Policy for each of the
            advertising partners of Stowcash. Third-party ad servers or ad
            networks uses technologies like cookies, JavaScript, or Web Beacons
            that are used in their respective advertisements and links that
            appear on Stowcash, which are sent directly to users' browser. They
            automatically receive your IP address when this occurs. These
            technologies are used to measure the effectiveness of their
            advertising campaigns and/or to personalize the advertising content
            that you see on websites that you visit. Note that Stowcash has no
            access to or control over these cookies that are used by third-party
            advertisers.
            <br />
            <br />
            <h5 className='font-semibold '>Third Party Privacy Policies</h5>
            Stowcash's Privacy Policy does not apply to other advertisers or
            websites. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options. You can choose to disable cookies
            through your individual browser options. To know more detailed
            information about cookie management with specific web browsers, it
            can be found at the browsers' respective websites.
            <br />
            <br />
            <h5 className='font-semibold '>
              CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h5>
            Under the CCPA, among other rights, California consumers have the
            right to: Request that a business that collects a consumer's
            personal data disclose the categories and specific pieces of
            personal data that a business has collected about consumers. Request
            that a business delete any personal data about the consumer that a
            business has collected. Request that a business that sells a
            consumer's personal data, not sell the consumer's personal data. If
            you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
            <br />
            <br />
            <h5 className='font-semibold '>GDPR Data Protection Rights</h5>
            We would like to make sure you are fully aware of all of your data
            protection rights. Every user is entitled to the following: The
            right to access – You have the right to request copies of your
            personal data. We may charge you a small fee for this service. The
            right to rectification – You have the right to request that we
            correct any information you believe is inaccurate. You also have the
            right to request that we complete the information you believe is
            incomplete. The right to erasure – You have the right to request
            that we erase your personal data, under certain conditions. The
            right to restrict processing – You have the right to request that we
            restrict the processing of your personal data, under certain
            conditions. The right to object to processing – You have the right
            to object to our processing of your personal data, under certain
            conditions. The right to data portability – You have the right to
            request that we transfer the data that we have collected to another
            organization, or directly to you, under certain conditions. If you
            make a request, we have one month to respond to you. If you would
            like to exercise any of these rights, please contact us.
            <br />
            <br />
            <h5 className='font-semibold '>Children's Information</h5>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
            Stowcash does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you think that
            your child provided this kind of information on our website, we
            strongly encourage you to contact us immediately and we will do our
            best efforts to promptly remove such information from our records.
            <br />
            <br />
            <h5 className='font-semibold '>Changes to This Privacy Policy</h5>
            We may update our Privacy Policy from time to time. Thus, we advise
            you to review this page periodically for any changes. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            These changes are effective immediately, after they are posted on
            this page.
            <br />
            <br />
            <h5 className='font-semibold '>Contact Us</h5>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us.
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

export default Privacy;
