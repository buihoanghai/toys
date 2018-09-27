#!/bin/sh

QA="develop.iprice.mx/"

cat links.txt | while read link
do
	case $link in
	    *"iprice.my"*)
	        HOST="iprice.my"
	        ;;
	    *"iprice.vn"*)
	        HOST="iprice.vn"
	        ;;
	    *"iprice.ph"*)
	        HOST="iprice.ph"
	        ;;
	    *"iprice.hk"*)
	        HOST="iprice.hk"
	        ;;
	    *"iprice.sg"*)
	        HOST="iprice.sg"
	        ;;
	    *"ipricethailand.com"*)
	        HOST="ipricethailand.com"
	        ;;
	    *"iprice.co.id"*)
	        HOST="iprice.co.id"
	        ;;
  	esac

	QA_LINK="${link/$HOST/$QA}"
	curl  -so /dev/null --compressed --header "Host: $HOST" "$QA_LINK" -w '%{size_download}'
	printf "	"
	curl -so /dev/null --header "Host: $HOST" "$QA_LINK" -w '%{size_download}'
	echo ""
	# echo "	$link	$HOST	$QA_LINK"

done
