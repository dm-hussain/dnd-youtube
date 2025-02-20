'use client';

import { useEffect, useState } from 'react';

export default function YoutubeData({ videoId, playListId }) {
const myAPI='AIzaSyCZR7FsXgcdvY9uAzpx8FQpB1qT-jkAdQc'


  const [vId, setVId] = useState('');
  const [pId, setPId] = useState('');
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  // Load saved videoId & playListId from localStorage
  useEffect(() => {
    setVId(localStorage.getItem('vId') || '');
    setPId(localStorage.getItem('pId') || '');
  }, []);

  // Update localStorage when videoId or playListId changes
  useEffect(() => {
    if (videoId) localStorage.setItem('vId', videoId);
    if (playListId) localStorage.setItem('pId', playListId);
  }, [videoId, playListId]);

  // Fetch Single Video Data
  useEffect(() => {
    if (!vId) return;
    
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${vId}&key=${myAPI}`;
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data?.items?.[0] || null);
      })
      .catch((error) => console.error('Error fetching video data:', error));
  }, [vId]);

  // Fetch Playlist Data
  useEffect(() => {
    if (!pId) return;
    
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pId}&maxResults=20&key=${myAPI}`;
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data?.items || []);
      })
      .catch((error) => console.error('Error fetching playlist data:', error));
  }, [pId]);

  return (
    <div className="  ">
      {/* Single Video Section */}
      {vId && video && (
        <div className="text-center mt-20" >
          <div className="flex justify-center   ">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="border border-white"

            >

<h2 className="text-green-500">{video.snippet.title.substring(0, 25)}...</h2>

            </iframe>
          </div>
        </div>
      )}

      {/* Playlist Section */}
      {pId && videos.length > 0 && (
        <div className='py-8'>
          <h2 className="text-center text-white">
            {videos[0]?.snippet?.title.substring(0, 25)}...
          </h2>
          <div className="flex justify-center flex-wrap gap-4 mt-10">
            {videos.map((video, index) => (
              <div key={index} className="border border-yellow-500">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                  title={video.snippet.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <h5 className="text-sm text-center text-white py-2">
                  {video.snippet.title}
                </h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
