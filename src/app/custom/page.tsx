'use client';
import { formatChatMessageLinks, LiveKitRoom, VideoConference } from '@livekit/components-react';
import {
  ExternalE2EEKeyProvider,
  LogLevel,
  RoomConnectOptions,
  Room,
  RoomOptions,
  VideoPresets,
} from 'livekit-client';
import { useRouter } from 'next/router';
import { DebugMode } from '../../lib/Debug';
import { decodePassphrase } from '../../lib/client-utils';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { RoomService } from '@/api/http-rest/room';
import Loading from '../loading';

export default function CustomRoomConnection() {
  const liveKitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const searchParams = useSearchParams();
  const roomName = searchParams.get('nameroom');
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const fetch = async () => {
      const fetchToken = await RoomService.getRoomAccessToken(`${roomName}`);
      setToken(fetchToken?.data?.token);
    };
    fetch();
  }, []);
  const e2eePassphrase =
    typeof window !== 'undefined' && decodePassphrase(window.location.hash.substring(1));
  const worker =
    typeof window !== 'undefined' &&
    new Worker(new URL('livekit-client/e2ee-worker', import.meta.url));
  const keyProvider = new ExternalE2EEKeyProvider();

  const e2eeEnabled = !!(e2eePassphrase && worker);

  const roomOptions = useMemo((): RoomOptions => {
    return {
      publishDefaults: {
        videoSimulcastLayers: [VideoPresets.h540, VideoPresets.h216],
        red: !e2eeEnabled,
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
      e2ee: e2eeEnabled
        ? {
            keyProvider,
            worker,
          }
        : undefined,
    };
  }, [e2eeEnabled, keyProvider, worker]);

  const room = useMemo(() => new Room(roomOptions), [roomOptions]);
  if (e2eeEnabled) {
    keyProvider.setKey(e2eePassphrase);
    room.setE2EEEnabled(true);
  }

  const connectOptions = useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);

  if (typeof liveKitUrl !== 'string') {
    return <Loading/>;
  }
  if (typeof token !== 'string') {
    return <Loading/>;
  }

  return (
    <main data-lk-theme="default">
      {liveKitUrl && (
        <LiveKitRoom
          room={room}
          token={token}
          connectOptions={connectOptions}
          serverUrl={liveKitUrl}
          audio={true}
          video={true}
          data-lk-theme="default"
          style={{ height: '100dvh' }}
        >
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
          <DebugMode logLevel={LogLevel.info} />
        </LiveKitRoom>
      )}
    </main>
  );
}
