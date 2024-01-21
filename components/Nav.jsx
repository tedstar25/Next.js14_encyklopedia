"use client";

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';



const Nav = () => {

  const {data:session} = useSession();

  const [providers,setProviders] = useState(null);
  const [toggleDropdown,settoggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();

  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src={'/assets/images/logo.svg'}
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/*Destop navigation*/} 
      <div className='sm:flex hidden'> {/*hidden for small devises*/} 
        {session?.user? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>Create Post</Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href="/profile">
              <Image 
              src={session?.user.image} 
              width={37}
              height={37}
              className='rounded-full'
              alt="Profil"
              />
            </Link>
          </div>
        ):(
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button
                type="button"
                key={provider.name}
                className='black_btn'
                onClick={()=> signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/*Mobile navigation*/} 
      <div className='sm:hidden flex relative'> {/*hidden for big devises*/} 
        {session?.user ? (   
          <div className='flex'>
              <Image 
              src={session?.user.image} 
              width={37}
              height={37}
              className='rounded-full'
              alt="Profil"
              onClick={()=>settoggleDropdown((prev)=> !prev)}   
              />    {/**callback function with prev is best practise in react */}

                {toggleDropdown && (
                  <div className='dropdown'>
                    <Link 
                      href="/profile"
                      className='dropdown_link'
                      onClick={() => settoggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      href="/create-prompt"
                      className='dropdown_link'
                      onClick={() => settoggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button 
                      type="button" 
                      className='mt-5 w-full black_btn'
                      onClick={() => {
                        settoggleDropdown(false);
                        signOut();
                        }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
          </div>

        ):(
          <>
          {providers && 
            Object.values(providers).map((provider) => (
              <button
              type="button"
              className='black_btn'
              key={provider.name}
              onClick={()=> signIn(provider.id)}
              >
                Sign In
              </button>
            ))}
        </>
        )}

      </div>
    </nav>
  )
}

export default Nav;