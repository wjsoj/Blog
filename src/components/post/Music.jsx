import { useEffect } from 'preact/hooks';

export default function Music({id,coverlink}) {
  useEffect(() => {
    const ap = new APlayer({
      container: document.getElementById('aplayer'),
      audio: [{
          name: '活着',
          artist: '王建房',
          url: `http://music.163.com/song/media/outer/url?id=${id}.mp3`,
          cover: coverlink,
      }]
    });
  }, [])
  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/aplayer@1.10.1/dist/APlayer.min.css"></link>
      <div id="aplayer" className="max-w-screen-sm mx-auto justify-self-center self-center"></div>
      <script src="https://unpkg.com/aplayer@1.10.1/dist/APlayer.min.js"></script>
    </>
  )
}