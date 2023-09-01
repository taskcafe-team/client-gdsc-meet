'use client';
import { formatChatMessageLinks, LiveKitRoom, VideoConference } from '@livekit/components-react';
import { LogLevel } from 'livekit-client';

import { DebugMode } from '../../lib/Debug';
import { useSearchParams } from 'next/navigation'

export default function page() {
  
  // const { token } = router.query;
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const liveKitUrl = searchParams.get('liveKitUrl')
  console.log(token,liveKitUrl);
  
  if (typeof liveKitUrl !== 'string') {
    return <h2>Missing LiveKit URL</h2>;
  }
  if (typeof token !== 'string') {
    return <h2>Missing LiveKit token</h2>;
  }
  
  return (
    <main data-lk-theme="default">
      {liveKitUrl && (
        <LiveKitRoom  token={token} serverUrl={liveKitUrl} audio={true} video={true}>
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
          <DebugMode logLevel={LogLevel.info} />
        </LiveKitRoom>
      )}
    </main>
  );
}
