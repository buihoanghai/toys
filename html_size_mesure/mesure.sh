#!/bin/sh



cat production.txt | while read link



do
    # printf "$link    "
    curl -H 'Accept-Encoding: gzip' -so  /dev/null $link -w '%{size_download}'
    printf "    "
    curl -so /dev/null $link -w '%{size_download}'
    printf "    "
    curl   -H 'accept-encoding: gzip' --compressed -so /dev/null $link -w '%{time_total}'
    echo ""
done
echo "-------------------------------------------------------------------------"
cat production.txt | while read link



do
    # printf "$link    "
    curl -H 'Accept-Encoding: br' -so  /dev/null $link -w '%{size_download}'
    printf "    "
    curl -so /dev/null $link -w '%{size_download}'
    printf "    "
    curl   -H 'accept-encoding: br' --compressed -so /dev/null $link -w '%{time_total}'
    echo ""
done