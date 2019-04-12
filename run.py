#!flask/Scripts/python

from app import app, db
from app.models import*
from flask_script import Manager,Shell

manager = Manager(app)

#def make_shell_context():
    #return dict(app=app, db=db, User=User,Role=Role)

#manager.add_command("Shell", Shell(make_context=make_shell_context))

if __name__=='__main__':
    manager.run()

#app.run(debug=True)
