import React, { useEffect, useRef } from 'react'
import { ConsoleLogger as Logger } from '@aws-amplify/core'
import Storage from '@aws-amplify/storage'
import VideoJs from 'video.js'

const logger = new Logger('VideoComponent')

const videoJsOptions = {
  // techOrder: ['html5', 'flash'],
  controls: true,
  autoplay: false,
  fluid: false,
  loop: false,
  width: '100%',
  aspectRatio: '16:9'
}

const VideoPlayer = ({ fileKey, fileType }) => {
  const videoContainer = useRef()

  //  Setup the player
  useEffect(() => {
    //  Setting content like this because player.dispose() remove also the html content
    videoContainer.current.innerHTML = `
      <div data-vjs-player>
      
        <video class="video-js" />
      </div>
    `

    //  Setting logger level to all for dev
    if (process.env.NODE_ENV === 'development') {
      VideoJs.log('all')
    }

    const player = VideoJs(videoContainer.current.querySelector('video'), videoJsOptions, async () => {
      logger.debug(`Version of video.js is ${VideoJs.VERSION}`)
      const url = await Storage.get(fileKey, { level: 'protected' }) // Storage.get generates a signed url
      player.src({ src: url, type: fileType })
    })

    //  When destruct dispose the player
    return () => player.dispose()
  }, [fileKey, fileType])

  return <div ref={videoContainer} />
}

export default VideoPlayer