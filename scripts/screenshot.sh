#!/bin/bash

#script to screenshot screen with the help of maim and dmenu

SCREENSHOT_OPTION=$(echo -e "fullscreen\nselect\nactive-window" |dmenu -p "screenshot📸")
FILE_PATH="/home/joel/personal/pictures/screenshots/$(date -u +"%Y-%m-%dT%H:%M:%S.png")"


case $SCREENSHOT_OPTION in
  "fullscreen")
maim "$FILE_PATH" && xclip -selection clipboard -t image/png < "$FILE_PATH" && notify-send "screenshot📸"
    ;;
  "select")
maim --select "$FILE_PATH" &&  xclip -selection clipboard -t image/png < "$FILE_PATH" && notify-send "screenshot📸"
    ;;
  "active-window")
   maim --window "$(xdotool getactivewindow)" "$FILE_PATH" && xclip -selection clipboard -t image/png < "$FILE_PATH" && notify-send "screenshot📸"
    ;;
esac



