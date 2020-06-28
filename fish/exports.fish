function export
    if [ $argv ] 
        set var (echo $argv | cut -f1 -d=)
        set val (echo $argv | cut -f2 -d=)
        set -g -x $var $val
    else
        echo 'export var=value'
end
end


# PATH VARS
export PATH="$PATH:/home/joel/scripts"
export PATH="$PATH:/home/joel/.local/bin"
export PATH="$PATH:/home/joel/.emacs.d/bin"





# EXPORTS
export GOROOT="/usr/local/go"
export GOPATH="/home/joel/Desktop/programming/go/projects"
export XDG_CONFIG_HOME="/home/joel/.config"
