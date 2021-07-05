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

@app.route('/predict', methods = ['POST'])
@cross_origin()
def predict():
    json_ = request.json
    query = pd.DataFrame(json_)
    prediction = classifier.predict(query)
    print(prediction)
      
    return jsonify ({'prediction' : list(map(int, prediction))})

@app.route('/predictApplicants', methods = ['POST'])
@cross_origin()
def predictapplicants():
    json_ = request.json
    query = pd.DataFrame(json_)
    prediction = decision_tree.predict(query)
    print(prediction)
      
    return jsonify ({'prediction' : list(map(int, prediction))})

if __name__ == '__main__':
    classifier = joblib.load('model.pkl')
    decision_tree = joblib.load('RegressorModel.pkl')
    app.run(host= 'localhost', port = 4000, debug = True)
