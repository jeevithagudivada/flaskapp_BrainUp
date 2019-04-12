from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bootstrap import Bootstrap
from config import basedir

db = SQLAlchemy()
bootstrap = Bootstrap()
login_manager = LoginManager()
login_manager.login_view = 'login'


app = Flask(__name__)   #this app is the assigned Flask instance
app.config.from_object('config')
bootstrap.init_app(app)
db.init_app(app)
login_manager.init_app(app)
          
from app import views, models   #this app is the package folder
