#!/bin/bash

if [$# -eq 0 ]; then
	echo "Enter the Contry name~!!"
else
	case "$1" in
		ko) echo "Seoul" ;;
		us) echo "Washington" ;;
		cn) echo "Bejing" ;;
		jp) echo "Tokyo" ;;
		*) echo "Your entery => $1 is not th list."
	esac
fi
