import os
from cedb import app

def runserver():
    port = int(os.environ.get('PORT', 5000))
    app.jinja_env.auto_reload = True
    app.run(host='127.0.0.1', port=port, debug=True)
    app.run()

if __name__ == '__main__':
    runserver()