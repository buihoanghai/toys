#!/bin/sh


# popularity
cat hk-popularity-20181231.gz-aa hk-popularity-20181231.gz-ab hk-popularity-20181231.gz-ac hk-popularity-20181231.gz-ad > ./rs/hk-popularity-20181231.gz &

cat id-popularity-20181231.gz-aa id-popularity-20181231.gz-ab id-popularity-20181231.gz-ac id-popularity-20181231.gz-ad > ./rs/id-popularity-20181231.gz &

cat th-popularity-20181231.gz-aa th-popularity-20181231.gz-ab th-popularity-20181231.gz-ac th-popularity-20181231.gz-ad > ./rs/th-popularity-20181231.gz &

cat sg-popularity-20181231.gz-aa sg-popularity-20181231.gz-ab sg-popularity-20181231.gz-ac sg-popularity-20181231.gz-ad > ./rs/sg-popularity-20181231.gz &

cat ph-popularity-20181231.gz-aa ph-popularity-20181231.gz-ab ph-popularity-20181231.gz-ac ph-popularity-20181231.gz-ad > ./rs/ph-popularity-20181231.gz &

cat my-popularity-20181231.gz-aa my-popularity-20181231.gz-ab my-popularity-20181231.gz-ac my-popularity-20181231.gz-ad > ./rs/my-popularity-20181231.gz &

cat vn-popularity-20181231.gz-aa vn-popularity-20181231.gz-ab vn-popularity-20181231.gz-ac vn-popularity-20181231.gz-ad > ./rs/vn-popularity-20181231.gz &

# recommeleon
cat hk-recommeleon-20181231.gz-aa hk-recommeleon-20181231.gz-ab hk-recommeleon-20181231.gz-ac hk-recommeleon-20181231.gz-ad > ./rs/hk-recommeleon-20181231.gz &

cat id-recommeleon-20181231.gz-aa id-recommeleon-20181231.gz-ab id-recommeleon-20181231.gz-ac id-recommeleon-20181231.gz-ad > ./rs/id-recommeleon-20181231.gz &

cat th-recommeleon-20181231.gz-aa th-recommeleon-20181231.gz-ab th-recommeleon-20181231.gz-ac th-recommeleon-20181231.gz-ad > ./rs/th-recommeleon-20181231.gz &

cat sg-recommeleon-20181231.gz-aa sg-recommeleon-20181231.gz-ab sg-recommeleon-20181231.gz-ac sg-recommeleon-20181231.gz-ad > ./rs/sg-recommeleon-20181231.gz &

cat ph-recommeleon-20181231.gz-aa ph-recommeleon-20181231.gz-ab ph-recommeleon-20181231.gz-ac ph-recommeleon-20181231.gz-ad > ./rs/ph-recommeleon-20181231.gz &

cat my-recommeleon-20181231.gz-aa my-recommeleon-20181231.gz-ab my-recommeleon-20181231.gz-ac my-recommeleon-20181231.gz-ad > ./rs/my-recommeleon-20181231.gz &

cat vn-recommeleon-20181231.gz-aa vn-recommeleon-20181231.gz-ab vn-recommeleon-20181231.gz-ac vn-recommeleon-20181231.gz-ad > ./rs/vn-recommeleon-20181231.gz &

# cache images
cat cache-images-20181231.gz-aa cache-images-20181231.gz-ab cache-images-20181231.gz-ac cache-images-20181231.gz-ad > ./rs/cache-images-20181231.gz &

# uncompress
nohup tar -zxvf ./rs/*.gz -C ./output/ &

# migration
# recommeleon
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/hk/recommeleon-b42eefa0074a11e99c686d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/id/recommeleon-b4696090074a11e99c686d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/my/recommeleon-b49838c0074a11e99c686d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/ph/recommeleon-b45eb230074a11e99c686d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/sg/recommeleon-b4745d10074a11e99c686d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/th/recommeleon-b48b4070074a11e99c686d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/vn/recommeleon-b4806b00074a11e99c686d2c86545d91/ &


# popularity
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/hk/popularity-f624fba0f45011e8bc666d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/id/popularity-c0e9f800f45011e8bc666d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/my/popularity-c0e2cc10f45011e8bc666d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/ph/popularity-c10213e0f45011e8bc666d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/sg/popularity-c111f260f45011e8bc666d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/th/popularity-c10a7850f45011e8bc666d2c86545d91/ &
nohup sstableloader -v -d 172.21.0.2 /var/lib/scylla/tmp/vn/popularity-c0f17210f45011e8bc666d2c86545d91/ &

# run stress test
cassandra-stress write n=100000000 -pop seq=1..100000000 -node 172.21.0.2 -schema keyspace="sg" -rate "threads>=10 threads<=1000" -log level=verbose

cassandra-stress read n=100 000 000 -pop seq=1..100000000 -node 168.63.239.8 -graph file="/root/index.html" -schema keyspace="cache" -rate "threads>=10 threads<=1000" -log level=verbose


# restart scylla
supervisorctl restart scylla

exit
