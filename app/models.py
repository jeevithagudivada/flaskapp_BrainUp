from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from .import login_manager
import json

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
    
class User(UserMixin,db.Model):
    __tablename__='users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(64),index = True, unique = True)
    password_hash=db.Column(db.String(128))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
  

    def __repr__(self):
        return'<User %r>'%self.username

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self,password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self,password):
        return check_password_hash(self.password_hash,password)

    def get_id(self):
        try:
            return unicode(self.id)
        except NameError:
            return str(self.id)

class Role(db.Model):
    __tablename__='roles'
    id=db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(64), unique=True)
    users=db.relationship('User',backref='role',lazy='dynamic')

    def __repr__(self):
        return'<Role %r>' % self.name

class Category(db.Model):
    __tablename__='categories'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64), unique=True)
    questions= db.relationship('Question',backref='category',lazy='dynamic')

    def __repr__(self):
        return'<Category %r>' %self.name
    
class Question(db.Model):
    __tablename__='questions'
    id = db.Column(db.Integer,primary_key = True)
    body = db.Column(db.String(64))
    ans = db.Column(db.String(64))
    choice1=db.Column(db.String(64))
    choice2=db.Column(db.String(64))
    choice3=db.Column(db.String(64))
    choice4=db.Column(db.String(64))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    
    
    

