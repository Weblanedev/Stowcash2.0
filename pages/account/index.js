'use client';
import Container from '@components/container';
import { getStaticPage, queries } from '@data';
import Providers from 'context/Providers';
import Image from "next/image";
import React, { useState } from 'react';
import FormInput from '@components/input';
import Link from 'next/link';

const About = ({ data }) => {
  const { site, page } = data;
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [pages, setPages] = useState("login")
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store username and password in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Login details stored in local storage!');
  };

  return (
    <Providers>
      <Container site={site} page={page}>
        <div className='relative'>
          <div className='flex flex-col lg:flex-row lg:gap-[0px] h-[100vh] overflow-hidden'>
            <div className='w-[100%] hidden lg:block'>
              <div className={`relative h-[100vh]`}>
                <Image
                  src="https://res.cloudinary.com/dqew5naa7/image/upload/v1722265431/pexels-cottonbro-4068314_h5wshh.jpg"
                  layout='fill'
                  alt={"Sign Up Image"}
                />
              </div>
            </div>
            {pages === "login" ? <div className='flex justify-center pt-[100px] overflow-y-scroll h-[100vh] px-[20px] 2xl:p-0 w-[100%]'>
              <div className='flex flex-col gap-[50px]'>


                <div className='flex flex-col gap-5 w-[100%] xl:w-[405px]'>
                  <h1 className={`font-[700] text-[32px]`}>Welcome <span className={` font-light`}>Back</span></h1>
                  <p className={``}>Welcome back to Stowcash! Please enter your login details to access your account.</p>
                </div>

     
                <div className="w-[100%] xl:w-[398px]">
                  <FormInput
                    placeholder="Email Address"
                    value={email}
                    setValue={setEmail}
                    type="email"
                    id="email"
                    // icon={<AtSign size={28} />}
                    variant="outlineDark"
                  />
                </div>
                <div className="w-[100%] xl:w-[398px]">
                  <FormInput
                    placeholder="Password"
                    setValue={setPassword}
                    value={password}
                    type="password"
                    id="password"
                    variant="outlineDark"
                  />
                  {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                </div>
                <div>
                  <button className="w-[100%] mt-[30px] py-[15px] px-[40px] text-[20px] border text-pageText border-pageText bg-transparent rounded-full"
                    onClick={handleSubmit}> {false ? <div className="loader ease-linear rounded-full border-4 border-t-4 border-blacks-four h-[25px] w-[25px]"></div> : "CREATE ACCOUNT"}</button>
                  <p className={`text-center font-[400] text-[18px] items-center flex gap-[2px] justify-center pt-[20px]`}>
                    New account? <p onClick={() => {
                      setPages("signup")
                      window.scrollTo(0, 0)
                    }} className={`cursor-pointer underline`}>Sign up</p>
                  </p>
                </div>
              </div>
            </div>
              :
              <div className='flex justify-center pt-[100px] overflow-y-scroll h-[100vh] px-[20px] 2xl:p-0 w-[100%]'>
                <div className='flex flex-col gap-[50px]'>
                  <div className='flex flex-col gap-5 w-[100%] xl:w-[405px]'>
                    <h1 className={` font-[700] text-[32px]`}>Create <span className={` font-light`}>An Account</span></h1>
                    <p className={` text-grey-15`}>Register now to enjoy seamless shopping, personalized recommendations, and rewards!...</p>
                  </div>
                  <div className="w-[100%] xl:w-[398px] flex justify-between gap-[20px]">
                    <div className='w-[100%]'>
                      <FormInput
                        placeholder="First Name"
                        value={firstName}
                        setValue={setFirstName}
                        type="text"
                        id="firstName"
                        variant="outlineDark"
                      />
                    </div>
                    <div className='w-[100%]'>
                      <FormInput
                        placeholder="Last Name"
                        value={lastName}
                        setValue={setLastName}
                        type="text"
                        id="lastName"
                        variant="outlineDark"
                      />
                    </div>
                  </div>
                  {/* <div className="w-[398px]">
              <FormInput
                placeholder="Username"
                value={userName}
                setValue={setUserName}
                type="text"
                id="username"
                variant="outlineDark"
              />
            </div> */}
                  <div className="w-[100%] xl:w-[398px]">
                    <FormInput
                      placeholder="Email Address"
                      value={email}
                      setValue={setEmail}
                      type="email"
                      id="email"
                      // icon={<AtSign size={28} />}
                      variant="outlineDark"
                    />
                  </div>
                  <div className="w-[100%] xl:w-[398px]">
                    <FormInput
                      placeholder="Password"
                      setValue={setPassword}
                      value={password}
                      type="password"
                      id="password"
                      variant="outlineDark"
                    />
                  </div>
                  <div className="w-[100%] xl:w-[398px]">
                    <FormInput
                      placeholder="Confirm Password"
                      setValue={setConfirmPassword}
                      type="password"
                      value={confirmPassword}
                      id="confirmPassword"
                      variant="outlineDark"
                    />
                    {/* <p className={` text-xs text-purple-10 pt-[20px] flex gap-[10px]`}> */}
                    {/* <CircleAlert size={30} />  */}
                    {/* Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol</p> */}
                    {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                  </div>
                  <div>
                    <button className="w-[100%] mt-[30px] py-[15px] px-[40px] text-[20px] border text-pageText border-pageText bg-transparent rounded-full"
                      onClick={handleSubmit}> {false ? <div className="loader ease-linear rounded-full border-4 border-t-4 border-blacks-four h-[25px] w-[25px]"></div> : "CREATE ACCOUNT"}</button>

                    <p className={`text-center font-[400] text-[18px] items-center flex gap-[2px] justify-center pt-[10px]`}>
                      Already have an account? <p onClick={() => {
                        window.scrollTo(0, 0)
                        setPages("login")
                      }
                      } className={`cursor-pointer underline`}>Login</p>
                    </p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div >
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
