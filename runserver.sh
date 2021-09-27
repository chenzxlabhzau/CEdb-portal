#########################################################################
# File Name: runserver.sh
# Author: shimw6828
# Created Time: 2021 06 30
#########################################################################
#!/bin/bash
#nohup bash /home/shimw/web/CEdb-portal/runserver.sh & 

while true
do
result=`pstree -ap|grep gunicorn|wc -l`
if [[ "$result" == "1" ]]
then
    cd /home/shimw/web/CEdb-portal/
    /home/shimw/miniconda3/envs/CEdb/bin/gunicorn -c /home/shimw/web/CEdb-portal/config.py wsgi:application
fi
sleep 30m
done