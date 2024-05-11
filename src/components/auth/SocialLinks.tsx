import React from 'react';
import { FaCode, FaLinkedinIn } from 'react-icons/fa6';
import { IoLogoGithub } from 'react-icons/io';

const SocialLinks = () => {
  const sourceCode = 'https://github.com/ranepaarth/next-auth-advanced';
  const githubProfile = 'https://github.com/ranepaarth';
  const linkedInProfile = 'https://linkedin.com/in/paarth-rane';
  return (
    <div className='flex w-full items-center justify-between p-4 text-sm sm:text-base text-neutral-600'>
      <div className='text-xs'>
        <p>ranepaarth &copy;2024</p>
      </div>
      <div className='flex items-center space-x-4'>
        <a
          href={sourceCode}
          target={'_blank'}
          className='hover:text-neutral-900'
          title='Source code'
        >
          <FaCode />
        </a>
        <a
          href={githubProfile}
          target={'_blank'}
          className='hover:text-neutral-900'
          title='Github'
        >
          <IoLogoGithub />
        </a>
        <a
          href={linkedInProfile}
          target={'_blank'}
          className='hover:text-neutral-900'
          title='Linkedin'
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
