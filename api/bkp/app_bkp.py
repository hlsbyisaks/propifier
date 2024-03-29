# -*- coding: utf-8 -*-
"""
Created on Wed Jun 30 09:08:39 2021

@author: axelh
"""

# Import libraries
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import metrics
import joblib
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

#Good/bad prop classifier
@app.route('/predict', methods = ['POST'])
@cross_origin()
def predict():
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
    prediction = decision_tree.predict(query)
    print(prediction)
      
    return jsonify ({'prediction' : list(map(int, prediction))})

#Update applicant threshold
@app.route('/update', methods = ['POST'])
@cross_origin()
def update():
    threshold = request.json
    threshold = int(threshold['Applicant_Threshold'])
    print(threshold)
    print (type(threshold))
    
    csv = pd.read_csv('PropDataApplicants.csv',header = None, sep = ",", index_col = None)
    csv.columns = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Applicants', 'Addition', 'First_Price', 'Good_Prop']

    for i in range(len(csv)) :
        if csv.loc[i, 'Applicants'] >= threshold :
            csv.loc[i, 'Good_Prop'] = 1
        else : csv.loc[i, 'Good_Prop'] = 0
    csv2 = csv[['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare','Addition', 'First_Price', 'Good_Prop']]
    csv2.to_csv('PropData.csv', header = False, index=False)


    # Re-train model
    col_names = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Addition', 'First_Price', 'Good_Prop']
    props = pd.read_csv('PropData.csv', header=None, names=col_names)

    props['Startsum_Highest'].astype(str).astype(float)
    props['Age_Highest'].astype(str).astype(int)

    # Remove null and NaN
    props = props.dropna()
    props.isnull().sum().sum()

    # Define features and target
    feature_cols = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Addition', 'First_Price']
    X = props[feature_cols] #Feature variables
    y = props.Good_Prop # The Target variable
    joblib.dump(feature_cols, 'featureCols.pkl')

    # Split train and test data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=1) # 90% training and 10% test

    # Construct the classifier with entropy
    classifier = RandomForestClassifier(n_estimators = 80, criterion='entropy')
    classifier = classifier.fit(X_train, y_train)
    y_pred = classifier.predict(X_test)

    # Print accuracy
    print("Accuracy:", metrics.accuracy_score(y_test, y_pred))

    joblib.dump(classifier, 'model.pkl')
    print('asd')
    return jsonify({'Antal' : threshold})

if __name__ == '__main__':
    classifier = joblib.load('model.pkl')
    decision_tree = joblib.load('RegressorModel.pkl')
    app.run(host= 'localhost', port = 4000, debug = True)
