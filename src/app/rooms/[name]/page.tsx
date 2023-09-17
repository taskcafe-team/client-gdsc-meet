'use client';
import Loading from '@/app/loading';
import { PreJoinCustom } from '@/components/PreJoin';
import { DebugMode } from '@/lib/Debug';
import {
  LiveKitRoom,
  PreJoin,
  LocalUserChoices,
  useToken,
  VideoConference,
  formatChatMessageLinks,
} from '@livekit/components-react';
import { LogLevel, RoomOptions, VideoPresets } from 'livekit-client';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const page: NextPage = (context: any) => {
  const router = useRouter();

  const { name: roomName } = context.params;
  console.log(context.params);
  const [preJoinChoices, setPreJoinChoices] = useState<LocalUserChoices | undefined>(undefined);
  console.log('Pre  ', preJoinChoices);
  return (
    <>
      <Head>
        <title>DTU meet</title>
      </Head>

      <main >
        {roomName && !Array.isArray(roomName) && preJoinChoices ? (
          <ActiveRoom
            roomName={roomName}
            userChoices={preJoinChoices}
            onLeave={() => {
              router.push('/');
            }}
          ></ActiveRoom>
        ) : (
          <div style={{ placeItems: 'center', height: '100%' }} >
            <PreJoin
              onError={(err) => console.log('error while setting up prejoin', err)}
              defaults={{
                username: '',
                videoEnabled: true,
                audioEnabled: true,
              }}
              onSubmit={(values) => {
                console.log('Joining with: ', values);
                setPreJoinChoices(values);
              }}
            ></PreJoin>
          </div>
        )}
      </main>
    </>
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
  console.log({
    userChoices: userChoices,
  });
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`/get_lk_token?room=${roomName}&username=${'aaaa'}`);
        const data = await resp.json();
        setToken(data.token);
        console.log(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
 
   // Wait for userChoices and hq to be available before rendering LiveKitRoom
  //  if (!userChoices || !hq) {
  //   return <Loading />;
  // }
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
  console.log('opinion', roomOptions);
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
        >
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
          <DebugMode logLevel={LogLevel.info} />
        </LiveKitRoom>
      )}
    </>
  );
};
export default page;