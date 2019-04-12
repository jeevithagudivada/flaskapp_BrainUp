import os

WTF_CSRF_ENABLED =True   #activate the cross site request forgery prevention
SECRET_KEY='you-will-never-guess'
     
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI='sqlite:///'+os.path.join(basedir,'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_COMMIT_ON_TEARDOWN= True
