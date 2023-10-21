'use client';
import React from 'react';
import Button from '@/components/Button';
import { BiCamera, BiMeteor } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { generateRoomId } from '@/utils';

const StartMeeting: React.FC = (props) => {
    const router = useRouter();
    const startMeeting = () => {
      const roomID = generateRoomId();
      router.push(`/rooms/${roomID}`);
    };
  return (
    <Button className=' max-md:w-full bg-primary  text-white' onClick={() => startMeeting()}>
      <BiMeteor width={30} height={30} fontSize={20} />
      New meeting
    </Button>
  );
};

StartMeeting.propTypes = {};

export default StartMeeting;
