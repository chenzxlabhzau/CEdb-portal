debug = True
loglevel = 'debug'
bind = "127.0.0.1:5000"
pidfile = "/home/shimw/web/CEdb-portal/log/gunicorn.pid"
accesslog = "/home/shimw/web/CEdb-portal/log/access.log"
errorlog = "/home/shimw/web/CEdb-portal/log/debug.log"
daemon = True
workers = 10