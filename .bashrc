
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
	*i*) ;;
*) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=100000
HISTFILESIZE= #infinite history

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

PS1='\[\033[0;31m\]┌─\[\033[0;31m\][\[\033[01;35m\]📂 \[\033[01;34m\]\w\[\033[0;32m\] ]\n\[\033[0;93m\]└───▶ \033[0;00m\]'
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





#######################################################
####################SPECIAL CONFIG##########################
#######################################################
#######################################################
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

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Edit this .bashrc file
alias ebrc='edit ~/.bashrc'

# Show help for this .bashrc file2alias hlp='less ~/.bashrc_hel2'

# alias to show the date
alias da='date "+%Y-%m-%d %A %T %Z"'

# Alias's to modified commands
alias clear='clear -x'
alias hist='history > $scripts/history;sed  -i s/"[0-9]\+ "//g $scripts/history && $(tac  $scripts/history|dmenu)'
alias sxiv='sxiv -b'
alias dmenu='dmenu -l 30 -nb black'
alias vvu='surf 192.168.0.254:8090'
alias usdb1='sudo umount /dev/sdb1'
alias usdb2='sudo umount /dev/sdb2'
alias usdb3='sudo umount /dev/sdb3'
alias usdb4='sudo umount /dev/sdb4'
alias usdc1='sudo umount /dev/sdc1'
alias usdc2='sudo umount /dev/sdc2'
alias msdb1='sudo mount -w /dev/sdb1 /media/joel/disk'
alias msdb2='sudo mount -w /dev/sdb2 /media/joel/disk'
alias msdb3='sudo mount -w /dev/sdb3 /media/joel/disk'
alias msdb4='sudo mount -w /dev/sdb4 /media/joel/disk'
alias msdc1='sudo mount -w /dev/sdc1 /media/joel/disk'
alias msdc2='sudo mount -w /dev/sdc2 /media/joel/disk'
alias timetable="cgrep  '(^([a-zA-Z]+)|[0-9]+-[0-9]+am||[0-9]+-[0-9]+pm|[0-9][0-9][a-z][a-z]+|am+|pm+)' ~/timetable" 
alias upvote='sudo systemctl restart upvotebot.service'
alias tee='tee -a'
alias t="tldr $1"
alias regex='sed "s/-/    /" ~/regex|egrep --color ^[^Aa-Zz].?[^Aa-Zz0-9]'
alias cwlc='/home/joel/Desktop/programming/java/CWLC/./CWLC'
alias ipa=' ip add|egrep global|egrep   --color "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"'
alias androidstudio='studio.sh $* >/dev/null 2>&1 &'
alias ig='ig $* >/dev/null 2>&1 &'
alias kdec=kdeconnect-cli
alias anboxrun=' anbox launch --package=org.anbox.appmgr $* >/dev/null 2>&1 &'
alias avwifi='nmcli dev wifi'
alias kdeconnect=kdeconnectd
alias logout='loginctl terminate-user joel'
alias gateway='ip r'
alias inkscape='inkscape $* >/dev/null 2>&1 &'
alias tgcli='~/tg/bin/./telegram-cli'
alias telegram='Telegram/Telegram $* >/dev/null 2>&1 &' 
alias text=/opt/sublime_text/sublime_text
alias dict=sdcv
alias free='free --mega'
alias terminal='xfce4-terminal'
alias nmap='nmap -sP'
alias mount="mount -w"
alias cgrep='egrep --color=always'
alias distupgrade='sudo apt update && sudo apt dist-upgrade'
alias update='sudo apt  update && sudo apt upgrade'
alias cp='cp -irv'
alias mv='mv -i'
alias rm='rm -Ivr'
alias mkdir='mkdir -p'
alias ps='ps auxf'
alias ping='ping -c 10'
alias less='less -R'
alias cls='clear'
alias apt='sudo apt'
alias multitail='multitail --no-repeat -c'
alias yt='youtube-dl --add-metadata -ic'

# Change directory aliases
alias pics='cd ~/Pictures'
alias disk='cd /media/joel/disk;la'
alias lec21='cd ~/Desktop/lectures/level2001;ls'
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

# Remove a directory and all files
alias rmd='/bin/rm  --recursive --force --verbose '

# Alias's for multiple directory listing commands
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
alias f="find . | grep "

# Count all files (recursively) in the current folder
alias countfiles="for t in files links directories; do echo \`find . -type \${t:0:1} | wc -l\` \$t; done 2> /dev/null"

# To see if a command is aliased, a file, or a built-in command
alias checkcommand="type -t"

# Show current network connections to the server
alias ipview="netstat -anpl | grep :80 | awk {'print \$5'} | cut -d\":\" -f1 | sort | uniq -c | sort -n | sed -e 's/^ *//' -e 's/ *\$//'"

# Show open ports
alias openports='netstat -nape --inet'

# Alias's for safe and forced reboots
alias rebootsafe='sudo shutdown -r now'
alias rebootforce='sudo shutdown -r -n now'

# Alias's to show disk space and space used in a folder
alias diskspace="du -S | sort -n -r |more"
alias folders='du -h --max-depth=1'
alias folderssort='find . -maxdepth 1 -type d -print0 | xargs -0 du -sk | sort -rn'
alias tree='tree -CAhF --dirsfirst'
alias treed='tree -CAFd'
alias mountedinfo='df -hT'

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

# SHA1
alias sha1='openssl sha1'

#######################################################
# SPECIAL FUNCTIONS
#######################################################

# Use the best version of pico installed

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

# Move and go to the directory
mvg ()
{
	if [ -d "$2" ];then
		mv $1 $2 && cd $2
	else
		mv $1 $2
	fi
}

# Create and go to the directory
mkdirg ()
{
	mkdir -p $1
	cd $1
}

# Goes up a specified number of directories  (i.e. up 4)
up ()
{
	local d=""
	limit=$1
	for ((i=1 ; i <= limit ; i++))
	do
		d=$d/..
	done
	d=$(echo $d | sed 's/^\///')
	if [ -z "$d" ]; then
		d=..
	fi
	cd $d
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

# Returns the last 2 fields of the working directory
pwdtail ()
{
	pwd|awk -F/ '{nlast = NF -1;print $nlast"/"$NF}'
}



# Show current network information
netinfo ()
{
	echo "--------------- Network Information ---------------"
	/sbin/ifconfig | awk /'inet addr/ {print $2}'
	echo ""
	/sbin/ifconfig | awk /'Bcast/ {print $3}'
	echo ""
	/sbin/ifconfig | awk /'inet addr/ {print $4}'

	/sbin/ifconfig | awk /'HWaddr/ {print $4,$5}'
	echo "---------------------------------------------------"
}

# IP address lookup
alias whatismyip="whatsmyip"
function whatsmyip ()
{
	# Dumps a list of all IP addresses for every device
	# /sbin/ifconfig |grep -B1 "inet addr" |awk '{ if ( $1 == "inet" ) { print $2 } else if ( $2 == "Link" ) { printf "%s:" ,$1 } }' |awk -F: '{ print $1 ": " $3 }';

	# Internal IP Lookup
	echo -n "Internal IP: " ; /sbin/ifconfig eth0 | grep "inet addr" | awk -F: '{print $2}' | awk '{print $1}'

	# External IP Lookup
	echo -n "External IP: " ; wget http://smart-ip.net/myip -O - -q
}

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
		nano /etc/httpd/conf/httpd.conf
	elif [ -f /etc/apache2/apache2.conf ]; then
		nano /etc/apache2/apache2.conf
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
		nano /etc/php.ini
	elif [ -f /etc/php/php.ini ]; then
		nano /etc/php/php.ini
	elif [ -f /etc/php5/php.ini ]; then
		nano /etc/php5/php.ini
	elif [ -f /usr/bin/php5/bin/php.ini ]; then
		nano /usr/bin/php5/bin/php.ini
	elif [ -f /etc/php5/apache2/php.ini ]; then
		nano /etc/php5/apache2/php.ini
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
		nano /etc/my.cnf
	elif [ -f /etc/mysql/my.cnf ]; then
		nano /etc/mysql/my.cnf
	elif [ -f /usr/local/etc/my.cnf ]; then
		nano /usr/local/etc/my.cnf
	elif [ -f /usr/bin/mysql/my.cnf ]; then
		nano /usr/bin/mysql/my.cnf
	elif [ -f ~/my.cnf ]; then
		nano ~/my.cnf
	elif [ -f ~/.my.cnf ]; then
		nano ~/.my.cnf
	else
		echo "Error: my.cnf file could not be found."
		echo "Searching for possible locations:"
		sudo updatedb && locate my.cnf
	fi
}

# For some reason, rot13 pops up everywhere
rot13 () {
	if [ $# -eq 0 ]; then
		tr '[a-m][n-z][A-M][N-Z]' '[n-z][a-m][N-Z][A-M]'
	else
		echo $* | tr '[a-m][n-z][A-M][N-Z]' '[n-z][a-m][N-Z][A-M]'
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
vidtomp3(){
	 ffmpeg -i "$1" -vn "$2".mp3
}




###SYNTAX FOR DMENU
#$(grep  "surf [0-1]"* .bash_history|dmenu -l 30)

# save stderr and stdout to us var
# us=$(pwd 2>&1)

#Lauch Gui application and redirect sdtout and stderr to /dev/null to prevent terminal logging
mupdf() { command mupdf -I -r 100 "$@" > /dev/null 2>&1 & disown ;}
mpv() { command mpv "$@" > /dev/null 2>&1 & disown ;}
vlc() { command vlc "$@" > /dev/null 2>&1 & disown ;}
chrome() { command chromium "$@" > /dev/null 2>&1 & disown ;}
evince() { command evince  "$@" > /dev/null 2>&1 & disown ;}
surf() { command surf "$@" > /dev/null 2>&1 & disown ;}
music() { command rhythmbox "$@" > /dev/null 2>&1 & disown ;}
gimp() { command gimp "$@" > /dev/null 2>&1 & disown ;}
firefox() { command  firefox-esr "$@" > /dev/null 2>&1 & disown ;}
eclipse() { command eclipse "$@" > /dev/null 2>&1 & disown ;}
code() { command  code "$@" > /dev/null 2>&1 & disown ;}
transmission() { command  transmission-gtks "$@" > /dev/null 2>&1 & disown ;}
torbrowser() { command  torbrowser-launcher  "$@" > /dev/null 2>&1 & disown ;}
idea() { command  idea.sh  "$@" > /dev/null 2>&1 & disown ;}
tgceejay() { command  ~/Downloads/Programs/telegram/./Telegram -many -workdir ~/ceejay "$@" > /dev/null 2>&1 & disown ;}
qtcreator() { command  qtcreator  "$@" > /dev/null 2>&1 & disown ;}
lowriter() { command  lowriter  "$@" > /dev/null 2>&1 & disown ;}
nautilus() { command  nautilus "$1" > /dev/null 2>&1 & disown ;}
images(){ command sxiv -t *>/dev/null 2>&1 & disown;}
krita(){ command krita "$@">/dev/null 2>&1 & disown;}
#() { command  "$@" > /dev/null 2>&1 & disown ;}

####EXPORTS######
#find /usr/lib/jvm/java-1.x.x-openjdk
#vim /etc/profile 
#export JAVA_HOME="path that you found"
#export PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-amd64"
export PATH=$JAVA_HOME/bin:$PATH
export flutter="/home/joel/flutter"
export PATH=$flutter/bin:$PATH
#no need since i apt installed it
#export M2_HOME="/opt/apache-maven-3.6.1"
#export PATH=$M2_HOME/bin:$PATH
export STARDICT_DATA_DIR="/usr/share/stardict"
export PATH=$STARDICT_DATA_DIR/dic:$PATH
export eclipse="/home/joel/eclipse/"
export PATH=$eclipse:$PATH
export androidstudio='/home/joel/android-studio/bin'
export PATH=$androidstudio:$PATH
export ig="/home/joel/"
export PATH=$ig:$PATH
export idea="~/idea/bin"
export PATH=$idea:$PATH
export GOBIN=/home/joel/bin
export PATH=$GOBIN:$PATH#test comment
export scripts=/home/joel/scripts
export PATH=$scripts:$PATH
#js
