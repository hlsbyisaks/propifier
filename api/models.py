from flask_sqlalchemy import SQLAlchemy
 
db = SQLAlchemy()
#Prop database
class model_props(db.Model):
    __tablename__ = 'model2'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    startsum_low = db.Column(db.Integer)
    startsum_high = db.Column(db.Integer)
    age_low = db.Column(db.Integer)
    age_high = db.Column(db.Integer)
    distance = db.Column(db.Integer)
    starttype = db.Column(db.Integer)
    gender = db.Column(db.Integer)
    applicants = db.Column(db.Integer)
    addition = db.Column(db.Integer)
    first_price = db.Column(db.Integer)
    good_prop = db.Column(db.Integer)
    starting_total = db.Column(db.Integer)
    starting_women = db.Column(db.Integer)
 
    def __init__(self, startsum_low, startsum_high, age_low, age_high, distance, starttype, gender, applicants, addition, first_price, good_prop, starting_total, starting_women):
        self.startsum_low = startsum_low
        self.startsum_high = startsum_high
        self.age_low = age_low
        self.age_high = age_high
        self.distance = distance
        self.starttype = starttype
        self.gender = gender
        self.applicants = applicants
        self.addition = addition
        self.first_price = first_price
        self.good_prop = good_prop
        self.starting_total = starting_total
        self.starting_women = starting_women
 
    def __repr__(self):
        return f"{self.startsum_low}:{self.startsum_high}:{self.age_low}:{self.age_high}:{self.distance}:{self.starttype}:{self.gender}:{self.applicants}:{self.addition}:{self.first_price}:{self.good_prop}:{self.starting_total}:{self.starting_women}"

#Horses in vicinity database
class model_horse(db.Model):
    __tablename__ = 'horse'
    id = db.Column(db.Integer, primary_key=True)
    startsumma = db.Column(db.Integer)
    häst = db.Column(db.String(50))
    startpoäng = db.Column(db.Integer)
    ålder = db.Column(db.Integer)
    kön = db.Column(db.String(1))
    tränare = db.Column(db.String(50))
    tränarkön = db.Column(db.Integer)
    tjänat_innev_år = db.Column(db.Integer)
    proffs_amatör = db.Column(db.Integer)
 
    def __init__(self, startsumma, häst, startpoäng, ålder, kön, tränare, tränarkön, tjänat_innev_år, proffs_amatör):
        self.startsumma = startsumma
        self.häst = häst
        self.startpoäng = startpoäng
        self.ålder = ålder
        self.kön = kön
        self.tränare = tränare
        self.tränarkön = tränarkön
        self.tjänat_innev_år = tjänat_innev_år
        self.proffs_amatör = proffs_amatör
 
    def __repr__(self):
        return f"{self.startsumma}:{self.häst}:{self.startpoäng}:{self.ålder}:{self.kön}:{self.tränare}:{self.tränarkön}:{self.tjänat_innev_år}:{self.proffs_amatör}"