#app/views.py-> is the handlers that response to requests from web browser
#each view function is mapped to one or more request URLs

from flask import render_template,session,redirect,url_for,request,flash,json
from flask_login import login_user, logout_user,login_required,current_user
from .import app,db
from .models import User,Category,Question
from .forms import LoginForm, RegistrationForm,ChangePasswordForm

@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html',name=session.get('name'))

@app.route('/user/<name>')
def user(name):
    return render_template('user.html', name=name)

@app.route('/login',methods=['GET','POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user= User.query.filter_by(username=form.username.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            return redirect(request.args.get('next') or url_for('index'))
        flash('Invalid username or password.')
    return render_template('login.html',form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.')
    return redirect(url_for('index'))

@app.route('/register',methods=['GET','POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user=User(username=form.username.data,
                  password = form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('You can now login.')
        return redirect(url_for('login'))
    return render_template('register.html',form=form)

@app.route('/change-password',methods=['GET','POST'])
@login_required
def change_password():
    form = ChangePasswordForm()
    if form.validate_on_submit():
        if current_user.verify_password(form.old_password.data):
            current_user.password = form.password.data
            db.session.add(current_user)
            flash('Your password has been updated.')
            return redirect(url_for('index'))
        else:
            flash('Invalid password.')
    return render_template('change_password.html',form=form)

@app.route('/start/Animal',methods=['GET','POST'])
@login_required
def start():
    correct=0
    empList=[]
    question = Question.query.filter_by(category_id=1).all()
    for q in question:
        empDict={
            'Id':q.id,
            'question':q.body,
            'answers':[q.choice1,q.choice2,q.choice3,q.choice4],
            'correctAnswer':q.ans,
            'category':q.category_id}
        empList.append(empDict)
    
    return render_template('t1.html',question=question, correct=correct,
                           myQuestions=empList)
    
@app.route('/start/History',methods=['GET','POST'])
@login_required
def start_h():
    correct=0
    empList=[]
    question = Question.query.filter_by(category_id=3).all()
    for q in question:
        empDict={
            'Id':q.id,
            'question':q.body,
            'answers':[q.choice1,q.choice2,q.choice3,q.choice4],
            'correctAnswer':q.ans,
            'category':q.category_id}
        empList.append(empDict)
    
    return render_template('t1.html',question=question, correct=correct,
                           myQuestions=empList)

@app.route('/start/Science',methods=['GET','POST'])
@login_required
def start_s():
    correct=0
    empList=[]
    question = Question.query.filter_by(category_id=4).all()
    for q in question:
        empDict={
            'Id':q.id,
            'question':q.body,
            'answers':[q.choice1,q.choice2,q.choice3,q.choice4],
            'correctAnswer':q.ans,
            'category':q.category_id}
        empList.append(empDict)
    
    return render_template('t1.html',question=question, correct=correct,
                           myQuestions=empList)

@app.route('/start/Math',methods=['GET','POST'])
@login_required
def start_m():
    correct=0
    empList=[]
    question = Question.query.filter_by(category_id=5).all()
    for q in question:
        empDict={
            'Id':q.id,
            'question':q.body,
            'answers':[q.choice1,q.choice2,q.choice3,q.choice4],
            'correctAnswer':q.ans,
            'category':q.category_id}
        empList.append(empDict)
    
    return render_template('t1.html',question=question, correct=correct,
                           myQuestions=empList)
						   
@app.route('/start_pic')
def start_pic():
    return render_template('pic.html')
	
@app.route('/start_map ')
@login_required
def start_map():
    return render_template('map.html')
	
@app.route('/start_hangman')
@login_required
def start_hangman():
    return render_template('hangman.html')
	
@app.route('/start_math ')
@login_required
def start_math():
    return render_template('math.html')
	
@app.route('/start_history ')
@login_required
def start_history():
    return render_template('puzzle.html')
	
