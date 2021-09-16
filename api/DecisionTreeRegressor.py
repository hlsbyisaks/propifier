# -*- coding: utf-8 -*-
"""
Created on Thu Jul  1 10:41:32 2021

@author: !axelh
"""

import pandas as pd
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
import joblib
from sklearn.metrics import mean_squared_error

def applicantpredictions():
    col_names = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Applicants', 'Addition', 'First_Price', 'Good_Prop', 'Starting', 'Starting_women']
    props = pd.read_csv('/tmp/PropData.csv', header=None, names=col_names)
    props['Startsum_Highest'].astype(str).astype(float)
    props['Age_Highest'].astype(str).astype(int)
    
    props = props.dropna()
    props.isnull().sum().sum()
    
    feature_cols = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Addition', 'First_Price']
    X = props[feature_cols] #Feature variables
    y = props.Applicants # The Target variable

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=1)
    
    decision_tree = DecisionTreeRegressor(random_state = 1, max_depth = 5, max_features = 'auto', max_leaf_nodes = None, min_samples_leaf = 1, min_weight_fraction_leaf = 0.1, splitter = 'best')
    decision_tree = decision_tree.fit(X_train, y_train)
    joblib.dump(decision_tree, '/tmp/RegressorModel.pkl')
    y_pred = decision_tree.predict(X_test)
    print('Applicant regressor:', mean_squared_error(y_test, y_pred))
    return
