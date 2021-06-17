#!/bin/bash


POWER_OFF_OPTION=$(echo -e "suspend\nlogout\npoweroff\nreboot" |dmenu -p "shutdown menu")


case $POWER_OFF_OPTION in
  "suspend")
    systemctl suspend
    ;;
  "logout")
    killall awesome
    ;;
  "poweroff")
    sudo poweroff
    ;;
  "reboot")
    sudo reboot
    ;;
esac

