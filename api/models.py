from flask_sqlalchemy import SQLAlchemy
 
db = SQLAlchemy()
 
class model_name(db.Model):
    __tablename__ = 'model1'
    id = db.Column(db.Integer, primary_key=True)
    startsum_low = db.Column(db.Integer)
    startsum_high = db.Column(db.Integer)
    age_low = db.Column(db.Integer)
    age_high = db.Column(db.Integer)
    distance = db.Column(db.Integer)
    starttype = db.Column(db.Integer)
    gender = db.Column(db.Integer)
    addition = db.Column(db.Integer)
    applicants = db.Column(db.Integer)
    first_price = db.Column(db.Integer)
    good_prop = db.Column(db.Integer)
 
    def __init__(self, startsum_low, startsum_high, age_low, age_high, distance, starttype, gender, addition, applicants, first_price, good_prop):
        self.startsum_low = startsum_low
        self.startsum_high = startsum_high
        self.age_low = age_low
        self.age_high = age_high
        self.distance = distance
        self.starttype = starttype
        self.gender = gender
        self.addition = addition
        self.applicants = applicants
        self.first_price = first_price
        self.good_prop = good_prop
 
    def __repr__(self):
        return f"{self.startsum_low}:{self.startsum_high}:{self.age_low}:{self.age_high}:{self.distance}:{self.starttype}:{self.gender}:{self.addition}:{self.applicants}:{self.first_price}:{self.good_prop}"