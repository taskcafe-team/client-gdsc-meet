'use client';
import React, { useState } from 'react';
import { BiDialpad } from 'react-icons/bi';
import Button from '@/components/Button/index';
import { useRouter } from 'next/navigation';
const index: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const router = useRouter();
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const handleConnect = () => {
    try {
      const initTokent = token ? token : null;
      if (initTokent && initTokent?.length > 0) {
        router.push(`/custom/?liveKitUrl=${serverUrl}&token=${token}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Connect transition-colors border-none max-sm:flex-col max-sm:w-full max-sm:items-start flex items-center gap-2  border dark:border-none  px-2 py-2 rounded-md">
      <div className="Connect__Group flex items-center max-sm:w-full ">
        <div className="mx-2">
          <BiDialpad className="block" />
        </div>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          type="text"
          placeholder="input tokent"
          className="block outline-none px-4 py-4 rounded-md max-sm:w-full bg-gray-100 dark:bg-gray-900"
        />
      </div>
      <Button
        className="max-sm:w-full  bg-primary  text-white  dark:bg-white dark:text-primary"
        onClick={() => handleConnect()}
      >
        Join Now
      </Button>
    </div>
  );
};

export default index;
