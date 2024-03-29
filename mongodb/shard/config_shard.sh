#!/bin/bash

# default mongodb deamon stop.
systemctl stop mongod

#stop shard shell
./stop_shard.sh

# remove data directory
if [-d data ]; then
    rm -rf ./data
fi

#config Server
mkdir -pv /shard/data/configdb
mkdir -pv /shard/data/logs
touch /shard/data/logs/configsvr.log

mongod --config /shard/mongodConfig.conf &
sleep 3s
mongo 192.168.1.69:27019 < rs.init

# router Server
touch /shard/data/logs/mongorouter.log

mongos --config /shard/mongodRouter.conf &
sleep 3s

# Shard1 Server
mkdir -pv /shard/data/shard1db
touch /shard/data/logs/shard1.log

mongod --config /shard/mongodShard1.conf &
sleep 2s
mongo 192.168.1.69:27021 < rs.init

# Shard2 Server 
mkdir -pv /shard/data/shard2db
touch /shard/data/logs/shard2.log

mongod --config /shard/mongodShard2.conf &
sleep 2s
mongo 192.168.1.69:27022 < rs.init

# process status
ps -ef | grep mongo
sleep 2s 

#netstatus
netstat -ntlp

