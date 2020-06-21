
ffmpeg -i video.mp4 frame_%d.png


i=0
while [ $i -le 480 ]
  do
chwall frame_$i.png

i=$((i+1))
done

