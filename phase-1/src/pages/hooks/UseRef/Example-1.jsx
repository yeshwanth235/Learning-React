import { useRef, useState } from "react";


const Example1 = () => {
 return (
  <div className="mt-4">
   <p className="text-cyan-800 text-lg">Use Ref Example 1</p>
   <p>Goal: Build a custom video player with useRef to controll playback</p>
   <p>Requirements:</p>
   <ul className="ml-5">
    <li>
     Video Element with Custom Controls
     <ul className="list-disc ml-5">
      <li>
       Play/Pause button
      </li>
      <li>
       Stop button (pause + reset to 0:00)
      </li>
      <li>
       Seek forward/backward (±10 seconds)
      </li>
      <li>
       Playback speed selector (0.5x, 1x, 1.5x, 2x)
      </li>
     </ul>
    </li>
    <li>
     Display current state
     <ul className="list-disc ml-5">
      <li>
       Current time / Total duration
      </li>
      <li>
       Is playing indicator
      </li>
      <li>
       Current volume percentage
      </li>
      <li>
       Current speed
      </li>
     </ul>
    </li>
    <li>
     Auto Focus on Input'
     <ul className="list-disc ml-5">
      <li>
       Add a "Jump to Time" input
      </li>
      <li>
       Auto-focus input when "Jump" button clicked
      </li>
      <li>
       Format: MM:SS (e.g., "01:30" for 1 minute 30 seconds)
      </li>
     </ul>
    </li>
    <li>
     Track play count
     <ul className="list-disc ml-5">
      <li>Use useRef to count how many times video has been played</li>
      <li>Display total play count (should NOT trigger re-renders)</li>
     </ul>
    </li>
   </ul>

   <VideoPlayer />
  </div>
 )
}

const VideoPlayer = () => {

  const videoRef = useRef(null);
  const jumpInputRef = useRef(null)
  const playCountRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [playbackRate, setPlaybackRate] = useState(1);

  const handlePlayPause = () => {
   if(videoRef.current.paused) {
    videoRef.current.play();
    playCountRef.current += 1;
    setIsPlaying(true)
   } else {
    videoRef.current.pause();
    setIsPlaying(false)
   }
  }

  const handleStop = () => {
   videoRef.current.pause();
   setIsPlaying(false)
  }

  const handleSeekForward = () => {
   videoRef.current.currentTime += 10;
  }

  const handleSeekBackward = () => {
   videoRef.current.currentTime -= 10;
  }

  const handleVolumeChange = (e) => {
   const newVolume = e.target.value
   setVolume(newVolume)
   videoRef.current.volume = newVolume / 100
  }

  const handleSpeedChange = (e) => {
   const value = parseFloat(e.target.value)
   setPlaybackRate(value);
   videoRef.current.playbackRate = value;
  }

  const handleJumpToTime = () => {
    const timeString = jumpInputRef.current.value.split(':')  // Get input value
    const minutes = parseInt(timeString[0], 10)
    const seconds = parseInt(timeString[1], 10)
    const totalSeconds = (minutes * 60) + seconds
    videoRef.current.currentTime = videoRef.current.currentTime + totalSeconds
  }

  const handleTimeUpdate = () => {
   setCurrentTime(videoRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
   setDuration(videoRef.current.duration)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

 return (
  <div className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold mb-6 text-gray-600">
     Custom Video Player
    </h1>

    <div className="bg-black rounded-lg overflow-hidden mb-4">
     <video
      ref={videoRef}
      className="w-full"
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
     >
      <source
       src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
       type="video/mp4"
      />
     </video>
    </div>

    <div className="bg-blue-100 p-4 rounded-lg mb-4 grid grid-cols-2 gap-2">
     <div >
      <p className="text-sm font-semibold">Status: </p>
      <p className={isPlaying ? 'text-green-600' : 'text-red-600'}>
       {isPlaying ? '▶️ Playing' : '⏸️ Paused'}
      </p>
     </div>
     <div>
      <p className="text-sm font-semibold">Time: </p>
      <p>{formatTime(currentTime)} / {formatTime(duration)}</p>
     </div>
     <div>
      <p className="text-sm font-semibold">Volume:</p>
      <p>{volume}%</p>
     </div>
     <div>
      <p className="text-sm font-semibold">Speed:</p>
      <p>{playbackRate}x</p>
     </div>
     <div className="col-span-2">
      <p className="text-sm font-semibold">Total Plays:</p>
      <p className="text-xl font-bold text-purple-600">
       {playCountRef.current}
      </p>
     </div>
    </div>

    <div className="flex gap-2 mb-4">
        <button
          onClick={handlePlayPause}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold"
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button
          onClick={handleStop}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold"
        >
          ⏹️ Stop
        </button>
        <button
          onClick={handleSeekBackward}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ⏪ -10s
        </button>
        <button
          onClick={handleSeekForward}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ⏩ +10s
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          Volume: {volume}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          Playback Speed: {playbackRate}x
        </label>
        <select
          value={playbackRate}
          onChange={handleSpeedChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        >
          <option value="0.5">0.5x (Slow)</option>
          <option value="1">1x (Normal)</option>
          <option value="1.5">1.5x (Fast)</option>
          <option value="2">2x (Very Fast)</option>
        </select>
      </div>

      <div className="flex gap-2">
        <input
          ref={jumpInputRef}
          type="text"
          placeholder="MM:SS (e.g., 01:30)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleJumpToTime}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Jump to Time
        </button>
      </div>

  </div>
 )
}

export default Example1