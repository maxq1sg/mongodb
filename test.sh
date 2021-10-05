#! /usr/bin/bash

function renameFile(){
    FILE=$1
    if [ -f "$FILE" ]; then
        mv $1 $2
        echo " File $1 renamed to $2"
    else echo "such file doesn't exist"
    fi
}

renameFile "./test/hello.txt" "./test/hellosssssssss.txt"