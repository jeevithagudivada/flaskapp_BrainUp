from flask_wtf import Form
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import Required, Email,Length,Regexp,EqualTo
from .models import User
from wtforms import ValidationError


class LoginForm(Form):
    username= StringField('Username',validators=[Required(),Length(1,64)])
    password = PasswordField('Password',validators=[Required()])
    remember_me=BooleanField('Keep me loggined in')
    submit = SubmitField('Log In')

class RegistrationForm(Form):
    
    username = StringField('Username',validators =[
        Required(),Length(1,64),Regexp('^[A-Za-z][A-Za-z0-9_.]*$',0,
                                       'Username must have only letters,'
                                       'numbers,dots or underscores')])
    password = PasswordField('Password',validators=[
        Required(),EqualTo('password2',message='Passwords must match')])
    password2 = PasswordField('Confirm password', validators=[Required()])
    submit = SubmitField('Register')


    def validate_username(self,field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username already in use.')
        
class ChangePasswordForm(Form):
    old_password=PasswordField('Old password', validators=[Required()])
    password = PasswordField('New password',validators=[
        Required(), EqualTo('password2',message='passwords must match')])
    password2 = PasswordField('Confirm new password',validators=[Required()])
    submit = SubmitField('Update Password')

class QuestionForm(Form):
    choice_a=BooleanField('A')
    choice_b=BooleanField('B')
    choice_c=BooleanField('C')
    choice_d=BooleanField('D')
    submit = SubmitField('Submit')
    
