#!/bin/sh

cat links.txt | while read link

do
	# printf "$link	"
	curl --compressed -so  /dev/null $link -w '%{size_download}'
	printf "	"
	curl -so /dev/null $link -w '%{size_download}'
	echo ""
done