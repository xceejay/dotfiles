# Set up the prompt

source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
source ~/.fzf.zsh
setopt histignorealldups sharehistory

PROMPT="%B%F{54}┌─[%F{192}%~%F%B%F{54}]
└───▶%F "

# Use emacs keybindings even if our EDITOR is set to vi
bindkey -e

# Keep 1000 lines of history within the shell and save it to ~/.zsh_history:
HISTSIZE=1000
SAVEHIST=1000
HISTFILE=~/.zsh_history

# Use modern completion system
autoload -Uz compinit
compinit

bindkey "^[[1;5C" forward-word
bindkey "^[[1;5D" backward-word

zstyle ':completion:*' auto-description 'specify: %d'
zstyle ':completion:*' completer _expand _complete _correct _approximate
zstyle ':completion:*' group-name ''
zstyle ':completion:*' menu select=2
eval "$(dircolors -b)"
zstyle ':completion:*:default' list-colors ${(s.:.)LS_COLORS}
zstyle ':completion:*' list-colors ''
zstyle ':completion:*' list-prompt %SAt %p: Hit TAB for more, or the character to insert%s
zstyle ':completion:*' matcher-list '' 'm:{a-z}={A-Z}' 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=* l:|=*'
zstyle ':completion:*' menu select=long
zstyle ':completion:*' select-prompt %SScrolling active: current selection at %p%s
zstyle ':completion:*' use-compctl false

zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#)*=0=01;31'
zstyle ':completion:*:kill:*' command 'ps -u $USER -o pid,%cpu,tty,cputime,cmd'

##first export default display

export DISPLAY=:0

# MACHINE SPECIFIC ALIAS'S
#######################################################			
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



alias iman="info"
# Edit this .bashrc file
alias ebrc='edit ~/.bashrc'

wallpaper=/home/joel/.config/awesome/themes/purple/wall.png

# Show help for this .bashrc file2alias hlp='less ~/.bashrc_hel2'

# alias to show the date
alias da='date "+%Y-%m-%d %A %T %Z"'

# Alias's to modified commands
#alias a fuzzy finder alias
#alias javafx='java --module-path $PATH_TO_FX --add-modules javafx.controls $@'
#alias mutt="neomutt|lolcat"
alias vim='nvim'
alias v='nvim'
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

alias javadb='java -cp :/usr/share/java/mariadb-java-client-2.5.4.jar'
alias dmenu_run='dmenu_run -fn "manrope-10" -nb black -sb "#260A35"'
alias sxiv='sxiv -b'
alias dmenu='dmenu -fn "manrope-10" -nb black -sb "#260A35"'
alias wireshark='sudo wireshark-gtk & exit'
alias vvu='surf 192.168.0.254:8090'
alias timetable="cgrep  '(^([a-zA-Z]+)|[0-9]+-[0-9]+am||[0-9]+-[0-9]+pm|[0-9][0-9][a-z][a-z]+|am+|pm+)' ~/timetable" 
alias upvote='sudo systemctl restart upvotebot.service'
#alias tee='tee -a '  
alias t="tldr $1 "
alias regex='sed "s/-/    /" ~/scripts/regex|egrep --color ^[^Aa-Zz].?[^Aa-Zz0-9]'
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
alias apt='sudo apt'
alias ctrlx='xte' #control x display server by faking input using xte
#alias feh="feh -B black"
alias kallp='sudo killall5 -9' #killall processes
alias pip="pip3"

# Change directory aliases

alias tmp='cd /tmp'
alias scr='cd ~/Videos/screenrecordings'
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
alias ddc='cd ~/Desktop/programming/ddc;ls'
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
alias ls='ls -Fh --color=always  --group-directories-first' # add colors and file type extensions
alias lx='ls -lXBh' # sort by extension
alias lk='ls -lSrh' # sort by size
alias lc='ls -lcrh' # sort by change time
alias lu='ls -lurh' # sort by access time
alias lr='ls -lRh' # recursive ls
alias lt='ls -altrh' # sort by date
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
alias chmods="cat /home/joel/scripts/chmods"
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


####EXPORTS######
#find /usr/lib/jvm/java-1.x.x-openjdk
#vim /etc/profile 
#export JAVA_HOME="path that you found"
#export PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME="/usr/lib/jvm/java-1.11.0-openjdk-amd64"
#export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-amd64"
export PATH=$JAVA_HOME/bin:$PATH
# java-1.11.0-openjdk-amd64
#export PATH=$JAVA_HOME/bin:$PATH
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
#export _JAVA_OPTIONS='-Dswing.defaultlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel' 
#export _JAVA_OPTIONS='-Dawt.useSystemAAFontSettings=gasp' #hate seeing the errors
export ClASS_PATH=/usr/share/java/
export DE="generic"
export GOROOT="/usr/local/go"
export XDG_CONFIG_HOME=/home/joel/.config
#export PULSE_SERVER=remote_host
