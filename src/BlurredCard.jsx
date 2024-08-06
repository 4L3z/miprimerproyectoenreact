import React, { useState, useRef, useEffect } from 'react';
import { Card, CardBody, Image, Button, Slider } from '@nextui-org/react';
import {HeartIcon} from "./icons/HeartIcon";
import {PauseCircleIcon} from "./icons/PauseCircleIcon";
import {NextIcon} from "./icons/NextIcon";
import {PreviousIcon} from "./icons/PreviousIcon";
import {RepeatOneIcon} from "./icons/RepeatOneIcon";
import {ShuffleIcon} from "./icons/ShuffleIcon";
import {PlayCircleIcon} from "./icons/PlayCircleIcon"
import Atropos from 'atropos/react';
import 'atropos/css';
import { VolumeHighIcon } from './icons/VolumeHighIcon';
import { VolumeLowIcon } from './icons/VolumeLowIcon';
import musicFile1 from './assets/noseve.mp3';
import musicFile2 from './assets/Blinding Lights.mp3';
import musicFile3 from './assets/mewing.mp3';
import musicFile4 from './assets/Un Siglo Sin Ti.mp3';

const songs = [
  { src: musicFile1, title: 'No_Se_Ve.mp3' },
  { src: musicFile2, title: 'Blinding Lights' },
  { src: musicFile3, title: 'Mewing' },
  { src: musicFile4, title: 'Un Siglo Sin Ti' },
];

const BlurredCard = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [volume, setVolume] = useState(40); // Estado para el volumen

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio && duration > 0) {
        setProgress((audio.currentTime / duration) * 100);
      }
    };
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [duration, isPlaying]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => {
      const nextIndex = shuffle ? Math.floor(Math.random() * songs.length) : (prevIndex + 1) % songs.length;
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => {
      const prevIndexAdjusted = (prevIndex - 1 + songs.length) % songs.length;
      return prevIndexAdjusted;
    });
    setIsPlaying(false);
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
  };

  const handleSliderChange = (value) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (value / 100) * duration;
      audio.currentTime = newTime;
      setProgress(value);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };
    if (audio) {
      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [repeat, shuffle]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume]);

  return (
    <Atropos className="my-atropos">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src="https://cdn.discordapp.com/attachments/1248727426868051979/1268281785805176973/hjgjhjgh.webp?ex=66b31b35&is=66b1c9b5&hm=1502f7927b65c8bf086eb4a3a57a8de85a52e313606d91ab6ef165097041cc12&"
                width="100%"
              />
            </div>
            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">Playlist Linda</h3>
                  <p className="text-small text-foreground/80">4 Canciones</p>
                  <h1 className="text-large font-medium mt-2">{currentSong.title}</h1>
                </div>
                <Button
                  isIconOnly
                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                  radius="full"
                  variant="light"
                  onPress={() => setLiked((v) => !v)}
                >
                  <HeartIcon
                    className={liked ? "[&>path]:stroke-transparent" : ""}
                    fill={liked ? "currentColor" : "none"}
                  />
                </Button>
              </div>
              <div className="flex flex-col mt-3 gap-1">
                <Slider
                  aria-label="Music progress"
                  classNames={{
                    track: "bg-default-500/30",
                    thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                  }}
                  color="foreground"
                  value={progress}
                  onChange={handleSliderChange}
                  size="sm"
                />
                <div className="flex justify-between">
                  <p className="text-small">
                    {new Date((audioRef.current?.currentTime || 0) * 1000).toISOString().substr(14, 5)}
                  </p>
                  <p className="text-small text-foreground/50">
                    {new Date((duration || 0) * 1000).toISOString().substr(14, 5)}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <Button
                  isIconOnly
                  className={`data-[hover]:bg-foreground/10 ${repeat ? 'text-foreground' : 'text-foreground/80'}`}
                  radius="full"
                  variant="light"
                  onClick={handleRepeat}
                >
                  <RepeatOneIcon />
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                  onClick={handlePrevious}
                >
                  <PreviousIcon />
                </Button>
                <Button
                  isIconOnly
                  className="w-auto h-auto data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <PauseCircleIcon size={54} /> : <PlayCircleIcon size={54} />}
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                  onClick={handleNext}
                >
                  <NextIcon />
                </Button>
                <Button
                  isIconOnly
                  className={`data-[hover]:bg-foreground/10 ${shuffle ? 'text-foreground' : 'text-foreground/80'}`}
                  radius="full"
                  variant="light"
                  onClick={handleShuffle}
                >
                  <ShuffleIcon />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <Slider
                  aria-label="Volume"
                  size="lg"
                  color="secondary"
                  value={volume}
                  onChange={(value) => setVolume(value)}
                  className="mx-2"
                  startContent={<VolumeLowIcon className="text-2xl" />}
                  endContent={<VolumeHighIcon className="text-2xl" />}
                />
              </div>
            </div>
          </div>
        </CardBody>
        <audio ref={audioRef} src={currentSong.src} />
      </Card>
    </Atropos>
  );
};

export default BlurredCard;