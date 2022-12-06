export default function getUserMediaStream(e: 'video' | 'audio'): Promise<MediaStream> {
  if (e == 'video') {
    return navigator.mediaDevices.getUserMedia({
      video: true
    })
  } else {
    return navigator.mediaDevices.getUserMedia({
      audio: true
    })
  }
}
