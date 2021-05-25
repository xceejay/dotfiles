#!/usr/bin/env bash


xset  r rate 300 50
#autocutsel &
#autocutsel -s PRIMARY &

function run {
  if ! pgrep -f "$1" ;
  then
    $@&
  fi
}

run compton
run sxhkd
#run cbatticon
run clipmenud
#run  xss-lock -- dm-tool lock
#run xfce4-clipman
#run xfce4-terminal --drop-down
#run pnmixer
#run volumeicon
run transmission-daemon
# run volti ##run pasystray -a
#run transmission-daemon -c /home/joel/downloads/transmission
run pasystray -a
run nm-applet
run unclutter
#run pulseaudio --start
#run pulseaudio
run devilspie
#run transmission-gtk
#run kdeconnect-indicator
run blueman-applet
#run clementine
#run flashfocus
#run rhythmbox
#run xdman
#tgceejay="/home/joel/Telegram/Telegram -many -workdir ~/ceejay" && run "$tgceejay"

