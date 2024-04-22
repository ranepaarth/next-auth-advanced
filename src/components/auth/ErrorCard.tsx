import React from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import { CardWrapper } from './CardWrapper';

function ErrorCard() {
  return (
    <CardWrapper
      headerLabel='Oops! Something went wrong!!'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      <div className='flex w-full items-center justify-center'>
        <BsExclamationTriangle className='h-8 w-8 text-destructive' />
      </div>
    </CardWrapper>
  );
}

export default ErrorCard;
