import Head from "next/head";
import React from "react";
import { convertYouTubeUrlToID } from "../utils/converter";

type Props = {
  url: string;
  width?: string;
  height?: string;
} & typeof defaultProps;

const defaultProps = {
  width: "1280", // YouTube default value: 560
  height: "720", // YouTube default value: 315
};

function YouTubeVideo(props: Props) {
  const { url, width, height } = props;
  const YouTubeID = convertYouTubeUrlToID(url);
  const videoUrl = `https://www.youtube.com/embed/${YouTubeID}?rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`;

  return (
    <>
      <Head>
        <script type="text/javascript" src="/js/custom-youtube-player.js" />
      </Head>
      <div className="hytPlayerWrapOuter">
        <div className="hytPlayerWrap">
          <iframe
            title={YouTubeID}
            width={width}
            height={height}
            src={videoUrl}
            frameBorder="0"
          />
        </div>
      </div>
    </>
  );
}

YouTubeVideo.defaultProps = defaultProps;

export default YouTubeVideo;
