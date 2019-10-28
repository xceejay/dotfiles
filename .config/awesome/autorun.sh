#!/usr/bin/env bash

function run {
  if ! pgrep -f $1 ;
  then
    $@&
  fi
}

run compton
run sxhkd
run xfce4-clipman
run xfce4-terminal --drop-down
run pasystray -a
run pulseaudio

