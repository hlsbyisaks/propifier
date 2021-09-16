# -*- coding: utf-8 -*-
"""
Created on Wed Jun 30 09:08:39 2021

@author: !axelh isak+
"""

# Import libraries
from re import M
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import metrics
import joblib
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import select, sql, text
from models import db, model_props
from models import db, model_horse
import csv
from RFClassifier import rfclassifier
from DecisionTreeRegressor import applicantpredictions
from RegressorFemale import femaleregressor

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:B69xww5gHaD5y0ff@34.88.45.88:5432/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
 
db.init_app(app)
migrate = Migrate(app, db)

#Update Dataset
@app.route('/updateDataSet', methods = ['POST'])
@cross_origin()
def updatedataset():
    _json = request.json
    print(_json)
    if int(_json['Applicants']) <= 11:
        _json['Good_Prop'] = 1
    else:
        _json['Good_Prop'] = 0   

    #Create query
    query = db.insert(model_props).values(startsum_low=_json['Startsum_Lowest'], startsum_high=_json['Startsum_Highest'], age_low=_json['Age_Lowest'], age_high=_json['Age_Highest'], distance=_json['Distance'], starttype=_json['Start_Type'], gender=_json['Mare'], applicants=_json['Applicants'], addition=_json['Addition'], first_price=_json['First_Price'], good_prop=_json['Good_Prop'], starting_total=_json['Starting_Total'], starting_women=_json['Starting_Women'])
    
    #Execute query
    db.session.execute(query)
    db.session.commit()
    print(query)
    
    #Retrain models with updated dataset

    return jsonify ({'response': 'Success: Prop uploaded to database'})

#Load horses from db
@app.route('/gethorsedata', methods = ['POST'])
@cross_origin()
def gethorsedata():
    _json = request.json

    if _json['Mare'] == False:
        output = db.session.query(model_horse).from_statement(
            text("""SELECT * FROM horse WHERE startsumma >= :startsum_low AND startsumma <= :startsum_high AND ålder >= :age_low AND ålder <= :age_high AND (kön = 'v' OR kön = 'h')""")
        ).params(startsum_low=_json['Startsum_Lowest'], startsum_high=_json['Startsum_Highest'], age_low=_json['Age_Lowest'], age_high=_json['Age_Highest'], gender=_json['Mare']).all()
    elif _json['Mare'] == True:
        output = db.session.query(model_horse).from_statement(
            text("""SELECT * FROM horse WHERE startsumma >= :startsum_low AND startsumma <= :startsum_high AND ålder >= :age_low AND ålder <= :age_high AND kön = 's'""")
        ).params(startsum_low=_json['Startsum_Lowest'], startsum_high=_json['Startsum_Highest'], age_low=_json['Age_Lowest'], age_high=_json['Age_Highest'], gender=_json['Mare']).all()
            
    return jsonify ({'horses' : list(map(str, output))})

#Load db
@app.route('/getdbdata', methods = ['GET'])
@cross_origin()
def getdata(): 
    #Get all props from db
    output = model_props.query.all()

    #Write props to csv 'out.csv'
    writer = csv.writer(open("/tmp/out.csv", 'w'))
    for res in output:
        writer.writerow([res])

    return 'Success: Done writing csv'

#Retrain Models
@app.route('/retrainModel', methods = ['GET'])
@cross_origin()
def retrainmodel(): 
    csv = pd.read_csv('/tmp/out.csv',header = None, sep = ":", index_col = None)
    csv.columns = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Applicants', 'Addition', 'First_Price', 'Good_Prop', 'Starting_Total', 'Starting_Women']

    for i in range(len(csv)) :
        if csv.loc[i, 'Applicants'] >= 11 :
            csv.loc[i, 'Good_Prop'] = 1
        else : csv.loc[i, 'Good_Prop'] = 0
    csv2 = csv[['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Applicants', 'Addition', 'First_Price', 'Good_Prop', 'Starting_Total', 'Starting_Women']]
    csv2.to_csv('/tmp/PropData.csv', header = False, index=False)
    femaleregressor()
    applicantpredictions()
    rfclassifier()

    return jsonify ({'response' : 'Success: Model Retrained'})

#Good/bad prop classifier
@app.route('/predict', methods = ['POST'])
@cross_origin()
def predict():
    classifier = joblib.load('/tmp/model.pkl')
    json_ = request.json
    query = pd.DataFrame(json_)
    prediction = classifier.predict(query)
    print(prediction)
      
    return jsonify ({'prediction' : list(map(int, prediction))})

#Predict applicants
@app.route('/predictApplicants', methods = ['POST'])
@cross_origin()
def predictapplicants():
    json_ = request.json
    query = pd.DataFrame(json_)
    decision_tree = joblib.load('/tmp/RegressorModel.pkl')
    prediction = decision_tree.predict(query)
    print(prediction)
      
    return jsonify ({'prediction' : list(map(int, prediction))})

#Predict applicants Female
@app.route('/predictApplicantsFemale', methods = ['POST'])
@cross_origin()
def predictapplicantsfemale():
    json_ = request.json
    query = pd.DataFrame(json_)
    decision_tree_Female = joblib.load('/tmp/RegressorModelFemale.pkl')
    prediction = decision_tree_Female.predict(query)
    print(prediction)
      
    return jsonify ({'prediction' : list(map(int, prediction))})

#Update applicant threshold
@app.route('/update', methods = ['POST'])
@cross_origin()
def update():
    threshold = request.json
    threshold = int(threshold['Applicant_Threshold'])
    print('New threshold: ', threshold)
    
    csv = pd.read_csv('/tmp/out.csv',header = None, sep = ":", index_col = None)
    csv.columns = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Applicants', 'Addition', 'First_Price', 'Good_Prop', 'Starting_Total', 'Starting_Women']

    for i in range(len(csv)) :
        if csv.loc[i, 'Applicants'] >= threshold :
            csv.loc[i, 'Good_Prop'] = 1
        else : csv.loc[i, 'Good_Prop'] = 0
    csv2 = csv[['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Applicants', 'Addition', 'First_Price', 'Good_Prop', 'Starting_Total', 'Starting_Women']]
    csv2.to_csv('/tmp/PropData.csv', header = False, index=False)

    rfclassifier()

    return jsonify({'Antal' : threshold})
 
if __name__ == '__main__':
    classifier = joblib.load('/tmp/model.pkl')
    decision_tree = joblib.load('/tmp/RegressorModel.pkl')
    decision_tree_Female = joblib.load('/tmp/RegressorModelFemale.pkl')
    app.run(host= 'localhost', port = 8080, debug = True)
