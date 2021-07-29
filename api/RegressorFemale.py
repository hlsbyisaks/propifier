# -*- coding: utf-8 -*-
"""
Created on Mon Jul 26 11:05:40 2021

@author: axelh
"""

import pandas as pd
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
import joblib
from sklearn.metrics import mean_squared_error

def femaleregressor():
    col_names = ['Startsum_Lowest','Startsum_Highest','Age_Lowest','Age_Highest','Distance','Start_type','Mare','Applicants',
                 'Addition','First_Price','Good_Prop','Starting','Women']
    props = pd.read_csv('PropData.csv', header=None, names=col_names)
    
    props = props.dropna()
    props.isnull().sum().sum()
    
    feature_cols = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Addition', 'First_Price']
    X = props[feature_cols] #Feature variables
    y = props.Women # The Target variable
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=1)
    
    decision_tree = DecisionTreeRegressor()
    decision_tree = decision_tree.fit(X_train, y_train)
    
    joblib.dump(decision_tree, 'RegressorModelFemale.pkl')
    y_pred = decision_tree.predict(X_test)
    print('Female regressor:', mean_squared_error(y_test, y_pred))
    return