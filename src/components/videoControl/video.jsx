import React from 'react';
import ReactPlayer from 'react-player';

function Video({ keyMovie, playing, checkVolume, handlePlayVideo }) {
   return (
      <>
         <ReactPlayer
            url={`https://www.youtube.com/watch?v=${keyMovie}`}
            width='100%'
            height='100%'
            playing={playing}
            controls={false}
            muted={checkVolume}
            onReady={handlePlayVideo}
         />
      </>
   );
}

export default Video;
