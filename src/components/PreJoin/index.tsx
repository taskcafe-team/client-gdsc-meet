'use client';
import {
  LocalUserChoices,
  MediaDeviceMenu,
  PreJoin,
  PreJoinProps,
  TrackToggle,
  usePreviewDevice,
} from '@livekit/components-react';
import React, { useRef, useState } from 'react';
import '@scss/components/PreJoin.scss';
import { log } from 'console';
import { Track } from 'livekit-client';
import { BiDialpad, BiUser } from 'react-icons/bi';
import Button from '../Button';
import '@scss/components/PreJoin.scss';
import Loading from '@/app/loading';
const DEFAULT_USER_CHOICES = {
  username: '',
  videoEnabled: true,
  audioEnabled: true,
  videoDeviceId: '',
  audioDeviceId: '',
};

export const PreJoinCustom = ({
  defaults = {},
  onValidate,
  onSubmit,
  onError,
  debug,
  joinLabel = 'Join Room',
  micLabel = 'Microphone',
  camLabel = 'Camera',
  userLabel = 'Username',
  ...htmlProps
}: PreJoinProps) => {
  const [userChoices, setUserChoices] = React.useState(DEFAULT_USER_CHOICES);
  const [username, setUsername] = React.useState(
    defaults.username ?? DEFAULT_USER_CHOICES.username,
  );
  const [videoEnabled, setVideoEnabled] = React.useState<boolean>(
    defaults.videoEnabled ?? DEFAULT_USER_CHOICES.videoEnabled,
  );
  const [videoDeviceId, setVideoDeviceId] = React.useState<string>(
    defaults.videoDeviceId ?? DEFAULT_USER_CHOICES.videoDeviceId,
  );
  const [audioEnabled, setAudioEnabled] = React.useState<boolean>(
    defaults.audioEnabled ?? DEFAULT_USER_CHOICES.audioEnabled,
  );
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>(
    defaults.audioDeviceId ?? DEFAULT_USER_CHOICES.audioDeviceId,
  );

  const video = usePreviewDevice(videoEnabled, videoDeviceId, 'videoinput');

  const videoEl = React.useRef(null);

  React.useEffect(() => {
    if (videoEl.current) video.localTrack?.attach(videoEl.current);
    return () => {
      video.localTrack?.detach();
    };
  }, [video.localTrack, videoEl]);
  const audio = usePreviewDevice(audioEnabled, audioDeviceId, 'audioinput');
  const [isValid, setIsValid] = React.useState<boolean>();

  const handleValidation = React.useCallback(
    (values: LocalUserChoices) => {
      if (typeof onValidate === 'function') {
        return onValidate(values);
      } else {
        return values.username !== '';
      }
    },
    [onValidate],
  );

  React.useEffect(() => {
    if (audio.deviceError) {
      onError?.(audio.deviceError);
    }
  }, [audio.deviceError, onError]);
  React.useEffect(() => {
    if (video.deviceError) {
      onError?.(video.deviceError);
    }
  }, [video.deviceError, onError]);

  React.useEffect(() => {
    const newUserChoices = {
      username: username,
      videoEnabled: videoEnabled,
      videoDeviceId: video.selectedDevice?.deviceId ?? '',
      audioEnabled: audioEnabled,
      audioDeviceId: audio.selectedDevice?.deviceId ?? '',
    };
    console.log('new', newUserChoices);
    setUserChoices(newUserChoices);
    setIsValid(handleValidation(newUserChoices as any));
  }, [
    username,
    videoEnabled,
    video.selectedDevice,
    handleValidation,
    audioEnabled,
    audio.selectedDevice,
  ]);

  function handleSubmit(event : React.FormEvent) {
    event.preventDefault();
    if (handleValidation(userChoices as any)) {
      if (typeof onSubmit === 'function') {
        onSubmit(userChoices as any);
      }
    } else {
      console.log('Validation failed with: ', userChoices);
    }
  }
  return (
    <div className=" flex p-[20px] gap-20 h-[80vh]" {...htmlProps}>
      <div className=" w-[50%] ">
        <div className=" shadow--box p-[10px] min-h-[56vh] ">
          <div className="">
            {video.localTrack && (
              <video
                ref={videoEl}
                className="transition-all rounded-sm"
                width="1280"
                height="720"
              />
            )}
            {(!video.localTrack || !videoEnabled) && (
              <div className="lk-camera-off-note transition-all"></div>
            )}
          </div>
        </div>
      </div>
      <div className="lk-tool w-[50%]">
        <h2 className="title">DTU Meet</h2>
        <div className="lk-button-group-container items-center flex gap-3">
          <div className="lk-button-group audio flex shadow--box p-5">
            <TrackToggle
              initialState={audioEnabled}
              source={Track.Source.Microphone}
              onChange={(enabled) => setAudioEnabled(enabled)}
              className="flex items-center gap-2"
            >
              {micLabel}
            </TrackToggle>
            <div className="lk-button-group-menu">
              <MediaDeviceMenu
                initialSelection={audio.selectedDevice?.deviceId}
                kind="audioinput"
                onActiveDeviceChange={(_, deviceId) => {
                  // log.warn('active device chanaged', deviceId);
                  setAudioDeviceId(deviceId);
                }}
                disabled={!!!audio.selectedDevice}
              />
            </div>
          </div>
          <div className="lk-button-group video flex shadow--box p-5">
            <TrackToggle
              initialState={videoEnabled}
              source={Track.Source.Camera}
              onChange={(enabled) => setVideoEnabled(enabled)}
              className="flex items-center gap-2"
            >
              {camLabel}
            </TrackToggle>
            <div className="lk-button-group-menu">
              <MediaDeviceMenu
                initialSelection={video.selectedDevice?.deviceId}
                kind="videoinput"
                onActiveDeviceChange={(_, deviceId) => {
                  setVideoDeviceId(deviceId);
                }}
                disabled={!!!video.selectedDevice}
              />
            </div>
          </div>
        </div>
        <form className="lk-username-container p-3 shadow--box flex items-center max-sm:w-full w-max my-5 shadow-box">
          <div className="mx-2">
            <BiUser className="block" />
          </div>
          <input
            className="lk-form-control block outline-none px-4 py-4 rounded-md max-sm:w-full  "
            id="username"
            name="username"
            type="text"
            defaultValue={username}
            placeholder={userLabel}
            onChange={(inputEl) => setUsername(inputEl.target.value)}
            autoComplete="off"
          />
          <Button className="max-sm:w-full" onClick={(e: React.FormEvent) => handleSubmit(e)} disabled={!isValid}>
            Join Now
          </Button>
        </form>

        {debug && (
          <>
            <strong>User Choices:</strong>
            <ul className="lk-list" style={{ overflow: 'hidden', maxWidth: '15rem' }}>
              <li>Username: {`${userChoices.username}`}</li>
              <li>Video Enabled: {`${userChoices.videoEnabled}`}</li>
              <li>Audio Enabled: {`${userChoices.audioEnabled}`}</li>
              <li>Video Device: {`${userChoices.videoDeviceId}`}</li>
              <li>Audio Device: {`${userChoices.audioDeviceId}`}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
