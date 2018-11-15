#!/bin/sh

STAGING="iprice.mx/"

cat links.txt | while read link
do
	case $link in
	    *"iprice.my"*)
	        HOST="iprice.my"
	        COUNTRY="my"
	        ;;
	    *"iprice.vn"*)
	        HOST="iprice.vn"
	        COUNTRY="vn"
	        ;;
	    *"iprice.ph"*)
	        HOST="iprice.ph"
	        COUNTRY="ph"

	        ;;
	    *"iprice.hk"*)
	        HOST="iprice.hk"
	        COUNTRY="hk"
	        ;;
	    *"iprice.sg"*)
	        HOST="iprice.sg"
	        COUNTRY="sg"
	        ;;
	    *"ipricethailand.com"*)
	        HOST="ipricethailand.com"
	        COUNTRY="th"
	        ;;
	    *"iprice.co.id"*)
	        HOST="iprice.co.id"
	        COUNTRY="id"
	        ;;
  	esac

	QA_LINK="${link/$HOST/$COUNTRY.$STAGING}"
	curl  -so /dev/null --compressed --header "Host: $HOST" "$QA_LINK" -w '%{size_download}'
	printf "	"
	curl -so /dev/null --header "Host: $HOST" "$QA_LINK" -w '%{size_download}'
	echo ""
#  echo "	$link	$HOST	$QA_LINK"

done
