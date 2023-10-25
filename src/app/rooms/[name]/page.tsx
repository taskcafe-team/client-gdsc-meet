'use client';
import Loading from '@/app/loading';

import { DebugMode } from '@/lib/Debug';
import {
  LiveKitRoom,
  LocalUserChoices,
  useToken,
  VideoConference,
  formatChatMessageLinks,
} from '@livekit/components-react';
import { LogLevel, RoomOptions, VideoPresets } from 'livekit-client';
import { PreJoin } from '@components/PreJoin';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { useAppSelector } from '@/hooks/redux.hook';
import { userDetail } from '@/redux/users';
import { RoomService } from '@/api/http-rest/room';
import { IRoom } from '@/model/IRoom';
import usePrivateRoute from '@/hooks/usePrivateRoute';

const page: NextPage = (context: any) => {
  const isLogin = usePrivateRoute();
  const router = useRouter();
  const { theme } = useTheme();
  const { name: roomName } = context.params;
  const user = useAppSelector(userDetail);
  const [preJoinChoices, setPreJoinChoices] = useState<LocalUserChoices | undefined>(undefined);
  const fullName: string = useMemo(
    () => `${user?.firstname ?? ''} ${user?.lastname ?? ''}`.trim(),
    [user],
  );
  return (
    <div>
      <Head>
        <title>DTU meet</title>
      </Head>

      <main>
        {roomName && !Array.isArray(roomName) && preJoinChoices ? (
          <ActiveRoom
            roomName={roomName}
            userChoices={preJoinChoices}
            onLeave={() => {
              router.push('/');
            }}
          ></ActiveRoom>
        ) : (
          <div className={`bg-[#111111] h-[100vh] flex items-center justify-center`}>
            <PreJoin
              onError={(err) => console.log('error while setting up prejoin', err)}
              defaults={{
                username: fullName.trim() ?? '',
                videoEnabled: true,
                audioEnabled: true,
              }}
              data-lk-theme="default"
              onSubmit={(values) => {
                setPreJoinChoices(values);
              }}
            ></PreJoin>
          </div>
        )}
      </main>
    </div>
  );
};

type ActiveRoomProps = {
  userChoices: LocalUserChoices;
  roomName: string;
  region?: string;
  onLeave?: () => void;
};

const ActiveRoom = ({ roomName, userChoices, onLeave }: ActiveRoomProps) => {
  // Generated tokent get sever site
  const [token, setToken] = useState('');
  const searchParams = useSearchParams();
  const region = searchParams.get('region');
  const hq = searchParams.get('hq');
  const liveKitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  useEffect(() => {
    const fetch = async () => {
      const fetchToken = await RoomService.getRoomAccessToken(roomName);
      setToken(fetchToken?.data?.token);
    };
    fetch();
  }, []);

  const roomOptions = useMemo((): RoomOptions => {
    return {
      videoCaptureDefaults: {
        deviceId: userChoices.videoDeviceId ?? undefined,
        resolution: hq === 'true' ? VideoPresets.h2160 : VideoPresets.h720,
      },
      publishDefaults: {
        videoSimulcastLayers:
          hq === 'true'
            ? [VideoPresets.h1080, VideoPresets.h720]
            : [VideoPresets.h540, VideoPresets.h216],
      },
      audioCaptureDefaults: {
        deviceId: userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
    };
  }, [userChoices, hq]);

  if (token === '') {
    return <Loading />;
  }

  return (
    <>
      {liveKitUrl && (
        <LiveKitRoom
          token={token}
          serverUrl={liveKitUrl}
          options={roomOptions}
          video={userChoices.videoEnabled}
          audio={userChoices.audioEnabled}
          onDisconnected={onLeave}
          data-lk-theme="default"
          style={{ height: '100dvh' }}
        >
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
          <DebugMode logLevel={LogLevel.info} />
        </LiveKitRoom>
      )}
    </>
  );
};
export default page;
