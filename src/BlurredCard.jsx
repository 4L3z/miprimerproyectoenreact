import React, { useState, useRef, useEffect } from 'react';
import { Card, CardBody, Image, Button, Slider } from '@nextui-org/react';
import {HeartIcon} from "./HeartIcon";
import {PauseCircleIcon} from "./PauseCircleIcon";
import {NextIcon} from "./NextIcon";
import {PreviousIcon} from "./PreviousIcon";
import {RepeatOneIcon} from "./RepeatOneIcon";
import {ShuffleIcon} from "./ShuffleIcon";
import {PlayCircleIcon} from "./PlayCircleIcon"
import Atropos from 'atropos/react';
import 'atropos/css';
import { Howl } from 'howler';
import musicFile from './assets/noseve.mp3'; 

const BlurredCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audio = useRef(
    new Howl({
      src: [musicFile],
      html5: true,
      onload: function () {
        setDuration(this.duration());
      },
      onend: function () {
        setIsPlaying(false);
      },
      onplay: function () {
        setInterval(() => {
          setProgress((this.seek() / this.duration()) * 100);
        }, 1000);
      },
      onloaderror: function (id, error) {
        console.error('Error de carga del audio:', error);
      }
    })
  );

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => new Date(time * 1000).toISOString().substr(14, 5);

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
                src="https://cdn.discordapp.com/attachments/1248727426868051979/1268281785805176973/hjgjhjgh.webp?ex=66b27275&is=66b120f5&hm=c772038983e07666f039082ae9f4a754c587eaf8e9fe124faa140a3449de7a20&"
                width="100%"
              />
            </div>
            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">Playlist Linda</h3>
                  <p className="text-small text-foreground/80">1 Cancion</p>
                  <h1 className="text-large font-medium mt-2">No_Se_Ve.mp3</h1>
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
                  onChange={(value) => audio.current.seek((value / 100) * duration)}
                  size="sm"
                />
                <div className="flex justify-between">
                  <p className="text-small">{formatTime(audio.current.seek())}</p>
                  <p className="text-small text-foreground/50">{formatTime(duration)}</p>
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <RepeatOneIcon className="text-foreground/80" />
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
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
                >
                  <NextIcon />
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <ShuffleIcon className="text-foreground/80" />
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Atropos>
  );
};

export default BlurredCard;