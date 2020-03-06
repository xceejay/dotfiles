
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
    *) return;;
esac

#ignore history duplicates
export HISTCONTROL=ignoreboth:erasedups
# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=-1
HISTFILESIZE=-1 #infinite history

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
#[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
        # We have color support; assume it's compliant with Ecma-48
        # (ISO/IEC-6429). (Lack of such support is extremely rare, and such
        # a case would tend to support setf rather than setaf.)
        color_prompt=yes
    else
        color_prompt=
    fi
    fi

    if [ "$color_prompt" = yes ]; then
        #PS1='${debian_chroot:+($debian_chroot)}\[\033[01;35m\]\u@\[\033[00;93m\]void\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
        #PS1="┌─[\`if [ \$? = 0 ]; then echo \[\e[32m\]✔\[\e[0m\]; else echo \[\e[31m\]✘\[\e[0m\]; fi\`]───[\[\e[01;49;39m\]\u\[\e[00m\]\[\e[01;49;39m\]@\H\[\e[00m\]]───[\[\e[1;49;34m\]\W\[\e[0m\]]───[\[\e[1;49;39m\]\$(ls | wc -l) files, \$(ls -lah | grep -m 1 total | sed 's/total //')\[\e[0m\]]\n└───▶ "

        PS1='\[\033[38;5;54m\]┌─\[\033[38;5;54m\][\[\033[01;35m\]\[\033[38;5;192m\]\w\[\033[38;5;54m\]]\n\[\033[38;5;54m\]└───▶\[\033[0;00m\] '
    else
        PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
    fi
    unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
    xterm*|rxvt*)
        PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
        ;;
    *)
        ;;
esac
stty -ixon #disable terminal pausing

shopt -s autocd #allows autocd into directory by just typing dir name

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    #alias grep='grep --color=auto'
    #alias fgrep='fgrep --color=auto'
    #alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
#export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# some more ls aliases
#alias ll='ls -l'
#alias la='ls -A'
#alias l='ls -CF'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
    if [ -f /usr/share/bash-completion/bash_completion ]; then
        . /usr/share/bash-completion/bash_completion
    elif [ -f /etc/bash_completion ]; then
        . /etc/bash_completion
    fi
    fi




# MACHINE SPECIFIC ALIAS'S
#######################################################			
shopt -s expand_aliases
# Alias's for SSH
alias SERVERNAME='sudo ssh google.com -l joel -p 22'

# Alias's to change the directory
alias web='cd /var/www/html'

# Alias's to mount ISO files
# mount -o loop /home/NAMEOFISO.iso /home/ISOMOUNTDIR/
# umount /home/NAMEOFISO.iso
# (Both commands done as root only.)

#######################################################
# GENERAL ALIAS'S
#######################################################
# To temporarily bypass an alias, we preceed the command with a \
# EG: the ls command is aliased, but to use the normal ls command you would type \ls

#do as
#alias doas="doas -- "
#alias sudo="doas"


# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Edit this .bashrc file
alias ebrc='edit ~/.bashrc'

wallpaper=/home/joel/.config/awesome/themes/purple/wall.png

# Show help for this .bashrc file2alias hlp='less ~/.bashrc_hel2'

# alias to show the date
alias da='date "+%Y-%m-%d %A %T %Z"'

# Alias's to modified commands
#alias a fuzzy finder alias
#alias javafx='java --module-path $PATH_TO_FX --add-modules javafx.controls $@'
alias v='vim'
alias nmr='sudo systemctl restart NetworkManager'
alias nms='sudo systemctl stop NetworkManager'
alias bible='~/Downloads/minimal/kjv/kjv'
alias cjpg='xclip -sel clip -t image/jpeg'
alias cpng='xclip -sel clip -t image/png'
alias calc='rofi -modi "calc":/home/joel/scripts/calc -show calc'
alias xinitrc="sudo vim /etc/X11/xinit/xinitrc"
alias tm="notify-send -t 2000 "$(date|awk '{print $5}')⏰""
alias mycli='sudo mycli'
alias javafx=' /usr/lib/jvm/java-11-openjdk-amd64/bin/java --module-path /usr/lib/jvm/jdk-13/lib/fx --add-modules=javafx.controls --add-modules javafx.base,javafx.graphics'
alias javacfx=' /usr/lib/jvm/java-11-openjdk-amd64/bin/javac --module-path /usr/lib/jvm/jdk-13/lib/fx --add-modules=javafx.controls --add-modules javafx.base,javafx.graphics'
alias dmenu_run='dmenu_run -fn "manrope-10" -nb black -sb "#260A35"'
alias sxiv='sxiv -b'
alias dmenu='dmenu -fn "manrope-10" -nb black -sb "#260A35"'
alias wireshark='sudo wireshark-gtk & exit'
alias vvu='surf 192.168.0.254:8090'
alias timetable="cgrep  '(^([a-zA-Z]+)|[0-9]+-[0-9]+am||[0-9]+-[0-9]+pm|[0-9][0-9][a-z][a-z]+|am+|pm+)' ~/timetable" 
alias upvote='sudo systemctl restart upvotebot.service'
alias tee='tee -a '  
alias t="tldr $1 "
alias regex='sed "s/-/    /" ~/regex|egrep --color ^[^Aa-Zz].?[^Aa-Zz0-9]'
alias cwlc='/home/joel/Desktop/programming/java/CWLC/./CWLC'
alias ipa=' ip add|egrep global|egrep   --color "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"'
wipa=$(ip addr|awk "/inet/ {print \$2}"|grep 19)
alias wipa='ip addr|awk "/inet/ {print \$2}"|grep 19|cgrep .'
alias androidstudio='studio.sh $* >/dev/null 2>&1 &'
alias kdec=kdeconnect-cli
alias anboxrun=' anbox launch --package=org.anbox.appmgr $* >/dev/null 2>&1 &'
alias avwifi='nmcli dev wifi'
alias kdeconnect=kdeconnectd
alias gateway='ip r'
alias inkscape='inkscape $* >/dev/null 2>&1 &'
alias tgcli='~/tg/bin/./telegram-cli'
alias text=/opt/sublime_text/sublime_text
alias dict=sdcv
alias free='free --mega'
alias terminal='xfce4-terminal'
alias nmap='nmap -sP'
alias localtunnel='/usr/local/bin/lt'
alias mount="mount -w"
alias grep='egrep -i'
alias iw='sudo iw'
alias cgrep='egrep --color=always'
alias distupgrade='sudo aptitude update && sudo aptitude safe-upgrade'
alias update='sudo aptitude  update && sudo aptitude upgrade'
alias mv='mv -i'
alias rm='rm -Ivr'
alias mkdir='mkdir -p'
alias ping='ping -c 10'
alias less='less -R'
alias cls='clear'
alias apt='sudo aptitude'
alias ctrlx='xte' #control x display server by faking input using xte
alias feh="feh -B black"
alias kallp='sudo killall5 -9' #killall processes
alias pip="pip3"

# Change directory aliases
alias pics='cd ~/Pictures'
alias disk='cd /media/joel/disk;la'
alias lec22='cd ~/Desktop/lectures/level2002;ls'
alias lec='cd ~/Desktop/lectures;ls'
alias doc='cd ~/Documents;ls'
alias vid='cd ~/Downloads/Video;lt'
alias cmpr='cd ~/Downloads/Compressed;lt'
alias dwn='cd ~/Downloads;ls'
alias mvs='cd  ~/Desktop/movies;ls'
alias sshs='cd ~/sshserver;la'
alias cs='cd ~/Desktop/lectures/computer\ science/;ls'
alias jpg='cd ~/Desktop/programming/java;ls'
alias pg='cd ~/Desktop/programming;ls'
alias dp='cd ~/Desktop/'
alias home='cd ~'
alias cd..='cd ..'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias diraliases='sed '208,226!d' .bashrc|egrep  --color '^alias' '

# cd into the old directory
alias bd='cd "$OLDPWD"'


# Alias's for multiple directory listing commands
alias l='/bin/ls -Ah' #mostly used for scripts and dmenu stuff
alias la='ls -Alh' # show hidden files
alias ls='ls -aFh --color=always' # add colors and file type extensions
alias lx='ls -lXBh' # sort by extension
alias lk='ls -lSrh' # sort by size
alias lc='ls -lcrh' # sort by change time
alias lu='ls -lurh' # sort by access time
alias lr='ls -lRh' # recursive ls
alias lt='ls -ltrh' # sort by date
alias lm='ls -alh |more' # pipe through 'more'
alias lw='ls -xAh' # wide listing format
alias ll='ls -Fls' # long listing format
alias labc='ls -lap' #alphabetical sort
alias lf="ls -l | egrep -v '^d'" # files only
alias ldir="ls -l | egrep '^d'" # directories only
alias projector="python ~/Downloads/ProjectorTool.py & exit"
# alias chmod commands
alias mx='chmod a+x'
alias 000='chmod -R 000'
alias 644='chmod -R 644'
alias 666='chmod -R 666'
alias 755='chmod -R 755'
alias 777='chmod -R 777'
alias chmods="cat /home/joel/chmods"
# Search command line history
alias h="history | tail -n 20"

# Search running processes
alias p="ps aux | grep "
alias topcpu="/bin/ps -eo pcpu,pid,user,args | sort -k 1 -r | head -10"

# Search files in the current folder

f(){
locate --ignore-case "$*" | grep "$PWD"
}

# Count all files (recursively) in the current folder
alias countfiles="for t in files links directories; do echo \`find . -type \${t:0:1} | wc -l\` \$t; done 2> /dev/null"

# To see if a command is aliased, a file, or a built-in command
alias checkcommand="type -t"

# Show current network connections to the server
alias ipview="netstat -anpl | grep :80 | awk {'print \$5'} | cut -d\":\" -f1 | sort | uniq -c | sort -n | sed -e 's/^ *//' -e 's/ *\$//'"

# Show open ports
alias openports='netstat -nape --inet'

# Alias's for safe reboot
alias rebootsafe='sudo shutdown -r now'

# Alias's to show disk space and space used in a folder
alias diskspace="du -S | sort -n -r |more"
alias folders='du -h --max-depth=1'
alias folderssort='find . -maxdepth 1 -type d -print0 | xargs -0 du -sk | sort -rn'
alias tree='tree -CAhF --dirsfirst'
alias treed='tree -CAFd'



# Alias's for archives
alias mktar='tar -cvf'
alias mkbz2='tar -cvjf'
alias mkgz='tar -cvzf'
alias untar='tar -xvf'
alias unbz2='tar -xvjf'
alias ungz='tar -xvzf'
alias mkzip='zip -rv'

# Show all logs in /var/log
alias logs="sudo find /var/log -type f -exec file {} \; | grep 'text' | cut -d' ' -f1 | sed -e's/:$//g' | grep -v '[0-9]$' | xargs tail -f &"

#######################################################
# SPECIAL FUNCTIONS
#######################################################


# Extracts any archive(s) (if unp isn't installed)
extract () {
    for archive in $*; do
        if [ -f $archive ] ; then
            case $archive in
                *.tar.bz2)   tar xvjf $archive    ;;
                *.tar.gz)    tar xvzf $archive    ;;
                *.bz2)       bunzip2 $archive     ;;
                *.rar)       rar x $archive       ;;
                *.gz)        gunzip $archive      ;;
                *.tar)       tar xvf $archive     ;;
                *.tbz2)      tar xvjf $archive    ;;
                *.tgz)       tar xvzf $archive    ;;
                *.zip)       unzip $archive       ;;
                *.Z)         uncompress $archive  ;;
                *.7z)        7z x $archive        ;;
                *)           echo "don't know how to extract '$archive'..." ;;
            esac
        else
            echo "'$archive' is not a valid file!"
        fi
    done
}

# Searches for text in all files in the current folder
ftext ()
{
    # -i case-insensitive
    # -I ignore binary files
    # -H causes filename to be printed
    # -r recursive search
    # -n causes line number to be printed
    # optional: -F treat search term as a literal, not a regular expression
    # optional: -l only print filenames and not the matching lines ex. grep -irl "$1" *
    grep -iIHrn --color=always "$1" . | less -r
}

#echo path into tempfile after every cd 
cd (){

    builtin cd "$@" && echo "$PWD" > /tmp/cpath

}


mpv (){

command mpv "$@" && echo "$PWD">/tmp/mvspath
}
#Automatically do an ls after each cd
#cd ()
#{
#if [ -n "$1" ]; then
#	builtin cd "$@" && ls
#else
#	builtin cd ~ && ls
#	fi
#}

# View Apache logs
apachelog ()
{
    if [ -f /etc/httpd/conf/httpd.conf ]; then
        cd /var/log/httpd && ls -xAh && multitail --no-repeat -c -s 2 /var/log/httpd/*_log
    else
        cd /var/log/apache2 && ls -xAh && multitail --no-repeat -c -s 2 /var/log/apache2/*.log
    fi
}

# Edit the Apache configuration
apacheconfig ()
{
    if [ -f /etc/httpd/conf/httpd.conf ]; then
        vim /etc/httpd/conf/httpd.conf
    elif [ -f /etc/apache2/apache2.conf ]; then
        vim /etc/apache2/apache2.conf
    else
        echo "Error: Apache config file could not be found."
        echo "Searching for possible locations:"
        sudo updatedb && locate httpd.conf && locate apache2.conf
    fi
}

# Edit the PHP configuration file
phpconfig ()
{
    if [ -f /etc/php.ini ]; then
        vim /etc/php.ini
    elif [ -f /etc/php/php.ini ]; then
        vim /etc/php/php.ini
    elif [ -f /etc/php5/php.ini ]; then
        vim /etc/php5/php.ini
    elif [ -f /usr/bin/php5/bin/php.ini ]; then
        vim /usr/bin/php5/bin/php.ini
    elif [ -f /etc/php5/apache2/php.ini ]; then
        vim /etc/php5/apache2/php.ini
    else
        echo "Error: php.ini file could not be found."
        echo "Searching for possible locations:"
        sudo updatedb && locate php.ini
    fi
}

# Edit the MySQL configuration file
mysqlconfig ()
{
    if [ -f /etc/my.cnf ]; then
        vim /etc/my.cnf
    elif [ -f /etc/mysql/my.cnf ]; then
        vim /etc/mysql/my.cnf
    elif [ -f /usr/local/etc/my.cnf ]; then
        vim /usr/local/etc/my.cnf
    elif [ -f /usr/bin/mysql/my.cnf ]; then
        vim /usr/bin/mysql/my.cnf
    elif [ -f ~/my.cnf ]; then
        vim ~/my.cnf
    elif [ -f ~/.my.cnf ]; then
        vim ~/.my.cnf
    else
        echo "Error: my.cnf file could not be found."
        echo "Searching for possible locations:"
        sudo updatedb && locate my.cnf
    fi
}



# Trim leading and trailing spaces (for scripts)
trim()
{
    local var=$@
    var="${var#"${var%%[![:space:]]*}"}"  # remove leading whitespace characters
    var="${var%"${var##*[![:space:]]}"}"  # remove trailing whitespace characters
    echo -n "$var"
}
disk=/media/joel/disk

dirsize(){ #Recursively  Calculate Total Size of specified Directory
    if [ $# -eq 0 ]		
    then
        lr |grep ^total|sed s/total//g> ~/dirsize;cd ~/ && java dirsize;printf "  " ;echo $OLDPWD|sed s/\\/home\\/joel\\//~\\//g;bd;
    else
        olddir=$PWD;cd "$*";lr |grep ^total|sed s/total//g> ~/dirsize;cd ~/ && java dirsize;printf "  " ;echo $OLDPWD|sed s/\\/home\\/joel\\//~\\//g;bd;cd $olddir;
    fi
}
filesize(){ #Recursively  Calculate Total Size of FILES within specified Directory
    if [ $# -eq 0 ]	
    then
        lf |grep ^total|sed s/total//g> ~/dirsize;cd ~/ && java dirsize;printf "   " ;echo $OLDPWD|sed s/\\/home\\/joel\\//~\\//g;bd;
    else
        olddir=$PWD;cd "$*";lf |grep ^total|sed s/total//g> ~/dirsize;cd ~/ && java dirsize;printf "  " ;echo $OLDPWD|sed s/\\/home\\/joel\\//~\\//g;bd;cd $olddir;
    fi
}
fr(){ #find and run files with fuzzy search and xdg-open

    xdg-open "$(fzf -q $1)"
}
vidtomp3(){
    ffmpeg -i "$1" -vn "$2".mp3
}

goto(){

    if [ $# -eq 0 ]
    then
        cd "$(dirname "$(fzf --height=20 )")"

    else
        cd "$(dirname "$(fzf --height=20 -q "$1")")"
    fi
}

adbp(){ #adbpull
    start=/storage/emulated/0/
    adb  pull "$start$1"
}

wallp(){
    local pics="/home/joel/Pictures/"
    if [ $# -eq 0 ]
    then
        cp "$pics$(img)" /home/joel/.config/awesome/themes/purple/wall.png
    else
        cp "$1" /home/joel/.config/awesome/themes/purple/wall.png 
    fi
}


ofile(){ 
    local ffile=""
    cd $lectures && ffile="$(fzf --tac)"

    if [ ffile == "" ]
    then
    cd $OLDPWD
    else
    xdg-open "$ffile" >/dev/null 2>&1 & disown ;
    fi
}

logout(){
    loginctl terminate-session $(loginctl |grep joel|awk '{print $1}')
}


###SYNTAX FOR DMENU
#$(grep  "surf [0-1]"* .bash_history|dmenu -l 30)

# save stderr and stdout to us var
# us=$(pwd 2>&1)
# add quotes to beginning and end of line 
#ls *.pdf|awk '{ print "\""$0"\""}'|dmenu

#Lauch Gui application and redirect sdtout and stderr to /dev/null to prevent terminal logging
vlc() { command vlc "$@" > /dev/null 2>&1 & disown ;}
evince() { command evince  "$@" > /dev/null 2>&1 & disown ;}
surf() { command surf "$@" > /dev/null 2>&1 & disown ;}
music() { command rhythmbox "$@" > /dev/null 2>&1 & disown ;}
gimp() { command gimp "$@" > /dev/null 2>&1 & disown ;}
firefox() { command  firefox-esr "$@" > /dev/null 2>&1 & disown ;}
eclipse() { command eclipse "$@" > /dev/null 2>&1 & disown ;}
code() { command codium "$@" > /dev/null 2>&1 & disown ;}
transmission() { command  transmission-gtks "$@" > /dev/null 2>&1 & disown ;}
torbrowser() { command  torbrowser-launcher  "$@" > /dev/null 2>&1 & disown ;}
idea() { command  idea.sh  "$@" > /dev/null 2>&1 & disown ;}
qtcreator() { command  qtcreator  "$@" > /dev/null 2>&1 & disown ;}
lowriter() { command  lowriter  "$@" > /dev/null 2>&1 & disown ;}
nautilus() { command  nautilus "$1" > /dev/null 2>&1 & disown ;}
images(){ command sxiv -t *>/dev/null 2>&1 & disown;}
krita(){ command krita "$@">/dev/null 2>&1 & disown;}
z(){  zathura "$@" >/dev/null 2>&1 & disown;}
telegram(){ command ~/Telegram/Telegram >/dev/null 2>&1 & disown;} 
tgceejay(){ command ~/Telegram/Telegram -many -workdir ~/ceejay >/dev/null 2>&1 & disown;}
#() { command  "$@" > /dev/null 2>&1 & disown ;}
####EXPORTS######
#find /usr/lib/jvm/java-1.x.x-openjdk
#vim /etc/profile 
#export JAVA_HOME="path that you found"
#export PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME="/usr/lib/jvm/java-1.11.0-openjdk-amd64"
#export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-amd64"
export PATH=$JAVA_HOME/bin:$PATH
# java-1.11.0-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
export flutter="/home/joel/flutter"
export PATH=$flutter/bin:$PATH
#export PATH_TO_FX=/usr/lib/jvm/java-11-openjdk-amd64/lib/javafx 
#export PATH=$PATH_TO_FX:$PATH
#no need since i apt installed it
#export M2_HOME="/opt/apache-maven-3.6.1"
#export PATH=$M2_HOME/bin:$PATH
export eclipse="/home/joel/eclipse/java-2019-12/eclipse/"
export PATH=$eclipse:$PATH
export androidstudio='/home/joel/android-studio/bin'
export PATH=$androidstudio:$PATH
export scripts=/home/joel/scripts
export PATH=$scripts:$PATH
export PATH=$PATH:$HOME/bin
export ANDROID_SDK_ROOT="/home/joel/Android/sdk/tools/bin"
export PATH=$ANDROID_SDK_ROOT:$PATH
export lectures="/home/joel/Desktop/lectures"
export LOCALBIN=/home/joel/.local/bin
export PATH=$LOCALBIN:$PATH
export LATESTCHROME=/home/joel/.local/bin/chrome-linux
export PATH=$LATESTCHROME:$PATH
export ANDROID_HOME="/home/joel/Android/sdk"
export PATH=$PATH:ANDROID_HOME
export NETBEANS="/home/joel/netbeans/bin"
export PATH=$PATH:$NETBEANS
export _JAVA_OPTIONS='-Dawt.useSystemAAFontSettings=gasp'

#js
[ -f ~/.fzf.bash ]  && source ~/.fzf.bash

 #keybindings
 bind -x '"\C-b": vim ~/.bashrc && source ~/.bashrc'
 bind -x '"\C-s": cd ~/scripts && sc="$(fzf)" && vim $sc; bd'
 bind -x '"\C-n": ofile'
 bind -x '"\C-g": goto'
 bind 'set show-all-if-ambiguous on' #zsh-like auto-completion
 bind 'TAB:menu-complete'


 #bash insults


 if [ -f /etc/bash.command-not-found-messages ]; then
    . /etc/bash.command-not-found-messages
fi

if [ -f /etc/bash.command-not-found ]; then
    . /etc/bash.command-not-found
fi

