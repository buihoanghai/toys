#!/bin/bash

S3KEY=""
S3SECRET=""

function getObject
{
  bucket=$1
  filepath=$2
  #date=$(date +"%a, %d %b %Y %T %z")
  curr_date=`date +'%a, %d %b %Y %H:%M:%S %z'`

  #acl="x-amz-acl:public-read"
  #content_type='application/x-compressed-tar'
  #token="x-amz-security-token:"${S3SESSION}
  #string="GET\n\n$content_type\n$date\n$acl\n$token\n/$bucket$filepath"
  string_to_sign="GET\n\n\n${curr_date}\n/${bucket}${filepath}"
  #signature=$(echo -en "${string}" | openssl sha1 -hmac "${S3SECRET}" -binary | base64)
  signature=$(echo -en "${string_to_sign}" | openssl sha1 -hmac "${S3SECRET}" -binary | base64)

# #Executing
# curl -v -X GET \
#   -H "Host: $bucket.s3.amazonaws.com" \
#   -H "Date: $date" \
#   -H "Content-Type: $content_type" \
#   -H "$acl" \
#   -H "$token" \
#   -H "Authorization: AWS ${S3KEY}:$signature" \
#   "https://$bucket.s3.amazonaws.com$filepath"
# Print the curl command
curl -o /mnt/tmp/$3 -X GET -H "Host: ${bucket}.s3.amazonaws.com" -H "Date: $curr_date" -H "Authorization: AWS ${S3KEY}:${signature}" "https://${bucket}.s3.amazonaws.com${filepath}"
}

for cc in hk id my ph sg th vn
do
	for ext in aa ab ac ad
	do
        getObject $1 $2/$cc-recommeleon-$2.gz-$ext $cc-recommeleon-$2.gz-$ext &
		getObject $1 /$2/$cc-popularity-$2.gz-$ext $cc-popularity-$2.gz-$ext &

	done
done

for ext in aa ab ac ad
do
	getObject $1 /$2/cache-images-$2.gz-$ext cache-images-$2.gz-$ext &
done

exit