'use client';
import React, { useCallback, useState } from 'react';
import { BiDialpad } from 'react-icons/bi';
import Button from '@/components/Button/index';
import { useRouter } from 'next/navigation';
import { RoomService } from '@/api/http-rest/room';
import { IResponse } from '@/model/IResponse';
import useToastily from '@/hooks/useToastily';
const index: React.FC = () => {
  const [nameRoom, setNameRoom] = useState<string>('');
  const router = useRouter();
  const showToast = useToastily();
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const handleConnect = useCallback(async () => {
    try {
      const ValidateRoom: any = await RoomService.getRoomDetail(nameRoom);
      if (ValidateRoom?.code == 200) {
        router.push(`/custom/?nameroom=${nameRoom}`);
      } else {
        showToast({
          content: 'Can not find room name',
          type: 'warning',
        });
        setNameRoom('');
      }
    } catch (err) {
     console.log(err);
     
    }
  }, [nameRoom]);
  return (
    <div className="Connect transition-colors border-none max-sm:flex-col max-sm:w-full max-sm:items-start flex items-center gap-2  border dark:border-none  px-2 py-2 rounded-md">
      <div className="Connect__Group flex items-center max-sm:w-full ">
        <div className="mx-2">
          <BiDialpad className="block" />
        </div>
        <input
          value={nameRoom}
          onChange={(e) => setNameRoom(e.target.value)}
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
