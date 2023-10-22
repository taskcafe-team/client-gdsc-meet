'use client';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for the 'useRouter' hook
import { BiMeteor } from 'react-icons/bi';
import Button from '@/components/Button';
import { RoomService } from '@/api/http-rest/room';
import { IRoom } from '@/model/IRoom';
import { useDispatch } from 'react-redux';
import { MEET_ADD, meetDetail } from '@/redux/meet';
import { useAppSelector } from '@/hooks/redux.hook';

const StartMeeting: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const room = useAppSelector(meetDetail)
  console.log(room);
  
  
  const startMeeting = useCallback(async () => {
    try {
        dispatch(MEET_ADD as any);
        router.push(`/rooms/${room?.friendlyId}`);
      
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, [dispatch, room]);

  return (
    <Button
      className="max-md:w-full bg-primary text-white"
      onClick={startMeeting}
    >
      <BiMeteor width={30} height={30} fontSize={20} />
      New meeting
    </Button>
  );
};

export default StartMeeting;
