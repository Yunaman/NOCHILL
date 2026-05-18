#!/bin/bash
URLS=$(grep -roE 'https://images.unsplash.com/[^" ]+' src/ | sort -u)
for url in $URLS; do
  clean_url=$(echo "$url" | sed 's/\\//g' | sed 's/?.*//')
  echo -n "Checking $clean_url ... "
  status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  if [ "$status" -eq 200 ]; then
    echo "OK"
  else
    echo "FAILED ($status)"
  fi
done
