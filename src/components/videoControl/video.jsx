import React from 'react';
import ReactPlayer from 'react-player';

function Video({ keyMovie, playing, checkVolume }) {
   return (
      <>
         <ReactPlayer
            url={`https://www.youtube.com/watch?v=${keyMovie}origin=http://localhost:5173`}
            width='100%'
            height='100%'
            playing={playing}
            controls={false}
            muted={checkVolume}
         />
      </>
   );
}

export default Video;
