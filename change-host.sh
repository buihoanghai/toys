#!/bin/sh

#usage
HELP="usage: chhst (all|cc|cood|cms) (dev|staging|prod|ip)"

if [ -z $1 ]; then
  echo ${HELP}
  exit 0
fi

# PATH TO YOUR HOSTS FILE
ETC_HOSTS=/etc/hosts
#ETC_HOSTS=./hosts

# IPS
LOCAL_IP="127.0.0.1"
STAGING_IP="52.76.76.111"
PROD_IP="54.169.90.32"
CMS_PROD_ID="13.228.208.51"
CMS_STAGING_ID="13.228.187.170"

# Hostname to add/remove.
HOST=${1:-"all"}

IP=${2:-"prod"}

case ${IP} in
  dev)  IP=${LOCAL_IP};;
  staging)  IP=${STAGING_IP};;
  prod)  IP=${PROD_IP};;
esac

changeHost () {
 sed -i "/ ${1}/c\\${2} ${1}" ${ETC_HOSTS}
  if ! grep -Fq ${1} ${ETC_HOSTS} ; then
      echo "${2} ${1}" >> ${ETC_HOSTS}
  fi
}

removeHost () {
 sed -i "/ ${1}/c\\" ${ETC_HOSTS}
}

#iprice websites

case "$HOST" in
  all|iprice|my) changeHost "iprice.my" ${IP} ;;
esac
case "$HOST" in
  all|iprice|sg) changeHost "iprice.sg" ${IP} ;;
esac
case "$HOST" in
  all|iprice|ph) changeHost "iprice.ph" ${IP} ;;
esac
case "$HOST" in
  all|iprice|vn) changeHost "iprice.vn" ${IP} ;;
esac
case "$HOST" in
  all|iprice|hk) changeHost "iprice.hk" ${IP} ;;
esac
case "$HOST" in
  all|iprice|th) changeHost "ipricethailand.com" ${IP} ;;
esac
case "$HOST" in
  all|iprice|id) changeHost "iprice.co.id" ${IP} ;;
esac
case "$HOST" in
  all|iprice|id) changeHost "line.iprice.co.id" ${IP} ;;
esac
case "$HOST" in
  all|iprice|id) changeHost "homecredit.iprice.co.id" ${IP} ;;
esac

#CDN
case "$HOST" in
  all|cdn) changeHost "cdn-dev.ipricegroup.com" ${IP};;
esac

# COOD
case "$HOST" in
 all|cood)  changeHost "coupon.says.com" ${IP}
            changeHost "kupon.rappler.com" ${IP}
            changeHost "coupons.rappler.com" ${IP}
            changeHost "juiceonline.com" ${IP}
            changeHost "www.juiceonline.com" ${IP}
            changeHost "vouchers.todayonline.com" ${IP}

            if [ "$IP" = "$PROD_IP" ]; then
              removeHost "www.thairath.co.th"
            else
              changeHost "www.thairath.co.th" ${IP}
            fi ;;
esac

#CMS
case "$HOST" in
  all|cms)
          case ${IP} in
            ${PROD_IP}) changeHost "cms.ipricegroup.com" ${CMS_PROD_ID};;
            ${STAGING_IP}) changeHost "cms.ipricegroup.com" ${CMS_STAGING_ID};;
            *) changeHost "cms.ipricegroup.com" ${IP};;
          esac
esac
